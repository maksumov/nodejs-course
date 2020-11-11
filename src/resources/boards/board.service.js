const boardsRepo = require('./board.DB.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const add = boardData => boardsRepo.add(boardData);

const get = boardId => boardsRepo.get(boardId);

const update = (boardId, boardData) => boardsRepo.update(boardId, boardData);

const remove = async boardId => {
  const tasksInBoard = await tasksService.getAll(boardId);
  tasksInBoard.forEach(
    async task => await tasksService.remove(boardId, task.id)
  );
  return boardsRepo.remove(boardId);
};

module.exports = { getAll, add, get, update, remove };
