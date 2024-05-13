import express from "express";
import accountController from "../controllers/accountController.js"
const router = new express.Router()

router.post("/SignUp", accountController.createAccount);

router.post('/signIn', accountController.signInAccount);

router.get("/refresh", accountController.refreshAccount);

router.get('/find/userName/:userName', accountController.getAccountByUserName);

router.post("/user/find", accountController.getAccount);

router.post('/account/recovery', accountController.accountRecovery);

router.get('/find/email/:email', accountController.getAccountByEmail);

router.patch('/reset/password', accountController.resetAccountPassword);

router.post('/confirm/password', accountController.confirmAccountPassword);

router.post("/account/logoutAll", accountController.logoutAllAccount);

router.post("/account/logout", accountController.logoutAccount);

router.patch("/account/update", accountController.updateAccount);

router.delete("/account/delete", accountController.deleteAccount);

router.get('/getFriends/:userId', accountController.getAccountFrirnds);

export default router
