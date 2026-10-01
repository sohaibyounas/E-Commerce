import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff, Lock, Check } from 'lucide-react';
import { Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

export const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  const passwordRules = [
    { label: 'At least 8 characters', valid: form.password.length >= 8 },
    { label: 'Contains uppercase letter', valid: /[A-Z]/.test(form.password) },
    { label: 'Contains number', valid: /[0-9]/.test(form.password) },
    { label: 'Contains special character', valid: /[!@#$%^&*]/.test(form.password) },
  ];

  if (success) {
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
              <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'success.light', color: 'success.contrastText', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
                <Check size={32} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Password reset</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Your password has been successfully reset</Typography>
              <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5 }}>
                Continue to login
              </Button>
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
                <Lock size={26} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Set new password</Typography>
              <Typography variant="body2" color="text.secondary">Your new password must be different from previous passwords</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              <TextField
                label="New Password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color="rgba(77, 42, 0, 0.5)" />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Confirm Password"
                type="password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                fullWidth
                required
                error={form.confirmPassword !== '' && form.password !== form.confirmPassword}
                helperText={form.confirmPassword !== '' && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Lock size={18} color="rgba(77, 42, 0, 0.5)" />
                      </InputAdornment>
                    ),
                  },
                }}
              />

              <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, p: 2 }}>
                {passwordRules.map((rule, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                    <Box sx={{ width: 18, height: 18, borderRadius: '50%', bgcolor: rule.valid ? 'success.main' : 'divider', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {rule.valid && <Check size={12} color="white" />}
                    </Box>
                    <Typography variant="caption" sx={{ color: rule.valid ? 'success.main' : 'text.secondary', fontWeight: rule.valid ? 600 : 400 }}>
                      {rule.label}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>
                {loading ? 'Updating...' : 'Reset Password'}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};
