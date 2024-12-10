import mongoose from 'mongoose'

export const connectdb= async()=>{
    try{
    const conn= await mongoose.connect(process.env.Mongoo_url)
    console.log(`connected ${conn.connection.host}`)
    }catch(error){
        console.error(`Error: ${error.message}`);

    }
}
    