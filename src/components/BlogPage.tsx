import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Box, 
  Paper, 
  Pagination,
  Divider,
  Chip,
  Avatar
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

// Define styled components for enhanced visual appeal
const BlogCard = styled(Card)(({ theme }) => ({
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

const BlogImage = styled(CardMedia)({
  height: 240,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
});

const BlogContent = styled(CardContent)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
}));

const BlogTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  marginBottom: theme.spacing(1),
}));

const BlogExcerpt = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(2),
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginBottom: theme.spacing(1),
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.contrastText,
}));

const AuthorBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(1),
}));

const DateBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.text.secondary,
  fontSize: '0.875rem',
}));

// Define blog post type
interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  author: string;
  authorAvatar: string;
  categories: string[];
}

// Blog post data
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Essential Guide to French Bulldog Wrinkle Care",
    excerpt: "Learn the proper techniques and products to keep your Frenchie's wrinkles clean and healthy.",
    content: "French Bulldogs are known for their adorable wrinkles, but these cute features require special attention to prevent skin issues. In this comprehensive guide, we'll walk you through the essential steps to maintain proper wrinkle hygiene for your Frenchie.\n\nWhy Wrinkle Care Matters\nThe deep folds in your French Bulldog's skin can trap moisture, dirt, and debris, creating the perfect environment for bacterial and yeast infections. Regular cleaning is essential to prevent these issues and keep your pup comfortable.\n\nDaily Cleaning Routine\nEstablish a daily cleaning routine using gentle, dog-specific wrinkle wipes or a soft cloth with a mild cleaning solution. Gently wipe between all folds, making sure to dry thoroughly afterward. Pay special attention to the facial wrinkles, especially around the nose rope.\n\nChoosing the Right Products\nLook for products specifically designed for wrinkly breeds. Avoid harsh chemicals, alcohol, or fragrances that could irritate your dog's sensitive skin. Many veterinarians recommend using products with natural antibacterial properties.\n\nSigns of Skin Issues\nBe vigilant for signs of skin problems, including redness, odor, discharge, excessive scratching, or discomfort when touching the wrinkles. If you notice any of these symptoms, consult your veterinarian promptly.\n\nPreventative Measures\nBeyond cleaning, keep the wrinkles dry throughout the day. After meals, check for food particles that may have become trapped in facial folds. After walks in humid or rainy weather, dry your Frenchie's wrinkles thoroughly.\n\nWith consistent care and attention, you can help ensure your French Bulldog's wrinkles remain healthy, comfortable, and infection-free.",
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1064&q=80",
    date: "February 15, 2025",
    author: "Dr. Emma Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    categories: ["Skin Care", "Health Tips"]
  },
  {
    id: 2,
    title: "Best Products for French Bulldog Wrinkle Maintenance",
    excerpt: "Discover the top-rated products that will keep your Frenchie's wrinkles clean, dry, and healthy.",
    content: "Maintaining your French Bulldog's wrinkles requires the right products. In this article, we review the most effective solutions for keeping those adorable folds clean and healthy.\n\nWrinkle Wipes\nSpecialized wrinkle wipes are convenient for daily cleaning. Look for alcohol-free options with natural ingredients like aloe vera or coconut oil. These wipes can effectively remove dirt and debris while being gentle on your dog's sensitive skin.\n\nWrinkle Pastes and Balms\nThese products create a protective barrier that helps prevent moisture buildup in the folds. Quality wrinkle balms contain ingredients like shea butter, coconut oil, and natural antibacterial agents that soothe the skin while keeping it dry.\n\nGentle Cleansers\nFor deeper cleaning sessions, use a gentle, pH-balanced cleanser specifically formulated for dogs. Avoid human products, as they can disrupt the natural balance of your dog's skin.\n\nDrying Powders\nSome veterinarians recommend using pet-safe drying powders to keep wrinkles dry between cleanings. These can be particularly helpful for dogs prone to excessive moisture in their skin folds.\n\nApplication Tools\nSilicone applicators can help you apply pastes and balms to hard-to-reach areas while keeping your hands clean. These tools are especially useful for applying products to deep wrinkles.\n\nRemember that every French Bulldog is unique, and what works for one may not work for another. It's always best to consult with your veterinarian before introducing new products into your pet's care routine, especially if they have a history of skin sensitivities or allergies.",
    image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    date: "January 28, 2025",
    author: "Mark Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    categories: ["Product Reviews", "Skin Care"]
  },
  {
    id: 3,
    title: "Preventing Skin Infections in French Bulldogs",
    excerpt: "Learn how to identify early signs of skin issues and prevent infections in your Frenchie's wrinkles.",
    content: "French Bulldogs are prone to skin infections, particularly in their wrinkles and folds. This article provides essential information on preventing and identifying these common issues.\n\nCommon Skin Problems\nFrench Bulldogs commonly suffer from several skin conditions, including fold dermatitis, yeast infections, bacterial infections, and allergic reactions. These issues often manifest in the wrinkles, where moisture and warmth create ideal conditions for microorganisms to thrive.\n\nRecognizing Early Warning Signs\nCatch problems early by watching for these signs: redness or inflammation, unusual odor (often yeasty or sour), excessive scratching or rubbing, discharge or crusty areas, and discomfort when touching affected areas. Early intervention can prevent minor issues from becoming serious infections.\n\nPreventative Care Routine\nEstablish a consistent cleaning routine, using appropriate products for your dog's skin type. Always ensure wrinkles are thoroughly dried after cleaning. Consider using preventative products like wrinkle balms that create a protective barrier against moisture and irritants.\n\nDietary Considerations\nSome skin issues can be influenced by diet. Consult your veterinarian about whether your Frenchie might benefit from specific dietary changes, supplements like omega-3 fatty acids, or probiotics that support skin health.\n\nWhen to See a Veterinarian\nWhile many minor skin issues can be managed at home, don't hesitate to consult a professional if symptoms persist or worsen. Chronic or severe skin problems may require prescription medications or specialized treatments.\n\nBy maintaining vigilance and establishing good preventative care habits, you can help your French Bulldog avoid the discomfort and complications of skin infections, keeping those adorable wrinkles healthy and problem-free.",
    image: "https://images.unsplash.com/photo-1575425186775-b8de9a427e67?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80",
    date: "January 10, 2025",
    author: "Dr. James Carter",
    authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    categories: ["Health Tips", "Preventative Care"]
  },
  {
    id: 4,
    title: "Seasonal Wrinkle Care for French Bulldogs",
    excerpt: "Adjust your Frenchie's wrinkle care routine based on seasonal changes to maintain optimal skin health.",
    content: "Different seasons bring different challenges for your French Bulldog's skin. This guide will help you adapt your wrinkle care routine throughout the year.\n\nSummer Care\nHot, humid weather increases the risk of bacterial and yeast growth in skin folds. During summer months, you may need to clean your Frenchie's wrinkles more frequently—potentially twice daily. After swimming or water play, thoroughly dry all wrinkles and folds. Consider using a dog-safe powder to help absorb excess moisture.\n\nWinter Considerations\nCold weather can lead to dry, flaky skin. You might need to switch to more moisturizing products during winter months. After walks in snow or rain, immediately dry your dog's wrinkles to prevent moisture from being trapped. Indoor heating can also dry out your dog's skin, so maintain proper humidity levels in your home.\n\nSpring Allergies\nMany French Bulldogs suffer from seasonal allergies, which can manifest as skin irritation. During high pollen seasons, wipe down your dog's coat and clean wrinkles after outdoor activities to remove allergens. Watch for increased scratching or redness, which might indicate allergic reactions.\n\nFall Preparations\nAs temperatures drop and humidity levels change, gradually adjust your cleaning routine. This is a good time to assess your wrinkle care products and make any necessary changes before winter arrives.\n\nYear-Round Essentials\nRegardless of season, some practices remain constant: regular cleaning, thorough drying, and vigilant monitoring for signs of irritation or infection. Maintain regular veterinary check-ups to catch any seasonal skin issues early.\n\nBy adapting your care routine to seasonal changes, you'll help ensure your French Bulldog's wrinkles stay healthy and comfortable throughout the year.",
    image: "https://images.unsplash.com/photo-1588269845464-8993565cac3a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1021&q=80",
    date: "December 5, 2024",
    author: "Sarah Thompson",
    authorAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
    categories: ["Seasonal Care", "Health Tips"]
  },
  {
    id: 5,
    title: "DIY Solutions for French Bulldog Wrinkle Care",
    excerpt: "Learn how to create effective, natural wrinkle cleaning solutions using ingredients you already have at home.",
    content: "While there are many commercial products available for French Bulldog wrinkle care, you can also create effective cleaning solutions at home using natural ingredients. This article explores safe DIY options for maintaining your Frenchie's wrinkle hygiene.\n\nGentle Cleaning Solution\nA simple mixture of one part water to one part organic, unfiltered apple cider vinegar creates an effective antimicrobial solution. Apply with a soft cloth or cotton ball, then thoroughly dry the area. The vinegar smell dissipates quickly once dry.\n\nCoconut Oil Treatment\nOrganic, cold-pressed coconut oil has natural antimicrobial properties and can help moisturize dry skin. Apply a thin layer to clean, dry wrinkles. Be careful not to over-apply, as excessive oil can trap moisture.\n\nChamomile Tea Compress\nBrew strong chamomile tea, allow it to cool completely, then use it to dampen a soft cloth. The natural anti-inflammatory properties of chamomile can help soothe irritated skin folds.\n\nOatmeal Bath for Full-Body Relief\nFor Frenchies with widespread skin irritation, an oatmeal bath can provide relief. Blend plain, unflavored oatmeal into a fine powder, add to warm bathwater, and let your dog soak for 5-10 minutes before thoroughly drying all wrinkles and folds.\n\nAloe Vera Gel\nPure aloe vera gel (ensure it doesn't contain alcohol or added fragrances) can soothe irritated skin. Apply a small amount to clean wrinkles, allowing it to dry completely.\n\nImportant Precautions\nAlways test any new solution on a small area first to check for adverse reactions. Avoid essential oils, which can be toxic to dogs. If your French Bulldog has existing skin issues, consult your veterinarian before trying DIY remedies.\n\nThese natural solutions can be effective for routine maintenance, but they're not substitutes for veterinary care if your dog develops skin infections or persistent irritation.",
    image: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80",
    date: "November 18, 2024",
    author: "Lisa Rodriguez",
    authorAvatar: "https://randomuser.me/api/portraits/women/65.jpg",
    categories: ["DIY Care", "Natural Remedies"]
  }
];

function BlogPage() {
  // State to track the current page for pagination
  const [page, setPage] = useState(1);
  
  // Items per page
  const itemsPerPage = 3;
  
  // Calculate total number of pages
  const totalPages = Math.ceil(allBlogPosts.length / itemsPerPage);
  
  // Get current page's blog posts
  const displayedPosts = allBlogPosts.slice(
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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'transparent' }}>
        <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ fontWeight: 700, mb: 4 }}>
          French Bulldog Care Blog
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ mb: 6, maxWidth: '800px', mx: 'auto' }}>
          Welcome to our blog! Here you'll find helpful articles about caring for your French Bulldog's wrinkles and skin folds.
          Learn about the best practices, products, and preventative measures to keep your Frenchie healthy and happy.
        </Typography>
        
        <Grid container spacing={4}>
          {displayedPosts.map((post) => (
            <Grid item xs={12} key={post.id}>
              <BlogCard>
                <Grid container>
                  {/* <Grid item xs={12} md={4}>
                    <BlogImage
                      image={post.image}
                      title={post.title}
                    />
                  </Grid> */}
                  <Grid item xs={12} md={12}>
                    <BlogContent>
                      <Box sx={{ mb: 1 }}>
                        {post.categories.map((category) => (
                          <CategoryChip key={category} label={category} size="small" />
                        ))}
                      </Box>
                      
                      <BlogTitle variant="h5">
                        {post.title}
                      </BlogTitle>
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <AuthorBox>
                          {/* <Avatar src={post.authorAvatar} sx={{ width: 24, height: 24, mr: 1 }} /> */}
                          <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                            <PersonIcon sx={{ fontSize: 16, mr: 0.5 }} />
                            French Bulldog Wrinkle Care
                          </Typography>
                        </AuthorBox>
                        
                        <DateBox>
                          <CalendarTodayIcon sx={{ fontSize: 16, mr: 0.5 }} />
                          {post.date}
                        </DateBox>
                      </Box>
                      
                      <Divider sx={{ mb: 2 }} />
                      
                      <BlogExcerpt variant="body1">
                        {post.excerpt}
                      </BlogExcerpt>
                      
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {post.content.split('\n\n')[0]}...
                      </Typography>
                    </BlogContent>
                  </Grid>
                </Grid>
              </BlogCard>
            </Grid>
          ))}
        </Grid>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
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
        )}
      </Paper>
    </Container>
  );
}

export default BlogPage;
