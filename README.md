# EvoSwap - Sustainable Marketplace Platform

EvoSwap is a beautiful, fully-featured marketplace for second-hand goods designed to promote sustainable consumption and reduce waste. Built with modern React technologies and Tailwind CSS, it provides a seamless experience for buying and selling pre-owned items.

## 🌟 Features

### Authentication & User Management
- **Secure Authentication**: Email and password-based login/signup system
- **User Profiles**: Editable profile with personal information management
- **User Dashboard**: Comprehensive dashboard with account statistics and activity

### Product Management
- **Product Listings**: Create, read, update, and delete product listings
- **Rich Product Details**: Title, description, category, price, and image support
- **Category System**: Pre-defined categories for easy organization
- **Image Gallery**: Select from curated high-quality images

### Shopping Experience
- **Advanced Search**: Keyword-based search functionality
- **Smart Filtering**: Filter by categories with real-time results
- **Sorting Options**: Sort by newest, price (low to high), or price (high to low)
- **Grid/List Views**: Toggle between different viewing modes
- **Shopping Cart**: Add, remove, and manage items before purchase
- **Checkout System**: Complete purchase flow with order confirmation

### Purchase History
- **Order Tracking**: Complete purchase history with detailed information
- **Order Statistics**: Summary of total orders, spending, and items purchased
- **Order Details**: View individual order items and status

### Design & UX
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Modern UI**: Clean, professional design with smooth animations
- **Indian Market Focus**: Pricing in Indian Rupees (₹) and local context
- **Accessibility**: Well-structured with proper contrast and navigation

## 🛠️ Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Build Tool**: Vite
- **State Management**: React Context API
- **Data Storage**: Local Storage (for MVP demonstration)
- **Images**: High-quality stock photos from Pexels

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthForm.tsx    # Authentication form component
│   ├── Navbar.tsx      # Navigation bar with search
│   └── ProductCard.tsx # Product display card
├── contexts/           # React Context providers
│   ├── AuthContext.tsx # Authentication state management
│   └── CartContext.tsx # Shopping cart state management
├── data/              # Mock data and constants
│   └── mockProducts.ts # Sample product data
├── pages/             # Main application views
│   ├── AddProduct.tsx  # Product creation form
│   ├── Cart.tsx        # Shopping cart view
│   ├── Home.tsx        # Main product listing page
│   ├── MyListings.tsx  # User's product listings
│   ├── ProductDetail.tsx # Individual product view
│   ├── Purchases.tsx   # Purchase history
│   └── UserDashboard.tsx # User profile management
├── types/             # TypeScript type definitions
│   └── index.ts        # All application types
├── App.tsx            # Main application component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 16 or higher
- **npm**: Comes with Node.js
- **Windows PowerShell**: For Windows users

### Installation & Setup

1. **Clone or Download the Project**
   ```powershell
   # If you have the project files, navigate to the directory
   cd path\to\evoswap-project
   ```

2. **Install Dependencies**
   ```powershell
   npm install
   ```

3. **Start Development Server**
   ```powershell
   npm run dev
   ```

4. **Open in Browser**
   - The application will start on `http://localhost:5173`
   - Open your browser and navigate to this URL

### Available Scripts

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## 🔧 Development Setup on Windows

### Using PowerShell

1. **Open PowerShell as Administrator**
   - Press `Win + X` and select "Windows PowerShell (Admin)"

2. **Navigate to Project Directory**
   ```powershell
   cd "C:\path\to\your\evoswap-project"
   ```

3. **Install Dependencies**
   ```powershell
   npm install
   ```

4. **Start Development**
   ```powershell
   npm run dev
   ```

### Using VS Code

1. **Open VS Code**
2. **Open Terminal** (`Ctrl + `` ` ` `` )
3. **Ensure you're in the project directory**
4. **Run the commands above**

## 📱 Usage Guide

### For First-Time Users

1. **Sign Up**: Create an account with email and username
2. **Browse Products**: Explore the marketplace on the home page
3. **Search & Filter**: Use search bar and category filters to find items
4. **Add to Cart**: Click the cart icon on products you want to buy
5. **Checkout**: Go to cart and complete your purchase

### For Sellers

1. **Add Products**: Click "Sell" button to list new items
2. **manage Listings**: View and edit your products in "My Listings"
3. **Track Performance**: Monitor your listings and sales

### Key Features to Explore

- **Search Functionality**: Try searching for different products
- **Category Filters**: Filter products by categories like Electronics, Clothing, etc.
- **User Dashboard**: Update your profile information
- **Purchase History**: Track all your past purchases
- **Cart Management**: Add/remove items and proceed to checkout

## 🎨 Design Philosophy

EvoSwap follows modern design principles with:

- **Clean Typography**: Readable fonts with proper hierarchy
- **Consistent Spacing**: 8px spacing system throughout
- **Color System**: Emerald primary color (#10B981) with semantic colors
- **Responsive Layout**: Mobile-first approach with breakpoints
- **Micro-interactions**: Subtle animations and hover effects
- **Accessibility**: WCAG compliant contrast ratios and navigation

## 🌍 Indian Market Features

- **Currency**: All prices displayed in Indian Rupees (₹)
- **Categories**: Products suited for Indian market preferences
- **Cultural Context**: UI text and examples relevant to Indian users
- **Local Imagery**: Product images representing common items in India

## 📊 MVP Features Checklist

- ✅ User Authentication (Login/Signup)
- ✅ User Profile Management
- ✅ Product CRUD Operations
- ✅ Product Search and Filtering
- ✅ Shopping Cart Functionality
- ✅ Purchase History
- ✅ Responsive Design
- ✅ Category-based Organization
- ✅ Product Detail Views
- ✅ User Dashboard

## 🔮 Future Enhancements

- **Backend Integration**: Replace local storage with proper database
- **Payment Gateway**: Integrate with Indian payment systems (Razorpay, etc.)
- **Image Upload**: Allow users to upload their own product images
- **Messaging System**: Enable communication between buyers and sellers
- **Reviews & Ratings**: Product and seller rating system
- **Location-based Filtering**: Show products based on user location
- **Wishlist**: Save products for later purchase
- **Push Notifications**: Order updates and new product alerts

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```powershell
   # Kill process on port 5173
   npx kill-port 5173
   # Or use a different port
   npm run dev -- --port 3000
   ```

2. **Module Not Found Errors**
   ```powershell
   # Clear npm cache and reinstall
   npm cache clean --force
   npm install
   ```

3. **PowerShell Execution Policy**
   ```powershell
   # If scripts are blocked, run:
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

## 🤝 Contributing

This is an MVP project created for demonstration purposes. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is created for educational and demonstration purposes.

---

**Built with ❤️ for sustainable commerce in India**

For questions or support, please refer to the documentation or create an issue in the project repository.