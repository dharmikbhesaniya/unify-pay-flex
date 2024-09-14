export interface PaymentGateway {
  createSubscription?(customerId: string, data: any): Promise<any>;
  retrieveSubscription?(subscriptionId: string): Promise<any>;
  cancelSubscription?(subscriptionId: string): Promise<any>;
  createCheckoutSession(data: any): Promise<any>;
  createCustomer(data: any): Promise<any>;
  retrieveCustomer(customerId: string): Promise<any>;
  verifyWebhook(
    signature: string,
    payload: Buffer,
    secret: string
  ): Promise<any>;
  handleEvent(event: any): Promise<any>;
}
