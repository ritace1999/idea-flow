import React, { useState, useEffect } from "react";
import { BarChart2, ThumbsUp, MessageCircle, Clock } from "lucide-react";
import axios from "axios";

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [summaryData, setSummaryData] = useState({
    totalIdeas: 0,
    totalVotes: 0,
    totalComments: 0,
    pendingIdeas: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("http://localhost:5000/api/ideas");

        if (response.data && Array.isArray(response.data.ideas)) {
          const ideasArray = response.data.ideas;
          setIdeas(ideasArray);

          const totalVotes = ideasArray.reduce(
            (sum, idea) => sum + (idea.votes ? idea.votes.length : 0),
            0
          );
          const totalComments = ideasArray.reduce((sum, idea) => {
            return sum + (idea.comments ? idea.comments.length : 0);
          }, 0);
          const pendingIdeas = ideasArray.filter(
            (idea) => idea.status !== "Approved"
          ).length;

          setSummaryData({
            totalIdeas: ideasArray.length,
            totalVotes,
            totalComments,
            pendingIdeas,
          });
        } else {
          console.error("Invalid API response format:", response.data);
          setError("Invalid data received from the server.");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data. Please check the API.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading ideas...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Ideas</h3>
            <BarChart2 className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-3xl font-bold">{summaryData.totalIdeas}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Votes</h3>
            <ThumbsUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-3xl font-bold">{summaryData.totalVotes}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Comments</h3>
            <MessageCircle className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-3xl font-bold">{summaryData?.totalComments}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending</h3>
            <Clock className="w-6 h-6 text-orange-600" />
          </div>
          <p className="text-3xl font-bold">{summaryData.pendingIdeas}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Recent Ideas</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Description</th>
                <th className="text-center py-3 px-4">Votes</th>
                <th className="text-center py-3 px-4">Comments</th>
                <th className="text-center py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {ideas.map((idea) => (
                <tr
                  key={idea._id || idea.id}
                  className="border-b hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{idea.title}</td>
                  <td className="py-3 px-4">{idea.description}</td>
                  <td className="py-3 px-4 text-center">
                    {idea.votes?.length || 0}
                  </td>
                  <td className="text-center py-3 px-4">
                    {idea.comments?.length || 0}
                  </td>
                  <td className="text-center py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        idea.status?.trim().toLowerCase() === "approved"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {idea.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
