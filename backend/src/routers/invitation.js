import express from "express";
import invitationController from "../controllers/invitationController.js";

const router = express.Router();

router.post("/invite", invitationController.createInvitation);

router.get("/invitation/:invitationId", invitationController.getInvitationByID)

router.post("/acceptInvitation", invitationController.acceptInvitation)

router.post("/rejectInvitation", invitationController.rejectInvitation)

router.get("/getInvitationsByStoryId/:storyId", invitationController.getInvitationsByStoryId)

router.delete("/deleteInvitationByReceiverIdAndStoryId/:receiver/:story", invitationController.deleteInvitationByReceiverIdAndStoryId)

export default router