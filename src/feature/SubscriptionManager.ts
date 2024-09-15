import { GatewayManager } from "@/GatewayManager";
import { GatewayType } from "@/PaymentProcessor";

export class SubscriptionManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
  }

  public async createSubscription(
    gatewayType: GatewayType,
    customerId: string,
    data: any
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    if (!gateway.createSubscription) {
      throw new Error(`${gatewayType} gateway does not support subscriptions.`);
    }

    return gateway.createSubscription(customerId, data);
  }

  public async retrieveSubscription(
    gatewayType: GatewayType,
    subscriptionId: string,
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    if (!gateway.retrieveSubscription) {
      throw new Error(`${gatewayType} gateway does not support subscriptions.`);
    }

    return gateway.retrieveSubscription(subscriptionId);
  }
}
