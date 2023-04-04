const mongoose=require("mongoose");
mongoose.set("strictQuery",false);
const data=()=>{
    return mongoose.connect(
        "mongodb+srv://reyash:reyash123@clusterfull.rytqhf8.mongodb.net/?retryWrites=true&w=majority"
    ).then(()=>{
        console.log("CONNECT SUCCESSFUL");
    }).catch((e)=>{
        console.log(e.message);
    })
};
module.exports=data;