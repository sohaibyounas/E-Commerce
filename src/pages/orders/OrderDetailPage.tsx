import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Chip, Button, Divider, Table, TableBody, TableRow, TableCell, Avatar, Stepper, Step, StepLabel, Alert, Paper, List, ListItem, ListItemText,
} from '@mui/material';
import { ArrowBack, Print, LocalShipping, Email, Phone, LocationOn } from '@mui/icons-material';
import { useParams, useNavigate } from 'react-router-dom';
import { PageHeader, StatusChip } from '../../components/common';
import { getOrderById } from '../../data';
import { format } from 'date-fns';

const statusSteps = ['pending', 'processing', 'shipped', 'delivered'];

export const OrderDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const order = getOrderById(id || '');

  if (!order) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6">Order not found</Typography>
        <Button onClick={() => navigate('/orders')}>Back to orders</Button>
      </Box>
    );
  }

  const activeStep = statusSteps.indexOf(order.status);
  const isPastStatus = (status: string) => statusSteps.indexOf(status as any) <= activeStep || order.status === 'cancelled' || order.status === 'refunded';

  return (
    <Box>
      <PageHeader title={`Order ${order.id}`} subtitle={`Placed on ${format(new Date(order.createdAt), 'MMMM dd, yyyy')} at ${format(new Date(order.createdAt), 'h:mm a')}`} breadcrumbs={[{ label: 'Orders', href: '/orders' }, { label: order.id }]} />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Order Status</Typography>
              {order.status === 'cancelled' ? (
                <Alert severity="error">This order was cancelled on {format(new Date(order.updatedAt), 'MMM dd, yyyy')}</Alert>
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

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Order Items</Typography>
              {order.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, py: 2, borderBottom: index < order.items.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Avatar src={item.image} variant="rounded" sx={{ width: 64, height: 64 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" fontWeight={500}>{item.productName}</Typography>
                    <Typography variant="body2" color="text.secondary">Qty: {item.quantity}</Typography>
                  </Box>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="body1" fontWeight={600}>${(item.price * item.quantity).toFixed(2)}</Typography>
                    <Typography variant="caption" color="text.secondary">${item.price.toFixed(2)} each</Typography>
                  </Box>
                </Box>
              ))}
              <Divider sx={{ my: 2 }} />
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'flex-end' }}>
                <Typography variant="body2">Subtotal: <strong>${order.subtotal.toFixed(2)}</strong></Typography>
                <Typography variant="body2">Tax: <strong>${order.tax.toFixed(2)}</strong></Typography>
                <Typography variant="body2">Shipping: <strong>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</strong></Typography>
                {order.discount > 0 && <Typography variant="body2" color="success.main">Discount: -${order.discount.toFixed(2)}</Typography>}
                <Divider sx={{ width: '100%', my: 1 }} />
                <Typography variant="h5" fontWeight={700}>Total: ${order.total.toFixed(2)}</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Customer</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Avatar sx={{ width: 48, height: 48, bgcolor: 'primary.main' }}>{order.customerName.charAt(0)}</Avatar>
                <Box>
                  <Typography variant="body1" fontWeight={500}>{order.customerName}</Typography>
                  <Typography variant="body2" color="text.secondary">{order.customerEmail}</Typography>
                </Box>
              </Box>
              <Button variant="outlined" size="small" startIcon={<Email />} sx={{ mr: 1 }}>Email</Button>
              <Button variant="outlined" size="small" startIcon={<Phone />}>Call</Button>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Shipping Address</Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <LocationOn color="action" fontSize="small" />
                <Box>
                  <Typography variant="body2">{order.shippingAddress.street}</Typography>
                  <Typography variant="body2">{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}</Typography>
                  <Typography variant="body2">{order.shippingAddress.country}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', mb: 3 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Payment</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" color="text.secondary">Method</Typography>
                <Typography variant="body2" textTransform="capitalize">{order.paymentMethod.replace('_', ' ')}</Typography>
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Status</Typography>
                <Chip label={order.paymentStatus} size="small" color={order.paymentStatus === 'paid' ? 'success' : order.paymentStatus === 'pending' ? 'warning' : 'error'} />
              </Box>
            </CardContent>
          </Card>

          {order.trackingNumber && (
            <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} gutterBottom>Tracking</Typography>
                <Typography variant="body2" sx={{ fontFamily: 'monospace', bgcolor: 'grey.100', p: 1, borderRadius: 1 }}>{order.trackingNumber}</Typography>
              </CardContent>
            </Card>
          )}

          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <Button variant="outlined" startIcon={<ArrowBack />} onClick={() => navigate('/orders')}>Back</Button>
            <Button variant="outlined" startIcon={<Print />}>Print</Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
