import { Chip } from '@mui/material';

type StatusType = 'active' | 'inactive' | 'draft' | 'archived' | 'suspended' |
  'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded' |
  'paid' | 'failed' | 'in_stock' | 'low_stock' | 'out_of_stock';

const statusConfig: Record<StatusType, { label: string; color: 'success' | 'warning' | 'error' | 'info' | 'default' | 'primary' | 'secondary' }> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'default' },
  draft: { label: 'Draft', color: 'warning' },
  archived: { label: 'Archived', color: 'default' },
  suspended: { label: 'Suspended', color: 'error' },
  pending: { label: 'Pending', color: 'warning' },
  processing: { label: 'Processing', color: 'info' },
  shipped: { label: 'Shipped', color: 'primary' },
  delivered: { label: 'Delivered', color: 'success' },
  cancelled: { label: 'Cancelled', color: 'error' },
  refunded: { label: 'Refunded', color: 'default' },
  paid: { label: 'Paid', color: 'success' },
  failed: { label: 'Failed', color: 'error' },
  in_stock: { label: 'In Stock', color: 'success' },
  low_stock: { label: 'Low Stock', color: 'warning' },
  out_of_stock: { label: 'Out of Stock', color: 'error' },
};

interface StatusChipProps {
  status: StatusType;
  size?: 'small' | 'medium';
}

export const StatusChip = ({ status, size = 'small' }: StatusChipProps) => {
  const config = statusConfig[status] || { label: status, color: 'default' as const };
  return <Chip label={config.label} color={config.color} size={size} />;
};
