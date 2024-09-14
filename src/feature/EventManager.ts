import { GatewayManager } from "@/GatewayManager";
import { GatewayType } from "@/PaymentProcessor";

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
    return gateway.handleEvent(event);
  }
}
