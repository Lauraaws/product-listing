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
    Pagination,
  } from "@mui/material";
  import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
  import { styled } from "@mui/material/styles";
  import { useState } from "react";
  
  // Define styled components for enhanced visual appeal
  const ProductCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
    borderRadius: theme.spacing(1),
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 12px 20px rgba(0,0,0,0.15)',
    },
  }));
  
  const ProductImage = styled(CardMedia) ({
    height: 200,
    backgroundSize: 'contain',
    backgroundPosition: 'center',
  });
  
  const ProductContent = styled(CardContent)(({ theme }) => ({
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
  }));
  
  const ProductTitle = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1),
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
  
  // Define product type
  interface Product {
    id: number;
    name: string;
    description: string;
    image: string;
    rating: number;
    categories: string[];
    affiliateLink: () => void; // Function to handle affiliate link click
  }
  
  // Product data - 20 products total
  const allProducts = [
    {
      id: 1,
      name: "Wrinkle Wipes for Dogs",
      description: "These dog wipes are perfect for wrinkly dogs. Their formula and ingredients are designed to gently clean, deodorize wrinkles and folds while helping sooth your dogs wrinkles. The wipes are easy to apply into the fold creases.",
      image: "/barkosWrinkleWipes.png",
      rating: 4.6,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/4bqAhtT", "_blank", "noopener,noreferrer"),
    },
    {
      id: 2,
      name: "Squishface Wrinkle Wipes",
      description: "These wrinkle wips are great for wrinkly dogs including: English Bulldog, Pugs, Frenchie, Bulldogs, French Bulldogs & many more. Each wipe is 5 inches by 7 inches. They deodorize and can help remove tear stains.",
      image: "/squishfaceWinkleWipes.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/4hZprxj", "_blank", "noopener,noreferrer"),
    },
    {
      id: 3,
      name: "Petpost Bulldog Wrinkle Wipes",
      description: "Bulldog wrinkle wipes make it easier to remove dirt and gunk from your wrinkly dog. Made in the USA by an environmentally conscious pet company! We use all naturally derived ingredients and recyclable packaging and actively seek ways to reduce our footprint.",
      image: "/petPostWrinkleWipes.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/41DNR9Z", "_blank", "noopener,noreferrer"),
    },
    {
      id: 4,
      name: "Pet MD Topical Wipes for Cleansing",
      description: "These premoisetened wipes deodorize and help relieve both main causes of infections like hot spots, redness, and acne in pets. They are great for superficial cuts, abrasions and insect bites. Perfect for between baths and easier than shampoo.",
      image: "/petMDWipes.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/41IdFkn", "_blank", "noopener,noreferrer"),
    },
    {
      id: 5,
      name: "Natural Dog Company Wrinkle Wipes",
      description: "These plant based herbal pet wipes are perfect to treat, heal, and protect your pup's wrinkles. They are easy to use and were made to treat common wrinkly dog concerns like skinfold dermatitis, yeast and bacterial infections.Formulated with no artificial preservatives or harmful ingredients. Nourishing ingredients include Shea butter, Rosemary Extract, and Calendula",
      image: "/naturalDogCompanyWipes.png",
      rating: 4.4,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/3QDKcmt", "_blank", "noopener,noreferrer"),
    },
    {
      id: 6,
      name: "Wrinkle Paste and Wipes for Bulldogs",
      description: "These dog wrinkle wipes soothe and protect delicate skin folds, keeping your pup comfortable. The wrinkle paste for Frenchies is easy to apply, ensuring a mess-free experience. The wrinkle wipes soothe and protect delicate skin folds, keeping your pup comfortable",
      image: "/twoPetsWrinklePadsYellow.png",
      rating: 4.4,
      categories: ["Pet Supplies", "Dog Grooming Wipes"],
      affiliateLink: () => window.open("https://amzn.to/3QGNOUA", "_blank", "noopener,noreferrer"),
    },
    {
      id: 7,
      name: "Dog Wrinkle Cream for Bulldogs & Frenchies",
      description: "The dog wrinkle cream provides advanced skincare for wrinkly pups with sensitive skin. It is deeply moisturizing and helps sooth itching, dryness and irritation. We used a gentle, hypoallergenic formula with an easy-to-use design.",
      image: "/yibesiWrinklePaste.png",
      rating: 4.8,
      categories: ["Pet Supplies", "Dog Itch Remedies"],
      affiliateLink: () => window.open("https://amzn.to/4idFzLK", "_blank", "noopener,noreferrer"),
    },
    {
      id: 8,
      name: "Natural Dog Company Wrinkle Balm",
      description: "Formulated with lick-safe ingredients including: Shea Butter for moisture, Candelilla Wax for quick absorption, Jojoba Oil for antioxidants, and Hempseed Oil to support skin comfort. Designed for French Bulldogs, Pugs, English Bulldogs, and other breeds prone to skin folds.",
      image: "/naturalDogCompanyBalm.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Itch Remedies"],
      affiliateLink: () => window.open("https://amzn.to/4i24amK", "_blank", "noopener,noreferrer"),
    },
    {
      id: 9,
      name: "Natural Dog Company Wrinkle Balm Stick",
      description: "Easy to apply and take with you! This balm stick is formulated with lick-safe ingredients including: Shea Butter for moisture, Candelilla Wax for quick absorption, Jojoba Oil for antioxidants, and Hempseed Oil to support skin comfort. Designed for French Bulldogs, Pugs, English Bulldogs, and other breeds prone to skin folds.",
      image: "/naturalDogCompanyBalm2.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Itch Remedies"],
      affiliateLink: () => window.open("https://amzn.to/3QIIiAM", "_blank", "noopener,noreferrer"),
    },
    {
      id: 10,
      name: "Squishface Flexible Silicone Dog Wrinkle Paste Applicator",
      description: "This applicator is perfect for hard to reach areas, while keeping your hands and fingernails clean and protecting your pup against those sharp fingernails. It features a suction cup for easy and sanitary storage. Perfect for applying paste to dogs such as English Bulldogs, French Bulldogs, Pugs, Shar Peis, Neapolitan Mastiffs, Bloodhounds, Dogue de Bordeaux, Bullmastiffs, Frenchies, Basset Hounds, Pomeranians, Shih-tzus, Maltese, Poodles, Westies, Bichon Frises, Coton de Tulears, Bologneses, and more!",
      image: "/squishfaceApplicator.png",
      rating: 4.4,
      categories: ["Pet Supplies", "Dog Eye Care"],
      affiliateLink: () => window.open("https://amzn.to/4iFaFft", "_blank", "noopener,noreferrer"),
    },
     {
      id: 11,
      name: "Eye Envy Bulldog Wrinkle Cleaner & Nose Care Kit",
      description: "A complete care kit for bulldogs, treating skin issues between folds, tear stains and chapped, dry noses. Contains four products: Bulldog Wrinkle Wipes 60 count, Tear Stain Remover Powder .5 oz, ProPowder Applicator Brush, and On The Nose Balm .5oz. Ideal for flat-faced breeds such as English Bulldogs, French Bulldogs, Mastiffs, Pugs, etc.",
      image: "/envyEyeWinkleCareKit.png",
      rating: 4.6,
      categories: ["Pet Supplies", "Dog Itch Remedies"],
      affiliateLink: () => window.open("https://amzn.to/4hXyCyD", "_blank", "noopener,noreferrer"),
    },
    {
      id: 12,
      name: "Natural Dog Company Oatmeal Shampoo",
      description: "This shampoo tackles itching, flaking, and dryness, promoting a healthier and happier dog. All natural ingredients: Colloidal Oatmeal for soothing and moisturizing, Aloe Vera known for its healing properties, Manuka Honey with antibacterial benefits, Coconut Oil for deep hydration, and Chamomile Extract for calming and relaxing.",
      image: "/naturalDogCompanyShampoo.png",
      rating: 4.5,
      categories: ["Pet Supplies", "Dog Shampoos"],
      affiliateLink: () => window.open("https://amzn.to/41lMg7t", "_blank", "noopener,noreferrer"),
    },
  ];
  
  function ProductListing() {
    // State to track the current page for pagination
    const [page, setPage] = useState(1);

    
    // Items per page
    const itemsPerPage = 9;
    
    // Calculate total number of pages
    const totalPages = Math.ceil(allProducts.length / itemsPerPage);
    
    // Get current page's products
    const displayedProducts = allProducts.slice(
      (page - 1) * itemsPerPage,
      page * itemsPerPage
    );
    
    // Handle page change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
      console.log(event);
      setPage(value);
      // Scroll to top when page changes
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
   
  
    return (
      <>
       <Container maxWidth="lg" sx={{ pt: 6, pb: 2, mt: 2, position: 'relative' }}>
            <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'transparent' }}>
              <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 700, mb: 4 }}>
                French Bulldog Wrinkle Care Products
              </Typography>
              <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ fontWeight: 500, mb: 4 }}>
                Here you'll find helpful products to keep your Frenchie's wrinkles looking their best. <br/>
                As an Amazon Associate I earn a small commission from qualifying purchases.
              </Typography>
              
              <Grid container spacing={3}>
              {displayedProducts.map((product: Product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard>
                    <ProductImage
                      image={product.image}
                      title={product.name}
                    />
                    <ProductContent>
                      <ProductTitle variant="h6">
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
                      
                      <Box sx={{ mt: 'auto', pt: 2 }}>
                        <AmazonButton 
                          variant="contained" 
                          startIcon={<AmazonLogo />}
                          endIcon={<ShoppingCartIcon />}
                          fullWidth
                          onClick={product.affiliateLink}
                        >
                          Buy on Amazon
                        </AmazonButton>
                      </Box>
                    </ProductContent>
                  </ProductCard>
                </Grid>
              ))}
              </Grid>
                
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
              
            </Paper>
          
        </Container>
      </>
    );
  }
  
  export default ProductListing;
  