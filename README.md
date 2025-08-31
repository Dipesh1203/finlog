# FinLog - Expense Tracker

A full-stack expense tracking application with Spring Boot backend and React Native frontend.

## Architecture

### Backend (Spring Boot)
- **Technology**: Spring Boot 3.3.11, MongoDB, JWT Authentication
- **Features**:
  - User registration and authentication
  - JWT-based security
  - CRUD operations for expenses
  - MongoDB database integration
  - CORS support for mobile app

### Frontend (React Native)
- **Technology**: React Native 0.74.1, TypeScript
- **Features**:
  - User authentication (login/signup)
  - Expense management (create, read, update, delete)
  - Category tagging
  - Responsive mobile UI
  - Offline token storage

## API Endpoints

### Public Endpoints
- `POST /public/user/sign-up` - User registration
- `POST /public/user/login` - User authentication
- `GET /health-check` - Health check

### Protected Endpoints (Require JWT)
- `GET /expense/all` - Get all user expenses
- `POST /expense/create` - Create new expense
- `GET /expense/{id}` - Get expense by ID
- `PUT /expense/{id}` - Update expense
- `DELETE /expense/{id}` - Delete expense
- `GET /user/{id}` - Get user by ID
- `PUT /user/update` - Update current user

## Setup Instructions

### Backend Setup

1. **Prerequisites**:
   - Java 17 or higher
   - Maven 3.6+
   - MongoDB Atlas account (or local MongoDB)

2. **Configuration**:
   - Update `src/main/resources/application.properties` with your MongoDB connection string
   - The app is configured to run on port 8081

3. **Run Backend**:
   ```bash
   ./mvnw spring-boot:run
   ```

4. **Test Backend**:
   ```bash
   curl http://localhost:8081/health-check
   ```

### Frontend Setup

1. **Prerequisites**:
   - Node.js 18+
   - React Native CLI
   - Android Studio (for Android development)
   - Xcode (for iOS development, macOS only)

2. **Configuration**:
   - Update `src/utils/config.ts` with your backend URL
   - For testing on physical device, replace `localhost` with your computer's IP address

3. **Install Dependencies**:
   ```bash
   cd FinlogApp
   npm install
   ```

4. **Run Frontend**:
   ```bash
   # For Android
   npm run android

   # For iOS (macOS only)
   npm run ios
   ```

## Backend Fixes Made

1. **Fixed PUT endpoint**: 
   - Corrected method name from `getExpense` to `updateExpense`
   - Fixed parameter name mismatch (`expenseId` → `id`)
   - Improved HTTP status codes

2. **Added DELETE endpoint**:
   - Secure deletion with user ownership verification
   - Proper cleanup of user expense references

3. **Added CORS configuration**:
   - Enables frontend integration
   - Supports all necessary HTTP methods

4. **Enhanced security**:
   - Added user ownership verification for expense operations
   - Improved error handling and logging

## API Usage Examples

### Register User
```bash
curl -X POST http://localhost:8081/public/user/sign-up \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser",
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:8081/public/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "userName": "testuser",
    "password": "password123"
  }'
```

### Create Expense (with JWT token)
```bash
curl -X POST http://localhost:8081/expense/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "description": "Coffee",
    "amount": 4.50,
    "categories": ["food", "beverages"]
  }'
```

## Frontend Features

- **Authentication**: Secure login and registration
- **Expense Management**: Add, edit, delete, and view expenses
- **Categories**: Tag expenses with custom categories
- **Real-time Updates**: Automatic refresh and updates
- **Responsive Design**: Optimized for mobile devices
- **Offline Storage**: JWT tokens stored securely on device

## Development Notes

- Backend runs on port 8081 to avoid conflicts with React Native Metro bundler (port 8080)
- JWT tokens expire after 1 hour for security
- MongoDB connection string includes credentials (should be moved to environment variables in production)
- Frontend uses TypeScript for better type safety
- CORS is enabled for development (should be restricted in production)

## Production Considerations

1. **Security**:
   - Move database credentials to environment variables
   - Implement refresh token mechanism
   - Add rate limiting
   - Restrict CORS origins

2. **Performance**:
   - Add database indexing
   - Implement pagination for expense lists
   - Add caching layer

3. **Monitoring**:
   - Add logging and monitoring
   - Implement health checks
   - Add error tracking

## Troubleshooting

### Backend Issues
- **MongoDB Connection**: Verify connection string and network access
- **Port Conflicts**: Ensure port 8081 is available
- **JWT Errors**: Check token expiration and secret key

### Frontend Issues
- **Network Errors**: Update API base URL with correct IP address
- **Build Errors**: Ensure all dependencies are installed
- **Android/iOS Setup**: Follow React Native environment setup guide

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the MIT License.