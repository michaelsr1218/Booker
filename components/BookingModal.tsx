'use client';

import { useState } from "react";
import { Venue, Booking, User } from "@/types";
import { workingHours } from "@/lib/mockData";

type BookingModalProps = {
  venue: Venue | null;
  currentUser: User;
  existingBookings: Booking[];
  onClose: () => void;
  onSubmit: (newBooking: Omit<Booking, "id">) => void;
};

export function BookingModal({
  venue,
  currentUser,
  existingBookings,
  onClose,
  onSubmit,
}: BookingModalProps) {
  const [date, setDate] = useState("2026-09-03");
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("09:00");
  const [error, setError] = useState<string | null>(null);

  if (!venue) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Enforce working hours bounds
    if (startTime < workingHours.start || endTime > workingHours.end) {
      setError(`Bookings must be between ${workingHours.start} and ${workingHours
        .end}.`);
      return;
    }

    // 2. Enforce minimum time duration logic
    if (startTime >= endTime) {
      setError("End time must be after start time.");
      return;
    }

    // 3. Prevent double-booking / time slot overlap
    const hasOverlap = existingBookings.some((b) => {
      if (b.venueId !== venue.id || b.date !== date) return false;
      return startTime < b.endTime && endTime > b.startTime;
    });

    if (hasOverlap) {
      setError("This venue is already booked for the selected time slot.");
      return;
    }

    // 4. Trigger creation if all checks pass
    onSubmit({
      venueId: venue.id,
      //teacherId: currentUser.id,
      teacherName: currentUser.name,
      date,
      startTime,
      endTime,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 w-full max-w-md shadow-xl text-white">
        <h2 className="text-xl font-bold mb-1">Book {venue.name}</h2>
        <p className="text-xs text-slate-400 mb-4">
          Capacity: {venue.capacity} guests | Location: {venue.location}
        </p>

        {error && (
          <div className="mb-4 text-xs bg-red-950/80 border border-red-800 text-red-200 p-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                Start Time
              </label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">
                End Time
              </label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full bg-slate-700 border border-slate-600 rounded p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <p className="text-[11px] text-slate-400">
            Working hours: {workingHours.start} - {workingHours.end}
          </p>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm rounded bg-slate-700 hover:bg-slate-600 font-medium cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-500 font-medium cursor-pointer"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}