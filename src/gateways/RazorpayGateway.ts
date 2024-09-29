import Razorpay from 'razorpay';
import { PaymentGateway } from '@/gateways/PaymentGateway';
import { UnifyPayload } from '@/types/createCheckoutSession';

export class RazorpayGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor(apiKey: string, apiSecret: string) {
    this.razorpay = new Razorpay({ key_id: apiKey, key_secret: apiSecret });
  }

  async createCustomer(data: any): Promise<any> {
    const customer = await this.razorpay.customers.create(data);
    return customer;
  }

  async retrieveCustomer(customerId: string): Promise<any> {
    const customer = await this.razorpay.customers.fetch(customerId);
    return customer;
  }

  async createCheckoutSession(data: UnifyPayload): Promise<any> {
    const order = await this.razorpay.orders.create({
      amount:
        data.items.reduce(
          (total: number, item: any) => total + item.price * item.quantity,
          0
        ) * 100,
      currency: data.currency,
      receipt: data.receipt || `receipt_${Date.now()}`,
      payment_capture: data.instant_payment_capture || true,
      notes: data.notes,
      customer_id: data.customer_id,
      bank_account: data.bank_account,
      partial_payment: data.partial_payment || false,
      first_payment_min_amount: data.first_payment_min_amount,
      offer_id: data.offer_id,
      customer_details: {
        email: data.customer_details?.email || "",
        contact: data.customer_details?.phone || "",
        name: data.customer_details?.name || "",
        shipping_address: data.shipping_address,
        billing_address: data.billing_address,
      },
      method: data?.payment_method_types?.length && data?.payment_method_types[0] || "card",
      shipping_fee: data.shipping_fee,
    });
    return order;
  }

  async retrieveCheckoutSessionLineItems(id: any): Promise<any> {
    throw new Error("Method not implemented")
  }

  async retrieveAllCheckoutSessions(limit: number): Promise<any> {
    throw new Error("Method not implemented")
  }

  async expireCheckoutSession(id: any): Promise<any> {
    throw new Error("Method not implemented")
  }

  async retrieveCheckoutSession(orderId: any): Promise<any> {
    const order = await this.razorpay.orders.fetch(orderId);
    return order;
  }

  async createPlan(data: any): Promise<any> {
    const plan = await this.razorpay.plans.create({
      period: data.period,
      interval: data.interval_count,
      item: {
        name: data.planName,
        description: data.description || '',
        amount: data.amount * 100,
        currency: data.currency,
      },
    });
    return plan;
  }

  async createSubscription(customerId: string, data: any): Promise<any> {
    const plan = await this.createPlan(data);

    const subscription = await this.razorpay.subscriptions.create({
      plan_id: plan.id,
      total_count: data.totalCount || 12,
      quantity: data.quantity || 1,
      customer_notify: 1,
      start_at: data.startAt || Math.floor(Date.now() / 1000),
      expire_by: data.endAt,
      notes: data.metadata,
    });

    return subscription;
  }

  async retrieveSubscription(subscriptionId: string): Promise<any> {
    const subscription =
      await this.razorpay.subscriptions.fetch(subscriptionId);
    return subscription;
  }

  async capturePayment(paymentId: string, amount: number | string, currency: string): Promise<any> {
    const capture = await this.razorpay.payments.capture(paymentId, amount, currency);
    return capture;
  }
}
