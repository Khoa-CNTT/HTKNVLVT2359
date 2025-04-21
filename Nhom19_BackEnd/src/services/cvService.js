import db from "../models/index";

let getMapRequiredSkill = (mapRequired,post) => {
    for (let key of mapRequired.keys()) {
        if(!CommonUtils.flatAllString(post.postDetailData.descriptionHTML).includes(CommonUtils.flatAllString(mapRequired.get(key).toLowerCase()))) {
            mapRequired.delete(key)
        }
    }
}

let handleCreateCv = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId || !data.file || !data.postId || !data.description) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameters !'
                })
            } else {
                let cv = await db.Cv.create({
                    userId: data.userId,
                    file: data.file,
                    postId: data.postId,
                    isChecked: 0,
                    description: data.description
                })
                if (cv) {
                    resolve({
                        errCode: 0,
                        errMessage: 'Đã gửi CV thành công'
                    })
                }
                else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Đã gửi CV thất bại'
                    })
                }
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    handleCreateCv: handleCreateCv,
}