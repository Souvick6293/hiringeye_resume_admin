import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeGraph } from "../../Reducer/ResumeGraphSlice.js";
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

const ResumeGraph = () => {
  const dispatch = useDispatch();
  const { graphData, loading } = useSelector((state) => state.resumeGraph);

  const [view, setView] = useState("Month"); // Month or Year

  useEffect(() => {
    dispatch(fetchResumeGraph({ type: view.toLowerCase() }));
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
      impResume: monthData?.impResume || 0,
      jdResume: monthData?.jdResume || 0,
      linkedinResume: monthData?.linkedinResume || 0,
      regularResume: monthData?.regularResume || 0,
      total: monthData?.total || 0, // API total
    };
  });

  const handleViewChange = (e) => setView(e.target.value);

  // Custom tooltip labels
  const tooltipFormatter = (value, name) => {
    switch (name) {
      case "impResume":
        return [value, "Improve Resume"];
      case "jdResume":
        return [value, "JD Base Resume"];
      case "linkedinResume":
        return [value, "LinkedIn Resume"];
      case "regularResume":
        return [value, "Sketch Resume"];
      case "total":
        return [value, "Total Resume"];
      default:
        return [value, name];
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Resumes Created</h2>
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
            domain={[0, (dataMax) => Math.ceil(dataMax / 25) * 25]}
            ticks={[0, 20, 40, 60, 80, 100]}
          />
          <Tooltip formatter={tooltipFormatter} />

          {/* Each Resume as Line */}
          <Line type="monotone" dataKey="impResume" stroke="#7c3aed" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="jdResume" stroke="#16a34a" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="linkedinResume" stroke="#f59e0b" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="regularResume" stroke="#ef4444" strokeWidth={2} dot={false} />

          {/* Total Line */}
          <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResumeGraph;
