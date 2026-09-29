import * as React from "react";
import { Question } from "@/types";

interface DashboardCardsProps {
    questions: Question[];
}

export function DashboardCards({ questions }: DashboardCardsProps) {
    // Compute basic stats
    const total = questions.length;
    const difficulties = {
        Easy: questions.filter(q => q.difficulty === "Easy" || q.difficulty === "Basic").length,
        Medium: questions.filter(q => q.difficulty === "Medium" || q.difficulty === "Core").length,
        Hard: questions.filter(q => q.difficulty === "Hard" || q.difficulty === "Pro").length,
    };

    // Compute topic frequencies
    const topicCounts: Record<string, number> = {};
    questions.forEach(q => {
        q.topic.forEach(t => {
            topicCounts[t] = (topicCounts[t] || 0) + 1;
        });
    });

    const topTopics = Object.entries(topicCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-surface border border-subtle rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Total Questions</h3>
                <p className="text-3xl font-bold">{total}</p>
            </div>

            <div className="bg-surface border border-subtle rounded-2xl p-4 shadow-sm flex flex-col justify-between">
                <h3 className="text-sm font-medium text-gray-500 mb-2">By Difficulty</h3>
                <div className="flex justify-between items-end">
                    <div className="text-center">
                        <span className="block text-xs text-green-500 font-semibold">Easy</span>
                        <span className="font-bold">{difficulties.Easy}</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-xs text-yellow-500 font-semibold">Medium</span>
                        <span className="font-bold">{difficulties.Medium}</span>
                    </div>
                    <div className="text-center">
                        <span className="block text-xs text-red-500 font-semibold">Hard</span>
                        <span className="font-bold">{difficulties.Hard}</span>
                    </div>
                </div>
            </div>

            <div className="bg-surface border border-subtle rounded-2xl p-4 shadow-sm md:col-span-2 flex flex-col justify-between">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Top Topics</h3>
                <div className="flex flex-wrap gap-2">
                    {topTopics.map(([topic, count]) => (
                        <div key={topic} className="bg-background border border-subtle rounded-xl px-3 py-1 flex items-center gap-2">
                            <span className="text-sm font-semibold">{topic}</span>
                            <span className="bg-accent/10 text-accent text-xs px-1.5 py-0.5 rounded-md font-bold">{count}</span>
                        </div>
                    ))}
                    {topTopics.length === 0 && <span className="text-sm text-gray-400">No topics available</span>}
                </div>
            </div>
        </div>
    );
}
