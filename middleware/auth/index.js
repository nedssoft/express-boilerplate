import { ErrorHandler } from 'express-error-bouncer';

import { decodeToken } from '../../helpers/auth';

import models from '../../database/models';

// eslint-disable-next-line import/prefer-default-export
/**
 *  A middleware to check if user is authenticated
 * It assumes that the payload used in encoding the token is __uuid which holds the ID of the user
 * 
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const isAuthenticated = async (req, res, next) => {
  try {
    const { authorization: token = null } = req.headers;
    if (!token) {
      throw new ErrorHandler(403, 'You must login to perform the operation');
    } else {
      const { __uuid = null } = await decodeToken(token);
      const user =
        __uuid && (await models.User.findOne({ where: { id: __uuid } }));
      if (user) {
        req.user = user;
        next();
      } else {
        throw new ErrorHandler(403, 'You must login to perform the operation');
      }
    }
  } catch (error) {
    next(error);
  }
};
