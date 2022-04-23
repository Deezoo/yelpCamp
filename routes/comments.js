var express = require("express");
var router  = express.Router({mergeParams: true});
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");
var middleware = require("../middleware")

//==================================================== 
// COMMENTS new
//==================================================== 
router.get("/new", middleware.isLoggedIn, function(req, res){
    //find campground by id
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground}); 
        }
    })
     

});

//comments create

router.post("/", middleware.isLoggedIn,function(req, res){
    //lookup campgrounds using ID
    Campground.findById(req.params.id, function(err, campground){
        if (err){
            console.log(err);
            res.redirect("/campgrounds");
        } else{
           // console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                 if(err){
                     console.log(err);
                 } else{
                     //add username and id to comment
                     comment.author.id = req.user._id;
                     comment.author.username = req.user.username;
                     //save comment
                     comment.save();
                     campground.comments.push(comment);
                     campground.save();
                     console.log(comment)
                     console.log("success", "Successfully added a comment");
                     res.redirect('/campgrounds/' + campground._id );
                }
            });
        }
    });
    //Create new comment
    //connect new comment to campground
    //redirect campground showpage
});


//edit comment route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
Comment.findById(req.params.comment_id, function(err, foundComment){
    if (err){
        res.redirect("back");
    } else{
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    }
});
});


//update comment route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComments){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
   });

   //destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findById and remove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back")
        } else{
            req.flash("success", "deleted comment")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});


//authenticate login
//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     res.redirect("/login");
// }
//authenticate login
//authenticate ownership
// function checkCommentOwnership(req, res, next){
//     if(req.isAuthenticated()){
//         Comment.findById(req.paramscomment_id, function(err, foundComment){
//             if(err){
//                 res.redirect("back")
//             } else{
//                    //does user own the comment?
//                    if(foundComment.author.id.equals(req.user._id)){
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