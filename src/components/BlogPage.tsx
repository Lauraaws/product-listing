import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Box, 
  Paper, 
  Pagination,
  Divider,
  Chip,
  Button,
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
  date: string;
  author: string;
  authorAvatar: string;
  categories: string[];
}

// Define props for BlogPage component
interface BlogPageProps {
  onNavigateToProducts?: () => void;
}

// Blog post data
const allBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Welcome to French Bulldog Wrinkle Care: Your Guide to Healthy Wrinkles",
    excerpt: "French Bulldogs are beyond cute with their squishy faces and signature wrinkles but those rolls need special attention to stay healthy! At French Bulldog Wrinkle Care, we're here to provide guidance on how to keep your pup's wrinkles in tip-top shape. Whether you're a proud Frenchie parent or own another wrinkly dog breed such as English Bulldog, Pugs, Mastiffs & many more. To share our passion for these adorable pups and help you tackle the challenges of caring for their skin, we'll dive into the essentials of French Bulldog wrinkles and explore how proper care can make a world of difference for your furry friend's happiness and health. Stick with us for expert insights and practical solutions!",
    content: "",
    date: "February 27, 2025",
    author: "Dr. Emma Wilson",
    authorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
    categories: ["Introduction", "Skin Care"]
  },
  {
    id: 2,
    title: "Keeping Those French Bulldog Wrinkles Clean and Healthy",
    excerpt: "French Bulldogs wrinkles are adorable by design however, those deep folds can trap moisture, dirt and bacteria if left unchecked. Without regular cleaning, your pup's skin may become red and irritated, could get infected or even get that dreaded yeasty smell. By making wrinkle cleaning a regular habit, you're not only preventing infections but also strengthening your bond with your Frenchie through gentle care. Stay tuned as we break down the how-to's and share simple routines to keep those French Bulldog wrinkles as healthy as they are cute!",
    content: "",
    date: "February 27, 2025",
    author: "Mark Johnson",
    authorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
    categories: ["Product Reviews", "Skin Care"]
  },
  {
    id: 3,
    title: "Wipes, Balms and Creams",
    excerpt: "When it comes to French Bulldog wrinkle products, the options can feel overwhelming - wipes, balms, creams, oh my! However, each type has its own superpower. Choosing the best French Bulldog wrinkle care products depends on your pup's needs and your routine. For busy pet parents, pre-moistened wipes designed for French Bulldog skin care are a lifesaver - just swipe and go! On the other hand, if your Frenchie's wrinkles get dry or chapped, a rich balm or cream can work wonders overnight. We'll walk you through top picks, ingredients to look for (think hypoallergenic and fragrance-free), and how to apply them so your French Bulldog's wrinkles stay clean, soft, and irritation-free. Let's find the perfect fit for your wrinkly companion!",
    content: "",
    date: "February 27, 2025",
    author: "Dr. James Carter",
    authorAvatar: "https://randomuser.me/api/portraits/men/67.jpg",
    categories: ["Health Tips", "Preventative Care"]
  },
];

function BlogPage({ onNavigateToProducts }: BlogPageProps) {
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
          French Bulldog Wrinkles - Blog
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
                      
                      {/* <Typography variant="body2" color="text.secondary" paragraph>
                        {post.content.split('\n\n')[0]}...
                      </Typography> */}
                      
                      <Box sx={{ mt: 2 }}>
                        <Button 
                          variant="contained" 
                          color="primary"
                          onClick={onNavigateToProducts}
                          sx={{ 
                            borderRadius: 1,
                            textTransform: 'none',
                            fontWeight: 600,
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            '&:hover': {
                              boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                              transform: 'translateY(-2px)',
                            },
                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                          }}
                        >
                          View Products for Wrinkle Care
                        </Button>
                      </Box>
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
