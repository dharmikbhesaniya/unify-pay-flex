import { Stripe } from '@stripe/stripe-js';

interface RazorpayCheckoutData {
  amount: number;
  currency: string;
  receipt: string;
  payment_capture: 1 | 0;
  notes?: { [key: string]: string };
}

type GatewayDataType<T extends GatewayType> = T extends GatewayType.STRIPE
  ? Stripe.Checkout.SessionCreateParams
  : T extends GatewayType.RAZORPAY
  ? RazorpayCheckoutData
  : never;

type AllowedPaymentMethods = 'netbanking' | 'upi' | 'card' | 'emandate' | 'nach';

interface UnifyPayload {
  amount: number;
  currency: string;
  items: Array<{
    name: string;
    price: number;
    quantity: number;
  }>;

  successUrl: string;
  cancelUrl: string;

  metadata?: Record<string, any>;

  receipt?: string;
  instant_payment_capture?: boolean;
  notes?: Record<string, string>;
  theme?: { color: string };
  partial_payment?: boolean;
  order_id?: string;
  offer_id?: string;
  customer_details?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  customer_id?: string;
  first_payment_min_amount?: number;
  payment_method?: AllowedPaymentMethods;
  bank_account?: Orders.RazorpayOrderBankDetailsCreateRequestBody | undefined;

  payment_method_types?: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];
  payment_intent_data?: {
    metadata?: Record<string, any>;
    setup_future_usage?: 'on_session' | 'off_session';
  };
  after_expiration?: Stripe.Checkout.SessionCreateParams.AfterExpiration | undefined;
  consent_collection?: Stripe.Checkout.SessionCreateParams.ConsentCollection | undefined;
  customer_creation?: Stripe.Checkout.SessionCreateParams.CustomerCreation | undefined;
  customer_update?: Stripe.Checkout.SessionCreateParams.CustomerUpdate | undefined;
  discounts?: Stripe.Checkout.SessionCreateParams.Discount[] | undefined;
  expires_at?: number | undefined;
  tax_id_collection?: booleanStripe.Checkout.SessionCreateParams.TaxIdCollection | undefined;
  billing_address_collection?: 'auto' | 'required';
  shipping_address_collection?: {
    allowed_countries: string[];
  };
  shipping?: {
    name: string;
    address: {
      line1: string;
      city: string;
      state?: string;
      postal_code: string;
      country: string;
    };
  };
  allow_promotion_codes?: boolean;
  mode?: 'payment' | 'setup' | 'subscription';
  automatic_tax?: { enabled: boolean };
  shipping_address: Partial<Invoices.RazorpayInvoiceAddress>;
  billing_address: Partial<Invoices.RazorpayInvoiceAddress>;
}
