import { CircularProgress, Box, Typography } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner = ({ size = 40, message, fullScreen = false }: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', gap: 2 }}>
        <CircularProgress size={size} />
        {message && <Typography variant="body2" color="text.secondary">{message}</Typography>}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, gap: 2 }}>
      <CircularProgress size={size} />
      {message && <Typography variant="body2" color="text.secondary">{message}</Typography>}
    </Box>
  );
};
