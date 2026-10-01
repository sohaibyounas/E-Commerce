import { useState } from 'react';
import { Box, Card, CardContent, TextField, Button, Typography, Link, Divider, Checkbox, FormControlLabel, IconButton, InputAdornment } from '@mui/material';
import { Eye, EyeOff, Mail, Lock, User, ShoppingBag } from 'lucide-react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { motion } from 'framer-motion';

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
                <ShoppingBag size={28} />
              </Box>
              <Typography variant="h5" sx={{ fontWeight: 700 }} gutterBottom>Create account</Typography>
              <Typography variant="body2" color="text.secondary">Start your 14-day free trial</Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Full Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                fullWidth
                required
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <User size={18} color="rgba(77, 42, 0, 0.5)" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
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
              <TextField
                label="Password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={form.password}
                onChange={handleChange}
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
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                fullWidth
                required
                error={form.confirmPassword !== '' && form.password !== form.confirmPassword}
                helperText={form.confirmPassword !== '' && form.password !== form.confirmPassword ? 'Passwords do not match' : ''}
              />

              <FormControlLabel
                control={<Checkbox checked={agree} onChange={(e) => setAgree(e.target.checked)} color="primary" />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    I agree to the <Link href="#" sx={{ color: 'primary.main', fontWeight: 600 }}>Terms</Link> and{' '}
                    <Link href="#" sx={{ color: 'primary.main', fontWeight: 600 }}>Privacy Policy</Link>
                  </Typography>
                }
              />

              <Button type="submit" variant="contained" size="large" fullWidth disabled={loading || !agree} sx={{ py: 1.5, mt: 1 }}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </Box>

            <Divider sx={{ my: 2.5 }}>
              <Typography variant="caption" color="text.secondary">OR</Typography>
            </Divider>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" style={{ width: 18 }} />}>
                Google
              </Button>
              <Button variant="outlined" fullWidth startIcon={<img src="https://www.svgrepo.com/show/448224/microsoft.svg" alt="Microsoft" style={{ width: 18 }} />}>
                Microsoft
              </Button>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link component={RouterLink} to="/login" sx={{ color: 'primary.main', fontWeight: 600 }}>
                  Sign in
                </Link>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

