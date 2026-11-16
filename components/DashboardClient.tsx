'use client';

import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { FilterBar } from "@/components/FilterBar";
import { VenueCard } from "@/components/VenueCard";
import { BookingModal } from "@/components/BookingModal";
import { User, Booking, FilterState, Venue } from "@/types";
import { createBooking } from "@/app/actions";

interface DashboardClientProps {
  initialUsers: User[];
  initialVenues: Venue[];
  initialBookings: Booking[];
}

export function DashboardClient({
  initialUsers,
  initialVenues,
  initialBookings,
}: DashboardClientProps) {
  const [currentUser, setCurrentUser] = useState<User>(
    initialUsers[0] || { id: "", name: "Guest", role: "user" }
  );
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    minCapacity: 0,
    selectedTime: "",
  });

  const handleAddBooking = async (newBookingData: Omit<Booking, "id">) => {
    try {
      const createdBooking = await createBooking({
        venueId: newBookingData.venueId,
        userId: newBookingData.userId,
        startTime: newBookingData.startTime,
        endTime: newBookingData.endTime,
      });
  
      setBookings((prev) => [...prev, createdBooking]);
      setSelectedVenue(null);
    } catch (error) {
      console.error("Failed to save booking to database:", error);
    }
  };
  const filteredVenues = initialVenues.filter((venue) => {
    if (venue.capacity < filters.minCapacity) return false;

    const venueBookings = bookings.filter((b) => b.venueId === venue.id);

    if (filters.selectedTime) {
      const isBookedAtTime = venueBookings.some(
        (b) => filters.selectedTime >= b.startTime && filters.selectedTime < b.endTime
      );

      if (filters.status === "available" && isBookedAtTime) return false;
      if (filters.status === "booked" && !isBookedAtTime) return false;
    } else {
      if (filters.status === "available" && venueBookings.length > 0) return false;
      if (filters.status === "booked" && venueBookings.length === 0) return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      <Navbar currentUser={currentUser} onUserChange={setCurrentUser} />

      <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-1">Venue Dashboard</h2>
          <p className="text-sm text-slate-400">
            Browse available room capacity and schedule bookings within working hours.
          </p>
        </div>

        <FilterBar filters={filters} onFilterChange={setFilters} />

        {filteredVenues.length === 0 ? (
          <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700">
            <p className="text-slate-400">No venues match your current filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                bookings={bookings}
                currentUser={currentUser}
                onBookClick={setSelectedVenue}
              />
            ))}
          </div>
        )}

        <BookingModal
          venue={selectedVenue}
          currentUser={currentUser}
          existingBookings={bookings}
          onClose={() => setSelectedVenue(null)}
          onSubmit={handleAddBooking}
        />
      </main>
    </div>
  );
}