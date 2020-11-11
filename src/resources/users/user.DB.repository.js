const { User } = require('./user.model');

const getAll = async () => {
  return User.find({}).exec();
};

const create = async userData => {
  return User.create(userData);
};

const get = async id => {
  const user = await User.findById(id);
  return user !== null ? user : undefined;
};

const getByLogin = async ({ login }) => {
  const user = await User.findOne({ login });
  return user;
};

const update = async (id, userData) => {
  const isUpdate = (await User.updateOne({ _id: id }, userData)).ok;
  return isUpdate === 1 ? userData : undefined;
};

const remove = async id => {
  const isDeleted = (await User.deleteOne({ _id: id })).ok;
  return isDeleted;
};

module.exports = { getAll, get, getByLogin, create, update, remove };
