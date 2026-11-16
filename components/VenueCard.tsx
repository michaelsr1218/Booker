'use client';

import { Venue, Booking, User } from "@/types";

type VenueCardProps = {
  venue: Venue;
  bookings: Booking[];
  currentUser: User;
  onBookClick: (venue: Venue) => void;
};

export function VenueCard({ venue, bookings, currentUser, onBookClick }: VenueCardProps) {
  const venueBookings = bookings.filter((b) => b.venueId === venue.id);
  const isTeacher = currentUser.role === "teacher";

  return (
    <div className="bg-slate-800 rounded-lg p-5 border border-slate-700 flex flex-col justify-between shadow-md">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-white">{venue.name}</h3>
          <span className="bg-slate-700 text-blue-400 text-xs px-2.5 py-1 rounded font-medium">
            Cap: {venue.capacity}
          </span>
        </div>
        <p className="text-xs text-slate-400 mb-4">{venue.location}</p>

        {/* Existing Bookings List */}
        <div className="mb-4">
          <h4 className="text-xs font-semibold text-slate-300 mb-2 uppercase tracking-wider">
            Scheduled Bookings
          </h4>
          {venueBookings.length === 0 ? (
            <p className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 p-2 rounded">
              No active bookings
            </p>
          ) : (
            <ul className="space-y-1.5">
              {venueBookings.map((b) => (
                <li
                  key={b.id}
                  //className="text-xs bg-slate-700/60 p-2 rounded border border-slate-600/50 text-slate-200 flex justify-between items-center"
                className="text-xm p-2 flex justify-between items-center"
                >
                  <span>
                    {b.startTime} - {b.endTime}
                  </span>
                  <span className="text-slate-400 text-[11px]">{b.teacherName}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Action Button */}
      <div>
        {isTeacher ? (
          <button
            onClick={() => onBookClick(venue)}
            className="w-full bg-blue-900 hover:bg-blue-500 text-white font-medium text-sm py-2 px-4 rounded transition-colors cursor-pointer"
          >
            Book Venue
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-slate-700 text-slate-400 font-medium text-sm py-2 px-4 rounded cursor-not-allowed opacity-60"
          >
            Teacher Access Required
          </button>
        )}
      </div>
    </div>
  );
}