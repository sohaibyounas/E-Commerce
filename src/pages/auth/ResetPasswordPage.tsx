import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Lock, Check } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

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
      <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
        <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3, textAlign: 'center' }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'success.light', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2 }}>
              <Check sx={{ fontSize: 32, color: 'success.main' }} />
            </Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>Password reset</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>Your password has been successfully reset</Typography>
            <Button component={RouterLink} to="/login" variant="contained" fullWidth sx={{ py: 1.5 }}>Continue to login</Button>
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
            <Typography variant="h4" fontWeight={700} gutterBottom>Set new password</Typography>
            <Typography variant="body2" color="text.secondary">Your new password must be different from previous passwords</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="New Password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.disabled' }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
            <TextField label="Confirm Password" type="password" value={form.confirmPassword} onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })} fullWidth required error={form.confirmPassword !== '' && form.password !== form.confirmPassword} helperText={form.confirmPassword !== '' && form.password !== form.confirmPassword ? 'Passwords do not match' : ''} />

            <Box sx={{ bgcolor: 'grey.100', borderRadius: 1, p: 1.5 }}>
              {passwordRules.map((rule, i) => (
                <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.25 }}>
                  <Box sx={{ width: 16, height: 16, borderRadius: '50%', bgcolor: rule.valid ? 'success.main' : 'grey.300', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {rule.valid && <Check sx={{ fontSize: 12, color: 'white' }} />}
                  </Box>
                  <Typography variant="caption" color={rule.valid ? 'success.main' : 'text.secondary'}>{rule.label}</Typography>
                </Box>
              ))}
            </Box>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>Reset Password</Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
