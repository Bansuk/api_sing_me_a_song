export default async function (err, req, res) {
  console.log('Middleware de erro: ', err);
  return res.sendStatus(500);
}
