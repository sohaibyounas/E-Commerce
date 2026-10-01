import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Avatar, Button, Chip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, TextField, ListItemIcon, ListItemText,
} from '@mui/material';
import { Plus, Trash2, MoreVertical, FolderTree } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageHeader, ConfirmDialog, StatusChip } from '../../components/common';
import { categories as initialCategories } from '../../data';

export const CategoriesPage = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [addDialog, setAddDialog] = useState(false);
  const [form, setForm] = useState({ name: '', description: '' });

  const handleMenuClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(e.currentTarget);
    setActiveCategory(id);
  };

  const handleMenuClose = () => { setAnchorEl(null); setActiveCategory(null); };

  const handleAdd = () => {
    if (!form.name.trim()) return;
    setCategories([...categories, {
      id: String(Date.now()),
      name: form.name,
      description: form.description,
      image: 'https://images.pexels.com/photos/1037999/pexels-photo-1037999.jpeg?w=400',
      productCount: 0,
      status: 'active',
      createdAt: new Date().toISOString(),
    }]);
    setAddDialog(false);
    setForm({ name: '', description: '' });
  };

  const category = categories.find((c) => c.id === activeCategory);

  return (
    <Box>
      <PageHeader
        title="Categories"
        subtitle="Organize products into categories"
        action={{ label: 'Add Category', onClick: () => setAddDialog(true), icon: <Plus size={18} /> }}
      />

      <Grid container spacing={2.5}>
        {categories.map((cat, index) => (
          <Grid key={cat.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -3 }}
            >
              <Card
                elevation={0}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 2.5,
                  height: '100%',
                  transition: 'all 0.2s',
                  '&:hover': { boxShadow: '0 8px 24px rgba(77, 42, 0, 0.08)', borderColor: 'primary.light' },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Avatar src={cat.image} variant="rounded" sx={{ width: 52, height: 52, borderRadius: 2 }} />
                    <IconButton size="small" onClick={(e) => handleMenuClick(e, cat.id)}>
                      <MoreVertical size={18} />
                    </IconButton>
                  </Box>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }} noWrap>{cat.name}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 38, fontSize: '0.84rem' }}>
                    {cat.description}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip label={`${cat.productCount} products`} size="small" variant="outlined" />
                    <StatusChip status={cat.status as any} />
                  </Box>
                </CardContent>
              </Card>
            </motion.div>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={() => { setDeleteDialog(true); handleMenuClose(); }} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><Trash2 size={18} /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <Dialog
        open={addDialog}
        onClose={() => setAddDialog(false)}
        maxWidth="sm"
        fullWidth
        slotProps={{ paper: { sx: { borderRadius: 3, m: 2 } } }}
      >
        <DialogTitle sx={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: 1 }}>
          <FolderTree size={20} color="#F2A900" /> Add New Category
        </DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <TextField
            label="Category Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            fullWidth
            required
            autoFocus
          />
          <TextField
            label="Description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            multiline
            rows={3}
            fullWidth
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setAddDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd}>Add Category</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteDialog}
        title="Delete Category"
        message={`Are you sure you want to delete "${category?.name}"? This will affect ${category?.productCount || 0} products.`}
        onConfirm={() => setDeleteDialog(false)}
        onCancel={() => setDeleteDialog(false)}
        isDestructive
      />
    </Box>
  );
};
