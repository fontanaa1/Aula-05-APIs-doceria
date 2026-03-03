function errorHandlerMiddleware(err, req, res, next) {
  console.error(err.stack);

  res.status(500).json({
    error: "Algo deu errado no servidor!"
  });
}

module.exports = errorHandlerMiddleware;

    //  💡 Codigos de Status HTTP mais comuns:
    //  200 -> OK (tudo certo)
    //  201 -> Created (recurso criado com sucesso)
    //  400 -> Bad Request (cliente enviou dados errados)
    //  404 -> Not Found (recurso não encontrado)
    //  500 -> Internal Server Error (erro no servidor)

    