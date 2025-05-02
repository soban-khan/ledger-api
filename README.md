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
git clone <repository-url>
cd ledger-api
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

The project includes a `.env` file with default development settings. For production, create your own `.env` file with appropriate values.

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

## API Documentation

### Endpoints

#### Accounts

- **GET /accounts** - List all accounts
- **POST /accounts** - Create a new account
- **GET /accounts/:id** - Get account details
- **GET /accounts/:id/balance** - Get account balance

#### Transactions

- **POST /transactions** - Create a new transaction
- **GET /transactions** - List transactions (with optional filters)
- **GET /transactions/:id** - Get transaction details

### Example Requests

#### Create an Account

```http
POST /accounts
Content-Type: application/json

{
  "name": "Cash",
  "type": "ASSET"
}
```

#### Create a Transaction

```http
POST /transactions
Content-Type: application/json

{
  "description": "Purchase office supplies",
  "transactionDate": "2025-05-01",
  "entries": [
    {
      "accountId": "account-id-for-expenses",
      "amount": 5000,
      "type": "DEBIT"
    },
    {
      "accountId": "account-id-for-cash",
      "amount": 5000,
      "type": "CREDIT"
    }
  ]
}
```

#### Get Account Balance

```http
GET /accounts/account-id/balance
```

#### List Transactions with Filters

```http
GET /transactions?accountId=account-id&startDate=2025-01-01&endDate=2025-05-01
```

## Database Schema

### Entities

- **Account**: Represents a ledger account

  - id (UUID)
  - name
  - type (ASSET, LIABILITY, EQUITY, REVENUE, EXPENSE)
  - timestamps

- **Transaction**: Represents a financial event

  - id (UUID)
  - description
  - transactionDate
  - timestamps

- **Entry**: Component of a transaction
  - id (UUID)
  - transactionId (Foreign Key -> Transaction)
  - accountId (Foreign Key -> Account)
  - amount (stored as integer cents)
  - type (DEBIT, CREDIT)
  - timestamps

## Design Decisions and Trade-offs

### Data Storage

- **Integer for Currency**: Amounts are stored as integers (cents) to avoid floating-point precision issues with financial calculations.
- **UUID Primary Keys**: Used for better distribution and security compared to sequential IDs.

### Business Logic

- **Transaction Validation**: All transactions must have at least two entries with balanced debits and credits.
- **Account Types**: The five standard accounting categories are supported (Asset, Liability, Equity, Revenue, Expense).
- **Balance Calculation**: Account balances are calculated on-demand based on all entries affecting the account.

### API Design

- **Consistent Error Handling**: Global exception filter ensures consistent error responses.
- **Input Validation**: Comprehensive validation using class-validator.
- **Filters**: Transaction listing supports filtering by account and date range.

### Trade-offs

- **On-demand Balance Calculation**: For simplicity, account balances are calculated on demand instead of maintaining a running balance. This approach is simpler but less efficient for accounts with many transactions.
- **Single Currency**: The system assumes a single currency for all transactions.
- **Synchronize ORM**: For ease of development, TypeORM's synchronize is enabled. In production, this should be disabled in favor of migrations.

## Testing

Run the test suite:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```
