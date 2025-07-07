# SecureGuard AI

> AI-powered cybersecurity assistant for vulnerability detection and automated remediation

## Overview

SecureGuard AI is a cybersecurity capstone project that helps developers identify, understand, and fix security vulnerabilities in their development environments. This project was specifically inspired by the critical RCE vulnerability (CVE-2025-49596) discovered in Anthropic's MCP Inspector, which highlighted the need for better security scanning tools for AI-assisted development workflows.

The tool combines local network scanning, AI-powered vulnerability analysis, and automated remediation to make cybersecurity accessible to non-technical users while providing advanced capabilities for security professionals.

## Key Features

- **🔍 Local Service Scanner** - Detects running services and exposed ports (including MCP Inspector on port 6277)
- **🧠 AI-Powered Analysis** - Translates technical vulnerabilities into plain English explanations
- **🛠️ Automated Remediation** - Provides guided fixes and automated patching for common issues
- **⚡ Real-time Monitoring** - Continuous protection with threat intelligence integration

## Quick Start

```bash
# Clone the repository
git clone https://github.com/MrRoarke/agent-bootcamp-project.git
cd agent-bootcamp-project

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## Project Status

This project is being developed in phases as part of the AI Agent Bootcamp:

- **✅ Phase 1** (Weeks 1-4): Core service scanner and detection capabilities
- **🚧 Phase 2** (Weeks 5-8): AI-powered vulnerability knowledge base (In Progress)
- **📋 Phase 3** (Weeks 9-12): Automated remediation system (Planned)
- **📋 Phase 4** (Weeks 13-16): Continuous monitoring and threat intelligence (Planned)

## Technology Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes, SQLite database
- **AI Integration**: OpenAI GPT-4o, vector embeddings for RAG
- **Security**: Local-first processing, encrypted data storage

## Documentation

- **[📋 Complete PRD](./docs/PRD.md)** - Detailed product requirements and technical specifications
- **[🎯 Project Overview](./docs/PROJECT_OVERVIEW.md)** - Motivation, goals, and academic context
- **[🏗️ Architecture Guide](./docs/ARCHITECTURE.md)** - Technical implementation details
- **[📊 Progress Reports](./docs/PROGRESS.md)** - Development timeline and milestones

## Academic Context

This capstone project serves multiple academic and professional goals:

- **AI Agent Bootcamp**: Practical implementation of AI agents for cybersecurity
- **Graduate Application**: Supporting material for NYU Cybersecurity Master's program
- **Real-world Impact**: Addressing the specific vulnerability that affected thousands of developers

## Contributing

This is primarily an academic project, but feedback and suggestions are welcome! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## License

MIT License - see [LICENSE](./LICENSE) for details.

## Contact

- **Developer**: [Your Name]
- **Project**: Part of AI Agent Bootcamp capstone series
- **Academic Context**: NYU Cybersecurity Master's program application

---

**⚠️ Important**: This tool is designed for educational and legitimate security testing purposes only. Always ensure you have proper authorization before scanning networks or systems.
