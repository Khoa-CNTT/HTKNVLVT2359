import db from "../models/index";
import bcrypt from "bcryptjs";
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
let handleLogin = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!data.phonenumber || !data.password) {
                resolve({
                    errCode: 4,
                    errMessage: 'Missing required parameters!'
                })
            }
            else {
                let userData = {};

                let isExist = await checkUserPhone(data.phonenumber);

                if (isExist) {
                    let account = await db.Account.findOne({
                        where: { phonenumber: data.phonenumber },
                        raw: true
                    })
                    if (account) {
                        let check = await bcrypt.compareSync(data.password, account.password);
                        if (check) {
                            if (account.statusCode == 'S1')
                            {
                                let user = await db.User.findOne({
                                    attributes: {
                                        exclude: ['userId','file']
                                    },
                                    where: {id: account.userId  },
                                    raw: true
                                })
                                user.roleCode = account.roleCode
                                userData.errMessage = 'Ok';
                                userData.errCode = 0;
                                userData.user= user;
                                userData.token = CommonUtils.encodeToken(user.id)
                            }
                            else {
                                userData.errCode = 1;
                                userData.errMessage = 'Tài khoản của bạn đã bị khóa';
                            }
                        }
                        else {
                            userData.errCode = 2;
                            userData.errMessage = 'Số điện thoại hoặc mật khẩu không chính xác';
                        }
                    } else {
                        userData.errCode = 3;
                        userData.errMessage = 'User not found!'
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `Số điện thoại hoặc mật khẩu không chính xác`
                }
                resolve(userData)
            }


        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {  
    handleLogin: handleLogin,
}