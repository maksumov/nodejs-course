const router = require('express').Router();
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const { toResponse } = require('./board.model');
const boardsService = require('./board.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { MESSAGES } = require('../../common/constants');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const boards = await boardsService.getAll();
      res.json(boards.map(toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const board = await boardsService.add(req.body);
      res.status(OK).send(toResponse(board));
    })
  );

router
  .route('/:boardId')
  .get(
    catchErrors(async (req, res) => {
      const board = await boardsService.get(req.params.boardId);
      if (!board) {
        throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
      }
      res.status(OK).send(toResponse(board));
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const boardUpdate = await boardsService.update(
        req.params.boardId,
        req.body
      );
      if (!boardUpdate) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.status(OK).send(toResponse(boardUpdate));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const board = await boardsService.remove(req.params.boardId);
      if (!board) {
        throw new ErrorHandler(NOT_FOUND, getStatusText(NOT_FOUND));
      }
      res.status(204).send(MESSAGES.DELETE_BOARD_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
