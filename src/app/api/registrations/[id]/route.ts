import { NextRequest, NextResponse } from 'next/server';

import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest, context: any) {
  const { id } = context.params;

  const registration = await prisma.registration.findUnique({
    where: {
      id,
    }
  });

  return NextResponse.json(registration);
}
