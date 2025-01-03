const ConnectionRequest=require("../models/ConnectionRequest");


const USER_SAFE_DATA = "firstName lastName photoUrl age gender about skills";

exports.getRequests=async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connRequest= await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested", 
        }).populate("fromUserId", USER_SAFE_DATA);
        if(!connRequest)
        {
          throw new Error("user not found with interested");
        }
        res.status(200).json({
            message:"Data fetched Successfully",
            data: connRequest,
        });
    }
    catch(err)
    {
        res.status(400).send("error:"+err.message);
    }
};

exports.getconnections=async (req,res)=>{
    try{
        const loggedInUser=req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or: [
              { toUserId: loggedInUser._id, status: "accepted" },
              { fromUserId: loggedInUser._id, status: "accepted" },
            ],
          })
            .populate("fromUserId", USER_SAFE_DATA)
            .populate("toUserId", USER_SAFE_DATA);
      
          console.log(connectionRequests);
      
          const data = connectionRequests.map((row) => {
            if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
              return row.toUserId;
            }
            return row.fromUserId;
          });
      
          res.json({ data });
    }
    catch(err)
    {
        res.status(400).send("Error:"+err.message);

    }
};

exports.getfeed=async (req,res)=>{
  try{
    const { page = 1, limit = 10} = req.query;
    const loggedInUser = req.user;
    limit = limit > 50 ? 50 : limit;
    const skip = (page - 1) * limit;
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId  toUserId");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((req) => {
      hideUsersFromFeed.add(req.fromUserId.toString());
      hideUsersFromFeed.add(req.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    res.json({ data: users });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

