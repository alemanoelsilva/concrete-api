exports.responseNotFound = (request, response) => {
  response.status(404)
    .json({ message: 'Endpoint não encontrado' })
    .end();
};
