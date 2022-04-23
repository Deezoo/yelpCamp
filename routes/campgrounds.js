var express = require("express");
var router  = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware")

//index
router.get("/", function(req, res){
    //get all campgrounds from db
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        } else{
            res.render("campgrounds/index", {campgrounds: allcampgrounds, currentUser: req.user});
 
        }
});
});


router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to campgrounds array
    
    const newCampground = new Campground({
        name: req.body.name,
        price: req.body.price,
        image: req.body.image,
        description: req.body.description,
        author: {
            id: req.user._id,
            username: req.user.username
        }
    });
   
     newCampground.save();
    //redirect back to campgrounds page
    console.log(newCampground);
    res.redirect("/campgrounds");
    
 });

 //NEW---SHOW FORM TO CREATE NEW CAMPGROUNDS
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs")
 });


// show more info about one grounds
router.get("/:id", function(req, res){
    //find the camp ground with provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        } else{
            console.log(foundcampground) //recheck this line
            res.render("campgrounds/show", {campground: foundcampground}); // and this
        }
})
    
});
//EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    //is user logged in
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
 
            });
      
    //if not redirect
    
   
});


//update campground route
router.put("/:id", middleware.checkCampgroundOwnership, function(req, res){
    //find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
        if(err){
            
            res.redirect("/campgrounds");
        } else{
         res.redirect("/campgrounds/" + req.params.id); //updatedCampground._id);
        }
    });
    //redirect somewhere(showpage)
});

//destroy campground route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req, res){
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
    });
});



//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }


//middleware
// function checkCampgroundOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Campground.findById(req.params.id, function(err, foundCampground){
//             if(err){
//                 res.redirect("/campgrounds")
//             } else{
//                    //does user own a campground?
//                    if(foundCampground.author.id.equals(req.user._id)){
//                     next();
//                    } else{
//                        res.redirect("back");
//                    }
                
//             }
//         });
//     } else{
        
//         res.redirect("back");
//     }
    
// }



module.exports= router;