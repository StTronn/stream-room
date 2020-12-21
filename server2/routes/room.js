import { Router } from "express"; // Express web server framework
import url from "url";
import Room from "../models/room";
import authenticate from "../middleware/auth";
import _ from "lodash";
import { v4 as uuid4 } from "uuid";

const router = Router();

router.get("/get", authenticate, async (req, res, next) => {
  try {
    const url_parts = url.parse(req.url, true);
    const { id } = url_parts.query;
    if (!id) return next({ statusCode: 401, message: "no id given" });
    const room = await Room.findOne({ id });
    if (!room) return next({ statusCode: 404, message: "room not found" });
    res.status(200).json(room);
  } catch (err) {
    next(err);
  }
});

router.get("/join", authenticate, async (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const { id } = url_parts.query;
  const user = req.user;
  if (!id) return next({ statusCode: 401, message: "no id given" });
  const room = await Room.findOne({ id });
  if (!room) return next({ statusCode: 404, message: "room not found" });
  console.log(room.users.length);
  if (room.users) {
    for (let i = 0; i < room.users.length; i++) {
      console.log(user.username === room.users[i].username);
      if (user.username === room.users[i].username)
        return res.status(200).json(room);
    }
  }

  room.users.push(user);
  console.log(user, room);
  room.save((err, doc) => {
    if (err) return next(err);
    return res.status(200).json(doc);
  });
});

router.get("/delete", authenticate, async (req, res, next) => {
  const url_parts = url.parse(req.url, true);
  const { id } = url_parts.query;
  const user = req.user;
  if (!id) return next({ statusCode: 401, message: "no id given" });
  const room = await Room.findOne({ id });
  if (!room) return next({ statusCode: 404, message: "room not found" });

  Room.deleteOne({ id: room.id }, (err) => {
    if (err) return next(err);
    return res.status(200).json({ message: "room deleted succesfully" });
  });
});

router.get("/create", authenticate, async (req, res, next) => {
  const user = req.user;
  const room = Room({ id: uuid4(), users: [user] });
  room.save((err) => {
    if (err) return next(err);
    return res.status(200).json(room);
  });
});

router.post("/update", authenticate, async (req, res, next) => {
  const reqObj = req.body;
  const { id } = reqObj;
  if (!id) return next({ message: "provide id", statusCode: 400 });
  const room = await Room.find({ id });
  if (!room) return next({ message: "room not found ", statusCode: 400 });
  const newRoom = { ...room, ...reqObj };
  Room.findOneAndUpdate({ id }, newRoom, (err, doc) => {
    if (err) return next({ statusCode: 401, message: "update failed" });
    return res.status(200).json(doc);
  });
});


router.get("/userRooms", authenticate, async (req, res, next) => {
  const user = req.user;
  try {
    const rooms = await Room.find({
      _id: {
        $in: user.rooms,
      },
    });
    user.rooms = rooms.map((e) => e._id);
    await user.save();
    return res.status(200).json(rooms);
  } catch (err) {
    return next({ statusCode: 400, message: "coudn't find room" });
  }
});

export default router;
