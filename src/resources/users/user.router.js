const router = require('express').Router();
const {
  OK,
  BAD_REQUEST,
  NOT_FOUND,
  getStatusText
} = require('http-status-codes');

const usersService = require('./user.service');
const { ErrorHandler, catchErrors } = require('../../common/error');
const { ERRORS, MESSAGES } = require('../../common/constants');
const { toResponse } = require('./user.model');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      res.json(users.map(toResponse));
    })
  )
  .post(
    catchErrors(async (req, res) => {
      const user = await usersService.create(req.body);
      res.status(OK).send(toResponse(user));
    })
  );

router
  .route('/:userId')
  .get(
    catchErrors(async (req, res) => {
      const user = await usersService.get(req.params.userId);
      if (!user) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.USER_NOT_FOUND);
      }
      res.status(OK).send(toResponse(user));
    })
  )
  .put(
    catchErrors(async (req, res) => {
      const userUpdate = await usersService.update(req.params.userId, req.body);
      if (!userUpdate) {
        throw new ErrorHandler(BAD_REQUEST, getStatusText(BAD_REQUEST));
      }
      res.status(OK).send(toResponse(userUpdate));
    })
  )
  .delete(
    catchErrors(async (req, res) => {
      const users = await usersService.remove(req.params.userId);
      if (!users) {
        throw new ErrorHandler(NOT_FOUND, ERRORS.USER_NOT_FOUND);
      }
      res.status(204).send(MESSAGES.DELETE_USER_SUCCESSFULL_MESSAGE);
    })
  );

module.exports = router;
