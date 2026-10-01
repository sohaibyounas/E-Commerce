import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Chip, Button,
  Divider, Table, TableBody, TableRow, TableCell, Tabs, Tab,
} from '@mui/material';
import {
  Edit2, Trash2, ArrowLeft, Star, Package,
} from 'lucide-react';
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
        <Package size={60} color="#CC6F00" style={{ opacity: 0.5, marginBottom: 16 }} />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Product not found</Typography>
        <Button onClick={() => navigate('/products')} sx={{ mt: 2 }} variant="outlined">
          Back to products
        </Button>
      </Box>
    );
  }

  const stats = [
    { label: 'Total Views', value: '12.5k', change: 12 },
    { label: 'Sold Units', value: '145', change: 8 },
    { label: 'Estimated Revenue', value: `$${((product.salePrice || product.price) * 145).toLocaleString()}`, change: 15 },
  ];

  return (
    <Box>
      <PageHeader
        title={product.name}
        subtitle={`SKU: ${product.sku}`}
        breadcrumbs={[{ label: 'Products', href: '/products' }, { label: product.name }]}
        action={{
          label: 'Edit Product',
          onClick: () => navigate(`/products/${id}/edit`),
          icon: <Edit2 size={16} />,
        }}
      />

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        {/* Product Media Column */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Avatar
                src={product.images[0]}
                variant="rounded"
                sx={{
                  width: '100%',
                  height: { xs: 240, sm: 300, md: 340 },
                  mb: 2,
                  borderRadius: 2.5,
                  objectFit: 'cover',
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              />
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1, fontWeight: 600 }}>
                Color Variants
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['#F2A900', '#CC6F00', '#4D2A00', '#16a34a', '#0284c7'].map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: color,
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      transition: 'transform 0.15s, border-color 0.15s',
                      '&:hover': { transform: 'scale(1.08)', borderColor: '#F2A900' },
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Product Details & Specs Column */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Grid container spacing={2} sx={{ mb: 3 }}>
            {stats.map((stat) => (
              <Grid key={stat.label} size={{ xs: 12, sm: 4 }}>
                <StatCard title={stat.label} value={stat.value} change={stat.change} color="#CC6F00" />
              </Grid>
            ))}
          </Grid>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800, color: 'primary.main', fontSize: { xs: '1.75rem', sm: '2rem' } }}>
                    ${(product.salePrice || product.price).toFixed(2)}
                  </Typography>
                  {product.salePrice && (
                    <Typography variant="body1" sx={{ textDecoration: 'line-through', color: 'text.disabled' }}>
                      ${product.price.toFixed(2)}
                    </Typography>
                  )}
                </Box>
                <StatusChip status={product.status} size="medium" />
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Star size={18} fill="#F2A900" color="#F2A900" />
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>{product.rating}</Typography>
                  <Typography variant="body2" color="text.secondary">({product.reviews} reviews)</Typography>
                </Box>
                <Chip label={product.category} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                  <Package size={16} color="#CC6F00" />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {product.stock} units in stock
                  </Typography>
                </Box>
              </Box>

              <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
                {product.description}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Tabs
                value={tab}
                onChange={(_, v) => setTab(v)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  '& .MuiTab-root': { fontWeight: 600 },
                  '& .Mui-selected': { color: 'primary.main' },
                }}
              >
                <Tab label="Details" />
                <Tab label="Pricing" />
                <Tab label="Inventory" />
              </Tabs>

              <Box sx={{ width: '100%', overflowX: 'auto', mt: 2 }}>
                {tab === 0 && (
                  <Table sx={{ minWidth: 280 }}>
                    <TableBody>
                      <TableRow><TableCell sx={{ border: 'none', width: 140, fontWeight: 700 }}>SKU</TableCell><TableCell sx={{ border: 'none' }}>{product.sku}</TableCell></TableRow>
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Category</TableCell><TableCell sx={{ border: 'none' }}>{product.category}</TableCell></TableRow>
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Created</TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.createdAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Last Updated</TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.updatedAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                )}

                {tab === 1 && (
                  <Table sx={{ minWidth: 280 }}>
                    <TableBody>
                      <TableRow><TableCell sx={{ border: 'none', width: 140, fontWeight: 700 }}>Regular Price</TableCell><TableCell sx={{ border: 'none', fontWeight: 600 }}>${product.price.toFixed(2)}</TableCell></TableRow>
                      {product.salePrice && <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Sale Price</TableCell><TableCell sx={{ border: 'none', fontWeight: 700, color: 'primary.main' }}>${product.salePrice.toFixed(2)}</TableCell></TableRow>}
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Discount</TableCell><TableCell sx={{ border: 'none' }}>{product.salePrice ? `${Math.round((1 - product.salePrice / product.price) * 100)}% off` : 'None'}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                )}

                {tab === 2 && (
                  <Table sx={{ minWidth: 280 }}>
                    <TableBody>
                      <TableRow><TableCell sx={{ border: 'none', width: 140, fontWeight: 700 }}>Current Stock</TableCell><TableCell sx={{ border: 'none', fontWeight: 600 }}>{product.stock} units</TableCell></TableRow>
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Stock Status</TableCell><TableCell sx={{ border: 'none' }}><StatusChip status={product.stock === 0 ? 'out_of_stock' : product.stock < 50 ? 'low_stock' : 'in_stock'} /></TableCell></TableRow>
                      <TableRow><TableCell sx={{ border: 'none', fontWeight: 700 }}>Last Restocked</TableCell><TableCell sx={{ border: 'none' }}>{format(new Date(product.updatedAt), 'MMM dd, yyyy')}</TableCell></TableRow>
                    </TableBody>
                  </Table>
                )}
              </Box>
            </CardContent>
          </Card>

          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/products')}
              sx={{ flex: { xs: 1, sm: 'none' } }}
            >
              Back
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Trash2 size={16} />}
              onClick={() => setDeleteDialog(true)}
              sx={{ flex: { xs: 1, sm: 'none' } }}
            >
              Delete
            </Button>
          </Box>
        </Grid>
      </Grid>

      <ConfirmDialog
        open={deleteDialog}
        title="Delete Product"
        message={`Are you sure you want to delete "${product.name}"? This action cannot be undone.`}
        onConfirm={() => { setDeleteDialog(false); navigate('/products'); }}
        onCancel={() => setDeleteDialog(false)}
        isDestructive
      />
    </Box>
  );
};
