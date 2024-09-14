# UnifyPayFlex SDK

**UnifyPayFlex SDK** is a universal payment gateway SDK designed to simplify the integration of multiple payment gateways, such as Stripe and Razorpay, into your Node.js application. This SDK provides a unified interface for creating checkout sessions, making it easier to handle payments across different gateways.

> **⚠️ Note:** This package is currently under development and is not yet ready for production use. Contributions are welcome!

## Features

- **Multi-gateway support:** Currently supports Stripe and Razorpay.
- **Unified API:** A single interface to interact with multiple payment gateways.
- **Extensible design:** Built with flexibility to support additional payment gateways in the future.
- **TypeScript support:** Written in TypeScript for an enhanced developer experience.
- **Provider agnostic:** Switch between different payment providers with minimal code changes.
- **Easy integration:** Simplifies the integration process with well-documented methods and examples.
- **Extensible:** Easily add support for new payment providers as needed.

## Providers

- **Stripe:** (Checkout, Webhook, Subscription, Customer) More functionality will be added later.
- **Razorpay:** (Upcoming) Integration is in progress.
- **PayPal:** (Checkout) More functionality will be added later.
- **Shopify:** (Upcoming) Integration is planned.
- **Google Pay:** (Upcoming) Integration is planned.
- **LemonSqueezy:** (Planning) Support is in the planning stage.
- **SSLCommerz:** (Planning) Support is in the planning stage.
- **Bkash:** (Planning) Support is in the planning stage.
- **Nagad:** (Planning) Support is in the planning stage.

## Installation

While the package is still under development, you can install it via npm. Please note that it is not stable and may undergo significant changes:

   ```bash
   npm install unify-pay-flex
   ```

# Usage

## SDK initialization

To initialize the SDK, provide only the key(s) for the payment gateway(s) you are using:

```typescript
const sdk = new UnifyPayFlexSDK({
  stripeApiKey: "YOUR_STRIPE_KEY",
  razorpayApiKey: "YOUR_RAZORPAY_API_KEY",
  razorpayApiSecret: "YOUR_RAZORPAY_API_SECRET",
});
```

## Create Checkout Session

To create a checkout session, provide the necessary information including items, success URL, and cancel URL:

```typescript
const items = [
  {
    id: "item1", // Unique identifier for the item
    quantity: 1, // Quantity of the item
    price: "1000", // Price of the item in the smallest currency unit (e.g., rupees for INR)
    name: "Product Name 1", // Name of the item
    currency: "INR", // Currency code
  },
  {
    id: "item2", // Unique identifier for the item
    quantity: 1, // Quantity of the item
    price: "2000", // Price of the item in the smallest currency unit (e.g., rupees for INR)
    name: "Product Name 2", // Name of the item
    currency: "INR", // Currency code
  },
];

const successUrl = "https://yourdomain.com/success"; // URL to redirect to on successful payment
const cancelUrl = "https://yourdomain.com/cancel"; // URL to redirect to on canceled payment
const payment_method_types = "card"; // Type of payment method

const createCheckoutSession = async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;

    // Specify the payment gateway type ("stripe") and the data
    const session = await sdk.createCheckoutSession("stripe", {
      items,
      successUrl,
      cancelUrl,
    });

    res.status(200).json({ session });
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
```

## Create Customer

To create a customer, provide the customer data:

```typescript
const payload = {
  name: "John Doe", // Customer's name
  email: "john.doe@example.com", // Customer's email address
  // Add other customer details as needed
};

const customer = await sdk.createCustomer("stripe", payload);
```

## Create Subscription

To create a subscription, provide subscription details and customer ID:

```typescript
const payload = {
  planName: "Every 1 month", // Name of the subscription plan
  amount: 1000, // Amount for the subscription in the smallest currency unit (e.g., paise for INR)
  currency: "INR", // Currency code
  interval: "month", // Interval for subscription (e.g., "month")
  intervalCount: 1, // Number of intervals
  paymentMethodId: "pm_1234567890", // Payment method ID
  metadata: { subscription: "Every 1 month" }, // Metadata associated with the subscription
};

const createSubscription = async (req, res) => {
  try {
    const data = req.body;
    const customerId = "stripe_customer_id"; // ID of the customer
    const session = await sdk.createSubscription("stripe", customerId, data);
    res.json(session);
  } catch (error) {
    console.error("Error creating Stripe subscription:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
```

# Contributing

We welcome contributions from the community! If you're interested in helping to improve **UnifyPayFlex SDK**, please follow these guidelines to get started:

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Cloning the Repository](#cloning-the-repository)
- [Testing Locally](#testing-locally)
- [Creating a Pull Request](#creating-a-pull-request)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Getting Started

To begin contributing to the UnifyPayFlex SDK, follow these steps:

### Prerequisites

Ensure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Cloning the Repository

To clone the repository and set up your development environment, follow these steps:

1. **Fork the repository**: Click the "Fork" button at the top-right corner of this repository to create a copy under your GitHub account.

2. **Clone your fork**:

    ```bash
    git clone https://github.com/dharmikbhesaniya/unify-pay-flex
    ```

3. **Navigate into the cloned directory**:

    ```bash
    cd unify-pay-flex
    ```

4. **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature-name
    ```

5. **Install dependencies**:

    ```bash
    npm install
    ```

6. **Make your changes** to the codebase.

7. **Commit your changes** with a descriptive message:

    ```bash
    git add .
    git commit -m "Add a descriptive commit message"
    ```

8. **Push your changes** to your forked repository:

    ```bash
    git push origin feature-name
    ```

9. **Create a Pull Request**: Navigate to the original repository on GitHub and click the "New Pull Request" button. Select your branch from the "compare" dropdown, and provide a clear description of your changes.

### Guidelines

- Follow the existing code style and conventions.
- Write clear and concise commit messages.
- Add or update tests for new features or bug fixes.
- Update documentation as needed.
- Be respectful and constructive in discussions and code reviews.
