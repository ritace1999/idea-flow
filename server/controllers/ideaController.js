import Idea from "../models/Idea.js";
import { validateIdea } from "../utils/validators.js";

export const createIdea = async (req, res) => {
  try {
    const { title, description, category, impact, resources } = req.body;
    const validationError = validateIdea({
      title,
      description,
      category,
      impact,
      resources,
    });
    if (validationError) {
      return res.status(400).json({ message: validationError });
    }

    const idea = await Idea.create({
      title,
      description,
      category,
      impact,
      resources,
      user: req.user._id,
    });

    const populatedIdea = await Idea.findById(idea._id).populate(
      "user",
      "name email"
    );

    res.status(201).json(populatedIdea);
  } catch (error) {
    console.error("Error creating idea:", error.message);
    res
      .status(500)
      .json({ message: "Failed to create idea. Please try again later." });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.min(parseInt(req.query.limit) || 10, 100);
    const skip = (page - 1) * limit;

    const ideas = await Idea.find({})
      .populate("user", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Idea.countDocuments();

    res.json({
      ideas,
      page,
      pages: Math.ceil(total / limit),
      total,
    });
  } catch (error) {
    console.error("Error fetching ideas:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch ideas. Please try again later." });
  }
};

export const getIdeaById = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id)
      .populate("user", "name email")
      .populate("comments.user", "name")
      .populate("votes.user", "name");

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    res.json(idea);
  } catch (error) {
    console.error("Error fetching idea by ID:", error.message);
    res
      .status(500)
      .json({ message: "Failed to fetch idea. Please try again later." });
  }
};

export const updateIdeaStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "in_review", "approved", "rejected"];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value." });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    idea.status = status;
    await idea.save();

    res.json({ message: "Status updated successfully", status });
  } catch (error) {
    console.error("Error updating status:", error.message);
    res
      .status(500)
      .json({ message: "Failed to update status. Please try again later." });
  }
};

export const addComment = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Comment text is required." });
    }

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const comment = {
      user: req.user._id,
      text,
    };

    idea.comments.push(comment);
    await idea.save();
    const populatedIdea = await idea.populate("comments.user", "name");

    res.json(populatedIdea);
  } catch (error) {
    console.error("Error adding comment:", error.message);
    res
      .status(500)
      .json({ message: "Failed to add comment. Please try again later." });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const comment = idea.comments.id(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Check if the logged-in user is the one who created the comment
    if (comment.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this comment." });
    }

    // Remove the comment using pull
    idea.comments.pull(commentId);

    // Save the idea after removing the comment
    await idea.save();

    // Populate the comments after deletion
    const populatedIdea = await idea.populate("comments.user", "name");

    res.json(populatedIdea);
  } catch (error) {
    console.error("Error deleting comment:", error.message);
    res
      .status(500)
      .json({ message: "Failed to delete comment. Please try again later." });
  }
};

export const voteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    if (!idea) {
      return res.status(404).json({ message: "Idea not found" });
    }

    const alreadyVoted = idea.votes.find(
      (vote) => vote.user.toString() === req.user._id.toString()
    );

    if (alreadyVoted) {
      idea.votes = idea.votes.filter(
        (vote) => vote.user.toString() !== req.user._id.toString()
      );
    } else {
      idea.votes.push({ user: req.user._id });
    }

    await idea.save();
    const populatedIdea = await Idea.findById(idea._id)
      .populate("user", "name email")
      .populate("votes.user", "name");

    res.json(populatedIdea);
  } catch (error) {
    console.error("Error voting on idea:", error.message);
    res
      .status(500)
      .json({ message: "Failed to vote. Please try again later." });
  }
};
