const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  try {
    const { name, email, password } = userData;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return 409;
    }
    const user = new User({ name, email });
    user.setPassword(password);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    user.token = token;
    await user.save();
    return {
      user: {
        name: user.name,
        email: user.email,
        token: user.token,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
};

const login = async (userData) => {
  try {
    const { email, password } = userData;
    const registeredUser = await User.findOne({ email });
    if (
      !registeredUser ||
      !bcrypt.compareSync(password, registeredUser.password)
    ) {
      return 401;
    }
    if (registeredUser.token) {
      return 400;
    }
    const token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET);
    await User.findOneAndUpdate(
      { _id: registeredUser._id },
      { $set: { token } }
    );
    const user = await User.findOne({ email });
    return {
      user: {
        name: user.name,
        email: user.email,
        token: user.token,
      },
    };
  } catch (err) {
    console.log(err.message);
  }
};

const logout = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user || !user.token) {
      return 400;
    }
    await User.updateOne({ _id: userId }, { $set: { token: null } });
  } catch (err) {
    console.log(err.message);
  }
};

const getUser = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return 400;
    }
    return user;
  } catch (err) {
    console.log(err.message);
  }
};

const editUser = async (userId, userData) => {
  try {
    const { name, avatar } = userData;
    if (name && avatar) {
      return await User.findOneAndUpdate(
        { _id: userId },
        { $set: { name, avatar } }
      );
    }
    if (name && !avatar) {
      return await User.findOneAndUpdate({ _id: userId }, { $set: { name } });
    }
    if (avatar && !name) {
      return await User.findOneAndUpdate({ _id: userId }, { $set: { avatar } });
    }
    return;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { register, login, logout, getUser, editUser };
