import { GatewayManager } from "./GatewayManager";
import { GatewayType } from "./PaymentProcessor";
import { GatewayDataType } from "./types/createCheckoutSession";
import { SDKConfig } from "./types/SDK";

export class UnifyPayFlexSDK {
  private gatewayManager: GatewayManager;

  constructor(config: SDKConfig) {
    this.gatewayManager = new GatewayManager(config);
  }

  public async createCustomer(
    gatewayType: GatewayType,
    data: any
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.createCustomer(data);
  }

  public async retrieveCustomer(
    gatewayType: GatewayType,
    data: any
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);

    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.retrieveCustomer(data);
  }

  public async createCheckoutSession<T extends GatewayType>(
    gatewayType: T,
    data: GatewayDataType<T>
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.createCheckoutSession(data);
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

  public async verifyWebhook(
    gatewayType: GatewayType,
    data: any
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    const { signature, payload, secret } = data;

    return gateway.verifyWebhook(payload, signature, secret);
  }

  public async handleEvent(gatewayType: GatewayType, event: any): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.handleEvent(event);
  }
}
