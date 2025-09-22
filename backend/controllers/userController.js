const User = require('../models/User');

exports.followUser = async (req, res) => {
    if(req.body.userId !== req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);

            if(!user.followers.includes(req.body.userId)){
                user.followers.push(req.body.userId);
                currentUser.following.push(req.params.id);
                await user.save();
                await currentUser.save();
                res.status(200).json("User followed");
            } else {
                user.followers = user.followers.filter(id => id !== req.body.userId);
                currentUser.following = currentUser.following.filter(id => id !== req.params.id);
                await user.save();
                await currentUser.save();
                res.status(200).json("User unfollowed");
            }
        } catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("Action forbidden");
    }
};
