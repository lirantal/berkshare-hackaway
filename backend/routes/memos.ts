import express from "express";
import { db } from "../lib/db.js";

export const memosRouter = express.Router();

memosRouter.get("/memos", (req, res) => {
  if (!res.locals.user) {
    return res.status(401).send("Unauthorized");
  }

  let memosList = [];
  if (res.locals.user.isAdmin) {
    memosList = db
      .prepare(
        `SELECT memos.id, memos.text, memos.meta, memos.date, user_profile.full_name, user_profile.user_id
         FROM memos
         JOIN user_profile ON memos.user_id = user_profile.user_id`
      )
      .all();
  } else {
    memosList = db
      .prepare(
        `SELECT memos.id, memos.text, memos.meta, memos.date, user_profile.full_name, user_profile.user_id FROM memos JOIN 
            user_profile ON memos.user_id = user_profile.user_id WHERE memos.user_id = ?`
      )
      .all(res.locals.user.id);
  }

  return res.status(200).json({
    success: true,
    memos: memosList,
  });
});

memosRouter.post("/memos", (req, res) => {
  if (!res.locals.user) {
    return res.status(401).send("Unauthorized");
  }

  const text = req.body.text;
  const meta = req.body.meta || "{}";

  if (!text) {
    return res.status(400).json({
      success: false,
      error: "Text is required",
    });
  }

  const baseContactInformation = db
    .prepare(
      `SELECT user_profile.email, user_profile.address, user_profile.phone_number FROM user_profile WHERE user_profile.user_id = ?`
    )
    .get(res.locals.user.id);
  const contactInMemo = JSON.parse(meta);
  const userExtendedMeta = recursiveJSONMerge(
    baseContactInformation,
    contactInMemo
  );

  const date = new Date().toISOString();
  db.prepare(
    "INSERT INTO memos (user_id, text, meta, date) VALUES (?, ?, ?, ?)"
  ).run(res.locals.user.id, text, JSON.stringify(userExtendedMeta), date);

  return res.status(200).json({
    success: true,
  });
});

// @TODO function for recursive merging of baseContactInformation
// allows us to set target[key] for nested objects in the source JSON
function recursiveJSONMerge(target, source) {
  for (const key in source) {
    if (source[key] instanceof Object) {
      target[key] = recursiveJSONMerge(target[key] || {}, source[key]);
    } else {
      target[key] = source[key];
    }
  }
  return target;
}
