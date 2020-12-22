import mongoose, { Schema } from "mongoose";
import moment from "moment";

const CommentSchema = new Schema({
  roomId: {
    type: String,
  },
  date: {
    type: Schema.Types.Mixed,
    default: moment(),
  },
  replies: {
    type: [Schema.Types.Mixed],
    default: [],
  },
  text: String,
  username: String,
  fullname: String,
});

export default mongoose.model("comment", CommentSchema);
