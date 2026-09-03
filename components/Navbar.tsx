'use client';

import {User} from '@/types';
import {mockUsers} from '@/lib/mockData';

type NavbarProps = {
    currentUser: User;
    onUserChange: (user: User) => void;
};

export function Navbar({currentUser, onUserChange}: NavbarProps){
    return(
        <header className='flex items-center justify-between p-4 bg-slate-900 text-white shadow-md'>
            <h1 className='text-xl font-bold'>Venue Booker</h1>
            <div className='flex items-center gap-3'>
                <span className='text-sm text-slate-300'>Simulation:</span>
                <select
                value={currentUser.id}
                onChange={(e)=> {
                    const selected = mockUsers.find((u)=> u.id === e.target.value);
                    if(selected) onUserChange(selected);
                }}
                className='bg-slate-800 text-white text-sm p-2 rounded-md border border-slate-700 cursor-pointer'>
                {mockUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                        {user.name} ({user.role})
                    </option>
                ))}    
                </select>
            </div>
        </header>
    );
}