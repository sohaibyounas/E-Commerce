import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Avatar, Chip, Button, IconButton, Divider, Table, TableBody, TableRow, TableCell, Paper, Tabs, Tab } from '@mui/material';
import { Edit, Delete, ArrowBack, Share, Star, Inventory, LocalOffer, ShoppingBag, TrendingUp } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, StatusChip, ConfirmDialog, StatCard } from '../../components/common';
import { getProductById } from '../../data';
import { format } from 'date-fns';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id || '');
  const [tab, setTab] = useState(0);
  const [deleteDialog, setDeleteDialog] = useState(false);

  if (!product) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Inventory sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
        <Typography variant="h6">Product not found</Typography>
        <Button onClick={() => navigate('/products')}>Back to products</Button>
      </Box>
    );
  }

  const stats = [
    { label: 'Total Views', value: '12.5k', change: 12 },
    { label: 'Sold', value: '145', change: 8 },
    { label: 'Revenue', value: `$${((product.salePrice || product.price) * 145).toLocaleString()}`, change: 15 },
  ];

  return (
    <Box>
      <PageHeader
        title={product.name}
        subtitle={`SKU: ${product.sku}`}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]}
        action={{ label: 'Edit Product', onClick: () => navigate(`/products/${id}/edit`), icon: <Edit /> }}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Avatar src={product.images[0]} variant="rounded" sx={{ width: '100%', height: 300, mb: 2, borderRadius: 2 }} />
              <Box sx={{ display: 'flex', gap: 1 }}>
                {['#3b82f6', '#10b981', '#f59e0b', '#ef4444'].map((color) => (
                  <Box key={color} sx={{ width: 60, height: 60, borderRadius: 1, bgcolor: color, cursor: 'pointer', opacity: 0.5, '&:hover': { opacity: 1 } }} />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                <StatCard title={stat.label} value={stat.value} change={stat.change} />
              </Grid>
            ))}
          </Grid>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>${(product.salePrice || product.price).toFixed(2)}</Typography>
                  {product.salePrice && <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>${product.price.toFixed(2)}</Typography>}
                </Box>
                <StatusChip status={product.status} />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Star sx={{ color: 'warning.main', fontSize: 20 }} /><Typography variant="body2" fontWeight={600}>{product.rating}</Typography><Typography variant="body2" color="text.secondary">({product.reviews} reviews)</Typography></Box>
                <Chip label={product.category} size="small" variant="outlined" />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}><Inventory fontSize="small" color={product.stock > 50 ? 'success' : product.stock > 0 ? 'warning' : 'error'} /><Typography variant="body2">{product.stock} in stock</Typography></Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>{product.description}</Typography>

              <Divider sx={{ my: 2 }} />

              <Tabs value={tab} onChange={(_, v) => setTab(v)}>
                <Tab label="Details" />
                <Tab label="Pricing" />
                <Tab label="Inventory" />
              </Tabs>

              {tab === 0 && (
                <Table sx={{ mt: 2 }}>
                  <TableBody>
                    <TableRow><TableCell sx={{ border: 'none', width: 150 }}><Typography fontWeight={600}>SKU</Typography></TableCell><TableCell sx={{ border: 'none' }}>{product.sku}</TableCell></TableRow>
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Category</Typography></TableCell><TableCell sx={{ border: 'none' }}>{product.category}</TableCell></TableRow>
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Created</Typography></TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.createdAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Last Updated</Typography></TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.updatedAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                  </TableBody>
                </Table>
              )}

              {tab === 1 && (
                <Table sx={{ mt: 2 }}>
                  <TableBody>
                    <TableRow><TableCell sx={{ border: 'none', width: 150 }}><Typography fontWeight={600}>Regular Price</Typography></TableCell><TableCell sx={{ border: 'none' }}>${product.price.toFixed(2)}</TableCell></TableRow>
                    {product.salePrice && <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Sale Price</Typography></TableCell><TableCell sx={{ border: 'none' }}>${product.salePrice.toFixed(2)}</TableCell></TableRow>}
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Discount</Typography></TableCell><TableCell sx={{ border: 'none' }}>{product.salePrice ? `${Math.round((1 - product.salePrice / product.price) * 100)}% off` : 'None'}</TableCell></TableRow>
                  </TableBody>
                </Table>
              )}

              {tab === 2 && (
                <Table sx={{ mt: 2 }}>
                  <TableBody>
                    <TableRow><TableCell sx={{ border: 'none', width: 150 }}><Typography fontWeight={600}>Current Stock</Typography></TableCell><TableCell sx={{ border: 'none' }}>{product.stock} units</TableCell></TableRow>
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Status</Typography></TableCell><TableCell sx={{ border: 'none' }}><StatusChip status={product.stock === 0 ? 'out_of_stock' : product.stock < 50 ? 'low_stock' : 'in_stock'} /></TableCell></TableRow>
                    <TableRow><TableCell sx={{ border: 'none' }}><Typography fontWeight={600}>Last Restocked</Typography></TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.updatedAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/products')}>Back</Button>
            <Button variant="outlined" color="error" startIcon={<Delete />} onClick={() => setDeleteDialog(true)}>Delete</Button>
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog open={deleteDialog} title="Delete Product" message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`} onConfirm={() => { setDeleteDialog(false); navigate('/products'); }} onCancel={() => setDeleteDialog(false)} isDestructive />
    </Box>
  );
};
