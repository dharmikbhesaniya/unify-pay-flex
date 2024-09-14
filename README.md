# UnifyPayFlex SDK

**UnifyPayFlex SDK** is a universal payment gateway SDK designed to simplify the integration of multiple payment gateways, such as Stripe and Razorpay, into your Node.js application. This SDK provides a unified interface for creating checkout sessions, making it easier to handle payments across different gateways.

> **⚠️ Note:** This package is currently under development and is not yet ready for production use. Contributions are welcome!

## Features

- **Multi-gateway support**: Currently supports Stripe and Razorpay.
- **Unified API**: A single interface to interact with multiple payment gateways.
- **Extensible design**: Built with flexibility to support additional payment gateways in the future.
- **TypeScript support**: Written in TypeScript for enhanced developer experience.
- **Unified API:** Use a single class to interact with various payment providers.
- **Provider Agnostic:** Switch between different payment providers with minimal code changes.
- **Easy Integration:** Simplifies the integration process with well-documented methods and examples.
- **Extensible:** Easily add support for new payment providers as needed.

## Providers

- **Stripe:** (Checkout, Webhook, Subscription, Customer) will add more functionality later.
- **RazorPay:** (upcoming) will be working on that.
- **PayPal:** (Checkout) will add more functionality later.
- **Shopify:** (upcoming).
- **GooglePay:** (upcoming).
- **LemonSqueezy:** (planing).
- **SSLCommerz:** (planing).
- **Bkash:** (planing).
- **Nagad:** (planing).

## Installation

While the package is still under development, you can install it via npm, but please note that it is not stable and may undergo significant changes:

```bash
npm install unify-pay-flex
```

# Usage

## SDK initialization

You need to pass only that key which you use payment gateway

```typescript
const sdk = new UnifyPayFlexSDK({
  stripeApiKey: "YOUR_STRIPE_KEY",
  razorpayApiKey: "YOUR_RAZORPAY_API_KEY",
  razorpayApiSecret: "YOUR_RAZORPAY_API_SECRET",
});
```

## Create Checkout Session

```typescript
const items = [
  {
    id: "",
    quantity: 1,
    price: "",
    name: "",
    currency: "INR",
  },
  {
    id: "",
    quantity: 1,
    price: "",
    name: "",
    currency: "INR",
  },
];

const successUrl = "";
const cancelUrl = "";
const payment_method_types = "card";

const createCheckoutSession = async (req, res) => {
  try {
    const { items, successUrl, cancelUrl } = req.body;

    // First argument was your gateway type
    // second argument was the data
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

```typescript
const payload= {
    name: "",
    email: "",
    ...
}

const customer = await sdk.createCustomer("stripe", data);
```

## Create Subscription

```typescript
const payload = {
  planName: "Every 1 month",
  amount: product.price,
  currency: "INR",
  interval: "month",
  intervalCount: 1,
  paymentMethodId: "",
  metadata: { subscription: "Every 1 month" },
};

const createSubscription = async (req, res) => {
  try {
    const data = req.body;
    let customerId = "stripe_customer_id";
    const session = await sdk.createSubscription("stripe", customerId, data);
    res.json(session);
  } catch (error) {
    console.error("Error creating Stripe checkout session:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
```

# Contributing

We welcome contributions from the community! If you're interested in helping to improve **UnifyPayFlex SDK**, here’s how you can get started:

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Cloning the Repository](#cloning-the-repository)
- [Testing Locally](#testing-locally)
- [Creating a Pull Request](#creating-a-pull-request)
- [Code of Conduct](#code-of-conduct)
- [License](#license)

## Getting Started

To get started with contributing to the Unify Pay Flex project, follow these steps:

### Prerequisites

Ensure you have the following software installed on your local machine:

- [Node.js](https://nodejs.org/) (v14 or later)
- [npm](https://www.npmjs.com/) (comes with Node.js)

### Cloning the Repository

To clone the repository, use the following command:

1.  **Fork the repository**: Click the "Fork" button at the top of this repository.
2.  **Make a cole of repository**:

    ```bash
    git clone https://github.com/dharmikbhesaniya/unify-pay-flex.git
    ```

3.  **Create a new branch**:

    ```bash
    git checkout -b feature-name
    ```

4.  **Navigate into the cloned directory**:

    ```bash
    cd unify-pay-flex
    ```

5.  **Installing Dependencies**:

    ```bash
    npm install
    ```

6.  **Commit Your Changes**:

    ```bash
    git add .
    git commit -m "Add a descriptive commit message"
    ```

7.  **Push Your Changes**:

    ```bash
    git push origin feature/your-feature-name
    ```

8.  **Create a Pull Request**:

    ```bash
    git push origin feature/your-feature-name
    ```

### Guidelines

- Follow the existing code style and conventions.
- Write clear, concise commit messages.
- Add or update tests for new features or bug fixes.
- Update documentation as needed.
- Be respectful and constructive in discussions and code reviews.
