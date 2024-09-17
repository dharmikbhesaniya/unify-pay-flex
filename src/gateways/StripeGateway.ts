import Stripe from 'stripe';
import { PaymentGateway } from '@/gateways/PaymentGateway';

export class StripeGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: '2022-08-01' });
  }

  async createCustomer(data: any) {
    const customer = await this.stripe.customers.create(data);
    return customer;
  }

  async retrieveCustomer(customerId: string) {
    const customer = await this.stripe.customers.retrieve(customerId);
    return customer;
  }

  async createCheckoutSession(data: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: data.payment_method_types,
      line_items: data.items.map((item: any) => ({
        price_data: {
          currency: item.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${data.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: data.cancelUrl,
      payment_intent_data: {
        metadata: { connectAccountPayments: 'true' },
      },
    });

    return session;
  }

  async retrieveCheckoutSession(id: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.retrieve(id);
    return session;
  }

  async createProduct(data: any) {
    const product = await this.stripe.products.create(data);
    return product;
  }

  async createPrice(data: any) {
    const price = await this.stripe.prices.create({
      unit_amount: data.amount,
      currency: data.currency,
      recurring: {
        interval: data.period,
        interval_count: data.intervalCount || 1,
      },
      product: data.productId,
    });
    return price;
  }

  async createSubscription(customerId: string, data: any): Promise<any> {
    const product = await this.createProduct({
      name: data.planName,
    });

    const price = await this.createPrice({
      productId: product.id,
      amount: data.amount,
      currency: data.currency,
      interval: data.period,
      intervalCount: data.intervalCount || 1,
    });

    const subscription = await this.stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: price.id }],
      trial_period_days: data.trialPeriodDays || 0,
      cancel_at: data.endAt,
      expand: ['latest_invoice.payment_intent'],
      collection_method: 'charge_automatically',
      default_payment_method: data.paymentMethodId,
      metadata: data.metadata,
    });

    return subscription;
  }

  async retrieveSubscription(subscriptionId: string): Promise<any> {
    const subscription =
      await this.stripe.subscriptions.retrieve(subscriptionId);
    return subscription;
  }

  public async verifyWebhook(
    signature: string,
    payload: Buffer,
    secret: string
  ): Promise<any> {
    try {
      return this.stripe.webhooks.constructEvent(payload, signature, secret);
    } catch (error) {
      throw new Error(
        `Webhook verification failed: ${(error as Error).message}`
      );
    }
  }

  public async handleEvent(event: any): Promise<any> {
    switch (event.type) {
      case 'checkout.session.completed':
        console.log('Checkout session completed');
        break;
      case 'invoice.payment_succeeded':
        console.log('Invoice Payment succeeded');
        break;
      case 'invoice.payment_failed':
        console.log('Invoice Payment failed');
        break;
      case 'customer.subscription.created':
        console.log('Subscription created:', event.data.object);
        break;
      case 'customer.subscription.updated':
        console.log('Subscription updated:', event.data.object);
        break;
      case 'customer.subscription.deleted':
        console.log('Subscription deleted:', event.data.object);
        break;
      case 'payment_intent.succeeded':
        console.log('Payment intent succeeded:', event.data.object);
        break;
      case 'payment_intent.payment_failed':
        console.log('Payment intent failed:', event.data.object);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }
  }

  async createPaymentIntent(customerId: string) {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      customer: customerId,
      payment_method_types: ['card'],
    });
    return paymentIntent;
  }

  async confirmPaymentIntent(paymentIntentId: string) {
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: 'pm_card_visa',
      }
    );
    return confirmedPaymentIntent;
  }
}
