import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const registrations = await prisma.registration.findMany();

  return NextResponse.json(registrations);
}

export async function POST(request: NextRequest) {
  const {
    name,
    birthDate,
    email,
    phone,
    rg,
    cpf,
    streetName,
    streetNumber,
    neighborhood,
    complement,
    city,
    state,
    isChurchMember,
    churchName,
    churchLeaderName,
    responsibleName,
    responsibleBirthDate,
    responsibleEmail,
    responsiblePhone,
    responsibleRg,
    responsibleCpf,
    degreeOfKinship,
  } = await request.json();

  const registration = await prisma.registration.create({
    data: {
      name,
      birthDate: new Date(birthDate),
      email,
      phone,
      rg,
      cpf,
      streetName,
      streetNumber,
      neighborhood,
      complement,
      city,
      state,
      isChurchMember: Boolean(isChurchMember),
      churchName,
      churchLeaderName,
      responsibleName,
      responsibleBirthDate: responsibleBirthDate ? new Date(responsibleBirthDate) : undefined,
      responsibleEmail,
      responsiblePhone,
      responsibleRg,
      responsibleCpf,
      degreeOfKinship,
    },
  });

  return NextResponse.json(registration);
}
