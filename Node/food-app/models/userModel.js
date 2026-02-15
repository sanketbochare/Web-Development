const mongoose=require(`mongoose`);


//schema
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true, `username is required`]
    },
    email:{
        type:String,
        required:[true,`email is required`],
        unique:true
    },
    password:{
        type:String,
        required:[true,`password is required`]
    },
    address:{
        type:Array
    },
    phone:{
        type:String,
        required:[true, `Phone number is required`]
    },
    usertype:{
        type:String,
        required:[true,`user type is required`],
        default:`client`,
        enum:[`client`,`admin`,`vendor`,`driver`]
    },
    profile:{
        type:String,
        default:`https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg`
    }
},{timestamps:true});


module.exports=mongoose.model(`User`,userSchema);