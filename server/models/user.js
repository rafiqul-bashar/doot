const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const userSchema = new Schema(
  {
    fullName: {
      type: String,
      min: [6, "Looks like name is invalid"],
      require: [true, "User Name is required"],
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      validate: {
        validator: function (email) {
          return String(email)
            .toLowerCase()
            .match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        },
        message: (props) => `${props.value} looks like invalid email.`,
      },
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
      require: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: {
      type: String,
    },
    passwordResetTokenExpires: {
      type: Date,
    },
    otp: {
      type: Number,
    },
    otpExpiration: {
      type: Date,
    },
    verified: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || !this.password) return next();

  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //! Shift it to next hook // this.passwordChangedAt = Date.now() - 1000;

  next();
});
userSchema.methods.matchOtp = async (reqOtp, dbOtp) => {
  return await bcrypt.compare(reqOtp, dbOtp);
};
userSchema.methods.matchPassword = async (reqPass, dbPass) => {
  return await bcrypt.compare(reqPass, dbPass);
};
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};
const User = new mongoose.model("User", userSchema);
module.exports = User;
