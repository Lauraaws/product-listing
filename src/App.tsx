import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Paper, 
  Rating, 
  Chip, 
  Button, 
  Divider,
  AppBar,
  Toolbar,
  Pagination
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import { styled } from "@mui/material/styles";
import { useState } from "react";

// Define styled components for enhanced visual appeal
const ProductCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  borderRadius: theme.spacing(1),
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
  },
}));

const ProductImage = styled(CardMedia)(({ theme }) => ({
  width: '40%',
  minHeight: 250,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    height: 200,
  },
}));

const ProductContent = styled(CardContent)(({ theme }) => ({
  width: '60%',
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  },
}));

const ProductTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const ProductPrice = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginTop: theme.spacing(1),
}));

const ProductDescription = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

// Amazon button with Amazon's yellow color
const AmazonButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#FFD814', // Amazon yellow
  color: '#000000',
  fontWeight: 600,
  '&:hover': {
    backgroundColor: '#F7CA00', // Darker yellow on hover
  },
  marginTop: 'auto',
  borderRadius: theme.spacing(0.5),
  padding: theme.spacing(1, 2),
  textTransform: 'none',
  boxShadow: '0 2px 5px 0 rgba(213,217,217,.5)',
}));

// Amazon logo component
const AmazonLogo = () => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      width: '20px',
      height: '20px',
      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' width='48px' height='48px'%3E%3Cpath fill='%23FFD600' d='M24.042,32.933c-2.371,1.76-5.804,2.699-8.764,2.699c-4.149,0-7.878-1.535-10.712-4.099c-0.221-0.201-0.023-0.475,0.243-0.319c3.048,1.776,6.815,2.842,10.7,2.842c2.622,0,5.514-0.544,8.166-1.669C24.111,32.23,24.447,32.655,24.042,32.933 M25.106,31.695c-0.303-0.387-2.001-0.184-2.765-0.092c-0.231,0.027-0.267-0.174-0.059-0.319c1.354-0.951,3.576-0.676,3.834-0.358c0.259,0.319-0.068,2.532-1.33,3.592c-0.194,0.161-0.379,0.075-0.293-0.139C24.742,33.756,25.409,32.083,25.106,31.695 M22.112,25.644c0,0.734,0.018,1.347-0.354,2c-0.301,0.54-0.779,0.872-1.31,0.872c-0.726,0-1.149-0.553-1.149-1.37c0-1.61,1.446-1.903,2.813-1.903V25.644z M24.015,29.219c-0.184,0.164-0.451,0.176-0.659,0.066c-0.926-0.769-1.092-1.127-1.6-1.86c-1.529,1.558-2.612,2.025-4.599,2.025c-2.349,0-4.176-1.449-4.176-4.35c0-2.265,1.228-3.808,2.977-4.564c1.515-0.67,3.631-0.788,5.247-0.972v-0.361c0-0.664,0.052-1.45-0.339-2.022c-0.339-0.516-0.988-0.728-1.562-0.728c-1.061,0-2.006,0.544-2.236,1.672c-0.048,0.251-0.231,0.498-0.482,0.51l-2.694-0.29c-0.226-0.051-0.478-0.234-0.414-0.582C14.067,13.896,16.886,13,19.387,13c1.27,0,2.928,0.339,3.93,1.3c1.27,1.185,1.149,2.766,1.149,4.486v4.064c0,1.221,0.507,1.759,0.983,2.418c0.167,0.234,0.204,0.513-0.001,0.688C24.943,26.454,24.358,28.006,24.015,29.219L24.015,29.219z'/%3E%3C/svg%3E")`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      marginRight: '8px',
      verticalAlign: 'middle',
    }}
  />
);

// Product data - 20 products total
const allProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 249.99,
    description: "Experience crystal-clear sound with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and ultra-comfortable memory foam ear cushions for all-day listening comfort.",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    categories: ["Electronics", "Audio"],
  },
  {
    id: 2,
    name: "Smart Fitness Watch",
    price: 179.95,
    description: "Track your fitness goals with precision using our advanced smart watch. Monitor heart rate, sleep patterns, and activity levels while staying connected with notifications and music control. Water-resistant up to 50 meters.",
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    categories: ["Electronics", "Fitness"],
  },
  {
    id: 3,
    name: "Ergonomic Office Chair",
    price: 299.00,
    description: "Work in comfort with our ergonomically designed office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable armrests to reduce strain during long work sessions. Supports up to 300 pounds.",
    image: "https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    categories: ["Furniture", "Office"],
  },
  {
    id: 4,
    name: "Professional DSLR Camera",
    price: 1299.00,
    description: "Capture stunning photos and videos with our professional-grade DSLR camera. Featuring a 24.2MP sensor, 4K video recording, and advanced autofocus system. Includes a versatile 18-55mm lens to get you started.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    categories: ["Electronics", "Photography"],
  },
  {
    id: 5,
    name: "Gourmet Coffee Maker",
    price: 149.50,
    description: "Brew barista-quality coffee at home with our programmable coffee maker. Features customizable brew strength, built-in grinder, and thermal carafe to keep your coffee hot for hours without burning. Makes up to 12 cups.",
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    categories: ["Kitchen", "Appliances"],
  },
  {
    id: 6,
    name: "Lightweight Hiking Backpack",
    price: 89.99,
    description: "Hit the trails with our durable yet lightweight hiking backpack. Featuring multiple compartments, hydration reservoir compatibility, and ergonomic shoulder straps with breathable padding. Water-resistant material keeps your gear dry.",
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.4,
    categories: ["Outdoors", "Travel"],
  },
  {
    id: 7,
    name: "Smart Home Security System",
    price: 349.00,
    description: "Protect your home with our comprehensive security system. Includes HD cameras, motion sensors, and smart doorbell with two-way audio. Monitor everything from your smartphone with real-time alerts and cloud video storage.",
    image: "https://images.unsplash.com/photo-1558002038-1055e2e28ed1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    categories: ["Electronics", "Security"],
  },
  {
    id: 8,
    name: "Stainless Steel Cookware Set",
    price: 199.95,
    description: "Elevate your cooking with our premium 10-piece stainless steel cookware set. Featuring tri-ply construction for even heat distribution, stay-cool handles, and oven-safe up to 500°F. Dishwasher safe for easy cleanup.",
    image: "https://images.unsplash.com/photo-1584990347449-a5d9f800a783?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    categories: ["Kitchen", "Cookware"],
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    description: "Take your music anywhere with our waterproof Bluetooth speaker. Delivering rich, immersive sound in a compact package with 20-hour battery life. Perfect for beach days, camping trips, or backyard gatherings.",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    categories: ["Electronics", "Audio"],
  },
  {
    id: 10,
    name: "Organic Cotton Bedding Set",
    price: 129.00,
    description: "Sleep in luxury with our 100% organic cotton bedding set. Includes a duvet cover, fitted sheet, and two pillowcases in a breathable 400 thread count weave. Hypoallergenic and sustainably sourced for eco-conscious comfort.",
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    categories: ["Home", "Bedding"],
  },
  {
    id: 11,
    name: "Ultra HD Smart TV",
    price: 799.99,
    description: "Transform your home entertainment with our 55-inch Ultra HD Smart TV. Featuring vibrant 4K resolution, HDR technology, and built-in streaming apps. Voice control and slim bezel design make it the perfect centerpiece for any living room.",
    image: "https://images.unsplash.com/photo-1593784991095-a205069533cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    categories: ["Electronics", "Home Entertainment"],
  },
  {
    id: 12,
    name: "Professional Chef Knife Set",
    price: 159.95,
    description: "Elevate your culinary skills with our premium 8-piece chef knife set. Crafted from high-carbon stainless steel with ergonomic handles for precision cutting. Includes chef knife, bread knife, santoku, utility knife, and more in a stylish wooden block.",
    image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    categories: ["Kitchen", "Cookware"],
  },
  {
    id: 13,
    name: "Adjustable Dumbbell Set",
    price: 349.00,
    description: "Save space and maximize your home workouts with our adjustable dumbbell set. Each dumbbell adjusts from 5 to 52.5 pounds with the turn of a dial, replacing 15 sets of weights. Perfect for strength training in limited space.",
    image: "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    categories: ["Fitness", "Sports"],
  },
  {
    id: 14,
    name: "Luxury Scented Candle Set",
    price: 49.99,
    description: "Create a relaxing ambiance with our set of three luxury scented candles. Made from 100% soy wax with cotton wicks and premium essential oils. Long-burning and beautifully packaged, they make the perfect gift or home accent.",
    image: "https://images.unsplash.com/photo-1603006905393-c279c4320be5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    categories: ["Home", "Decor"],
  },
  {
    id: 15,
    name: "Robotic Vacuum Cleaner",
    price: 279.95,
    description: "Let technology handle the cleaning with our smart robotic vacuum. Featuring advanced mapping technology, powerful suction, and app control to clean your floors while you're away. Compatible with voice assistants and automatically returns to dock for charging.",
    image: "https://images.unsplash.com/photo-1589894404892-7d595e775f6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    categories: ["Home", "Appliances"],
  },
  {
    id: 16,
    name: "Wireless Gaming Mouse",
    price: 89.99,
    description: "Gain a competitive edge with our high-performance wireless gaming mouse. Featuring an ultra-precise 25,000 DPI sensor, customizable RGB lighting, and 8 programmable buttons. Ergonomic design with up to 70 hours of battery life.",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.7,
    categories: ["Electronics", "Gaming"],
  },
  {
    id: 17,
    name: "Leather Messenger Bag",
    price: 129.00,
    description: "Carry your essentials in style with our genuine leather messenger bag. Features multiple compartments including a padded laptop sleeve, adjustable shoulder strap, and antique brass hardware. Perfect for work, travel, or everyday use.",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.8,
    categories: ["Fashion", "Accessories"],
  },
  {
    id: 18,
    name: "Smart Indoor Garden",
    price: 99.95,
    description: "Grow fresh herbs and vegetables year-round with our smart indoor garden. The self-watering system, built-in grow lights, and plant pods make gardening effortless. Perfect for apartments or adding greenery to any kitchen.",
    image: "https://images.unsplash.com/photo-1585400473049-2c90a607fb0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.6,
    categories: ["Home", "Garden"],
  },
  {
    id: 19,
    name: "Insulated Water Bottle",
    price: 34.99,
    description: "Stay hydrated on the go with our vacuum-insulated stainless steel water bottle. Keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof lid, durable powder-coated finish, and available in multiple colors. BPA-free and eco-friendly.",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.9,
    categories: ["Outdoors", "Fitness"],
  },
  {
    id: 20,
    name: "Wireless Charging Pad",
    price: 29.99,
    description: "Simplify your charging routine with our sleek wireless charging pad. Compatible with all Qi-enabled devices, it delivers fast charging without the cable clutter. Features LED indicators, non-slip surface, and overcharge protection.",
    image: "https://images.unsplash.com/photo-1618478594486-c65b899c4936?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    rating: 4.5,
    categories: ["Electronics", "Accessories"],
  },
];

// Function to generate Amazon search URL
const getAmazonSearchUrl = (productName: string) => {
  const searchQuery = encodeURIComponent(productName);
  return `https://www.amazon.com/s?k=${searchQuery}`;
};

// Define product type
interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  rating: number;
  categories: string[];
}

function App() {
  // State to track the current page
  const [page, setPage] = useState(1);
  
  // Items per page
  const itemsPerPage = 10;
  
  // Calculate total number of pages
  const totalPages = Math.ceil(allProducts.length / itemsPerPage);
  
  // Get current page's products
  const displayedProducts = allProducts.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );
  
  // Handle page change
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ bgcolor: '#ba82ec' }}>
        <Toolbar>
          <StorefrontIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Top Dog Products
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Toolbar placeholder to prevent content from hiding under the fixed AppBar */}
      <Toolbar />
      
      <Container maxWidth="lg" sx={{ pt: 6, pb: 2, mt: 2, position: 'relative' }}>
        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'transparent' }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 700, mb: 4 }}>
            Featured Products
          </Typography>
          
          <Box sx={{ position: 'relative' }}>
            {displayedProducts.map((product: Product) => (
              <ProductCard key={product.id}>
                <ProductImage
                  image={product.image}
                  title={product.name}
                />
                <ProductContent>
                  <ProductTitle variant="h5">
                    {product.name}
                  </ProductTitle>
                  
                  <Box sx={{ mb: 1 }}>
                    {product.categories.map((category) => (
                      <CategoryChip key={category} label={category} size="small" />
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={product.rating} precision={0.1} readOnly size="small" />
                    <Typography variant="body2" sx={{ ml: 1 }}>
                      {product.rating} / 5
                    </Typography>
                  </Box>
                  
                  <ProductDescription variant="body2">
                    {product.description}
                  </ProductDescription>
                  
                  <ProductPrice variant="h6">
                    ${product.price.toFixed(2)}
                  </ProductPrice>
                  
                  <Box sx={{ mt: 2 }}>
                    <a 
                      href={getAmazonSearchUrl(product.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'none', width: '100%' }}
                    >
                      <AmazonButton 
                        variant="contained" 
                        startIcon={<AmazonLogo />}
                        endIcon={<ShoppingCartIcon />}
                        fullWidth
                      >
                        Buy on Amazon
                      </AmazonButton>
                    </a>
                  </Box>
                </ProductContent>
              </ProductCard>
            ))}
            
            {/* Pagination */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 2 }}>
              <Pagination 
                count={totalPages} 
                page={page} 
                onChange={handlePageChange} 
                color="standard" 
                size="large"
                showFirstButton
                showLastButton
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: '1rem',
                  }
                }}
              />
            </Box>
          </Box>
        </Paper>
      </Container>
    </>
  );
}

export default App;
