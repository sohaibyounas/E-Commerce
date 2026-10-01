import { useState, useMemo } from 'react';
import {
  Box, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Typography, TablePagination, TextField, InputAdornment, FormControl,
  InputLabel, Select, MenuItem, LinearProgress, Alert, Avatar, useTheme,
} from '@mui/material';
import { Search, AlertTriangle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { PageHeader, StatusChip } from '../../components/common';
import { inventoryItems as allInventory, lowStockAlerts } from '../../data';
import { format } from 'date-fns';

export const InventoryPage = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const filtered = useMemo(() => {
    return allInventory.filter((item) => {
      const matchesSearch = item.productName.toLowerCase().includes(search.toLowerCase()) ||
        item.sku.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  const paginated = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const stockPercentage = (current: number, max: number) => Math.min(100, Math.round((current / (max || 1)) * 100));

  return (
    <Box>
      <PageHeader title="Inventory" subtitle="Track warehouse stock, safety thresholds, and reorder levels" />

      {lowStockAlerts.length > 0 && (
        <Alert
          severity="warning"
          icon={<AlertTriangle size={20} color="#CC6F00" />}
          sx={{ mb: 3, borderRadius: 2.5, bgcolor: isDark ? 'rgba(204, 111, 0, 0.15)' : '#FDF8EE', borderColor: '#F2A900' }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
            {lowStockAlerts.length} items need attention
          </Typography>
          <Typography variant="body2" sx={{ mt: 0.5 }}>
            {lowStockAlerts.filter((i) => i.status === 'out_of_stock').length} out of stock, {lowStockAlerts.filter((i) => i.status === 'low_stock').length} running low
          </Typography>
        </Alert>
      )}

      <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, overflow: 'hidden' }}>
        <Box
          sx={{
            p: { xs: 2, sm: 2.5 },
            borderBottom: '1px solid',
            borderColor: 'divider',
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
          }}
        >
          <TextField
            size="small"
            placeholder="Search inventory items..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={18} color="#CC6F00" style={{ opacity: 0.8 }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ width: { xs: '100%', sm: 260 } }}
          />

          <FormControl size="small" sx={{ minWidth: 150, width: { xs: '100%', sm: 'auto' } }}>
            <InputLabel>Stock Status</InputLabel>
            <Select value={statusFilter} label="Stock Status" onChange={(e) => setStatusFilter(e.target.value)}>
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="in_stock">In Stock</MenuItem>
              <MenuItem value="low_stock">Low Stock</MenuItem>
              <MenuItem value="out_of_stock">Out of Stock</MenuItem>
            </Select>
          </FormControl>

          <Box sx={{ flexGrow: 1 }} />
          <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
            {filtered.length} items
          </Typography>
        </Box>

        <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
          <Table sx={{ minWidth: 700 }}>
            <TableHead>
              <TableRow sx={{ bgcolor: isDark ? 'rgba(77, 42, 0, 0.25)' : '#FAF7F0' }}>
                <TableCell sx={{ fontWeight: 700 }}>Product</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>SKU</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Warehouse</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Current Stock</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Stock Level</TableCell>
                <TableCell align="center" sx={{ fontWeight: 700 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Last Restocked</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.8 }}>
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          bgcolor: item.status === 'out_of_stock'
                            ? 'rgba(220, 38, 38, 0.15)'
                            : item.status === 'low_stock'
                            ? 'rgba(242, 169, 0, 0.2)'
                            : 'rgba(22, 163, 74, 0.15)',
                          color: item.status === 'out_of_stock'
                            ? 'error.main'
                            : item.status === 'low_stock'
                            ? '#CC6F00'
                            : 'success.main',
                        }}
                      >
                        {item.status === 'out_of_stock' ? (
                          <AlertCircle size={18} />
                        ) : item.status === 'low_stock' ? (
                          <AlertTriangle size={18} />
                        ) : (
                          <CheckCircle2 size={18} />
                        )}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace', fontSize: '0.8rem', color: 'text.secondary' }}>
                      {item.sku}
                    </Typography>
                  </TableCell>
                  <TableCell><Typography variant="body2">{item.warehouse}</Typography></TableCell>
                  <TableCell align="center">
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>{item.currentStock}</Typography>
                    <Typography variant="caption" color="text.secondary">/ {item.maximumStock}</Typography>
                  </TableCell>
                  <TableCell align="center" sx={{ minWidth: 140 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={stockPercentage(item.currentStock, item.maximumStock)}
                        sx={{
                          flex: 1,
                          height: 6,
                          borderRadius: 3,
                          bgcolor: isDark ? 'rgba(77, 42, 0, 0.4)' : '#EBDCBF',
                          '& .MuiLinearProgress-bar': {
                            borderRadius: 3,
                            bgcolor: item.status === 'out_of_stock'
                              ? 'error.main'
                              : item.status === 'low_stock'
                              ? '#F2A900'
                              : '#16a34a',
                          },
                        }}
                      />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {stockPercentage(item.currentStock, item.maximumStock)}%
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="center"><StatusChip status={item.status} /></TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(item.lastRestocked), 'MMM dd, yyyy')}
                    </Typography>
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
        />
      </Card>
    </Box>
  );
};
