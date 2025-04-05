import express from "express";
import userController from '../controllers/userController';
import companyController from '../controllers/companyController';
import middlewareControllers from '../middlewares/jwtVerify'
let router = express.Router();

let initWebRoutes = (app) => {

    //=====================API USER==========================//
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/update-user', userController.handleUpdateUser)
    router.post('/api/ban-user', middlewareControllers.verifyTokenAdmin ,userController.handleBanUser)
    router.post('/api/unban-user', middlewareControllers.verifyTokenAdmin ,userController.handleUnbanUser)
    router.post('/api/login', userController.handleLogin)
    router.get('/api/get-all-user', middlewareControllers.verifyTokenUser,userController.getAllUser)
    router.get('/api/get-detail-user-by-id', middlewareControllers.verifyTokenUser,userController.getDetailUserById)


    //==================API COMPANY=========================//
    router.post('/api/create-new-company', middlewareControllers.verifyTokenUser,companyController.handleCreateNewCompany)
    router.put('/api/update-company', middlewareControllers.verifyTokenUser,companyController.handleUpdateCompany)
    router.get('/api/get-detail-company-by-id', companyController.getDetailCompanyById)
    router.get('/api/get-detail-company-by-userId',companyController.getDetailCompanyByUserId)

    return app.use("/", router);
}

module.exports = initWebRoutes;