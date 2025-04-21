import db from "../models/index";
const { Op, where } = require("sequelize");
require("dotenv").config();

let handleCreateNewPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.categoryJobCode ||
        !data.addressCode ||
        !data.salaryJobCode ||
        !data.amount ||
        !data.timeEnd ||
        !data.categoryJoblevelCode ||
        !data.userId ||
        !data.categoryWorktypeCode ||
        !data.experienceJobCode ||
        !data.genderPostCode ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        data.isHot === ""
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.userId },
          attributes: {
            exclude: ["userId"],
          },
        });
        let company = await db.Company.findOne({
          where: { id: user.companyId },
          raw: false,
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Người dùng không thuộc công ty",
          });
          return;
        } else {
          if (company.statusCode == "S1") {
            if (data.isHot == "1") {
              if (company.allowHotPost > 0) {
                company.allowHotPost -= 1;
                await company.save({ silent: true });
              } else {
                resolve({
                  errCode: 2,
                  errMessage: "Công ty bạn đã hết số lần đăng bài viết nổi bật",
                });
                return;
              }
            } else {
              if (company.allowPost > 0) {
                company.allowPost -= 1;
                await company.save({ silent: true });
              } else {
                resolve({
                  errCode: 2,
                  errMessage:
                    "Công ty bạn đã hết số lần đăng bài viết bình thường",
                });
                return;
              }
            }
            let detailPost = await db.DetailPost.create({
              name: data.name,
              descriptionHTML: data.descriptionHTML,
              descriptionMarkdown: data.descriptionMarkdown,
              categoryJobCode: data.categoryJobCode,
              addressCode: data.addressCode,
              salaryJobCode: data.salaryJobCode,
              amount: data.amount,
              categoryJoblevelCode: data.categoryJoblevelCode,
              categoryWorktypeCode: data.categoryWorktypeCode,
              experienceJobCode: data.experienceJobCode,
              genderPostCode: data.genderPostCode,
            });
            await db.Post.create({
              statusCode: "PS3",
              timeEnd: data.timeEnd,
              userId: data.userId,
              isHot: data.isHot,
              detailPostId: detailPost.id,
            });
            resolve({
              errCode: 0,
              errMessage:
                "Tạo bài tuyển dụng thành công hãy chờ quản trị viên duyệt",
            });
          } else {
            resolve({
              errCode: 2,
              errMessage: "Công ty bạn đã bị chặn không thể đăng bài",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleReupPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.userId || !data.postId || !data.timeEnd) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let user = await db.User.findOne({
          where: { id: data.userId },
          attributes: {
            exclude: ["userId"],
          },
        });
        let company = await db.Company.findOne({
          where: { id: user.companyId },
          raw: false,
        });
        if (!company) {
          resolve({
            errCode: 2,
            errMessage: "Người dùng không thuộc công ty",
          });
          return;
        } else {
          let post = await db.Post.findOne({
            where: { id: data.postId },
          });
          if (!post) {
            resolve({
              errCode: 2,
              errMessage: "Bài viết không tồn tại",
            });
            return;
          } else {
            if (post.isHot == "1") {
              if (company.allowHotPost > 0) {
                company.allowHotPost -= 1;
                await company.save();
              } else {
                resolve({
                  errCode: 2,
                  errMessage: "Công ty bạn đã hết số lần đăng bài viết nổi bật",
                });
                return;
              }
            } else {
              if (company.allowPost > 0) {
                company.allowPost -= 1;
                await company.save();
              } else {
                resolve({
                  errCode: 2,
                  errMessage:
                    "Công ty bạn đã hết số lần đăng bài viết bình thường",
                });
                return;
              }
            }
            await db.Post.create({
              statusCode: "PS3",
              timeEnd: data.timeEnd,
              userId: data.userId,
              isHot: post.isHot,
              detailPostId: post.detailPostId,
            });
            resolve({
              errCode: 0,
              errMessage:
                "Tạo bài tuyển dụng thành công hãy chờ quản trị viên duyệt",
            });
          }
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleUpdatePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (
        !data.name ||
        !data.categoryJobCode ||
        !data.addressCode ||
        !data.salaryJobCode ||
        !data.amount ||
        !data.timeEnd ||
        !data.categoryJoblevelCode ||
        !data.categoryWorktypeCode ||
        !data.experienceJobCode ||
        !data.genderPostCode ||
        !data.descriptionHTML ||
        !data.descriptionMarkdown ||
        !data.id ||
        !data.userId
      ) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let post = await db.Post.findOne({
          where: { id: data.id },
          raw: false,
        });
        if (post) {
          let otherPost = await db.Post.findOne({
            where: {
              detailPostId: post.detailPostId,
              id: {
                [Op.ne]: post.id,
              },
            },
          });
          if (otherPost) {
            let newDetailPost = await db.DetailPost.create({
              name: data.name,
              descriptionHTML: data.descriptionHTML,
              descriptionMarkdown: data.descriptionMarkdown,
              categoryJobCode: data.categoryJobCode,
              addressCode: data.addressCode,
              salaryJobCode: data.salaryJobCode,
              amount: data.amount,
              categoryJoblevelCode: data.categoryJoblevelCode,
              categoryWorktypeCode: data.categoryWorktypeCode,
              experienceJobCode: data.experienceJobCode,
              genderPostCode: data.genderPostCode,
            });
            post.detailPostId = newDetailPost.id;
          } else {
            let detailPost = await db.DetailPost.findOne({
              where: { id: post.detailPostId },
              attributes: {
                exclude: ["statusCode"],
              },
              raw: false,
            });
            (detailPost.name = data.name),
              (detailPost.descriptionHTML = data.descriptionHTML),
              (detailPost.descriptionMarkdown = data.descriptionMarkdown),
              (detailPost.categoryJobCode = data.categoryJobCode),
              (detailPost.addressCode = data.addressCode),
              (detailPost.salaryJobCode = data.salaryJobCode),
              (detailPost.amount = data.amount),
              (detailPost.categoryJoblevelCode = data.categoryJoblevelCode),
              (detailPost.categoryWorktypeCode = data.categoryWorktypeCode),
              (detailPost.experienceJobCode = data.experienceJobCode),
              (detailPost.genderPostCode = data.genderPostCode),
              await detailPost.save();
          }
          post.userId = data.userId;
          post.statusCode = "PS3";
          await post.save();
          resolve({
            errCode: 0,
            errMessage:
              "Đã chỉnh sửa bài viết thành công hãy chờ quản trị viên duyệt",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Bài đăng không tồn tại !",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleBanPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.postId || !data.note || !data.userId) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundPost = await db.Post.findOne({
          where: { id: data.postId },
          raw: false,
        });

        let postName = await db.DetailPost.findOne({
          where: { id: foundPost.detailPostId },
          attributes: {
            exclude: ["statusCode"],
          },
        });
        if (foundPost) {
          foundPost.statusCode = "PS4";
          await foundPost.save();
          await db.Note.create({
            postId: foundPost.id,
            note: data.note,
            userId: data.userId,
          });
          let user = await db.User.findOne({
            where: { id: foundPost.userId },
            attributes: {
              exclude: ["userId"],
            },
          });
          resolve({
            errCode: 0,
            errMessage: "Đã chặn bài viết thành công",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Không tồn tại bài viết",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleActivePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.userId || !data.note) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundPost = await db.Post.findOne({
          where: { id: data.id },
          raw: false,
        });
        let postName = await db.DetailPost.findOne({
          where: { id: foundPost.detailPostId },
          attributes: {
            exclude: ["statusCode"],
          },
        });
        if (foundPost) {
          foundPost.statusCode = "PS3";
          await foundPost.save();
          await db.Note.create({
            postId: foundPost.id,
            note: data.note,
            userId: data.userId,
          });
          let user = await db.User.findOne({
            where: { id: foundPost.userId },
            attributes: {
              exclude: ["userId"],
            },
          });
          resolve({
            errCode: 0,
            errMessage: "Đã mở lại trạng thái chờ duyệt",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Không tồn tại bài viết",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let handleAcceptPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id || !data.statusCode) {
        resolve({
          errCode: 1,
          errMessage: `Missing required parameters !`,
        });
      } else {
        let foundPost = await db.Post.findOne({
          where: { id: data.id },
          raw: false,
        });

        console.log("foundPost : ", foundPost);

        let postName = await db.DetailPost.findOne({
          where: { id: foundPost.detailPostId },
          attributes: {
            exclude: ["statusCode"],
          },
        });

        if (foundPost) {
          foundPost.statusCode = data.statusCode;
          if (data.statusCode == "PS1") {
            foundPost.timePost = new Date().getTime();
          }
          await foundPost.save();
          let note =
            data.statusCode == "PS1" ? "Đã duyệt bài thành công" : data.note;
          await db.Note.create({
            postId: foundPost.id,
            note: note,
            userId: data.userId,
          });
          let user = await db.User.findOne({
            where: { id: foundPost.userId },
            attributes: {
              exclude: ["userId"],
            },
          });
          resolve({
            errCode: 0,
            errMessage:
              data.statusCode == "PS1"
                ? "Duyệt bài thành công"
                : "Đã từ chối bài thành công",
          });
        } else {
          resolve({
            errCode: 2,
            errMessage: "Không tồn tại bài viết",
          });
        }
      }
    } catch (error) {
      reject(error);
    }
  });
};
let getDetailPostById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let post = await db.Post.findOne({
          where: {
            id: id,
          },
          attributes: {
            exclude: ["detailPostId"],
          },
          nest: true,
          raw: true,
          include: [
            {
              model: db.DetailPost,
              as: "postDetailData",
              attributes: [
                "id",
                "name",
                "descriptionHTML",
                "descriptionMarkdown",
                "amount",
              ],
              include: [
                {
                  model: db.Allcode,
                  as: "jobTypePostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "workTypePostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "salaryTypePostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "jobLevelPostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "genderPostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "provincePostData",
                  attributes: ["value", "code"],
                },
                {
                  model: db.Allcode,
                  as: "expTypePostData",
                  attributes: ["value", "code"],
                },
              ],
            },
          ],
        });
        if (post) {
          let user = await db.User.findOne({
            where: { id: post.userId },
            attributes: {
              exclude: ["userId"],
            },
          });
          let company = await db.Company.findOne({
            where: { id: user.companyId },
          });
          post.companyData = company;
          resolve({
            errCode: 0,
            data: post,
          });
        } else {
          resolve({
            errCode: 0,
            errMessage: "Không tìm thấy bài viết",
          });
        }
      }
    } catch (error) {
      reject(error.message);
    }
  });
};
let getStatisticalTypePost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await db.Post.findAll({
        where: {
          statusCode: "PS1",
        },
        include: [
          {
            model: db.DetailPost,
            as: "postDetailData",
            attributes: [],
            include: [
              {
                model: db.Allcode,
                as: "jobTypePostData",
                attributes: ["value", "code"],
              },
            ],
          },
        ],
        attributes: [
          [
            db.sequelize.fn(
              "COUNT",
              db.sequelize.col("postDetailData.categoryJobCode")
            ),
            "amount",
          ],
        ],
        group: ["postDetailData.categoryJobCode"],
        order: [[db.sequelize.literal("amount"), "DESC"]],
        limit: +data.limit,
        raw: true,
        nest: true,
      });
      let totalPost = await db.Post.findAndCountAll({
        where: {
          statusCode: "PS1",
        },
      });
      resolve({
        errCode: 0,
        data: res,
        totalPost: totalPost.count,
      });
    } catch (error) {
      reject(error);
    }
  });
};
let getListNoteByPost = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.id) {
        resolve({
          errCode: 1,
          errMessage: "Missing required parameters !",
        });
      } else {
        let res = await db.Note.findAndCountAll({
          where: { postId: data.id },
          limit: +data.limit,
          offset: +data.offset,
          include: [
            {
              model: db.User,
              as: "userNoteData",
              attributes: {
                exclude: ["userId"],
              },
            },
          ],
          order: [["createdAt", "DESC"]],
          raw: true,
          nest: true,
        });
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

module.exports = {
  handleCreateNewPost: handleCreateNewPost,
  handleUpdatePost: handleUpdatePost,
  handleBanPost: handleBanPost,
  handleAcceptPost: handleAcceptPost,
  getDetailPostById: getDetailPostById,
  handleActivePost: handleActivePost,
  getStatisticalTypePost: getStatisticalTypePost,
  getListNoteByPost: getListNoteByPost,
  handleReupPost: handleReupPost,
};
