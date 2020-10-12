const express = require('express');

const router = express.Router();

const passportLinkedIn = require('../auth/linkedin');
const passportGithub = require('../auth/github');
const passportTwitter = require('../auth/twitter');
const passportGoogle = require('../auth/google');
const passportFacebook = require('../auth/facebook');
const { isLoggedIn } = require('./isLoggedIn');

router.get('/', (req, res) => {
  res.render('index', { title: 'Welcome! Please Login.' });
});

router.get('/login', (req, res) => {
  res.send('Go back and register!');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', {
    user: req.user,
  });
});

router.get('/auth/linkedin', passportLinkedIn.authenticate('linkedin'));

router.get('/auth/linkedin/callback',
  passportLinkedIn.authenticate('linkedin', { failureRedirect: '/login', successRedirect: '/profile' }));

router.get('/auth/github', passportGithub.authenticate('github', { scope: ['user:email'] }));

router.get('/auth/github/callback',
  passportGithub.authenticate('github', { failureRedirect: '/login', successRedirect: '/profile' }));

router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

router.get('/auth/twitter/callback',
  passportTwitter.authenticate('twitter', { failureRedirect: '/login', successRedirect: '/profile' }));

router.get('/auth/google',
  passportGoogle.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login', successRedirect: '/profile' }));

router.get('/auth/facebook',
  passportFacebook.authenticate('facebook', {
    scope: ['public_profile', 'email'],
  }));

router.get('/auth/facebook/callback',
  passportFacebook.authenticate('facebook', { failureRedirect: '/login', successRedirect: '/profile' }));

module.exports = router;
