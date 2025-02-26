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

const ProductImage = styled(CardMedia)(({ theme }) => ({
  height: 200,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
}));

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
    description: "Transform your home entertainment with our 55-inch Ultra HD Smart TV. Featuring vibrant 4K resolution, HDR technology, and built-in streaming apps. Voice control and slim bezel design make it the perfect centerpiece for any living room.",
    image: "../src/assets/img/barkosWrinkleWipes.png",
    rating: 4.6,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/Barkos-Pet-Supplies-Wrinkles-Anti-Itch/dp/B09NF82RSY/ref=sr_1_28?crid=WTB8SH12YZX0&dib=eyJ2IjoiMSJ9.ayY8rDUym3c5DEtqUxodiV6s_ZDCk_y8723fsLEF4XX953JNlGbHrALm-TPWCkBNWo2JZU9BO_-dC7Q2qphNhq0qKzibAZZWBoEd4ucesmSrvL8uq6l5dbxEEwIU-mhzSpT4GibV25iabGKSlgz9QTbifnMQYUrwH4n84Da-Vc9clIc9ngedKWJTrqm8tKDrTsSalCpS1YFsOWWxSv559Gb4KLItrBtx59fGbqSUlQ2JekgYauH3MjDEUnywql5wUs4F8UnR7RwFCt2DDYoqBfFwf-RQ00E1qTcqaV0Uwa6fiKnKKI37gmw6TC3G9E1TL5cgp2rDtHGgIfyMDs-r7x3ADkcuCNCN8Z-0C5WDTt8.Znp3vzSsNQ-Ag0FqDLthpKtJTYzmYrVCjcmLzZFdkvA&dib_tag=se&keywords=french+bulldog+wrinkle&qid=1740590890&s=pet-supplies&sprefix=french+bulldog+wrinkle%2Cpets%2C238&sr=1-28", "_blank", "noopener,noreferrer"),
  },
  {
    id: 2,
    name: "Squishface Wrinkle Wipes",
    description: "Track your fitness goals with precision using our advanced smart watch. Monitor heart rate, sleep patterns, and activity levels while staying connected with notifications and music control. Water-resistant up to 50 meters.",
    image: "../src/assets/img/squishfaceWinkleWipes.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/Squishface-Wrinkle-Wipes/dp/B073HFC82B/ref=sr_1_7?crid=P7KG5P35Y9EJ&dib=eyJ2IjoiMSJ9.yAwpQQtils3_-l59zRId-TExm2KRdI2sQAckqa1rMe_PQwRzhZiabVwwXB3j80lZUvef_DytrQbaOherTpBLa3CaBozwwM5usud83wdZpFFHUw_tDa7ecARD308PsAKPHTawaqCI0vo1867MBPcpIMrdigdVkVAKR5Bpv6uDiqjc6nCHjQY0JbqfIUcOGvl5CUGE5RUogsPOJtT0eW6V9L5EryYjH4DMkNZMAVn6TZOCnvoGOjJWOjFVQ3PwcCKuIXoqcykJmswadtw2H7T5FVy938nS1PL5EUpY6zkqxNNIGwPKY8yHwlK5l1IcL8HVptjlkR8cki7rbVCe1PCu1sopqcvVCMCETLz_4atkfGio8mR5iUC2LxWrwC9_wttTSD9na4_3p1hAm234nsjldAV81mo4B11ToeZHFhhmYBP30ux9kySkZt53SddhJjfO.WG41SPNDrQRc8EAisEL6j0ntxYYJNI8Rk8wk4icJ9nY&dib_tag=se&keywords=french+bulldog+wrinkle&qid=1740586788&sprefix=french+bulldog+wrinkle%2Caps%2C140&sr=8-7", "_blank", "noopener,noreferrer"),
  },
  {
    id: 3,
    name: "Petpost Bulldog Wrinkle Wipes",
    description: "Hit the trails with our durable yet lightweight hiking backpack. Featuring multiple compartments, hydration reservoir compatibility, and ergonomic shoulder straps with breathable padding. Water-resistant material keeps your gear dry.",
    image: "../src/assets/img/petPostWrinkleWipes.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/Petpost-Bulldog-Wrinkle-Wipes-Dogs/dp/B07DRFTY4N/ref=sr_1_3_sspa?crid=ISGWZZZJNSXQ&dib=eyJ2IjoiMSJ9.euDaHRQfXyprBP2XXla0Of9lMp2en5NqEMq15QA2P0bPQwRzhZiabVwwXB3j80lZUvef_DytrQbaOherTpBLa3CaBozwwM5usud83wdZpFGrvL8uq6l5dbxEEwIU-mhzSpT4GibV25iabGKSlgz9QT8sr6FypKRtzUZaNScGHUa8kPnj3gCkaOMTJhRhLRhgM3iAL6Ckoo8o3dvX_DiOrHbMVBzzciqNFF7xmKtNgky5xoQQrvB1v3RtR4d6GE-3bKTC1aw_AGg_ZSzjgo1CmWhoIPFF47GHlFq_hnH70ro.lv4E80-1PoowiXerd42aRLhgaiWTMmC0BtteUC4f-3c&dib_tag=se&keywords=french%2Bbulldog%2Bwrinkle&qid=1740590007&rdc=1&s=pet-supplies&sprefix=french%2Bbulldog%2Bwrinkle%2Cpets%2C271&sr=1-3-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1", "_blank", "noopener,noreferrer"),
  },
  {
    id: 4,
    name: "Pet MD Topical Wipes for Cleansing",
    description: "Brew barista-quality coffee at home with our programmable coffee maker. Features customizable brew strength, built-in grinder, and thermal carafe to keep your coffee hot for hours without burning. Makes up to 12 cups.",
    image: "../src/assets/img/petMDWipes.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/dp/B0180A1J38/ref=sspa_dk_detail_7?psc=1&pf_rd_p=f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pf_rd_r=0Z3FX4TJ7YBWN3Z8QZC8&pd_rd_wg=sVBk5&pd_rd_w=eklbx&content-id=amzn1.sym.f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pd_rd_r=c623e574-9606-43ae-a90f-a46c372b2fc1&s=pet-supplies&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM#productDetails", "_blank", "noopener,noreferrer"),
  },
  {
    id: 5,
    name: "Natural Dog Company Wrinkle Wipes",
    description: "Track your fitness goals with precision using our advanced smart watch. Monitor heart rate, sleep patterns, and activity levels while staying connected with notifications and music control. Water-resistant up to 50 meters.",
    image: "../src/assets/img/naturalDogCompanyWipes.png",
    rating: 4.4,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/Natural-Dog-Company-Wrinkle-Wipes/dp/B09VCGKFMH/ref=sr_1_9?crid=P7KG5P35Y9EJ&dib=eyJ2IjoiMSJ9.yAwpQQtils3_-l59zRId-TExm2KRdI2sQAckqa1rMe_PQwRzhZiabVwwXB3j80lZUvef_DytrQbaOherTpBLa3CaBozwwM5usud83wdZpFFHUw_tDa7ecARD308PsAKPHTawaqCI0vo1867MBPcpIMrdigdVkVAKR5Bpv6uDiqjc6nCHjQY0JbqfIUcOGvl5CUGE5RUogsPOJtT0eW6V9L5EryYjH4DMkNZMAVn6TZOCnvoGOjJWOjFVQ3PwcCKuIXoqcykJmswadtw2H7T5FVy938nS1PL5EUpY6zkqxNNIGwPKY8yHwlK5l1IcL8HVptjlkR8cki7rbVCe1PCu1sopqcvVCMCETLz_4atkfGio8mR5iUC2LxWrwC9_wttTSD9na4_3p1hAm234nsjldAV81mo4B11ToeZHFhhmYBP30ux9kySkZt53SddhJjfO.WG41SPNDrQRc8EAisEL6j0ntxYYJNI8Rk8wk4icJ9nY&dib_tag=se&keywords=french%2Bbulldog%2Bwrinkle&qid=1740586788&sprefix=french%2Bbulldog%2Bwrinkle%2Caps%2C140&sr=8-9&th=1", "_blank", "noopener,noreferrer"),
  },
  {
    id: 6,
    name: "Wrinkle Paste and Wipes for Bulldogs",
    description: "An Interactive Cat Toys for Indoor Cats. It moves quickly on thick carpets, thin carpets, and hard floors. It is motion activated and rechargeable.",
    image: "../src/assets/img/twoPetsWrinklePadsYellow.png",
    rating: 4.4,
    categories: ["Pet Supplies", "Dog Grooming Wipes"],
    affiliateLink: () => window.open("https://www.amazon.com/Wrinkle-Bulldog-Frenchie-Dog-USA-Bulldog-Cleaning/dp/B09N42JRJM/ref=sr_1_1_sspa?crid=P7KG5P35Y9EJ&dib=eyJ2IjoiMSJ9.yAwpQQtils3_-l59zRId-TExm2KRdI2sQAckqa1rMe_PQwRzhZiabVwwXB3j80lZUvef_DytrQbaOherTpBLa3CaBozwwM5usud83wdZpFFHUw_tDa7ecARD308PsAKPHTawaqCI0vo1867MBPcpIMrdigdVkVAKR5Bpv6uDiqjc6nCHjQY0JbqfIUcOGvl5CUGE5RUogsPOJtT0eW6V9L5EryYjH4DMkNZMAVn6TZOCnvoGOjJWOjFVQ3PwcCKuIXoqcykJmswadtw2H7T5FXddOr2T-aqOm0F5NVfsmc4.cWDJX99jYct3v_jV975lb1FQU3ZMtQ0RLaAgHRCUj3Q&dib_tag=se&keywords=french%2Bbulldog%2Bwrinkle&qid=1740586788&rdc=1&sprefix=french%2Bbulldog%2Bwrinkle%2Caps%2C140&sr=8-1-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1", "_blank", "noopener,noreferrer"),
  },
  {
    id: 7,
    name: "Dog Wrinkle Cream for Bulldogs & Frenchies",
    description: "Elevate your cooking with our premium 10-piece stainless steel cookware set. Featuring tri-ply construction for even heat distribution, stay-cool handles, and oven-safe up to 500°F. Dishwasher safe for easy cleanup.",
    image: "../src/assets/img/yibesiWrinklePaste.png",
    rating: 4.8,
    categories: ["Pet Supplies", "Dog Itch Remedies"],
    affiliateLink: () => window.open("https://www.amazon.com/dp/B0DD7BC3TS/ref=sspa_dk_detail_4?psc=1&pf_rd_p=f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pf_rd_r=0Z3FX4TJ7YBWN3Z8QZC8&pd_rd_wg=sVBk5&pd_rd_w=eklbx&content-id=amzn1.sym.f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pd_rd_r=c623e574-9606-43ae-a90f-a46c372b2fc1&s=pet-supplies&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM", "_blank", "noopener,noreferrer"),
  },
  {
    id: 8,
    name: "Natural Dog Company Wrinkle Balm",
    description: "Work in comfort with our ergonomically designed office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable armrests to reduce strain during long work sessions. Supports up to 300 pounds.",
    image: "../src/assets/img/naturalDogCompanyBalm.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Itch Remedies"],
    affiliateLink: () => window.open("https://www.amazon.com/Natural-Dog-Company-All-Natural-Veterinarian-Approved/dp/B09BKYJP9Y/ref=sxin_16_pa_sp_search_thematic_sspa?content-id=amzn1.sym.c5787da2-212d-48eb-a894-9ea5a87adeb3%3Aamzn1.sym.c5787da2-212d-48eb-a894-9ea5a87adeb3&crid=P7KG5P35Y9EJ&cv_ct_cx=french%2Bbulldog%2Bwrinkle&keywords=french%2Bbulldog%2Bwrinkle&pd_rd_i=B09BKYJP9Y&pd_rd_r=d5389a41-feda-408c-bbd2-f6ad277c8e5d&pd_rd_w=GzNlw&pd_rd_wg=8sKnG&pf_rd_p=c5787da2-212d-48eb-a894-9ea5a87adeb3&pf_rd_r=Y599A1BJXTMPTQ03GKCV&qid=1740586788&sbo=RZvfv%2F%2FHxDF%2BO5021pAnSA%3D%3D&sprefix=french%2Bbulldog%2Bwrinkle%2Caps%2C140&sr=1-3-6024b2a3-78e4-4fed-8fed-e1613be3bcce-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9zZWFyY2hfdGhlbWF0aWM&th=1", "_blank", "noopener,noreferrer"),
  },
  {
    id: 9,
    name: "Natural Dog Company Wrinkle Balm Stick",
    description: "Take your music anywhere with our waterproof Bluetooth speaker. Delivering rich, immersive sound in a compact package with 20-hour battery life. Perfect for beach days, camping trips, or backyard gatherings.",
    image: "../src/assets/img/naturalDogCompanyBalm2.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Itch Remedies"],
    affiliateLink: () => window.open("https://www.amazon.com/dp/B07CJNZLFM/ref=sspa_dk_detail_0?pf_rd_p=f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pf_rd_r=0Z3FX4TJ7YBWN3Z8QZC8&pd_rd_wg=sVBk5&pd_rd_w=eklbx&content-id=amzn1.sym.f2f1cf8f-cab4-44dc-82ba-0ca811fb90cc&pd_rd_r=c623e574-9606-43ae-a90f-a46c372b2fc1&s=pet-supplies&sp_csd=d2lkZ2V0TmFtZT1zcF9kZXRhaWxfdGhlbWF0aWM&th=1", "_blank", "noopener,noreferrer"),
  },
  {
    id: 10,
    name: "Squishface Flexible Silicone Dog Wrinkle Paste Applicator",
    description: "Sleep in luxury with our 100% organic cotton bedding set. Includes a duvet cover, fitted sheet, and two pillowcases in a breathable 400 thread count weave. Hypoallergenic and sustainably sourced for eco-conscious comfort.",
    image: "../src/assets/img/squishfaceApplicator.png",
    rating: 4.4,
    categories: ["Pet Supplies", "Dog Eye Care"],
    affiliateLink: () => window.open("https://www.amazon.com/Squishface-Flexible-Silicone-Wrinkle-Applicator/dp/B09XY4PDRJ/ref=sr_1_12?crid=WTB8SH12YZX0&dib=eyJ2IjoiMSJ9.ayY8rDUym3c5DEtqUxodiV6s_ZDCk_y8723fsLEF4XX953JNlGbHrALm-TPWCkBNWo2JZU9BO_-dC7Q2qphNhq0qKzibAZZWBoEd4ucesmSrvL8uq6l5dbxEEwIU-mhzSpT4GibV25iabGKSlgz9QTbifnMQYUrwH4n84Da-Vc9clIc9ngedKWJTrqm8tKDrTsSalCpS1YFsOWWxSv559Gb4KLItrBtx59fGbqSUlQ2JekgYauH3MjDEUnywql5wUs4F8UnR7RwFCt2DDYoqBfFwf-RQ00E1qTcqaV0Uwa6fiKnKKI37gmw6TC3G9E1TL5cgp2rDtHGgIfyMDs-r7x3ADkcuCNCN8Z-0C5WDTt8.Znp3vzSsNQ-Ag0FqDLthpKtJTYzmYrVCjcmLzZFdkvA&dib_tag=se&keywords=french+bulldog+wrinkle&qid=1740590890&s=pet-supplies&sprefix=french+bulldog+wrinkle%2Cpets%2C238&sr=1-12", "_blank", "noopener,noreferrer"),
  },
  {
    id: 11,
    name: "Eye Envy Bulldog Wrinkle Cleaner & Nose Care Kit",
    description: "Elevate your culinary skills with our premium 8-piece chef knife set. Crafted from high-carbon stainless steel with ergonomic handles for precision cutting. Includes chef knife, bread knife, santoku, utility knife, and more in a stylish wooden block.",
    image: "../src/assets/img/envyEyeWinkleCareKit.png",
    rating: 4.6,
    categories: ["Pet Supplies", "Dog Itch Remedies"],
    affiliateLink: () => window.open("https://www.amazon.com/Eye-Envy-Bulldog-Wrinkle-Applicator/dp/B0CZ1WZQDC/ref=sr_1_17?crid=WTB8SH12YZX0&dib=eyJ2IjoiMSJ9.ayY8rDUym3c5DEtqUxodiV6s_ZDCk_y8723fsLEF4XX953JNlGbHrALm-TPWCkBNWo2JZU9BO_-dC7Q2qphNhq0qKzibAZZWBoEd4ucesmSrvL8uq6l5dbxEEwIU-mhzSpT4GibV25iabGKSlgz9QTbifnMQYUrwH4n84Da-Vc9clIc9ngedKWJTrqm8tKDrTsSalCpS1YFsOWWxSv559Gb4KLItrBtx59fGbqSUlQ2JekgYauH3MjDEUnywql5wUs4F8UnR7RwFCt2DDYoqBfFwf-RQ00E1qTcqaV0Uwa6fiKnKKI37gmw6TC3G9E1TL5cgp2rDtHGgIfyMDs-r7x3ADkcuCNCN8Z-0C5WDTt8.Znp3vzSsNQ-Ag0FqDLthpKtJTYzmYrVCjcmLzZFdkvA&dib_tag=se&keywords=french+bulldog+wrinkle&qid=1740590890&s=pet-supplies&sprefix=french+bulldog+wrinkle%2Cpets%2C238&sr=1-17", "_blank", "noopener,noreferrer"),
  },
  {
    id: 12,
    name: "Natural Dog Company Oatmeal Shampoo",
    description: "Work in comfort with our ergonomically designed office chair. Featuring adjustable lumbar support, breathable mesh back, and customizable armrests to reduce strain during long work sessions. Supports up to 300 pounds.",
    image: "../src/assets/img/naturalDogCompanyShampoo.png",
    rating: 4.5,
    categories: ["Pet Supplies", "Dog Shampoos"],
    affiliateLink: () => window.open("https://www.amazon.com/dp/B00W1QTLZG?ref=emc_p_m_5_i_atc&th=1", "_blank", "noopener,noreferrer"),
  },
];

function App() {
  // State to track the current page
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
    setPage(value);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* App Bar */}
      <AppBar position="fixed" sx={{ bgcolor: 'primary.main' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            French Bulldog Wrinkle Care
          </Typography>
        </Toolbar>
      </AppBar>
      {/* Toolbar placeholder to prevent content from hiding under the fixed AppBar */}
      <Toolbar />
      
      <Container maxWidth="lg" sx={{ pt: 6, pb: 2, mt: 2, position: 'relative' }}>
        <Paper elevation={0} sx={{ p: 3, mb: 4, bgcolor: 'transparent' }}>
          <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 700, mb: 4 }}>
            French Bulldog Wrinkle Care Products
          </Typography>
          <Typography variant="h6" component="h2" gutterBottom align="center" sx={{ fontWeight: 500, mb: 4 }}>
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
                    
                    {/* <ProductPrice variant="h6">
                      ${product.price.toFixed(2)}
                    </ProductPrice> */}
                    
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

export default App;
