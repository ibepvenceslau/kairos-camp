import { NextRequest, NextResponse } from 'next/server';

import { stripe } from '@/lib/stripe';

export async function POST(request: NextRequest) {
  const { id, email } = await request.json();

  const DOMAIN = request.nextUrl.origin;

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: process.env.STRIPE_KAIROS_CAMP_PRICE,
        quantity: 1,
      },
    ],
    mode: 'payment',
    customer_email: email, 
    success_url: `${DOMAIN}/api/checkout/succeeded/${id}`,
    cancel_url: `${DOMAIN}/inscricoes`,
  });

  if (!session || !session.url) {
    return NextResponse.json('Failed to create checkout session', { status: 400 });
  }

  return NextResponse.json({
    url: session.url,
  });
}
