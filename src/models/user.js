const Joi = require('joi');

const userSchema = Joi.object({
  collection: Joi.string().default('accounts'),
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  verified: Joi.string().default('new'),
});

const loginSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(6).required(),
});

// const userVerifiedSchema = Joi.object({
//   verified: Joi.string().required(),
// });

// const userQuerySchema = Joi.object({
//   collection: Joi.string().default('accounts'),
//   id: Joi.string().default(null),
//   limit: Joi.number().default(25),
// });

module.exports = {
  userSchema, loginSchema,
//   userVerifiedSchema, userQuerySchema,
};
