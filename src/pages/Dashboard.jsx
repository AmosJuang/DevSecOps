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
    Divider
} from '@mui/material';
import MovieIcon from '@mui/icons-material/Movie';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';
import TimelineIcon from '@mui/icons-material/Timeline';

// Data contoh untuk grafik pengunjung
const generateVisitorData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentMonth = new Date().getMonth();

    return months.slice(0, currentMonth + 1).map((month, index) => {
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

// Data untuk grafik pie populasi pengunjung berdasarkan film
const generateMovieViewsData = (movies) => {
    return movies.map(movie => ({
        name: movie.title,
        value: Math.floor(Math.random() * 1000) + 100
    }));
};

// Warna untuk grafik
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

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
                                backgroundColor: '#8884d8',
                                borderRadius: '4px 4px 0 0',
                                transition: 'height 1s ease-in-out',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                color: 'white',
                                fontSize: '0.75rem',
                                fontWeight: 'bold',
                                pb: 0.5
                            }}
                        >
                            {item.total}
                        </Box>
                        <Typography sx={{ mt: 1, fontSize: '0.75rem' }}>{item.name}</Typography>
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
                mb: 2
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
                        <Typography variant="body2">{item.name}: {((item.value / total) * 100).toFixed(1)}% ({item.value} views)</Typography>
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
    const [editingIndex, setEditingIndex] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [tabValue, setTabValue] = useState(0);
    const [visitorData, setVisitorData] = useState([]);
    const [movieViewsData, setMovieViewsData] = useState([]);
    const [animateCharts, setAnimateCharts] = useState(false);

    // Inisialisasi data contoh saat komponen dimuat
    useEffect(() => {
        // Data film contoh
        const sampleMovies = [
            { title: 'Avengers: Endgame', description: 'Superhero film based on Marvel Comics' },
            { title: 'Parasite', description: 'South Korean black comedy thriller film' },
            { title: 'The Shawshank Redemption', description: 'Drama film based on a Stephen King novella' }
        ];
        setMovies(sampleMovies);

        // Data pengunjung
        setVisitorData(generateVisitorData());

        // Animasi setelah komponen dimuat
        setTimeout(() => {
            setAnimateCharts(true);
        }, 300);
    }, []);

    // Update data grafik pie saat film diperbarui
    useEffect(() => {
        if (movies.length > 0) {
            setMovieViewsData(generateMovieViewsData(movies));
        }
    }, [movies]);

    // Menangani perubahan tab
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    // Menangani form submit (untuk menambah atau mengedit film)
    const handleSubmit = (event) => {
        event.preventDefault();
        if (editingIndex !== null) {
            const updatedMovies = movies.map((movie, index) =>
                index === editingIndex ? { ...movie, title, description } : movie
            );
            setMovies(updatedMovies);
            setEditingIndex(null);
        } else {
            const newMovie = { title, description };
            setMovies([...movies, newMovie]);
        }
        setTitle('');
        setDescription('');
        setShowForm(false);
    };

    // Menangani edit film
    const handleEdit = (index) => {
        setTitle(movies[index].title);
        setDescription(movies[index].description);
        setEditingIndex(index);
        setShowForm(true);
    };

    // Menangani hapus film
    const handleDelete = (index) => {
        const updatedMovies = movies.filter((movie, movieIndex) => movieIndex !== index);
        setMovies(updatedMovies);
    };

    // Line chart data untuk visualisasi trend
    const getMonthlyData = () => {
        return visitorData.map((item, index) => {
            const mobileHeight = (item.mobile / item.total) * 100;
            const desktopHeight = (item.desktop / item.total) * 100;

            return (
                <Box key={index} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, mx: 0.5 }}>
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', height: 200 }}>
                        <Box sx={{
                            height: `${mobileHeight}%`,
                            backgroundColor: '#82ca9d',
                            width: '100%',
                            transition: 'height 0.8s ease-in-out'
                        }} />
                        <Box sx={{
                            height: `${desktopHeight}%`,
                            backgroundColor: '#8884d8',
                            width: '100%',
                            transition: 'height 0.8s ease-in-out'
                        }} />
                    </Box>
                    <Typography variant="caption" sx={{ mt: 0.5 }}>{item.name}</Typography>
                </Box>
            );
        });
    };

    return (
        <Box sx={{
            padding: '20px',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%)',
            minHeight: '100vh'
        }}>
            <Fade in={true} timeout={800}>
                <Paper
                    elevation={3}
                    sx={{
                        padding: '20px',
                        borderRadius: '12px',
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
                            color: '#1a237e',
                            mb: 3
                        }}
                    >
                        <MovieIcon sx={{ mr: 1, fontSize: 36 }} />
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
                                fontWeight: 'bold'
                            }
                        }}
                    >
                        <Tab icon={<BarChartIcon />} label="Analytics" />
                        <Tab icon={<MovieIcon />} label="Movies" />
                    </Tabs>

                    {/* Analytics Tab */}
                    {tabValue === 0 && (
                        <Box>
                            <Grid container spacing={3}>
                                {/* Summary Cards */}
                                <Grid item xs={12} md={4}>
                                    <Zoom in={animateCharts} timeout={500}>
                                        <Card sx={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                    <VisibilityIcon sx={{ mr: 1 }} /> Total Visitors
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#0088FE', mb: 2 }}>
                                                    {visitorData.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Compared to last month: <span style={{ color: '#00C49F', fontWeight: 'bold' }}>+12.5%</span>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Zoom in={animateCharts} timeout={700}>
                                        <Card sx={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                    <MovieIcon sx={{ mr: 1 }} /> Total Movies
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#00C49F', mb: 2 }}>
                                                    {movies.length}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Most popular: {movies.length > 0 ? movies[0].title : 'N/A'}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Zoom in={animateCharts} timeout={900}>
                                        <Card sx={{ height: '100%', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1, display: 'flex', alignItems: 'center' }}>
                                                    <TimelineIcon sx={{ mr: 1 }} /> Avg. Watch Time
                                                </Typography>
                                                <Typography variant="h3" sx={{ fontWeight: 'bold', color: '#FFBB28', mb: 2 }}>
                                                    86 min
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Compared to last month: <span style={{ color: '#00C49F', fontWeight: 'bold' }}>+5.2%</span>
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>

                                {/* Bar Chart - Visitors over time */}
                                <Grid item xs={12} md={8}>
                                    <Zoom in={animateCharts} timeout={1100}>
                                        <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                    <BarChartIcon sx={{ mr: 1 }} /> Website Visitors per Month
                                                </Typography>
                                                <Box sx={{ height: 350 }}>
                                                    <SimpleBarChart data={visitorData} />
                                                </Box>

                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                                                        <Box sx={{ width: 12, height: 12, backgroundColor: '#8884d8', mr: 1, borderRadius: 1 }} />
                                                        <Typography variant="caption">Total Visitors</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                                                        <Box sx={{ width: 12, height: 12, backgroundColor: '#82ca9d', mr: 1, borderRadius: 1 }} />
                                                        <Typography variant="caption">Mobile</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ width: 12, height: 12, backgroundColor: '#ffc658', mr: 1, borderRadius: 1 }} />
                                                        <Typography variant="caption">Desktop</Typography>
                                                    </Box>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Zoom>
                                </Grid>

                                {/* Pie Chart - Movie popularity */}
                                <Grid item xs={12} md={4}>
                                    <Zoom in={animateCharts} timeout={1300}>
                                        <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                    <PieChartIcon sx={{ mr: 1 }} /> Movie Popularity
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
                                        <Card sx={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
                                            <CardContent>
                                                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, display: 'flex', alignItems: 'center' }}>
                                                    <TimelineIcon sx={{ mr: 1 }} /> Monthly Visitors Trend
                                                </Typography>
                                                <Box sx={{ display: 'flex', alignItems: 'flex-end', height: 250 }}>
                                                    {getMonthlyData()}
                                                </Box>
                                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                                                    <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
                                                        <Box sx={{ width: 12, height: 12, backgroundColor: '#8884d8', mr: 1, borderRadius: 1 }} />
                                                        <Typography variant="caption">Desktop Users</Typography>
                                                    </Box>
                                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                                        <Box sx={{ width: 12, height: 12, backgroundColor: '#82ca9d', mr: 1, borderRadius: 1 }} />
                                                        <Typography variant="caption">Mobile Users</Typography>
                                                    </Box>
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
                                        setEditingIndex(null);
                                    }}
                                    sx={{
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                        transition: 'all 0.3s',
                                        '&:hover': {
                                            transform: 'translateY(-2px)',
                                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                        }
                                    }}
                                >
                                    {showForm ? 'Cancel' : 'Add New Movie'}
                                </Button>
                            </Box>

                            {/* Form untuk menambah/edit film */}
                            <Grow in={showForm} unmountOnExit>
                                <Paper
                                    sx={{
                                        padding: '20px',
                                        marginBottom: '20px',
                                        borderRadius: '12px',
                                        boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            alignItems: 'center'
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
                                                                borderColor: '#1a237e',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    label="Description"
                                                    variant="outlined"
                                                    fullWidth
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                    required
                                                    sx={{
                                                        '& .MuiOutlinedInput-root': {
                                                            borderRadius: '8px',
                                                            '&.Mui-focused fieldset': {
                                                                borderColor: '#1a237e',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </Grid>
                                            <Grid item xs={12}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="submit"
                                                    fullWidth
                                                    sx={{
                                                        borderRadius: '8px',
                                                        py: 1.5,
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                                                        transition: 'all 0.3s',
                                                        '&:hover': {
                                                            transform: 'translateY(-2px)',
                                                            boxShadow: '0 6px 16px rgba(25, 118, 210, 0.4)',
                                                        }
                                                    }}
                                                >
                                                    {editingIndex !== null ? 'Update Movie' : 'Add Movie'}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </form>
                                </Paper>
                            </Grow>

                            {/* Daftar Film dengan animasi */}
                            <Typography
                                variant="h6"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}
                            >
                                <MovieIcon sx={{ mr: 1 }} /> Movie List
                            </Typography>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    borderRadius: '12px',
                                    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                                    overflow: 'hidden'
                                }}
                            >
                                <Table>
                                    <TableHead>
                                        <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Views</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {movies.map((movie, index) => {
                                            // Mendapatkan data views dari movieViewsData
                                            const viewCount = movieViewsData.find(item => item.name === movie.title)?.value || 0;

                                            return (
                                                <Fade in={true} timeout={300 + index * 100} key={index}>
                                                    <TableRow
                                                        sx={{
                                                            '&:hover': {
                                                                backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                                                transition: 'background-color 0.2s'
                                                            }
                                                        }}
                                                    >
                                                        <TableCell sx={{ fontWeight: 'medium' }}>{movie.title}</TableCell>
                                                        <TableCell>{movie.description}</TableCell>
                                                        <TableCell>{viewCount.toLocaleString()}</TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                color="primary"
                                                                onClick={() => handleEdit(index)}
                                                                sx={{
                                                                    mr: 1,
                                                                    transition: 'transform 0.2s',
                                                                    '&:hover': { transform: 'scale(1.1)' }
                                                                }}
                                                            >
                                                                <EditIcon />
                                                            </IconButton>
                                                            <IconButton
                                                                color="error"
                                                                onClick={() => handleDelete(index)}
                                                                sx={{
                                                                    transition: 'transform 0.2s',
                                                                    '&:hover': { transform: 'scale(1.1)' }
                                                                }}
                                                            >
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                </Fade>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Paper>
            </Fade>
        </Box>
    );
};

export default Dashboard;