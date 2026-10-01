import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, TextField, Button, FormControl, InputLabel, Select, MenuItem, InputAdornment, Avatar, IconButton, Divider, Switch, FormControlLabel, Chip, Alert } from '@mui/material';
import { ArrowBack, Upload, Delete } from '@mui/icons-material';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common';
import { getProductById, categories } from '../../data';
import type { Product } from '../../data';

export const ProductAddPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', description: '', price: '', salePrice: '', category: '', sku: '', stock: '', status: 'active', image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/products'); }, 1000);
  };

  return (
    <Box>
      <PageHeader title="Add New Product" subtitle="Create a new product in your catalog" breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Add New' }]} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField label="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12 }}><TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={4} fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required><InputLabel>Category</InputLabel><Select value={form.category} label="Category" onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      <MenuItem value="">Select category</MenuItem>
                      {categories.map((cat) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                    </Select></FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Pricing & Inventory</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Regular Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Sale Price" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Stock Quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth><InputLabel>Status</InputLabel><Select value={form.status} label="Status" onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select></FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Product Image</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar src={form.image} variant="rounded" sx={{ width: 200, height: 200, bgcolor: 'grey.100' }}>{form.image ? null : <Upload />}</Avatar>
                  <Button variant="outlined" component="label" startIcon={<Upload />}>Upload Image<input type="file" hidden accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setForm({ ...form, image: URL.createObjectURL(file) }); }} /></Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Product Visibility</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Visible in store" />
                <FormControlLabel control={<Switch defaultChecked />} label="Available for purchase" />
                <FormControlLabel control={<Switch />} label="Track inventory" />
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="contained" type="submit" fullWidth disabled={loading}>{loading ? 'Creating...' : 'Create Product'}</Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/products')}>Cancel</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export const ProductEditPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: product?.name || '', description: product?.description || '', price: product?.price.toString() || '', salePrice: product?.salePrice?.toString() || '', category: product?.categoryId || '', sku: product?.sku || '', stock: product?.stock.toString() || '', status: product?.status || 'active', image: product?.images[0] || '',
  });

  if (!product) {
    return <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h6">Product not found</Typography><Button onClick={() => navigate('/products')}>Back</Button></Box>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/products'); }, 1000);
  };

  return (
    <Box>
      <PageHeader title="Edit Product" subtitle={`Editing: ${product.name}`} breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }, { label: 'Edit' }]} />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField label="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12 }}><TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={4} fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required><InputLabel>Category</InputLabel><Select value={form.category} label="Category" onChange={(e) => setForm({ ...form, category: e.target.value })}>
                      {categories.map((cat) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                    </Select></FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Pricing & Inventory</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Regular Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} fullWidth required InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Sale Price" type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} fullWidth InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }} /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Stock Quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth><InputLabel>Status</InputLabel><Select value={form.status} label="Status" onChange={(e) => setForm({ ...form, status: e.target.value })}>
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="draft">Draft</MenuItem>
                      <MenuItem value="archived">Archived</MenuItem>
                    </Select></FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Product Image</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar src={form.image} variant="rounded" sx={{ width: 200, height: 200, bgcolor: 'grey.100' }} />
                  <Button variant="outlined" component="label" startIcon={<Upload />}>Change Image<input type="file" hidden accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setForm({ ...form, image: URL.createObjectURL(file) }); }} /></Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Button variant="contained" type="submit" fullWidth disabled={loading}>{loading ? 'Saving...' : 'Save Changes'}</Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/products')}>Cancel</Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
