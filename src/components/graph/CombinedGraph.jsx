import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResumeGraph } from "../../Reducer/ResumeGraphSlice.js";
import { fetchLinkdinGraph } from "../../Reducer/LinkdinGraphSlice.js";

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

const CombinedGraph = () => {
    const dispatch = useDispatch();
    const { graphData: resumeGraph, loading: resumeLoading } = useSelector(
        (state) => state.resumeGraph
    );
    const { graphData: linkdinGraph, loading: linkdinLoading } = useSelector(
        (state) => state.linkdinGraph
    );

    const [view, setView] = useState("Month"); // Month or Year

    useEffect(() => {
        dispatch(fetchResumeGraph({ type: view.toLowerCase() }));
        dispatch(fetchLinkdinGraph({ type: view.toLowerCase() }));
    }, [dispatch, view]);

    if (resumeLoading || linkdinLoading)
        return <p className="text-center py-6">Loading ...</p>;

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    // 🧮 Combined Data
    const chartData = months.map((monthName, index) => {
        const resumeMonth = resumeGraph?.monthlyBreakdown?.find(
            (m) => m.month === index + 1
        );
        const linkdinMonth = linkdinGraph?.monthlyBreakdown?.find(
            (m) => m.month === index + 1
        );

        return {
            name: monthName,
            totalResume: resumeMonth?.total || 0,
            totalLinkedin:
                (linkdinMonth?.post_generated_count || 0) +
                (linkdinMonth?.comment_generated_count || 0),
        };
    });

    const handleViewChange = (e) => setView(e.target.value);

    const tooltipFormatter = (value, name) => {
        switch (name) {
            case "totalResume":
                return [value, "Total Resumes"];
            case "totalLinkedin":
                return [value, "LinkedIn Contents"];
            default:
                return [value, name];
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Platform Usage Overview
                </h2>
                <select
                    value={view}
                    onChange={handleViewChange}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-purple-500"
                >
                    <option>Month</option>
                    <option>Year</option>
                </select>
            </div>

            {/* Combined Graph */}
            <ResponsiveContainer width="100%" height={380}>
                <ComposedChart
                    data={chartData}
                    margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" stroke="#6b7280" />
                    <YAxis
                        stroke="#6b7280"
                        domain={[0, (dataMax) => Math.ceil(dataMax / 20) * 20]}
                    />
                    <Tooltip formatter={tooltipFormatter} />

                    {/* Total Resume Line */}
                    <Line
                        type="monotone"
                        dataKey="totalResume"
                        stroke="#7c3aed"
                        strokeWidth={2}
                        dot={false}
                        name="Total Resumes"
                    />

                    {/* LinkedIn Total Line */}
                    <Line
                        type="monotone"
                        dataKey="totalLinkedin"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={false}
                        name="LinkedIn Contents"
                    />
                </ComposedChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CombinedGraph;
