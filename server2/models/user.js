import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import _ from "lodash";
import bcrypt from "bcrypt";

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Please enter your fullname"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    trim: true,
    lowercase: true,
    unique: true,
  },
  rooms: {
    type: [Schema.Types.ObjectId],
  },
  token: {
    type: String,
    default: "",
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  avatar: {
    type: String,
    default:
      "https://res.cloudinary.com/douy56nkf/image/upload/v1594060920/defaults/txxeacnh3vanuhsemfc8.png",
  },
});

UserSchema.pre("save", async function (next) {
  if (this.password && this.password.length < 18) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

UserSchema.methods.getJwtToken = function () {
  console.log(process.env.JWT_SECRET);
  this.token = jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  this.constructor.update(
    { _id: this._id },
    {
      token: this.token,
    },
    (err, doc) => {
      if (err) console.log(err);
    }
  );
  return this.token;
};

UserSchema.methods.checkPassword = async function (password) {
  if (!password || !this.password) return false;
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.removeRoom = async function (id){
  this.rooms = _.remove(this.rooms,(room)=>room.id==id);
  await this.save();
}

export default mongoose.model("user", UserSchema);
