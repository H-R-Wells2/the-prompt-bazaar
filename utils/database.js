import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async ()=>{
    mongoose.set('strictQuery', true);
    if (isConnected){
        console.log('Mongodb is already connected');
        return
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "prompt_shastra",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected= true;
        console.log("Mongodb Connected");
    } catch(error){
        console.log(error);
    }
}