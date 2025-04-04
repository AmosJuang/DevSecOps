import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import moviePoster from '../assets/1.jpg';

const MovieDetails = () => {
    const { id } = useParams();
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(5);
    const [guestName, setGuestName] = useState('');
    const [comments, setComments] = useState([
        { id: 1, user: 'Guest123', comment: 'Great movie!', rating: 4, date: '2024-03-17' },
        { id: 2, user: 'Guest456', comment: 'Loved the plot twists', rating: 5, date: '2024-03-16' }
    ]);

    // URL YouTube yang diperbaiki - menggunakan ID trailer yang valid
    const youtubeVideoId = "https://youtu.be/uLtkt8BonwM?si=ZUFQaCvt1K2exDeQ"; // Ganti dengan ID video YouTube yang sesuai

    const handleSubmitReview = (e) => {
        e.preventDefault();
        if (!guestName.trim()) {
            alert('Please enter a guest name');
            return;
        }
        if (!newComment.trim()) {
            alert('Please enter a comment');
            return;
        }

        const newReview = {
            id: comments.length + 1,
            user: `Guest_${guestName}`,
            comment: newComment,
            rating: newRating,
            date: new Date().toISOString().split('T')[0]
        };
        setComments([...comments, newReview]);
        setNewComment('');
        setGuestName('');
        setNewRating(5);
    };

    const styles = {
        container: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '30px',
            color: '#fff',
            backgroundColor: '#141414',
            borderRadius: '12px',
            boxShadow: '0 8px 20px rgba(0,0,0,0.2)'
        },
        header: {
            display: 'flex',
            gap: '40px',
            marginBottom: '50px',
            alignItems: 'flex-start'
        },
        posterContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
            minWidth: '300px'
        },
        poster: {
            width: '300px',
            height: '450px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.6)'
        },
        rating: {
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#f5c518',
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.3)',
            padding: '10px 15px',
            borderRadius: '8px',
            marginTop: '10px',
            width: '100%'
        },
        info: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            fontSize: '42px',
            fontWeight: 'bold',
            marginBottom: '25px',
            color: '#fff',
            textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        },
        detailsRow: {
            display: 'flex',
            justifyContent: 'flex-start',
            flexWrap: 'wrap',
            gap: '15px',
            marginBottom: '25px',
            fontSize: '16px',
            color: '#ccc'
        },
        detailItem: {
            backgroundColor: 'rgba(255,255,255,0.1)',
            padding: '8px 15px',
            borderRadius: '20px',
            display: 'inline-block'
        },
        synopsis: {
            fontSize: '18px',
            lineHeight: '1.8',
            marginBottom: '30px',
            color: '#e5e5e5',
            backgroundColor: 'rgba(0,0,0,0.2)',
            padding: '20px',
            borderRadius: '10px',
            borderLeft: '4px solid #E50914'
        },
        videoSection: {
            margin: '30px 0 50px 0'
        },
        videoContainer: {
            position: 'relative',
            paddingBottom: '56.25%', // Aspek rasio 16:9
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            backgroundColor: '#000',
            borderRadius: '12px',
            boxShadow: '0 8px 16px rgba(0,0,0,0.4)'
        },
        videoFrame: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px'
        },
        reviewSection: {
            width: '90%',
            margin: '0 auto',
            marginTop: '50px',
            borderTop: '3px solid #333',
            padding: '30px 0'
        },
        reviewForm: {
            backgroundColor: '#1f1f1f',
            padding: '25px',
            borderRadius: '12px',
            marginBottom: '30px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        },
        input: {
            width: '100%',
            padding: '12px 15px',
            marginBottom: '15px',
            borderRadius: '8px',
            border: '1px solid #444',
            backgroundColor: '#2d2d2d',
            color: '#fff',
            fontSize: '16px'
        },
        commentList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        },
        comment: {
            padding: '20px',
            backgroundColor: '#1f1f1f',
            borderRadius: '10px',
            borderLeft: '5px solid #E50914',
            fontSize: '16px',
            color: '#e5e5e5',
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
        },
        button: {
            background: 'linear-gradient(135deg, #E50914, #B20710)',
            border: 'none',
            padding: '12px 20px',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '16px',
            color: '#fff',
            transition: 'transform 0.2s, box-shadow 0.2s',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
        },
        buttonHover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 6px 12px rgba(0,0,0,0.4)'
        },
        sectionTitle: {
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '20px',
            color: '#fff',
            borderBottom: '3px solid #E50914',
            paddingBottom: '10px',
            display: 'inline-block'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <div style={styles.posterContainer}>
                    <img 
                        src={moviePoster}
                        alt="Movie Poster" 
                        style={styles.poster}
                    />
                    <div style={styles.rating}>
                        {'★'.repeat(4)}{'☆'.repeat(1)} 4.0/5.0
                    </div>
                </div>
                <div style={styles.info}>
                    <h1 style={styles.title}>Death of a Unicorn</h1>
                    
                    <div style={styles.detailsRow}>
                        <span style={styles.detailItem}>2024</span>
                        <span style={styles.detailItem}>143 min</span>
                        <span style={styles.detailItem}>Drama</span>
                        <span style={styles.detailItem}>Fantasy</span>
                        <span style={styles.detailItem}>Adventure</span>
                    </div>
                    
                    <p style={styles.synopsis}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
                        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
                        in culpa qui officia deserunt mollit anim id est laborum.
                        <br/><br/>
                        Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
                        doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
                        veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                    </p>
                    
                    <div style={{display: 'flex', gap: '15px'}}>
                        <button style={{...styles.button, backgroundColor: '#E50914'}}>
                            ▶ Watch Now
                        </button>
                        <button style={{...styles.button, backgroundColor: '#333'}}>
                            + Add to Watchlist
                        </button>
                    </div>
                </div>
            </div>

            {/* Bagian Video YouTube - Diperbaiki */}
            <div style={styles.videoSection}>
                <h2 style={styles.sectionTitle}>Official Trailer</h2>
                <div style={styles.videoContainer}>
                    <iframe 
                        style={styles.videoFrame}
                        src={`https://www.youtube.com/embed/${youtubeVideoId}?rel=0&showinfo=0`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div style={styles.reviewSection}>
                <h2 style={styles.sectionTitle}>Reviews & Comments</h2>
                <form style={styles.reviewForm} onSubmit={handleSubmitReview}>
                    <input
                        type="text"
                        style={styles.input}
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="Enter your name (as guest)"
                    />
                    <textarea
                        style={styles.input}
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your review..."
                        rows="4"
                    />
                    <div style={{ marginBottom: '15px', color: '#fff', fontSize: '16px' }}>
                        <label>Rating: </label>
                        <select 
                            value={newRating} 
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            style={{
                                padding: '8px 15px',
                                marginLeft: '10px',
                                borderRadius: '6px',
                                border: '1px solid #444',
                                backgroundColor: '#2d2d2d',
                                color: '#fff',
                                fontSize: '16px'
                            }}
                        >
                            {[1,2,3,4,5].map(num => (
                                <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <button 
                        type="submit" 
                        style={styles.button}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = '0 6px 12px rgba(0,0,0,0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 8px rgba(0,0,0,0.3)';
                        }}
                    >
                        Post Review as Guest
                    </button>
                </form>

                <div style={styles.commentList}>
                    {comments.map(comment => (
                        <div key={comment.id} style={styles.comment}>
                            <div style={{ 
                                fontWeight: 'bold', 
                                color: '#fff', 
                                fontSize: '18px',
                                marginBottom: '8px'
                            }}>
                                {comment.user}
                            </div>
                            <div style={{ 
                                color: '#f5c518', 
                                fontSize: '20px',
                                marginBottom: '10px'
                            }}>
                                {'★'.repeat(comment.rating)}{'☆'.repeat(5-comment.rating)}
                            </div>
                            <div style={{marginBottom: '10px', lineHeight: '1.6'}}>
                                {comment.comment}
                            </div>
                            <div style={{ 
                                fontSize: '14px', 
                                color: '#888',
                                backgroundColor: 'rgba(0,0,0,0.2)',
                                padding: '5px 10px',
                                borderRadius: '4px',
                                display: 'inline-block'
                            }}>
                                {comment.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;