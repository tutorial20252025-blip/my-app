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
  IconButton,
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  Slider,
  Rating,
  Switch,
  LinearProgress,
  CircularProgress,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Badge,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import {
  Person,
  School,
  Computer,
  Email,
  Phone,
  CalendarToday,
  LocationOn,
  Code,
  Star,
  CheckCircle,
  Cancel,
  Edit,
  Delete,
  Download,
  Upload,
  Search,
  FilterList,
  Sort,
  Group,
  Assignment,
  Book,
  Schedule,
  Payment,
  Security,
  Lock,
  VerifiedUser,
  ArrowForward,
  ArrowBack,
  ExpandMore,
  Add,
  Remove,
  Visibility,
  VisibilityOff,
  Notifications,
  Favorite,
  TrendingUp,
  Analytics,
  Close  // ADDED THIS IMPORT
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const ColorfulButton = styled(Button)(({ theme }) => ({
  background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.info.main} 90%)`,
  border: 0,
  borderRadius: 8,
  color: 'white',
  height: 48,
  padding: '0 30px',
  fontWeight: 'bold',
  boxShadow: `0 3px 5px 2px ${alpha(theme.palette.primary.main, 0.2)}`,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 5px 15px 2px ${alpha(theme.palette.primary.main, 0.3)}`,
  },
  transition: 'all 0.3s ease-in-out',
}));

const ProfessionalPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(2),
  borderRadius: 12,
  background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.95)} 0%, ${alpha(theme.palette.grey[50], 0.1)} 100%)`,
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

const StudentCard = styled(Card)(({ theme }) => ({
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: `0 8px 25px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
}));

const steps = ['Personal Information', 'Academic Details', 'Course Selection', 'Review & Submit'];

const programmingLanguages = [
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Ruby',
  'Go',
  'Rust',
  'TypeScript',
  'Swift',
  'Kotlin'
];

const courseModules = [
  { id: 'web-dev', name: 'Web Development', duration: '12 weeks', level: 'Intermediate' },
  { id: 'mobile-dev', name: 'Mobile Development', duration: '10 weeks', level: 'Advanced' },
  { id: 'data-science', name: 'Data Science', duration: '14 weeks', level: 'Intermediate' },
  { id: 'ai-ml', name: 'AI & Machine Learning', duration: '16 weeks', level: 'Advanced' },
  { id: 'devops', name: 'DevOps & Cloud', duration: '10 weeks', level: 'Intermediate' },
  { id: 'cybersecurity', name: 'Cybersecurity', duration: '12 weeks', level: 'Advanced' },
];

const timeSlots = [
  'Monday 9:00 AM - 12:00 PM',
  'Tuesday 2:00 PM - 5:00 PM',
  'Wednesday 6:00 PM - 9:00 PM',
  'Thursday 10:00 AM - 1:00 PM',
  'Friday 3:00 PM - 6:00 PM',
  'Saturday 9:00 AM - 12:00 PM'
];

export default function StudentRegistrationPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' | 'info' | 'warning' });
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState<any[]>([]);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    address: '',
    city: '',
    country: '',
    
    // Academic Details
    highestEducation: '',
    institution: '',
    graduationYear: '',
    gpa: '',
    programmingExperience: 0,
    knownLanguages: [] as string[],
    githubProfile: '',
    linkedinProfile: '',
    
    // Course Selection
    selectedCourses: [] as string[],
    preferredTimeSlot: '',
    startDate: '',
    paymentPlan: 'monthly',
    scholarship: false,
    scholarshipDetails: '',
    
    // Account
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSelectChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleLanguageToggle = (language: string) => {
    setFormData(prev => ({
      ...prev,
      knownLanguages: prev.knownLanguages.includes(language)
        ? prev.knownLanguages.filter(l => l !== language)
        : [...prev.knownLanguages, language]
    }));
  };

  const handleCourseToggle = (courseId: string) => {
    setFormData(prev => ({
      ...prev,
      selectedCourses: prev.selectedCourses.includes(courseId)
        ? prev.selectedCourses.filter(c => c !== courseId)
        : [...prev.selectedCourses, courseId]
    }));
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
    } else {
      handleSubmitRegistration();
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmitRegistration = () => {
    // Validate form
    if (!formData.firstName || !formData.email || !formData.termsAccepted) {
      setSnackbar({ open: true, message: 'Please fill all required fields and accept terms!', severity: 'error' });
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setSnackbar({ open: true, message: 'Passwords do not match!', severity: 'error' });
      return;
    }

    const newStudent = {
      id: `STU${Date.now()}`,
      ...formData,
      registrationDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      progress: 0
    };

    setStudents(prev => [...prev, newStudent]);
    setSnackbar({ open: true, message: 'Registration submitted successfully! 🎉', severity: 'success' });
    setOpenDialog(true);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      address: '',
      city: '',
      country: '',
      highestEducation: '',
      institution: '',
      graduationYear: '',
      gpa: '',
      programmingExperience: 0,
      knownLanguages: [],
      githubProfile: '',
      linkedinProfile: '',
      selectedCourses: [],
      preferredTimeSlot: '',
      startDate: '',
      paymentPlan: 'monthly',
      scholarship: false,
      scholarshipDetails: '',
      username: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
    });
    setActiveStep(0);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="First Name *"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Person sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Last Name *"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Email *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Email sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <Phone sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <CalendarToday sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  variant="outlined"
                  InputProps={{
                    startAdornment: <LocationOn sx={{ mr: 1, color: 'primary.main' }} />,
                  }}
                />
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                multiline
                rows={2}
                variant="outlined"
              />
            </Box>
          </Box>
        );
      
      case 1:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Highest Education</InputLabel>
                  <Select
                    name="highestEducation"
                    value={formData.highestEducation}
                    onChange={(e) => handleSelectChange('highestEducation', e.target.value)}
                    label="Highest Education"
                    startAdornment={<School sx={{ mr: 1, color: 'primary.main' }} />}
                  >
                    <MenuItem value="high-school">High School</MenuItem>
                    <MenuItem value="bachelor">Bachelor's Degree</MenuItem>
                    <MenuItem value="master">Master's Degree</MenuItem>
                    <MenuItem value="phd">PhD</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Institution"
                  name="institution"
                  value={formData.institution}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Graduation Year"
                  name="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ min: "1900", max: "2030" }}
                />
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="GPA"
                  name="gpa"
                  type="number"
                  value={formData.gpa}
                  onChange={handleChange}
                  variant="outlined"
                  inputProps={{ step: "0.01", min: "0", max: "4.0" }}
                />
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Typography variant="subtitle1" gutterBottom>
                Programming Experience (Years)
              </Typography>
              <Slider
                value={formData.programmingExperience}
                onChange={(e, value) => handleSelectChange('programmingExperience', value)}
                valueLabelDisplay="auto"
                step={0.5}
                marks
                min={0}
                max={10}
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                <Typography variant="caption" color="text.secondary">Beginner</Typography>
                <Typography variant="caption" color="text.secondary">Expert</Typography>
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <Typography variant="subtitle1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Code /> Known Programming Languages
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {programmingLanguages.map((language) => (
                  <Chip
                    key={language}
                    label={language}
                    color={formData.knownLanguages.includes(language) ? 'primary' : 'default'}
                    onClick={() => handleLanguageToggle(language)}
                    variant={formData.knownLanguages.includes(language) ? 'filled' : 'outlined'}
                    icon={<Star sx={{ fontSize: 16 }} />}
                  />
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="GitHub Profile"
                  name="githubProfile"
                  value={formData.githubProfile}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="https://github.com/username"
                />
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="LinkedIn Profile"
                  name="linkedinProfile"
                  value={formData.linkedinProfile}
                  onChange={handleChange}
                  variant="outlined"
                  placeholder="https://linkedin.com/in/username"
                />
              </Box>
            </Box>
          </Box>
        );
      
      case 2:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ flex: '1 1 100%' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Book /> Select Course Modules
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Choose the modules you want to enroll in (multiple selections allowed)
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {courseModules.map((module) => (
                  <Box key={module.id} sx={{ flex: '1 1 300px' }}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        border: formData.selectedCourses.includes(module.id) 
                          ? `2px solid ${theme.palette.primary.main}` 
                          : '2px solid transparent',
                        transition: 'all 0.3s'
                      }}
                      onClick={() => handleCourseToggle(module.id)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <Typography variant="h6" component="div">
                            {module.name}
                          </Typography>
                          <CheckCircle 
                            color={formData.selectedCourses.includes(module.id) ? 'primary' : 'disabled'} 
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                          Duration: {module.duration}
                        </Typography>
                        <Chip 
                          label={module.level} 
                          size="small" 
                          sx={{ mt: 1 }}
                          color={module.level === 'Advanced' ? 'secondary' : 'default'}
                        />
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              <Box sx={{ flex: '1 1 300px' }}>
                <FormControl fullWidth variant="outlined">
                  <InputLabel>Preferred Time Slot</InputLabel>
                  <Select
                    name="preferredTimeSlot"
                    value={formData.preferredTimeSlot}
                    onChange={(e) => handleSelectChange('preferredTimeSlot', e.target.value)}
                    label="Preferred Time Slot"
                    startAdornment={<Schedule sx={{ mr: 1, color: 'primary.main' }} />}
                  >
                    {timeSlots.map((slot, index) => (
                      <MenuItem key={index} value={slot}>{slot}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Box sx={{ flex: '1 1 300px' }}>
                <TextField
                  fullWidth
                  label="Preferred Start Date"
                  name="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={handleChange}
                  variant="outlined"
                  InputLabelProps={{ shrink: true }}
                />
              </Box>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Payment Plan</FormLabel>
                <RadioGroup
                  row
                  name="paymentPlan"
                  value={formData.paymentPlan}
                  onChange={handleChange}
                >
                  <FormControlLabel value="monthly" control={<Radio />} label="Monthly Payment" />
                  <FormControlLabel value="quarterly" control={<Radio />} label="Quarterly Payment" />
                  <FormControlLabel value="full" control={<Radio />} label="Full Payment (10% discount)" />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ flex: '1 1 100%' }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.scholarship}
                    onChange={(e) => handleSelectChange('scholarship', e.target.checked)}
                    color="primary"
                  />
                }
                label="Apply for Scholarship"
              />
              {formData.scholarship && (
                <TextField
                  fullWidth
                  label="Scholarship Details"
                  name="scholarshipDetails"
                  value={formData.scholarshipDetails}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  variant="outlined"
                  sx={{ mt: 2 }}
                  placeholder="Please explain why you should receive a scholarship..."
                />
              )}
            </Box>
          </Box>
        );
      
      case 3:
        return (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VerifiedUser /> Review Your Registration
            </Typography>
            
            <Accordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">Personal Information</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Name:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.firstName} {formData.lastName}</Box>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Email:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.email}</Box>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Phone:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.phone || 'Not provided'}</Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">Academic Details</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Education:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.highestEducation || 'Not provided'}</Box>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Experience:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.programmingExperience} years</Box>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Languages:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.knownLanguages.join(', ') || 'None'}</Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">Course Selection</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {formData.selectedCourses.map(courseId => {
                    const course = courseModules.find(m => m.id === courseId);
                    return course ? (
                      <ListItem key={courseId}>
                        <ListItemIcon>
                          <CheckCircle color="primary" />
                        </ListItemIcon>
                        <ListItemText primary={course.name} secondary={`${course.duration} • ${course.level}`} />
                      </ListItem>
                    ) : null;
                  })}
                  {formData.selectedCourses.length === 0 && (
                    <Typography color="text.secondary">No courses selected</Typography>
                  )}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion>
              <AccordionSummary expandIcon={<ExpandMore />}>
                <Typography variant="subtitle1">Account Security</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Username:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>{formData.username}</Box>
                  <Box sx={{ flex: '1 1 200px' }}><strong>Password:</strong></Box>
                  <Box sx={{ flex: '1 1 200px' }}>••••••••</Box>
                </Box>
              </AccordionDetails>
            </Accordion>

            <Box sx={{ p: 2, bgcolor: alpha(theme.palette.info.light, 0.1), borderRadius: 2, mt: 1 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.termsAccepted}
                    onChange={handleChange}
                    name="termsAccepted"
                    color="primary"
                  />
                }
                label={
                  <Typography variant="body2">
                    I agree to the Terms & Conditions and Privacy Policy *
                  </Typography>
                }
              />
            </Box>
          </Box>
        );
      
      default:
        return null;
    }
  };

  const renderDashboard = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {/* Stats Cards */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
        <Box sx={{ flex: '1 1 200px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Total Students
                  </Typography>
                  <Typography variant="h4">{students.length}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                  <Group />
                </Avatar>
              </Box>
              <LinearProgress variant="determinate" value={75} sx={{ mt: 2 }} />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Active Courses
                  </Typography>
                  <Typography variant="h4">{courseModules.length}</Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.secondary.light }}>
                  <Book />
                </Avatar>
              </Box>
              <LinearProgress variant="determinate" value={60} sx={{ mt: 2 }} color="secondary" />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Completion Rate
                  </Typography>
                  <Typography variant="h4">85%</Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.success.light }}>
                  <TrendingUp />
                </Avatar>
              </Box>
              <LinearProgress variant="determinate" value={85} sx={{ mt: 2 }} color="success" />
            </CardContent>
          </Card>
        </Box>
        <Box sx={{ flex: '1 1 200px' }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography color="text.secondary" gutterBottom variant="h6">
                    Satisfaction
                  </Typography>
                  <Typography variant="h4">4.8</Typography>
                </Box>
                <Avatar sx={{ bgcolor: theme.palette.warning.light }}>
                  <Favorite />
                </Avatar>
              </Box>
              <Rating value={4.8} readOnly precision={0.1} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Search and Filters */}
      <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
        <Box sx={{ flex: '1 1 300px' }}>
          <TextField
            placeholder="Search students..."
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'action.active' }} />,
            }}
          />
        </Box>
        <Button variant="outlined" startIcon={<FilterList />}>
          Filters
        </Button>
        <Button variant="outlined" startIcon={<Sort />}>
          Sort
        </Button>
        <Button variant="contained" startIcon={<Download />}>
          Export
        </Button>
      </Box>

      {/* Students Table */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Courses</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.slice(0, 5).map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>{student.firstName} {student.lastName}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>
                  <Chip label={`${student.selectedCourses.length} courses`} size="small" />
                </TableCell>
                <TableCell>
                  <Chip 
                    label={student.status} 
                    color={student.status === 'active' ? 'success' : 'warning'} 
                    size="small" 
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress variant="determinate" value={student.progress} size={24} />
                    <Typography variant="body2">{student.progress}%</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <IconButton size="small" color="primary">
                    <Visibility />
                  </IconButton>
                  <IconButton size="small" color="secondary">
                    <Edit />
                  </IconButton>
                  <IconButton size="small" color="error">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
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
          <Computer fontSize="large" />
          Software Engineering Lecture Registration
          <Computer fontSize="large" />
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Register for our comprehensive software engineering program
        </Typography>
      </Box>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Registration Form" icon={<Person />} iconPosition="start" />
          <Tab label="Student Dashboard" icon={<Analytics />} iconPosition="start" />
          <Tab label="Course Catalog" icon={<Book />} iconPosition="start" />
        </Tabs>
      </Box>

      {tabValue === 0 ? (
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
          <ProfessionalPaper elevation={3}>
            {renderStepContent(activeStep)}
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                startIcon={<ArrowBack />}
              >
                Back
              </Button>
              <ColorfulButton
                onClick={handleNext}
                endIcon={activeStep === steps.length - 1 ? <CheckCircle /> : <ArrowForward />}
              >
                {activeStep === steps.length - 1 ? 'Submit Registration' : 'Next'}
              </ColorfulButton>
            </Box>
          </ProfessionalPaper>
        </>
      ) : tabValue === 1 ? (
        renderDashboard()
      ) : (
        <ProfessionalPaper>
          <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Book /> Available Courses
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
            {courseModules.map((module) => (
              <Box key={module.id} sx={{ flex: '1 1 300px' }}>
                <StudentCard>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {module.name}
                      </Typography>
                      <Badge color="primary" badgeContent={module.level}>
                        <Assignment />
                      </Badge>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Comprehensive training in {module.name.toLowerCase()} with hands-on projects and real-world applications.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Chip label={module.duration} size="small" />
                      <Button size="small" variant="outlined">
                        View Details
                      </Button>
                    </Box>
                  </CardContent>
                </StudentCard>
              </Box>
            ))}
          </Box>
        </ProfessionalPaper>
      )}

      {/* Success Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Typography variant="h6">Registration Successful! 🎉</Typography>
            <IconButton onClick={() => setOpenDialog(false)}>
              <Close /> {/* FIXED: Now imported */}
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: 'success.main', mx: 'auto', mb: 2 }}>
              <CheckCircle sx={{ fontSize: 40 }} />
            </Avatar>
            <Typography variant="h6" gutterBottom>
              Welcome to Software Engineering Program!
            </Typography>
            <Typography variant="body1" paragraph>
              Your registration has been submitted successfully. You will receive a confirmation email shortly.
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText primary="Check your email for login credentials" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Schedule color="primary" />
                </ListItemIcon>
                <ListItemText primary="Orientation session starts next week" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Assignment color="primary" />
                </ListItemIcon>
                <ListItemText primary="Complete your profile to get started" />
              </ListItem>
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Close</Button>
          <ColorfulButton onClick={() => setTabValue(1)} startIcon={<Analytics />}>
            Go to Dashboard
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
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      {/* Footer */}
      <Box sx={{ textAlign: 'center', mt: 8, pt: 4, borderTop: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="body2" color="text.secondary">
          <Computer sx={{ verticalAlign: 'middle', mr: 1 }} />
          Software Engineering Lecture Program © {new Date().getFullYear()}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Empowering the next generation of software engineers
        </Typography>
      </Box>
    </Container>
  );
}