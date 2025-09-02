// Simple in-memory database for bookings
let bookings = [];
let nextId = 1;

const inMemoryDB = {
  // Get all bookings
  getAllBookings: () => {
    return bookings;
  },

  // Add a new booking
  addBooking: (bookingData) => {
    const booking = {
      _id: nextId.toString(),
      ...bookingData,
      createdAt: new Date(),
      status: 'pending'
    };
    bookings.push(booking);
    nextId++;
    return booking;
  },

  // Get booking by ID
  getBookingById: (id) => {
    return bookings.find(booking => booking._id === id);
  },

  // Update booking
  updateBooking: (id, updateData) => {
    const index = bookings.findIndex(booking => booking._id === id);
    if (index !== -1) {
      bookings[index] = { ...bookings[index], ...updateData };
      return bookings[index];
    }
    return null;
  },

  // Delete booking
  deleteBooking: (id) => {
    const index = bookings.findIndex(booking => booking._id === id);
    if (index !== -1) {
      return bookings.splice(index, 1)[0];
    }
    return null;
  }
};

module.exports = inMemoryDB;