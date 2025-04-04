import db from "../models/index";
import bcrypt from "bcryptjs";
require("dotenv").config();

const salt = bcrypt.genSaltSync(10);
let handleCreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phonenumber || !data.lastName || !data.firstName) {
        resolve({
          errCode: 2,
          errMessage: "Missing required parameters !",
        });
      } else {
        let check = await checkUserPhone(data.phonenumber);
        if (check) {
          resolve({
            errCode: 1,
            errMessage: "Số điện thoại đã tồn tại !",
          });
        } else {
          let imageUrl = "";
          let isHavePass = true;
          if (!data.password) {
            data.password = `${new Date().getTime().toString()}`;
            isHavePass = false;
          }
          let hashPassword = await hashUserPasswordFromBcrypt(data.password);
          if (data.image) {
            const uploadedResponse = await cloudinary.uploader.upload(
              data.image,
              {
                upload_preset: "dev_setups",
              }
            );
            imageUrl = uploadedResponse.url;
          }
          if (!data.email) {
            data.email = "nguyenletantai1102200@gmail.com";
          }
          let params = {
            firstName: data.firstName,
            lastName: data.lastName,
            address: data.address,
            genderCode: data.genderCode,
            image: imageUrl,
            dob: data.dob,
            companyId: data.companyId,
            email: data.email,
          };
          if (data.companyId) {
            params.companyId = data.companyId;
          }
          let user = await db.User.create(params);
          if (user) {
            await db.Account.create({
              phonenumber: data.phonenumber,
              password: hashPassword,
              roleCode: data.roleCode,
              statusCode: "S1",
              userId: user.id,
            });
          }
          if (!isHavePass) {
            let note = `<h3>Tài khoản đã tạo thành công</h3>
                                    <p>Tài khoản: ${data.phonenumber}</p>
                                    <p>Mật khẩu: ${data.password}</p>
                        `;
            sendmail(note, data.email);
          }
          resolve({
            errCode: 0,
            message: "Tạo tài khoản thành công",
          });
        }
      }
    } catch (error) {
      reject(error.message);
    }
  });
};
let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phonenumber || !data.password) {
        resolve({
          errCode: 4,
          errMessage: "Missing required parameters!",
        });
      } else {
        let userData = {};

        let isExist = await checkUserPhone(data.phonenumber);

        if (isExist) {
          let account = await db.Account.findOne({
            where: { phonenumber: data.phonenumber },
            raw: true,
          });
          if (account) {
            let check = await bcrypt.compareSync(
              data.password,
              account.password
            );
            if (check) {
              if (account.statusCode == "S1") {
                let user = await db.User.findOne({
                  attributes: {
                    exclude: ["userId", "file"],
                  },
                  where: { id: account.userId },
                  raw: true,
                });
                user.roleCode = account.roleCode;
                userData.errMessage = "Ok";
                userData.errCode = 0;
                userData.user = user;
                userData.token = CommonUtils.encodeToken(user.id);
              } else {
                userData.errCode = 1;
                userData.errMessage = "Tài khoản của bạn đã bị khóa";
              }
            } else {
              userData.errCode = 2;
              userData.errMessage =
                "Số điện thoại hoặc mật khẩu không chính xác";
            }
          } else {
            userData.errCode = 3;
            userData.errMessage = "User not found!";
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `Số điện thoại hoặc mật khẩu không chính xác`;
        }
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleCreateNewUser: handleCreateNewUser,
  handleLogin: handleLogin,
};
