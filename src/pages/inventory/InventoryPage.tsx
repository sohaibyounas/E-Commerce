import { useState, useMemo } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, Chip, TablePagination, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, LinearProgress, Alert, Button, Avatar,
} from '@mui/material';
import { Search, Warning, Error, CheckCircle } from '@mui/icons-material';
import { PageHeader, StatusChip } from '../../components/common';
import { inventoryItems as allInventory, lowStockAlerts } from '../../data';
import { format } from 'date-fns';

export const InventoryPage = () => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return allInventory.filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const stockPercentage = (current: number, max: number) => (current / max) * 100;

  return (
    <Box>
      <PageHeader title="Inventory" subtitle="Track and manage stock levels" />

      {lowStockAlerts.length > 0 && (
        <Alert severity="warning" icon={<Warning />} sx={{ mb: 3 }}>
          <Typography variant="subtitle2">{lowStockAlerts.length} items need attention</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>{lowStockAlerts.filter((i) => i.status === 'out_of_stock').length} out of stock, {lowStockAlerts.filter((i) => i.status === 'low_stock').length} running low</Typography>
        </Alert>
      )}

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider', display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <TextField size="small" placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment> }} sx={{ minWidth: 250 }} />
          <FormControl size="small" sx={{ minWidth: 150 }}>
            <InputLabel>Stock Status</InputLabel>
            <Select value={statusFilter} label="Stock Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="in_stock">In Stock</MenuItem>
              <MenuItem value="low_stock">Low Stock</MenuItem>
              <MenuItem value="out_of_stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary">{filtered.length} items</Typography>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>SKU</TableCell>
                <TableCell>Warehouse</TableCell>
                <TableCell align="center">Current Stock</TableCell>
                <TableCell align="center">Stock Level</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell>Last Restocked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar sx={{ width: 40, height: 40, bgcolor: item.status === 'out_of_stock' ? 'error.light' : item.status === 'low_stock' ? 'warning.light' : 'success.light' }}>
                        {item.status === 'out_of_stock' ? <Error /> : item.status === 'low_stock' ? <Warning /> : <CheckCircle />}
                      </Avatar>
                      <Typography variant="body2" fontWeight={500}>{item.productName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell><Typography variant="body2" sx={{ fontFamily: 'monospace' }}>{item.sku}</Typography></TableCell>
                  <TableCell><Typography variant="body2">{item.warehouse}</Typography></TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" fontWeight={600}>{item.currentStock}</Typography>
                    <Typography variant="caption" color="text.secondary">/ {item.maximumStock}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 150 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress variant="determinate" value={stockPercentage(item.currentStock, item.maximumStock)} sx={{ flex: 1, height: 8, borderRadius: 4, bgcolor: 'grey.200', '& .MuiLinearProgress-bar': { bgcolor: item.status === 'out_of_stock' ? 'error.main' : item.status === 'low_stock' ? 'warning.main' : 'success.main' } }} />
                      <Typography variant="caption" color="text.secondary">{Math.round(stockPercentage(item.currentStock, item.maximumStock))}%</Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center"><StatusChip status={item.status} /></TableCell>
                  <TableCell><Typography variant="body2" color="text.secondary">{format(new Date(item.lastRestocked), 'MMM dd, yyyy')}</Typography></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination component="div" count={filtered.length} page={page} onPageChange={(_, p) => setPage(p)} rowsPerPage={rowsPerPage} onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value)); setPage(0); }} />
      </Card>
    </Box>
  );
};
