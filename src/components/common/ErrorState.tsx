import { Box, Typography, Button, Alert, AlertTitle } from '@mui/material';
import { AlertCircle, RotateCcw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({ title = 'Something went wrong', message, onRetry }: ErrorStateProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 5, sm: 8 }, px: 3, textAlign: 'center' }}>
    <Box sx={{ color: 'error.main', mb: 2, display: 'flex', justifyContent: 'center' }}>
      <AlertCircle size={56} strokeWidth={1.5} />
    </Box>
    <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>{title}</Typography>
    {message && <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>{message}</Typography>}
    {onRetry && (
      <Button variant="outlined" startIcon={<RotateCcw size={18} />} onClick={onRetry}>
        Try Again
      </Button>
    )}
  </Box>
);

export const ErrorAlert = ({ title, message, onRetry }: { title?: string; message: string; onRetry?: () => void }) => (
  <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
    {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
    {message}
    {onRetry && (
      <Button size="small" onClick={onRetry} sx={{ ml: 2, fontWeight: 600 }}>
        Retry
      </Button>
    )}
  </Alert>
);
