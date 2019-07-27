/**
 *
 * Use this to return a formatted response across the application
 * @param { object } res - response object
 * @param {object } payload - the data to return
 * @param {number} [statusCode=200] - the status code
 */
const formatResponse = (res, payload, statusCode = 200) => res.status(statusCode).json({
  ...payload,
});

export default formatResponse;
