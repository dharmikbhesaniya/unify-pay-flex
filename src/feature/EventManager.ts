import { GatewayManager } from '@/GatewayManager';
import { GatewayType } from '@/PaymentProcessor';

export class EventManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
  }

  public async handleEvent(gatewayType: GatewayType, event: any): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }

    // Check if the handleEvent method exists before invoking it
    if (typeof gateway.handleEvent === 'function') {
      return gateway.handleEvent(event);
    } else {
      throw new Error(
        `handleEvent is not implemented for ${gatewayType} gateway.`
      );
    }
  }
}
