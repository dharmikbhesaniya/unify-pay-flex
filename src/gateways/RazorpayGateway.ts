import Razorpay from 'razorpay';
import { PaymentGateway } from '@/gateways/PaymentGateway';

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

  async createCheckoutSession(data: any): Promise<any> {
    const order = await this.razorpay.orders.create({
      amount:
        data.items.reduce(
          (total: number, item: any) => total + item.price * item.quantity,
          0
        ) * 100,
      currency: data.items[0].currency,
      receipt: data.receipt || `receipt_${Date.now()}`,
      payment_capture: data.instant_payment_capture || 1,
    });
    return order;
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
}
