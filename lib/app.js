const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const indexRouter = require('./routes')

const { ResourceNotFoundError } = require('./errors')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

if (app.get('env') == 'development') {
  app.use(logger('dev'))
}

app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)

app.get('/404', function (req, res, next) {
  res.status(404).render('errors/404')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  if (err.status == 404) {
    return res.redirect('/404')
  }

  next(err)
})
app.use(function (err, req, res, next) {
  if (err instanceof ResourceNotFoundError) {
    return res.redirect('/404')
  }
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
