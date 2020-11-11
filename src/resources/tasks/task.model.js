const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const uuid = require('uuid');

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String,
    _id: {
      type: String,
      default: uuid
    }
  },
  { collections: 'tasks' }
);

const toResponse = task => {
  const { _id, title, order, description, userId, boardId, columnId } = task;
  return { id: _id, title, order, description, userId, boardId, columnId };
};

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};
