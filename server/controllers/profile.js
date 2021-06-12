const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");

// @route PUT /profile/:id
// @Given an ID and new parameters, update the profile
const updatedProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;
  const profileId = req.profileId;
  const profileData = req.body;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({
      error: "User ID is invalid."
    })
  }

  try {
    const updatedProfile = await Profile.findByIdAndUpdate(
      profileId,
      profileData,
      {
        new: true,
      }
    ).select('-_id -__v -userId');
    res.status(200).json({
      success: 'Profile Updated Successfully.',
      profile: updatedProfile
    });
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
});

exports.createProfile = asyncHandler(async (req, res, next) => {
  const profileExists = await Profile.findOne({ userId: req.user.id });

  if (profileExists) {
    req.profileId = profileExists._id;
    return updatedProfile(req, res);
  }

  const profile = new Profile({
    userId: req.user.id,
    ...req.body
  });
  profile.save((error, profile) => {
    if (error) {
      return res.status(400).json({
        error: "Error in Saving the Profile",
      })
    }

    profile._id = undefined;
    profile.__v = undefined;
    profile.userId = undefined;

    return res.status(201).json({
      success: "Profile created successfully.",
      profile
    });

  })

})


// @route GET /profile/
exports.getOneProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  // validate id
  if (!ObjectId.isValid(userId)) {
    return res.status(400).send(Error("User ID is invalid."));
  }

  try {
    const profile = await Profile.findOne({ userId }, { _id: 0, userId: 0, __v: 0 });
    if (profile) {
      return res.status(200).json({ profile });
    } else {
      return res.status(400).json({ error: 'Unable to Fetch User Profile' })
    }
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});

// @route GET /profile
// @A list of profiles
exports.getAllProfile = asyncHandler(async (req, res, next) => {
  try {
    const sitterList = await User.find({ _id: { $ne: req.user.id } }).populate({
      path: "profile",
      match: { isDogSitter: { $eq: true } },
    });
    res.status(200).json({
      success: {
        sitterList,
      },
    });
  } catch (e) {
    res.status(500);
    throw new Error(e.message);
  }
});
