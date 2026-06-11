# KhataFlow Feature Documentation

KhataFlow is a full-stack money tracker built with React, Node.js, Express, and MongoDB. It helps each logged-in user manage personal income, expenses, budgets, lending, borrowing, and financial reports separately.

## Core Features

### User Authentication

- User registration with name, email, and password.
- User login with email and password.
- Passwords are stored as salted hashes using Node crypto.
- Login creates a signed auth token.
- Protected API routes require `Authorization: Bearer <token>`.
- If the user is not logged in, the app shows the login page.
- Invalid or expired sessions automatically return the user to the login page.
- Logout is available from the app header.

### User-Wise Data Management

- Each transaction, budget, and loan record is linked to the logged-in user.
- One user cannot view or modify another user's records through protected routes.
- Backend queries are scoped by authenticated `userId`.
- Data separation works for:
  - Transactions
  - Budgets
  - Loan and udhar records
  - Loan payment records
  - Dashboard totals and analytics

### Dashboard

- Shows net balance.
- Displays total income, total expenses, total savings, and outstanding loans.
- Shows recent transactions.
- Shows monthly budget overview.
- Displays cash flow chart for income and expenses.
- Shows spending mix with category-style breakdown.
- Provides quick navigation to analytics, budgets, and transactions.

### Transaction Management

- Add income and expense transactions.
- View all transactions in a table.
- Separate pages for:
  - All transactions
  - Income
  - Expenses
- Search transactions by description, category, or payment method.
- Filter transactions by category.
- Delete transactions.
- Transaction fields include:
  - Type
  - Amount
  - Description
  - Category
  - Payment method
  - Date
  - Notes

### Budget Management

- Create monthly budgets.
- View total monthly budget.
- Track spent amount.
- View remaining amount.
- See budget utilization percentage.
- Delete budgets.
- Budget fields include:
  - Name
  - Limit
  - Spent amount
  - Month
  - Color

### Loan And Udhar Management

- Track money given to others.
- Track money borrowed from others.
- View total amount to receive.
- View total amount to pay.
- View active loan records.
- Record partial or full payments.
- Automatically marks a loan as paid when paid amount reaches total amount.
- Delete loan records.
- Loan fields include:
  - Person name
  - Contact
  - Direction: to receive or to pay
  - Amount
  - Paid amount
  - Due date
  - Status
  - Payment history
  - Notes

### Analytics

- Shows savings rate.
- Shows average transaction value.
- Shows total transaction count.
- Displays expense breakdown by category.
- Shows a financial health card with:
  - Income stability
  - Budget discipline
  - Debt exposure

### Recurring Transactions Placeholder

- The app includes a recurring transactions page placeholder.
- Current UI explains that recurring transaction API support can be added as a future module.

## UI Features

- Responsive sidebar navigation.
- Mobile menu support.
- Light and dark mode toggle.
- Toast notifications for success and error messages.
- Loading state while data is being fetched.
- Error banner with retry action.
- Empty state cards for modules without data.
- Modal-based forms for creating records.
- Category picker UI for transactions.

## Backend API Features

### Auth Routes

- `POST /api/auth/register`
- `POST /api/auth/login`

### Transaction Routes

- `GET /api/transactions`
- `POST /api/transactions`
- `PUT /api/transactions/:id`
- `DELETE /api/transactions/:id`
- `GET /api/transactions/summary`

### Budget Routes

- `GET /api/budgets`
- `POST /api/budgets`
- `PUT /api/budgets/:id`
- `DELETE /api/budgets/:id`

### Loan Routes

- `GET /api/loans`
- `POST /api/loans`
- `PUT /api/loans/:id`
- `DELETE /api/loans/:id`
- `POST /api/loans/:id/payments`

## Database Models

### User

- Name
- Email
- Password hash
- Password salt

### Transaction

- User ID
- Type
- Amount
- Description
- Category
- Method
- Date
- Notes

### Budget

- User ID
- Name
- Limit
- Spent
- Month
- Color

### Loan

- User ID
- Person
- Contact
- Direction
- Amount
- Paid amount
- Due date
- Status
- Payments
- Notes

## Configuration

Environment variables:

- `PORT`: backend API port.
- `MONGODB_URI`: MongoDB connection string.
- `AUTH_SECRET`: secret key used to sign auth tokens.
- `CLIENT_URL`: frontend URL allowed by CORS.
- `VITE_API_URL`: frontend API base URL.

## Tech Stack

- React
- Vite
- Node.js
- Express
- MongoDB
- Mongoose
- CSS

## Current Limitations And Future Scope

- Recurring transactions are only shown as a placeholder.
- Password reset is not implemented yet.
- Email verification is not implemented yet.
- JWT-style token storage is currently in localStorage.
- More detailed analytics can be added later, such as monthly comparison, export reports, and custom date filters.
