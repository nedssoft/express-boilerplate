import { ErrorHandler } from 'express-error-bouncer';
import formatResponse from '../helpers';
import { generateToken } from '../helpers/auth';

import models from '../database/models';

export async function register(req, res, next) {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;
    const [user, created] = await models.User.findOrCreate({
      where: { email },
      defaults: {
        firstName,
        lastName,
        email,
        password,
      },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    if (!created && user) {
      throw new ErrorHandler(409, 'User with the email address already exists');
    }
    const { password: pass, ...userData } = user.get(); // remove password from the returned data
    return formatResponse(res, { message: 'success', user: userData }, 201);
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await models.User.findOne({ where: { email } });
    if (!user) {
      throw new ErrorHandler(401, 'Invalid credentials');
    }
    const isValidPassword = await user.validatePassword(password);
    if (isValidPassword) {
      const token = await generateToken({ __uuid: user.id });
      const { password: pass, ...userData } = user.get();
      return formatResponse(
        res,
        {
          user: userData,
          token,
        },
        200,
      );
    }
    throw new ErrorHandler(401, 'Invalid credentials');
  } catch (error) {
    next(error);
  }
}
