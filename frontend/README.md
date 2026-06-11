# KhataFlow

Full-stack money tracker built with React, Node.js, Express, and MongoDB.

## Frontend structure

- `src/components` contains reusable layout, forms, and feature UI.
- `src/pages` contains focused application pages.
- `src/hooks/useFinanceData.js` owns API loading, state, errors, and CRUD actions.
- `src/api.js` is the single backend HTTP client.

## Setup

1. Copy `.env.example` to `.env`.
2. Set `MONGODB_URI` to a local MongoDB or MongoDB Atlas connection string.
3. Set `AUTH_SECRET` to a long random string so login tokens stay private.
4. Seed the database:

```bash
npm run seed
```

5. Start the React frontend and Express API:

```bash
npm run dev
```

The frontend runs at `http://localhost:5173` and the API at `http://localhost:5000`.

Set `VITE_API_URL` when the frontend and backend are deployed on different domains.

## API

- `GET/POST /api/transactions`
- `PUT/DELETE /api/transactions/:id`
- `GET /api/transactions/summary`
- `GET/POST /api/budgets`
- `PUT/DELETE /api/budgets/:id`
- `GET/POST /api/loans`
- `PUT/DELETE /api/loans/:id`
- `POST /api/loans/:id/payments`

Register or login with `/api/auth/register` and `/api/auth/login`. Every protected API request is scoped to the logged-in user from the `Authorization: Bearer <token>` header.
