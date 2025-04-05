import axios from "../axios";


//==================USER==========================//
const getAllUsers = (data) => {
    return axios.get(`/api/get-all-user?limit=${data.limit}&offset=${data.offset}&search=${data.search}`)

}
const createNewUser = (data) => {
    return axios.post(`/api/create-new-user`, data)

}
const UpdateUserService = (data) => {
    return axios.put(`/api/update-user`, data)

}
const BanUserService = (userId) => {
    return axios.post(`/api/ban-user`, {
        data: {
            id: userId
        }
    })

}

const UnbanUserService = (userId) => {
    return axios.post(`/api/unban-user`, {
        data: {
            id: userId
        }
    })

}


const getDetailUserById = (id) => {
    return axios.get(`/api/get-detail-user-by-id?id=${id}`)

}
const handleLoginService = (data) => {
    return axios.post(`/api/login`, data)

}


//================================== COMPANY ============================
const createCompanyService = (data) => {
    return axios.post(`/api/create-new-company`, data)

}
const getDetailCompanyByUserId = (userId,companyId) => {
    return axios.get(`/api/get-detail-company-by-userId?userId=${userId}&companyId=${companyId}`)

}
const getDetailCompanyById = (id) => {
    return axios.get(`/api/get-detail-company-by-id?id=${id}`)

}
const updateCompanyService = (data) => {
    return axios.put(`/api/update-company`, data)

}

export {
    DeleteAllcodeService, UpdateAllcodeService, getDetailAllcodeByCode, createAllCodeService, getListAllCodeService, getAllCodeService,
    getAllUsers, createNewUser, UpdateUserService, BanUserService,UnbanUserService, getDetailUserById, handleChangePassword, handleLoginService,
    createCompanyService, getDetailCompanyByUserId, updateCompanyService, RecruitmentService, getAllUserByCompanyIdService, QuitCompanyService,
    createPostService, updatePostService, banPostService,acceptPostService, getAllPostByAdminService,getAllPostByRoleAdminService, getDetailPostByIdService, activePostService, checkUserPhoneService, getListPostService,
    getListJobTypeAndCountPost, getListCompany, getDetailCompanyById,changePasswordByphone,getStatisticalTypePost , getPackageByType, getPaymentLink , paymentOrderSuccessService , getAllPackage ,
    setActiveTypePackage , createPackagePost , getPackageById , updatePackagePost , getStatisticalPackagePost,
    getListNoteByPost , getAllCompany , accecptCompanyService, reupPostService, banCompanyService, unbanCompanyService,
    getListSkill, getAllSkillByJobCode, createSkilleService, UpdateSkillService, DeleteSkillService, getDetailSkillById,
    UpdateUserSettingService,
    getPackageByIdCv, getAllPackageCv, getPaymentLinkCv, paymentOrderSuccessServiceCv, setActiveTypePackageCv, createPackageCv, updatePackageCv,getStatisticalPackageCv, getAllToSelect,
    getHistoryTradeCv, getHistoryTradePost, getSumByYearCv, getSumByYearPost
}