import Link from 'next/link'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          🛡️ Security Agent
        </h1>
        <p className="text-xl text-gray-600 mb-12">
          AI Bootcamp Assignment 2 - Security Agent with RAG and News Digest tools
        </p>
        
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">🔍 RAG Tool</h2>
            <p className="text-gray-600">
              Search through cybersecurity knowledge base to answer questions about security concepts, frameworks, and best practices.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">📰 Security Digest</h2>
            <p className="text-gray-600">
              Generate daily security news digest from trusted cybersecurity sources in an easy-to-read format.
            </p>
          </div>
        </div>

        <Link 
          href="/agent" 
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Launch Security Agent →
        </Link>
      </div>
    </div>
  )
} 