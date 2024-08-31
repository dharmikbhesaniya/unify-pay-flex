import { Stripe } from "@stripe/stripe-js";

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
