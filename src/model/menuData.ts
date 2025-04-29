import mongoose, { model } from "mongoose";

const menuSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  price: Number,
  category: String,
});
const menu = model("menu", menuSchema);

export default menu;
