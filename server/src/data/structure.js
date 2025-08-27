const restaurant = {
  availability: "5:00 PM to 11:00 PM",
  timeslots: "30min",
  tables: [
    {
      id: 1,
      capacity: 2,
    },
    {
      id: 2,
      capacity: 4,
    },
    {
      id: 3,
      capacity: 2,
    },
    {
      id: 4,
      capacity: 6,
    },
  ],
};

let reservations = [];

const chats = {};

const setReservations = (reservation) => {
  reservations = reservation;
};

const getReservations = () => {
  return reservations;
};

module.exports = {
  restaurant,
  reservations,
  chats,
  getReservations,
  setReservations,
};
