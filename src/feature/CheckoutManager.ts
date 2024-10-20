import { GatewayManager } from '@/GatewayManager';
import { GatewayType } from '@/PaymentProcessor';
import { GatewayDataType } from '@/types/createCheckoutSession';

export class CheckoutManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
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

  public async updateCheckoutSession<T extends GatewayType>(
    gatewayType: T,
    data: GatewayDataType<T>,
    checkoutId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.updateCheckoutSession(data, checkoutId);
  }

  public async retrieveCheckoutSession<T extends GatewayType>(
    gatewayType: T,
    checkoutId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.retrieveCheckoutSession(checkoutId);
  }

  public async retrieveCheckoutSessionLineItems<T extends GatewayType>(
    gatewayType: T,
    checkoutId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.retrieveCheckoutSessionLineItems(checkoutId);
  }

  public async retrieveAllCheckoutSessions<T extends GatewayType>(
    gatewayType: T,
    limit: number
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.retrieveAllCheckoutSessions(limit);
  }

  public async expireCheckoutSession<T extends GatewayType>(
    gatewayType: T,
    checkoutId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.expireCheckoutSession(checkoutId);
  }
}
