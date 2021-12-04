/* eslint-disable no-unused-vars */
export default async function (err, req, res, next) {
  console.log('Middleware de erro: ', err);
  return res.sendStatus(500);
}
