const { redirect } = require("express/lib/response");
const res = require("express/lib/response");
const campgrounds = require("./models/campgrounds");

var express           = require("express"),
    app               = express(),
    bodyParser        = require("body-parser"),
    mongoose          = require("mongoose"),
    flash             = require("connect-flash"),
    passport          = require("passport"),
    LocalStrategy     = require("passport-local"),
    methodOverride    = require("method-override"),
    Campground        = require("./models/campgrounds"),
    Comment           = require("./models/comment"),
    User              = require("./models/user"),
    seedDB            = require("./seeds")

//requiring routes
var    commentRoutes     = require("./routes/comments"),
       indexRoutes         = require("./routes/index"),
      campgroundRoutes  = require("./routes/campgrounds")

mongoose.connect("mongodb://localhost:27017/yelpCamp");
app.use(bodyParser.urlencoded({ extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

// seedDB(); // seed the databse
//app.use(express.static("public"));

//PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "Once again I dont give up",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser= req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


app.use(indexRoutes);
app.use("/campgrounds",campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes)



app.listen(5000, function(){
    console.log("YelpCamp server started");
});