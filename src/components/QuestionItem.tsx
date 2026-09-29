import * as React from "react";
import { Question } from "@/types";
import { ExternalLink, Bookmark, CheckCircle2, Circle, Lightbulb } from "lucide-react";

interface QuestionItemProps {
    question: Question;
    isSolved: boolean;
    isBookmarked: boolean;
    onToggleSolved: (id: number) => void;
    onToggleBookmark: (id: number) => void;
}

export function QuestionItem({
    question,
    isSolved,
    isBookmarked,
    onToggleSolved,
    onToggleBookmark
}: QuestionItemProps) {

    const [showHint, setShowHint] = React.useState(false);

    // Link extraction based on precedence
    const getPrimaryLink = () => {
        if (!question.links) return null;
        if (question.links.leetcode) return { name: "LeetCode", url: question.links.leetcode, color: "bg-orange-100 text-orange-600 hover:bg-orange-200" };
        if (question.links.gfg) return { name: "GeeksforGeeks", url: question.links.gfg, color: "bg-green-100 text-green-700 hover:bg-green-200" };
        if (question.links.codingninjas) return { name: "Coding Ninjas", url: question.links.codingninjas, color: "bg-orange-50 text-orange-500 hover:bg-orange-100" };
        if (question.links.others && question.links.others.length > 0) return { name: question.links.others[0].name, url: question.links.others[0].url, color: "bg-blue-100 text-blue-600 hover:bg-blue-200" };
        return null;
    };

    const getAllSecondaryLinks = () => {
        if (!question.links) return [];
        const primaryUrl = getPrimaryLink()?.url;

        let links: Array<{ name: string, url: string }> = [];
        if (question.links.leetcode && question.links.leetcode !== primaryUrl) links.push({ name: "LeetCode", url: question.links.leetcode });
        if (question.links.gfg && question.links.gfg !== primaryUrl) links.push({ name: "GFG", url: question.links.gfg });
        if (question.links.codingninjas && question.links.codingninjas !== primaryUrl) links.push({ name: "Ninjas", url: question.links.codingninjas });
        if (question.links.others) {
            question.links.others.forEach(l => {
                if (l.url !== primaryUrl) links.push(l);
            });
        }
        return links;
    };

    const primary = getPrimaryLink();
    const secondary = getAllSecondaryLinks();

    const getDifficultyColor = (diff: string) => {
        if (diff === "Easy" || diff === "Basic") return "text-green-500 bg-green-500/10";
        if (diff === "Medium" || diff === "Core") return "text-yellow-500 bg-yellow-500/10";
        if (diff === "Hard" || diff === "Pro") return "text-red-500 bg-red-500/10";
        return "text-gray-500 bg-gray-500/10";
    };

    return (
        <div className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row items-start sm:items-center gap-4 group ${isSolved ? 'border-green-500/30 bg-green-50/30 dark:bg-green-900/10 opacity-75' : 'border-subtle bg-surface hover:border-accent/40 hover:shadow-md'
            }`}>

            {/* Solved View Toggle */}
            <button
                onClick={() => onToggleSolved(question.id)}
                className="shrink-0 pt-1 sm:pt-0"
                aria-label={isSolved ? "Mark as unsolved" : "Mark as solved"}
            >
                {isSolved ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500 transition-transform hover:scale-110" />
                ) : (
                    <Circle className="w-6 h-6 text-gray-300 dark:text-gray-600 hover:text-accent transition-colors" />
                )}
            </button>

            {/* Main Info */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className={`text-base font-semibold truncate ${isSolved ? 'line-through text-gray-500 dark:text-gray-400' : ''}`}>
                        {question.title}
                    </h4>
                    {question.year && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                            {question.year}
                        </span>
                    )}
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className={`px-2 py-0.5 rounded font-medium ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                    </span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-600 dark:text-gray-400 font-medium">{question.frequency} Freq</span>
                    <span className="text-gray-400">&bull;</span>
                    <span className="text-gray-600 dark:text-gray-400 truncate max-w-[150px]">{question.round}</span>
                </div>

                {/* Topics / Hints Toggle */}
                <div className="mt-2 text-xs">
                    {showHint ? (
                        <div className="flex flex-wrap items-center gap-2">
                            <span className="font-semibold text-accent flex items-center gap-1">
                                <Lightbulb className="w-3.5 h-3.5" /> Hints:
                            </span>
                            {question.topic.map(t => (
                                <span key={t} className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 bg-background border border-subtle text-gray-500 rounded">
                                    {t}
                                </span>
                            ))}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowHint(true)}
                            className="flex items-center gap-1 text-gray-400 hover:text-accent text-[11px] font-medium transition-colors"
                        >
                            <Lightbulb className="w-3.5 h-3.5" /> Show Hint (Topics)
                        </button>
                    )}
                </div>
            </div>

            {/* Actions */}
            <div className="flex w-full sm:w-auto items-center justify-between sm:justify-end gap-3 shrink-0">
                <div className="flex gap-2 items-center flex-wrap">
                    {/* Primary Link Button */}
                    {primary ? (
                        <a
                            href={primary.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-1.5 pl-3 pr-4 py-1.5 rounded-full text-sm font-semibold transition-transform hover:scale-105 active:scale-95 ${primary.color}`}
                        >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Solve on {primary.name}
                        </a>
                    ) : (
                        <span className="text-sm text-gray-400 italic">No link available</span>
                    )}

                    {/* Secondary Links */}
                    {secondary.length > 0 && (
                        <div className="hidden lg:flex gap-1">
                            {secondary.map((link, idx) => (
                                <a
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs px-2 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                                    title={`Solve on ${link.name}`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>

                {/* Bookmark Toggle */}
                <button
                    onClick={() => onToggleBookmark(question.id)}
                    className={`p-2 rounded-full transition-colors ${isBookmarked
                            ? 'bg-accent/10 text-accent hover:bg-accent/20'
                            : 'text-gray-400 hover:text-accent hover:bg-surface'
                        }`}
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark question"}
                >
                    <Bookmark className="w-5 h-5" fill={isBookmarked ? "currentColor" : "none"} />
                </button>
            </div>
        </div>
    );
}
