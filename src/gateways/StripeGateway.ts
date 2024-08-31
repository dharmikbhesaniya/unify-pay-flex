// src/gateways/StripeGateway.ts
import Stripe from "stripe";
import { PaymentGateway } from "./PaymentGateway";

export class StripeGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-08-01" });
  }

  async createCheckoutSession(data: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: data.items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url: `${data.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: data.cancelUrl,
    });

    return { id: session.id };
  }

  async createCustomer(data: any) {
    console.log("data", data);

    const customer = await this.stripe.customers.create({
      email: "customer@example.com",
      name: "John Doe",
    });
    console.log("customer", customer);
    return customer;
  }

  async retrieveCustomer(customerId: string) {
    const customer = await this.stripe.customers.retrieve(customerId);
    return customer;
  }

  async createPaymentIntent(customerId: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: "usd",
      customer: customerId,
      payment_method_types: ["card"],
    });
    return paymentIntent;
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: "pm_card_visa",
      }
    );
    return confirmedPaymentIntent;
  }

  async createSubscription(customerId: string) {
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [
        { price: "price_1Hh1X2FVHSK8VuybInKLcFxh" }, // Replace with your actual price ID
      ],
    });
    return subscription;
  }
}
