const mongoose=require('mongoose')
const mongoURI=`mongodb://127.0.0.1:27017/mydb`


const connectToMongo=()=>{
    mongoose.connect(mongoURI)
    console.log("chl gya")
}
module.exports=connectToMongo