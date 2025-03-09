const Footer = () => {
    return (
        <footer style={{ background: '#222', color: '#fff', padding: '20px', textAlign: 'center' }}>
            <p>&copy; {new Date().getFullYear()} MovieSite. All rights reserved.</p>
            <p>
                <a href="/privacy" style={{ color: '#fff', margin: '0 10px' }}>Privacy Policy</a> |
                <a href="/terms" style={{ color: '#fff', margin: '0 10px' }}>Terms of Service</a>
            </p>
        </footer>
    );
};

export default Footer;