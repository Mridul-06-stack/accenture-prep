import * as React from "react";
import { Question } from "@/types";
import { QuestionItem } from "./QuestionItem";
import { Frown } from "lucide-react";

interface QuestionListProps {
    questions: Question[];
    solvedIds: number[];
    bookmarkedIds: number[];
    onToggleSolved: (id: number) => void;
    onToggleBookmark: (id: number) => void;
}

export function QuestionList({
    questions,
    solvedIds,
    bookmarkedIds,
    onToggleSolved,
    onToggleBookmark
}: QuestionListProps) {
    if (questions.length === 0) {
        return (
            <div className="bg-surface border border-subtle rounded-2xl p-12 flex flex-col items-center justify-center text-center shadow-sm">
                <Frown className="w-12 h-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">No questions found</h3>
                <p className="text-gray-500 mt-2 max-w-md">Try adjusting your filters or search query to find what you're looking for.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3 pb-20">
            {questions.map((question) => (
                <QuestionItem
                    key={question.id}
                    question={question}
                    isSolved={solvedIds.includes(question.id)}
                    isBookmarked={bookmarkedIds.includes(question.id)}
                    onToggleSolved={onToggleSolved}
                    onToggleBookmark={onToggleBookmark}
                />
            ))}
        </div>
    );
}
