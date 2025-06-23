# Agent Bootcamp Project - TypeScript

A simple AI project built with TypeScript that interacts with OpenAI's GPT-4o model.

## Features

- TypeScript implementation with proper type safety
- OpenAI GPT-4o integration
- Environment variable support
- Modern development setup with hot reloading

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- OpenAI API key

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create environment file:**
   ```bash
   cp .env.example .env
   ```
   
   Add your OpenAI API key to the `.env` file:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

## Usage

### Development
Run the project in development mode with hot reloading:
```bash
npm run dev
```

### Build and Run
Build the TypeScript code and run the compiled JavaScript:
```bash
npm run build
npm start
```

### Watch Mode
Automatically rebuild on file changes:
```bash
npm run watch
```

## Project Structure

```
src/
├── index.ts          # Main application file
package.json          # Node.js dependencies and scripts
tsconfig.json         # TypeScript configuration
.env                  # Environment variables (not in git)
.gitignore           # Git ignore rules
```

## API Usage

The project demonstrates basic OpenAI API usage:

```typescript
const response = await openai.chat.completions.create({
  model: "gpt-4o",
  messages: [
    {
      role: "user",
      content: "Hello, how are you?"
    }
  ]
});
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
