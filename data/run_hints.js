const fs = require('fs');
let data = JSON.parse(fs.readFileSync('./data/questions.json', 'utf8'));

const categoryMappings = [
    {
        topics: ["Arrays", "Two Pointers"],
        keywords: ['two sum', '3 sum', '4 sum', '3sum', 'sum combination'],
        hint: "Sorting the array or using a Hash Map are usually optimal strategies for sum problems."
    },
    {
        topics: ["Binary Search"],
        keywords: ['search', 'find peak', 'rotated', 'median of 2 sorted', 'upper bound', 'lower bound', 'koko', 'aggressive cows'],
        hint: "Because you need to find an element efficiently or the data is sorted, Binary Search (O(log N)) is the optimal approach."
    },
    {
        topics: ["Sliding Window", "Two Pointers"],
        keywords: ['substring', 'longest common', 'window', 'character replacement', 'subarrays'],
        hint: "A Sliding Window approach using two pointers (left and right) is highly efficient here. Expand until invalid, then shrink."
    },
    {
        topics: ["Dynamic Programming"],
        keywords: ['dp', 'subsequence', 'coin', 'jump', 'house robber', 'buy and sell stock', 'climbing', 'edit distance', 'knapsack', 'partition', 'fibonacci'],
        hint: "Break this down into subproblems. Dynamic Programming with memoization or tabulation is key here."
    },
    {
        topics: ["Binary Tree"],
        keywords: ['tree', 'bt', 'bst', 'level order', 'diameter', 'lca', 'view', 'vertical order', 'path', 'root', 'burn'],
        hint: "You'll need recursive Tree Traversal algorithms like Depth-First Search (DFS) or a queue for Breadth-First Search (BFS)."
    },
    {
        topics: ["Graph", "BFS/DFS"],
        keywords: ['graph', 'island', 'rotten', 'bipartite', 'cycle', 'mst', 'shortest path', 'flood fill', 'distance of nearest'],
        hint: "View this as a Graph/Matrix problem. Matrix traversal using BFS (queue) or DFS (recursion) is needed."
    },
    {
        topics: ["Linked List", "Two Pointers"],
        keywords: ['linked list', 'll', 'node', 'intersection', 'merge two sorted lists'],
        hint: "Linked List operations usually require multiple pointers (often Fast and Slow pointers, or prev/curr/next) to track positions."
    },
    {
        topics: ["Stack", "Monotonic Stack"],
        keywords: ['stack', 'queue', 'next greater', 'parentheses', 'histogram', 'sliding window maximum'],
        hint: "A Stack (LIFO) or Monotonic Stack structure is the best way to keep track of previous elements efficiently."
    },
    {
        topics: ["Greedy", "Sorting"],
        keywords: ['sort', 'merge', 'interval', 'non-overlapping', 'inversion', 'meeting', 'platform', 'job sequencing'],
        hint: "Start by sorting the input data, then iterate through linearly using a Greedy approach to solve in O(N log N) time."
    },
    {
        topics: ["String Manipulation"],
        keywords: ['string', 'palindrome', 'anagram', 'prefix', 'pattern', 'word', 'character'],
        hint: "Consider character frequencies using arrays/hashmaps, or Two Pointers matching outward/inward."
    },
    {
        topics: ["Matrix"],
        keywords: ['matrix', 'grid', 'spiral'],
        hint: "Matrix traversal often requires simulating boundaries (top, bottom, left, right) carefully."
    },
    {
        topics: ["Backtracking", "Recursion"],
        keywords: ['backtracking', 'combination', 'permutation', 'n queen', 'sudoku', 'subset', 'generate parentheses'],
        hint: "Explore all possible states using Backtracking Recursion. Remember to undo your choices (backtrack) after exploring paths."
    },
    {
        topics: ["Bit Manipulation"],
        keywords: ['bitwise', 'xor', 'missing number', 'single number', 'power'],
        hint: "Bit manipulation techniques (like XOR properties where x^x=0) can solve this in constant space and O(N) time."
    },
    {
        topics: ["Heap / Priority Queue"],
        keywords: ['heap', 'priority queue', 'kth largest', 'k-th largest', 'median in a stream'],
        hint: "A Min-Heap or Max-Heap (Priority Queue) helps maintain the top K elements efficiently."
    },
    {
        topics: ["Trie"],
        keywords: ['trie', 'word ladder', 'distinct substrings'],
        hint: "A Trie (Prefix Tree) is optimal for fast string matching and prefix searches."
    },
    {
        topics: ["Mathematical"],
        keywords: ['number', 'factorial', 'gcd', 'armstrong', 'odd', 'even', 'divisible'],
        hint: "Look for optimal mathematical formulas or properties rather than brute forcing computations."
    }
];

data = data.map(q => {
    let title = q.title.toLowerCase();
    let assignedHint = "Think about the brute force solution first. Can you optimize it using a Hash Map or by Sorting?";
    let assignedTopics = ["Arrays"]; // default fallback

    for (let mapping of categoryMappings) {
        if (mapping.keywords.some(k => title.includes(k))) {
            assignedHint = mapping.hint;
            assignedTopics = mapping.topics;
            break;
        }
    }

    q.hint = assignedHint;
    q.topic = assignedTopics; // overriding earlier faulty topics
    return q;
});

fs.writeFileSync('./data/questions.json', JSON.stringify(data, null, 2));
console.log("Successfully rebuilt dataset with smart topics and AI hints.");
