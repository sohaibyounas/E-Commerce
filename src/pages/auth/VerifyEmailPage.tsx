import { useState } from 'react';
import { Box, Card, CardContent, Button, Typography, Link } from '@mui/material';
import { MailCheck, ArrowLeft } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const VerifyEmailPage = () => {
  const [loading, setLoading] = useState(false);

  const handleResend = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default', p: { xs: 2, sm: 3 } }}>
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ width: '100%', maxWidth: 440 }}
      >
        <Card sx={{ boxShadow: '0 8px 30px rgba(77, 42, 0, 0.08)', borderRadius: 3, border: '1px solid', borderColor: 'divider', textAlign: 'center' }}>
          <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <MailCheck size={32} />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Verify your email</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              We&apos;ve sent a verification link to your email address. Please check your inbox and click the link to activate your account.
            </Typography>
            <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5, mb: 2 }}>
              Continue to login
            </Button>
            <Typography variant="body2" color="text.secondary">
              Did not receive the email?{' '}
              <Link onClick={handleResend} sx={{ cursor: 'pointer', fontWeight: 600, color: 'primary.main' }}>
                {loading ? 'Sending...' : 'Resend'}
              </Link>
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Link component={RouterLink} to="/register" sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.75, color: 'text.secondary', '&:hover': { color: 'primary.main' } }}>
                <ArrowLeft size={16} /> Back to register
              </Link>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};
