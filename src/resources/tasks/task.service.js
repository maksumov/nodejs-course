const tasksRepo = require('./task.DB.repository');
const boardsRepo = require('../boards/board.DB.repository');

const { BAD_REQUEST, getStatusText, NOT_FOUND } = require('http-status-codes');
const { ErrorHandler } = require('../../common/error');
const { TASK_NOT_FOUND } = require('../../common/constants');

const getAll = async boardId => {
  const board = boardsRepo.get(boardId);
  if (!board) {
    throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
  }
  const tasks = await tasksRepo.getAll();
  if (!tasks) return [];
  return tasks.filter(task => task.boardId === boardId);
};

const get = async (boardId, taskId) => {
  const board = await boardsRepo.get(boardId);
  if (!board) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }

  const task = await tasksRepo.get(taskId);
  if (!task) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }
  return task;
};

const create = async (id, taskData) => {
  const task = await tasksRepo.create({ ...taskData, boardId: id });
  return task;
};

const update = async (taskId, boardId, taskData) => {
  const updateTask = tasksRepo.update(taskId, taskData);
  if (!updateTask || taskData.boardId !== boardId) {
    throw new ErrorHandler(NOT_FOUND, TASK_NOT_FOUND);
  }
  return updateTask;
};

const remove = async (boardId, taskId) => tasksRepo.remove(taskId);

module.exports = { getAll, get, create, update, remove };
