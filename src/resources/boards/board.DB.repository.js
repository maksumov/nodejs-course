const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => {
  return Board.find({}).exec();
};

const add = async boardData => {
  return Board.create(boardData);
};

const get = async boardId => {
  const board = await Board.findById(boardId);
  return board !== null ? board : undefined;
};

const update = async (boardId, boardData) => {
  const isUpdate = (await Board.updateOne({ _id: boardId }, boardData)).ok;
  return isUpdate === 1 ? boardData : undefined;
};

const remove = async boardId => {
  await Task.deleteMany({ boardId });
  const boardDeleted = await Board.findByIdAndDelete(boardId);
  return boardDeleted;
};

module.exports = { getAll, add, get, update, remove };
