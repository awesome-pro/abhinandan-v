import { NextRequest, NextResponse, NextMiddleware } from "next/server";
import { PrismaClient } from '@prisma/client'


export async function GET(request: NextRequest) {
  const prisma  = new PrismaClient();
  const { searchParams } = new URL(request.url, 'http://localhost:3000');
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const age = searchParams.get('age');
  const address = searchParams.get('address');

  let intID = id ? parseInt(id) : NaN;
  console.log(intID);

  // ensure that the query parameters must contain id and one of the following: name, email, phone, age, address
  // if (!id || !(name || email || phone || age || address)) {
  //   return NextResponse.json({ error: 'Invalid query parameters' }, { status: 400 });
  // }


  const patient = await prisma.patient.findFirst({
    where: {
      id: intID,
    }
  });

  if (!patient) {
    return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
  }

  return NextResponse.json(patient);
}

export async function POST(request: NextRequest) {
  const prisma  = new PrismaClient();

  const { name, email, phone, age, address } = await request.json();

  console.log(name, email, phone, age, address);

  // ensure that the request body must contain email
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  try {
  
    
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Patient not created' }, { status: 404 });
  }

}



export async function PUT(request: NextRequest) {
  const prisma  = new PrismaClient();

  const { id, name, email, phone, age, address } = await request.json();

  const patient = await prisma.patient.update({
    where: {
      id: id
    },
    data: {
      name,
      email,
      phone,
      age: Number(age),
      address
    }
  });

  if (!patient) {
    return NextResponse.json({ error: 'Patient not updated' }, { status: 404 });
  }

  return NextResponse.json(patient, { status: 200 });
}