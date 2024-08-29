// src/gateways/RazorpayGateway.ts
import Razorpay from "razorpay";
import { PaymentGateway } from "./PaymentGateway";

export class RazorpayGateway implements PaymentGateway {
  private razorpay: Razorpay;

  constructor(apiKey: string, apiSecret: string) {
    this.razorpay = new Razorpay({ key_id: apiKey, key_secret: apiSecret });
  }
  
  createCustomer(data: any): Promise<any> {
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
}
