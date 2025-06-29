import { openai } from '@ai-sdk/openai';
import { streamText, tool } from 'ai';
import { z } from 'zod';
import RSSParser from 'rss-parser';
import fs from 'fs/promises';
import path from 'path';

// Simple rate limiting storage (in production, use Redis or database)
const requestCounts = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT = {
  maxRequests: 10,        // Max 10 requests per IP
  windowMs: 15 * 60 * 1000, // 15 minutes
  dailyLimit: 50          // Max 50 requests per day per IP
};

function getClientIP(request: Request): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  return forwarded?.split(',')[0] || realIP || 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; error?: string } {
  const now = Date.now();
  const key = ip;
  const current = requestCounts.get(key);
  
  // Reset if window expired
  if (!current || now > current.resetTime) {
    requestCounts.set(key, { count: 1, resetTime: now + RATE_LIMIT.windowMs });
    return { allowed: true };
  }
  
  // Check if over limit
  if (current.count >= RATE_LIMIT.maxRequests) {
    return { 
      allowed: false, 
      error: `Rate limit exceeded. Max ${RATE_LIMIT.maxRequests} requests per 15 minutes. Try again later.`
    };
  }
  
  // Increment count
  current.count++;
  requestCounts.set(key, current);
  return { allowed: true };
}

// Security knowledge base (simple in-memory store for demo)
const securityKnowledgeBase = [
  {
    id: 1,
    topic: "Prompt Injection",
    content: "Prompt injection is a vulnerability where malicious input manipulates an AI model's behavior by inserting instructions into user prompts. It can cause models to ignore safety guidelines, leak sensitive information, or perform unintended actions. Mitigation includes input validation, prompt isolation, and output filtering."
  },
  {
    id: 2,
    topic: "Zero Trust Security",
    content: "Zero Trust is a security framework that assumes no user or device should be trusted by default, regardless of location. It requires verification for every access request using multi-factor authentication, device compliance, and continuous monitoring. Key principles: verify explicitly, use least privilege access, and assume breach."
  },
  {
    id: 3,
    topic: "Supply Chain Security",
    content: "Supply chain security protects against vulnerabilities introduced through third-party software components. This includes dependency scanning, software bill of materials (SBOM), vendor security assessments, and secure development practices. Recent attacks like SolarWinds highlight this critical area."
  },
  {
    id: 4,
    topic: "NIST Cybersecurity Framework",
    content: "The NIST Cybersecurity Framework provides a structure for managing cybersecurity risk through five core functions: Identify, Protect, Detect, Respond, and Recover. It helps organizations assess current security posture and improve cybersecurity practices systematically."
  }
];

// RSS feeds for security news
const securityFeeds = [
  'https://feeds.feedburner.com/eset/blog',
  'https://krebsonsecurity.com/feed/',
  'https://www.darkreading.com/rss.xml',
  'https://www.bleepingcomputer.com/feed/'
];

export async function POST(req: Request) {
  // Check rate limit
  const clientIP = getClientIP(req);
  const rateLimitCheck = checkRateLimit(clientIP);
  
  if (!rateLimitCheck.allowed) {
    return new Response(JSON.stringify({ 
      error: rateLimitCheck.error,
      type: 'rate_limit_exceeded'
    }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const { messages } = await req.json();

  const result = await streamText({
    model: openai('gpt-4o'),
    maxSteps: 10,
    messages,
    tools: {
      generateSecurityDigest: tool({
        description: 'Generate a daily security digest from cybersecurity news sources. Returns a Morning Brew-style summary for non-technical readers.',
        parameters: z.object({
          includeDate: z.boolean().default(true).describe('Whether to include the current date in the digest'),
        }),
        execute: async ({ includeDate }) => {
          try {
            const parser = new RSSParser();
            const allArticles = [];
            
            // Fetch from multiple security RSS feeds
            for (const feedUrl of securityFeeds) {
              try {
                const feed = await parser.parseURL(feedUrl);
                const recentArticles = feed.items?.slice(0, 3).map(item => ({
                  title: item.title,
                  link: item.link,
                  summary: item.contentSnippet || item.summary || 'No summary available',
                  source: feed.title,
                  pubDate: item.pubDate
                })) || [];
                allArticles.push(...recentArticles);
              } catch (feedError) {
                console.error(`Error fetching ${feedUrl}:`, feedError);
              }
            }

            // Create digest content
            const currentDate = new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            });

            const digestContent = `
# 🛡️ Daily Security Digest${includeDate ? ` - ${currentDate}` : ''}

## Top Security Stories Today

${allArticles.slice(0, 5).map((article, index) => `
### ${index + 1}. ${article.title}
**Source:** ${article.source}
**Summary:** ${article.summary.substring(0, 200)}...
**Read more:** ${article.link}
`).join('\n')}

## 🔍 Key Takeaways
- Stay updated on emerging threats and vulnerabilities
- Review your organization's security policies regularly
- Implement multi-layered security defenses
- Monitor for indicators of compromise

---
*Generated by Security Agent for AI Bootcamp Assignment 2*
            `.trim();

            // Save digest to file
            const digestsDir = path.join(process.cwd(), 'security-digests');
            await fs.mkdir(digestsDir, { recursive: true });
            
            const filename = `security-digest-${new Date().toISOString().split('T')[0]}.md`;
            const filepath = path.join(digestsDir, filename);
            await fs.writeFile(filepath, digestContent);

            return {
              success: true,
              message: `Security digest generated and saved to ${filename}`,
              digest: digestContent,
              articlesFound: allArticles.length,
              savedTo: filepath
            };
          } catch (error) {
            return {
              success: false,
              error: `Failed to generate security digest: ${error instanceof Error ? error.message : 'Unknown error'}`,
              digest: null
            };
          }
        }
      }),

      searchSecurityKnowledge: tool({
        description: 'Search through cybersecurity knowledge base to answer questions about security concepts, frameworks, and best practices.',
        parameters: z.object({
          query: z.string().describe('The security topic or question to search for'),
        }),
        execute: async ({ query }) => {
          try {
            // Simple keyword matching for demo (in production, use vector similarity)
            const queryLower = query.toLowerCase();
            const matchingTopics = securityKnowledgeBase.filter(item => 
              item.topic.toLowerCase().includes(queryLower) ||
              item.content.toLowerCase().includes(queryLower) ||
              queryLower.includes(item.topic.toLowerCase().split(' ')[0])
            );

            if (matchingTopics.length === 0) {
              return {
                success: false,
                message: `No knowledge found for query: "${query}"`,
                results: [],
                availableTopics: securityKnowledgeBase.map(item => item.topic)
              };
            }

            return {
              success: true,
              message: `Found ${matchingTopics.length} relevant security topics`,
              results: matchingTopics.map(item => ({
                topic: item.topic,
                content: item.content
              })),
              query: query
            };
          } catch (error) {
            return {
              success: false,
              error: `Failed to search knowledge base: ${error instanceof Error ? error.message : 'Unknown error'}`,
              results: []
            };
          }
        }
      })
    },
    system: `You are a Security Agent for AI Bootcamp Assignment 2. You have access to two powerful tools:

1. **generateSecurityDigest**: Creates daily security news digests from cybersecurity RSS feeds
2. **searchSecurityKnowledge**: Searches a cybersecurity knowledge base

When users ask for:
- "Generate my daily security digest" or similar → use generateSecurityDigest
- Questions about security concepts, frameworks, or best practices → use searchSecurityKnowledge

Always provide helpful, accurate security information and explain complex concepts in simple terms for non-technical users.`
  });

  return result.toDataStreamResponse();
} 