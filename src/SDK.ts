import { CheckoutManager } from '@/feature/CheckoutManager';
import { CustomerManager } from '@/feature/CustomerManager';
import { EventManager } from '@/feature/EventManager';
import { SubscriptionManager } from '@/feature/SubscriptionManager';
import { WebhookManager } from '@/feature/WebhookManager';
import { GatewayManager } from './GatewayManager';
import { SDKConfig } from './types/SDK';

export class UnifyPayFlexSDK {
  private gatewayManager: GatewayManager;
  public customerManager!: CustomerManager;
  public checkoutManager!: CheckoutManager;
  public subscriptionManager!: SubscriptionManager;
  public webhookManager!: WebhookManager;
  public eventManager!: EventManager;

  constructor(config: SDKConfig) {
    // gateway initialize
    this.gatewayManager = new GatewayManager(config);

    // Initialize managers
    this.initializeManagers();
  }

  private initializeManagers() {
    this.customerManager = new CustomerManager(this.gatewayManager);
    this.checkoutManager = new CheckoutManager(this.gatewayManager);
    this.subscriptionManager = new SubscriptionManager(this.gatewayManager);
    this.webhookManager = new WebhookManager(this.gatewayManager);
    this.eventManager = new EventManager(this.gatewayManager);
  }
}
