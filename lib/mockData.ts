import {User, Venue, Booking} from '@/types';

export const workingHours = { 
    start: '08:00',
    end: '21:00'
};

export const mockUsers: User[] = [
    { id: "u1", name: "Sarah Jenkins", role: "teacher" },
    { id: "u2", name: "David Chen", role: "teacher" },
    { id: "u3", name: "Alex Rivera", role: "student" },
  ];
  
  export const mockVenues: Venue[] = [
    { id: "v1", name: "Auditorium A", capacity: 150, location: "Main Building, Floor 1" },
    { id: "v2", name: "Science Lab 3", capacity: 30, location: "Science Block, Floor 2" },
    { id: "v3", name: "Conference Room B", capacity: 12, location: "Admin Wing, Floor 1" },
    { id: "v4", name: "Lecture Hall 101", capacity: 80, location: "East Wing, Floor 1" },
  ];
  
  export const mockBookings: Booking[] = [
    {
      id: "b1",
      venueId: "v1",
      //teacherId: "u1",
      teacherName: "Sarah Jenkins",
      date: "2026-09-03",
      startTime: "09:00",
      endTime: "11:00",
    },
    {
      id: "b2",
      venueId: "v2",
      //teacherId: "u2",
      teacherName: "David Chen",
      date: "2026-09-03",
      startTime: "13:00",
      endTime: "15:00",
    },
  ];