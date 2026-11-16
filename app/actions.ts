'use server';

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createBooking(data: {
  venueId: string;
  userId: string;
  startTime: string;
  endTime: string;
}) {
  const newBooking = await prisma.booking.create({
    data: {
      venueId: data.venueId,
      userId: data.userId,
      startTime: data.startTime,
      endTime: data.endTime,
    },
  });

  revalidatePath('/');
  return newBooking;
}