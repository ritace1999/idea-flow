import React, { useState, useEffect } from "react";
import axios from "axios";

function IdeaReport() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:5000/api/ideas");
        if (response.data && Array.isArray(response.data.ideas)) {
          setIdeas(response.data.ideas);
        } else if (Array.isArray(response.data)) {
          setIdeas(response.data);
        } else {
          console.error(
            "Invalid data format received from API:",
            response.data
          );
          setError("Invalid data format received from the server.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="max-w-5xl mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Submitted Ideas Report
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-lg">
        {isLoading ? (
          <p className="text-gray-700 text-center">Loading ideas...</p>
        ) : error ? (
          <p className="text-red-500 text-center">Error: {error}</p>
        ) : ideas.length === 0 ? (
          <p className="text-gray-700 text-center">No ideas submitted yet.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-blue-100">
                <th className="px-4 py-2 text-left text-gray-800 font-bold">
                  Title
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-bold">
                  Category
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-bold">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-bold">
                  Impact
                </th>
                <th className="px-4 py-2 text-left text-gray-800 font-bold">
                  Resources
                </th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea, index) => (
                <tr
                  key={idea._id || index}
                  className={`${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  } hover:bg-blue-50`}
                >
                  <td className="px-4 py-2 text-gray-700">{idea.title}</td>
                  <td className="px-4 py-2 text-gray-700">{idea.category}</td>
                  <td className="px-4 py-2 text-gray-700">
                    {idea.description}
                  </td>
                  <td className="px-4 py-2 text-gray-700">{idea.impact}</td>
                  <td className="px-4 py-2 text-gray-700">{idea.resources}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default IdeaReport;
