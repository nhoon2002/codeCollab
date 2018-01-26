var express = require('express');
var router = express.Router();
var passport = require('passport');

router.route('/login')
   .get(function(req, res, next) {
      res.render('login', { title: 'Login to CodeCollab!' });
   })
   .post(passport.authenticate('local', {
      failureRedirect: '/login'
   }), function(req,res) {
      res.redirect('/')
   });

router.get('/logout', function(req,res) {
   req.logout();
   res.redirect('/');
})


router.route('/register')
   .get(function(req,res,next) {
      res.render('register', { title: 'Register to CodeCollab!' });
   })
   .post(function(req, res, next) {
      req.checkBody('name', 'Name field is empty.').notEmpty();
      req.checkBody('email', 'Invalid email.').notEmpty();
      req.checkBody('password', 'Invalid password.').notEmpty();
      req.checkBody('password', 'Password does not match.').equals(req.body.confirmPassword);

      var errors = req.validationErrors();

      console.log(errors); //[{location, param, msg, value}, {location, param, msg, value}]

      if(errors) {
         res.render('register', {
            title: 'CodeCollab - Google Docs for your code.',
            name: req.body.name,
            email: req.body.email,
            errorMessages: errors
         });
      } else {
         var user = new User();
         user.name = req.body.name;
         user.email = req.body.email;
         user.setPassword(req.body.password);
         user.validPassword(req.body.confirmPassword);
         user.save(function(err) {
            if(err) {
               res.render('register', {
                  errorMessages: err
               })
            } else {
               res.redirect('/login')
            }
         })
      }

});

module.exports = router;
