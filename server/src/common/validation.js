const Joi = require("joi");

const validateChat = (payload) => {
  const { error } = Joi.object({
    chatId: Joi.string(),
    message: Joi.string().min(1).max(200).required(),
  }).validate(payload);

  return error;
};

const validateReservation = (payload) => {
  const { error } = Joi.object({
    customerName: Joi.string().required(),
    phone: Joi.string()
      .pattern(/^\d{10}/)
      .required(),
    partySize: Joi.number().min(1).max(6),
    date: Joi.string()
      .pattern(
        /^(?:(?:(?:19|20)\d{2})-(?:(?:0[13578]|1[02])-(?:0[1-9]|[12][0-9]|3[01])|(?:0[469]|11)-(?:0[1-9]|[12][0-9]|30)|02-(?:0[1-9]|1[0-9]|2[0-8])))|(?:(?:19|20)(?:[02468][048]|[13579][26])-02-29)$/
      )
      .required(),
    time: Joi.string()
      .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
      .required(),
    tableNumber: Joi.number().min(1).max(4).required(),
  }).validate(payload);

  return error;
};

module.exports = { validateChat, validateReservation };
