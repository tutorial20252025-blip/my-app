'use client';

import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Box,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Paper,
  IconButton,
  Fade,
  Grow,
  Slide,
  Zoom,
  Chip,
  Divider,
  Avatar,
  useTheme,
  alpha,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CelebrationIcon from '@mui/icons-material/Celebration';
import CakeIcon from '@mui/icons-material/Cake';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SparklesIcon from '@mui/icons-material/AutoAwesome';
import StarsIcon from '@mui/icons-material/Stars';
import HeartBrokenIcon from '@mui/icons-material/FavoriteBorder';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

// Premium animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
`;

const shimmerAnimation = keyframes`
  0% { background-position: -1000px 0; }
  100% { background-position: 1000px 0; }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 20px rgba(255, 105, 180, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 105, 180, 0.8); }
`;

const gradientFlow = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Premium Styled Components
const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '32px',
  boxShadow: `
    0 8px 32px rgba(31, 38, 135, 0.37),
    inset 0 1px 0 rgba(255, 255, 255, 0.2)
  `,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #ff6b9d, #ff8e53, #ff6b9d)',
    backgroundSize: '200% 100%',
    animation: `${shimmerAnimation} 3s infinite linear`,
  },
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8e53 100%)',
  backgroundSize: '200% 200%',
  color: 'white',
  fontWeight: 700,
  padding: '16px 40px',
  borderRadius: '50px',
  fontSize: '1.1rem',
  textTransform: 'none',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  overflow: 'hidden',
  animation: `${pulseGlow} 2s infinite`,
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.7s',
  },
  '&:hover': {
    transform: 'translateY(-4px) scale(1.02)',
    boxShadow: '0 20px 40px rgba(255, 107, 157, 0.4)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(-2px) scale(1.01)',
  },
}));

const FloatingHeart = styled(motion.div)({
  position: 'absolute',
  fontSize: '24px',
  color: '#ff6b9d',
  pointerEvents: 'none',
  zIndex: 1000,
});

const Sparkle = styled('div')({
  position: 'absolute',
  width: '6px',
  height: '6px',
  background: 'radial-gradient(circle, #fff 30%, transparent 70%)',
  borderRadius: '50%',
  filter: 'blur(1px)',
});

const MessageDisplay = styled(Paper)(({ theme }) => ({
  background: `linear-gradient(135deg, 
    ${alpha(theme.palette.background.paper, 0.9)} 0%,
    ${alpha(theme.palette.background.paper, 0.7)} 100%)`,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: '24px',
  padding: theme.spacing(4),
  position: 'relative',
  overflow: 'hidden',
  minHeight: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ff6b9d" fill-opacity="0.05" fill-rule="evenodd"/%3E%3C/svg%3E")',
    opacity: 0.3,
  },
}));

export default function PremiumBirthdayGreeting() {
  const [recipientType, setRecipientType] = useState('girlfriend');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [message, setMessage] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [copied, setCopied] = useState(false);
  const { width, height } = useWindowSize();
  const theme = useTheme();

  const recipientOptions = [
    { value: 'girlfriend', label: 'My Beautiful Girlfriend 💖', color: '#ff6b9d', emoji: '👸' },
    { value: 'wife', label: 'My Amazing Wife 👰', color: '#ff8e53', emoji: '💍' },
    { value: 'partner', label: 'My Soulmate 💫', color: '#6a11cb', emoji: '🌟' },
    { value: 'love', label: 'My One & Only 💕', color: '#ff416c', emoji: '🥰' },
    { value: 'queen', label: 'My Queen 👑', color: '#ffd166', emoji: '👑' },
  ];

  // Create floating hearts
  useEffect(() => {
    if (isSubmitted) {
      const interval = setInterval(() => {
        const newHeart = {
          id: Date.now(),
          x: Math.random() * 100,
          y: 100,
        };
        setHearts(prev => [...prev, newHeart]);
        setTimeout(() => {
          setHearts(prev => prev.filter(h => h.id !== newHeart.id));
        }, 3000);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isSubmitted]);

  // Create sparkles
  useEffect(() => {
    const interval = setInterval(() => {
      if (isSubmitted) {
        const newSparkle = {
          id: Date.now(),
          x: Math.random() * 100,
          y: Math.random() * 100,
        };
        setSparkles(prev => [...prev.slice(-20), newSparkle]);
        setTimeout(() => {
          setSparkles(prev => prev.filter(s => s.id !== newSparkle.id));
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [isSubmitted]);

  const generateRomanticMessage = () => {
    const romanticMessages = {
      girlfriend: [
        `My dearest ${name}, on your ${age}th birthday, I want you to know that you are the most incredible person I've ever met. Every moment with you feels like a beautiful dream. Happy Birthday, my love! 💖`,
        
        `Happy ${age}th Birthday to the woman who stole my heart! ${name}, you make every day brighter just by being in it. You're not just my girlfriend, you're my everything. 🥰`,
        
        `To my beautiful ${name}, as you turn ${age}, I promise to love you more with each passing day. You are the melody to my heart's song. Happy Birthday, my angel! ✨`,
        
        `On your ${age}th birthday, I want to remind you how extraordinary you are, ${name}. You're the reason I believe in magic and forever. Happy Birthday, my precious love! 💫`,
      ],
      wife: [
        `Happy ${age}th Birthday to my beautiful wife, ${name}! Every year with you is a blessing I don't deserve. You complete me in ways I never knew possible. 💍`,
        
        `To my wife, my partner, my everything - happy ${age}th birthday, ${name}! Our love story is my favorite, and you are my favorite chapter. 👰`,
      ],
      partner: [
        `Happy ${age}th Birthday, ${name}! You're not just my partner, you're my home. Thank you for being the most amazing person I know. 💫`,
      ],
      love: [
        `To the love of my life, ${name}, happy ${age}th birthday! You are the sunshine that brightens my darkest days. 💕`,
      ],
      queen: [
        `Happy ${age}th Birthday to my queen, ${name}! You deserve all the love and happiness in the universe. Today and always, I'm yours. 👑`,
      ],
    };

    const messages = romanticMessages[recipientType as keyof typeof romanticMessages] || romanticMessages.girlfriend;
    const selectedMessage = messages[Math.floor(Math.random() * messages.length)];
    
    let finalMessage = selectedMessage;
    if (message) {
      finalMessage += `\n\n💌 Special Note: ${message}`;
    }
    
    // Add romantic closing
    finalMessage += `\n\nForever yours,\nYour loving ${recipientType === 'girlfriend' ? 'boyfriend' : 'partner'} 💝`;

    setGeneratedMessage(finalMessage);
    setIsSubmitted(true);
    setShowConfetti(true);
    
    // Enhanced confetti
    setTimeout(() => {
      setShowConfetti(false);
    }, 8000);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Happy Birthday ${name}!`,
          text: generatedMessage,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      handleCopy();
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 50%, #16213e 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            radial-gradient(circle at 20% 80%, rgba(255, 107, 157, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 142, 83, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(106, 17, 203, 0.1) 0%, transparent 50%)
          `,
        },
      }}
    >
      {/* Animated background elements */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        {[...Array(20)].map((_, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              width: '2px',
              height: '2px',
              background: '#fff',
              borderRadius: '50%',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `${floatAnimation} ${3 + Math.random() * 4}s infinite ease-in-out`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </Box>

      {/* Floating Hearts */}
      <AnimatePresence>
        {hearts.map(heart => (
          <FloatingHeart
            key={heart.id}
            initial={{ y: heart.y, x: `${heart.x}%`, opacity: 1, scale: 0 }}
            animate={{ 
              y: -100, 
              opacity: 0,
              scale: [0, 1, 1, 0],
              rotate: [0, 20, -20, 0]
            }}
            transition={{ duration: 3, ease: "easeOut" }}
            exit={{ opacity: 0 }}
          >
            <FavoriteIcon />
          </FloatingHeart>
        ))}
      </AnimatePresence>

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <Sparkle
          key={sparkle.id}
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
          }}
        />
      ))}

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          recycle={true}
          numberOfPieces={300}
          gravity={0.08}
          colors={['#ff6b9d', '#ff8e53', '#6a11cb', '#2575fc', '#ffd166']}
          style={{ position: 'fixed' }}
        />
      )}

      <Container maxWidth="lg" sx={{ py: 8, position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Box textAlign="center" mb={8}>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.8rem', md: '4.5rem' },
                fontWeight: 900,
                background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8e53 50%, #ffd166 100%)',
                backgroundSize: '200% 200%',
                animation: `${gradientFlow} 3s ease infinite`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
                textShadow: '0 4px 30px rgba(255, 107, 157, 0.3)',
              }}
            >
              💝 Birthday Love Letter 💝
            </Typography>
            
            <Typography
              variant="h5"
              sx={{
                color: alpha(theme.palette.common.white, 0.8),
                mb: 3,
                fontWeight: 300,
                letterSpacing: '1px',
              }}
            >
              Create the most beautiful birthday message for your special someone
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
              <CelebrationIcon sx={{ fontSize: 40, color: '#ff6b9d', animation: `${floatAnimation} 3s infinite` }} />
              <StarsIcon sx={{ fontSize: 40, color: '#ff8e53', animation: `${floatAnimation} 3s infinite 0.5s` }} />
              <SparklesIcon sx={{ fontSize: 40, color: '#ffd166', animation: `${floatAnimation} 3s infinite 1s` }} />
            </Box>
          </Box>
        </motion.div>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Input Form */}
          <Box sx={{ flex: 1 }}>
            <Slide direction="right" in={!isSubmitted} mountOnEnter unmountOnExit>
              <GlassCard>
                <CardContent sx={{ p: { xs: 3, md: 4 } }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                    <Avatar
                      sx={{
                        background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8e53 100%)',
                        width: 56,
                        height: 56,
                      }}
                    >
                      <FavoriteIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
                        Create Your Love Letter
                      </Typography>
                      <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.7) }}>
                        Fill in the details to create a magical message
                      </Typography>
                    </Box>
                  </Box>

                  <FormControl fullWidth sx={{ mb: 3 }}>
                    <InputLabel sx={{ color: alpha(theme.palette.common.white, 0.8) }}>
                      Who is this for?
                    </InputLabel>
                    <Select
                      value={recipientType}
                      onChange={(e) => setRecipientType(e.target.value)}
                      label="Who is this for?"
                      sx={{
                        color: 'white',
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.3),
                          borderRadius: '16px',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.5),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff6b9d',
                          borderWidth: '2px',
                        },
                      }}
                      MenuProps={{
                        PaperProps: {
                          sx: {
                            background: 'rgba(26, 26, 46, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                          },
                        },
                      }}
                    >
                      {recipientOptions.map((option) => (
                        <MenuItem
                          key={option.value}
                          value={option.value}
                          sx={{
                            color: 'white',
                            '&:hover': {
                              background: alpha(option.color, 0.2),
                            },
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Box sx={{ fontSize: '1.5rem' }}>{option.emoji}</Box>
                            <Typography>{option.label}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    label="Her Beautiful Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      sx: {
                        color: 'white',
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.5),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff6b9d',
                          borderWidth: '2px',
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: alpha(theme.palette.common.white, 0.8) },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Her Age (Just a number!)"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    sx={{ mb: 3 }}
                    InputProps={{
                      sx: {
                        color: 'white',
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.5),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff6b9d',
                          borderWidth: '2px',
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: alpha(theme.palette.common.white, 0.8) },
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Your Personal Message (Optional but special!)"
                    multiline
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    sx={{ mb: 4 }}
                    InputProps={{
                      sx: {
                        color: 'white',
                        borderRadius: '16px',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.3),
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: alpha(theme.palette.common.white, 0.5),
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#ff6b9d',
                          borderWidth: '2px',
                        },
                      },
                    }}
                    InputLabelProps={{
                      sx: { color: alpha(theme.palette.common.white, 0.8) },
                    }}
                  />

                  <Box textAlign="center">
                    <GradientButton
                      onClick={generateRomanticMessage}
                      disabled={!name || !age}
                      startIcon={<SendIcon />}
                      endIcon={<FavoriteIcon />}
                      size="large"
                    >
                      Create Magical Message ✨
                    </GradientButton>
                    
                    {(!name || !age) && (
                      <Typography
                        variant="caption"
                        sx={{
                          display: 'block',
                          mt: 2,
                          color: alpha(theme.palette.common.white, 0.6),
                        }}
                      >
                        ✨ Enter her name and age to create something magical
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </GlassCard>
            </Slide>
          </Box>

          {/* Message Display */}
          <Box sx={{ flex: 1 }}>
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="message"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <Box sx={{ position: 'relative' }}>
                    <MessageDisplay elevation={0}>
                      <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar
                              sx={{
                                background: 'linear-gradient(135deg, #ff6b9d 0%, #ff8e53 100%)',
                                width: 50,
                                height: 50,
                              }}
                            >
                              <FavoriteIcon />
                            </Avatar>
                            <Box>
                              <Typography variant="h6" sx={{ fontWeight: 700, color: '#ff6b9d' }}>
                                💝 For {name} 💝
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Happy {age}th Birthday
                              </Typography>
                            </Box>
                          </Box>
                          
                          <IconButton
                            onClick={() => setIsSubmitted(false)}
                            sx={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              color: 'white',
                              '&:hover': {
                                transform: 'rotate(90deg)',
                                transition: 'transform 0.3s',
                              },
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Box>

                        <Divider sx={{ my: 2, borderColor: alpha(theme.palette.divider, 0.2) }} />

                        <Box sx={{ p: 2 }}>
                          <Typography
                            sx={{
                              whiteSpace: 'pre-line',
                              fontSize: '1.1rem',
                              lineHeight: 1.8,
                              color: theme.palette.text.primary,
                              fontFamily: "'Playfair Display', serif",
                              textAlign: 'center',
                            }}
                          >
                            {generatedMessage}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 4 }}>
                          <Button
                            variant="contained"
                            onClick={handleCopy}
                            startIcon={<ContentCopyIcon />}
                            sx={{
                              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                              borderRadius: '25px',
                              px: 3,
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
                              },
                            }}
                          >
                            {copied ? 'Copied! 💖' : 'Copy Message'}
                          </Button>
                          
                          <Button
                            variant="outlined"
                            onClick={handleShare}
                            startIcon={<ShareIcon />}
                            sx={{
                              borderColor: '#ff6b9d',
                              color: '#ff6b9d',
                              borderRadius: '25px',
                              px: 3,
                              '&:hover': {
                                borderColor: '#ff8e53',
                                background: alpha('#ff6b9d', 0.1),
                              },
                            }}
                          >
                            Share
                          </Button>
                        </Box>

                        <Box textAlign="center" mt={4}>
                          <Chip
                            icon={<SparklesIcon />}
                            label="✨ Magical Message Created ✨"
                            sx={{
                              background: alpha('#ff6b9d', 0.1),
                              color: '#ff6b9d',
                              fontWeight: 600,
                              px: 2,
                            }}
                          />
                        </Box>
                      </Box>
                    </MessageDisplay>

                    {/* Decorative elements */}
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        background: 'radial-gradient(circle, rgba(255,107,157,0.2) 0%, transparent 70%)',
                        borderRadius: '50%',
                        animation: `${pulseGlow} 3s infinite`,
                      }}
                    />
                  </Box>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <GlassCard sx={{ height: '100%' }}>
                    <CardContent sx={{ 
                      height: '100%', 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      py: 8 
                    }}>
                      <Box sx={{ 
                        width: 120, 
                        height: 120, 
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(255,107,157,0.1) 0%, rgba(255,142,83,0.1) 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mb: 4,
                        animation: `${pulseGlow} 2s infinite`,
                      }}>
                        <HeartBrokenIcon sx={{ fontSize: 60, color: alpha('#ff6b9d', 0.5) }} />
                      </Box>
                      
                      <Typography variant="h5" sx={{ color: 'white', mb: 2, textAlign: 'center' }}>
                        Your Love Letter Awaits ✨
                      </Typography>
                      
                      <Typography sx={{ 
                        color: alpha(theme.palette.common.white, 0.7), 
                        textAlign: 'center',
                        maxWidth: 400 
                      }}>
                        Fill in the details about your special someone to create a beautiful, 
                        personalized birthday message that will make her heart melt 💖
                      </Typography>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </Box>
        </Box>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <Box textAlign="center" mt={8}>
            <Typography variant="body2" sx={{ color: alpha(theme.palette.common.white, 0.5) }}>
              Made with 💖 • Every message is uniquely generated with love
            </Typography>
            <Typography variant="caption" sx={{ color: alpha(theme.palette.common.white, 0.3), display: 'block', mt: 1 }}>
              She'll absolutely love it! Promise 😉
            </Typography>
          </Box>
        </motion.div>
      </Container>
    </Box>
  );
}