// src/SDK.ts
import { PaymentGateway } from "./gateways/PaymentGateway";
import { StripeGateway } from "./gateways/StripeGateway";
import { RazorpayGateway } from "./gateways/RazorpayGateway";
import { GatewayType } from "./PaymentProcessor";
import { GatewayDataType } from "./types/createCheckoutSession";

interface SDKConfig {
  stripeApiKey?: string;
  razorpayApiKey?: string;
  razorpayApiSecret?: string;
}

export class UnifyPayFlexSDK {
  private gateways: { [key in GatewayType]?: PaymentGateway };

  constructor(config: SDKConfig) {
    this.gateways = {};

    if (config.stripeApiKey) {
      this.gateways[GatewayType.STRIPE] = new StripeGateway(
        config.stripeApiKey
      );
    }

    if (config.razorpayApiKey && config.razorpayApiSecret) {
      this.gateways[GatewayType.RAZORPAY] = new RazorpayGateway(
        config.razorpayApiKey,
        config.razorpayApiSecret
      );
    }
  }

  public async createCustomer(
    gatewayType: GatewayType,
    data: any
  ): Promise<any> {
    const gateway = this.gateways[gatewayType];
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.createCustomer(data);
  }

  public async retrieveCustomer(
    gatewayType: GatewayType,
    data: any
  ): Promise<any> {
    const gateway = this.gateways[gatewayType];

    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.retrieveCustomer(data);
  }

  public async createCheckoutSession<T extends GatewayType>(
    gatewayType: T,
    data: GatewayDataType<T>
  ): Promise<any> {
    const gateway = this.gateways[gatewayType];
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.createCheckoutSession(data);
  }

  public async createSubscription(gatewayType: GatewayType, customerId: string, data: any): Promise<any> {
    const gateway = this.gateways[gatewayType];
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    if (!gateway.createSubscription) {
      throw new Error(`${gatewayType} gateway does not support subscriptions.`);
    }

    return gateway.createSubscription(customerId, data);
  }

  public async verifyWebhook(gatewayType: GatewayType, data: any): Promise<any> {
    const gateway = this.gateways[gatewayType];
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    const { signature, payload, secret } = data;

    return gateway.verifyWebhook(payload, signature, secret);
  }

  public async handleEvent(gatewayType: GatewayType, event: any): Promise<any> {
    const gateway = this.gateways[gatewayType];
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    return gateway.handleEvent(event);
  }
}
