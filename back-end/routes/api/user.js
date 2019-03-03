const express = require('express');
const router = express.Router();

// Require user model in our routes module
let User = require('../../models/user');
const passport = require('../../auth/passport');

// Defined get data(index or listing) route
router.get("/profile", function (request, res) {

  let { user } = request;
  console.log('====user====', user)
  User.findOne({ username: user.username },function(err, user){
    if(err){
      console.log(err);
    }
    else {
      console.log('====user after search====', user)
      if(user) user.password = "";
      res.json(user);
    }
  });
});

// Defined edit route
router.post('/change-password/:username', function (req, res) {
    const username = req.params.username;
    const passwordData = req.body;
    User.findOne({username}, function (err, user){
      if(user.password === passwordData.password){
        console.log('====passwordData====', passwordData, user);
        user.password = passwordData.newPassword;
        user.save();
        // User.findOneAndUpdate({username}, {password: passwordData.newPassword}, (err, user) => {
        //   res.json({user, message: "success"});
        // })
        res.send(200)
      } else {
        res.json({status: 401})
      }
    });
  });

//  Defined update route
router.route('/update/:id')
  .post(function (req, res) {
    User.findById(req.params.id, function(err, user) {
      if (!user)
        res.status(404).send("data is not found");
      else {
          user.picture = req.body.picture;
          user.userName = req.body.userName;
          user.firstName = req.body.firstName;
          user.lastName = req.body.lastName;
          user.phone = req.body.phone;
          user.email = req.body.email;
          user.aboutYou = req.body.aboutYou;
          user.gitHub = req.body.gitHub; 
          user.linkedIn = req.body.linkedIn;
          user.languages = req.body.languages[String];
          user.technologies = req.body.technologies[String];
          user.interests= req.body.interests[String];

          user.save().then(user => {
            res.json('Update complete');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });

// Defined delete | remove | destroy route
router.route('/delete/:id')
  .get(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
  });

module.exports = router;