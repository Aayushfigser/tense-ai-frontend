import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Card, CardContent, CardActions, CircularProgress } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { analyzeFuture } from '../services/apiService';
import theme from '../theme';

const Future = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await analyzeFuture({ text }); // Send text as an object
      setResult(response);
    } catch (error) {
      setError(error.response?.data?.error?.message || 'An error occurred while analyzing the future.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography component="h1" variant="h1" gutterBottom>
            Predict The Future
          </Typography>
          <Card sx={{ mt: 2, width: '100%', p: 2 }}>
            <CardContent>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="text"
                label="Future Projection Text"
                name="text"
                autoFocus
                multiline
                rows={4}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
            </CardContent>
            <CardActions>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                onClick={handleAnalyze}
                disabled={loading || !text.trim()}
              >
                {loading ? <CircularProgress size={24} /> : 'Analyze'}
              </Button>
            </CardActions>
          </Card>
          {result && (
            <Card sx={{ mt: 2, width: '100%', p: 2 }}>
              <CardContent>
                <Typography variant="h5">Analysis Result:</Typography>
                <Typography>{result}</Typography>
              </CardContent>
            </Card>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Future;
