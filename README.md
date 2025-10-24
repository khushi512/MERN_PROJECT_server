# DesignHire API

A Node.js/Express API for the DesignHire application.

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DB_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=8001
```

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The server will run on `http://localhost:8001`

## Production Deployment on Render

1. Push your code to a Git repository
2. Connect your repository to Render
3. Set the following environment variables in Render:
   - `DB_URL`: Your MongoDB connection string
   - `JWT_SECRET`: A secure JWT secret key
   - `FRONTEND_URL`: Your frontend URL
   - `NODE_ENV`: production

4. Render will automatically detect the `render.yaml` configuration and deploy your service

## API Endpoints

- `GET /` - API status
- `GET /health` - Health check endpoint
- `POST /api/auth/*` - Authentication routes
- `GET /api/user/*` - User management routes
- `GET /api/job/*` - Job management routes

## Health Check

The API includes a health check endpoint at `/health` that returns:
- Status: OK
- Timestamp
- Uptime

This endpoint is used by Render for monitoring service health.