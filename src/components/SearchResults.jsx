import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { Typography, Box, Grid, Card, CardMedia, CardContent } from '@mui/material';
import moviePoster1 from '../assets/1.jpg';
import moviePosterA from '../assets/a.jpg';
import moviePosterB from '../assets/b.jpg';

const SearchResults = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const navigate = useNavigate();
    const [results, setResults] = useState([]);

    const movies = [
        { id: 1, title: "Death of a Unicorn", poster: moviePoster1 },
        { id: 2, title: "Movie 2", poster: moviePosterB },
        { id: 3, title: "Movie 3", poster: moviePosterA },
        { id: 4, title: "Another Unicorn", poster: moviePosterB },
        { id: 5, title: "The Last Movie", poster: moviePosterA }
    ];

    useEffect(() => {
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
    }, [query, location.search]);

    return (
        <Box sx={{ maxWidth: '1200px', margin: '20px auto', padding: '20px', color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
                Search Results for "{query}"
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                {results.length} results found
            </Typography>

            <Grid container spacing={3}>
                {results.map(movie => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
                        <Card 
                            sx={{ 
                                bgcolor: '#1f1f1f',
                                cursor: 'pointer',
                                '&:hover': { transform: 'scale(1.03)' },
                                transition: 'transform 0.2s'
                            }}
                            onClick={() => navigate(`/movie/${movie.id}`)}
                        >
                            <CardMedia
                                component="img"
                                height="300"
                                image={movie.poster}
                                alt={movie.title}
                            />
                            <CardContent>
                                <Typography variant="h6" sx={{ color: 'white' }}>
                                    {movie.title}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {results.length === 0 && (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 4, color: '#888' }}>
                    No results found for "{query}"
                </Typography>
            )}
        </Box>
    );
};

export default SearchResults;