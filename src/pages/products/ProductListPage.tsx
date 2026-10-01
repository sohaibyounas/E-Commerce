import { useState, useMemo } from 'react';
import {
  Box, Card, CardContent, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Chip, Avatar, IconButton, Menu, MenuItem, TablePagination, TextField, InputAdornment,
  FormControl, InputLabel, Select, Button, ListItemIcon, ListItemText, Checkbox,
} from '@mui/material';
import { Search, MoreVertical, Pencil, Trash2, Eye, Plus, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PageHeader, StatusChip, EmptyState, ConfirmDialog } from '../../components/common';
import { products as allProducts } from '../../data';
import { categories } from '../../data';
import type { Product } from '../../data';

export const ProductListPage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selected, setSelected] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);

  const filtered = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase()) || product.sku.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || product.categoryId === categoryFilter;
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [search, categoryFilter, statusFilter]);

  const handleSelectAll = () => setSelected(selected.length === filtered.length ? [] : filtered.map((p) => p.id));
  const handleSelect = (id: string) => setSelected(selected.includes(id) ? selected.filter((s) => s !== id) : [...selected, id]);
  const handleMenuClick = (e: React.MouseEvent<HTMLElement>, product: Product) => { setAnchorEl(e.currentTarget); setActiveProduct(product); };
  const handleMenuClose = () => { setAnchorEl(null); setActiveProduct(null); };

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <Box>
      <PageHeader
        title="Products"
        subtitle="Manage your product catalog"
        action={{ label: 'Add Product', onClick: () => navigate('/products/add'), icon: <Plus size={18} /> }}
      />

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
          <CardContent sx={{ borderBottom: '1px solid', borderColor: 'divider', p: { xs: 2, sm: 2.5 } }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search size={18} color="rgba(77, 42, 0, 0.5)" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ flex: { xs: '1 1 100%', sm: '1 1 240px' }, maxWidth: { sm: 300 } }}
              />
              <FormControl size="small" sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 160px' } }}>
                <InputLabel>Category</InputLabel>
                <Select value={categoryFilter} label="Category" onChange={(e) => setCategoryFilter(e.target.value)}>
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((cat) => (<MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ flex: { xs: '1 1 calc(50% - 8px)', sm: '0 0 130px' } }}>
                <InputLabel>Status</InputLabel>
                <Select value={statusFilter} label="Status" onChange={(e) => setStatusFilter(e.target.value)}>
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="archived">Archived</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.secondary" sx={{ width: { xs: '100%', sm: 'auto' }, textAlign: { xs: 'right', sm: 'inherit' } }}>
                {filtered.length} products
              </Typography>
            </Box>
          </CardContent>

          {selected.length > 0 && (
            <Box sx={{ px: 2, py: 1, bgcolor: 'primary.lighter', borderBottom: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="body2" sx={{ fontWeight: 600 }}>{selected.length} selected</Typography>
              <Button size="small" color="error" onClick={() => setDeleteDialog(true)}>Delete</Button>
              <Button size="small" onClick={() => setSelected([])}>Clear</Button>
            </Box>
          )}

          {filtered.length === 0 ? (
            <Box sx={{ p: 4 }}>
              <EmptyState title="No products found" description="Try adjusting your search or filter terms to find what you are looking for." />
            </Box>
          ) : (
            <>
              <TableContainer sx={{ overflowX: 'auto' }}>
                <Table sx={{ minWidth: 700 }}>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <Checkbox
                          indeterminate={selected.length > 0 && selected.length < filtered.length}
                          checked={filtered.length > 0 && selected.length === filtered.length}
                          onChange={handleSelectAll}
                        />
                      </TableCell>
                      <TableCell>Product</TableCell>
                      <TableCell>SKU</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="center">Stock</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Rating</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginated.map((product) => (
                      <TableRow
                        key={product.id}
                        hover
                        selected={selected.includes(product.id)}
                        onClick={() => handleSelect(product.id)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selected.includes(product.id)}
                            onClick={(e) => { e.stopPropagation(); handleSelect(product.id); }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar src={product.images[0]} variant="rounded" sx={{ width: 44, height: 44 }} />
                            <Box>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{product.name}</Typography>
                              <Typography variant="caption" color="text.secondary">{product.reviews} reviews</Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8125rem' }}>{product.sku}</Typography></TableCell>
                        <TableCell><Chip label={product.category} size="small" variant="outlined" /></TableCell>
                        <TableCell align="right">
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>${(product.salePrice || product.price).toFixed(2)}</Typography>
                          {product.salePrice && (
                            <Typography variant="caption" sx={{ textDecoration: 'line-through', color: 'text.disabled', display: 'block' }}>
                              ${product.price.toFixed(2)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={product.stock === 0 ? 'Out' : `${product.stock}`}
                            size="small"
                            color={product.stock === 0 ? 'error' : product.stock < 50 ? 'warning' : 'success'}
                          />
                        </TableCell>
                        <TableCell align="center"><StatusChip status={product.status} /></TableCell>
                        <TableCell align="center">
                          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5 }}>
                            <Star size={14} color="#F2A900" fill="#F2A900" />
                            <Typography variant="body2">{product.rating}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" onClick={(e) => { e.stopPropagation(); handleMenuClick(e, product); }}>
                            <MoreVertical size={18} />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <TablePagination
                component="div"
                count={filtered.length}
                page={page}
                onPageChange={(_, p) => setPage(p)}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }}
                rowsPerPageOptions={[5, 10, 25, 50]}
              />
            </>
          )}
        </Card>
      </motion.div>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { navigate(`/products/${activeProduct?.id}`); handleMenuClose(); }}>
          <ListItemIcon><Eye size={18} /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { navigate(`/products/${activeProduct?.id}/edit`); handleMenuClose(); }}>
          <ListItemIcon><Pencil size={18} /></ListItemIcon>
          <ListItemText>Edit</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => { setDeleteDialog(true); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><Trash2 size={18} /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <ConfirmDialog
        open={deleteDialog}
        title="Delete Product"
        message={`Are you sure you want to delete "${activeProduct?.name}"? This action cannot be undone.`}
        onConfirm={() => setDeleteDialog(false)}
        onCancel={() => setDeleteDialog(false)}
        isDestructive
      />
    </Box>
  );
};
