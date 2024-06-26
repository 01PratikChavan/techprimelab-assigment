import mongoose from 'mongoose'

const connectDB= async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONOGO_CONNECT);
        console.log('Connected to the database') ;

    }catch(err){
        console.log(`error in mongodb ${err}`)
    }
}

export default connectDB ;