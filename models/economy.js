const User = require('./user');

const getBalance = async (userId) => {
  const user = await User.findOne({ userId });
  return user ? user.balance : 0;
};

const getBankBalance = async (userId) => {
  const user = await User.findOne({ userId });
  return user ? user.bank : 0;
};

const claimDailyReward = async (userId) => {
  const reward = 100; // Example reward amount
  const now = new Date();
  const user = await User.findOne({ userId });

  if (user && user.lastDaily && (now - user.lastDaily < 24 * 60 * 60 * 1000)) {
    return { success: false, message: 'You have already claimed your daily reward. Please try again later.' };
  }

  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { $inc: { balance: reward }, lastDaily: now },
    { new: true, upsert: true }
  );
  return { success: true, reward };
};

const claimWeeklyReward = async (userId) => {
  const reward = 700; // Example reward amount
  const now = new Date();
  const user = await User.findOne({ userId });

  if (user && user.lastWeekly && (now - user.lastWeekly < 7 * 24 * 60 * 60 * 1000)) {
    return { success: false, message: 'You have already claimed your weekly reward. Please try again later.' };
  }

  const updatedUser = await User.findOneAndUpdate(
    { userId },
    { $inc: { balance: reward }, lastWeekly: now },
    { new: true, upsert: true }
  );
  return { success: true, reward };
};

const depositMoney = async (userId, amount) => {
  const user = await User.findOne({ userId });
  if (!user || user.balance < amount) return null;
  user.balance -= amount;
  user.bank += amount;
  await user.save();
  return true;
};

const withdrawMoney = async (userId, amount) => {
  const user = await User.findOne({ userId });
  if (!user || user.bank < amount) return null;
  user.bank -= amount;
  user.balance += amount;
  await user.save();
  return true;
};

const transferMoney = async (senderId, receiverId, amount) => {
  const sender = await User.findOne({ userId: senderId });
  const receiver = await User.findOneAndUpdate(
    { userId: receiverId },
    { $inc: { balance: amount } },
    { new: true, upsert: true }
  );
  if (!sender || sender.balance < amount) return null;
  sender.balance -= amount;
  await sender.save();
  await receiver.save();
  return true;
};

const playSlots = async (userId, amount) => {
  const user = await User.findOne({ userId });
  if (!user || user.balance < amount) return null;
  const win = Math.random() > 0.5;
  user.balance += win ? amount : -amount;
  await user.save();
  return { win, amount: win ? amount : -amount };
};

const playSpin = async (userId, amount) => {
  const user = await User.findOne({ userId });
  if (!user || user.balance < amount) return null;
  const win = Math.random() > 0.5;
  user.balance += win ? amount : -amount;
  await user.save();
  return { win, amount: win ? amount : -amount };
};

const getTopUsers = async () => {
  const users = await User.find().sort({ balance: -1, bank: -1 }).limit(10);
  return users.map(user => ({
    userId: user.userId,
    username: `User ${user.userId}`, // Replace with actual username fetching logic
    balance: user.balance + user.bank,
  }));
};

module.exports = {
  getBalance,
  getBankBalance,
  claimDailyReward,
  claimWeeklyReward,
  depositMoney,
  withdrawMoney,
  transferMoney,
  playSlots,
  playSpin,
  getTopUsers,
};
