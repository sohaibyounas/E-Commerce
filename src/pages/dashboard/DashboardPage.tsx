import { useState } from 'react';
import {
  Box, Card, CardContent, Typography, Grid, Table, TableBody, TableCell,
  TableHead, TableRow, Chip, Avatar, Button, useTheme,
} from '@mui/material';
import {
  ShoppingCart, Users, Package,
  DollarSign, ArrowRight, Circle,
} from 'lucide-react';
import { StatCard, PageHeader } from '../../components/common';
import { salesChartData, ordersByStatus, topProducts, recentActivity, dashboardStats, orders } from '../../data';
import { useNavigate } from 'react-router-dom';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const recentOrders = orders.slice(0, 5);

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Welcome back, here's what's happening with your store today"
      />

      {/* Top Stat Cards Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Revenue"
            value={`$${dashboardStats.revenue.total.toLocaleString()}`}
            change={dashboardStats.revenue.change}
            icon={<DollarSign size={20} />}
            color="#CC6F00"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Total Orders"
            value={dashboardStats.orders.total.toLocaleString()}
            change={dashboardStats.orders.change}
            icon={<ShoppingCart size={20} />}
            color="#F2A900"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Customers"
            value={dashboardStats.customers.total.toLocaleString()}
            change={dashboardStats.customers.change}
            icon={<Users size={20} />}
            color="#4D2A00"
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCard
            title="Active Products"
            value={dashboardStats.products.active.toString()}
            icon={<Package size={20} />}
            color="#CC6F00"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }} sx={{ mb: { xs: 3, md: 4 } }}>
        {/* Revenue Line Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              minHeight: 400,
              bgcolor: 'background.paper',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: { xs: 'flex-start', sm: 'center' },
                  flexDirection: { xs: 'column', sm: 'row' },
                  gap: 1.5,
                  mb: 3,
                }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Revenue Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Monthly sales trend and orders volume
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  {(['week', 'month', 'year'] as const).map((range) => (
                    <Chip
                      key={range}
                      label={range.charAt(0).toUpperCase() + range.slice(1)}
                      onClick={() => setTimeRange(range)}
                      color={timeRange === range ? 'primary' : 'default'}
                      variant={timeRange === range ? 'filled' : 'outlined'}
                      size="small"
                      sx={{ fontWeight: 600, cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Box>

              <Box sx={{ width: '100%', height: { xs: 260, sm: 290 } }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesChartData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={isDark ? 'rgba(77, 42, 0, 0.4)' : '#F3E5C8'} />
                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: isDark ? '#F9E6A8' : '#7C4A15' }} />
                    <YAxis yAxisId="left" tick={{ fontSize: 12, fill: isDark ? '#F9E6A8' : '#7C4A15' }} tickFormatter={(v) => `$${v / 1000}k`} />
                    <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12, fill: isDark ? '#F9E6A8' : '#7C4A15' }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#2C1B0A' : '#FFFFFF',
                        borderColor: isDark ? '#4D2A00' : '#EBDCBF',
                        borderRadius: 10,
                        boxShadow: '0 8px 24px rgba(77, 42, 0, 0.15)',
                        color: isDark ? '#FDFBF7' : '#4D2A00',
                      }}
                      formatter={((value: any, name: any) => [
                        name === 'revenue' ? `$${Number(value || 0).toLocaleString()}` : value,
                        name === 'revenue' ? 'Revenue' : 'Orders',
                      ]) as any}
                    />
                    <Legend />
                    <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#F2A900" strokeWidth={3} dot={{ fill: '#F2A900', r: 4 }} activeDot={{ r: 7 }} name="revenue" />
                    <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#CC6F00" strokeWidth={2.5} strokeDasharray="4 4" dot={{ fill: '#CC6F00', r: 3 }} name="orders" />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Orders by Status Donut Chart */}
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 3,
              minHeight: 400,
              bgcolor: 'background.paper',
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                Orders by Status
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Current fulfillment distribution
              </Typography>

              <Box sx={{ width: '100%', height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={ordersByStatus}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={95}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {ordersByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke={isDark ? '#2C1B0A' : '#FFFFFF'} strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: isDark ? '#2C1B0A' : '#FFFFFF',
                        borderColor: isDark ? '#4D2A00' : '#EBDCBF',
                        borderRadius: 10,
                      }}
                      formatter={((value: any) => [value, 'Orders']) as any}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Orders, Top Products, Recent Activity Grid */}
      <Grid container spacing={{ xs: 2, sm: 2.5, md: 3 }}>
        {/* Recent Orders Table */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Recent Orders</Typography>
                <Button
                  endIcon={<ArrowRight size={16} />}
                  onClick={() => navigate('/orders')}
                  size="small"
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  View all
                </Button>
              </Box>

              {/* Mobile-friendly overflow wrapper */}
              <Box sx={{ overflowX: 'auto', width: '100%' }}>
                <Table size="small" sx={{ minWidth: 420 }}>
                  <TableHead>
                    <TableRow sx={{ bgcolor: isDark ? 'rgba(77, 42, 0, 0.2)' : '#FAF7F0' }}>
                      <TableCell sx={{ fontWeight: 700 }}>Order ID</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Customer</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Amount</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {recentOrders.map((order) => (
                      <TableRow
                        key={order.id}
                        hover
                        onClick={() => navigate(`/orders/${order.id}`)}
                        sx={{ cursor: 'pointer', transition: 'background-color 0.2s' }}
                      >
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                            {order.id}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>{order.customerName}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 700 }}>${order.total.toFixed(2)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={order.status}
                            size="small"
                            color={order.status === 'delivered' ? 'success' : order.status === 'pending' ? 'warning' : order.status === 'shipped' ? 'primary' : 'default'}
                            sx={{ textTransform: 'capitalize', fontWeight: 600, height: 22 }}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Top Products */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 700 }}>Top Products</Typography>
                <Button
                  endIcon={<ArrowRight size={16} />}
                  onClick={() => navigate('/products')}
                  size="small"
                  sx={{ color: 'primary.main', fontWeight: 600 }}
                >
                  View
                </Button>
              </Box>

              {topProducts.map((product, index) => (
                <Box
                  key={product.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.5,
                    py: 1.3,
                    borderBottom: index < topProducts.length - 1 ? '1px solid' : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: index === 0 ? '#F2A900' : isDark ? '#4D2A00' : '#F9E6A8',
                      color: index === 0 ? '#4D2A00' : 'text.primary',
                      width: 28,
                      height: 28,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {index + 1}
                  </Avatar>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }} noWrap>
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.sales} sales
                    </Typography>
                  </Box>
                  <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${(product.revenue / 1000).toFixed(1)}k
                  </Typography>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
          <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 3, height: '100%' }}>
            <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Recent Activity
              </Typography>
              {recentActivity.map((activity) => (
                <Box
                  key={activity.id}
                  sx={{
                    display: 'flex',
                    gap: 1.5,
                    py: 1.2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': { borderBottom: 'none' },
                  }}
                >
                  <Circle
                    size={10}
                    style={{
                      marginTop: 5,
                      fill: activity.type === 'order' ? '#CC6F00' : activity.type === 'product' ? '#F2A900' : activity.type === 'customer' ? '#16a34a' : '#0284c7',
                      color: 'transparent',
                      flexShrink: 0,
                    }}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 500, fontSize: '0.84rem' }}>
                      {activity.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.72rem' }}>
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Low Stock Alert Banner */}
      <Box sx={{ mt: { xs: 2.5, md: 3.5 } }}>
        <Card
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: '#F2A900',
            background: isDark
              ? 'linear-gradient(135deg, rgba(77, 42, 0, 0.5) 0%, rgba(44, 27, 10, 0.8) 100%)'
              : 'linear-gradient(135deg, #FAF7F0 0%, #F9E6A8 100%)',
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.5 } }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: { xs: 'flex-start', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 2,
              }}
            >
              <Box
                sx={{
                  p: 1.2,
                  borderRadius: 2,
                  bgcolor: '#F2A900',
                  color: '#4D2A00',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Package size={24} />
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary' }}>
                  Low Stock Alert
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  3 products are currently running below safety threshold. Restock recommended.
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={() => navigate('/inventory')}
                sx={{
                  bgcolor: '#CC6F00',
                  color: '#ffffff',
                  fontWeight: 600,
                  alignSelf: { xs: 'stretch', sm: 'auto' },
                  '&:hover': { bgcolor: '#b86200' },
                }}
              >
                View Inventory
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
