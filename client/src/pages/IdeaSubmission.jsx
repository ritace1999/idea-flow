import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

function IdeaSubmission() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    impact: "",
    resources: "",
  });

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([
    "Technology",
    "Process Improvement",
    "Product Innovation",
    "Service Enhancement",
  ]);
  const [newCategory, setNewCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/ideas",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      toast.success("Idea submitted successfully!");
      console.log("Idea submitted:", response.data);

      setFormData({
        title: "",
        description: "",
        category: "",
        impact: "",
        resources: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to submit idea. Please try again."
      );
      console.error(
        "Error submitting idea:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory)) {
      setCategories((prevCategories) => {
        const updatedCategories = [...prevCategories, newCategory.trim()];
        toast.success(`Category "${newCategory}" added successfully!`);
        setNewCategory("");
        return updatedCategories;
      });
    } else {
      toast.error("Category is either empty or already exists!");
    }
  };

  const handleDeleteCategory = (categoryToDelete) => {
    setCategories((prevCategories) => {
      const updatedCategories = prevCategories.filter(
        (category) => category !== categoryToDelete
      );
      toast.success(`Category "${categoryToDelete}" removed successfully!`);
      return updatedCategories;
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Toaster position="top-right" reverseOrder={false} />
      <h1 className="text-2xl font-bold mb-6">Submit Your Idea</h1>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Idea Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4 flex items-center">
            <input
              type="text"
              placeholder="Add new category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500 mr-2"
            />
            <button
              type="button"
              onClick={handleAddCategory}
              className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
            >
              Add
            </button>
          </div>

          <div className="mb-6">
            <h2 className="text-sm font-bold text-gray-700 mb-2">Categories</h2>
            <ul className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <li
                  key={category}
                  className="bg-gray-200 px-3 py-1 rounded-lg flex items-center"
                >
                  {category}
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="impact"
            >
              Expected Impact
            </label>
            <textarea
              id="impact"
              name="impact"
              value={formData.impact}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="resources"
            >
              Required Resources
            </label>
            <textarea
              id="resources"
              name="resources"
              value={formData.resources}
              onChange={handleChange}
              rows="3"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              required
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className={`bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Idea"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IdeaSubmission;
