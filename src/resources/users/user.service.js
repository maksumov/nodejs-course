const usersRepo = require('./user.DB.repository');
const tasksRepo = require('../tasks/task.DB.repository');
const { hashPassword } = require('../../utils/hashHelper');

const getAll = async () => await usersRepo.getAll();

const get = async userId => await usersRepo.get(userId);

const create = async userData => {
  const password = await hashPassword(userData);
  const res = await usersRepo.create({ ...userData, password });
  return res;
};

const update = async (userId, userData) => {
  const password = await hashPassword(userData);
  const res = await usersRepo.update(userId, { ...userData, password });
  return res;
};

const remove = async userId => {
  const getAllTask = await tasksRepo.getAll();
  const tasks = getAllTask.filter(task => task.userId === userId);
  for (const task of tasks) {
    await tasksRepo.update(task.id, { ...task.toObject(), userId: null });
  }
  const isDel = await usersRepo.remove(userId);
  return isDel;
};

module.exports = { getAll, get, create, update, remove };
