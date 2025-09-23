import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeGraph } from "../../Reducer/ResumeGraphSlice.js";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ResumeGraph = () => {
  const dispatch = useDispatch();
  const { graphData, loading } = useSelector((state) => state.resumeGraph);

  const [view, setView] = useState("Month"); // Month or Year

  useEffect(() => {
    dispatch(fetchResumeGraph({ type: view.toLowerCase() }));
  }, [dispatch, view]);

  if (loading) return <p className="text-center py-6">Loading graph...</p>;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Cumulative total calculation
  let runningTotal = 0;
  const chartData = months.map((monthName, index) => {
    const monthData = graphData?.monthlyBreakdown?.find((m) => m.month === index + 1);
    const monthTotal =
      (monthData?.impResume || 0) +
      (monthData?.jdResume || 0) +
      (monthData?.linkedinResume || 0) +
      (monthData?.regularResume || 0);

    runningTotal += monthTotal;

    return {
      name: monthName,
      impResume: monthData?.impResume || 0,
      jdResume: monthData?.jdResume || 0,
      linkedinResume: monthData?.linkedinResume || 0,
      regularResume: monthData?.regularResume || 0,
      total: runningTotal,
    };
  });

  const handleViewChange = (e) => setView(e.target.value);

  // Custom tooltip formatter
  const tooltipFormatter = (value, name) => {
    switch (name) {
      case "impResume":
        return [value, "Improve Resume"];
      case "jdResume":
        return [value, "Jd Base Resume"];
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

      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="impColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="jdColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#16a34a" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#16a34a" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="linkedinColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="regularColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#6b7280" />
          <YAxis stroke="#6b7280" />
          <Tooltip formatter={tooltipFormatter} />

          {/* Stacked Areas */}
          <Area type="monotone" dataKey="impResume" stackId="1" stroke="#7c3aed" fill="url(#impColor)" />
          <Area type="monotone" dataKey="jdResume" stackId="1" stroke="#16a34a" fill="url(#jdColor)" />
          <Area type="monotone" dataKey="linkedinResume" stackId="1" stroke="#f59e0b" fill="url(#linkedinColor)" />
          <Area type="monotone" dataKey="regularResume" stackId="1" stroke="#ef4444" fill="url(#regularColor)" />

          {/* Blue cumulative total line */}
          <Line type="monotone" dataKey="total" stroke="#3b82f6" strokeWidth={2} dot={{ r: 3 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResumeGraph;
