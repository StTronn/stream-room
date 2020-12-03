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
});

export default mongoose.model("room", RoomSchema);
