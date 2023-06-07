import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;
  const DOMAIN = request.nextUrl.origin;

  await prisma.registration.update({
    data: {
      isPaid: true,
    },
    where: {
      id,
    }
  });

  return NextResponse.redirect(`${DOMAIN}/checkout/succeeded/${id}`);
}
