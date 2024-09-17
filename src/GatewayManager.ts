import { PaymentGateway } from './gateways/PaymentGateway';
import { StripeGateway } from './gateways/StripeGateway';
import { RazorpayGateway } from './gateways/RazorpayGateway';
import { GatewayType } from './PaymentProcessor';
import { SDKConfig } from './types/SDK';

export class GatewayManager {
  private gateways: { [key in GatewayType]?: PaymentGateway } = {};

  constructor(config: SDKConfig) {
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

  public getGateway(gatewayType: GatewayType): PaymentGateway | undefined {
    return this.gateways[gatewayType];
  }
}
