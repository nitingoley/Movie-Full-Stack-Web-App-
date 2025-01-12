import mongoose from "mongoose";


const GenreSchema = mongoose.Schema({

     name: {
        type:String,
        required:true,
        trim: true,
        maxLength: 32,
    },
 }
);



const Genre = mongoose.model("Genre", GenreSchema);

export default Genre;