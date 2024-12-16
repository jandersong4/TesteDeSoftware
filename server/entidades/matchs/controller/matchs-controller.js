const {jwtMiddleware} = require('../../../middlewares/auth-middlewares');
const matchValidate = require('../../../middlewares/match-validator');
const MatchService = require('../service/matchService');
const requestFilter = require('../../../middlewares/object-filter');
const router = require('express').Router();


// CRUD: Create, Read, Update, Delete

router.get('/', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const matchs = await MatchService.getAllMatchs();
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  },
);

router.get('/ler10', jwtMiddleware,
  async (req, res, next) =>{
    try {
      const matchs = await MatchService.get10();
      res.status(200).json(matchs);
    } catch (error) {
      next(error);
    }
  },
);

router.post('/',
  jwtMiddleware,
  requestFilter('body', ['name', 'image']),
  matchValidate('createMatch'),
  async (req, res, next) => {
    try {
      const match = {
        ...req.body,
        UserId: req.user.id,
      };

      await MatchService.createMatch(match);
      res.status(201).end();
    } catch (error) {
      next(error);
    }
  },
);

router.get('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const match = await MatchService.getMatchById(req.params.id);

      res.status(200).json(match);
    } catch (error) {
      next(error);
    }
  },
);

router.put('/:id',
  jwtMiddleware,
  requestFilter('body', ['name', 'image']),
  matchValidate('updateMatch'),
  async (req, res, next) =>{
    try {
      const matchId = req.params.id;
      await MatchService.updateMatchInfo(
        matchId,
        req.user.id,
        req.user.role,
        req.body,
      );

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:id',
  jwtMiddleware,
  async (req, res, next) => {
    try {
      const matchId = req.params.id;
      await MatchService.deleteMatch(
        matchId,
        req.user.id,
        req.user.role,
      );

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  },
);


module.exports = router;
