const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      res.render("profile.ejs", { profile: profile, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getFeed: async (req, res) => {
    try {
      const posts = await Profile.find().sort({ createdAt: "desc" }).lean();
      res.render("feed.ejs", { posts: posts });
    } catch (err) {
      console.log(err);
    }
  },
  getProfileById: async (req, res) => {
    try {
      const profile = await Profile.findById(req.params.id);
      res.render("profile.ejs", { profile: profile, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  createProfile: async (req, res) => {
  
    try {
      // Upload image to cloudinary
      let result 
      if (req.file.path) {
         result = await cloudinary.uploader.upload(req.file.path);
      }
      
      let profile = await Profile.create({
        name: req.body.name,
        businessName: req.body.businessName,
        role: req.body.role,
        services: ['Silk-press', 'Braids', 'Locs', 'Curly-cuts'].filter(service => req.body[service.toLowerCase().replace('-', '')]).join(', '),
        cloudinaryId: result?.public_id,
        image: result?.secure_url,
        user: req.user.id,
      });
      req.user.profile = profile
      req.user.save() 
      console.log("Profile has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  },
  updateProfile: async (req, res) => {
   console.log('updateProfile')
      let result 
      console.log(req.file)
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
   let profile = await Profile.findById({_id: req.user.profile})
        console.log(profile)
        console.log(req.body)
        profile.name = req.body.name
        profile.businessName = req.body.businessName
        profile.role = req.body.role
        profile.services = ['Silk-press', 'Braids', 'Locs', 'Curly-cuts'].filter(service => req.body[service.toLowerCase().replace('-', '')]).join(', '),
        profile.cloudinaryId = result?.public_id,
        profile.image = result?.secure_url,
        console.log(profile)
        profile.save()
        res.redirect("/profile")
  },
  updatePortfolio: async (req, res) => {
    let result 
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
        let profile = await Profile.findById({_id: req.user.profile})
        profile.portfolio.push({image:result.secure_url, cloudinaryId: result.public_id})
        profile.save()
      }
      res.redirect("/profile")
      
  },
  deleteProfile: async (req, res) => {
    try {
      // Find post by id
      let post = await Profile.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Profile.findOneAndDelete(req.params.id);
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
};
