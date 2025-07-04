# 💳 Subscription Tracker API

[![Node.js](https://img.shields.io/badge/Node.js-v14%2B-green.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-4.x-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Authentication-orange.svg)](https://jwt.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

A comprehensive and secure Node.js REST API for tracking and managing subscriptions with advanced features including user authentication, automated workflows, email notifications, and enterprise-grade security.

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#️-tech-stack)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Configuration](#️-configuration)
- [API Documentation](#-api-documentation)
- [Data Models](#-data-models)
- [Security](#-security-features)
- [Automated Features](#-automated-features)
- [Project Structure](#-project-structure)
- [Development](#️-development)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

## 🌟 Overview

The Subscription Tracker API is a production-ready solution for managing recurring subscriptions. It provides a complete backend infrastructure for applications that need to track user subscriptions, handle automated renewals, send notifications, and maintain secure user authentication.

Perfect for:
- SaaS applications with subscription models
- Personal finance management apps
- Subscription tracking services
- E-commerce platforms with recurring billing

## 🚀 Features

### Core Functionality
- 🔐 **Secure Authentication** - JWT-based user authentication with bcrypt password hashing
- 📊 **Subscription Management** - Full CRUD operations for subscription tracking
- 🔄 **Automated Workflows** - Background tasks for renewals and notifications
- 📧 **Email Notifications** - Automated alerts for subscription events
- 🛡️ **Enterprise Security** - Rate limiting and request protection with Arcjet
- ✅ **Data Validation** - Comprehensive input validation and sanitization
- 🌐 **RESTful Design** - Clean, intuitive API endpoints following REST principles

### Advanced Features
- 📅 **Smart Renewal Tracking** - Automatic calculation of renewal dates
- 💰 **Multi-Currency Support** - USD, EUR, GBP currency handling
- 📈 **Subscription Analytics** - Track subscription metrics and trends
- 🚨 **Proactive Alerts** - Upcoming renewal notifications
- 🔄 **Status Management** - Active, cancelled, and expired subscription states
- 📱 **API-First Design** - Ready for web and mobile integration

## 🛠️ Tech Stack

| Category | Technology | Version | Purpose |
|----------|------------|---------|---------|
| **Runtime** | Node.js | 14+ | JavaScript runtime environment |
| **Framework** | Express.js | 4.x | Web application framework |
| **Database** | MongoDB | Latest | NoSQL document database |
| **ODM** | Mongoose | Latest | MongoDB object modeling |
| **Authentication** | JWT | Latest | Secure token-based auth |
| **Security** | Arcjet | Latest | Rate limiting & protection |
| **Email** | Nodemailer | Latest | Email service integration |
| **Workflows** | Upstash | Latest | Background task processing |
| **Development** | Nodemon | Latest | Development hot reloading |
| **Validation** | Mongoose | Built-in | Data validation & sanitization |

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/subscription-tracker-api.git
cd subscription-tracker-api

# Install dependencies
npm install

# Set up environment variables (see Configuration section)
cp config/.env.example config/.env.development.local

# Start development server
npm run dev

# API will be available at http://localhost:7000
```

## 📦 Installation

### Prerequisites

Ensure you have the following installed:

- **Node.js** (version 14.0.0 or higher)
- **npm** (version 6.0.0 or higher)
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** (for cloning the repository)

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/subscription-tracker-api.git
   cd subscription-tracker-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Verify Installation**
   ```bash
   npm list --depth=0
   ```

## ⚙️ Configuration

### Environment Setup

Create environment configuration files in the `config/` directory:

#### Development Environment
Create `config/.env.development.local`:

```env
# Server Configuration
PORT=7000
NODE_ENV=development
SERVER_URL=http://localhost:7000

# Database Configuration
DB_URI=mongodb://localhost:27017/subscription-tracker
# Or for MongoDB Atlas:
# DB_URI=mongodb+srv://username:password@cluster.mongodb.net/subscription-tracker

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=365d

# Security (Arcjet)
ARCJET_KEY=your-arcjet-api-key
ARCJET_ENV=development

# Queue Service (Upstash QStash)
QSTASH_URL=https://qstash.upstash.io
QSTASH_TOKEN=your-qstash-token
QSTASH_CURRENT_SIGNING_KEY=your-current-signing-key
QSTASH_NEXT_SIGNING_KEY=your-next-signing-key

# Email Configuration (Example with Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@yourapp.com
```

#### Production Environment
Create `config/.env.production.local` with production values.

### Configuration Files

| File | Purpose |
|------|---------|
| `config/env.js` | Environment variable loading and validation |
| `config/arcjet.js` | Security middleware configuration |
| `config/nodemailer.js` | Email service setup |
| `config/Qtash.js` | Background task queue configuration |

### Starting the Application

```bash
# Development mode (with hot reloading)
npm run dev

# Production mode
npm start
```

## 📖 API Documentation

### Base URL
```
http://localhost:7000/api/v1
```

### Authentication Flow

#### User Registration
```http
POST /api/v1/auth/sign-up
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "64a7b8c9d1e2f3a4b5c6d7e8",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### User Login
```http
POST /api/v1/auth/sign-in
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

#### User Logout
```http
POST /api/v1/auth/sign-out
Authorization: Bearer <your-jwt-token>
```

### Subscription Management

#### Get All Subscriptions
```http
GET /api/v1/subscription/
Authorization: Bearer <your-jwt-token>
```

#### Create New Subscription
```http
POST /api/v1/subscription/
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Netflix Premium",
  "price": 15.99,
  "currency": "USD",
  "frequency": "monthly",
  "category": "entertainment",
  "paymentMethod": "Credit Card",
  "startDate": "2024-01-01"
}
```

#### Update Subscription
```http
PUT /api/v1/subscription/:id
Authorization: Bearer <your-jwt-token>
Content-Type: application/json

{
  "name": "Netflix Premium Updated",
  "price": 17.99
}
```

#### Cancel Subscription
```http
PUT /api/v1/subscription/:id/cancel
Authorization: Bearer <your-jwt-token>
```

#### Get User's Subscriptions
```http
GET /api/v1/subscription/user/:userId
Authorization: Bearer <your-jwt-token>
```

#### Get Upcoming Renewals
```http
GET /api/v1/subscription/upcoming-renewals
Authorization: Bearer <your-jwt-token>
```

### API Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { /* response data */ },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req-123456"
  }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "error": {
    "code": "VALIDATION_ERROR",
    "details": ["Field 'email' is required"]
  },
  "meta": {
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req-123456"
  }
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| 200 | OK - Request successful |
| 201 | Created - Resource created successfully |
| 400 | Bad Request - Invalid input data |
| 401 | Unauthorized - Authentication required |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource not found |
| 409 | Conflict - Resource already exists |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error - Server error |

## 📊 Data Models

### User Schema

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Subscription Schema

```javascript
{
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  price: {
    type: Number,
    required: true,
    min: 0.01,
    validate: {
      validator: function(v) { return v > 0; },
      message: 'Price must be greater than 0'
    }
  },
  currency: {
    type: String,
    enum: ['USD', 'EUR', 'GBP'],
    default: 'USD'
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  category: {
    type: String,
    enum: ['sports', 'news', 'technology', 'entertainment', 'productivity', 'health', 'education', 'other'],
    default: 'other'
  },
  paymentMethod: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['active', 'cancelled', 'expired', 'paused'],
    default: 'active'
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(v) { return v <= new Date(); },
      message: 'Start date cannot be in the future'
    }
  },
  renewalDate: {
    type: Date,
    required: true
  },
  nextBillingAmount: Number,
  description: {
    type: String,
    maxlength: 500
  },
  tags: [String],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### Validation Rules

#### User Validation
- **Name**: 2-50 characters, required
- **Email**: Valid email format, unique, required
- **Password**: Minimum 6 characters, required

#### Subscription Validation
- **Name**: 2-50 characters, required
- **Price**: Positive number, required
- **Currency**: USD, EUR, or GBP
- **Frequency**: daily, weekly, monthly, or yearly
- **Start Date**: Cannot be in the future
- **User**: Valid user reference, required

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens** - Secure, stateless authentication
- **Password Hashing** - bcrypt with salt rounds
- **Token Expiration** - Configurable token lifetime
- **Role-Based Access** - User and admin roles

### Request Protection
- **Rate Limiting** - Arcjet-powered request throttling
- **Input Validation** - Mongoose schema validation
- **SQL Injection Prevention** - NoSQL injection protection
- **CORS Configuration** - Cross-origin request handling
- **Helmet Integration** - Security headers

### Security Middleware
```javascript
// Example Arcjet configuration
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    rateLimit({
      mode: "LIVE",
      characteristics: ["ip.src"],
      window: "1m",
      max: 100
    }),
    shield({
      mode: "LIVE"
    })
  ]
});
```

## 🤖 Automated Features

### Background Workflows
- **Renewal Processing** - Automatic subscription renewals
- **Payment Reminders** - Email notifications before renewals
- **Status Updates** - Automatic expiration handling
- **Analytics Collection** - Usage and billing metrics

### Email Notifications

#### Notification Types
- Welcome emails for new users
- Subscription creation confirmations
- Renewal reminders (7 days, 1 day before)
- Payment confirmations
- Cancellation confirmations
- Expiration notices

#### Email Templates
```javascript
// Example email template structure
const renewalReminderTemplate = {
  subject: 'Your {{subscriptionName}} subscription renews soon',
  html: `
    <h2>Renewal Reminder</h2>
    <p>Your {{subscriptionName}} subscription will renew on {{renewalDate}}</p>
    <p>Amount: {{currency}}{{amount}}</p>
    <a href="{{manageUrl}}">Manage Subscription</a>
  `
};
```

### Workflow Configuration
```javascript
// Upstash QStash workflow example
const scheduleRenewalReminder = async (subscription) => {
  await qstash.publishJSON({
    url: `${process.env.SERVER_URL}/api/v1/workflow/renewal-reminder`,
    delay: calculateDelayUntilReminder(subscription.renewalDate),
    body: {
      subscriptionId: subscription._id,
      type: 'renewal_reminder'
    }
  });
};
```

## 📁 Project Structure

```
subscription-tracker-api/
├── 📄 app.js                          # Main Express application
├── 📄 package.json                    # Dependencies and scripts
├── 📄 package-lock.json               # Dependency lock file
├── 📄 README.md                       # Project documentation
├── 📄 .gitignore                      # Git ignore rules
├── 📄 .env.example                    # Environment variables template
├── 📁 bin/
│   └── 📄 www                         # Server startup script
├── 📁 config/
│   ├── 📄 env.js                      # Environment configuration
│   ├── 📄 arcjet.js                   # Security middleware config
│   ├── 📄 nodemailer.js               # Email service configuration
│   ├── 📄 Qtash.js                    # Background task queue config
│   ├── 📄 .env.development.local      # Development environment
│   └── 📄 .env.production.local       # Production environment
├── 📁 controllers/
│   ├── 📄 auth.controller.js          # Authentication logic
│   ├── 📄 subscription.controller.js  # Subscription CRUD operations
│   ├── 📄 user.controller.js          # User management
│   └── 📄 workflow.controller.js      # Background task handlers
├── 📁 Database/
│   └── 📄 mongodb.js                  # Database connection setup
├── 📁 middlewares/
│   ├── 📄 arcjet.middleware.js        # Security middleware
│   ├── 📄 auth.middleware.js          # Authentication middleware
│   ├── 📄 error.middleware.js         # Global error handling
│   └── 📄 validation.middleware.js    # Input validation
├── 📁 models/
│   ├── 📄 subscription.model.js       # Subscription schema
│   ├── 📄 user.model.js               # User schema
│   └── 📄 index.js                    # Model exports
├── 📁 routes/
│   ├── 📄 auth.routes.js              # Authentication endpoints
│   ├── 📄 subscription.routes.js      # Subscription endpoints
│   ├── 📄 user.routes.js              # User management endpoints
│   ├── 📄 workflow.routes.js          # Workflow endpoints
│   └── 📄 index.js                    # Route aggregation
├── 📁 utils/
│   ├── 📄 email-template.js           # HTML email templates
│   ├── 📄 send-email.js               # Email sending utility
│   ├── 📄 date-calculator.js          # Date manipulation helpers
│   ├── 📄 response.js                 # Standardized API responses
│   └── 📄 validators.js               # Custom validation functions
├── 📁 public/
│   ├── 📄 index.html                  # API documentation homepage
│   ├── 📁 images/                     # Static images
│   ├── 📁 javascripts/                # Client-side scripts
│   └── 📁 stylesheets/                # CSS files
├── 📁 tests/
│   ├── 📄 auth.test.js                # Authentication tests
│   ├── 📄 subscription.test.js        # Subscription tests
│   └── 📄 setup.js                    # Test configuration
└── 📁 docs/
    ├── 📄 API.md                      # API documentation
    ├── 📄 DEPLOYMENT.md               # Deployment guide
    └── 📄 CONTRIBUTING.md             # Contribution guidelines
```

## 🛠️ Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start production server |
| `npm run dev` | Start development server with hot reload |
| `npm test` | Run test suite |
| `npm run test:watch` | Run tests in watch mode |
| `npm run lint` | Run ESLint for code quality |
| `npm run lint:fix` | Fix ESLint issues automatically |
| `npm run build` | Build for production |
| `npm run docs` | Generate API documentation |

### Development Setup

1. **Install Development Dependencies**
   ```bash
   npm install --save-dev jest supertest eslint prettier nodemon
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Code Quality Tools**
   ```bash
   # Run linting
   npm run lint
   
   # Fix linting issues
   npm run lint:fix
   
   # Format code
   npm run format
   ```

### Code Style Guidelines

- **ES6+ Features** - Use modern JavaScript syntax
- **Async/Await** - Prefer async/await over promises
- **Error Handling** - Comprehensive try-catch blocks
- **Consistent Naming** - camelCase for variables, PascalCase for classes
- **Comments** - Document complex logic and API endpoints

### Development Workflow

1. **Feature Development**
   ```bash
   git checkout -b feature/subscription-analytics
   # Make changes
   npm run lint
   npm test
   git commit -m "feat: add subscription analytics endpoint"
   ```

2. **Code Review Process**
   - Create pull request
   - Automated tests must pass
   - Code review by team member
   - Merge after approval

## 🧪 Testing

### Test Structure
```
tests/
├── unit/
│   ├── models/
│   ├── controllers/
│   └── utils/
├── integration/
│   ├── auth.test.js
│   └── subscription.test.js
└── e2e/
    └── api.test.js
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- auth.test.js

# Run tests in watch mode
npm run test:watch
```

### Example Test

```javascript
// tests/integration/auth.test.js
const request = require('supertest');
const app = require('../../app');

describe('Authentication', () => {
  describe('POST /api/v1/auth/sign-up', () => {
    it('should register a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };
      
      const response = await request(app)
        .post('/api/v1/auth/sign-up')
        .send(userData)
        .expect(201);
        
      expect(response.body.success).toBe(true);
      expect(response.body.data.user.email).toBe(userData.email);
    });
  });
});
```

## 🚀 Deployment

### Environment Preparation

1. **Production Environment Variables**
   ```env
   NODE_ENV=production
   PORT=80
   DB_URI=mongodb+srv://prod-user:password@cluster.mongodb.net/subscription-tracker
   JWT_SECRET=super-secure-production-secret
   ```

2. **Database Setup**
   - Configure MongoDB Atlas or production database
   - Set up database indexes for performance
   - Configure backup and monitoring

### Deployment Options

#### 1. **Heroku Deployment**
```bash
# Install Heroku CLI
npm install -g heroku

# Login and create app
heroku login
heroku create subscription-tracker-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set DB_URI=your-mongodb-uri
heroku config:set JWT_SECRET=your-jwt-secret

# Deploy
git push heroku main
```

#### 2. **Docker Deployment**
```dockerfile
# Dockerfile
FROM node:16-alpine

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
EXPOSE 7000

CMD ["npm", "start"]
```

```bash
# Build and run
docker build -t subscription-tracker-api .
docker run -p 7000:7000 --env-file .env subscription-tracker-api
```

#### 3. **AWS/Digital Ocean/Google Cloud**
- Use PM2 for process management
- Set up Nginx reverse proxy
- Configure SSL certificates with Let's Encrypt
- Set up monitoring and logging

### Production Checklist

- [ ] Environment variables configured
- [ ] Database connection secured
- [ ] SSL certificates installed
- [ ] Monitoring and logging enabled
- [ ] Error tracking configured (Sentry)
- [ ] Performance monitoring (New Relic)
- [ ] Backup strategy implemented
- [ ] Security headers configured
- [ ] Rate limiting enabled
- [ ] Health check endpoints working

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Run tests and linting**
   ```bash
   npm test
   npm run lint
   ```
6. **Commit your changes**
   ```bash
   git commit -m 'feat: add amazing feature'
   ```
7. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
8. **Open a Pull Request**

### Development Standards

- **Code Quality** - ESLint and Prettier configured
- **Testing** - Minimum 80% test coverage required
- **Documentation** - Update docs for API changes
- **Security** - Follow OWASP security practices
- **Performance** - Consider performance impact of changes

## 📋 Roadmap

### Current Version (v1.0.0)
- ✅ User authentication and authorization
- ✅ CRUD operations for subscriptions
- ✅ Email notifications
- ✅ Background workflows
- ✅ Security middleware

### Upcoming Features (v1.1.0)
- [ ] **Subscription Analytics Dashboard**
- [ ] **Export/Import Functionality**
- [ ] **Webhook Support**
- [ ] **Multi-tenant Architecture**
- [ ] **Advanced Reporting**

### Future Enhancements (v2.0.0)
- [ ] **GraphQL API Support**
- [ ] **Real-time Notifications (WebSockets)**
- [ ] **Mobile Push Notifications**
- [ ] **Integration with Payment Gateways**
- [ ] **Machine Learning for Spending Predictions**
- [ ] **Multi-language Support**
- [ ] **Advanced User Roles and Permissions**

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

```
MIT License

Copyright (c) 2024 Subscription Tracker API

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

## 📞 Support

### Get Help

- 📧 **Email**: support@subscription-tracker.com
- 💬 **GitHub Discussions**: [Ask questions](https://github.com/yourusername/subscription-tracker-api/discussions)
- 🐛 **Issues**: [Report bugs](https://github.com/yourusername/subscription-tracker-api/issues)
- 📖 **Documentation**: [Wiki](https://github.com/yourusername/subscription-tracker-api/wiki)
- 💼 **Enterprise Support**: enterprise@subscription-tracker.com

### Community

- ⭐ **Star** this repository if you find it helpful
- 🔄 **Share** with fellow developers
- 🤝 **Contribute** to make it better
- 📱 **Follow** for updates

### Troubleshooting

#### Common Issues

1. **Database Connection Error**
   ```bash
   # Check MongoDB connection
   mongodb://localhost:27017/subscription-tracker
   
   # Verify network connectivity
   telnet localhost 27017
   ```

2. **Authentication Issues**
   ```bash
   # Verify JWT secret is set
   echo $JWT_SECRET
   
   # Check token expiration
   jwt-cli decode <your-token>
   ```

3. **Email Not Sending**
   ```bash
   # Test SMTP connection
   telnet smtp.gmail.com 587
   
   # Verify credentials
   npm run test:email
   ```

4. **Rate Limiting Issues**
   ```javascript
   // Check Arcjet configuration
   console.log(process.env.ARCJET_KEY);
   ```

---

<div align="center">

**Built with ❤️ for efficient subscription management**

[🌐 Live Demo](https://subscription-tracker-api.herokuapp.com) • [📚 API Docs](https://docs.subscription-tracker.com) • [🚀 Status](https://status.subscription-tracker.com)

**Made by developers, for developers who care about recurring revenue**

</div>

---

### ⭐ Show Your Support

Give a ⭐️ if this project helped you manage subscriptions better!

### 📊 Repository Stats

![GitHub stars](https://img.shields.io/github/stars/yourusername/subscription-tracker-api?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/subscription-tracker-api?style=social)
![GitHub issues](https://img.shields.io/github/issues/yourusername/subscription-tracker-api)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/subscription-tracker-api)
![Contributors](https://img.shields.io/github/contributors/yourusername/subscription-tracker-api)
