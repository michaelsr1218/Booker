import { User as PrismaUser, Venue as PrismaVenue, Booking as PrismaBooking } from '@prisma/client';

export type UserRole = string;

export type User = PrismaUser;

export type Venue = PrismaVenue;

export type Booking = PrismaBooking & {
  teacherName?: string;
  date?: string;
  user?: User;
  venue?: Venue;
};

export interface FilterState {
  status: 'all' | 'available' | 'booked';
  minCapacity: number;
  selectedTime: string;
}