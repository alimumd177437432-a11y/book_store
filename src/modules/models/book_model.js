import { request } from "express";
import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
       type:String,
       unique : true
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["printed", "digital"],
      default : "printed"
    },
    minPrivImage: {
      type: String,
      required: true
    }, 
    retingAvg: {
        type : Number,
        default: 0
    },
    price : { 
        type : Number,
        required:true
    }
  },
  {
    timestamps: true,
  },
);

export const BookModel = mongoose.model("books", BookSchema);
