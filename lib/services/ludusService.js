const Joi = require('@hapi/joi')

// Example :
// const authorSchema = Joi.object({
//   name: Joi.string().min(4, 'utf8').required(),
//   pseudo: Joi.string(),
//   email: Joi.string().email().required(),
//   language: Joi.string().valid('french', 'english').required()
// })
// const authorLanguageSchema = Joi.object({
//   language: Joi.string().valid('french', 'english').required()
// })

const ludusService = {
  createNewFight: (authorData) => {
    return Promise.resolve(authorData)
      .then((authorData) => {
        const { value, error } = authorSchema.validate(authorData, { abortEarly: false })

        if (error) { throw error }
        return value
      })
      .then(authorRepository.create)
  }
}

module.exports = ludusService
