import express from "express";
import followController from "../controllers/followController.js";
import authentication from "../middleware/authentication.js";

const router = express.Router();

router.post("/follow", authentication, followController.createFollow);

router.get("/following/:user/:follow", followController.getIfIFollowThisAccount);

router.delete("/unfollow", authentication, followController.unfollowAccount);

router.get("/followers/:user", followController.getFollowerCount);

router.get("/users/:userId/followings", followController.getFollowingCount);

export default router;