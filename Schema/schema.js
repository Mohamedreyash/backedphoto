const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const clone=new Schema({
    userID: { type:String, ref: "Users" },
    name:{type:String},
    PostImage:{type:String}
})
const model=mongoose.model("user3",clone);
module.exports=model;