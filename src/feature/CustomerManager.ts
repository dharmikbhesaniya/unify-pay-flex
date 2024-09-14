import { GatewayManager } from "@/GatewayManager";
import { GatewayType } from "@/PaymentProcessor";

export class CustomerManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
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
}
