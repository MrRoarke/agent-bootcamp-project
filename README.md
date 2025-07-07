# SecureGuard AI - Agent Bootcamp Capstone Project

> AI-powered cybersecurity assistant for vulnerability detection and automated remediation

## Project Evolution

This repository represents the evolution of my AI Agent Bootcamp work:

- **✅ Assignment 2** (Complete): Security Agent with RSS digest and RAG tools
- **🚧 Capstone Project** (In Progress): SecureGuard AI - Advanced vulnerability detection system

## Current Functionality (Assignment 2) ✅

**Working Security Agent** with two operational tools:

### 1. 📰 Security Digest Tool
- **Purpose**: Generate Morning Brew-style daily digest for non-technical readers
- **Sources**: Multiple cybersecurity RSS feeds (ESET, Krebs, Dark Reading, Bleeping Computer)
- **Output**: Markdown format saved to `security-digests/` + web interface display
- **Status**: ✅ Fully functional

### 2. 🔍 RAG Knowledge Search
- **Purpose**: Search cybersecurity knowledge base
- **Topics**: Prompt injection, Zero Trust, Supply Chain Security, NIST Framework
- **Format**: Detailed explanations for technical and non-technical users
- **Status**: ✅ Fully functional

### Quick Start (Current Assignment 2)
```bash
# Clone the repository
git clone https://github.com/MrRoarke/agent-bootcamp-project.git
cd agent-bootcamp-project

# Install dependencies
npm install

# Run the development server
npm run dev

# Test at http://localhost:3000/agent
```

### Testing the Current Tools
1. **Security Digest**: Ask "Generate my daily security digest"
2. **RAG Search**: Ask "What is prompt injection?" or "Explain zero trust security"
3. **Quick Actions**: Use the preset buttons for instant testing

## Capstone Evolution: SecureGuard AI 🚀

**Vision**: Transform the current security tools into a comprehensive vulnerability detection and remediation system inspired by CVE-2025-49596 (Anthropic's MCP Inspector RCE vulnerability).

### Planned Capstone Features

- **🔍 Local Service Scanner** - Detects running services and exposed ports (including MCP Inspector on port 6277)
- **🧠 AI-Powered Analysis** - Translates technical vulnerabilities into plain English explanations
- **🛠️ Automated Remediation** - Provides guided fixes and automated patching for common issues
- **⚡ Real-time Monitoring** - Continuous protection with threat intelligence integration

### Development Phases

- **✅ Phase 1** (Weeks 1-4): Core service scanner and detection capabilities
- **🚧 Phase 2** (Weeks 5-8): AI-powered vulnerability knowledge base (In Progress)
- **📋 Phase 3** (Weeks 9-12): Automated remediation system (Planned)
- **📋 Phase 4** (Weeks 13-16): Continuous monitoring and threat intelligence (Planned)

## Technology Stack

**Current (Assignment 2)**:
- **Frontend**: Next.js 14 + React + TypeScript + Tailwind CSS
- **AI**: AI SDK + OpenAI GPT-4o
- **Tools**: RSS Parser, Knowledge base search
- **Architecture**: AI SDK's `streamText` with multi-step reasoning (maxSteps: 10)

**Planned (Capstone)**:
- **Enhanced Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, SQLite database
- **AI Integration**: OpenAI GPT-4o, vector embeddings for RAG
- **Security**: Local-first processing, encrypted data storage

## Academic Context

This capstone project serves multiple academic and professional goals:

- **AI Agent Bootcamp**: Practical implementation of AI agents for cybersecurity
- **Graduate Application**: Supporting material for NYU Cybersecurity Master's program
- **Real-world Impact**: Addressing the specific vulnerability that affected thousands of developers
- **Continuity**: Building upon Assignment 2 foundations

## Documentation (Planned)

- **[📋 Complete PRD](./docs/PRD.md)** - Detailed product requirements and technical specifications
- **[🎯 Project Overview](./docs/PROJECT_OVERVIEW.md)** - Motivation, goals, and academic context
- **[🏗️ Architecture Guide](./docs/ARCHITECTURE.md)** - Technical implementation details
- **[📊 Progress Reports](./docs/PROGRESS.md)** - Development timeline and milestones

## Assignment 2 Deliverables ✅

- ✅ **Exactly 2 tools** implemented and working
- ✅ **AI SDK pattern** followed from bootcamp
- ✅ **RSS scraping** for security news
- ✅ **RAG functionality** with security knowledge base
- ✅ **streamText with maxSteps: 10** for multi-step reasoning
- ✅ **Non-technical friendly** output format
- ✅ **File saving** for digest reports
- ✅ **Web interface** for testing
- ✅ **TypeScript** implementation
- ✅ **Next.js** with proper structure

## Contributing

This is primarily an academic project, but feedback and suggestions are welcome!

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contact

- **Developer**: [Your Name]
- **Project**: AI Agent Bootcamp → NYU Cybersecurity Master's application
- **Current**: Assignment 2 complete, Capstone in progress

---

**⚠️ Important**: This tool is designed for educational and legitimate security testing purposes only. Always ensure you have proper authorization before scanning networks or systems.
