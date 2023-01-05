const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: [true, "Please enter a username"] },
    email: {
      type: String,
      match: /.+\@.+\..+/,
      required: [true, "Please enter a email"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: 8,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.joiValidate = function (obj) {
  var Joi = require("joi");
  var schema = {
    username: Joi.types.String().min(6).max(30).required(),
    password: Joi.types
      .String()
      .min(8)
      .max(30)
      .regex(/[a-zA-Z0-9]{3,30}/)
      .required(),
    email: Joi.types.String().email().required(),
  };
  return Joi.validate(obj, schema);
};

module.exports = mongoose.model("User", userSchema);
