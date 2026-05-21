# CarScout - Frontend Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Features](#features)
4. [Installation & Setup](#installation--setup)
5. [Available Scripts](#available-scripts)
6. [Architecture](#architecture)
7. [Components](#components)
8. [Services](#services)
9. [Hooks](#hooks)
10. [Context & State Management](#context--state-management)
11. [Routing](#routing)
12. [Utilities](#utilities)
13. [Development Guidelines](#development-guidelines)

---

## Project Overview

**CarScout** is a full-stack MERN (MongoDB, Express, React, Node.js) application that provides a comprehensive platform for buying, selling, and managing vehicles. The platform connects buyers and sellers, facilitates negotiations, and provides various services related to vehicle transactions.

### Key Technologies
- **Frontend Framework**: React 18+ with Vite
- **Styling**: CSS
- **Build Tool**: Vite
- **Linting**: ESLint
- **State Management**: React Context API
- **HTTP Client**: Likely Axios or Fetch API
- **Backend**: Node.js/Express (separate)

---

## Project Structure

```
carscout/
├── src/
│   ├── assets/              # Static assets (images, icons, etc.)
│   ├── components/          # Reusable React components
│   │   ├── admin/          # Admin panel components
│   │   ├── buyer/          # Buyer-specific components
│   │   ├── chat/           # Chat functionality components
│   │   ├── common/         # Shared components
│   │   ├── customer/       # Customer components
│   │   ├── notifications/  # Notification components
│   │   ├── payments/       # Payment-related components
│   │   └── seller/         # Seller-specific components
│   ├── config/             # Application configuration
│   ├── constants/          # Application constants
│   ├── context/            # React Context providers
│   ├── hooks/              # Custom React hooks
│   ├── layouts/            # Layout components (Navbar, Sidebar)
│   ├── pages/              # Page components (full page views)
│   │   ├── auth/           # Authentication pages
│   │   ├── buyer/          # Buyer pages
│   │   ├── chat/           # Chat pages
│   │   ├── insurance/      # Insurance pages
│   │   └── seller/         # Seller pages
│   ├── routes/             # Route configuration
│   ├── services/           # API service calls
│   ├── utils/              # Utility functions and helpers
│   ├── App.jsx             # Main App component
│   ├── index.css           # Global styles
│   └── main.jsx            # Entry point
├── public/                 # Public static files
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── package.json            # Project dependencies
├── index.html              # HTML entry point
└── README.md               # Quick start guide
```

---

## Features

### 1. **Authentication & Authorization**
- User signup with OTP verification
- User login
- Password reset functionality
- Role-based access control (Admin, Buyer, Seller, Customer)

### 2. **Admin Panel**
- Dashboard overview
- User management
- Car management
- Inquiry management
- Offer tracking
- Message management
- Test drive scheduling
- Purchase tracking
- Wishlist management
- Review management
- Reporting system
- Settings management

### 3. **Buyer Features**
- Browse available cars
- Filter and search cars
- View car details
- Compare cars
- Make offers on cars
- Chat with sellers
- Manage wishlist/favorites
- View test drive bookings
- Track purchases
- Leave reviews

### 4. **Seller Features**
- List cars for sale
- Manage car listings
- View inquiries
- Receive and manage offers
- Schedule test drives
- View sales history
- Access seller services

### 5. **Common Features**
- User notifications (real-time updates)
- Payment processing
- Messaging system
- Profile management
- Insurance information

---

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation Steps

```bash
# Clone the repository
git clone <repository-url>
cd carscout

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your API endpoints and configuration

# Start development server
npm run dev
```

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=CarScout
# Add other required variables
```

---

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint

# Fix ESLint issues
npm run lint:fix
```

---

## Architecture

### Component Hierarchy

```
App
├── AppRouter
│   ├── Auth Routes (Login, Signup, etc.)
│   ├── Admin Routes (Protected)
│   ├── Buyer Routes (Protected)
│   ├── Seller Routes (Protected)
│   └── Common Routes (Dashboard, Profile, etc.)
└── Global Providers
    ├── NotificationContext
    └── Other Providers
```

### Data Flow

1. **User Interaction** → Component
2. **Component** → Service Call (API)
3. **Service** → Backend API
4. **Response** → Context/State Update
5. **State Update** → Component Re-render

---

## Components

### Admin Components (`components/admin/`)
- **AdminDashboard**: Main admin overview
- **AdminUsers**: User management
- **AdminCars**: Car listing management
- **AdminInquiries**: Inquiry management
- **AdminOffers**: Offer tracking
- **AdminMessages**: Message management
- **AdminTestDrives**: Test drive scheduling
- **AdminPurchases**: Purchase tracking
- **AdminWishlists**: Wishlist management
- **AdminReviews**: Review management
- **AdminReports**: Reporting system
- **AdminRouteGuard**: Route protection component

### Buyer Components (`components/buyer/`)
- **CarCard**: Individual car listing card
- **CarModal**: Car details modal
- **CarDetailsPage**: Full car details view
- **CompareSection**: Car comparison feature
- **CompareInsightsPage**: Comparison insights
- **FilterBar**: Search and filter controls
- **BuyCarPage**: Main buyer page
- **OffersPage**: Offers management
- **FavoriteSection**: Wishlist/favorites

### Common Components (`components/common/`)
- **SplashScreen**: Loading splash screen
- **GlobalCarLoader**: Generic loading state
- **LogoutConfirmModal**: Logout confirmation

### Notification Components (`components/notifications/`)
- **NotificationBell**: Notification indicator
- Bell UI with notification count

---

## Services

Services handle API communication with the backend. Located in `services/`:

### Available Services

- **authService**: Authentication (login, signup, password reset)
- **sellCarApi**: Car listing and management
- **bookingService**: Test drive bookings
- **wishlistService**: Favorite/wishlist management
- **offerService**: Offer management
- **purchaseService**: Purchase tracking
- **profileService**: User profile management
- **notificationService**: Notification management
- **reportService**: Reporting functionality
- **emailService**: Email sending
- **signupOtpService**: OTP verification

### Service Pattern

```javascript
// Example service structure
export const serviceMethod = async (params) => {
  try {
    const response = await apiClient.post('/endpoint', params);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error occurred');
  }
};
```

---

## Hooks

Custom React hooks for reusable logic (`hooks/`):

- **useNotifications**: Access notification context and functions

### Example Usage

```javascript
import { useNotifications } from '@/hooks/useNotifications';

function MyComponent() {
  const { notifications, addNotification } = useNotifications();
  
  return (
    // component JSX
  );
}
```

---

## Context & State Management

### NotificationContext (`context/NotificationContext.jsx`)

Manages global notification state across the application.

**Features:**
- Add notifications
- Remove notifications
- Clear all notifications
- Notification types: success, error, warning, info

**Provider Setup:**
```javascript
<NotificationProvider>
  <App />
</NotificationProvider>
```

**Usage:**
```javascript
const { notifications, addNotification } = useNotifications();

addNotification({
  id: Date.now(),
  type: 'success',
  message: 'Operation successful!',
  duration: 3000
});
```

---

## Routing

### Route Configuration (`routes/AppRouter.jsx`)

The main router that handles all application routes:

**Route Structure:**
- `/auth/*` - Authentication pages (login, signup, OTP, password reset)
- `/admin/*` - Admin panel (protected route)
- `/buyer/*` - Buyer features (protected route)
- `/seller/*` - Seller features (protected route)
- `/dashboard` - User dashboard
- `/profile` - User profile
- `/notifications` - Notifications page
- `/` - Home page

### Route Guards

- **AdminRouteGuard**: Protects admin routes
- Role-based access control checks
- Redirects unauthorized users

---

## Utilities

Utility functions in `utils/`:

- **auth.js**: Authentication utilities (token management, user validation)
- **carImage.js**: Car image handling and optimization
- **carOwnership.js**: Car ownership validation
- **owner.js**: Owner-related utilities
- **mailTemplates.js**: Email template generation
- **signupOtpTemplate.js**: OTP email templates

---

## Configuration

### App Configuration (`config/appConfig.js`)

Contains application-wide configuration:
- API endpoints
- Feature flags
- Default values
- Constants

### Constants (`constants/index.js`)

Application constants:
- Status codes
- User roles
- Car conditions
- Payment statuses
- etc.

---

## Development Guidelines

### Code Style
- Follow ESLint configuration
- Use functional components with hooks
- Use camelCase for variables and functions
- Use PascalCase for components
- Meaningful component and function names

### Component Best Practices

```javascript
// Good
function UserProfile() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    loadUserData();
  }, []);
  
  return <div>...</div>;
}

// Structure
- Import statements
- Component function
- Hooks (useState, useEffect, etc.)
- Event handlers
- Return JSX
```

### API Calls
- Use service layer for all API calls
- Handle errors appropriately
- Show loading states
- Validate responses

### Naming Conventions
```
Components:      UserProfile.jsx, CarCard.jsx
Pages:           CarDetailsPage.jsx
Services:        userService.js
Hooks:           useAuth.js
Utilities:       formatDate.js
Context:         AuthContext.jsx
Constants:       ROLES.js
```

### Directory Organization
- Keep related components together
- Place shared components in `common/`
- Use `index.js` for barrel exports in component directories
- Separate pages from components

---

## Debugging Tips

1. **Check Console**: Browser console for errors
2. **React DevTools**: Install React DevTools extension
3. **Network Tab**: Verify API calls and responses
4. **Context DevTools**: Track context changes
5. **Component Profiler**: Check performance issues

---

## Common Issues & Solutions

### Issue: API calls failing
**Solution:** 
- Check `.env` configuration
- Verify backend is running
- Check browser network tab for actual requests

### Issue: Routes not loading
**Solution:**
- Verify route configuration in `AppRouter.jsx`
- Check route guards and permissions
- Ensure components are properly imported

### Issue: Notifications not showing
**Solution:**
- Ensure NotificationProvider wraps your app
- Check notification context implementation
- Verify hook usage

---

## Performance Optimization

### Best Practices
1. Use React.memo for expensive components
2. Implement code splitting for routes
3. Optimize images in `assets/`
4. Use lazy loading for components
5. Avoid unnecessary re-renders

### Build Optimization
```bash
# Build with optimizations
npm run build

# Check bundle size
# Analyze with tools like webpack-bundle-analyzer
```

---

## Deployment

### Production Build
```bash
npm run build
```

### Deployment Checklist
- [ ] Environment variables configured
- [ ] Backend API endpoints updated
- [ ] Build completes without errors
- [ ] All features tested
- [ ] Performance optimized
- [ ] Security headers configured

---

## Additional Resources

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev)
- [ESLint Configuration](https://eslint.org)
- [Backend API Documentation](#) - Link to backend docs

---

## Support & Contributing

For issues or contributions:
1. Create a GitHub issue
2. Fork the repository
3. Create a feature branch
4. Submit a pull request

---

## License

[Add your license information here]

---

**Last Updated:** May 18, 2026  
**Version:** 1.0.0
