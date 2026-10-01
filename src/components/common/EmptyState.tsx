import { Box, Typography, Button } from '@mui/material';
import { InboxOutlined, Add, Search } from '@mui/icons-material';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 8, px: 3, textAlign: 'center' }}>
    <Box sx={{ color: 'text.disabled', mb: 2 }}>{icon || <InboxOutlined sx={{ fontSize: 64 }} />}</Box>
    <Typography variant="h6" color="text.primary" gutterBottom>{title}</Typography>
    {description && <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>{description}</Typography>}
    {action && <Button variant="contained" startIcon={<Add />} onClick={action.onClick}>{action.label}</Button>}
  </Box>
);

export const NoResults = ({ query, onClear }: { query?: string; onClear?: () => void }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 6, px: 3, textAlign: 'center' }}>
    <Search sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
    <Typography variant="subtitle1" color="text.primary" gutterBottom>No results found</Typography>
    {query && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>No items match "{query}"</Typography>}
    {onClear && <Button variant="text" onClick={onClear}>Clear search</Button>}
  </Box>
);
