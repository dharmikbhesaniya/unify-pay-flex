import Razorpay from "razorpay";
import { PaymentGateway } from "@/gateways/PaymentGateway";

export class RazorpayGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor(apiKey: string, apiSecret: string) {
    this.razorpay = new Razorpay({ key_id: apiKey, key_secret: apiSecret });
  }

  createCustomer(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async retrieveCustomer(customerId: string) {
    throw new Error("Method not implemented.");
  }

  async verifyWebhook(customerId: string) {
    throw new Error("Method not implemented.");
  }

  async handleEvent(customerId: string) {
    throw new Error("Method not implemented.");
  }

  async createCheckoutSession(data: any): Promise<any> {
    const options = {
      amount: data.amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: data.receipt,
      payment_capture: 1,
    };

    const order = await this.razorpay.orders.create(options);

    return { id: order.id };
  }

  async retrieveCheckoutSession(data: any): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createSubscription(customerId: string, data: any): Promise<any> {
    const subscription = await this.razorpay.subscriptions.create({
      plan_id: data.planId,
      total_count: data.totalCount || 12,
      customer_notify: 1,
      start_at: data.startAt || Math.floor(Date.now() / 1000),
      // customer_id: customerId,
    });

    return subscription;
  }

  async retrieveSubscription(subscriptionId: string): Promise<any> {
    const subscription = await this.razorpay.subscriptions.fetch(
      subscriptionId
    );
    return subscription;
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const canceledSubscription = await this.razorpay.subscriptions.cancel(
      subscriptionId
    );
    return canceledSubscription;
  }
}
