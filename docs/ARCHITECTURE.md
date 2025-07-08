# SecureGuard AI - Technical Architecture

## System Overview

SecureGuard AI is designed as a dual-purpose cybersecurity platform that combines local network scanning with GitHub repository security analysis. The architecture follows a two-agent design pattern coordinated through a custom MCP server, enabling both local system protection and software supply chain security assessment.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend Layer                           │
│  Next.js Web App (TypeScript, Tailwind CSS, shadcn/ui)     │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                  API Gateway Layer                          │
│         Next.js API Routes (Serverless Functions)          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│              Two-Agent Orchestration Layer                  │
│  Agent 1: Repository Security Analyst │ Agent 2: Environment Guardian │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                MCP Server Layer                             │
│           SecureRepo Scanner (Custom MCP Server)           │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────┴───────────────────────────────────────┐
│                   Data & External Services                  │
│  SQLite │ Vector Store │ GitHub API │ CVE APIs │ Sandbox    │
└─────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Layer
- **Framework**: Next.js 14 with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design + shadcn/ui for components
- **State Management**: React Context for application state
- **Real-time Updates**: WebSocket connections for live scan results

### API Gateway Layer
- **Runtime**: Next.js API routes providing serverless functions
- **Authentication**: JWT-based session management
- **Rate Limiting**: Built-in protection against abuse
- **Error Handling**: Centralized error processing and logging

### Two-Agent System Architecture (Capstone Requirement)

The system implements exactly two specialized AI agents as required for the capstone project:

#### **Agent 1: Repository Security Analyst** 🕵️
- **Core Purpose**: GitHub repository security assessment and software supply chain analysis
- **Capabilities**:
  - Repository metadata analysis and risk assessment
  - Dependency vulnerability scanning and CVE correlation
  - Static code analysis for security anti-patterns
  - Software supply chain security evaluation
  - Threat intelligence correlation for repository risks
- **Implementation**: Specialized AI agent with GitHub API integration and security analysis models
- **Data Sources**: GitHub API, CVE databases, dependency vulnerability feeds, security advisory APIs

#### **Agent 2: Environment Setup Guardian** 🛡️
- **Core Purpose**: Local system security and safe environment management
- **Capabilities**:
  - Local network scanning and service discovery
  - Port scanning and service fingerprinting (including MCP Inspector detection)
  - Safe environment creation and sandbox management
  - Security boundary enforcement and monitoring
  - Guided remediation and configuration management
- **Implementation**: Local system integration with network scanning capabilities and environment isolation
- **Data Sources**: Local system APIs, network interfaces, process monitoring, file system access

### **MCP Server: SecureRepo Scanner** 🔧
- **Purpose**: Secure coordination layer between agents and system operations
- **Core Functions**:
  - Git repository management and secure cloning
  - File system security and access control
  - Network monitoring and traffic analysis
  - Security policy enforcement across both agents
  - Inter-agent communication and coordination
- **Security Features**: Sandboxing, permission management, audit logging, threat containment

## Data Architecture

### Local Data Storage (SQLite)
```sql
-- Local System Scan Results
CREATE TABLE local_scan_results (
    id INTEGER PRIMARY KEY,
    timestamp DATETIME,
    target_host TEXT,
    port INTEGER,
    service_name TEXT,
    service_version TEXT,
    vulnerability_score REAL,
    status TEXT,
    agent_id TEXT -- Tracks which agent generated the result
);

-- Repository Analysis Results
CREATE TABLE repository_analysis (
    id INTEGER PRIMARY KEY,
    repo_url TEXT,
    repo_name TEXT,
    analysis_timestamp DATETIME,
    risk_score INTEGER, -- 1-10 scale
    risk_level TEXT, -- HIGH, MEDIUM, LOW
    dependency_issues INTEGER,
    security_flags TEXT, -- JSON array of security concerns
    recommendation TEXT,
    agent_id TEXT
);

-- Repository Dependencies
CREATE TABLE repository_dependencies (
    id INTEGER PRIMARY KEY,
    repo_analysis_id INTEGER,
    package_name TEXT,
    package_version TEXT,
    vulnerability_count INTEGER,
    latest_version TEXT,
    risk_level TEXT,
    FOREIGN KEY (repo_analysis_id) REFERENCES repository_analysis(id)
);

-- Vulnerability Knowledge Base
CREATE TABLE vulnerabilities (
    id INTEGER PRIMARY KEY,
    cve_id TEXT UNIQUE,
    severity TEXT,
    description TEXT,
    affected_packages TEXT, -- JSON array
    solution TEXT,
    created_at DATETIME,
    source TEXT -- LOCAL, REPOSITORY, or BOTH
);

-- Agent Actions and Coordination
CREATE TABLE agent_actions (
    id INTEGER PRIMARY KEY,
    agent_id TEXT,
    action_type TEXT, -- SCAN, ANALYZE, REMEDIATE, MONITOR
    target TEXT, -- Repository URL or local system identifier
    status TEXT, -- PENDING, IN_PROGRESS, COMPLETED, FAILED
    result TEXT, -- JSON result data
    timestamp DATETIME,
    mcp_server_session TEXT -- MCP coordination tracking
);

-- Safe Environment Sessions
CREATE TABLE sandbox_sessions (
    id INTEGER PRIMARY KEY,
    session_id TEXT UNIQUE,
    repo_url TEXT,
    sandbox_path TEXT,
    created_at DATETIME,
    status TEXT, -- ACTIVE, COMPLETED, TERMINATED
    security_events INTEGER,
    risk_assessment TEXT
);
```

### Vector Database (RAG)
- **Purpose**: Semantic search over vulnerability knowledge base
- **Content**: CVE descriptions, security best practices, remediation guides
- **Implementation**: Vectorize integration with OpenAI embeddings

### External Data Sources
- **GitHub API**: Repository metadata, dependency information, security advisories
- **NIST CVE Database**: Official vulnerability data and severity scores
- **GitHub Security API**: Repository security advisories and vulnerability reports
- **npm/PyPI Security APIs**: Package-specific vulnerability information
- **Threat Intelligence Feeds**: Real-time threat data for both local and repository risks
- **MITRE ATT&CK Framework**: Attack pattern knowledge and threat modeling
- **OWASP Dependencies**: Vulnerability scanning and dependency analysis tools

## Security Architecture

### Privacy-First Design
- **Local Processing**: All scanning and analysis happens locally
- **Minimal Data Collection**: Only necessary metadata stored
- **Encryption**: All sensitive data encrypted at rest
- **No External Transmission**: Scan results never leave user's system

### Authentication & Authorization
- **Session Management**: JWT tokens with secure storage
- **Role-Based Access**: Different permission levels for users
- **API Security**: Rate limiting and input validation
- **Audit Logging**: Complete action trail for compliance

### Network Security
- **Scanning Ethics**: Respect for rate limits and target systems
- **Firewall Compliance**: Works within existing network policies
- **Protocol Security**: Secure communication channels
- **Isolation**: Sandboxed execution environment

## Agent Coordination Architecture

### **Two-Agent Workflow Patterns**

#### **Repository Analysis Workflow**
```
1. User Input: GitHub repository URL
2. Agent 1 (Repository Security Analyst):
   - Fetches repository metadata via GitHub API
   - Analyzes dependencies for known vulnerabilities
   - Performs static code analysis for security patterns
   - Generates risk assessment and recommendations

3. MCP Server (SecureRepo Scanner):
   - Creates isolated sandbox environment
   - Securely clones repository if analysis permits
   - Sets up monitoring and security boundaries

4. Agent 2 (Environment Setup Guardian):
   - Configures safe testing environment
   - Establishes security monitoring
   - Provides user guidance for safe interaction
   - Monitors ongoing security posture

5. Coordinated Response:
   - Both agents share findings through MCP server
   - Unified security recommendation generated
   - User receives comprehensive safety guidance
```

#### **Local System Scanning Workflow**
```
1. User Initiates: Local security scan
2. Agent 2 (Environment Setup Guardian):
   - Performs network port scanning
   - Identifies running services (including MCP Inspector detection)
   - Analyzes local system configuration
   - Assesses security posture

3. MCP Server (SecureRepo Scanner):
   - Coordinates secure access to system resources
   - Logs all scanning activities
   - Maintains security boundaries during scanning

4. Agent 1 (Repository Security Analyst):
   - Correlates discovered services with known vulnerabilities
   - Cross-references findings with CVE database
   - Provides context about discovered risks

5. Integrated Analysis:
   - Combined local and knowledge-based assessment
   - Prioritized remediation recommendations
   - Coordinated security guidance
```

#### **Integrated Security Assessment**
```
1. Comprehensive Analysis:
   - Agent 2: "Local system has MCP Inspector on port 6277"
   - Agent 1: "This matches CVE-2025-49596 vulnerability pattern"
   - MCP Server: Coordinates secure remediation actions

2. Repository + Local Correlation:
   - Agent 1: "Repository X has dependency Y with known RCE"
   - Agent 2: "Local system also vulnerable to same attack vector"
   - Combined: "High priority remediation required"

3. Coordinated Response:
   - Both agents work through MCP server
   - Unified security recommendations
   - Comprehensive protection strategy
```

### AI/ML Integration
- **OpenAI GPT-4o**: Natural language processing and explanation
- **Vector Embeddings**: Semantic similarity for vulnerability matching
- **Custom Models**: Specialized security classification models
- **Edge Computing**: Local inference for privacy

### **Repository Integration**
- **GitHub API v4 (GraphQL)**: Efficient repository metadata and security advisory retrieval
- **Git Operations**: Secure repository cloning and analysis in isolated environments
- **Package Manager APIs**: npm, PyPI, Maven for dependency vulnerability scanning
- **Static Analysis Integration**: ESLint, Semgrep, CodeQL for code pattern analysis
- **Dependency Scanning**: OWASP Dependency-Check, Snyk API, GitHub Dependabot

### **Local System Integration**
- **Network Scanning**: Custom port scanning with rate limiting and ethical scanning practices
- **Service Detection**: Protocol fingerprinting and banner grabbing for service identification
- **System Monitoring**: File system watching, process monitoring, network traffic analysis
- **Configuration Management**: Secure configuration file modification and system hardening

### External API Integration
- **CVE APIs**: Real-time vulnerability data
- **Threat Intelligence**: Security vendor feeds
- **Configuration APIs**: System management interfaces
- **Notification Services**: Alert delivery systems

## Deployment Architecture

### Development Environment
- **Local Development**: Next.js development server
- **Database**: Local SQLite instance
- **Testing**: Jest + Playwright for comprehensive testing
- **Debugging**: Chrome DevTools integration

### Production Environment
- **Containerization**: Docker for consistent deployment
- **Process Management**: PM2 for Node.js process management
- **Monitoring**: Health checks and performance metrics
- **Backup Strategy**: Automated database backups

## Scalability Considerations

### Performance Optimization
- **Caching Strategy**: Redis for frequently accessed data
- **Database Indexing**: Optimized queries for large datasets
- **Lazy Loading**: Component and data loading optimization
- **Background Processing**: Async job queues for long-running tasks

### Resource Management
- **Memory Usage**: Efficient data structures and garbage collection
- **CPU Optimization**: Parallel processing for scanning operations
- **Network Bandwidth**: Intelligent batching and compression
- **Storage Efficiency**: Data compression and archival strategies

## Security Scanning Technical Details

### **Repository Security Analysis Implementation**

#### **Phase 1: Metadata Analysis (Agent 1)**
```javascript
// Repository Risk Assessment Algorithm
async function analyzeRepositoryMetadata(repoUrl) {
  const metadata = await githubAPI.getRepository(repoUrl);
  const riskFactors = {
    age: calculateAgeRisk(metadata.created_at),
    activity: calculateActivityRisk(metadata.pushed_at),
    community: calculateCommunityRisk(metadata.stargazers_count, metadata.forks_count),
    maintainers: await analyzeMaintainerReputation(metadata.owner),
    securityPolicy: await checkSecurityPolicy(metadata)
  };
  
  return calculateOverallRisk(riskFactors);
}
```

#### **Phase 2: Dependency Analysis**
```javascript
// Dependency Vulnerability Scanning
async function scanDependencies(repoPath) {
  const packageFiles = await findPackageFiles(repoPath);
  const vulnerabilities = [];
  
  for (const file of packageFiles) {
    const dependencies = await parseDependencies(file);
    for (const dep of dependencies) {
      const vulns = await cveDatabase.searchVulnerabilities(dep.name, dep.version);
      vulnerabilities.push(...vulns);
    }
  }
  
  return prioritizeVulnerabilities(vulnerabilities);
}
```

#### **Phase 3: Static Code Analysis**
```javascript
// Security Anti-Pattern Detection
async function analyzeCodePatterns(repoPath) {
  const securityPatterns = [
    /process\.exec\(/g,           // Command execution
    /eval\(/g,                   // Code evaluation
    /innerHTML\s*=/g,            // XSS potential
    /document\.write\(/g,        // DOM manipulation
    /crypto\.createHash\(/g,     // Cryptographic operations
  ];
  
  const findings = await scanForPatterns(repoPath, securityPatterns);
  return categorizeFindings(findings);
}
```

### **Local System Scanning Implementation (Agent 2)**

#### **Port Scanning with MCP Inspector Detection**
```javascript
// Specialized MCP Inspector Detection
async function scanForMCPInspector() {
  const mcpInspectorPort = 6277;
  const result = await scanPort('localhost', mcpInspectorPort);
  
  if (result.isOpen) {
    const banner = await getBanner('localhost', mcpInspectorPort);
    if (banner.includes('MCP Inspector')) {
      return {
        vulnerability: 'CVE-2025-49596',
        severity: 'CRITICAL',
        description: 'MCP Inspector RCE vulnerability detected',
        remediation: 'Update MCP Inspector or disable service'
      };
    }
  }
  
  return null;
}
```

#### **Service Fingerprinting**
```javascript
// Comprehensive Service Detection
async function fingerprintServices(openPorts) {
  const services = [];
  
  for (const port of openPorts) {
    const service = {
      port: port.number,
      protocol: port.protocol,
      service: await identifyService(port),
      version: await getServiceVersion(port),
      vulnerabilities: await checkServiceVulnerabilities(port)
    };
    
    services.push(service);
  }
  
  return services;
}
```

### **Safe Environment Implementation (MCP Server)**

#### **Sandbox Creation and Management**
```javascript
// Secure Sandbox Environment
class SandboxEnvironment {
  constructor(sessionId) {
    this.sessionId = sessionId;
    this.basePath = `/tmp/secureguard-sandbox/${sessionId}`;
    this.networkPolicy = new NetworkPolicy();
    this.fileSystemPolicy = new FileSystemPolicy();
  }
  
  async createIsolatedEnvironment() {
    await fs.mkdir(this.basePath, { mode: 0o755 });
    await this.setupNetworkMonitoring();
    await this.setupFileSystemMonitoring();
    await this.enforceSecurityPolicies();
  }
  
  async monitorSecurityEvents() {
    // Real-time monitoring for suspicious activities
    return this.securityMonitor.getEvents();
  }
}
```

This architecture supports the capstone project's academic goals while providing a robust foundation for real-world cybersecurity applications. The two-agent design with MCP server coordination demonstrates advanced understanding of AI system architecture, cybersecurity principles, and software supply chain security challenges. 