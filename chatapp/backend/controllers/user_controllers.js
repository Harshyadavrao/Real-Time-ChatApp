import User from "../models/user_model.js"

export const getCurrentUser = async (req, res)=>{
    try {
        let userId = req.userId
        let user = await User.findById(userId).select("-password")
        if(!user){
            return res.status(400).json({message:"user not found"})
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:`current user error ${error}`})
    }
}

export const editprofile = async (req, res) => {
    try {
        let {name} = req.body;
        let user = await User.findByIdAndUpdate(
            req.userId,      // directly update by ID
            { name },        // fields to update
            { new: true }    // return updated user
        );


        if(!user){
            return res.status(400).json({message:"user not found"});
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({message: `profile error ${error}`})
    }
} 

export const getOtherUsers = async(req, res) => {
    try {
        let users = await User.find({
            _id:{$ne:req.userId}  //ne for not equals to
        }).select("-password")
        return res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message:`get other users error ${error}`})
    }
}

export const search = async(req,res) => {
    try {
        let {query}=req.query
        if(!query){
            return res.status(400).json({message: "query is required"})
        }

        let users = await User.find({
            $or:[
                {name:{$regex:query, $options:"i"}},
                {userName:{$regex:query, $options:"i"}}
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(400).json({message: "serach user error"})
    }
}