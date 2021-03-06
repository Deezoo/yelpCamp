var express = require("express");
var router  = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Campground.find
//root route
router.get("/", function(req,res){
    res.render("landing");
});

//AUTH ROUTES========================================
//====================================================

router.get("/register", function(req, res){
    res.render("register");
})

//handle sign up logic
router.post("/register", function(req, res){
   var newUser = new User({username: req.body.username});
   User.register(newUser, req.body.password, function(err, user){
       if (err){
        req.flash("error", err.message)
            return res.render("register")
       }
       passport.authenticate("local")(req, res, function(){
        req.flash("success", "Welcome to Yelpcamp" + user.username);
           res.redirect("/campgrounds");
       })
   })


})

//show login form

router.get("/login", function(req, res){
   res.render("login");
});

//handling login logic
//app.post("/login", middleware, callback)
router.post("/login", passport.authenticate("local",
{
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}),function(req,res){
  
});

//logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});


//authenticate login
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports= router;