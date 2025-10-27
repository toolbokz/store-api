# Store API Product Browser

A full-featured product browsing interface with real-time filtering, sorting, and pagination capabilities. This application provides a modern, responsive way to browse and filter through a product catalog.

## 🌟 Features

- **Dynamic Product Display**: Real-time product card rendering with images and detailed information
- **Advanced Filtering**:
  - Search products by name
  - Filter by company/manufacturer
  - Sort by various criteria (newest, price, name)
  - Filter for free shipping items
- **Smart Pagination**: Handle large product sets with intuitive page navigation
- **Responsive Design**: Works seamlessly on different screen sizes
- **Real-time Updates**: Instant feedback as users apply filters
- **Error Handling**: Graceful handling of network issues and empty states

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB installed and running
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd store-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env`:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=3000
   ```

4. Populate the database with sample data:
   ```bash
   node populate.js
   ```

5. Start the server:
   ```bash
   npm start
   ```

## 🎯 Usage Guide

### Basic Navigation

1. Visit `http://localhost:3000` in your browser
2. Browse through the product catalog using the pagination controls at the bottom
3. Click on product cards to view details

### Using Filters

1. **Search by Name**:
   - Type product names in the search box
   - Press Enter or click "Apply" to search
   - Searches are case-insensitive and partial matches work

2. **Filter by Company**:
   - Use the company dropdown to select a specific manufacturer
   - The list automatically updates with available companies

3. **Sort Products**:
   - Use the sort dropdown to order products by:
     - Newest (default)
     - Name (A-Z)
     - Price (High to Low)
     - Price (Low to High)

4. **Shipping Filter**:
   - Toggle the "Free shipping only" checkbox to see eligible products

5. **Applying Filters**:
   - Click "Apply" to use selected filters
   - Use "Reset" to clear all filters and start fresh

### Pagination

- Navigate between pages using the pagination controls
- Previous/Next buttons for sequential navigation
- Click specific page numbers to jump to that page
- Ellipsis (...) indicates more pages are available

## 🔧 Technical Architecture

### Frontend Structure

```
public/
├── js/
│   ├── main.js          # Application core and coordination
│   ├── dom-utils.js     # DOM manipulation utilities
│   ├── filters.js       # Filter and query management
│   ├── pagination.js    # Page navigation handling
│   └── product-renderer.js  # Product display logic
├── styles.css           # Application styling
└── index.html          # Main HTML structure
```

### Key Components

1. **Main Controller** (`main.js`):
   - Coordinates all application features
   - Handles API communication
   - Manages application state
   - Coordinates user interactions

2. **DOM Utilities** (`dom-utils.js`):
   - Centralizes DOM element selection
   - Manages status messages
   - Handles common UI operations

3. **Filter System** (`filters.js`):
   - Builds API queries from user inputs
   - Manages company filter options
   - Handles filter state

4. **Pagination** (`pagination.js`):
   - Renders page navigation
   - Handles page transitions
   - Manages pagination state

5. **Product Display** (`product-renderer.js`):
   - Creates product cards
   - Handles image loading
   - Formats product information

### Backend Integration

- RESTful API endpoints at `/api/v1/products`
- Supports query parameters:
  - `name`: Product name search
  - `company`: Company filter
  - `sort`: Sort order
  - `shipping`: Free shipping filter
  - `page`: Page number
  - `limit`: Items per page

## 🔍 API Endpoints

### GET /api/v1/products
```javascript
// Example Query
GET /api/v1/products?name=chair&company=ikea&sort=-price&page=2&limit=4

// Response Format
{
  products: [...],
  nbHits: 45  // Total number of matching products
}
```

## 🛠 Development

### Adding New Features

1. Filter Logic:
   - Add new filter options in `filters.js`
   - Update query building in `buildQuery()`
   - Add UI elements in `index.html`

2. Product Display:
   - Modify card layout in `product-renderer.js`
   - Update styling in `styles.css`

3. New Sorting Options:
   - Add options to sort dropdown in `index.html`
   - Update sort handling in `filters.js`

## 🐛 Troubleshooting

Common issues and solutions:

1. **Products Not Loading**:
   - Check if MongoDB is running
   - Verify database connection string
   - Check server logs for errors

2. **Filters Not Working**:
   - Clear browser cache
   - Check browser console for errors
   - Verify query parameters in network tab

3. **Images Not Displaying**:
   - Verify image URLs in product data
   - Check network connectivity
   - Ensure proper image formats are used

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
