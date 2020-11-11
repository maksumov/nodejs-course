const { Task } = require('./task.model');

const getAll = async () => {
  const tasks = await Task.find({}).exec();
  return tasks;
};

const create = async Data => {
  const task = await Task.create(Data);
  return task;
};

const get = async taskId => {
  const task = await Task.findById({ _id: taskId });
  return task !== null ? task : undefined;
};

const update = async (taskId, taskData) => {
  const isUpdate = (await Task.updateOne({ _id: taskId }, taskData)).ok;
  return isUpdate === 1 ? taskData : undefined;
};

const remove = async taskId => {
  const isDeleted = (await Task.deleteOne({ _id: taskId })).ok;
  return isDeleted;
};

module.exports = { getAll, create, get, update, remove };
