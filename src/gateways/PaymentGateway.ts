// src/gateways/PaymentGateway.ts
export interface PaymentGateway {
  createCheckoutSession(data: any): Promise<any>;
  createCustomer(data: any): Promise<any>;
}
