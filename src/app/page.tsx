"use client";

import { useState, useMemo, useEffect } from "react";
import { Header } from "@/components/Header";
import { DashboardCards } from "@/components/DashboardCards";
import { Filters } from "@/components/Filters";
import { QuestionList } from "@/components/QuestionList";
import { Question } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

// We can just import the JSON directly or fetch it. Since it's local config data:
import questionsData from "../../data/questions.json";

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [solvedIds, setSolvedIds] = useLocalStorage<number[]>("acc-pyq-solved", []);
  const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>("acc-pyq-bookmarked", []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [sortBy, setSortBy] = useState("frequency");
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showUnsolvedOnly, setShowUnsolvedOnly] = useState(false);

  useEffect(() => {
    // Simulating loading data (if it was an API call)
    // Directly using the JSON file as requested
    setQuestions(questionsData as Question[]);
  }, []);

  // Compute unique filter options
  const difficulties = useMemo(() => Array.from(new Set(questions.map((q) => q.difficulty))), [questions]);
  const topics = useMemo(() => {
    const allTopics = new Set<string>();
    questions.forEach((q) => q.topic.forEach((t) => allTopics.add(t)));
    return Array.from(allTopics).sort();
  }, [questions]);

  // Apply filters and sorting
  const filteredAndSortedQuestions = useMemo(() => {
    let result = [...questions];

    // Search filter
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(q =>
        q.title.toLowerCase().includes(lowerQuery) ||
        q.topic.some(t => t.toLowerCase().includes(lowerQuery))
      );
    }

    // Dropdown filters
    if (selectedDifficulty) {
      result = result.filter(q => q.difficulty === selectedDifficulty);
    }
    if (selectedTopic) {
      result = result.filter(q => q.topic.includes(selectedTopic));
    }
    if (showBookmarked) {
      result = result.filter(q => bookmarkedIds.includes(q.id));
    }
    if (showUnsolvedOnly) {
      result = result.filter(q => !solvedIds.includes(q.id));
    }

    // Sorting
    result.sort((a, b) => {
      if (sortBy === "frequency") {
        const freqMap: Record<string, number> = { "High": 3, "Medium": 2, "Low": 1 };
        const freqA = freqMap[a.frequency] || 0;
        const freqB = freqMap[b.frequency] || 0;
        if (freqA !== freqB) return freqB - freqA;
        return a.id - b.id; // fallback
      }
      if (sortBy === "difficulty") {
        const diffMap: Record<string, number> = { "Hard": 3, "Pro": 3, "Medium": 2, "Core": 2, "Easy": 1, "Basic": 1 };
        const diffA = diffMap[a.difficulty] || 0;
        const diffB = diffMap[b.difficulty] || 0;
        if (diffA !== diffB) return diffB - diffA; // Hardest first
      }
      if (sortBy === "year") return (b.year || 0) - (a.year || 0);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

    return result;
  }, [questions, searchQuery, selectedDifficulty, selectedTopic, sortBy, showBookmarked, showUnsolvedOnly, bookmarkedIds, solvedIds]);

  const handleToggleSolved = (id: number) => {
    setSolvedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleToggleBookmark = (id: number) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        totalQuestions={questions.length}
        solvedCount={solvedIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      <main className="flex-1 container mx-auto px-4 py-8">
        <DashboardCards questions={questions} />

        <Filters
          difficulties={difficulties}
          selectedDifficulty={selectedDifficulty}
          setSelectedDifficulty={setSelectedDifficulty}

          topics={topics}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}

          sortBy={sortBy}
          setSortBy={setSortBy}

          showBookmarked={showBookmarked}
          setShowBookmarked={setShowBookmarked}

          showUnsolvedOnly={showUnsolvedOnly}
          setShowUnsolvedOnly={setShowUnsolvedOnly}
        />

        <QuestionList
          questions={filteredAndSortedQuestions}
          solvedIds={solvedIds}
          bookmarkedIds={bookmarkedIds}
          onToggleSolved={handleToggleSolved}
          onToggleBookmark={handleToggleBookmark}
        />
      </main>
    </div>
  );
}
