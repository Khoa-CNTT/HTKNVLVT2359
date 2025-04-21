import postService from "../services/postService";

let handleCreateNewPost = async (req, res) => {
  try {
    let data = await postService.handleCreateNewPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleReupPost = async (req, res) => {
  try {
    let data = await postService.handleReupPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleUpdatePost = async (req, res) => {
  try {
    let data = await postService.handleUpdatePost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleBanPost = async (req, res) => {
  try {
    let data = await postService.handleBanPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleAcceptPost = async (req, res) => {
  try {
    let data = await postService.handleAcceptPost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getDetailPostById = async (req, res) => {
  try {
    let data = await postService.getDetailPostById(req.query.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let handleActivePost = async (req, res) => {
  try {
    let data = await postService.handleActivePost(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
let getStatisticalTypePost = async (req, res) => {
  try {
    let data = await postService.getStatisticalTypePost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let getListNoteByPost = async (req, res) => {
  try {
    let data = await postService.getListNoteByPost(req.query);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};
module.exports = {
  handleCreateNewPost: handleCreateNewPost,
  handleUpdatePost: handleUpdatePost,
  handleBanPost: handleBanPost,
  getDetailPostById: getDetailPostById,
  handleActivePost: handleActivePost,
  handleAcceptPost: handleAcceptPost,
  getStatisticalTypePost: getStatisticalTypePost,
  getListNoteByPost: getListNoteByPost,
  handleReupPost: handleReupPost,
};
