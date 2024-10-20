import { CreateCheckoutSessionPayload } from "@/types/createCheckoutSession";
import { UnifyCustomerPayload } from "@/types/createCustomer";

export interface PaymentGateway {
  createCustomer(data: UnifyCustomerPayload): Promise<any>;
  updateCustomer(data: UnifyCustomerPayload, customerId: string): Promise<any>;
  retrieveCustomer(customerId: string): Promise<any>;
  retrieveAllCustomers(limit: number): Promise<any>;
  deleteCustomer(customerId: string): Promise<any>;
  searchCustomers(query: string, limit: number, page: string): Promise<any>;

  createCheckoutSession(data: CreateCheckoutSessionPayload): Promise<any>;
  updateCheckoutSession(data: CreateCheckoutSessionPayload, checkoutId: string): Promise<any>;
  retrieveCheckoutSession(checkoutId: string): Promise<any>;
  retrieveCheckoutSessionLineItems(checkoutId: string): Promise<any>;
  retrieveAllCheckoutSessions(limit: number): Promise<any>;
  expireCheckoutSession(checkoutId: string): Promise<any>;

  createSubscription(customerId: string, data: any): Promise<any>;
  retrieveSubscription(subscriptionId: string): Promise<any>;
  cancelSubscription?(subscriptionId: string): Promise<any>;

  verifyWebhook?(
    signature: string,
    payload: Buffer,
    secret: string
  ): Promise<any>;
  handleEvent?(event: any): Promise<any>;
}
