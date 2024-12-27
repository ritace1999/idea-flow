import express from "express";
import {
  createIdea,
  getIdeas,
  getIdeaById,
  updateIdeaStatus,
  addComment,
  deleteComment,
  voteIdea,
} from "../controllers/ideaController.js";
import { protect } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";

const router = express.Router();

router.route("/").post(protect, validateRequest, createIdea).get(getIdeas);

router.route("/:id").get(getIdeaById);

router.route("/:id/status").put(protect, updateIdeaStatus);

router.route("/:id/comment").post(protect, addComment);

router.route("/:id/comment/:commentId").delete(protect, deleteComment);

router.route("/:id/vote").post(protect, voteIdea);

export default router;
