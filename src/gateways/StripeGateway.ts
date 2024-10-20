import Stripe from 'stripe';
import { PaymentGateway } from '@/gateways/PaymentGateway';
import { UpdateCheckoutSessionPayload, CreateCheckoutSessionPayload } from '@/types/createCheckoutSession';
import { UnifyCustomerPayload } from '@/types/createCustomer';

export class StripeGateway implements PaymentGateway {
  private stripe: Stripe;

  constructor(apiKey: string) {
    this.stripe = new Stripe(apiKey, { apiVersion: '2024-06-20' });
  }

  async createCustomer(data: UnifyCustomerPayload): Promise<any> {
    const customer = await this.stripe.customers.create({
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description,
      address: data.address ? {
        line1: data.address.line1,
        line2: data.address.line2,
        city: data.address.city,
        state: data.address.state,
        postal_code: data.address.postal_code,
        country: data.address.country
      } : undefined,
      metadata: data.notes,
      balance: data.balance,
      cash_balance: data.cash_balance,
      coupon: data.coupon,
      invoice_prefix: data.invoice_prefix,
      invoice_settings: data.invoice_settings,
      next_invoice_sequence: data.next_invoice_sequence,
      preferred_locales: data.preferred_locales,
      promotion_code: data.promotion_code,
      source: data.source,
      tax: data.tax,
      tax_exempt: data.tax_exempt,
      test_clock: data.test_clock,
    });
    return customer;
  }

  async updateCustomer(data: UnifyCustomerPayload, customerId: string): Promise<any> {
    const customer = await this.stripe.customers.update(customerId, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      description: data.description,
      address: data.address ? {
        line1: data.address.line1,
        line2: data.address.line2,
        city: data.address.city,
        state: data.address.state,
        postal_code: data.address.postal_code,
        country: data.address.country
      } : undefined,
      metadata: data.notes,
      balance: data.balance,
      default_source: data.default_source,
      cash_balance: data.cash_balance,
      coupon: data.coupon,
      invoice_prefix: data.invoice_prefix,
      invoice_settings: data.invoice_settings,
      next_invoice_sequence: data.next_invoice_sequence,
      preferred_locales: data.preferred_locales,
      promotion_code: data.promotion_code,
      source: data.source,
      tax: data.tax,
      tax_exempt: data.tax_exempt,
    });
    return customer;
  }

  async retrieveCustomer(customerId: string): Promise<any> {
    const customer = await this.stripe.customers.retrieve(customerId);
    return customer;
  }

  async retrieveAllCustomers(limit: number): Promise<any> {
    const customer = await this.stripe.customers.list({ limit: limit });
    return customer;
  }

  async deleteCustomer(customerId: string): Promise<any> {
    const customer = await this.stripe.customers.del(customerId);
    return customer;
  }

  async searchCustomers(query: string, limit: number, page: string): Promise<any> {
    const customer = await this.stripe.customers.search({ query, limit, page });
    return customer;
  }

  async createCheckoutSession(data: CreateCheckoutSessionPayload): Promise<any> {
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: data.payment_method_types,
      line_items: data.items.map((item: any) => ({
        price_data: {
          currency: data.currency,
          product_data: {
            name: item.name,
          },
          unit_amount: item.price,
        },
        quantity: item.quantity,
      })),
      mode: data.mode || 'payment',
      currency: data.currency,
      success_url: `${data.successUrl}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: data.cancelUrl,
      payment_intent_data: {
        metadata: { ...data.payment_intent_data?.metadata },
        setup_future_usage: data.payment_intent_data?.setup_future_usage || undefined
      },
      customer: data.customer_id,
      customer_email: data.customer_details?.email,
      phone_number_collection: {
        enabled: data.phone_number_collection || true,
      },
      customer_creation: data.customer_creation,
      customer_update: data.customer_update,
      client_reference_id: data.customer_id,
      shipping_address_collection: data.shipping_address_collection
        ? {
          allowed_countries: data.shipping_address_collection.allowed_countries as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry[],
        }
        : undefined,
      billing_address_collection: data.billing_address_collection || 'auto',
      automatic_tax: { enabled: data.automatic_tax?.enabled || false },
      allow_promotion_codes: data.allow_promotion_codes,
      consent_collection: data.consent_collection,
      discounts: data.discounts,
      expires_at: data.expires_at,
      after_expiration: data.after_expiration,
      tax_id_collection: data.tax_id_collection,
      shipping_options: data.shipping_options
        ? data.shipping_options.map((option: any) => ({
          shipping_rate: option.shipping_rate,
          shipping_rate_data: option.shipping_rate_data,
          shipping_amount: option.shipping_amount,
        }))
        : undefined,
      submit_type: data.submit_type,
      metadata: data.notes,
      ui_mode: data.ui_mode,
      return_url: data.return_url,
      redirect_on_completion: data.redirect_on_completion,
      invoice_creation: data.invoice_creation,
    });

    return session;
  }

  async updateCheckoutSession(data: UpdateCheckoutSessionPayload, checkoutId: string): Promise<any> {
    const session = await this.stripe.checkout.sessions.update(checkoutId, {
      metadata: data.notes,
    });

    return session;
  }

  async retrieveCheckoutSession(checkoutId: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.retrieve(checkoutId);
    return session;
  }

  async retrieveCheckoutSessionLineItems(checkoutId: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.listLineItems(checkoutId);
    return session;
  }

  async retrieveAllCheckoutSessions(limit: number): Promise<any> {
    const session = await this.stripe.checkout.sessions.list({ limit });
    return session;
  }

  async expireCheckoutSession(checkoutId: any): Promise<any> {
    const session = await this.stripe.checkout.sessions.expire(checkoutId);
    return session;
  }

  async invoiceCreation(data: any): Promise<any> {
    // invoice_creation: {
    //   enabled: true,
    //   invoice_data: {
    //     account_tax_ids: "",
    //     custom_fields: {},
    //     description: "",
    //     issuer: {
    //       account: "",
    //     },
    //     footer: "",
    //     metadata: {},
    //     rendering_options: {
    //       amount_tax_display: "include_inclusive_tax",
    //     }
    //   }
    // },
    const session = await this.stripe.invoices.create(data);
    return session;
  }

  async createProduct(data: any): Promise<any> {
    const product = await this.stripe.products.create(data);
    return product;
  }

  async createPrice(data: any): Promise<any> {
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

  async createPaymentIntent(customerId: string): Promise<any> {
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: 2000,
      currency: 'usd',
      customer: customerId,
      payment_method_types: ['card'],
      capture_method: "automatic",
    });
    return paymentIntent;
  }

  async confirmPaymentIntent(paymentIntentId: string): Promise<any> {
    const confirmedPaymentIntent = await this.stripe.paymentIntents.confirm(
      paymentIntentId,
      {
        payment_method: 'pm_card_visa',
      }
    );
    return confirmedPaymentIntent;
  }
}
