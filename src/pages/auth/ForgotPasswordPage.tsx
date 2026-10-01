import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link } from '@mui/material';
import { Email, ArrowBack, MarkEmailRead } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  if (submitted) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
        <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <MarkEmailRead sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>Check your email</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>We sent a password reset link to<br /><strong>{email}</strong></Typography>
            <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5 }}>Back to login</Button>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>Didn&apos;t receive the email? <Link onClick={() => setSubmitted(false)} sx={{ cursor: 'pointer' }}>Click to resend</Link></Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" fontWeight={700} gutterBottom>Forgot password?</Typography>
            <Typography variant="body2" color="text.secondary">No worries, we&apos;ll send you reset instructions</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required InputProps={{ startAdornment: <Box sx={{ mr: 1, color: 'text.disabled' }}><Email /></Box> }} />
            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>{loading ? 'Sending...' : 'Reset Password'}</Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Link component={RouterLink} to="/login" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5 }}><ArrowBack fontSize="small" /> Back to login</Link>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
