exports.error = (error, request, response) => {
  if (error.isJoi) {
    return response.status(400).json({
      message: error.details[0].message,
    });
  }

  return response.status(error.status || 500).json({
    message: error.message || 'Erro interno',
  });
};
