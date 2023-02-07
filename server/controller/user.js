const User = require("../models/user");
const filterObj = require("../utils/filterObj");

exports.updateProfile = async (req, res, next) => {
  const filteredBody = filterObj(
    req.body,
    "fullName",
    "email",
    "bio",
    "avatar"
  );

  const userDoc = await User.create(filteredBody);

  res.status(200).json({
    status: "success",
    data: userDoc,
    message: "User Updated successfully",
  });
};
