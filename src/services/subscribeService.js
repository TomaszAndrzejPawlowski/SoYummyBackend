const User = require("../models/userModel");

const sendNewsletter = async (userId, subscription, email) => {
  if (!subscription) {
    const subscribedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { subscription: true, subscriptionEmail: email } }
    );
    return subscribedUser;
  } else {
    return 400;
  }
};

module.exports = { sendNewsletter };
