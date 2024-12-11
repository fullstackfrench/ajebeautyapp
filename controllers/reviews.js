const Reviews = require("../models/Reviews");
const User = require("../models/User")

module.exports = {
  createReview: async (req, res) => {
    try {
    const user = await User.findOne({_id: req.user.id})
    console.log('User', user)
      await Reviews.create({
        reviewText: req.body.review,
        user: req.user.id,
        profile: req.params.id,
        username: user.username
      });
      console.log("Review has been added!");
      
    //   if (req.file) {
        
    //     let profile = await Profile.findById({_id: req.user.profile})
    //     profile.portfolio.push({image:result.secure_url,})
    //     profile.save()
    //   }
      res.redirect("back")
    //   res.redirect("/profile"+req.params.id);
    // res.render("profile.ejs", { profile: profile, user: req.user, reviews: reviewText });
    } catch (err) {
      console.log(err);
    }
  }
}