import Razorpay from 'razorpay';
import { PaymentGateway } from '@/gateways/PaymentGateway';
import { UpdateCheckoutSessionPayload, CreateCheckoutSessionPayload } from '@/types/createCheckoutSession';
import { UnifyCustomerPayload } from '@/types/createCustomer';

export class RazorpayGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor(apiKey: string, apiSecret: string) {
    this.razorpay = new Razorpay({ key_id: apiKey, key_secret: apiSecret });
  }

  async createCustomer(data: UnifyCustomerPayload): Promise<any> {
    const customer = await this.razorpay.customers.create({
      name: data.name,
      email: data.email,
      contact: data.phone,
      notes: data.notes,
      fail_existing: data.fail_existing,
      gstin: data.gstin
    });
    return customer;
  }

  async updateCustomer(data: UnifyCustomerPayload, customerId: string): Promise<any> {
    const updatedCustomer = await this.razorpay.customers.edit(customerId, {
      name: data.name,
      email: data.email,
      contact: data.phone,
    });
    return updatedCustomer;
  }

  async retrieveCustomer(customerId: string): Promise<any> {
    const customer = await this.razorpay.customers.fetch(customerId);
    return customer;
  }

  async retrieveAllCustomers(limit: number): Promise<any> {
    const customers = await this.razorpay.customers.all({
      count: limit,
    });
    return customers.items;
  }

  async deleteCustomer(): Promise<any> {
    throw new Error("The deleteCustomer method does not exist in Razorpay.");
  }

  async searchCustomers(query: string, limit: number): Promise<any> {
    const customers = await this.retrieveAllCustomers(limit);
    const filteredCustomers = customers.filter((customer: any) =>
      customer.name.includes(query) || customer.email.includes(query) || customer.contact.includes(query)
    );
    return filteredCustomers.slice(0, limit);
  }

  async createCheckoutSession(data: CreateCheckoutSessionPayload): Promise<any> {
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

  async updateCheckoutSession(data: UpdateCheckoutSessionPayload, orderId: any): Promise<any> {
    const order = await this.razorpay.orders.edit(orderId, {
      notes: data.notes
    });
    return order;
  }

  async retrieveCheckoutSession(orderId: any): Promise<any> {
    const order = await this.razorpay.orders.fetch(orderId);
    return order;
  }

  async retrieveCheckoutSessionLineItems(): Promise<any> {
    throw new Error("The retrieveCheckoutSessionLineItems method does not exist in Razorpay.");
  }

  async retrieveAllCheckoutSessions(limit: number): Promise<any> {
    const order = await this.razorpay.orders.all({ count: limit });
    return order;
  }

  async expireCheckoutSession(): Promise<any> {
    throw new Error("The expireCheckoutSession method does not exist in Razorpay.");
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
