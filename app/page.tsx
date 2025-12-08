'use client';

import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Fade,
  Zoom,
  Grow,
  Stepper,
  Step,
  StepLabel,
  Chip,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useTheme,
  alpha,
  Grid
} from '@mui/material';

import {
  Favorite,
  Cake,
  Star,
  MusicNote,
  EmojiEmotions,
  Send,
  Celebration,
  LocalFlorist,
  Restaurant,
  CardGiftcard,
  FavoriteBorder,
  PhotoCamera,
  Close,
  ArrowForward,
  FlashOn
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ColorfulButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
  border: 0,
  borderRadius: 50,
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold',
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 10px 2px ${alpha(theme.palette.primary.main, 0.5)}`,
  },
  transition: 'all 0.3s ease-in-out',
}));

const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: 20,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)} 0%, ${alpha(theme.palette.secondary.light, 0.1)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const FloatingHeart = styled(Box)(({ theme }) => ({
  position: 'absolute',
  animation: 'float 3s ease-in-out infinite',
  color: theme.palette.error.main,
  '@keyframes float': {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-20px)' },
  },
}));

const steps = ['Enter Details', 'Customize Wish', 'Preview & Send'];

export default function BirthdayWishPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const [formData, setFormData] = useState({
    girlfriendName: '',
    yourName: '',
    yearsTogether: '',
    specialMemory: '',
    favoriteColor: '#ff4081',
    message: 'You make every moment magical. Happy Birthday to the most amazing person in my life!',
    date: new Date().toISOString().split('T')[0],
  });

  const [wishData, setWishData] = useState({
    showMusic: true,
    showPhotos: true,
    showCountdown: true,
    animationType: 'hearts',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleWishChange = (name: string, value: any) => {
    setWishData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      setShowWish(true);
      setOpenDialog(true);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = () => {
    setSnackbar({ open: true, message: 'Birthday wish sent successfully! 🎉' });
    setOpenDialog(false);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Your Girlfriend's Name"
                name="girlfriendName"
                value={formData.girlfriendName}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Enter the special name 💖"
                InputProps={{
                  startAdornment: <Favorite sx={{ mr: 1, color: 'error.main' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Your Name"
                name="yourName"
                value={formData.yourName}
                onChange={handleChange}
                required
                variant="outlined"
                helperText="Your name here 😊"
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Years Together"
                name="yearsTogether"
                value={formData.yearsTogether}
                onChange={handleChange}
                type="number"
                variant="outlined"
                helperText="How many wonderful years?"
                InputProps={{
                  startAdornment: <Star sx={{ mr: 1, color: 'warning.main' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Birthday Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                helperText="Select the special date"
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Special Memory"
                name="specialMemory"
                value={formData.specialMemory}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
                helperText="Share a beautiful memory together"
                placeholder="That time when we..."
              />
            </Grid>
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Your Birthday Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                helperText="Write from your heart 💌"
                InputProps={{
                  startAdornment: <EmojiEmotions sx={{ mr: 1, color: 'primary.main' }} />,
                }}
              />
            </Grid>
            <Grid size={{ xs: 12 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocalFlorist /> Customize Your Wish
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2 }}>
                <Chip
                  icon={<MusicNote />}
                  label="Background Music"
                  color={wishData.showMusic ? 'primary' : 'default'}
                  onClick={() => handleWishChange('showMusic', !wishData.showMusic)}
                  variant={wishData.showMusic ? 'filled' : 'outlined'}
                />
                <Chip
                  icon={<PhotoCamera />}
                  label="Photo Gallery"
                  color={wishData.showPhotos ? 'primary' : 'default'}
                  onClick={() => handleWishChange('showPhotos', !wishData.showPhotos)}
                  variant={wishData.showPhotos ? 'filled' : 'outlined'}
                />
                <Chip
                  icon={<FlashOn />}
                  label="Countdown"
                  color={wishData.showCountdown ? 'primary' : 'default'}
                  onClick={() => handleWishChange('showCountdown', !wishData.showCountdown)}
                  variant={wishData.showCountdown ? 'filled' : 'outlined'}
                />
              </Box>
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Celebration /> Preview Your Birthday Wish
            </Typography>
            <Box sx={{ p: 2, border: `2px dashed ${theme.palette.primary.main}`, borderRadius: 2, mt: 2 }}>
              <Typography variant="body1" paragraph>
                Dear <strong>{formData.girlfriendName || '[Her Name]'}</strong>,
              </Typography>
              <Typography variant="body1" paragraph>
                {formData.message}
              </Typography>
              {formData.specialMemory && (
                <Typography variant="body2" color="text.secondary" paragraph sx={{ fontStyle: 'italic' }}>
                  Remember when: {formData.specialMemory}
                </Typography>
              )}
              <Typography variant="body1" paragraph>
                With all my love,
              </Typography>
              <Typography variant="h6" color="primary">
                {formData.yourName || '[Your Name]'}
              </Typography>
            </Box>
          </Box>
        );
      
      default:
        return null;
    }
  };

  const renderBirthdayWish = () => (
    <Fade in={showWish} timeout={1000}>
      <Box sx={{ textAlign: 'center', py: 4, position: 'relative', overflow: 'hidden' }}>
        {/* Animated background elements */}
        <FloatingHeart sx={{ top: 50, left: 50 }}>
          <Favorite fontSize="large" />
        </FloatingHeart>
        <FloatingHeart sx={{ top: 100, right: 100, animationDelay: '1s' }}>
          <Cake fontSize="large" />
        </FloatingHeart>
        <FloatingHeart sx={{ bottom: 150, left: 150, animationDelay: '2s' }}>
          <Star fontSize="large" />
        </FloatingHeart>

        {/* Main content */}
        <Grow in={showWish} timeout={1500}>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              sx={{
                background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 'bold',
                mb: 2,
              }}
            >
              🎂 Happy Birthday! 🎉
            </Typography>
            
            <Typography variant="h3" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
              To My Beautiful {formData.girlfriendName} 💖
            </Typography>

            <Zoom in={showWish} timeout={2000}>
              <Card sx={{ maxWidth: 600, mx: 'auto', mb: 4, borderRadius: 4 }}>
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="div"
                    sx={{
                      height: 200,
                      background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
                      {new Date(formData.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </Typography>
                  </CardMedia>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -20,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: 'white',
                      borderRadius: '50%',
                      padding: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                      <Cake fontSize="large" />
                    </Avatar>
                  </Box>
                </Box>
                
                <CardContent sx={{ pt: 6 }}>
                  <Typography variant="h5" gutterBottom color="primary">
                    My Dearest {formData.girlfriendName},
                  </Typography>
                  
                  <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
                    On this special day, I want you to know how incredibly grateful I am to have you in my life.
                    You bring so much joy, love, and happiness into my world every single day.
                  </Typography>

                  <Divider sx={{ my: 2 }} />
                  
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <Favorite color="error" />
                      </ListItemIcon>
                      <ListItemText primary="Your smile lights up my world" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Star color="warning" />
                      </ListItemIcon>
                      <ListItemText primary="You make every moment magical" />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <EmojiEmotions color="primary" />
                      </ListItemIcon>
                      <ListItemText primary="Your happiness means everything to me" />
                    </ListItem>
                  </List>

                  {formData.yearsTogether && (
                    <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 2 }}>
                      <Typography variant="h6" color="secondary">
                        {formData.yearsTogether} amazing years together and counting! 💕
                      </Typography>
                    </Box>
                  )}

                  {formData.specialMemory && (
                    <Box sx={{ mt: 3, p: 2, borderLeft: `4px solid ${theme.palette.primary.main}`, bgcolor: 'background.default' }}>
                      <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                        "Remember when {formData.specialMemory}"
                      </Typography>
                    </Box>
                  )}

                  <Box sx={{ mt: 4, p: 3, bgcolor: alpha(theme.palette.primary.light, 0.1), borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      {formData.message}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4, flexWrap: 'wrap' }}>
                    <Chip icon={<Restaurant />} label="Dinner Date" color="primary" variant="outlined" />
                    <Chip icon={<LocalFlorist />} label="Flowers Delivery" color="secondary" variant="outlined" />
                    <Chip icon={<CardGiftcard />} label="Special Gift" color="success" variant="outlined" />
                  </Box>

                  <Typography variant="h5" sx={{ mt: 4, mb: 2, color: 'secondary.main' }}>
                    Forever Yours,
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                    {formData.yourName}
                  </Typography>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 1 }}>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Favorite key={i} sx={{ color: 'error.main', fontSize: 40, animation: `pulse 1.${i}s infinite` }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Zoom>

            <ColorfulButton
              onClick={() => setOpenDialog(true)}
              endIcon={<Send />}
              sx={{ mt: 2 }}
            >
              Send Birthday Wish
            </ColorfulButton>
          </Box>
        </Grow>
      </Box>
    </Fade>
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 'bold',
            background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
          }}
        >
          <Celebration fontSize="large" />
          Birthday Wishes Creator
          <Celebration fontSize="large" />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Create a magical birthday surprise for your special someone ✨
        </Typography>
      </Box>

      {!showWish ? (
        <>
          {/* Stepper */}
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Form Section */}
          <AnimatedPaper elevation={3}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowForward sx={{ transform: 'rotate(180deg)' }} />}
              >
                Back
              </Button>
              <ColorfulButton
                onClick={handleNext}
                endIcon={activeStep === steps.length - 1 ? <Celebration /> : <ArrowForward />}
              >
                {activeStep === steps.length - 1 ? 'Create Birthday Wish' : 'Next'}
              </ColorfulButton>
            </Box>
          </AnimatedPaper>
        </>
      ) : (
        renderBirthdayWish()
      )}

      {/* Preview Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Your Birthday Wish is Ready! 🎁</Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ p: 2 }}>
            <Typography variant="body1" paragraph>
              Your beautiful birthday wish for <strong>{formData.girlfriendName}</strong> is ready to be shared!
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <FavoriteBorder color="error" />
                </ListItemIcon>
                <ListItemText primary="Personalized message" secondary="Tailored specifically for her" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Cake color="primary" />
                </ListItemIcon>
                <ListItemText primary="Birthday date" secondary={new Date(formData.date).toLocaleDateString()} />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Star color="warning" />
                </ListItemIcon>
                <ListItemText 
                  primary="Special features" 
                  secondary={`Music: ${wishData.showMusic ? 'Yes' : 'No'}, Photos: ${wishData.showPhotos ? 'Yes' : 'No'}`} 
                />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Edit More</Button>
          <ColorfulButton onClick={handleSubmit} startIcon={<Send />}>
            Send to {formData.girlfriendName}
          </ColorfulButton>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 8, pt: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">
          Made with <Favorite sx={{ color: 'error.main', fontSize: 14, verticalAlign: 'middle' }} /> for your special someone
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Every day with you is a celebration 💝
        </Typography>
      </Box>
    </Container>
  );
}