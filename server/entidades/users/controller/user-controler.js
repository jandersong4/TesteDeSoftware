const UserService = require('../service/UserService');
const router = require('express').Router();

const {
  loginMiddleware,
  notLoggedIn,
  jwtMiddleware,
  checkRole,
} = require('../../../middlewares/auth-middlewares');
const objectFilter = require('../../../middlewares/object-filter');
const userValidate = require('../../../middlewares/user-validator');

router.post(
  '/createAdmin',
  objectFilter('body', ['full_name', 'username', 'email', 'image', 'password']),
  async (req, res) => {
    try {
      const user = {
        ...req.body,
        role: 'admin',
      };

      await UserService.createUser(user);

      res.status(201).end();
    } catch (error) {
      console.log(error);
    }
  },
);

router.post(
  '/',
  objectFilter('body', ['full_name', 'username', 'email', 'image', 'password']),
  userValidate('createUser'),
  async (req, res) => {
    try {
      const user = {
        ...req.body,
        role: 'user',
      };

      // Chamar o serviço para criar o usuário e obter os dados do usuário criado
      const createdUser = await UserService.createUser(user);

      // Modificação: Incluir os dados do usuário, incluindo o ID, no corpo da resposta
      const responseBody = {
        message: 'User created successfully!',
        user: createdUser, // Incluindo os dados do usuário no corpo da resposta
      };

      // Responder com o status 201 (Created) e o corpo da resposta JSON
      res.status(201).json(responseBody);
    } catch (error) {
      console.log(error);
      // Modificação: Em caso de erro, responder com um status de erro (por exemplo, 500) e uma mensagem de erro
      res.status(500).json({error: 'Internal Server Error'});
    }
  },
);

router.get('/', jwtMiddleware, async (req, res) => {
  try {
    const users = await UserService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
});

router.get('/user/:id', jwtMiddleware,
  async (req, res) => {
    try {
      const userId = req.params.id;
      const user = await UserService.getAllUsersById(userId);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  });

router.put('/user/:id',
  jwtMiddleware,
  objectFilter('body', ['fullname', 'username', 'email', 'image']),
  userValidate('updateUser'),
  async (req, res) => {
    try {
      const userId = req.params.id;

      // Atualize o usuário e obtenha o corpo da solicitação atualizado
      const updatedUserData = req.body;
      await UserService.updateUser(userId, req.user.id, req.user.role, updatedUserData);

      // Retorne os dados atualizados na resposta
      res.status(200).json(updatedUserData);
    } catch (error) {
      res.status(400).send(error.message);
    }
  });

router.delete('/user/:id',
  jwtMiddleware,
  checkRole('admin'),
  async (req, res, next) => {
    try {
      const userId = req.params.id;
      await UserService.deleteUser(userId, req.user.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  });


router.post(
  '/login', notLoggedIn, userValidate('login'), loginMiddleware);

router.get('/logout', jwtMiddleware, (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

router.get('/me', jwtMiddleware, async (req, res) => {
  try {
    const user = await UserService.getCurrentUser(req.user.id);

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
