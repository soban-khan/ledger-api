# Ledger API

A simple financial ledger API built with NestJS, TypeScript, and PostgreSQL, following double-entry accounting principles.

## Overview

This API provides a simple ledger system for tracking financial transactions using double-entry accounting principles. It allows you to:

- Create accounts with supported types (Asset, Liability, Equity, Revenue, Expense)
- Record transactions with balanced debits and credits
- Query account balances
- Retrieve transaction history with filtering options

## Technical Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- yarn
- Docker and Docker Compose (for local PostgreSQL instance)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/soban-khan/ledger-api.git
cd ledger-api
```

2. Install dependencies:

```bash
yarn install
```

3. Set up environment variables:

The project includes a `.env` file. Create your own `.env` file with appropriate values.

```bash
PORT = 3000

PSQL_HOST=localhost
PSQL_PORT=5432
PSQL_USERNAME=username
PSQL_PASSWORD=password
PSQL_DATABASE=database
PSQL_SYNCHRONIZE = true

JWT_AUTHSECRET = authentication_secret
JWT_EXPIRY = 8h
```

### Running the Application

1. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

2. Run the application:

```bash
# Development mode with hot reload
yarn run start:dev

# Production mode
yarn run build
yarn run start:prod

The API will be available at: http://localhost:3000 by default
```

3. API Documentation

```bash
The API documentation (Swagger) will be available at: http://localhost:3000/docs by default
```

## Database Schema

```bash
Refer to the ER Diagram (pdf file present in repo)
```

## Design Decisions and Trade-offs

### Data Storage

- **Integer for Currency**: Amounts are stored as integers (cents) to avoid floating-point calculation issues.
- **UUID Primary Keys**: Used for better distribution and security compared to sequential IDs.
- **Transaction Validation**: All transactions must have at least two entries with balanced debits and credits.
- **Account Types**: The five standard accounting categories are supported (Asset, Liability, Equity, Revenue, Expense).

### API Design

- **Consistent Error Handling**: Global exception filter ensures consistent error responses.
- **Input Validation**: Comprehensive validation using class-validator.
- **Filters**: Transaction listing supports filtering.

### Trade-offs

- **Single Currency**: The system assumes a single currency for all transactions.
- **Synchronize ORM**: For ease of development, TypeORM's synchronize is enabled. In production, this should be disabled in favor of migrations.
