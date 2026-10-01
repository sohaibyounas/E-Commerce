import { Typography, Box, Button, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { NavigateNext } from '@mui/icons-material';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: { label: string; onClick: () => void; icon?: React.ReactNode };
}

export const PageHeader = ({ title, subtitle, breadcrumbs, action }: PageHeaderProps) => (
  <Box sx={{ mb: 4 }}>
    {breadcrumbs && (
      <Breadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 1 }}>
        {breadcrumbs.map((crumb, index) =>
          crumb.href && index < breadcrumbs.length - 1 ? (
            <Link key={index} component={RouterLink} to={crumb.href} color="inherit" underline="hover">{crumb.label}</Link>
          ) : (
            <Typography key={index} color="text.primary">{crumb.label}</Typography>
          )
        )}
      </Breadcrumbs>
    )}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
      <Box>
        <Typography variant="h4" fontWeight={600}>{title}</Typography>
        {subtitle && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{subtitle}</Typography>}
      </Box>
      {action && <Button variant="contained" startIcon={action.icon} onClick={action.onClick}>{action.label}</Button>}
    </Box>
  </Box>
);
