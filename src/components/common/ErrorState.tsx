import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import { Error, Refresh } from '@mui/icons-material';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, px: 3, textAlign: 'center' }}>
    <Error sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
    <Typography variant="h6" color="text.primary" gutterBottom>{title}</Typography>
    {message && <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>{message}</Typography>}
    {onRetry && <Button variant="outlined" startIcon={<Refresh />} onClick={onRetry}>Try Again</Button>}
  </Box>
);

export const ErrorAlert = ({ title, message, onRetry }: { title?: string; message: string; onRetry?: () => void }) => (
  <Alert severity="error" sx={{ mb: 2 }}>
    {title && <AlertTitle>{title}</AlertTitle>}
    {message}
    {onRetry && <Button size="small" onClick={onRetry} sx={{ ml: 2 }}>Retry</Button>}
  </Alert>
);
