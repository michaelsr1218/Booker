export type UserRole = 'teacher' | 'student' | 'admin';

export type User = {
    id: string;
    name: string;
    role: UserRole;
};

export type Venue = {
    id: string;
    name: string;
    capacity: number;
    location: string;
};

export type Booking = {
    id: string;
    venueId: string;
    teacherName: string;
    date: string;
    startTime: string;
    endTime: string;
};

export type FilterState = {
    status: 'all' | 'available' | 'booked';
    minCapacity: number;
    selectedTime: string;
};

