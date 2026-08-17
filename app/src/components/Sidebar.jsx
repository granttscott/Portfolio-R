import { Box, IconButton, Drawer, List, ListItem, ListItemText, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, setIsOpen }) => {
    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Projects', path: '/projects' },
        { text: 'Resume', path: '/resume' }
    ];

    const navigate = useNavigate();
    const handleHomeClick = () => {
        navigate('/');
        setIsOpen(false);
    }
    return (
        <>
            <IconButton
                onClick={() => setIsOpen(true)}
                sx={{
                    position: 'fixed',
                    top: 20,
                    left: 20,
                    zIndex: 1000,
                    width: '45px',
                    height: '35px',
                    borderRadius: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.6)',
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    },
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    },
                    '&:focus': {
                        outline: 'none',
                        border: "none"
                    },
                    '&:focus-visible': {
                        outline: 'none',
                        border: "none"
                    }
                }}
            >
                <MenuIcon sx={{ 
                    color: '#2c3e50',
                    opacity: 0.8,
                    transition: 'opacity 0.3s ease',
                    '&:hover': {
                        opacity: 1
                    }
                }} />
            </IconButton>

            <Drawer
                anchor="left"
                open={isOpen}
                onClose={() => setIsOpen(false)}
                PaperProps={{
                    sx: {
                        width: 280,
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
                    }
                }}
            >
                <Box sx={{ p: 3 }}>
                    <Typography
                        variant="h6"
                        onClick={handleHomeClick}
                        sx={{
                            mb: 4,
                            background: 'linear-gradient(45deg, #2c3e50, #34495e)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            fontWeight: 700,
                            cursor: 'pointer'
                        }}
                    >
                        Grant Scott
                    </Typography>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                key={item.text}
                                component={Link}
                                to={item.path}
                                onClick={() => setIsOpen(false)}
                                sx={{
                                    mb: 1,
                                    borderRadius: '8px',
                                    transition: 'all 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: 'rgba(44, 62, 80, 0.05)',
                                        transform: 'translateX(5px)',
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={item.text}
                                    sx={{
                                        '& .MuiTypography-root': {
                                            color: '#2c3e50',
                                            fontWeight: 500,
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Sidebar; 