# Accenture PYQ Prep

A clean, fast, and mobile-friendly interview preparation platform tailored for Accenture assessments and coding rounds. Built statically from a localized JSON file using Next.js (App Router), React, Tailwind CSS, and Typescript.

## Quick Start

1. **Install Dependencies**
   Run the following command to download necessary node modules:
   ```bash
   npm install
   ```

2. **Start the Development Server**
   ```bash
   npm run dev
   ```
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application in action.

## Data Integration & Updates
The system dynamically generates its interface directly from `data/questions.json`.
You can add rows without modifying any source code. Ensure new question objects conform to the following schema within the main array:

```json
{
  "id": 1,
  "title": "Two Sum",
  "difficulty": "Easy", 
  "topic": ["Array", "Hash Map"],
  "round": "Online Assessment",
  "year": 2024,
  "frequency": "High",
  "links": {
    "leetcode": "https://leetcode.com/problems/two-sum/",
    "gfg": "https://practice.geeksforgeeks.org/problems/key-pair5616/1",
    "codingninjas": "url",
    "others": [{ "name": "HackerRank", "url": "url" }]
  }
}
```
*Note: Any link attribute can be omitted if unavailable.*

## Link Precedence Logic
To streamline decision fatigue, practice links resolve in strict priority:
1. **LeetCode**
2. **GeeksforGeeks**
3. **Coding Ninjas**
4. **Other listed platforms**
The top priority link renders as the primary button with platform-specific branding (e.g. Orange for LeetCode, Green for GfG), while the rest display as secondary navigation pills.

## Deploying

The app is a standard static Next.js build. 
To deploy, you can push the source to a repository (e.g., GitHub, GitLab) and import it directly inside **Vercel** or **Netlify**. Both platforms automatically detect the Next.js scaffold and provide 1-click CI/CD hooks requiring virtually zero configuration.

To produce a static export for **GitHub pages**:
1. Open `next.config.ts`.
2. Add `output: 'export'` to your configuration options.
3. Run `npm run build` to generate the HTML outputs inside the `/out` directory.
