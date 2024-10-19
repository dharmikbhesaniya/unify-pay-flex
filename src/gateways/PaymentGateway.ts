import { UnifyPayload } from "@/types/createCheckoutSession";
import { UnifyCustomerPayload } from "@/types/createCustomer";

export interface PaymentGateway {
  createSubscription(customerId: string, data: any): Promise<any>;
  retrieveSubscription(subscriptionId: string): Promise<any>;
  cancelSubscription?(subscriptionId: string): Promise<any>;

  createCheckoutSession(data: UnifyPayload): Promise<any>;
  retrieveCheckoutSession(id: string): Promise<any>;
  retrieveCheckoutSessionLineItems(id: string): Promise<any>;
  retrieveAllCheckoutSessions(limit: number): Promise<any>;
  expireCheckoutSession(id: string): Promise<any>;

  createCustomer(data: UnifyCustomerPayload): Promise<any>;
  retrieveCustomer(customerId: string): Promise<any>;

  verifyWebhook?(
    signature: string,
    payload: Buffer,
    secret: string
  ): Promise<any>;
  handleEvent?(event: any): Promise<any>;
}
