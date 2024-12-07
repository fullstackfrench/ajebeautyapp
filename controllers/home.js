const Profile = require("../models/Profile");

module.exports = {
  getIndex: async (req, res) => {
    const profiles = await Profile.find();
    res.render("index.ejs", {profiles: profiles});
    
  },
};
