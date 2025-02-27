import {
  Container,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import BookIcon from "@mui/icons-material/Book";
import { useState } from "react";
import ProductListing from "./components/ProductListing";
import BlogPage from "./components/BlogPage";

function App() {

  // State to track the drawer open/close
  const [drawerOpen, setDrawerOpen] = useState(false);

  // State to track the current view (Products or Blog)
  const [currentView, setCurrentView] = useState<'products' | 'blog'>('products');



  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  // Handle navigation
  const handleNavigation = (view: 'products' | 'blog') => {
    setCurrentView(view);
    setDrawerOpen(false);
  };

  return (
    <>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            French Bulldog Wrinkle Care
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
      >
        <Box
          sx={{ width: 250 }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('products')}>
                <ListItemIcon>
                  <ShoppingBagIcon />
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleNavigation('blog')}>
                <ListItemIcon>
                  <BookIcon />
                </ListItemIcon>
                <ListItemText primary="Blog" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Toolbar placeholder to prevent content from hiding under the fixed AppBar */}
      <Toolbar />

      <Container maxWidth="lg" sx={{ position: 'relative' }}>
        {currentView === 'products' ? (
          <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
            <ProductListing />
          </Paper>
        ) : (
          <Paper elevation={0} sx={{ bgcolor: 'transparent' }}>
            <BlogPage />
          </Paper>
        )}
      </Container>
    </>
  );
}

export default App;
