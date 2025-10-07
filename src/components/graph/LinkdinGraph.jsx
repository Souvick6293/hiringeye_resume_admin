import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { fetchLinkdinGraph } from "../../Reducer/LinkdinGraphSlice.js";

const LinkdinGraph = () => {
  const dispatch = useDispatch();
  const { graphData, loading } = useSelector((state) => state.linkdinGraph);

  const [view, setView] = useState("Month"); // Month or Year

  useEffect(() => {
    dispatch(fetchLinkdinGraph({ type: view.toLowerCase() }));
  }, [dispatch, view]);

  if (loading) return <p className="text-center py-6">Loading graph...</p>;

  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Chart data directly from API
  const chartData = months.map((monthName, index) => {
    const monthData = graphData?.monthlyBreakdown?.find((m) => m.month === index + 1);
    return {
      name: monthName,
      posts: monthData?.post_generated_count || 0,
      comments: monthData?.comment_generated_count || 0,
    };
  });

  const handleViewChange = (e) => setView(e.target.value);

  const tooltipFormatter = (value, name) => {
    return [value, name === "posts" ? "Posts" : "Comments"];
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Contents Generated</h2>
        <select
          value={view}
          onChange={handleViewChange}
          className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <option>Month</option>
          <option>Year</option>
        </select>
      </div>

      {/* Graph */}
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis
            stroke="#6b7280"
            domain={[0, (dataMax) => Math.ceil(dataMax / 20) * 20]}
          />
          <Tooltip formatter={tooltipFormatter} />

          <Line type="monotone" dataKey="posts" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="comments" stroke="#ef4444" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LinkdinGraph;
