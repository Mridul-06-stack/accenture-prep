import * as React from "react";

interface FiltersProps {
    difficulties: string[];
    selectedDifficulty: string;
    setSelectedDifficulty: (val: string) => void;

    topics: string[];
    selectedTopic: string;
    setSelectedTopic: (val: string) => void;

    sortBy: string;
    setSortBy: (val: string) => void;

    showBookmarked: boolean;
    setShowBookmarked: (val: boolean) => void;

    showUnsolvedOnly: boolean;
    setShowUnsolvedOnly: (val: boolean) => void;
}

export function Filters({
    difficulties, selectedDifficulty, setSelectedDifficulty,
    topics, selectedTopic, setSelectedTopic,
    sortBy, setSortBy,
    showBookmarked, setShowBookmarked,
    showUnsolvedOnly, setShowUnsolvedOnly
}: FiltersProps) {
    return (
        <div className="bg-surface border border-subtle rounded-2xl p-4 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
            <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="bg-background border border-subtle rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                >
                    <option value="">All Difficulties</option>
                    {difficulties.map(d => (
                        <option key={d} value={d}>{d}</option>
                    ))}
                </select>

                <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="bg-background border border-subtle rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-accent outline-none"
                >
                    <option value="">All Topics</option>
                    {topics.map(t => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>

                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent transition-colors">
                    <input
                        type="checkbox"
                        checked={showBookmarked}
                        onChange={(e) => setShowBookmarked(e.target.checked)}
                        className="rounded text-accent focus:ring-accent"
                    />
                    Bookmarked
                </label>

                <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-accent transition-colors">
                    <input
                        type="checkbox"
                        checked={showUnsolvedOnly}
                        onChange={(e) => setShowUnsolvedOnly(e.target.checked)}
                        className="rounded text-accent focus:ring-accent"
                    />
                    Unsolved Only
                </label>
            </div>

            <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-end">
                <span className="text-sm text-gray-500 font-medium">Sort by:</span>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-background border border-subtle rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-accent outline-none font-semibold"
                >
                    <option value="frequency">Frequency</option>
                    <option value="difficulty">Difficulty</option>
                    <option value="year">Year</option>
                    <option value="title">Title</option>
                </select>
            </div>
        </div>
    );
}
