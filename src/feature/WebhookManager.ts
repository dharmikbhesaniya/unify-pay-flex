import { GatewayManager } from '@/GatewayManager';
import { GatewayType } from '@/PaymentProcessor';

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

    // Check if the handleEvent method exists before invoking it
    if (typeof gateway.verifyWebhook === 'function') {
      const { signature, payload, secret } = data;
      return gateway.verifyWebhook(payload, signature, secret);
    } else {
      throw new Error(
        `handleEvent is not implemented for ${gatewayType} gateway.`
      );
    }
  }
}
