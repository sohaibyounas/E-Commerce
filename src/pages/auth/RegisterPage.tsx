import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, Divider, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff, Email, Lock, Person, ShoppingBag } from '@mui/icons-material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/verify-email'); }, 1000);
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'grey.50', p: 2 }}>
      <Card sx={{ maxWidth: 420, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <ShoppingBag sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
            <Typography variant="h4" fontWeight={700}>Create account</Typography>
            <Typography variant="body2" color="text.secondary">Start your 14-day free trial</Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Person sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
            <TextField label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Email sx={{ color: 'text.disabled' }} /></InputAdornment> }} />
            <TextField label="Password" name="password" type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start"><Lock sx={{ color: 'text.disabled' }} /></InputAdornment>, endAdornment: <InputAdornment position="end"><IconButton onClick={() => setShowPassword(!showPassword)} edge="end">{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton></InputAdornment> }} />
            <TextField label="Confirm Password" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} fullWidth required error={form.confirmPassword !== '' && form.password !== form.confirmPassword} helperText={form.confirmPassword !== '' && form.password !== form.confirmPassword ? 'Passwords do not match' : ''} />

            <FormControlLabel control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} />} label={<Typography variant="body2">I agree to the <Link href="#">Terms</Link> and <Link href="#">Privacy Policy</Link></Typography>} />

            <Button type="submit" variant="contained" size="large" fullWidth disabled={loading || !agree} sx={{ py: 1.5 }}>{loading ? 'Creating account...' : 'Create Account'}</Button>
          </Box>

          <Divider sx={{ my: 3 }}><Typography variant="body2" color="text.secondary">OR</Typography></Divider>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 20 }} />}>Google</Button>
            <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/448224/microsoft.svg" alt="Microsoft" style={{ width: 20 }} />}>Microsoft</Button>
          </Box>

          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account? <Link component={RouterLink} to="/login" fontWeight={600}>Sign in</Link>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
