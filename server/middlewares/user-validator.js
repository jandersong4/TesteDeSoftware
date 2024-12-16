const { body } = require("express-validator");
const validate = require("./validate");

function getValidations(method) {
  switch (method) {
    case "login": {
      return [
        body("email")
          .exists()
          .withMessage("O campo de email deve estar preenchido!")
          .isEmail()
          .withMessage("O email inserido nao é válido!"),
        body("password")
          .exists()
          .withMessage("Você deve digitar uma senha!")
          .notEmpty()
          .withMessage("O campo de senha deve estar preenchido!"),
      ];
    }

    case "createUser": {
      return [
        body("full_name")
          .exists()
          .withMessage("Voce deve enviar seu nome completo!")
          .isAlpha("pt-BR", { ignore: " " })
          .withMessage("Seu nome so pode conter letras!"),
        body("username")
          .exists()
          .withMessage("Voce deve enviar um nome de usuario!")
          .isAlpha("pt-BR", { ignore: " " })
          .withMessage("Seu nome so pode conter letras!"),
        body("email")
          .exists()
          .withMessage("Voce deve enviar um email!")
          .isEmail()
          .withMessage("O email inserido nao é valido."),
        body("password")
          .exists()
          .withMessage("Insira uma senha")
          .isStrongPassword()
          .withMessage(
            "Sua senha deve conter pelo menos 8 caracteres, com pelo" +
              "menos um numero, uma letra maiúscula e um caractér especial"
          ),
        body("image")
          .exists()
          .withMessage("O campo de imagem deve estar preenchido!")
          .isURL()
          .withMessage("A imagem deve ser uma URL"),
      ];
    }

    case "updateUser": {
      return [
        body("full_name")
          .optional()
          .isAlpha("pt-BR", { ignore: " " })
          .withMessage("Seu nome so pode conter letras!"),
        body("username")
          .optional()
          .isAlpha("pt-BR", { ignore: " " })
          .withMessage("Seu nome so pode conter letras!"),
        body("email")
          .optional()
          .isEmail()
          .withMessage("O email inserido nao é valido."),
        body("image")
          .optional()
          .isURL()
          .withMessage("A imagem deve ser uma URL"),
      ];
    }
  }
}

function userValidate(method) {
  const validations = getValidations(method);
  return validate(validations);
}
module.exports = userValidate;
