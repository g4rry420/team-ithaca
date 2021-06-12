const ObjectId = require("mongoose").Types.ObjectId;
const asyncHandler = require("express-async-handler");
const Profile = require("../models/Profile");
const User = require("../models/User");

// @route POST /profile/:id
// @descr Given a user ID and profile parameters, create a profile
exports.createProfile = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    const profileData = new Profile(req.body);

    // Needs check to ensure that info sender owns the profile,
    // and that there is no profile already there
    try {
        await profileData.save().then(() => {
            User.updateOne(
                { _id: userId },
                { $set: { profile: profileData._id } },
                (err) => {
                    if (err) {
                        console.log(err);
                        res.send(err);
                    } else {
                        res.json({ success: true, msg: "Message added" });
                    }
                }
            );
        });
    } catch (err) {
        console.log(err);
        res.send(err);
    }
});
// Edits a profile in user.profile

// @route PUT /profile/:id
// @Given an ID and new parameters, update the profile
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const userId = req.body.id;
    const profileId = req.params.id;
    const profileData = req.body.profile;

    // validate id
    if (!ObjectId.isValid(userId)) {
        return res.status(400).send(Error("User ID is invalid."));
    }

    try {
        const updatedProfile = await Profile.findByIdAndUpdate(
            profileId,
            profileData,
            {
                new: true,
            }
        );
        res.status(200).json({
            success: {
                profile: updatedProfile,
            },
        });
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});

// @route GET /profile/:id
// @Given a user ID, return profile of that user
exports.getOneProfile = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;

    // validate id
    if (!ObjectId.isValid(userId)) {
        return res.status(400).send(Error("User ID is invalid."));
    }

    try {
        const user = await User.findById(userId).populate("profile");
        res.status(200).json(user.profile);
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});

// @route GET /profile
// @descr Gets an array of users who have profiles
exports.getAllProfiles = asyncHandler(async (req, res, next) => {
    try {
        const users = [];
        const allUsers = await User.find({
            _id: { $ne: req.user.id },
        }).populate({
            path: "profile",
            match: { isDogSitter: { $eq: true } },
        });
        // Sets users to array of users with populated profiles
        allUsers.map((user) => {
            if (user.profile) {
                users.push(user);
            }
        });
        // Returns only users with profiles
        res.status(200).json({
            users,
        });
    } catch (e) {
        res.status(500);
        throw new Error(e.message);
    }
});
