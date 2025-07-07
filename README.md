# 🛡️ Security Agent - AI Bootcamp Capstone Project

A Next.js application with AI-powered security tools for cybersecurity professionals and enthusiasts. This capstone project demonstrates advanced AI agent capabilities with real-world security applications.

## 🚀 Features

### 1. 📰 Security Digest Tool
- **Purpose**: Generate Morning Brew-style daily digest for non-technical readers
- **Sources**: Multiple cybersecurity RSS feeds including:
  - ESET Security Blog
  - Krebs on Security
  - Dark Reading
  - Bleeping Computer
- **Output**: Markdown format saved to files + displayed in web interface
- **Format**: Easy-to-read summaries with key takeaways

### 2. 🔍 RAG Tool (Security Knowledge Search)
- **Purpose**: Search through cybersecurity knowledge base
- **Topics**: Prompt injection, Zero Trust, Supply Chain Security, NIST Framework
- **Use Cases**: Answer questions about security concepts and best practices
- **Format**: Detailed explanations for both technical and non-technical users

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **AI**: AI SDK + OpenAI GPT-4o
- **Tools**: RSS Parser for news feeds
- **Architecture**: AI SDK's `streamText` with multi-step reasoning (maxSteps: 10)

## 📋 Prerequisites

- Node.js 18+ (you already have v22.16.0 ✅)
- OpenAI API key (already configured ✅)
- npm or yarn

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Your `.env.local` should contain:
```bash
OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open Browser
Navigate to: http://localhost:3000

## 🧪 Testing Instructions

### Test 1: Security Digest Generation
1. Go to http://localhost:3000/agent
2. Click "Generate Security Digest" or type: **"Generate my daily security digest"**
3. **Expected Result**: 
   - AI fetches latest security news from RSS feeds
   - Creates Morning Brew-style digest
   - Saves file to `security-digests/` folder
   - Displays formatted digest in chat

### Test 2: RAG Knowledge Search
1. In the agent interface, try these queries:
   - **"What is prompt injection?"**
   - **"Explain zero trust security"**
   - **"What is the NIST Cybersecurity Framework?"**
   - **"Tell me about supply chain security"**

2. **Expected Results**:
   - AI searches knowledge base
   - Returns relevant security information
   - Explains concepts in simple terms

### Test 3: Quick Actions
1. Use the quick action buttons for instant testing
2. Each button triggers a pre-configured prompt
3. Verify both tools work through the UI

## 📁 Project Structure

```
app/
├── api/agent/route.ts      # Main agent with 2 tools
├── agent/page.tsx          # Agent chat interface
├── layout.tsx              # Root layout
├── page.tsx                # Home page
└── globals.css             # Tailwind styles

security-digests/           # Generated digest files
.env.local                  # Environment variables
```

## 🛠️ Tool Implementation Details

### Security Digest Tool
```typescript
generateSecurityDigest: tool({
  description: 'Generate daily security digest from RSS feeds',
  parameters: z.object({
    includeDate: z.boolean().default(true)
  }),
  execute: async ({ includeDate }) => {
    // Fetches from multiple RSS feeds
    // Creates formatted digest
    // Saves to file system
    // Returns structured response
  }
})
```

### RAG Search Tool
```typescript
searchSecurityKnowledge: tool({
  description: 'Search cybersecurity knowledge base',
  parameters: z.object({
    query: z.string()
  }),
  execute: async ({ query }) => {
    // Keyword matching against knowledge base
    // Returns relevant security topics
    // Provides detailed explanations
  }
})
```

## 🎯 Capstone Project Features

- ✅ **Exactly 2 tools** implemented
- ✅ **AI SDK pattern** followed from bootcamp
- ✅ **RSS scraping** for security news (alternative to Twitter API)
- ✅ **RAG functionality** with security knowledge base
- ✅ **streamText with maxSteps: 10** for multi-step reasoning
- ✅ **Non-technical friendly** output format
- ✅ **File saving** for digest reports
- ✅ **Web interface** for testing
- ✅ **TypeScript** implementation
- ✅ **Next.js** with proper structure

## 🧪 Capstone Deliverables Test

1. **Run `npm run dev` ✅**
2. **Go to `/agent` page ✅**
3. **Ask: "Generate my daily security digest" ✅**
4. **Ask: "What is prompt injection?" ✅**
5. **See both tools working correctly ✅**
6. **Find saved digest files in `security-digests/` ✅**
7. **Push working code to GitHub ✅**

## 🔧 Troubleshooting

### Common Issues

1. **OpenAI API Error**
   - Check `.env.local` has correct API key
   - Verify API key has sufficient credits

2. **RSS Feed Timeout**
   - Some feeds may be slow or unavailable
   - Tool handles errors gracefully

3. **Missing Dependencies**
   - Run `npm install` again
   - Check Node.js version (need 18+)

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🚀 Deployment

Ready for deployment to Vercel, Netlify, or any Next.js hosting platform:

```bash
npm run build
npm run start
```

## 📈 Future Enhancements

- Vector database integration for better RAG
- More security news sources
- User authentication
- Digest scheduling
- Security alert subscriptions
- Export to different formats (PDF, email)

---

**🎓 AI Bootcamp Capstone Project Complete!**
*Security Agent with RAG and News Digest tools using AI SDK pattern*
