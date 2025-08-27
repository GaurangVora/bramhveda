const { validateChat } = require("../common/validation");
let {
  chats,
  reservations,
  getReservations,
  setReservations,
} = require("../data/structure");
const { randomUUID } = require("crypto");
const { communicate } = require("../data/client");

const chat = async (req, res) => {
  try {
    const invalid = validateChat(req.body);

    if (invalid) {
      return res.status(401).json({
        error: invalid,
        data: {},
        status: false,
      });
    }

    const message = {
      replyBy: "USER",
      messageId: randomUUID(),
      message: req.body.message,
    };

    if (req.body.chatId && chats[req.body.chatId]) {
      chats[req.body.chatId].push(message);
    } else {
      req.body.chatId = randomUUID();
      chats[req.body.chatId] = [message];
    }

    const answer = await communicate(chats[req.body.chatId]);

    const segments = answer.split("END_OF_MESSAGE");
    const updates = JSON.parse(segments[1] || null);

    if (updates) {
      setReservations(updates);
    }

    chats[req.body.chatId]?.push({
      replyBy: "SYSTEM",
      messageId: randomUUID(),
      message: segments[0],
    });

    return res.status(201).json({
      status: true,
      error: null,
      data: {
        chatId: req.body.chatId,
        message: segments[0],
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      data: {},
      status: false,
    });
  }
};

const getChat = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(401).json({
        error: "Invalid Chat Id",
        data: {},
        status: false,
      });
    }

    if (!chats[id]) {
      return res.status(404).json({
        error: "Invalid Chat Id",
        data: {},
        status: false,
      });
    }

    return res.status(200).json({
      error: null,
      data: {
        chatId: id,
        messages: chats[id],
      },
      status: true,
    });
  } catch (error) {
    return res.status(500).json({
      error,
      data: {},
      status: false,
    });
  }
};

module.exports = { chat, getChat };
