const typesRepository = require('../repositories/typesRepository')
const ludusService = require('../services/ludusService')
const router = require('express').Router()
const Joi = require('@hapi/joi')

router.get('/new-fight', function (req, res, next) {
  res.render('ludus/new-fight')
})

router.post('/new-fight', function (req, res, next) {
  // missing typesRepository call
  const newFightData = {
    fighter1Type: req.body['fighter1-type'],
  }
  return ludusService.createNewFight(newFightData)
    .then((newFight) => {
      res.redirect('index')
    })
    .catch((error) => {
      if (error instanceof Joi.ValidationError) {
        res.render('ludus/new-fight', {
          values: {
            fighter1Type: req.body['fighter1-type'],
          },
          failedFields: error.details
        })
      } else {
        next(error)
      }
    })
})

module.exports = router
