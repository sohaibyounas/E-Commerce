import { useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, LinearProgress, Button } from '@mui/material';
import { TrendingUp, TrendingDown, ShoppingCart, People, Inventory, AttachMoney, ArrowForward, FiberManualRecord } from '@mui/icons-material';
import { StatCard, PageHeader } from '../../components/common';
import { salesChartData, ordersByStatus, topProducts, recentActivity, dashboardStats } from '../../data';
import { orders } from '../../data';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const recentOrders = orders.slice(0, 5);

  return (
    <Box>
      <PageHeader title="Dashboard" subtitle="Welcome back, here's what's happening with your store" />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Total Revenue" value={`$${dashboardStats.revenue.total.toLocaleString()}`} change={dashboardStats.revenue.change} icon={<AttachMoney />} color="#10b981" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Total Orders" value={dashboardStats.orders.total.toLocaleString()} change={dashboardStats.orders.change} icon={<ShoppingCart />} color="#3b82f6" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Customers" value={dashboardStats.customers.total.toLocaleString()} change={dashboardStats.customers.change} icon={<People />} color="#8b5cf6" />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard title="Products" value={dashboardStats.products.active.toString()} icon={<Inventory />} color="#f59e0b" />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: 400 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h6" fontWeight={600}>Revenue Overview</Typography>
                  <Typography variant="body2" color="text.secondary">Monthly revenue and orders</Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {(['week', 'month', 'year'] as const).map((range) => (
                    <Chip key={range} label={range.charAt(0).toUpperCase() + range.slice(1)} onClick={() => setTimeRange(range)} color={timeRange === range ? 'primary' : 'default'} variant={timeRange === range ? 'filled' : 'outlined'} size="small" />
                  ))}
                </Box>
              </Box>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={salesChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `$${v / 1000}k`} />
                  <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value: number, name: string) => [name === 'revenue' ? `$${value.toLocaleString()}` : value, name === 'revenue' ? 'Revenue' : 'Orders']} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} name="revenue" />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="orders" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: 400 }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Orders by Status</Typography>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie data={ordersByStatus} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
                    {ordersByStatus.map((entry, index) => (<Cell key={`cell-${index}`} fill={entry.color} />))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value, 'Orders']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 6 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Recent Orders</Typography>
                <Button endIcon={<ArrowForward />} onClick={() => navigate('/orders')}>View all</Button>
              </Box>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Order ID</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentOrders.map((order) => (
                    <TableRow key={order.id} hover onClick={() => navigate(`/orders/${order.id}`)} sx={{ cursor: 'pointer' }}>
                      <TableCell><Typography variant="body2" fontWeight={600}>{order.id}</Typography></TableCell>
                      <TableCell><Typography variant="body2">{order.customerName}</Typography></TableCell>
                      <TableCell><Typography variant="body2">${order.total.toFixed(2)}</Typography></TableCell>
                      <TableCell><Chip label={order.status} size="small" color={order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : order.status === 'shipped' ? 'primary' : 'default'} /></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" fontWeight={600}>Top Products</Typography>
                <Button endIcon={<ArrowForward />} onClick={() => navigate('/products')}>View</Button>
              </Box>
              {topProducts.map((product, index) => (
                <Box key={product.id} sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5, borderBottom: index < topProducts.length - 1 ? '1px solid' : 'none', borderColor: 'divider' }}>
                  <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32, fontWeight: 600 }}>{index + 1}</Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500} noWrap>{product.name}</Typography>
                    <Typography variant="caption" color="text.secondary">{product.sales} sales</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight={600}>${(product.revenue / 1000).toFixed(1)}k</Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, lg: 3 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={600} gutterBottom>Recent Activity</Typography>
              {recentActivity.map((activity) => (
                <Box key={activity.id} sx={{ display: 'flex', gap: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider', '&:last-child': { borderBottom: 'none' } }}>
                  <FiberManualRecord sx={{ fontSize: 12, color: activity.type === 'order' ? 'primary.main' : activity.type === 'product' ? 'warning.main' : activity.type === 'customer' ? 'success.main' : 'info.main', mt: 0.5 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" fontWeight={500}>{activity.description}</Typography>
                    <Typography variant="caption" color="text.secondary">{activity.time}</Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', bgcolor: 'warning.lighter' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Inventory sx={{ fontSize: 32, color: 'warning.main' }} />
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" fontWeight={600}>Low Stock Alert</Typography>
                <Typography variant="body2" color="text.secondary">3 products are running low on stock. Review and restock soon.</Typography>
              </Box>
              <Button variant="contained" color="warning" onClick={() => navigate('/inventory')}>View Inventory</Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
