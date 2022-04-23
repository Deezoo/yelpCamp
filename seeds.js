var mongoose = require ("mongoose");
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
    {
        name:  "West Coast",
        image: "https://365cincinnati.com/wp-content/uploads/2020/05/Camping-at-the-camground-900x525.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },

    {
        name:  "West Coast",
        image: "https://thumbs.dreamstime.com/z/camping-tents-campground-21209131.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name:  "East coast",
        image: "https://image.shutterstock.com/image-photo/scenic-alpine-landscape-tent-on-260nw-1921403570.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
function seedDB(){
    //Remove all campgrounds
    Campground.remove({}, function(err){
        if (err){
            console.log(err);
        }
        console.log("removed campgrounds");
    });
    // add few camp grounds
//     data.forEach(function(seed){
//        Campground.create(seed, function(err, data){
//           if (err){
//            console.log(err);
//           } else{
//             console.log("Added a new campground")
//             //create comment
//             Comment.create(
//                 {
//                     text: "This is a place to be. A new down for everyone",
//                     author: "Homer"
//                 }, function(err, comment){
//                     if (err){
//                         console.log(err)
//                     } else{
//                         data.comments.push(comment);
//                         data.save();
//                         console.log("created new comment");
//                     }
//                 }
//             );
             
//        }
//     });
// });
};


module.exports = seedDB;
