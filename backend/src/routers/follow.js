import express from "express";
import followController from "../controllers/followController.js";

const router = express.Router();

router.post("/follow", followController.createFollow);

router.get("/following/:user/:follow", followController.getIfIFollowThisAccount);

router.delete("/unfollow", followController.unfollowAccount);

router.get("/followers/:user", followController.getFollowerCount);

router.get("/users/:userId/followings", followController.getFollowingCount);

export default router;