const express = require("express");
const {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
} = require("../controllers/post.controller");
const router = express.Router();

router.route("/getall").get(getAllPosts);
router.route("/getsinglepost/:id").get(getSinglePost);
router.route("/createpost").post(createPost);
router.route("/updatepost/:id").put(updatePost);
router.route("/deletepost/:id").delete(deletePost);
module.exports = router;
