
export interface UnifyCustomerPayload {
    name: string | undefined; // Stripe and Razorpay | Required  
    email: string | undefined; // Stripe and Razorpay | Required  
    phone: string | undefined; // Razorpay and Stripe | Required
    notes?: Record<string, any>; // Stripe and Razorpay | Optional  


    address?: { // Stripe | Optional  
        line1: string | undefined;
        line2?: string | undefined;
        city: string | undefined;
        state?: string | undefined;
        postal_code: string | undefined;
        country: string | undefined;
    };
    description?: string | undefined; // Stripe | Optional  
    balance?: number | undefined; // Stripe | Optional  
    cash_balance?: { settings: { reconciliation_mode: "automatic" | "manual" | "merchant_default" } }; // Stripe | Optional  
    coupon?: string | undefined; // Stripe | Optional  
    invoice_prefix?: string | undefined; // Stripe | Optional 
    invoice_settings?: {  // Stripe | Optional 
        custom_fields?: Array<{ name: string; value: string }>;
        footer?: string;
        default_payment_method?: string;
    };
    next_invoice_sequence?: number | undefined; // Stripe | Optional 
    preferred_locales?: string[]; // Stripe | Optional 
    promotion_code?: string | undefined; // Stripe | Optional 
    source?: string | undefined; // Stripe | Optional 
    tax?: { ip_address: string | undefined, validate_location: 'deferred' | 'immediately' }; // Stripe | Optional 
    tax_exempt?: "none" | "exempt" | "reverse"; // Stripe | Optional 
    test_clock: string | undefined; // Stripe | Optional


    fail_existing?: 0 | 1; // Razorpay | Optional  
    gstin?: string; // Razorpay | Optional  
}

