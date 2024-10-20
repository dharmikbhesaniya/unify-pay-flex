import { GatewayManager } from '@/GatewayManager';
import { GatewayType } from '@/PaymentProcessor';
import { UnifyCustomerPayload } from '@/types/createCustomer';

export class CustomerManager {
  private gatewayManager: GatewayManager;

  constructor(gatewayManager: GatewayManager) {
    this.gatewayManager = gatewayManager;
  }

  public async createCustomer(
    gatewayType: GatewayType,
    data: UnifyCustomerPayload
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.createCustomer(data);
  }

  public async retrieveCustomer(
    gatewayType: GatewayType,
    customerId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.retrieveCustomer(customerId);
  }

  public async updateCustomer(
    gatewayType: GatewayType,
    data: UnifyCustomerPayload,
    customerId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.updateCustomer(data, customerId);
  }

  public async deleteCustomer(
    gatewayType: GatewayType,
    customerId: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.deleteCustomer(customerId);
  }

  public async retrieveAllCustomers(
    gatewayType: GatewayType,
    limit: number
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.retrieveAllCustomers(limit);
  }

  public async searchCustomers(
    gatewayType: GatewayType,
    query: string,
    limit: number,
    page: string
  ): Promise<any> {
    const gateway = this.gatewayManager.getGateway(gatewayType);
    if (!gateway) {
      throw new Error(`${gatewayType} gateway is not configured.`);
    }
    return gateway.searchCustomers(query, limit, page);
  }
}
