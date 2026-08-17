import { Box, Typography, Container, keyframes } from '@mui/material';

const slideIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const projectCardStyle = {
  p: 3,
  borderRadius: 2,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 8px 32px rgba(99, 102, 241, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.5)',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 40px rgba(99, 102, 241, 0.2)',
  }
};

const projectTitleStyle = {
  color: '#2c3e50',
  fontWeight: 600
};

function OtherWebsites() {
  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 20
      }}
    >
      <Container maxWidth="lg">
        <Typography 
          variant="h1" 
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            mb: 6,
            background: 'linear-gradient(45deg, #2c3e50, #34495e)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            animation: `${slideIn} 0.8s ease-out forwards`,
            textAlign: 'center'
          }}
        >
          Other Websites
        </Typography>

        <Box 
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
            gap: 3,
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto'
          }}
        >
          <a href="https://loading-969b6.web.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Box sx={projectCardStyle}>
              <Typography variant="h5" sx={projectTitleStyle}>
                Loading
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                Interactive loading experience with a twist
              </Typography>
            </Box>
          </a>

          <a href="https://keeper-c0904.web.app/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Box sx={projectCardStyle}>
              <Typography variant="h5" sx={projectTitleStyle}>
                Notes
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                Note-taking app with with Google authentication
              </Typography>
            </Box>
          </a>

          <a href="https://scottdevelopmentcompanies.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Box sx={projectCardStyle}>
              <Typography variant="h5" sx={projectTitleStyle}>
                Scott Development
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                Development company portfolio
              </Typography>
            </Box>
          </a>

          <a href="https://homepaversconstruction.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Box sx={projectCardStyle}>
              <Typography variant="h5" sx={projectTitleStyle}>
                Home Pavers Construction
              </Typography>
              <Typography variant="body2" sx={{ color: '#666', mt: 1 }}>
                Paving company sales page
              </Typography>
            </Box>
          </a>

        </Box>
      </Container>
    </Box>
  );
}

export default OtherWebsites; 