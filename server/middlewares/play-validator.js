const {body} = require('express-validator');
const validate = require('./validate');

function getValidations(method) {
  switch (method) {
  case 'createPlay': {
    return [
      body('IdDaPartida')
        .exists()
        .withMessage('Você deve enviar um IdDaPartida para a partida!')
        .notEmpty()
        .withMessage('O IdDaPartida da partida não pode ficar vazio!'),
      body('d4')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),
      body('d6')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),
      body('d8')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),
      body('d10')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),
      body('d12')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),
      body('d20')
        .exists()
        .withMessage('O campo de dado deve estar preenchido!')
        .notEmpty()
        .withMessage('A dado nao pode ficar vazio'),

    ];
  };
  }
}


function playValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}

module.exports = playValidate;
