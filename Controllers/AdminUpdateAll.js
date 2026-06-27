const User = require('../Models/Users')

const AdminUpdateAll = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    // console.error(err);
    return res.status(500).json({
      message: err.message,
    });
  }
}
module.exports = AdminUpdateAll;