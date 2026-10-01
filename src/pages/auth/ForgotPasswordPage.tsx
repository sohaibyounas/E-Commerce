import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, InputAdornment } from '@mui/material';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

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
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: { xs: 2, sm: 3 } }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          style={{ width: '100%', maxWidth: 440 }}
        >
          <Card sx={{ boxShadow: '0 8px 30px rgba(77, 42, 0, 0.08)', borderRadius: 3, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
            <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <CheckCircle2 size={32} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Check your email</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                We sent a password reset link to<br />
                <Typography component="span" sx={{ fontWeight: 600, color: 'text.primary' }}>{email}</Typography>
              </Typography>
              <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5, mb: 2 }}>
                Back to login
              </Button>
              <Typography variant="body2" color="text.secondary">
                Didn&apos;t receive the email?{' '}
                <Link onClick={() => setSubmitted(false)} sx={{ cursor: 'pointer', fontWeight: 600, color: 'primary.main' }}>
                  Click to resend
                </Link>
              </Typography>
            </CardContent>
          </Card>
        </motion.div>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: { xs: 2, sm: 3 } }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 440 }}
      >
        <Card sx={{ boxShadow: '0 8px 30px rgba(77, 42, 0, 0.08)', borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Box sx={{ width: 56, height: 56, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <Mail size={26} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Forgot password?</Typography>
              <Typography variant="body2" color="text.secondary">No worries, we&apos;ll send you reset instructions</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Mail size={18} color="rgba(77, 42, 0, 0.5)" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>
                {loading ? 'Sending...' : 'Reset Password'}
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Link component={RouterLink} to="/login" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <ArrowLeft size={16} /> Back to login
              </Link>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};
