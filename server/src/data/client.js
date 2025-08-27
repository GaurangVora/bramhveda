const { OpenAI } = require("openai");
const { restaurant, getReservations } = require("./structure");

const client = new OpenAI({ apiKey: process.env.OPENAI_SECRET_KEY });

async function communicate(chatHistory) {
  const response = await client.responses.create({
    model: "gpt-5",
    reasoning: { effort: "low" },
    input: [
      {
        role: "developer",
        content: `
          You will be an AI agent the handles the reservation at a restaurant. You will serve the customers of this restaurant and help them book their reservation.
          You shall extract all the relevant information required for the reservation through their natural language. Do not ask any additional information which is not required.
          You shall create, modify or remove reservations as needed by the customer.
          When asked to create a reservation, you shall check table availability and prevent double booking. Additionally, you shall provide clear confirmation messages, handle booking conflicts gracefully,
          and suggest alternatives when requested time is unavailable.

          For reservations, you will need these details: 
          {
            id: 1,
            customerName: "John Smith",
            phone: "555-1234", 
            partySize: 2,
            date: "2025-07-15",
            time: "19:30",
            tableNumber: 3
          }

          The reservations will be saved in JSON array. You shall refer to the existing reservations from this. 
          reservations = ${JSON.stringify(getReservations())} 

          The restaurant also had certain limitations that you need to adhere while checking or making reservations. 
          The working hours for the restaurant are ${
            restaurant.availability
          }. It has a timeslot limitation of ${restaurant.timeslots}.
          The table and capacity, represented in a JSON array, is ${
            JSON.stringify(restaurant.tables)
          }

          Modify and output the reservations JSON after a successful reservation operation.
          The JSON should be outputted at the end of output_text separated from the output message with the mark as END_OF_MESSAGE.
        `,
      },
      ...chatHistory.map((chat) => {
        if (chat.replyBy === "USER") {
          return {
            role: "user",
            content: chat.message,
          };
        } else {
          return {
            role: "assistant",
            content: chat.message,
          };
        }
      }),
    ],
  });

  return response.output_text;
}

module.exports = { client, communicate };
