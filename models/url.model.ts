import mongoose, { Schema } from "mongoose";

const urlSchema = new mongoose.Schema({
    type: String,
    link: String,
    clientApps: [{
      name:String,
      url:String
    }],
    application:[{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  }, { toJSON: { getters: true } });
  

const URL =
  mongoose.models.URL ||
  mongoose.model("URL", urlSchema);

export default URL;
