import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Button, Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ListItemIcon, ListItemText,
} from '@mui/material';
import { Add, Edit, Delete, MoreVert, Category } from '@mui/icons-material';
import { PageHeader, ConfirmDialog, StatusChip } from '../../components/common';
import { categories as initialCategories } from '../../data';
import { format } from 'date-fns';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveCategory(id);
  };

  const handleMenuClose = () => { setAnchorEl(null); setActiveCategory(null); };

  const handleAdd = () => {
    setCategories([...categories, { id: String(Date.now()), name: form.name, description: form.description, image: 'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?w=400', productCount: 0, status: 'active', createdAt: new Date().toISOString() }]);
    setAddDialog(false);
    setForm({ name: '', description: '' });
  };

  const category = categories.find((c) => c.id === activeCategory);

  return (
    <Box>
      <PageHeader title="Categories" subtitle="Organize products into categories" action={{ label: 'Add Category', onClick: () => setAddDialog(true), icon: <Add /> }} />

      <Grid container spacing={3}>
        {categories.map((cat) => (
          <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 4 } }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Avatar src={cat.image} variant="rounded" sx={{ width: 56, height: 56 }} />
                  <IconButton onClick={(e) => handleMenuClick(e, cat.id)}><MoreVert /></IconButton>
                </Box>
                <Typography variant="h6" fontWeight={600} noWrap>{cat.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>{cat.description}</Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip label={`${cat.productCount} products`} size="small" />
                  <StatusChip status={cat.status as any} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { setEditDialog(true); handleMenuClose(); }}><ListItemIcon><Edit fontSize="small" /></ListItemIcon><ListItemText>Edit</ListItemText></MenuItem>
        <MenuItem onClick={() => { setDeleteDialog(true); handleMenuClose(); }} sx={{ color: 'error.main' }}><ListItemIcon><Delete fontSize="small" color="error" /></ListItemIcon><ListItemText>Delete</ListItemText></MenuItem>
      </Menu>

      <Dialog open={addDialog} onClose={() => setAddDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <TextField label="Category Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth required />
          <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} multiline rows={3} fullWidth />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}><Button onClick={() => setAddDialog(false)}>Cancel</Button><Button variant="contained" onClick={handleAdd}>Add Category</Button></DialogActions>
      </Dialog>

      <ConfirmDialog open={deleteDialog} title="Delete Category" message={`Are you sure you want to delete "${category?.name}"? This will affect ${category?.productCount || 0} products.`} onConfirm={() => { setDeleteDialog(false); }} onCancel={() => setDeleteDialog(false)} isDestructive />
    </Box>
  );
};
