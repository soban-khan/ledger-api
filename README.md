# Ledger API

A simple financial ledger API built with NestJS, TypeScript, and PostgreSQL, following double-entry accounting principles.

## Overview

This API provides a simple ledger system for tracking financial transactions using double-entry accounting principles. It allows you to:

- Create accounts (Asset, Liability, Equity, Revenue, Expense)
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

### Running the Application

1. Start the PostgreSQL database using Docker:

```bash
docker-compose up -d
```

2. Run the application:

```bash
# Development mode with hot reload
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

The API will be available at: http://localhost:3000

## Database Schema

### Entities

- **Account**: Represents a ledger account

  - id (UUID)
  - name
  - type (ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE)

- **Transaction**: Represents a financial event

  - id (UUID)
  - narration
  - reference_no
  - date

- **Entry**: Component of a transaction
  - id (UUID)
  - transaction_id (Foreign Key -> Transaction)
  - account_id (Foreign Key -> Account)
  - amount (stored as integer cents)
  - type (DEBIT, CREDIT)

## Design Decisions and Trade-offs

### Data Storage

- **Integer for Currency**: Amounts are stored as integers (cents) to avoid floating-point calculation issues.
- **UUID Primary Keys**: Used for better distribution and security compared to sequential IDs.

### Business Logic

- **Transaction Validation**: All transactions must have at least two entries with balanced debits and credits.
- **Account Types**: The five standard accounting categories are supported (Asset, Liability, Equity, Revenue, Expense).

### API Design

- **Consistent Error Handling**: Global exception filter ensures consistent error responses.
- **Input Validation**: Comprehensive validation using class-validator.
- **Filters**: Transaction listing supports filtering.

### Trade-offs

- **Single Currency**: The system assumes a single currency for all transactions.
- **Synchronize ORM**: For ease of development, TypeORM's synchronize is enabled. In production, this should be disabled in favor of migrations.
