import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, TextField, Button, FormControl,
  InputLabel, Select, MenuItem, InputAdornment, Avatar, Switch, FormControlLabel,
} from '@mui/material';
import { UploadCloud } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { PageHeader } from '../../components/common';
import { getProductById, categories } from '../../data';

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
      <PageHeader
        title="Add New Product"
        subtitle="Create a new product listing in your catalog"
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: 'Add New' }]}
      />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField label="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12 }}><TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={4} fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select value={form.category} label="Category" onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        <MenuItem value="">Select category</MenuItem>
                        {categories.map((cat) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Pricing & Inventory</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Regular Price ($)"
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      fullWidth
                      required
                      slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Sale Price ($)"
                      type="number"
                      value={form.salePrice}
                      onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                      fullWidth
                      slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Stock Quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select value={form.status} label="Status" onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="archived">Archived</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Product Media</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={form.image}
                    variant="rounded"
                    sx={{
                      width: '100%',
                      height: 180,
                      bgcolor: 'background.default',
                      border: '2px dashed',
                      borderColor: 'divider',
                      borderRadius: 2,
                    }}
                  >
                    {form.image ? null : <UploadCloud size={40} color="#CC6F00" style={{ opacity: 0.6 }} />}
                  </Avatar>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadCloud size={18} />}
                    fullWidth
                  >
                    Upload Image
                    <input type="file" hidden accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setForm({ ...form, image: URL.createObjectURL(file) }); }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>Visibility Settings</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Visible in store" />
                  <FormControlLabel control={<Switch defaultChecked color="primary" />} label="Available for purchase" />
                  <FormControlLabel control={<Switch color="primary" />} label="Track inventory" />
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Button variant="contained" type="submit" fullWidth disabled={loading}>
                    {loading ? 'Creating...' : 'Create Product'}
                  </Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/products')}>
                    Cancel
                  </Button>
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
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price.toString() || '',
    salePrice: product?.salePrice?.toString() || '',
    category: product?.categoryId || '',
    sku: product?.sku || '',
    stock: product?.stock.toString() || '',
    status: product?.status || 'active',
    image: product?.images[0] || '',
  });

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Product not found</Typography>
        <Button onClick={() => navigate('/products')} sx={{ mt: 2 }} variant="outlined">
          Back to products
        </Button>
      </Box>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); navigate('/products'); }, 1000);
  };

  return (
    <Box>
      <PageHeader
        title="Edit Product"
        subtitle={`Updating: ${product.name}`}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }, { label: 'Edit' }]}
      />

      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={{ xs: 2.5, md: 3 }}>
          <Grid size={{ xs: 12, md: 8 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Basic Information</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12 }}><TextField label="Product Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12 }}><TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={4} fullWidth /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="SKU" value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth required>
                      <InputLabel>Category</InputLabel>
                      <Select value={form.category} label="Category" onChange={(e) => setForm({ ...form, category: e.target.value })}>
                        {categories.map((cat) => <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Pricing & Inventory</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Regular Price ($)"
                      type="number"
                      value={form.price}
                      onChange={(e) => setForm({ ...form, price: e.target.value })}
                      fullWidth
                      required
                      slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      label="Sale Price ($)"
                      type="number"
                      value={form.salePrice}
                      onChange={(e) => setForm({ ...form, salePrice: e.target.value })}
                      fullWidth
                      slotProps={{ input: { startAdornment: <InputAdornment position="start">$</InputAdornment> } }}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}><TextField label="Stock Quantity" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} fullWidth required /></Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <FormControl fullWidth>
                      <InputLabel>Status</InputLabel>
                      <Select value={form.status} label="Status" onChange={(e) => setForm({ ...form, status: e.target.value })}>
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="archived">Archived</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Product Media</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                  <Avatar
                    src={form.image}
                    variant="rounded"
                    sx={{ width: '100%', height: 180, borderRadius: 2, border: '1px solid', borderColor: 'divider' }}
                  />
                  <Button variant="outlined" component="label" startIcon={<UploadCloud size={18} />} fullWidth>
                    Change Image
                    <input type="file" hidden accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) setForm({ ...form, image: URL.createObjectURL(file) }); }} />
                  </Button>
                </Box>
              </CardContent>
            </Card>

            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  <Button variant="contained" type="submit" fullWidth disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                  <Button variant="outlined" fullWidth onClick={() => navigate('/products')}>
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
