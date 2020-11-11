const mongoose = require('mongoose');
const { MONGO_CONNECTION_STRING } = require('../src/common/config');
const { create } = require('../src/resources/users/user.service');

const MOCK_USER = { login: 'admin', password: 'admin' };

const connectToDB = cb => {
  mongoose.connect(MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  const db = mongoose.connection;

  db.on('error', () =>
    console.error.bind(console, 'MongoDB connection error:')
  ).once('open', async () => {
    console.log('Successfully connecr to DB');
    db.dropDatabase();
    await create(MOCK_USER);
    cb();
  });
};

module.exports = { connectToDB };
