import mongoose, { Schema } from "mongoose";
import moment from "moment";

const RoomSchema = new Schema({
  id: {
    type: String,
  },
  movieObj: {
    type: Schema.Types.Mixed,
    default: { title: "" },
  },
  dateTime: {
    type: Schema.Types.Mixed,
    default: moment(),
  },
  users: [Schema.Types.Mixed],
  link: {
    type: String,
    default: "",
  },
  public: { type: Boolean, default: false },
});

RoomSchema.pre("save", async function (next) {
  const user = this.users[this.users.length - 1];
  if (user) {
    let found = false;
    for (let room of user.rooms) {
      if (room.toString() === this._id.toString()) found = true;
    }
    if (!found) {
      user.rooms.push(this._id);
      await user.save();
    }
  }
  next();
});

export default mongoose.model("room", RoomSchema);
