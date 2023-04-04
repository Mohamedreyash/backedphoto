const cloudinary=require('../cloudinary');
const express=require('express');
const route=express();
const fileUpload=require('express-fileupload');
const postSchema=require('../../../Schema/schema');
route.use(express.json());
route.use(fileUpload({useTempFiles:true}));
const bodyParser=require("body-parser");
route.use(express.urlencoded());
route.use(bodyParser.urlencoded({extended:true}));
route.use(bodyParser.json());
route.get("/getdata",async(req,res)=>{
    const data=await postSchema.find({userID: req.user});
    res.status(200).json(data);
});
route.post("/Postdata",async(req,res)=>{
    try{        
        const img=req.files.PostImage.tempFilePath;
        const {name}=req.body;
        const image=await cloudinary.uploader.upload(img,{
            public_id:`${Date.now()}`,
            resource_type:"auto",
            folder:"images",
        });
        const data=await postSchema.create({
            userID:req.user,
            name:name,
            PostImage:image.secure_url
        });
        data.save();
        res.status(200).json({
            message:"Post Saved"
        });
    }catch(e){
        return res.json({
            status:e.message,
        })
    }
})
route.delete("/deleteData/:id", async (req, res) => {
    try{
        const data = await postSchema.findOne({_id: req.params.id});
        const deleteData=await postSchema.deleteOne({ _id: req.params.id})
        return res.json({
            status:"deleted",
            data
        })
    }
    catch(e){
        res.status(400).json({
            status:"failed",
            message:e.message
        })
    }
});
module.exports=route;
