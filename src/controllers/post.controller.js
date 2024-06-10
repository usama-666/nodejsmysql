const db = require("../db/db");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/AsyncHandler");

/* 
tODOS IN EVERY Api Call

get data from frontend 
validate data
check if data exsist or not 
get data from sql 
use errorHandling trycatch 
all call should be asynchronus
return errors in a proper format
return data in a proper format

*/

//get allpost
const getAllPosts = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM posts");
    if (!data) {
      throw new ApiError(404, "No Records  Found in Posts");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Request Fulfilled", data[0]));
  } catch (error) {
    console.log(error);
    throw new ApiError(404, "Internal Serve Error :: ", error);
  }
};

//get single post by id
const getSinglePost = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    const [data] = await db.query("SELECT * FROM posts WHERE id=?", [id]);
    if (data.length === 0) {
      //   console.log(data);
      console.log(data[0]);
      throw new ApiError(404, "No Post Found ");
    }
    return res
      .status(200)
      .json(new ApiResponse(200, "Request Fulfilled", data));
  } catch (error) {
    console.log(error);
    //  throw new ApiError(500, "Internal Server Error", error);
    return res.status(404).json(new ApiResponse(404, "  No Post Found", error));
  }
});

//create post
const createPost = async (req, res) => {
  const { id, title, desc, likes, rating } = req.body;
  // console.log(req.body);
  try {
    if (!id || !title || !desc || !likes || !rating) {
      console.log(id, title, desc, likes, rating);
      throw new ApiError(404, "All fields Required");
    }
    // const insertSQL = `
    // INSERT INTO posts VALUES(${id},${title},${desc},${likes}, ${rating})
    // `;
    await db.query(`INSERT INTO posts VALUES(?, ?, ?, ?, ?)`, [
      id,
      title,
      desc,
      likes,
      rating,
    ]);

    // await db.execute(insertSQL);
    //newly inserted record
    const [data] = await db.query(`SELECT * FROM posts Where id=?`, [id]);
    console.log(data);

    // return res.status(200).json(200, "Post Created", data);
    res.status(200).json(new ApiResponse(200, "Sucessfully Created", data));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Serve Error :: ", error);
  }
};

//update post
const updatePost = async (req, res) => {
  const { title, desc, likes, rating } = req.body;
  const id = req.params.id;
  console.log(id, title, desc, likes, rating);
  try {
    if (!id) {
      throw new ApiError(404, "Record not found with this ID");
    }

    //check if record exist or not
    const [postExisted] = await db.query(`SELECT * FROM posts WHERE id=?`, [
      id,
    ]);
    if (postExisted.length === 0) {
      throw new ApiError(404, "Record not found with this ID");
    }

    // const { id, title, desc, likes, rating } = postExisted[0];

    // console.log(extitle, exdesc, exlikes, exrating);
    // handling data if user will not provide any field

    const newData = {
      title: title || postExisted[0].title,
      desc: desc || postExisted[0].desc,
      likes: likes || postExisted[0].likes,
      rating: rating || postExisted[0].rating,
    };
    console.log("Newly dATA ::", newData);
    await db.query(
      `UPDATE posts SET title=?, \`desc\`=?, likes=?, rating=? WHERE id=?`,
      [newData.title, newData.desc, newData.likes, newData.rating, id]
    );

    //newly inserted record
    const [data] = await db.query(`SELECT * FROM posts WHERE id=?`, [id]);
    console.log(data);

    res.status(200).json(200, "Post Updated");
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Serve Error :: ", error);
  }
};

//delete post
const deletePost = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    if (!id) {
      throw new ApiError(404, "Post not found");
    }
    let sql = `
    DELETE FROM posts
    WHERE id=${id}`;
    // await db.query("DELETE FROM posts WHERE id=?", [id]);
    await db.execute(sql);
    res.status(200).json(new ApiResponse(200, "Sucessfully Deleted"));
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Internal Serve Error :: ", error);
  }
};
module.exports = {
  getAllPosts,
  getSinglePost,
  createPost,
  updatePost,
  deletePost,
};
