// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

const facilitiesConfig = {
  'Clubhouse': [
    { start: '10:00', end: '16:00', rate: 100 },
    { start: '16:00', end: '22:00', rate: 500 },
  ],
  'Tennis Court': [
    { start: '00:00', end: '23:59', rate: 50 },
  ],
};

const Facality = () => {
  const [bookings, setBookings] = useState([]);

  const bookFacility = (name, date, startTime, endTime) => {
    const facility = facilitiesConfig[name];
    const newBooking = { name, date, startTime, endTime };
    
    // Check for booking conflicts
    for (const booking of bookings) {
      if (booking.name === name && booking.date === date) {
        const bookedStart = new Date(`${date}T${booking.startTime}`);
        const bookedEnd = new Date(`${date}T${booking.endTime}`);
        const newStart = new Date(`${date}T${startTime}`);
        const newEnd = new Date(`${date}T${endTime}`);
        
        if (!(newEnd <= bookedStart || newStart >= bookedEnd)) {
          return `Booking Failed, Already Booked`;
        }
      }
    }

    // Calculate cost
    const start = new Date(`${date}T${startTime}`);
    const end = new Date(`${date}T${endTime}`);
    let totalCost = 0;

    facility.forEach(({ start: slotStart, end: slotEnd, rate }) => {
      const slotStartTime = new Date(`${date}T${slotStart}`);
      const slotEndTime = new Date(`${date}T${slotEnd}`);
      
      if (start < slotEndTime && end > slotStartTime) {
        const effectiveStart = start > slotStartTime ? start : slotStartTime;
        const effectiveEnd = end < slotEndTime ? end : slotEndTime;
        const hours = (effectiveEnd - effectiveStart) / 3600000;
        totalCost += hours * rate;
      }
    });

    setBookings([...bookings, newBooking]);
    return `Booked, Rs. ${totalCost}`;
  };

  const handleBooking = (facility, date, startTime, endTime) => {
    const result = bookFacility(facility, date, startTime, endTime);
    alert(result);
  };

  return (
    <div>
      <h1>Facility Booking System</h1>
      <button onClick={() => handleBooking('Clubhouse', '2020-10-26', '16:00', '22:00')}>
        Book Clubhouse 16:00-22:00 on 26-10-2020
      </button>
      <button onClick={() => handleBooking('Tennis Court', '2020-10-26', '16:00', '20:00')}>
        Book Tennis Court 16:00-20:00 on 26-10-2020
      </button>
      <button onClick={() => handleBooking('Clubhouse', '2020-10-26', '16:00', '22:00')}>
        Book Clubhouse 16:00-22:00 on 26-10-2020
      </button>
      <button onClick={() => handleBooking('Tennis Court', '2020-10-26', '17:00', '21:00')}>
        Book Tennis Court 17:00-21:00 on 26-10-2020
      </button>
      <div>
        <h2>Bookings</h2>
        <ul>
          {bookings.map((booking, index) => (
            <li key={index}>
              {booking.name} on {booking.date} from {booking.startTime} to {booking.endTime}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Facality;
