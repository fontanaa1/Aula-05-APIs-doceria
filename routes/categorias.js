const express = require('express');
const router = express.Router();
const db = require('../data/database');

router.get('/', (req, res) => {
  res.status(200).json({
    sucesso: true,
    dados: db.categorias
  });
});

router.post('/', (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Nome da categoria é obrigatório."
    });
  }

  const novaCategoria = {
    id: db.categorias.length + 1,
    nome
  };

  db.categorias.push(novaCategoria);

  res.status(201).json({
    sucesso: true,
    dados: novaCategoria
  });
});

module.exports = router;