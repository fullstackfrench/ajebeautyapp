const Reviews = require("../models/Reviews");

module.exports = {
  createReview: async (req, res) => {
    try {
      await Reviews.create({
        reviewText: req.body.review,
        user: req.user.id,
        profile: req.params.id
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