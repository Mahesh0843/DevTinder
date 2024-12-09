const validator=require("validator");
const bcrypt=require("bcrypt");
exports.validatesignup=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName)
    {
        throw new Error("Name is not valid");
    }
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is not valid!!");
    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("please enter strong password");
    }
};

exports.validateEditprofileData=(req)=>{
    const allowedEditFields=[
        "firstName",
        "lastName",
        "emailId",
        "photoUrl",
        "gender",
        "age",
        "about",
        "skills",
    ];
    const isEditAllowed=Object.keys(req.body).every((key)=>
    allowedEditFields.includes(key));
    return isEditAllowed;
};

exports.validateloginpassword= async (password,passwordHash) =>
{
    console.log("Provided Password:", password);
    console.log("Stored Hash:", passwordHash);
    const isMatch = await bcrypt.compare(password, passwordHash);
    if(!isMatch)
    {
        throw new Error("Invalid credentials");
    }
};

exports.validateinputs= async (emailId,oldpassword,NewPassword)=>{
    if(!emailId)
    {
        throw new Error("Email is required!!!");
    }
    else if (!oldpassword || !NewPassword) {
        throw new Error("Old password and new password are required.");
    }
    else if(oldpassword===NewPassword)
    {
        throw new Error("The new password cannot be the same as the old password.");
    }
    else if(!validator.isStrongPassword(NewPassword))
    {
        throw new Error("please enter strong password");
    }
};