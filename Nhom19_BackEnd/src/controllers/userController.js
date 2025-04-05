import userService from "../services/userService";

let handleCreateNewUser = async (req, res) => {
  try {
    let data = await userService.handleCreateNewUser(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleLogin = async (req, res) => {
  try {
    let data = await userService.handleLogin(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from server",
    });
  }
};

let handleUpdateUser = async (req, res) => {
  try {
      let data = await userService.updateUserData(req.body);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
      })
  }
}

let handleBanUser = async (req, res) => {
  try {
      let data = await userService.banUser(req.body.data.id);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
      })
  }
}

let handleUnbanUser = async (req, res) => {
  try {
      let data = await userService.unbanUser(req.body.data.id);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
      })
  }
}

let getAllUser = async (req, res) => {
  try {
      let data = await userService.getAllUser(req.query);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
      })
  }
}

let getDetailUserById = async (req, res) => {
  try {
      let data = await userService.getDetailUserById(req.query.id);
      return res.status(200).json(data);
  } catch (error) {
      console.log(error)
      return res.status(200).json({
          errCode: -1,
          errMessage: 'Error from server'
      })
  }
}

module.exports = {
  handleCreateNewUser: handleCreateNewUser,
  handleLogin: handleLogin,
  handleUpdateUser: handleUpdateUser,
  handleBanUser: handleBanUser,
  handleUnbanUser: handleUnbanUser,
  getAllUser: getAllUser,
  getDetailUserById: getDetailUserById,
};
