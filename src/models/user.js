const mongoose=require("mongoose");
const validator=require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const { default: isURL } = require("validator/lib/isURL");

const userSchema=new mongoose.Schema({
    firstname:{
        type: String;
        required: true,
        trim: true,
        minLength: 4,
        maxLength: 50,
    },
     lastName:{
        type: String,
     },
     emailId: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(v)
        {
            if(!validator.isEmail(v))
            {
                throw new Error("Invalid email Address"+ v);
            }
        },
     },
     password: {
        type: String,
        required: true,
        validate(v)
        {
            if(!validator.isStrongPassword)
            {
                throw new Error("Enter Strong Password");
            }
        },
     },
     age:{
        type: Number,
        required: true,
        min: 18,
     },
     gender: {
        type:String,
        enum: {
            values: ["male","female","others"],
                message: `{VALUE} is not a valid gender type`,
        }
     },
     photoUrl :{
        type: String,
        default: ,
        validate(v)
        {
            if(!validator.isURL(v))
            {
                throw new Error("Invalid Photo url "+v);
            }
        }
     },
     about: {
        type: String,
        default: "",
     },
     skills: {
        type: [String],
     },
},{
    timestamps: true;
});

module.exports=mongoose.model("User",userSchema);

