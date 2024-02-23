const express = require('express');
const fs = require('fs');

const router = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser).patch(updateUser);

module.exports = router;
