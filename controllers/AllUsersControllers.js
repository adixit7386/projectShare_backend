const User = require("../models/User");
const AllUsers = async (req, res, next) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { username: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  try {
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    let requiredUsers = [];
    let obj = {};
    for (let i = 0; i < users.length; i++) {
      obj = {
        name: users[i].name,
        username: users[i].username,
        _id: users[i]._id,
        email: users[i].email,
        image: users[i].image,
      };
      requiredUsers.push(obj);
    }
    res.json(requiredUsers).status(201);
  } catch (err) {
    return next(err);
  }
};

module.exports = AllUsers;
