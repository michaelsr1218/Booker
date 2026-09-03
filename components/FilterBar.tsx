'use client';

import { FilterState } from "@/types";

type FilterBarProps = {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
};

export function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-slate-800 rounded-lg text-white mb-6">
      {/* Status Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-300 font-medium">Availability</label>
        <select
          value={filters.status}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              status: e.target.value as FilterState["status"],
            })
          }
          className="bg-slate-700 text-white text-sm p-2 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="all">All Venues</option>
          <option value="available">Available Only</option>
          <option value="booked">Booked Only</option>
        </select>
      </div>

      {/* Capacity Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-300 font-medium">Min Capacity</label>
        <input
          type="number"
          min="0"
          placeholder="e.g. 30"
          value={filters.minCapacity || ""}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              minCapacity: Number(e.target.value) || 0,
            })
          }
          className="bg-slate-700 text-white text-sm p-2 rounded border border-slate-600 w-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Time Slot Filter */}
      <div className="flex flex-col gap-1">
        <label className="text-xs text-slate-300 font-medium">Time Slot</label>
        <select
          value={filters.selectedTime}
          onChange={(e) =>
            onFilterChange({
              ...filters,
              selectedTime: e.target.value,
            })
          }
          className="bg-slate-700 text-white text-sm p-2 rounded border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        >
          <option value="">Any Time</option>
          <option value="08:00">08:00 AM</option>
          <option value="09:00">09:00 AM</option>
          <option value="10:00">10:00 AM</option>
          <option value="11:00">11:00 AM</option>
          <option value="12:00">12:00 PM</option>
          <option value="13:00">01:00 PM</option>
          <option value="14:00">02:00 PM</option>
          <option value="15:00">03:00 PM</option>
          <option value="16:00">04:00 PM</option>
        </select>
      </div>

      {/* Reset Button */}
      <div className="flex flex-col justify-end self-end">
        <button
          onClick={() =>
            onFilterChange({
              status: "all",
              minCapacity: 0,
              selectedTime: "",
            })
          }
          className="text-xs text-slate-400 hover:text-white underline p-2"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}