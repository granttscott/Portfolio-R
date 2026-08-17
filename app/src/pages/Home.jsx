import { Box, Typography, Container, keyframes } from '@mui/material';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import LinkIcon from '@mui/icons-material/Link';
import '../App.css';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-300px) skewX(5deg);
  }
  20% {
    opacity: 0.3;
  }
  60% {
    opacity: 1;
    transform: translateX(20px) skewX(-3deg);
  }
  100% {
    opacity: 1;
    transform: translateX(0) skewX(0);
  }
`;

const portalAppear = keyframes`
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  20% {
    opacity: 0.8;
    transform: scaleX(1);
  }
  60% {
    opacity: 0.4;
  }
  100% {
    opacity: 0;
    transform: scaleX(0);
  }
`;

const Home = ({ isOpen, setIsOpen }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const elementRef = useRef(null);
    const containerRef = useRef(null);

    // Set initial position when component mounts
    useEffect(() => {
        if (containerRef.current && elementRef.current) {
            const containerRect = containerRef.current.getBoundingClientRect();
            const elementRect = elementRef.current.getBoundingClientRect();
            
            // Calculate initial position (80% of container width, 20% of container height)
            const initialX = 0
            const initialY = 0
            
            setPosition({ x: initialX, y: initialY });
        }
    }, []);

    const handleMouseMove = (e) => {
        if (!elementRef.current || !containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const elementRect = elementRef.current.getBoundingClientRect();
        const elementCenterX = elementRect.left + elementRect.width / 2;
        const elementCenterY = elementRect.top + elementRect.height / 2;

        // Calculate distance and direction from cursor
        const dx = elementCenterX - e.clientX;
        const dy = elementCenterY - e.clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Only move if cursor is within 200px
        if (distance < 200) {
            const angle = Math.atan2(dy, dx);
            const force = (200 - distance) / 200; // Stronger force when closer
            
            setPosition(prev => {
                const newX = prev.x + Math.cos(angle) * force * 5; // Reduced force multiplier
                const newY = prev.y + Math.sin(angle) * force * 5; // Reduced force multiplier

                // Calculate boundaries
                const padding = 20;
                const maxX = containerRect.width * 0.14 - elementRect.width;  // Reduced to 40% of container width
                const maxY = containerRect.height * 0.18 - elementRect.height;
                const minX = -containerRect.width * 0.84;  // Allow movement 85% of container width to the left
                const minY = -containerRect.height * 0.80;  // Allow movement 80% of container height up

                // Ensure position stays within container bounds
                return {
                    x: Math.max(minX, Math.min(newX, maxX)),
                    y: Math.max(minY, Math.min(newY, maxY))
                };
            });
        }
    };

    const handleOpenSidebar = () => {
        setIsOpen(true);
    }

    return (
        <Box 
            ref={containerRef}
            sx={{ 
                minHeight: '100vh', 
                maxHeight: '100vh', 
                height: '100%', 
                width: '100%', 
                overflow: 'hidden',
                position: 'relative'
            }}
            onMouseMove={handleMouseMove}
        >
            <Container sx={{ minHeight: '100vh', maxHeight: '100vh', height: '100%', width: '100%', overflow: 'hidden'}} maxWidth="lg">
                <Box 
                    id="home" 
                    onClick={() => {handleOpenSidebar()}}
                    sx={{
                        minHeight: '100vh',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        pb: 10,
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                            transform: 'scale(1.02)',
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: "-8%",
                            top: '25%',
                            width: '4px',
                            height: '40%',
                            background: 'linear-gradient(180deg, rgba(44, 62, 80, 0) 0%, rgba(44, 62, 80, 0.8) 50%, rgba(44, 62, 80, 0) 100%)',
                            animation: `${portalAppear} 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                            boxShadow: '0 0 20px rgba(44, 62, 80, 0.3)',
                            borderRadius: '2px'
                        }
                    }}
                >
                    <Typography 
                        variant="h1" 
                        sx={{
                            fontSize: '4rem',
                            fontWeight: 700,
                            mb: 3,
                            background: 'linear-gradient(45deg, #2c3e50, #34495e)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent',
                            animation: `${slideIn} 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards`,
                            opacity: 0
                        }}
                    >
                        Grant Scott
                    </Typography>
                    <Typography 
                        variant="h4" 
                        sx={{
                            mb: 4,
                            color: '#2c3e50',
                            maxWidth: '800px',
                            animation: `${slideIn} 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards`,
                            opacity: 0
                        }}
                    >
                        Software Developer
                    </Typography>
                </Box>
            </Container>

            <Box
                ref={elementRef}
                component="a"
                href="https://loading-969b6.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                    position: 'absolute',
                    left: '84%',
                    top: '80%',
                    width: '60px',
                    height: '50px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.8), rgba(41, 128, 185, 0.9))',
                    backdropFilter: 'blur(5px)',
                    cursor: 'pointer',
                    transform: `translate(${position.x}px, ${position.y}px)`,
                    transition: 'transform 0.1s linear, box-shadow 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', gap: 0 }}>
                    <LinkIcon sx={{ color: 'white', fontSize: '1.5rem' }} />
                    <Typography sx={{ color: 'white', fontSize: '0.8rem' }}>Jokes</Typography>
                </Box>
            </Box>
        </Box>
    );
}

export default Home;