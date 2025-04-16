import express from "express";
import accountController from "../controllers/accountController.js"
import authentication from "../middleware/authentication.js";
const router = new express.Router()

router.post("/SignUp", accountController.createAccount);

router.post('/signIn', accountController.signInAccount);

router.get("/refresh", accountController.refreshAccount);

router.get('/find/userName/:userName', accountController.getAccountByUserName);

router.post("/user/find", accountController.getAccount);

router.post('/sendEmail', accountController.sendEmail);

router.get('/find/email/:email', accountController.getAccountByEmail);

router.patch('/reset/password', accountController.resetAccountPassword);

router.post('/confirm/password', accountController.confirmAccountPassword);

router.post("/account/logoutAll", accountController.logoutAllAccount);

router.post("/account/logout", accountController.logoutAccount);

router.patch("/account/update", authentication, accountController.updateAccount);

router.delete("/account/delete", authentication, accountController.deleteAccount);

router.get('/getFriends/:userId', accountController.getAccountFrirnds);

router.post('/getListOfAccountsInformationByAnArrayOfIds', accountController.getListOfAccountsInformationByAnArrayOfIds)

export default router
