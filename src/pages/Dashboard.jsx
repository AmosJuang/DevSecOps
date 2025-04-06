import React, { useState, useEffect } from 'react';
import {
    TextField,
    Button,
    Box,
    Grid,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Card,
    CardContent,
    IconButton,
    Tabs,
    Tab,
    Grow,
    Fade,
    Zoom,
    Avatar,
    Chip,
    Rating,
    Container
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';
import ImageIcon from '@mui/icons-material/Image';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import TheatersIcon from '@mui/icons-material/Theaters';
import LocalMoviesIcon from '@mui/icons-material/LocalMovies';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Example data for visitor chart
const generateVisitorData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    return months.slice(0, currentMonth + 1).map((month) => {
        const baseVisitors = 1000 + Math.floor(Math.random() * 2000);
        const mobileVisitors = Math.floor(baseVisitors * 0.6);
        const desktopVisitors = baseVisitors - mobileVisitors;

        return {
            name: month,
            total: baseVisitors,
            mobile: mobileVisitors,
            desktop: desktopVisitors,
        };
    });
};

// Data for pie chart of visitor population by movie
const generateMovieViewsData = (movies) => {
    return movies.map(movie => ({
        name: movie.title,
        value: Math.floor(Math.random() * 1000) + 100
    }));
};

// Colors for charts
const COLORS = ['#3f51b5', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

// Custom BarChart component using HTML/CSS instead of Recharts
const SimpleBarChart = ({ data }) => {
    const maxValue = Math.max(...data.map(item => item.total));

    return (
        <Box sx={{ height: '100%', width: '100%', pt: 2 }}>
            <Box sx={{ display: 'flex', height: '300px', alignItems: 'flex-end', pb: 2 }}>
                {data.map((item, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            flex: 1,
                            mx: 0.5
                        }}
                    >
                        <Box
                            sx={{
                                width: '100%',
                                height: `${(item.total / maxValue) * 100}%`,
                                background: 'linear-gradient(to top, #3f51b5, #7986cb)',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 1s ease-in-out',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                pb: 0.5,
                                boxShadow: '0 2px 6px rgba(63, 81, 181, 0.3)'
                            }}
                        >
                            {item.total}
                        </Box>
                        <Typography sx={{ mt: 1, fontSize: '0.75rem', fontWeight: 'medium' }}>{item.name}</Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

// Custom PieChart component using HTML/CSS instead of Recharts
const SimplePieChart = ({ data }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    return (
        <Box sx={{ height: '100%', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{
                width: '200px',
                height: '200px',
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                mb: 2,
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)'
            }}>
                {data.map((item, index) => {
                    const percentage = (item.value / total) * 100;
                    const previousPercentages = data
                        .slice(0, index)
                        .reduce((sum, prevItem) => sum + (prevItem.value / total) * 100, 0);

                    return (
                        <Box
                            key={index}
                            sx={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                background: `conic-gradient(transparent ${previousPercentages}%, ${COLORS[index % COLORS.length]} ${previousPercentages}%, ${COLORS[index % COLORS.length]} ${previousPercentages + percentage}%, transparent ${previousPercentages + percentage}%)`,
                            }}
                        />
                    );
                })}
            </Box>
            <Box sx={{ width: '100%' }}>
                {data.map((item, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Box sx={{ width: 16, height: 16, backgroundColor: COLORS[index % COLORS.length], mr: 1, borderRadius: 1 }} />
                        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
                            {item.name}: {((item.value / total) * 100).toFixed(1)}% ({item.value} views)
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const Dashboard = () => {
    const [movies, setMovies] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [rating, setRating] = useState(3.5);
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [visitorData, setVisitorData] = useState([]);
    const [movieViewsData, setMovieViewsData] = useState([]);
    const [animateCharts, setAnimateCharts] = useState(false);

    // Initialize example data when the component is loaded
    useEffect(() => {
        // Example movie data with placeholder images
        const sampleMovies = [
            {
                title: 'Avengers: Endgame',
                description: 'Superhero film based on Marvel Comics',
                genre: 'Action/Sci-Fi',
                rating: 4.8,
                image: 'https://via.placeholder.com/150/3f51b5/FFFFFF?text=Avengers'
            },
            {
                title: 'Parasite',
                description: 'South Korean black comedy thriller film',
                genre: 'Thriller/Drama',
                rating: 4.6,
                image: 'https://via.placeholder.com/150/00C49F/FFFFFF?text=Parasite'
            },
            {
                title: 'The Shawshank Redemption',
                description: 'Drama film based on a Stephen King novella',
                genre: 'Drama',
                rating: 4.9,
                image: 'https://via.placeholder.com/150/FFBB28/FFFFFF?text=Shawshank'
            }
        ];
        setMovies(sampleMovies);

        // Visitor data
        setVisitorData(generateVisitorData());

        // Animation after the component is loaded
        setTimeout(() => {
            setAnimateCharts(true);
        }, 300);
    }, []);

    // Update pie chart data when movies are updated
    useEffect(() => {
        if (movies.length > 0) {
            setMovieViewsData(generateMovieViewsData(movies));
        }
    }, [movies]);

    // Handle tab change
    const handleTabChange = (_, newValue) => {
        setTabValue(newValue);
    };

    // Handle image file change
    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            const selectedFile = event.target.files[0];
            setImage(selectedFile);

            // Create preview URL
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    // Handle form submission (to add or edit a movie)
    const handleSubmit = (event) => {
        event.preventDefault();

        // Prepare movie object with image
        const movieData = {
            title,
            description,
            genre,
            rating,
            image: imagePreview || (editingIndex !== null ? movies[editingIndex].image : 'https://via.placeholder.com/150/cccccc/FFFFFF?text=No+Image')
        };

        if (editingIndex !== null) {
            const updatedMovies = movies.map((movie, index) =>
                index === editingIndex ? movieData : movie
            );
            setMovies(updatedMovies);
            setEditingIndex(null);
        } else {
            setMovies([...movies, movieData]);
        }

        // Reset form
        setTitle('');
        setDescription('');
        setGenre('');
        setRating(3.5);
        setImage(null);
        setImagePreview('');
        setShowForm(false);
    };

    // Handle movie edit
    const handleEdit = (index) => {
        setTitle(movies[index].title);
        setDescription(movies[index].description);
        setGenre(movies[index].genre || '');
        setRating(movies[index].rating || 3.5);
        setImagePreview(movies[index].image);
        setEditingIndex(index);
        setShowForm(true);
    };

    // Handle movie deletion
    const handleDelete = (index) => {
        const updatedMovies = movies.filter((_, movieIndex) => movieIndex !== index);
        setMovies(updatedMovies);
    };

    // Line chart data for trend visualization
    const getMonthlyData = () => {
        return visitorData.map((item, index) => {
            const mobileHeight = (item.mobile / item.total) * 100;
            const desktopHeight = (item.desktop / item.total) * 100;

            return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mx: 0.5 }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Box sx={{
                            height: `${mobileHeight}%`,
                            background: 'linear-gradient(to top, #00C49F, #00E676)',
                            width: '100%',
                            transition: 'height 0.8s ease-in-out',
                            borderRadius: '2px 2px 0 0'
                        }} />
                        <Box sx={{
                            height: `${desktopHeight}%`,
                            background: 'linear-gradient(to top, #3f51b5, #7986cb)',
                            width: '100%',
                            transition: 'height 0.8s ease-in-out',
                            borderRadius: '2px 2px 0 0'
                        }} />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 0.5, fontWeight: 'medium' }}>{item.name}</Typography>
                </Box>
            );
        });
    };

    return (
        <Box sx={{
            padding: { xs: '10px', sm: '20px' },
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            minHeight: '100vh'
        }}>
            <Fade in={true} timeout={800}>
                <Container maxWidth="xl">
                    <Paper
                        elevation={3}
                        sx={{
                            padding: { xs: '15px', sm: '20px', md: '30px' },
                            borderRadius: '16px',
                            background: 'rgba(255, 255, 255, 0.95)',
                            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.07)'
                        }}
                    >
                        <Typography
                            variant="h4"
                            gutterBottom
                            sx={{
                                fontWeight: 'bold',
                                display: 'flex',
                                alignItems: 'center',
                                color: '#3f51b5',
                                mb: 3,
                                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.125rem' }
                            }}
                        >
                            <TheatersIcon sx={{ mr: 1, fontSize: { xs: 28, sm: 36 } }} />
                            Admin Dashboard - Movie Management
                        </Typography>

                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            centered
                            sx={{
                                mb: 3,
                                '& .MuiTab-root': {
                                    minWidth: '120px',
                                    fontWeight: 'bold',
                                    fontSize: { xs: '0.8rem', sm: '0.875rem' }
                                },
                                '& .Mui-selected': {
                                    color: '#3f51b5'
                                },
                                '& .MuiTabs-indicator': {
                                    backgroundColor: '#3f51b5'
                                }
                            }}
                        >
                            <Tab icon={<BarChartIcon />} label="Analytics" />
                            <Tab icon={<LocalMoviesIcon />} label="Movies" />
                        </Tabs>

                        {/* Analytics Tab */}
                        {tabValue === 0 && (
                            <Box>
                                <Grid container spacing={3}>
                                    {/* Summary Cards */}
                                    <Grid item xs={12} md={4}>
                                        <Zoom in={animateCharts} timeout={500}>
                                            <Card sx={{ height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <VisibilityIcon sx={{ mr: 1, color: '#3f51b5' }} /> Total Visitors
                                                    </Typography>
                                                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#3f51b5', mb: 2 }}>
                                                        {visitorData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <TrendingUpIcon sx={{ mr: 0.5, fontSize: 16, color: '#00C49F' }} />
                                                        Compared to last month: <span style={{ color: '#00C49F', fontWeight: 'bold', marginLeft: '4px' }}>+12.5%</span>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Zoom in={animateCharts} timeout={700}>
                                            <Card sx={{ height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #00C49F 0%, #00E676 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <MovieIcon sx={{ mr: 1, color: '#00C49F' }} /> Total Movies
                                                    </Typography>
                                                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#00C49F', mb: 2 }}>
                                                        {movies.length}
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary">
                                                        Most popular: {movies.length > 0 ?
                                                            <Chip
                                                                size="small"
                                                                label={movies[0].title}
                                                                color="primary"
                                                                variant="outlined"
                                                                sx={{ ml: 1, fontWeight: 'medium' }}
                                                            /> : 'N/A'}
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>

                                    <Grid item xs={12} md={4}>
                                        <Zoom in={animateCharts} timeout={900}>
                                            <Card sx={{ height: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #FFBB28 0%, #FFC658 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                        <TimelineIcon sx={{ mr: 1, color: '#FFBB28' }} /> Avg. Watch Time
                                                    </Typography>
                                                    <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FFBB28', mb: 2 }}>
                                                        86 min
                                                    </Typography>
                                                    <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <TrendingUpIcon sx={{ mr: 0.5, fontSize: 16, color: '#00C49F' }} />
                                                        Compared to last month: <span style={{ color: '#00C49F', fontWeight: 'bold', marginLeft: '4px' }}>+5.2%</span>
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>

                                    {/* Bar Chart - Visitors over time */}
                                    <Grid item xs={12} md={8}>
                                        <Zoom in={animateCharts} timeout={1100}>
                                            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                        <BarChartIcon sx={{ mr: 1, color: '#3f51b5' }} /> Website Visitors per Month
                                                    </Typography>
                                                    <Box sx={{ height: 350 }}>
                                                        <SimpleBarChart data={visitorData} />
                                                    </Box>

                                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, flexWrap: 'wrap' }}>
                                                        <Chip
                                                            icon={<Box sx={{ width: 12, height: 12, backgroundColor: '#3f51b5', borderRadius: 1 }} />}
                                                            label="Total Visitors"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ m: 0.5 }}
                                                        />
                                                        <Chip
                                                            icon={<Box sx={{ width: 12, height: 12, backgroundColor: '#00C49F', borderRadius: 1 }} />}
                                                            label="Mobile"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ m: 0.5 }}
                                                        />
                                                        <Chip
                                                            icon={<Box sx={{ width: 12, height: 12, backgroundColor: '#FFBB28', borderRadius: 1 }} />}
                                                            label="Desktop"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ m: 0.5 }}
                                                        />
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>

                                    {/* Pie Chart - Movie popularity */}
                                    <Grid item xs={12} md={4}>
                                        <Zoom in={animateCharts} timeout={1300}>
                                            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                        <PieChartIcon sx={{ mr: 1, color: '#3f51b5' }} /> Movie Popularity
                                                    </Typography>
                                                    <Box sx={{ height: 350 }}>
                                                        {movieViewsData.length > 0 ? (
                                                            <SimplePieChart data={movieViewsData} />
                                                        ) : (
                                                            <Typography variant="body1">No movie data available</Typography>
                                                        )}
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>

                                    {/* Monthly Trends */}
                                    <Grid item xs={12}>
                                        <Zoom in={animateCharts} timeout={1500}>
                                            <Card sx={{ boxShadow: '0 4px 20px rgba(0,0,0,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
                                                <Box sx={{ height: '8px', background: 'linear-gradient(90deg, #3f51b5 0%, #7986cb 100%)' }} />
                                                <CardContent sx={{ p: 3 }}>
                                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                        <TimelineIcon sx={{ mr: 1, color: '#3f51b5' }} /> Monthly Visitors Trend
                                                    </Typography>
                                                    <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 250 }}>
                                                        {getMonthlyData()}
                                                    </Box>
                                                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, flexWrap: 'wrap' }}>
                                                        <Chip
                                                            icon={<Box sx={{ width: 12, height: 12, backgroundColor: '#3f51b5', borderRadius: 1 }} />}
                                                            label="Desktop Users"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ m: 0.5 }}
                                                        />
                                                        <Chip
                                                            icon={<Box sx={{ width: 12, height: 12, backgroundColor: '#00C49F', borderRadius: 1 }} />}
                                                            label="Mobile Users"
                                                            variant="outlined"
                                                            size="small"
                                                            sx={{ m: 0.5 }}
                                                        />
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Zoom>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}

                        {/* Movies Tab */}
                        {tabValue === 1 && (
                            <Box>
                                {/* Button to show/hide form */}
                                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            setShowForm(!showForm);
                                            setTitle('');
                                            setDescription('');
                                            setGenre('');
                                            setRating(3.5);
                                            setImage(null);
                                            setImagePreview('');
                                            setEditingIndex(null);
                                        }}
                                        sx={{
                                            borderRadius: '8px',
                                            background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                                            boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
                                            transition: 'all 0.3s',
                                            '&:hover': {
                                                transform: 'translateY(-2px)',
                                                boxShadow: '0 6px 16px rgba(63, 81, 181, 0.4)',
                                            }
                                        }}
                                    >
                                        {showForm ? 'Cancel' : 'Add New Movie'}
                                    </Button>
                                </Box>

                                {/* Form to add/edit a movie */}
                                <Grow in={showForm} unmountOnExit>
                                    <Paper
                                        sx={{
                                            padding: '20px',
                                            marginBottom: '20px',
                                            borderRadius: '16px',
                                            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                            background: 'rgba(250, 250, 252, 0.97)',
                                            border: '1px solid rgba(63, 81, 181, 0.1)'
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            gutterBottom
                                            sx={{
                                                fontWeight: 'bold',
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#3f51b5'
                                            }}
                                        >
                                            {editingIndex !== null ? <EditIcon sx={{ mr: 1 }} /> : <AddIcon sx={{ mr: 1 }} />}
                                            {editingIndex !== null ? 'Edit Movie' : 'Add Movie'}
                                        </Typography>
                                        <form onSubmit={handleSubmit}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Movie Title"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={title}
                                                        onChange={(e) => setTitle(e.target.value)}
                                                        required
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#3f51b5',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <TextField
                                                        label="Genre"
                                                        variant="outlined"
                                                        fullWidth
                                                        value={genre}
                                                        onChange={(e) => setGenre(e.target.value)}
                                                        placeholder="e.g. Action, Drama, Comedy"
                                                        sx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#3f51b5',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        label="Description"
                                                        variant="outlined"
                                                        fullWidth
                                                        multiline
                                                        rows={3}
                                                        value={description}
                                                        onChange={(e) => setDescription(e.target.value)}
                                                        requiredsx={{
                                                            '& .MuiOutlinedInput-root': {
                                                                borderRadius: '8px',
                                                                '&.Mui-focused fieldset': {
                                                                    borderColor: '#3f51b5',
                                                                },
                                                            },
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography component="legend" gutterBottom>
                                                        Rating
                                                    </Typography>
                                                    <Rating
                                                        name="movie-rating"
                                                        value={rating}
                                                        precision={0.5}
                                                        onChange={(_, newValue) => {
                                                            setRating(newValue);
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} sm={6}>
                                                    <Typography gutterBottom>Movie Poster</Typography>
                                                    <Button
                                                        variant="outlined"
                                                        component="label"
                                                        startIcon={<PhotoCameraIcon />}
                                                        sx={{
                                                            borderRadius: '8px',
                                                            borderColor: '#3f51b5',
                                                            color: '#3f51b5',
                                                            '&:hover': {
                                                                borderColor: '#7986cb',
                                                                backgroundColor: 'rgba(63, 81, 181, 0.04)'
                                                            }
                                                        }}
                                                    >
                                                        Upload Image
                                                        <input
                                                            type="file"
                                                            hidden
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                        />
                                                    </Button>
                                                    {imagePreview && (
                                                        <Box sx={{ mt: 2, position: 'relative' }}>
                                                            <img
                                                                src={imagePreview}
                                                                alt="Movie poster preview"
                                                                style={{
                                                                    maxWidth: '100%',
                                                                    maxHeight: '150px',
                                                                    borderRadius: '8px',
                                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                                }}
                                                            />
                                                            <IconButton
                                                                size="small"
                                                                onClick={() => {
                                                                    setImage(null);
                                                                    setImagePreview('');
                                                                }}
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 0,
                                                                    backgroundColor: 'rgba(255,255,255,0.7)',
                                                                    '&:hover': {
                                                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                                                    }
                                                                }}
                                                            >
                                                                <DeleteIcon fontSize="small" />
                                                            </IconButton>
                                                        </Box>
                                                    )}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                                        <Button
                                                            type="submit"
                                                            variant="contained"
                                                            color="primary"
                                                            sx={{
                                                                borderRadius: '8px',
                                                                background: 'linear-gradient(45deg, #3f51b5 30%, #7986cb 90%)',
                                                                boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
                                                                transition: 'all 0.3s',
                                                                '&:hover': {
                                                                    transform: 'translateY(-2px)',
                                                                    boxShadow: '0 6px 16px rgba(63, 81, 181, 0.4)',
                                                                }
                                                            }}
                                                        >
                                                            {editingIndex !== null ? 'Update Movie' : 'Add Movie'}
                                                        </Button>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Paper>
                                </Grow>

                                {/* Movie list */}
                                <Box>
                                    <Grid container spacing={3}>
                                        {movies.map((movie, index) => (
                                            <Grid item xs={12} sm={6} md={4} key={index}>
                                                <Zoom in={true} style={{ transitionDelay: `${index * 100}ms` }}>
                                                    <Card
                                                        sx={{
                                                            borderRadius: '16px',
                                                            overflow: 'hidden',
                                                            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                                                            transition: 'transform 0.3s, box-shadow 0.3s',
                                                            '&:hover': {
                                                                transform: 'translateY(-5px)',
                                                                boxShadow: '0 8px 25px rgba(0,0,0,0.12)',
                                                            }
                                                        }}
                                                    >
                                                        <Box sx={{ position: 'relative' }}>
                                                            <Box
                                                                sx={{
                                                                    height: '200px',
                                                                    background: `url(${movie.image}) center/cover no-repeat`,
                                                                    position: 'relative',
                                                                    '&::after': {
                                                                        content: '""',
                                                                        position: 'absolute',
                                                                        top: 0,
                                                                        left: 0,
                                                                        width: '100%',
                                                                        height: '100%',
                                                                        background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.5) 100%)'
                                                                    }
                                                                }}
                                                            />
                                                            <Box
                                                                sx={{
                                                                    position: 'absolute',
                                                                    top: '10px',
                                                                    right: '10px',
                                                                    display: 'flex',
                                                                    gap: '5px'
                                                                }}
                                                            >
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleEdit(index)}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                        }
                                                                    }}
                                                                >
                                                                    <EditIcon fontSize="small" />
                                                                </IconButton>
                                                                <IconButton
                                                                    size="small"
                                                                    onClick={() => handleDelete(index)}
                                                                    sx={{
                                                                        backgroundColor: 'rgba(255,255,255,0.9)',
                                                                        '&:hover': {
                                                                            backgroundColor: 'white',
                                                                        }
                                                                    }}
                                                                >
                                                                    <DeleteIcon fontSize="small" />
                                                                </IconButton>
                                                            </Box>
                                                        </Box>
                                                        <CardContent sx={{ p: 3 }}>
                                                            <Typography variant="h6" component="div" gutterBottom sx={{ fontWeight: 'bold' }}>
                                                                {movie.title}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }} >
                                                                {movie.description}
                                                            </Typography>
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
                                                                {movie.genre && (
                                                                    <Chip
                                                                        label={movie.genre}
                                                                        size="small"
                                                                        color="primary"
                                                                        variant="outlined"
                                                                        sx={{ borderRadius: '6px' }}
                                                                    />
                                                                )}
                                                                <Rating
                                                                    name={`movie-rating-${index}`}
                                                                    value={movie.rating}
                                                                    precision={0.5}
                                                                    size="small"
                                                                    readOnly
                                                                />
                                                            </Box>
                                                        </CardContent>
                                                    </Card>
                                                </Zoom>
                                            </Grid>
                                        ))}
                                    </Grid>

                                    {movies.length === 0 && (
                                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 5 }}>
                                            <MovieIcon sx={{ fontSize: 60, color: '#3f51b5', opacity: 0.5, mb: 2 }} />
                                            <Typography variant="h6" color="text.secondary">
                                                No movies available
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                                Click the "Add New Movie" button to add your first movie
                                            </Typography>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                startIcon={<AddIcon />}
                                                onClick={() => setShowForm(true)}
                                                sx={{
                                                    borderRadius: '8px',
                                                    borderColor: '#3f51b5',
                                                    '&:hover': {
                                                        borderColor: '#7986cb',
                                                        backgroundColor: 'rgba(63, 81, 181, 0.04)'
                                                    }
                                                }}
                                            >
                                                Add New Movie
                                            </Button>
                                        </Box>
                                    )}
                                </Box>
                            </Box>
                        )}
                    </Paper>
                </Container>
            </Fade>
        </Box>
    );
};

export default Dashboard;