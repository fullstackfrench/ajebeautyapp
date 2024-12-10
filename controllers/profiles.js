const cloudinary = require("../middleware/cloudinary");
const Profile = require("../models/Profile");
const Reviews = require("../models/Reviews");

module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await Profile.findOne({ user: req.user.id });
      res.render("profile.ejs", { profile: profile, user: req.user});
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
      const reviews = await Reviews.find()
      res.render("profile.ejs", { profile: profile, user: req.user, reviews: reviews });
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
      if (req.file) {
        result = await cloudinary.uploader.upload(req.file.path);
      }
      console.log('Body ',req.body)
   let profile = await Profile.findById({_id: req.user.profile})
        console.log('Profile ', profile)
        profile.name = req.body.name
        profile.businessName = req.body.businessName
        profile.role = req.body.role
        profile.services = ['Silk-press', 'Braids', 'Locs', 'Curly-cuts'].filter(service => req.body[service.toLowerCase().replace('-', '')]).join(', '),
        profile.cloudinaryId = result?.public_id,
        profile.image = result?.secure_url,
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
  profileSearch: async (req, res) => {
    console.log(req.body.search)
   let profiles = await Profile.aggregate([
      {
        $search: {
          index: "aje-search",
          text: {
            query: req.body.search,
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ]);
    res.render('search.ejs', {profiles: profiles})
  },
  getSilkPress: async (req, res) => {
   let profiles = await Profile.aggregate([
      {
        $search: {
          index: "aje-search",
          text: {
            query: "silk",
            path: {
              wildcard: "*"
            }
          }
        }
      }
    ]);
    res.render('search.ejs', {profiles: profiles})
  },
  getBraids: async (req, res) => {
    let profiles = await Profile.aggregate([
       {
         $search: {
           index: "aje-search",
           text: {
             query: "braids",
             path: {
               wildcard: "*"
             }
           }
         }
       }
     ]);
     res.render('search.ejs', {profiles: profiles})
   },
   getLocs: async (req, res) => {
    let profiles = await Profile.aggregate([
       {
         $search: {
           index: "aje-search",
           text: {
             query: "locs",
             path: {
               wildcard: "*"
             }
           }
         }
       }
     ]);
     res.render('search.ejs', {profiles: profiles})
   },
   getCurlyCuts: async (req, res) => {
    let profiles = await Profile.aggregate([
       {
         $search: {
           index: "aje-search",
           text: {
             query: "curly-cuts",
             path: {
               wildcard: "*"
             }
           }
         }
       }
     ]);
     res.render('search.ejs', {profiles: profiles})
   },
  deleteProfile: async (req, res) => {
    try {
      // Find post by id
      let profile = await Profile.findById(req.params.id);
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(profile.cloudinaryId);
      // Delete post from db
      await Profile.findOneAndDelete(req.params.id);
      console.log("Deleted Profile!");
      res.redirect("/");
    } catch (err) {
      res.redirect("/");
    }
  },
};
