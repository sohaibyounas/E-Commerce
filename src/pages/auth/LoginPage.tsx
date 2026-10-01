import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, Divider, Checkbox, FormControlLabel, Alert, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, ShoppingBag } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/dashboard'); }, 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ShoppingBag sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>Welcome back</Typography>
            <Typography variant="body2" color="text.secondary">Sign in to your admin account</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Email Address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
            <TextField label="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.disabled' }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <FormControlLabel control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />} label={<Typography variant="body2">Remember me</Typography>} />
              <Link component={RouterLink} to="/forgot-password" variant="body2">Forgot password?</Link>
            </Box>

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} sx={{ py: 1.5 }}>{loading ? 'Signing in...' : 'Sign In'}</Button>
          </Box>

          <Divider sx={{ my: 3 }}><Typography variant="body2" color="text.secondary">OR</Typography></Divider>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20 }} />}>Google</Button>
            <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/448224/microsoft.svg" alt="Microsoft" style={{ width: 20 }} />}>Microsoft</Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Don&apos;t have an account? <Link component={RouterLink} to="/register" fontWeight={600}>Sign up</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
