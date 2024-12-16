const {body} = require('express-validator');
const validate = require('./validate');

function getValidations(method) {
  switch (method) {
  case 'createMatch': {
    return [
      body('name')
        .exists()
        .withMessage('Você deve enviar um nome para a partida!')
        .notEmpty()
        .withMessage('O nome da partida não pode ficar vazio!'),
      body('image')
        .exists()
        .withMessage('O campo de imagem deve estar preenchido!')
        .isURL()
        .withMessage('A imagem deve ser uma URL'),
    ];
  };

  case 'updateMatch': {
    return [
      body('name')
        .optional()
        .notEmpty()
        .withMessage('O nome da partida não pode ficar vazio!'),
      body('image')
        .optional()
        .isURL()
        .withMessage('A imagem deve ser uma URL!'),
    ];
  }
  }
}


function matchValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}

module.exports = matchValidate;
