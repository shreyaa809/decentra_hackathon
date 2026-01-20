# Farmer Identity Backend - AI Coding Guidelines

## Project Overview
This is a TypeScript-based Express.js backend for a farmer identity system. The application follows a modular architecture starting from a single entry point in `src/index.ts`.

## Architecture
- **Entry Point**: `src/index.ts` - Main Express application setup
- **Build Output**: Compiled JavaScript in `dist/` directory
- **Module System**: CommonJS (configured in `tsconfig.json`)

## Development Workflow
### Building
Compile TypeScript sources:
```bash
npx tsc
```
This generates JavaScript files in `dist/` from `src/`.

### Running
Start the server:
```bash
node dist/index.js
```
Server listens on port 3000 by default.

### Adding Scripts
Update `package.json` scripts for convenience:
```json
"scripts": {
  "build": "tsc",
  "start": "node dist/index.js",
  "dev": "tsc && node dist/index.js"
}
```

## Code Patterns
### Express Setup
Always include JSON parsing middleware:
```typescript
app.use(express.json());
```

### Route Handlers
Use typed Request/Response from Express:
```typescript
app.get("/", (req: Request, res: Response) => {
  res.send("Response");
});
```

### TypeScript Configuration
- Target: ES2020
- Strict mode enabled
- Source directory: `src/`
- Output directory: `dist/`

## Dependencies
- **express**: Web framework
- **@types/express**: Type definitions
- **@types/node**: Node.js types
- **typescript**: Compiler

## File Structure
```
src/
  index.ts          # Main application file
dist/               # Compiled output (generated)
package.json        # Dependencies and scripts
tsconfig.json       # TypeScript configuration
```

## Key Files
- [src/index.ts](src/index.ts) - Application entry point and route definitions
- [tsconfig.json](tsconfig.json) - TypeScript compilation settings
- [package.json](package.json) - Project configuration and dependencies