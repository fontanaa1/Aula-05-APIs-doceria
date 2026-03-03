const express = require('express');
const router = express.Router();
let db = require('../data/database');


// GET TODOS
router.get('/', (req, res) => {
  const { categoriaId } = req.query;

  let lista = db.produtos;

  if (categoriaId) {
    lista = lista.filter(p => p.categoriaId == categoriaId);
  }

  res.status(200).json({
    sucesso: true,
    total: lista.length,
    dados: lista
  });
});


// GET POR ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const produto = db.produtos.find(p => p.id === id);

  if (!produto) {
    return res.status(404).json({
      sucesso: false,
      mensagem: "Produto não encontrado."
    });
  }

  res.status(200).json({
    sucesso: true,
    dados: produto
  });
});


// POST
router.post('/', (req, res) => {
  const { nome, categoriaId, descricao, preco, imagem } = req.body;

  if (!nome || !categoriaId || !preco) {
    return res.status(400).json({
      sucesso: false,
      mensagem: "Nome, categoriaId e preço são obrigatórios."
    });
  }

  const novaId =
    db.produtos.length > 0
      ? Math.max(...db.produtos.map(p => p.id)) + 1
      : 1;

  const novoProduto = {
    id: novaId,
    nome,
    categoriaId,
    descricao,
    preco,
    imagem
  };

  db.produtos.push(novoProduto);

  res.status(201).json({
    sucesso: true,
    mensagem: "Produto criado com sucesso.",
    dados: novoProduto
  });
});


// PUT
router.put('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = db.produtos.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({
      sucesso: false,
      mensagem: "Produto não encontrado."
    });
  }

  db.produtos[index] = {
    ...db.produtos[index],
    ...req.body
  };

  res.status(200).json({
    sucesso: true,
    mensagem: "Produto atualizado.",
    dados: db.produtos[index]
  });
});


// DELETE
router.delete('/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const existe = db.produtos.some(p => p.id === id);

  if (!existe) {
    return res.status(404).json({
      sucesso: false,
      mensagem: "Produto não encontrado."
    });
  }

  db.produtos = db.produtos.filter(p => p.id !== id);

  res.status(200).json({
    sucesso: true,
    mensagem: "Produto removido com sucesso."
  });
});

module.exports = router;