import { Card, CardContent, Typography, Box, Skeleton } from '@mui/material';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: string;
  loading?: boolean;
}

export const StatCard = ({ title, value, change, changeLabel = 'vs last period', icon, color = 'primary.main', loading }: StatCardProps) => {
  if (loading) return <Skeleton variant="rectangular" height={140} sx={{ borderRadius: 2 }} />;

  const isPositive = change !== undefined && change >= 0;

  return (
    <Card elevation={0} sx={{ border: '1px solid', borderColor: 'divider', height: '100%', transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 2 } }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">{title}</Typography>
          {icon && <Box sx={{ color, p: 1, borderRadius: 1, bgcolor: `${color}15` }}>{icon}</Box>}
        </Box>
        <Typography variant="h4" sx={{ fontWeight: 600 }} gutterBottom>{value}</Typography>
        {change !== undefined && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {isPositive ? <TrendingUp size={16} color="#2e7d32" /> : <TrendingDown size={16} color="#d32f2f" />}
            <Typography variant="body2" sx={{ color: isPositive ? 'success.main' : 'error.main', fontWeight: 500 }}>
              {isPositive ? '+' : ''}{change.toFixed(1)}%
            </Typography>
            <Typography variant="caption" color="text.secondary">{changeLabel}</Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

