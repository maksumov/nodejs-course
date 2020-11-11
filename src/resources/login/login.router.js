const router = require('express').Router();
const { OK } = require('http-status-codes');
const loginService = require('./login.service');
const { catchErrors } = require('../../common/error');

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = req.body;
    const token = await loginService.signToken(user);

    if (!token) {
      res.status(403).send('Wrong login/password combination!');
    } else {
      res.status(OK).json({ token });
    }
  })
);

module.exports = router;
