const fs = require('fs');

const filepath = 'questions.json';
const data = JSON.parse(fs.readFileSync(filepath, 'utf8'));

const makeSlug = title => {
    // Remove extra spaces, lowercase, replace non-alphanumeric with hyphen
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

data.forEach(q => {
    const slug = makeSlug(q.title);

    // Leetcode: try exact slug
    const leetcodeUrl = `https://leetcode.com/problems/${slug}/`;

    // GFG: try exact slug for modern practice portal
    const gfgUrl = `https://www.geeksforgeeks.org/problems/${slug}/1`;

    // Coding Ninjas (Naukri Code360)
    const naukriUrl = `https://www.naukri.com/code360/problems/${slug}`;

    // Fallback search that is highly likely to find the exact problem
    const googleSearchTitle = encodeURIComponent(q.title + " coding problem leetcode geeksforgeeks");
    const googleFallback = `https://www.google.com/search?q=${googleSearchTitle}`;

    // A direct GFG search, often better than generic explore search
    const gfgSearch = `https://www.geeksforgeeks.org/problems/search?q=${encodeURIComponent(q.title)}`;

    q.links = {
        leetcode: leetcodeUrl,
        gfg: gfgUrl,
        codingninjas: naukriUrl,
        others: [
            {
                name: "All Platforms Search",
                url: googleFallback
            }
        ]
    };
});

fs.writeFileSync(filepath, JSON.stringify(data, null, 2));
console.log("Successfully updated " + data.length + " questions with proper direct and fallback references.");
