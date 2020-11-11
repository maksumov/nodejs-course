const router = require('express').Router({ mergeParams: true });
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const { toResponse } = require('./task.model');
const tasksService = require('./task.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { ERRORS, MESSAGES } = require('../../common/constants');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const tasks = await tasksService.getAll(req.params.boardId);
      if (!tasks) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.json(tasks.map(toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const task = await tasksService.create(req.params.boardId, req.body);
      if (!task) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.status(OK).send(toResponse(task));
    })
  );

router
  .route('/:taskId')
  .get(
    catchErrors(async (req, res) => {
      const task = await tasksService.get(
        req.params.boardId,
        req.params.taskId
      );
      res.status(OK).send(toResponse(task));
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const task = await tasksService.update(
        req.params.taskId,
        req.params.boardId,
        req.body
      );
      res.status(OK).send(toResponse(task));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const taskId = await tasksService.remove(
        req.params.boardId,
        req.params.taskId
      );
      if (!taskId) throw new ErrorHandler(NOT_FOUND, ERRORS.TASK_NOT_FOUND);
      res.status(204).send(MESSAGES.DELETE_TASK_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
