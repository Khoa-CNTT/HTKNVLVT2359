import axios from "../axios";

//==================USER==========================//

const getAllUsers = (data) => {
  return axios.get(
    `/api/get-all-user?limit=${data.limit}&offset=${data.offset}&search=${data.search}`
  );
};

const createNewUser = (data) => {
  return axios.post(`/api/create-new-user`, data);
};

const UpdateUserService = (data) => {
  return axios.put(`/api/update-user`, data);
};

const BanUserService = (userId) => {
  return axios.post(`/api/ban-user`, {
    data: {
      id: userId,
    },
  });
};

const UnbanUserService = (userId) => {
  return axios.post(`/api/unban-user`, {
    data: {
      id: userId,
    },
  });
};

const getDetailUserById = (id) => {
  return axios.get(`/api/get-detail-user-by-id?id=${id}`);
};

const handleLoginService = (data) => {
  return axios.post(`/api/login`, data);
};

const UpdateUserSettingService = (data) => {
    return axios.put(`/api/setDataUserSetting`, data)

}

//===============ALL CODE========================//

const getAllCodeService = (type) => {
  return axios.get(`/api/get-all-code?type=${type}`);
};
const getListAllCodeService = (data) => {
  return axios.get(
    `/api/get-list-allcode?type=${data.type}&limit=${data.limit}&offset=${data.offset}&search=${data.search}`
  );
};

const getListJobTypeAndCountPost = (data) => {
  return axios.get(
    `/api/get-list-job-count-post?limit=${data.limit}&offset=${data.offset}`
  );
};

const createAllCodeService = (data) => {
  return axios.post(`/api/create-new-all-code`, data);
};

const DeleteAllcodeService = (allcodeId) => {
  return axios.delete(`/api/delete-all-code`, {
    data: {
      code: allcodeId,
    },
  });
};

const UpdateAllcodeService = (data) => {
  return axios.put(`/api/update-all-code`, data);
};

const getListSkill = (data) => {
  return axios.get(
    `/api/get-list-skill?categoryJobCode=${data.categoryJobCode}&limit=${data.limit}&offset=${data.offset}&search=${data.search}`
  );
};

const getDetailAllcodeByCode = (code) => {
  return axios.get(`/api/get-detail-all-code-by-code?code=${code}`);
};

const getAllSkillByJobCode = (categoryJobCode) => {
  return axios.get(
    `/api/get-all-skill-by-job-code?categoryJobCode=${categoryJobCode}`
  );
};

const createSkilleService = (data) => {
  return axios.post(`/api/create-new-skill`, data);
};

const UpdateSkillService = (data) => {
  return axios.put(`/api/update-skill`, data);
};

const DeleteSkillService = (skillId) => {
  return axios.delete(`/api/delete-skill`, {
    data: {
      id: skillId,
    },
  });
};

const getDetailSkillById = (id) => {
  return axios.get(`/api/get-detail-skill-by-id?id=${id}`);
};

//================================== COMPANY ============================
const createCompanyService = (data) => {
  return axios.post(`/api/create-new-company`, data);
};

const getDetailCompanyById = (id) => {
  return axios.get(`/api/get-detail-company-by-id?id=${id}`);
};

const getDetailCompanyByUserId = (userId, companyId) => {
  return axios.get(
    `/api/get-detail-company-by-userId?userId=${userId}&companyId=${companyId}`
  );
};

const RecruitmentService = (data) => {
  return axios.put(`/api/add-user-company`, data);
};

const getAllUserByCompanyIdService = (data) => {
  return axios.get(
    `/api/get-all-user-by-companyId?companyId=${data.companyId}&limit=${data.limit}&offset=${data.offset}`
  );
};

const updateCompanyService = (data) => {
  return axios.put(`/api/update-company`, data);
};

const QuitCompanyService = (data) => {
  return axios.put(`/api/quit-company`, data);
};

const getAllCompany = (data) => {
  return axios.get(
    `/api/get-all-company?limit=${data.limit}&offset=${data.offset}&search=${data.search}&censorCode=${data.censorCode}`
  );
};

const banCompanyService = (data) => {
  return axios.put(`/api/ban-company`, data);
};

const getListCompany = (data) => {
  return axios.get(
    `/api/get-list-company?limit=${data.limit}&offset=${data.offset}&search=${data.search}`
  );
};


const unbanCompanyService = (data) => {
  return axios.put(`/api/unban-company`, data);
};

const accecptCompanyService = (data) => {
  return axios.put(`/api/accecpt-company`, data);
};

export {
  DeleteAllcodeService,
  UpdateAllcodeService,
  getDetailAllcodeByCode,
  createAllCodeService,
  getListAllCodeService,
  getAllCodeService,
  getAllUsers,
  createNewUser,
  UpdateUserService,
  BanUserService,
  UnbanUserService,
  getDetailUserById,
  handleChangePassword,
  handleLoginService,
  createCompanyService,
  getDetailCompanyByUserId,
  updateCompanyService,
  RecruitmentService,
  getAllUserByCompanyIdService,
  QuitCompanyService,
  createPostService,
  updatePostService,
  banPostService,
  acceptPostService,
  getAllPostByAdminService,
  getAllPostByRoleAdminService,
  getDetailPostByIdService,
  activePostService,
  checkUserPhoneService,
  getListPostService,
  getListJobTypeAndCountPost,
  getListCompany,
  getDetailCompanyById,
  changePasswordByphone,
  getStatisticalTypePost,
  getPackageByType,
  getPaymentLink,
  paymentOrderSuccessService,
  getAllPackage,
  setActiveTypePackage,
  createPackagePost,
  getPackageById,
  updatePackagePost,
  getStatisticalPackagePost,
  getListNoteByPost,
  getAllCompany,
  accecptCompanyService,
  reupPostService,
  banCompanyService,
  unbanCompanyService,
  getListSkill,
  getAllSkillByJobCode,
  createSkilleService,
  UpdateSkillService,
  DeleteSkillService,
  getDetailSkillById,
  UpdateUserSettingService,
  getPackageByIdCv,
  getAllPackageCv,
  getPaymentLinkCv,
  paymentOrderSuccessServiceCv,
  setActiveTypePackageCv,
  createPackageCv,
  updatePackageCv,
  getStatisticalPackageCv,
  getAllToSelect,
  getHistoryTradeCv,
  getHistoryTradePost,
  getSumByYearCv,
  getSumByYearPost,
};
