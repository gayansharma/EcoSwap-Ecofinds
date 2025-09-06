# EcoFinds - Sustainable Second-Hand Marketplace

A comprehensive web application that empowers sustainable consumption through a trusted second-hand marketplace platform. Built with React, TypeScript, and Tailwind CSS.

## 🌱 Project Overview

EcoFinds is designed to revolutionize how people buy and sell pre-owned goods by creating a vibrant, trusted platform that extends the lifecycle of products, reduces waste, and provides an accessible alternative to purchasing new items. The platform fosters a culture of sustainability while connecting conscious consumers in a thriving community.

## ✨ Features

### Core Functionality
- **User Authentication**: Secure registration and login system with email/password
- **Profile Management**: Comprehensive user dashboard with editable profile information
- **Product Listing Management**: Full CRUD operations for product listings
- **Advanced Browse & Search**: Category filtering and keyword search capabilities
- **Shopping Cart**: Add/remove items with quantity management
- **Purchase History**: Track all previous purchases with environmental impact metrics
- **Product Detail Views**: Comprehensive product information display

### User Experience
- **Responsive Design**: Optimized for mobile, tablet, and desktop devices
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Instant feedback for all user actions
- **Image Management**: Support for product images with suggested stock photos

### Environmental Focus
- **Sustainability Metrics**: Track environmental impact of purchases
- **Eco-friendly Design**: Green color palette emphasizing environmental consciousness
- **Waste Reduction**: Emphasis on extending product lifecycles

## 🛠 Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and optimized builds
- **State Management**: React Context API
- **Data Storage**: LocalStorage for persistence (demo purposes)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Navigation header with cart indicator
│   ├── ProductCard.tsx # Product display card with actions
│   └── LoadingSpinner.tsx # Loading state component
├── pages/              # Main application pages
│   ├── AuthPage.tsx    # Login/registration page
│   ├── HomePage.tsx    # Product browsing and search
│   ├── AddProductPage.tsx # Create/edit product listings
│   ├── MyListingsPage.tsx # Manage user's listings
│   ├── ProductDetailPage.tsx # Detailed product view
│   ├── CartPage.tsx    # Shopping cart management
│   ├── PurchasesPage.tsx # Purchase history
│   └── DashboardPage.tsx # User profile management
├── context/            # Global state management
│   ├── AuthContext.tsx # Authentication state
│   └── AppContext.tsx  # Application state (products, cart, purchases)
├── types/              # TypeScript type definitions
│   └── index.ts        # All application types
├── data/               # Mock data and constants
│   └── mockData.ts     # Sample users, products, and categories
└── App.tsx             # Main application component
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository** (if applicable) or use the existing project structure

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to the provided local development URL (typically `http://localhost:5173`)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🎯 Usage Guide

### Getting Started
1. **Registration**: Create a new account with email, password, and username
2. **Demo Login**: Use the provided demo credentials (email: john@example.com, password: password)

### Browsing Products
- Browse all available items on the homepage
- Use the search bar to find specific items
- Filter by categories using the dropdown menu
- Click "View" to see detailed product information

### Listing Items
1. Click the "Add New Listing" button
2. Fill in product details (title, description, category, price)
3. Add an image URL or choose from suggested stock photos
4. Submit to create your listing

### Managing Listings
- Navigate to "My Listings" to see your products
- Edit or delete listings using the action buttons
- View listing statistics and status

### Shopping
1. Add items to cart from product cards or detail pages
2. View cart by clicking the cart icon in the header
3. Review items and proceed to checkout
4. Completed purchases appear in your purchase history

### Profile Management
- Access the dashboard via the profile icon
- Edit personal information including name, phone, and location
- Choose from suggested profile pictures
- View account statistics

## 🎨 Design System

### Color Palette
- **Primary Green**: #10B981 (emerald-500) - Main brand color
- **Secondary Blue**: #3B82F6 (blue-500) - Secondary actions
- **Accent Orange**: #F59E0B (orange-500) - Call-to-action elements
- **Success**: Green tones for positive actions
- **Warning**: Orange tones for caution
- **Error**: Red tones for errors

### Typography
- **Headings**: Font weights 600-800 for hierarchy
- **Body Text**: Regular weight with 150% line height
- **Small Text**: Used for metadata and helper text

### Components
- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Rounded with hover states and transitions
- **Forms**: Clean inputs with focus states
- **Navigation**: Sticky header with mobile-responsive menu

## 💾 Data Management

### Local Storage
The application uses localStorage for data persistence:
- `ecofinds_user` - Current user information
- `ecofinds_cart_{userId}` - User-specific cart items
- `ecofinds_purchases_{userId}` - User-specific purchase history

### Mock Data
Initial data includes:
- Sample product listings across various categories
- Demo user account for testing
- Predefined categories for filtering

## 🌍 Environmental Impact

EcoFinds tracks and displays environmental benefits:
- **Items Saved**: Count of products given second life
- **CO2 Reduction**: Estimated carbon footprint savings
- **Resource Conservation**: Percentage of resources saved through reuse

## 🔧 Customization

### Adding New Categories
Edit `src/data/mockData.ts` to add new product categories:
```typescript
export const categories = [
  'All Categories',
  'Your New Category',
  // ... existing categories
];
```

### Styling Modifications
The application uses Tailwind CSS. Modify styles by:
1. Editing utility classes in components
2. Extending the Tailwind config in `tailwind.config.js`
3. Adding custom CSS in `src/index.css`

### Feature Extensions
The modular architecture allows easy feature additions:
- Add new pages in `src/pages/`
- Create reusable components in `src/components/`
- Extend types in `src/types/index.ts`
- Add context providers for new global state

## 🚀 Production Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
The built application can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static file hosting service

### Environment Variables
For production deployment, consider implementing:
- API endpoints for data persistence
- Authentication services
- Image upload services
- Payment processing

## 🤝 Contributing

This project follows standard React development practices:
1. Use TypeScript for type safety
2. Follow the existing component structure
3. Maintain responsive design principles
4. Add proper error handling
5. Include loading states for async operations

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔒 Security Considerations

For production use, implement:
- Secure authentication with JWT tokens
- Input validation and sanitization
- HTTPS enforcement
- Content Security Policy headers
- Rate limiting for API endpoints

---

**EcoFinds** - Empowering sustainable consumption through trusted second-hand marketplace technology. Built with modern web technologies for a seamless, eco-conscious shopping experience.