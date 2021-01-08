const Joi = require('@hapi/joi');

// Regitser user schema
const validateNewUser = data => {
  const schema = Joi.object({
    fname: Joi.string().alphanum().min(2).required(),
    lname: Joi.string().alphanum().min(2).required(),
    email: Joi.string().email().required(),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(6).required(),
    floor: Joi.string().required(),
    appartment: Joi.string().required(),
  });

  return schema.validate({ ...data });
};

// Login user schema
const validateLogin = data => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  return schema.validate({ ...data });
};

module.exports = { validateNewUser, validateLogin };
