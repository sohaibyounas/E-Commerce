import { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Link } from '@mui/material';
import { MarkEmailRead, ArrowBack } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3, textAlign: 'center' }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: 'primary.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
            <MarkEmailRead sx={{ fontSize: 40, color: 'primary.main' }} />
          </Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>Verify your email</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to activate your account.</Typography>
          <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5, mb: 2 }}>Continue to login</Button>
          <Typography variant="body2" color="text.secondary">
            Did not receive the email? <Link onClick={handleResend} sx={{ cursor: 'pointer', fontWeight: 600 }}>{loading ? 'Sending...' : 'Resend'}</Link>
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Link component={RouterLink} to="/register" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}><ArrowBack fontSize="small" /> Back to register</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
