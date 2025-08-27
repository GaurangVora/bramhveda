const { reservations } = require("../data/structure");
const { validateReservation } = require("./validation");

const createReservation = ({
  date,
  time,
  tableNumber,
  partySize,
  phone,
  customerName,
}) => {
  try {
    const invalid = validateReservation({
      date,
      time,
      tableNumber,
      partySize,
      phone,
      customerName,
    });

    if (invalid) {
      throw new Error(invalid);
    }

    const reservationId = reservations.length + 1;

    reservations.push({
      id: reservationId,
      date,
      time,
      tableNumber,
      partySize,
      phone,
      customerName,
    });

    return reservationId;
  } catch (error) {
    throw error;
  }
};

const deleteReservation = (id) => {
  try {
    if (reservations.find((reservation) => reservation.id === id)) {
      reservations = reservations.filter(
        (reservation) => reservation.id !== id
      );

      return id;
    }

    return null;
  } catch (error) {
    throw error;
  }
};

const getReservations = () => {
  try {
    return reservations;
  } catch (error) {
    throw error;
  }
};

const getReservationById = (id) => {
  try {
    return reservations.find((reservation) => reservation.id === id) ?? null;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createReservation,
  deleteReservation,
  getReservations,
  getReservationById,
};
