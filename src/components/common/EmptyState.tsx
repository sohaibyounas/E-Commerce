import { Box, Typography, Button } from '@mui/material';
import { Inbox, Plus, Search } from 'lucide-react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: { label: string; onClick: () => void };
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 5, sm: 8 }, px: 3, textAlign: 'center' }}>
    <Box sx={{ color: 'text.disabled', mb: 2, display: 'flex', justifyContent: 'center' }}>
      {icon || <Inbox size={56} strokeWidth={1.5} />}
    </Box>
    <Typography variant="h6" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>{title}</Typography>
    {description && <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, mb: 3 }}>{description}</Typography>}
    {action && (
      <Button variant="contained" startIcon={<Plus size={18} />} onClick={action.onClick}>
        {action.label}
      </Button>
    )}
  </Box>
);

export const NoResults = ({ query, onClear }: { query?: string; onClear?: () => void }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: { xs: 4, sm: 6 }, px: 3, textAlign: 'center' }}>
    <Box sx={{ color: 'text.disabled', mb: 2, display: 'flex', justifyContent: 'center' }}>
      <Search size={44} strokeWidth={1.5} />
    </Box>
    <Typography variant="subtitle1" color="text.primary" gutterBottom sx={{ fontWeight: 600 }}>No results found</Typography>
    {query && <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>No items match "{query}"</Typography>}
    {onClear && <Button variant="text" onClick={onClear}>Clear search</Button>}
  </Box>
);
