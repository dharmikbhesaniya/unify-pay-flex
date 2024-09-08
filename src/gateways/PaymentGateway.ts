// src/gateways/PaymentGateway.ts
export interface PaymentGateway {
  createSubscription?(customerId: string, data: any): Promise<any>;
  retrieveSubscription?(subscriptionId: string): Promise<any>;
  cancelSubscription?(subscriptionId: string): Promise<any>;
  createCheckoutSession(data: any): Promise<any>;
  createCustomer(data: any): Promise<any>;
  createProduct?(data: any): Promise<any>;
}
