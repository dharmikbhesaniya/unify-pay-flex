// src/gateways/StripeGateway.ts
import Stripe from "stripe";
import { PaymentGateway } from "./PaymentGateway";

export class StripeGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: "2022-08-01" });
  }

  async createCustomer(data: any) {
    console.log("data", data);

    const customer = await this.stripe.customers.create(data);
    console.log("customer", customer);
    return customer;
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

  async createStripePrice(
    productId: string,
    unitAmount: number,
    currency: string,
    interval: 'day' | 'week' | 'month' | 'year',
    intervalCount: number = 1
  ): Promise<Stripe.Price> {
    const price = await this.stripe.prices.create({
      unit_amount: unitAmount,
      currency: currency,
      recurring: {
        interval: interval,
        interval_count: intervalCount,
      },
      product: productId,
    });

    return price;
  }

  async createSubscription(customerId: string, data: any): Promise<any> {
    const price = await this.createStripePrice('prod_XXXXXXXXXXXX', 2000, 'usd', 'month', 1);
    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price.id }],
      expand: ['latest_invoice.payment_intent'],
      trial_period_days: data.trialPeriodDays || 0,
      billing_cycle_anchor: Date.now(),
      collection_method: 'charge_automatically',
      default_payment_method: data.paymentMethodId,
      metadata: data.metadata,
    });

    return subscription;
  }

  async retrieveSubscription(subscriptionId: string): Promise<any> {
    const subscription = await this.stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  async cancelSubscription(subscriptionId: string): Promise<any> {
    const canceledSubscription = await this.stripe.subscriptions.del(subscriptionId);
    return canceledSubscription;
  }
}
