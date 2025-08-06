# atm-api

An ATM API

## Prerequisites

- Node.js 18+
- npm or yarn

## Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ibaiway/atm-api.git
   cd atm-api
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

## Development

### Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` .

### Available Scripts

| Command                | Description                              |
| ---------------------- | ---------------------------------------- |
| `npm run dev`          | Start development server with hot reload |
| `npm run build`        | Build the project for production         |
| `npm test`             | Run all tests                            |
| `npm test:unit`        | Run unit tests                           |
| `npm test:componennt`  | Run component tests                      |
| `npm run lint`         | Run ESLint                               |
| `npm run lint:fix`     | Fix ESLint issues                        |
| `npm run format`       | Format code with Prettier                |
| `npm run format:check` | Check code formatting                    |
| `npm run clean`        | Clean build directory                    |

## 🐳 Docker

### Build and Run with Docker

```bash
# Build the Docker image
docker build -t atm-api .

# Run the container
docker run -p 3000:3000 atm-api
```

## 🧪 Testing

The project includes Jest for testing with TypeScript support.

```bash
# Run all tests
npm test

# Run unit tests
npm test:unit

# Run component tests
npm test:component
```

## 🔍 Possible improvments

- **Error Handling**
- **Endpoint Validation**
- **Pre-commit hooks**
- **OpenApiSpec**
