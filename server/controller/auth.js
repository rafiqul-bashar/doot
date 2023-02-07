const jwt = require("jsonwebtoken");

const User = require("../models/user");

const signToken = (uid) => {
  jwt.sign({ uid }, process.env.JWT_SECRET);
};
// Register User
exports.register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  // checking req fields

  if (!fullName || !email || !password) {
    res.status(400).json({
      success: false,
      message: "fullName, email or password field cannot be empty",
    });
    return;
  }
  // checking if already a user
  const exist = await User.findOne({ email });
  if (exist) {
    res.status(400).json({
      success: false,
      message: "This email already exist. Please log in.",
    });
  } else {
    const newUser = await User.create({ fullName, email, password });
    if (newUser.password) {
      res.status(201).json({
        success: true,
        message: "User Created Successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Oops.. Something Went Wrong",
      });
    }
    next();
  }
};

// //  Generate OTP
// exports.sendOtp = async (req, res, next) => {
//   const { userId } = req;
//   const newOtp = otpGenerator.generate(6, {
//     upperCaseAlphabets: false,
//     lowerCaseAlphabets: false,
//     specialChars: false,
//   });
//   const otp_expire = Date.now() + 10 * 60 * 60; // 10 mins till expire
//   const user = await User.findOneAndUpdate(
//     { userId },
//     {
//       otp: newOtp,
//       otpExpiration: otp_expire,
//     }
//   );

//   user.otp = newOtp.toString();

//   await user.save({ new: true, validateModifiedOnly: true });

//   //  send email to verify otp

//   mailService.sendEmail({
//     from: "DootChat App",
//     to: user.email,
//     subject: "Verification Code",
//     html: otp(user.fullName, newOtp),
//     attachments: [],
//   });

//   res.status(200).json({
//     success: true,
//     message: "OTP Sent Successfully",
//   });
// };

//  Verify OTP

// exports.verifyOtp = async (req, res, next) => {
//   // verify otp and update field
//   const { email, otp } = req.body;
//   const user = await User.findOne({
//     email,
//     otpExpiration: { $gt: Date.now() },
//   });
//   if (!user) {
//     res.status(200).json({
//       success: false,
//       message: "Email is invalid or otp session expired",
//     });
//   }
//   if (!(await user.matchOtp(otp, user.otp))) {
//     res.status(400).json({
//       success: false,
//       message: "OTP is incorrect",
//     });
//   }

//   // if otp is correct
//   user.verified = true;
//   user.otp = undefined;
//   await user.save({ new: true, validateModifiedOnly: true });
//   const token = signToken(user._id);

//   res.status(200).json({
//     success: true,
//     message: "User Verified Successfully!",
//     token,
//   });
// };

// Login
exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({
      success: false,
      message: "Email or password both are required.",
    });
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    res.status(400).json({
      success: false,
      message: "No user found. Please check your email or register",
    });
  }
  if (!(await user.matchPassword(password, user.password))) {
    res.status(400).json({
      success: false,
      message: "Password is incorrect.",
    });
  }
  const uid = user?._id;
  const token = jwt.sign({ uid }, process.env.JWT_SECRET);
  
  const {fullName}=user
  
  res.status(200).json({
    success: true,
    user:{uid,email,fullName},
    message: "Logged in successfully",
    token,
  });
};
//  Middle Wares
exports.privateRoute = async (req, res, next) => {
  //  checking for token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }
  if (!token) {
    return next(
      new AppError(`You are not logged in! Please log in to continue.`, 401)
    );
  }

  //  verifying the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  //  Checking if user still exists

  const validUser = await User.findById(decoded.id);
  if (!validUser) {
    return next(new AppError("Invalid attempt", 401));
  }
  // pass to user to it's destination
  req.user = validUser;
  next();
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      status: "error",
      message: "No user found. Please check your email or register",
    });
  }
  //  generate random url

  const resetTokem = user.crea;
};

exports.resetPassword = async (req, res, next) => {
  // 1) checking if user is registered
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.body.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token is valid , set the new password
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "Token is Invalid or Expired",
    });
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  const token = signToken(user._id);
  res.status(200).json({
    success: true,
    message: "Password Reset Successfull.",
    token,
  });
};
