import mongoose from "mongoose";

// mongoose


const userSchema = mongoose.Schema({

    username: {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    },
    password : {
        type:String,
        required:true,
    },
    isAdmin :{ 
        type:Boolean,
        required: true,
        default: false,
    },
    stripeCustomerId: {
        type:String,
        default: false,
    },
    subscriptionId: {
        type:String,
        default: null,
    },
    subscriptionStatus: {
        type:String,
        enum: ["active", "canceled", "past_due", "none"],
        default: "none",
    },
    subscriptionPlan: {
        type:String,
        default: null,
    },
    subscriptionExpiry:{
        type:Date,
        default: null,
    }

},
{timestamps:true}
);



const User = mongoose.model("User", userSchema);

export default User;