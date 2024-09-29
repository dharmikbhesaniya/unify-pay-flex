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

interface UnifyPayload {
  amount: number; // Stripe and Razorpay | Required
  currency: string; // Stripe and Razorpay | Required
  items: Array<{ // Stripe and Razorpay | Required
    name: string;
    price: number;
    quantity: number;
  }>;
  notes?: Record<string, any>; // Stripe and Razorpay | Optional
  customer_details?: { // Stripe and Razorpay | Optional
    name: string;
    email: string;
    phone?: string;
  };
  customer_id?: string; // Stripe and Razorpay | Optional
  payment_method_types?: Stripe.Checkout.SessionCreateParams.PaymentMethodType[];  // Stripe and Razorpay | Optional


  successUrl: string; // Stripe | Required
  cancelUrl: string; // Stripe | Required
  ui_mode?: 'embedded' | 'hosted'; // Stripe | Optional
  mode?: 'payment' | 'setup' | 'subscription'; // Stripe | Optional
  discounts?: Stripe.Checkout.SessionCreateParams.Discount[] | undefined; // Stripe | Optional
  shipping_options?: Stripe.Checkout.SessionCreateParams.ShippingOption[] | undefined; // Stripe | Optional
  payment_intent_data?: { // Stripe | Optional
    metadata?: Record<string, any>;
    setup_future_usage?: 'on_session' | 'off_session';
  };
  after_expiration?: Stripe.Checkout.SessionCreateParams.AfterExpiration | undefined; // Stripe | Optional
  consent_collection?: Stripe.Checkout.SessionCreateParams.ConsentCollection | undefined; // Stripe | Optional
  customer_creation?: Stripe.Checkout.SessionCreateParams.CustomerCreation | undefined; // Stripe | Optional
  customer_update?: Stripe.Checkout.SessionCreateParams.CustomerUpdate | undefined; // Stripe | Optional
  expires_at?: number | undefined; // Stripe | Optional
  tax_id_collection?: Stripe.Checkout.SessionCreateParams.TaxIdCollection | undefined; // Stripe | Optional
  phone_number_collection?: boolean; // Stripe | Optional
  billing_address_collection?: 'auto' | 'required'; // Stripe | Optional
  shipping_address_collection?: { // Stripe | Optional
    allowed_countries: string[];
  };
  submit_type?: Stripe.Checkout.SessionCreateParams.SubmitType | undefined; // Stripe | Optional
  allow_promotion_codes?: boolean; // Stripe | Optional
  automatic_tax?: { enabled: boolean }; // Stripe | Optional

  
  receipt?: string; // Razorpay | Optional
  instant_payment_capture?: boolean; // Razorpay | Optional
  partial_payment?: boolean; // Razorpay | Optional
  first_payment_min_amount?: number; // Razorpay | Optional 
  offer_id?: string; // Razorpay | Optional 
  bank_account?: Orders.RazorpayOrderBankDetailsCreateRequestBody | undefined; // Razorpay | Optional 
  shipping_fee?: number | undefined; // Razorpay | Optional 
  shipping_address: { // Razorpay | Optional 
    line1: string;
    line2: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
  billing_address: { // Razorpay | Optional 
    line1: string;
    line2: string;
    city: string;
    state?: string;
    postal_code: string;
    country: string;
  };
}
