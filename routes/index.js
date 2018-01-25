var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var config = require('../config');
var transporter = nodemailer.createTransport(config.mailer);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'FROM INDEX.JS' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'CodeCollab - Google Docs for your code.' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login to CodeCollab!' });
});
router.route('/register')
   .get(function(req,res,next) {
      res.render('register', { title: 'Register to CodeCollab!' });
   // })
   // .post(function(req, res, next) {
   //    req.checkBody('name', 'Name field is empty.').notEmpty();
   //    req.checkBody('email', 'Invalid email.').notEmpty();
   //    req.checkBody('password', 'Invalid password.').notEmpty();
   //    var errors = req.validationErrors();
   //    console.log(errors); //[{location, param, msg, value}, {location, param, msg, value}]
   //
   //    if(errors) {
   //       res.render('contact', {
   //          title: 'CodeCollab - Google Docs for your code.',
   //          name: req.body.name,
   //          email: req.body.email,
   //          message: req.body.message,
   //          errorMessages: errors
   //
   //       });
   //    }
   // })
});

router.route('/contact')
   .get(function(req, res, next) {
      res.render('contact', {title: 'CodeCollab - Google Docs for your code.'});
   })
   .post(function(req, res, next) {
      req.checkBody('name', 'Name field is empty.').notEmpty();
      req.checkBody('email', 'Invalid email.').notEmpty();
      req.checkBody('message', 'Invalid message.').notEmpty();
      var errors = req.validationErrors();
      console.log(errors); //[{location, param, msg, value}, {location, param, msg, value}]

      if(errors) {
         res.render('contact', {
            title: 'CodeCollab - Google Docs for your code.',
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
            errorMessages: errors

         });
      } else {
         var mailOptions = {
            from: 'CodeCollab <noreply@codecollab.com',
            to: 'nhoon2002@g.ucla.edu',
            subject: 'Test email from CodeColalb',
            text: req.body.message

         };
         transporter.sendMail(mailOptions, function(error, info) {
            if(error) {
               return console.log(error);
            }

            res.render('thank', {title: 'CodeCollab - Google Docs for your code.'});
         })
      }
   })



module.exports = router;
