import { Stripe } from 'stripe';

const globalStripe = global as unknown as {
  stripe: Stripe | undefined;
};

export const stripe =
  globalStripe.stripe ??
  new Stripe(process.env.STRIPE_PRIVATE_API_KEY as string, {
    apiVersion: '2022-11-15',
  });

if (process.env.NODE_ENV !== 'production') globalStripe.stripe = stripe;
