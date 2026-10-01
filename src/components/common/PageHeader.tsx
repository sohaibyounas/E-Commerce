import { Typography, Box, Button, Breadcrumbs, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: { label: string; href?: string }[];
  action?: { label: string; onClick: () => void; icon?: React.ReactNode };
}

export const PageHeader = ({ title, subtitle, breadcrumbs, action }: PageHeaderProps) => (
  <Box sx={{ mb: { xs: 2.5, sm: 3.5 } }}>
    {breadcrumbs && (
      <Breadcrumbs
        separator={<ChevronRight size={14} color="#7C4A15" style={{ opacity: 0.6 }} />}
        sx={{ mb: 1, '& .MuiBreadcrumbs-li': { fontSize: '0.8125rem' } }}
      >
        {breadcrumbs.map((crumb, index) =>
          crumb.href && index < breadcrumbs.length - 1 ? (
            <Link
              key={index}
              component={RouterLink}
              to={crumb.href}
              color="inherit"
              underline="hover"
              sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
            >
              {crumb.label}
            </Link>
          ) : (
            <Typography key={index} sx={{ color: 'text.primary', fontWeight: 600, fontSize: '0.8125rem' }}>
              {crumb.label}
            </Typography>
          )
        )}
      </Breadcrumbs>
    )}
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 700, color: 'text.primary', fontSize: { xs: '1.4rem', sm: '1.75rem', md: '2rem' } }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && (
        <Button
          variant="contained"
          startIcon={action.icon}
          onClick={action.onClick}
          sx={{
            alignSelf: { xs: 'stretch', sm: 'auto' },
            justifyContent: 'center',
          }}
        >
          {action.label}
        </Button>
      )}
    </Box>
  </Box>
);
