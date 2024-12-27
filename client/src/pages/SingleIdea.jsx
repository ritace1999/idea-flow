import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Trash2, ThumbsUp, ThumbsDown } from "lucide-react";
import toast from "react-hot-toast";

function SingleIdea() {
  const { ideaId } = useParams();
  const { user } = useAuth();
  const [idea, setIdea] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIdea = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:5000/api/ideas/${ideaId}`
        );
        setIdea(response.data);
      } catch (err) {
        console.error("Error fetching idea:", err.message);
        setError("Failed to load idea. Please try again later.");
        toast.error("Failed to load idea. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchIdea();
  }, [ideaId]);

  const handleVote = async () => {
    if (!user) {
      toast.error("You must be logged in to vote.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/ideas/${ideaId}/vote`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      setIdea(response.data);
    } catch (err) {
      console.error("Error voting:", err.message);
      toast.error("Failed to cast vote. Please try again.");
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("You must be logged in to comment.");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/ideas/${ideaId}/comment`,
        { text: newComment },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIdea(response.data);
      setNewComment("");
    } catch (err) {
      console.error("Error submitting comment:", err.message);
      toast.error("Failed to submit comment. Please try again.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!user) {
      toast.error("You must be logged in to delete a comment.");
      return; // Stop the function if the user is not logged in
    }

    try {
      const response = await axios.delete(
        `http://localhost:5000/api/ideas/${ideaId}/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setIdea(response.data);
      toast.success("Comment deleted successfully!");
    } catch (err) {
      console.error("Error deleting comment:", err.message);
      toast.error("Failed to delete comment. Please try again.");
    }
  };

  if (loading) return <div>Loading idea...</div>;
  if (error) return <div>{error}</div>;

  const hasUserVoted = idea.votes?.some((vote) => vote.user === user?._id);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold mb-4">{idea.title}</h1>
        <p className="text-gray-700 mb-4">{idea.description}</p>
        <div className="flex items-center mb-4">
          <span className="text-sm text-gray-500">
            Submitted by {idea.user?.name || "Anonymous"} on{" "}
            {new Date(idea.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <button
            onClick={handleVote}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded"
          >
            {hasUserVoted ? (
              <>
                <ThumbsDown className="mr-2" />
                Remove Vote
              </>
            ) : (
              <>
                <ThumbsUp className="mr-2" />
                Vote
              </>
            )}
          </button>
          <span className="font-bold">Votes: {idea.votes?.length || 0}</span>
        </div>
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Comments</h2>
          {idea.comments?.length ? (
            idea.comments.map((comment) => (
              <div
                key={comment._id}
                className="border rounded-lg p-4 mb-4 bg-gray-50 flex justify-between items-center"
              >
                <div>
                  <p>{comment.text}</p>
                  <span className="text-sm text-gray-500">
                    By {comment.user?.name || "Anonymous"}
                  </span>
                </div>

                <Trash2
                  className="text-gray-400 cursor-pointer"
                  onClick={() => handleDeleteComment(comment._id)}
                />
              </div>
            ))
          ) : (
            <p>No comments yet.</p>
          )}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              className="w-full border rounded-lg p-2"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg mt-2"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SingleIdea;
