import { prisma } from "@/lib/prisma";
import { DashboardClient } from "@/components/DashboardClient";

export default async function Home() {
  const [users, venues, bookings] = await Promise.all([
    prisma.user.findMany(),
    prisma.venue.findMany(),
    prisma.booking.findMany({
      include: {
        user: true,
        venue: true,
      },
    }),
  ]);

  return (
    <DashboardClient
      initialUsers={users}
      initialVenues={venues}
      initialBookings={bookings}
    />
  );
}