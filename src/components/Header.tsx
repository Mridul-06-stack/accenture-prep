import * as React from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Search } from "lucide-react";

interface HeaderProps {
    totalQuestions: number;
    solvedCount: number;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export function Header({ totalQuestions, solvedCount, searchQuery, setSearchQuery }: HeaderProps) {
    const percentage = totalQuestions > 0 ? Math.round((solvedCount / totalQuestions) * 100) : 0;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-subtle bg-surface/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
                {/* Title */}
                <div className="flex-shrink-0 flex flex-col justify-center">
                    <h1 className="text-xl font-bold text-accent hidden sm:block">Accenture PYQ Prep</h1>
                    <h1 className="text-xl font-bold text-accent sm:hidden">PYQ Prep</h1>
                </div>

                {/* Progress Bar & Search (Center) */}
                <div className="flex-1 max-w-2xl flex items-center gap-4 px-4">
                    <div className="relative flex-1 hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search questions..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-full border border-subtle bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 text-sm"
                        />
                    </div>

                    <div className="flex flex-col items-end gap-1 min-w-[120px]">
                        <div className="text-xs font-semibold text-gray-500 flex justify-between w-full">
                            <span>{solvedCount} / {totalQuestions} Solved</span>
                            <span>{percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden flex">
                            <div
                                className="bg-accent h-2 rounded-full transition-all duration-500 ease-out"
                                style={{ width: `${percentage}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Theme Toggle & Mobile Search */}
                <div className="flex-shrink-0 flex items-center gap-2">
                    <div className="md:hidden relative">
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-32 pl-8 pr-2 py-1.5 rounded-full border border-subtle bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 text-xs"
                        />
                        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    </div>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
