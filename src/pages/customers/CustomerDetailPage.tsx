import { Box, Card, CardContent, Typography, Grid, Avatar, Chip, Button, Divider, Table, TableBody, TableRow, TableCell, List, ListItem, ListItemText } from '@mui/material';
import { ArrowBack, Email, Phone, LocationOn, ShoppingBag } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, StatusChip } from '../../components/common';
import { getCustomerById, orders } from '../../data';
import { format } from 'date-fns';

export const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const customer = getCustomerById(id || '');

  if (!customer) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Customer not found</Typography>
        <Button onClick={() => navigate('/customers')}>Back to customers</Button>
      </Box>
    );
  }

  const customerOrders = orders.filter((o) => o.customerId === id);

  return (
    <Box>
      <PageHeader title={customer.name} subtitle={`Customer since ${format(new Date(customer.createdAt), 'MMMM yyyy')}`} breadcrumbs={[{ label: 'Customers', href: '/customers' }, { label: customer.name }]} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Avatar src={customer.avatar} sx={{ width: 100, height: 100, mx: 'auto', mb: 2 }} />
              <Typography variant="h5" fontWeight={600}>{customer.name}</Typography>
              <StatusChip status={customer.status} />
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Contact</Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1 }}><Email fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} /><ListItemText primary={customer.email} /></ListItem>
                <ListItem disablePadding sx={{ py: 1 }}><Phone fontSize="small" sx={{ mr: 2, color: 'text.secondary' }} /><ListItemText primary={customer.phone} /></ListItem>
                <ListItem disablePadding sx={{ py: 1, alignItems: 'flex-start' }}><LocationOn fontSize="small" sx={{ mr: 2, color: 'text.secondary', mt: 0.5 }} /><ListItemText primary={`${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.zip}`} /></ListItem>
              </List>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Statistics</Typography>
              <Table size="small">
                <TableBody>
                  <TableRow><TableCell sx={{ border: 'none' }}>Total Orders</TableCell><TableCell sx={{ border: 'none', textAlign: 'right' }}><strong>{customer.totalOrders}</strong></TableCell></TableRow>
                  <TableRow><TableCell sx={{ border: 'none' }}>Total Spent</TableCell><TableCell sx={{ border: 'none', textAlign: 'right' }}><strong>${customer.totalSpent.toLocaleString()}</strong></TableCell></TableRow>
                  <TableRow><TableCell sx={{ border: 'none' }}>Avg. Order Value</TableCell><TableCell sx={{ border: 'none', textAlign: 'right' }}><strong>${(customer.totalSpent / customer.totalOrders).toFixed(2)}</strong></TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Box sx={{ mt: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/customers')}>Back</Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Order History</Typography>
                <Typography variant="body2" color="text.secondary">{customerOrders.length} orders</Typography>
              </Box>
              {customerOrders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}><ShoppingBag sx={{ fontSize: 48, color: 'text.disabled', mb: 1 }} /><Typography color="text.secondary">No orders yet</Typography></Box>
              ) : (
                customerOrders.map((order) => (
                  <Box key={order.id} sx={{ display: 'flex', p: 2, borderBottom: '1px solid', borderColor: 'divider', alignItems: 'center', gap: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }} onClick={() => navigate(`/orders/${order.id}`)}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="body2" fontWeight={600}>{order.id}</Typography>
                      <Typography variant="caption" color="text.secondary">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</Typography>
                    </Box>
                    <Typography variant="body2">{order.items.length} items</Typography>
                    <StatusChip status={order.status} />
                    <Typography variant="body1" fontWeight={600}>${order.total.toFixed(2)}</Typography>
                  </Box>
                ))
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
