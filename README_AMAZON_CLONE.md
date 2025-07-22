# Amazon Clone - E-commerce Website

A fully responsive Amazon clone built with React, TypeScript, and Tailwind CSS. This modern e-commerce website replicates the core features and design of Amazon.com.

## 🚀 Features

### Homepage
- **Hero Carousel**: Auto-rotating banner with promotional content
- **Product Categories**: Interactive category grid with hover effects  
- **Today's Deals**: Dynamic deals section with countdown timers and progress bars
- **Featured Products**: Product grid with ratings, pricing, and Prime badges
- **Best Sellers**: Additional product showcase section

### Product Management
- **Product Cards**: Detailed product information with images, ratings, pricing
- **Product Detail Page**: Full product view with image gallery, specifications, and purchase options
- **Shopping Cart**: Add/remove items, quantity management, order summary
- **Wishlist Support**: Save items for later functionality

### User Interface
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Amazon-like Header**: Search functionality, navigation, account menu, cart icon
- **Footer**: Comprehensive footer with links and company information
- **Prime Integration**: Prime delivery badges and benefits highlighting

### Navigation & Routing
- **Multi-page Application**: Home, product details, cart, and category pages
- **URL Routing**: Clean URLs with proper navigation
- **Mobile Menu**: Collapsible navigation for mobile devices

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Custom Components
- **Routing**: Wouter (lightweight React router)
- **Icons**: Lucide React
- **UI Components**: Radix UI primitives
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Project Structure

```
client/src/
├── components/
│   ├── layout/
│   │   ├── Header.tsx        # Main navigation header
│   │   └── Footer.tsx        # Site footer
│   ├── product/
│   │   └── ProductCard.tsx   # Individual product display
│   ├── home/
│   │   ├── HeroCarousel.tsx  # Homepage banner carousel
│   │   ├── CategoryCard.tsx  # Category display cards
│   │   └── DealsSection.tsx  # Today's deals section
│   └── ui/                   # Reusable UI components
├── pages/
│   ├── home.tsx             # Homepage
│   ├── cart.tsx             # Shopping cart page
│   ├── product-detail.tsx   # Product detail page
│   └── not-found.tsx        # 404 page
└── App.tsx                  # Main app component with routing
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Modern web browser

### Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run dev-fullstack` - Start with backend (requires database)

## 🎨 Design Features

### Visual Elements
- **Color Scheme**: Amazon's signature orange/yellow accents with gray/black base
- **Typography**: Clean, readable fonts with proper hierarchy
- **Spacing**: Consistent padding and margins throughout
- **Shadows**: Subtle shadows for depth and card separation

### Interactive Elements
- **Hover Effects**: Product cards and buttons with smooth transitions
- **Loading States**: Skeleton screens and loading indicators
- **Responsive Grid**: Adaptive layouts for different screen sizes
- **Smooth Animations**: CSS transitions for enhanced user experience

### Accessibility
- **Semantic HTML**: Proper heading structure and landmarks
- **Alt Text**: Descriptive alt text for all images
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant color combinations

## 📱 Responsive Design

- **Mobile**: Optimized for phones (320px+)
- **Tablet**: Enhanced layout for tablets (768px+)
- **Desktop**: Full-featured layout for large screens (1024px+)
- **Large Screens**: Maximized for ultra-wide displays (1280px+)

## 🛍️ Mock Data

The application includes realistic mock data for:
- **Products**: Electronics, fashion, home goods, etc.
- **Categories**: Major shopping categories
- **Deals**: Time-limited offers with progress tracking
- **Reviews**: Customer ratings and review counts
- **Pricing**: Original prices, sale prices, and discounts

## 🔧 Customization

### Adding New Products
Update the mock data arrays in the respective page files to add new products, categories, or deals.

### Styling Changes
Modify the Tailwind classes in components or add custom CSS in `index.css`.

### New Pages
Add new route components in `pages/` and update the routing in `App.tsx`.

## 🌐 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

This project is for educational and demonstration purposes only. Amazon and related trademarks are the property of Amazon.com, Inc.

## 🙏 Acknowledgments

- Design inspiration from Amazon.com
- Images from Unsplash
- Icons from Lucide React
- UI components from Radix UI