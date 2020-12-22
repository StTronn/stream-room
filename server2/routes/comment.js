import { Router } from "express"; // Express web server framework
import url from "url";
import UserComment from "../models/comment";
import Room from "../models/room";
import authenticate from "../middleware/auth";
import _ from "lodash";
import { v4 as uuid4 } from "uuid";

const router = Router();

router.post("/create", authenticate, async (req, res, next) => {
  const { fullname, username } = req.user;
  const reqObj = req.body;
  const { roomId, text } = reqObj;
  if (!roomId) return next({ message: "provide roomId", statusCode: 400 });
  const room = await Room.find({ id: roomId });
  if (!room) return next({ message: "room not found ", statusCode: 400 });

  const comment = UserComment({ roomId: roomId, text, fullname, username });
  comment.save((err) => {
    if (err) return next(err);
    return res.status(200).json(comment);
  });
});

router.get("/get", authenticate, async (req, res, next) => {
  try {
    const url_parts = url.parse(req.url, true);
    const { roomId } = url_parts.query;

    if (!roomId) return next({ statusCode: 400, message: "no id given" });

    const comments = await UserComment.find({
      roomId,
    });
    return res.status(200).json(comments);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

export default router;
