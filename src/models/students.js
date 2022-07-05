const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true,
        minlength:3
    },
    email:{
        type:String,
        required:true,
       validate(value){
           if(!validator.isEmail(value))
           {
               throw new Error("invalid Email Id")
           }
       }
    },
    phone :{
        type:Number,
        required : true,
        min:10,
        unique:true
    },
    address:{
        type: String,
        required:true,
        maxlength:50
    },
    date:{
        type:Date,
        default:Date.now

    }
     
})

//We need collections
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;