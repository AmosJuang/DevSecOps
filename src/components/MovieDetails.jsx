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

    // YouTube Video URL - Ganti dengan URL trailer film yang sesuai
    const youtubeVideoId = "https://youtu.be/uLtkt8BonwM?si=B3QERuHH9pfq8_q6"; // Contoh ID video dari YouTube

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
            maxWidth: '1000px',
            margin: '0 auto',
            padding: '20px',
            color: '#fff',
            backgroundColor: '#141414'
        },
        header: {
            display: 'flex',
            gap: '30px',
            marginBottom: '40px'
        },
        posterContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px'
        },
        poster: {
            width: '280px',
            height: '400px',
            objectFit: 'cover',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.4)'
        },
        rating: {
            fontSize: '24px',
            color: '#f5c518',
            textAlign: 'center'
        },
        info: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column'
        },
        title: {
            fontSize: '36px',
            marginBottom: '25px',
            color: '#fff'
        },
        synopsis: {
            fontSize: '16px',
            lineHeight: '1.8',
            marginBottom: '30px',
            color: '#e5e5e5'
        },
        videoSection: {
            margin: '20px 0 40px 0'
        },
        videoContainer: {
            position: 'relative',
            paddingBottom: '56.25%', // Aspek rasio 16:9
            height: 0,
            overflow: 'hidden',
            maxWidth: '100%',
            backgroundColor: '#000',
            borderRadius: '8px'
        },
        videoFrame: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '8px'
        },
        reviewSection: {
            width: '70%',
            margin: '0 auto',
            marginTop: '40px',
            borderTop: '2px solid #333',
            padding: '20px 0'
        },
        reviewForm: {
            backgroundColor: '#1f1f1f',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px'
        },
        input: {
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            borderRadius: '4px',
            border: '1px solid #333',
            backgroundColor: '#2d2d2d',
            color: '#fff'
        },
        commentList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
        },
        comment: {
            padding: '12px',
            backgroundColor: '#1f1f1f',
            borderRadius: '6px',
            borderLeft: '3px solid #E50914',
            fontSize: '14px',
            color: '#e5e5e5'
        },
        button: {
            background: '#E50914',
            border: 'none',
            padding: '8px 16px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
            color: '#fff',
            transition: 'background 0.2s'
        },
        sectionTitle: {
            fontSize: '24px',
            marginBottom: '15px',
            color: '#fff'
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
                    <h1 style={styles.title}>Death of a unicorn</h1>
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
                </div>
            </div>

            {/* Bagian Video YouTube */}
            <div style={styles.videoSection}>
                <h2 style={styles.sectionTitle}>Official Trailer</h2>
                <div style={styles.videoContainer}>
                    <iframe 
                        style={styles.videoFrame}
                        src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                        title="Movie Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>

            <div style={styles.reviewSection}>
                <h2 style={{ color: '#fff' }}>Reviews & Comments</h2>
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
                    <div style={{ marginBottom: '10px', color: '#fff' }}>
                        <label>Rating: </label>
                        <select 
                            value={newRating} 
                            onChange={(e) => setNewRating(Number(e.target.value))}
                            style={{
                                padding: '5px',
                                marginLeft: '10px',
                                borderRadius: '3px',
                                border: '1px solid #333',
                                backgroundColor: '#2d2d2d',
                                color: '#fff'
                            }}
                        >
                            {[1,2,3,4,5].map(num => (
                                <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" style={styles.button}>
                        Post Review as Guest
                    </button>
                </form>

                <div style={styles.commentList}>
                    {comments.map(comment => (
                        <div key={comment.id} style={styles.comment}>
                            <div style={{ fontWeight: 'bold', color: '#fff' }}>{comment.user}</div>
                            <div style={{ color: '#f5c518' }}>{'★'.repeat(comment.rating)}{'☆'.repeat(5-comment.rating)}</div>
                            <div>{comment.comment}</div>
                            <div style={{ fontSize: '0.8em', color: '#888' }}>{comment.date}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetails;