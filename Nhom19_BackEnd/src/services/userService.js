import db from "../models/index";
import bcrypt from "bcryptjs";
let nodemailer = require("nodemailer");
const { Op } = require("sequelize");
require("dotenv").config();

import CommonUtils from "../utils/CommonUtils";
const cloudinary = require("../utils/cloudinary");
const salt = bcrypt.genSaltSync(10);

let sendmail = (note, userMail, link = null) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    port: 456,
    secure: true,
    logger: true,
    debug: true,
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: true,
    },
  });

  let mailOptions = {
    from: "FindJob <FindJob@gmail.com>",
    to: userMail,
    subject: "Thông báo từ trang tuyển dụng FIND JOBS",
    html: note,
  };
  if (link) {
    mailOptions.html =
      note +
      ` xem thông tin <a href='${process.env.URL_REACT}/${link}'>Tại đây</a> `;
  }

  console.log("Gửi mail thành công");

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error.message);
    } else {
    }
  });
};

let optEmail = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let otp = Math.floor(100000 + Math.random() * 900000);
      let note = `<img width="50%" src="https://www.findjobs.vn//htdocs/images/employers/202202/find_cam_job_xam.png" alt='logo' />
                                    <h1>FIND JOBS Xin Thông Báo Tới Bạn</h1>
                                    <h3><i>Mã OTP Đã Gửi Tới Email Của Bạn</i></h3>
                                    <p> - Mã OTP : ${otp}</p>
                        `;
      sendmail(note, data);
      resolve({
        errCode: 0,
        otp: otp,
      });
      console.log("otp : ", otp);
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPasswordFromBcrypt = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserPhone = (userPhone) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userPhone) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let account = await db.Account.findOne({
          where: { phonenumber: userPhone },
        });
        if (account) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkCompanyPhone = (companyPhone) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!companyPhone) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let account = await db.Company.findOne({
          where: { phonenumber: companyPhone },
        });
        if (account) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkMST = (mst) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!mst) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let account = await db.Company.findOne({
          where: { taxnumber: mst },
        });
        if (account) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userEmail) {
        resolve({
          errCode: 1,
          errMessage: "Các trường không được để trống!",
        });
      } else {
        let checkEmail = await db.User.findOne({
          where: { email: userEmail },
          attributes: {
            exclude: ["userId"],
          },
        });

        if (checkEmail) {
          resolve(true);
        } else {
          resolve(false);
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleCreateNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phonenumber || !data.lastName || !data.firstName) {
        resolve({
          errCode: 2,
          errMessage: "Các trường không được để trống !",
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
            console.log("pass : ", data.password);
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
          if (isHavePass) {
            let note = `<img width="50%" src="https://www.findjobs.vn//htdocs/images/employers/202202/find_cam_job_xam.png" alt='logo' />
                                    <h1>FIND JOBS Xin Thông Báo Tới Bạn</h1>
                                    <h3><i>Tài Khoản Của Bạn Đã Được Tạo Thành Công</i></h3>
                                    <p> - Tên Tài Khoản : ${
                                      data.firstName + " " + data.lastName
                                    }</p>
                                    <p> - Cùng Tìm Kiếm Công Việc Yêu Thích Nào <a href='${
                                      process.env.URL_REACT
                                    }'>FindJob.vn</a> </p>
                        `;
            sendmail(note, data.email);
          }

          if(isHavePass == false) {
            let note = `<img width="50%" src="https://www.findjobs.vn//htdocs/images/employers/202202/find_cam_job_xam.png" alt='logo' />
                                    <h1>FIND JOBS Xin Thông Báo Tới Bạn</h1>
                                    <h3><i>Tài Khoản Của Bạn Đã Được Tạo Thành Công</i></h3>
                                    <p> - Tên Tài Khoản : ${
                                      data.firstName + " " + data.lastName
                                    }</p>
                                    <p> - Mật Khẩu : ${data.password} </p>
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

let banUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundUser = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["userId"],
          },
        });
        if (!foundUser) {
          resolve({
            errCode: 2,
            errMessage: `Người dùng không tồn tại`,
          });
        } else {
          let account = await db.Account.findOne({
            where: { userId: userId },
            raw: false,
          });
          if (account) {
            account.statusCode = "S2";
            await account.save();
            resolve({
              errCode: 0,
              message: `Người dùng đã ngừng kích hoạt`,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let unbanUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userId) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundUser = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["userId"],
          },
        });
        if (!foundUser) {
          resolve({
            errCode: 2,
            errMessage: `Người dùng không tồn tại`,
          });
        } else {
          let account = await db.Account.findOne({
            where: { userId: userId },
            raw: false,
          });
          if (account) {
            account.statusCode = "S1";
            await account.save();
            resolve({
              errCode: 0,
              message: `Người dùng đã kích hoạt`,
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 2,
          errMessage: `Missing required parameters`,
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          raw: false,
          attributes: {
            exclude: ["userId"],
          },
        });
        let account = await db.Account.findOne({
          where: { userId: data.id },
          raw: false,
        });
        if (user && account) {
          user.firstName = data.firstName;
          user.lastName = data.lastName;
          user.address = data.address;
          user.genderCode = data.genderCode;
          user.dob = data.dob;
          user.email = data.email;
          if (data.image) {
            let imageUrl = "";
            const uploadedResponse = await cloudinary.uploader.upload(
              data.image,
              {
                upload_preset: "dev_setups",
              }
            );
            imageUrl = uploadedResponse.url;
            user.image = imageUrl;
          }
          await user.save();
          if (data.roleCode) account.roleCode = data.roleCode;
          await account.save();
          let temp = {
            address: user.address,
            companyId: user.companyId,
            dob: user.dob,
            email: user.email,
            firstName: user.firstName,
            genderCode: user.genderCode,
            id: user.id,
            image: user.image,
            lastName: user.lastName,
            roleCode: account.roleCode,
          };
          delete temp.file;
          resolve({
            errCode: 0,
            message: "Đã chỉnh sửa thành công",
            user: temp,
          });
        } else {
          resolve({
            errCode: 1,
            errMessage: "User not found!",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let changePaswordByPhone = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let account = await db.Account.findOne({
        where: { phonenumber: data.phonenumber },
        raw: false,
      });
      if (account) {
        account.password = await hashUserPasswordFromBcrypt(data.password);
        await account.save();
        resolve({
          errCode: 0,
          errMessage: "ok",
        });
      } else {
        resolve({
          errCode: 1,
          errMessage: "SĐT không tồn tại",
        });
      }
    } catch (error) {
      reject(error);
    }
  });
};

let handleLogin = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.phonenumber || !data.password) {
        resolve({
          errCode: 4,
          errMessage: "Các trường không được để trống !",
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
            userData.errMessage = "Không tìm thấy tài khoản";
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

let handleChangePassword = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.password || !data.oldpassword) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter!",
        });
      } else {
        let account = await db.Account.findOne({
          where: { userId: data.id },
          raw: false,
        });
        if (await bcrypt.compareSync(data.oldpassword, account.password)) {
          if (account) {
            account.password = await hashUserPasswordFromBcrypt(data.password);
            await account.save();
          }
          resolve({
            errCode: 0,
            errMessage: "ok",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Mật khẩu cũ không chính xác",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

let getAllUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.limit || !data.offset) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameter !",
        });
      } else {
        let objectFilter = {
          limit: +data.limit,
          offset: +data.offset,
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["code", "value"],
            },
            {
              model: db.Allcode,
              as: "statusAccountData",
              attributes: ["code", "value"],
            },
            {
              model: db.User,
              as: "userAccountData",
              attributes: {
                exclude: ["userId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["value", "code"],
                },
              ],
            },
          ],
          raw: true,
          nest: true,
        };
        if (data.search) {
          objectFilter.where = {phonenumber: {[Op.like]: `%${data.search}%`}}
        }
        let res = await db.Account.findAndCountAll(objectFilter);
        resolve({
          errCode: 0,
          data: res.rows,
          count: res.count,
        });
      }
    } catch (error) {
      reject(error.message);
    }
  });
};
let getDetailUserById = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!userid) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let res = await db.Account.findOne({
          where: { userId: userid, statusCode: "S1" },
          attributes: {
            exclude: ["password"],
          },
          include: [
            {
              model: db.Allcode,
              as: "roleData",
              attributes: ["value", "code"],
            },
            {
              model: db.User,
              as: "userAccountData",
              attributes: {
                exclude: ["userId"],
              },
              include: [
                {
                  model: db.Allcode,
                  as: "genderData",
                  attributes: ["value", "code"],
                },
                { model: db.UserSetting, as: "userSettingData" },
              ],
            },
          ],
          raw: true,
          nest: true,
        });
        if (res.userAccountData.userSettingData.file) {
          res.userAccountData.userSettingData.file = new Buffer.from(
            res.userAccountData.userSettingData.file,
            "base64"
          ).toString("binary");
        }
        let listSkills = await db.UserSkill.findAll({
          where: { userId: res.userAccountData.id },
          include: db.Skill,
          raw: true,
          nest: true,
        });
        res.listSkills = listSkills;
        resolve({
          errCode: 0,
          data: res,
        });
      }
    } catch (error) {
      reject(error.message);
    }
  });
};

let setDataUserSetting = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.data) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters!",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.id },
          attributes: {
            exclude: ["userId"],
          },
        });
        if (user) {
          let userSetting = await db.UserSetting.findOne({
            where: { userId: user.id },
            raw: false,
          });
          if (userSetting) {
            userSetting.salaryJobCode = data.data.salaryJobCode;
            userSetting.categoryJobCode = data.data.categoryJobCode;
            userSetting.addressCode = data.data.addressCode;
            userSetting.experienceJobCode = data.data.experienceJobCode;
            userSetting.isTakeMail = data.data.isTakeMail;
            userSetting.isFindJob = data.data.isFindJob;
            userSetting.file = data.data.file;
            await userSetting.save();
          } else {
            let params = {
              salaryJobCode: data.data.salaryJobCode,
              categoryJobCode: data.data.categoryJobCode,
              addressCode: data.data.addressCode,
              experienceJobCode: data.data.experienceJobCode,
              file: data.data.file,
              userId: user.id,
            };
            if (data.data.isTakeMail) params.isTakeMail = data.data.isTakeMail;
            if (data.data.isFindJob) params.isFindJob = data.data.isFindJob;
            await db.UserSetting.create(params);
          }
          if (data.data.listSkills && Array.isArray(data.data.listSkills)) {
            await db.UserSkill.destroy({
              where: { userId: user.id },
            });
            let objUserSkill = data.data.listSkills.map((item) => {
              return {
                UserId: user.id,
                SkillId: item,
              };
            });
            await db.UserSkill.bulkCreate(objUserSkill);
          }
          resolve({
            errCode: 0,
            errMessage: "Hệ thống đã ghi nhận lựa chọn",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Không tồn tại người dùng này",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  handleCreateNewUser: handleCreateNewUser,
  banUser: banUser,
  unbanUser: unbanUser,
  updateUserData: updateUserData,
  handleLogin: handleLogin,
  handleChangePassword: handleChangePassword,
  getAllUser: getAllUser,
  getDetailUserById: getDetailUserById,
  checkUserPhone: checkUserPhone,
  changePaswordByPhone,
  setDataUserSetting,
  optEmail: optEmail,
  checkUserEmail: checkUserEmail,
  checkCompanyPhone: checkCompanyPhone,
  checkMST: checkMST,
};
