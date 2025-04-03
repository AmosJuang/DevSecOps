import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box, Grid, Card, CardMedia, CardContent, CircularProgress, Fade, Grow } from '@mui/material';
import { motion } from 'framer-motion';
import StarIcon from '@mui/icons-material/Star';
import SearchIcon from '@mui/icons-material/Search';
import moviePoster1 from '../assets/1.jpg';
import moviePosterA from '../assets/1.jpg';
import moviePosterB from '../assets/b.jpg';

const SearchResults = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);

    const movies = [
        { id: 1, title: "Death of a Unicorn", poster: moviePoster1, rating: 4.5, year: 2023, genre: "Drama" },
        { id: 2, title: "Movie 2", poster: moviePosterB, rating: 3.8, year: 2022, genre: "Action" },
        { id: 3, title: "Movie 3", poster: moviePosterA, rating: 4.2, year: 2021, genre: "Comedy" },
        { id: 4, title: "Another Unicorn", poster: moviePosterB, rating: 4.7, year: 2023, genre: "Fantasy" },
        { id: 5, title: "The Last Movie", poster: moviePosterA, rating: 3.9, year: 2022, genre: "Thriller" }
    ];

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            if (query) {
                const searchTerm = query.toLowerCase().trim();
                const filteredResults = movies.filter(movie =>
                    movie.title.toLowerCase().includes(searchTerm)
                );
                console.log('Search term:', searchTerm);
                console.log('Filtered results:', filteredResults);
                setResults(filteredResults);
            } else {
                setResults([]);
            }
            setLoading(false);
        }, 800); // Adding a slight delay to show loading animation
    }, [query, location.search]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12
            }
        }
    };

    return (
        <Box sx={{
            maxWidth: '1200px',
            margin: '20px auto',
            padding: '20px',
            color: 'white',
            background: 'linear-gradient(to bottom, rgba(20, 20, 30, 0.8), rgba(10, 10, 20, 0.9))',
            borderRadius: '12px',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.36)',
            backdropFilter: 'blur(8px)'
        }}>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 4,
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                paddingBottom: '16px'
            }}>
                <SearchIcon sx={{ mr: 2, fontSize: 32, color: '#64b5f6' }} />
                <Typography variant="h4" sx={{
                    fontWeight: 600,
                    backgroundImage: 'linear-gradient(45deg, #64b5f6, #9575cd)',
                    backgroundClip: 'text',
                    color: 'transparent',
                    WebkitBackgroundClip: 'text'
                }}>
                    Results for "{query}"
                </Typography>
            </Box>

            <Fade in={!loading} timeout={800}>
                <Typography variant="body1" sx={{
                    mb: 3,
                    color: 'rgba(255, 255, 255, 0.7)',
                    fontSize: '1.1rem'
                }}>
                    {results.length} {results.length === 1 ? 'result' : 'results'} found
                </Typography>
            </Fade>

            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                    <CircularProgress sx={{ color: '#64b5f6' }} />
                </Box>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <Grid container spacing={3}>
                        {results.map((movie, index) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                                <motion.div variants={itemVariants}>
                                    <Card
                                        sx={{
                                            background: 'rgba(30, 30, 40, 0.7)',
                                            backdropFilter: 'blur(12px)',
                                            cursor: 'pointer',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.25)',
                                            position: 'relative',
                                            '&:hover': {
                                                transform: 'translateY(-10px)',
                                                boxShadow: '0 12px 28px rgba(0, 0, 0, 0.4)'
                                            },
                                            transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
                                        }}
                                        onClick={() => navigate(`/movie/${movie.id}`)}
                                    >
                                        <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                                            <CardMedia
                                                component="img"
                                                height="300"
                                                image={movie.poster}
                                                alt={movie.title}
                                                sx={{
                                                    transition: 'transform 0.4s ease-out',
                                                    '&:hover': {
                                                        transform: 'scale(1.05)'
                                                    }
                                                }}
                                            />
                                            <Box sx={{
                                                position: 'absolute',
                                                top: '10px',
                                                right: '10px',
                                                background: 'rgba(0, 0, 0, 0.7)',
                                                borderRadius: '16px',
                                                padding: '4px 8px',
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <StarIcon sx={{ color: '#FFD700', fontSize: '0.9rem', mr: 0.5 }} />
                                                <Typography variant="body2" sx={{ color: 'white', fontWeight: 'bold' }}>
                                                    {movie.rating}
                                                </Typography>
                                            </Box>
                                            <Box sx={{
                                                position: 'absolute',
                                                bottom: '0',
                                                left: '0',
                                                width: '100%',
                                                background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                                                height: '80px'
                                            }} />
                                        </Box>
                                        <CardContent sx={{ position: 'relative' }}>
                                            <Typography variant="h6" sx={{
                                                color: 'white',
                                                fontWeight: 'bold',
                                                mb: 1
                                            }}>
                                                {movie.title}
                                            </Typography>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <Typography variant="body2" sx={{ color: '#64b5f6' }}>
                                                    {movie.genre}
                                                </Typography>
                                                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                                                    {movie.year}
                                                </Typography>
                                            </Box>
                                        </CardContent>
                                    </Card>
                                </motion.div>
                            </Grid>
                        ))}
                    </Grid>
                </motion.div>
            )}

            {!loading && results.length === 0 && (
                <Grow in={true} timeout={1000}>
                    <Box sx={{
                        textAlign: 'center',
                        mt: 6,
                        mb: 4,
                        p: 5,
                        background: 'rgba(30, 30, 40, 0.3)',
                        borderRadius: '12px',
                    }}>
                        <SearchIcon sx={{ fontSize: 60, color: '#64b5f6', opacity: 0.7, mb: 2 }} />
                        <Typography variant="h5" sx={{ color: '#e0e0e0', mb: 1 }}>
                            No results found for "{query}"
                        </Typography>
                        <Typography variant="body1" sx={{ color: '#9e9e9e' }}>
                            Try different keywords or check spelling
                        </Typography>
                    </Box>
                </Grow>
            )}
        </Box>
    );
};

export default SearchResults;