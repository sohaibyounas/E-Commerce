import {
  Box, Card, CardContent, Typography, Grid, Avatar, Button, Table, TableBody, TableRow, TableCell, List, ListItem, ListItemText, useTheme,
} from '@mui/material';
import { ArrowLeft, Mail, Phone, MapPin, ShoppingBag } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, StatusChip } from '../../components/common';
import { getCustomerById, orders } from '../../data';
import { format } from 'date-fns';

export const CustomerDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const customer = getCustomerById(id || '');

  if (!customer) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Customer not found</Typography>
        <Button onClick={() => navigate('/customers')} sx={{ mt: 2 }} variant="outlined">
          Back to customers
        </Button>
      </Box>
    );
  }

  const customerOrders = orders.filter((o) => o.customerId === id);

  return (
    <Box>
      <PageHeader
        title={customer.name}
        subtitle={`Customer since ${format(new Date(customer.createdAt), 'MMMM yyyy')}`}
        breadcrumbs={[{ label: 'Customers', href: '/customers' }, { label: customer.name }]}
      />

      <Grid container spacing={{ xs: 2.5, md: 3 }}>
        <Grid size={{ xs: 12, md: 4 }}>
          {/* Customer profile card */}
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ textAlign: 'center', p: { xs: 2, sm: 3 } }}>
              <Avatar
                src={customer.avatar}
                sx={{
                  width: 90,
                  height: 90,
                  mx: 'auto',
                  mb: 2,
                  border: '3px solid #F2A900',
                  boxShadow: '0 4px 14px rgba(242, 169, 0, 0.25)',
                }}
              />
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>{customer.name}</Typography>
              <StatusChip status={customer.status} size="medium" />
            </CardContent>
          </Card>

          {/* Contact Details */}
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, mb: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Contact Information</Typography>
              <List disablePadding>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5 }}>
                  <Mail size={18} color="#CC6F00" style={{ flexShrink: 0 }} />
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 500, wordBreak: 'break-all' }}>{customer.email}</Typography>}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5 }}>
                  <Phone size={18} color="#CC6F00" style={{ flexShrink: 0 }} />
                  <ListItemText
                    primary={<Typography variant="body2" sx={{ fontWeight: 500 }}>{customer.phone}</Typography>}
                  />
                </ListItem>
                <ListItem disablePadding sx={{ py: 1.2, gap: 1.5, alignItems: 'flex-start' }}>
                  <MapPin size={18} color="#CC6F00" style={{ flexShrink: 0, marginTop: 2 }} />
                  <ListItemText
                    primary={<Typography variant="body2" color="text.secondary">{`${customer.address.street}, ${customer.address.city}, ${customer.address.state} ${customer.address.zip}`}</Typography>}
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>

          {/* Customer Stats */}
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Lifetime Value</Typography>
              <Table size="small">
                <TableBody>
                  <TableRow><TableCell sx={{ border: 'none', px: 0 }}>Total Orders</TableCell><TableCell sx={{ border: 'none', textAlign: 'right', fontWeight: 700 }}>{customer.totalOrders}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ border: 'none', px: 0 }}>Total Spent</TableCell><TableCell sx={{ border: 'none', textAlign: 'right', fontWeight: 800, color: 'primary.main' }}>${customer.totalSpent.toLocaleString()}</TableCell></TableRow>
                  <TableRow><TableCell sx={{ border: 'none', px: 0 }}>Avg. Order Value</TableCell><TableCell sx={{ border: 'none', textAlign: 'right', fontWeight: 700 }}>${(customer.totalSpent / (customer.totalOrders || 1)).toFixed(2)}</TableCell></TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Box sx={{ mt: 2.5 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/customers')}
              fullWidth
            >
              Back to Customers
            </Button>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3 }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Order History</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>{customerOrders.length} orders</Typography>
              </Box>

              {customerOrders.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <ShoppingBag size={48} color="#CC6F00" style={{ opacity: 0.4, marginBottom: 8 }} />
                  <Typography color="text.secondary">No orders recorded yet</Typography>
                </Box>
              ) : (
                customerOrders.map((order) => (
                  <Box
                    key={order.id}
                    sx={{
                      display: 'flex',
                      p: 2,
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      alignItems: 'center',
                      gap: 2,
                      cursor: 'pointer',
                      borderRadius: 2,
                      transition: 'background-color 0.2s',
                      '&:hover': { bgcolor: isDark ? 'rgba(242, 169, 0, 0.08)' : '#FAF7F0' },
                      flexWrap: { xs: 'wrap', sm: 'nowrap' },
                    }}
                    onClick={() => navigate(`/orders/${order.id}`)}
                  >
                    <Box sx={{ flex: 1, minWidth: 120 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main', fontFamily: 'monospace' }}>
                        {order.id}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {format(new Date(order.createdAt), 'MMM dd, yyyy')}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {order.items.length} items
                    </Typography>
                    <StatusChip status={order.status} />
                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                      ${order.total.toFixed(2)}
                    </Typography>
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
