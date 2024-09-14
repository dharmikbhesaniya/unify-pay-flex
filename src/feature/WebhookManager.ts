import { GatewayManager } from "@/GatewayManager";
import { GatewayType } from "@/PaymentProcessor";

export class WebhookManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
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
}
