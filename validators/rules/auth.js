import { body } from 'express-validator';

export const registerValidationRules = () => [
  body('firstName')
    .not()
    .isEmpty()
    .withMessage('first Name is required'),
  body('lastName')
    .not()
    .isEmpty()
    .withMessage('last Name is required'),
  body('email')
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address provided'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must not be less than 6 characters'),
];

export const loginValidationRules = () => [
  body('email')
    .not()
    .isEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address provided'),
  body('password')
    .not()
    .isEmpty()
    .withMessage('Password is required'),
];
