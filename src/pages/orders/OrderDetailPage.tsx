import {
  Box, Card, CardContent, Typography, Grid, Chip, Button, Divider, Avatar, Stepper, Step, StepLabel, Alert,
} from '@mui/material';
import { ArrowLeft, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/common';
import { getOrderById } from '../../data';
import { format } from 'date-fns';

const statusSteps: string[] = ['pending', 'processing', 'shipped', 'delivered'];

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>Order not found</Typography>
        <Button
          onClick={() => navigate('/orders')}
          startIcon={<ArrowLeft size={16} />}
          sx={{ mt: 2 }}
        >
          Back to orders
        </Button>
      </Box>
    );
  }

  const activeStep = statusSteps.indexOf(order.status);
  const isPastStatus = (status: string) =>
    statusSteps.indexOf(status) <= activeStep || order.status === 'cancelled' || order.status === 'refunded';

  return (
    <Box>
      <PageHeader
        title={`Order ${order.id}`}
        subtitle={`Placed on ${format(new Date(order.createdAt), 'MMMM dd, yyyy')} at ${format(new Date(order.createdAt), 'h:mm a')}`}
        breadcrumbs={[{ label: 'Orders', href: '/orders' }, { label: order.id }]}
      />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Order Status
              </Typography>
              {order.status === 'cancelled' ? (
                <Alert severity="error">
                  This order was cancelled on {format(new Date(order.updatedAt), 'MMM dd, yyyy')}
                </Alert>
              ) : (
                <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 2 }}>
                  {statusSteps.map((label) => (
                    <Step key={label} completed={isPastStatus(label)}>
                      <StepLabel>{label.charAt(0).toUpperCase() + label.slice(1)}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )}
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Order Items
              </Typography>
              {order.items.map((item, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                    py: 2,
                    borderBottom: index < order.items.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Avatar src={item.image} variant="rounded" sx={{ width: 64, height: 64, borderRadius: '10px' }} />
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>{item.productName}</Typography>
                    <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: 'primary.dark' }}>
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ${item.price.toFixed(2)} each
                    </Typography>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                <Typography variant="body2">Subtotal: <strong>${order.subtotal.toFixed(2)}</strong></Typography>
                <Typography variant="body2">Tax: <strong>${order.tax.toFixed(2)}</strong></Typography>
                <Typography variant="body2">
                  Shipping: <strong>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</strong>
                </Typography>
                {order.discount > 0 && (
                  <Typography variant="body2" color="success.main">
                    Discount: -${order.discount.toFixed(2)}
                  </Typography>
                )}
                <Divider sx={{ width: '100%', my: 1 }} />
                <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                  Total: ${order.total.toFixed(2)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Customer
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: 'primary.main', color: '#4D2A00', fontWeight: 800 }}>
                  {order.customerName.charAt(0)}
                </Avatar>
                <Box sx={{ minWidth: 0 }}>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>{order.customerName}</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ wordBreak: 'break-all' }}>
                    {order.customerEmail}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="outlined" size="small" startIcon={<Mail size={15} />}>
                  Email
                </Button>
                <Button variant="outlined" size="small" startIcon={<Phone size={15} />}>
                  Call
                </Button>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Shipping Address
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'flex-start' }}>
                <MapPin size={18} color="#CC6F00" style={{ marginTop: 3, flexShrink: 0 }} />
                <Box>
                  <Typography variant="body2">{order.shippingAddress.street}</Typography>
                  <Typography variant="body2">
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}
                  </Typography>
                  <Typography variant="body2">{order.shippingAddress.country}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                Payment
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                <Typography variant="body2" color="text.secondary">Method</Typography>
                <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 600 }}>
                  {order.paymentMethod.replace('_', ' ')}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Chip
                  label={order.paymentStatus}
                  size="small"
                  color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'error'}
                  sx={{ textTransform: 'capitalize', fontWeight: 700 }}
                />
              </Box>
            </CardContent>
          </Card>

          {order.trackingNumber && (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3, borderRadius: '12px' }}>
              <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }} gutterBottom>
                  Tracking
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: 'monospace',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(242, 169, 0, 0.1)' : 'rgba(249, 230, 168, 0.35)',
                    p: 1.2,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  {order.trackingNumber}
                </Typography>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowLeft size={16} />}
              onClick={() => navigate('/orders')}
              sx={{ borderRadius: '10px' }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              startIcon={<Printer size={16} />}
              sx={{ borderRadius: '10px' }}
            >
              Print
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
