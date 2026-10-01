import { Card, CardContent, Skeleton, Stack, Box } from '@mui/material';

export const CardSkeleton = () => (
  <Card elevation={0} sx={{ height: '100%' }}>
    <CardContent>
      <Skeleton variant="text" width="40%" height={20} />
      <Skeleton variant="text" width="60%" height={40} />
      <Skeleton variant="text" width="30%" height={16} />
    </CardContent>
  </Card>
);

export const TableSkeleton = ({ rows = 5, cols = 6 }: { rows?: number; cols?: number }) => (
  <Box>
    <Stack direction="row" spacing={2} sx={{ mb: 2, p: 2 }}>
      {Array.from({ length: cols }).map((_, i) => (
        <Skeleton key={i} variant="text" width={100} height={20} />
      ))}
    </Stack>
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <Stack key={rowIndex} direction="row" spacing={2} sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
        {Array.from({ length: cols }).map((_, colIndex) => (
          <Skeleton key={colIndex} variant="text" width={100} height={20} />
        ))}
      </Stack>
    ))}
  </Box>
);

export const FormSkeleton = () => (
  <Stack spacing={3} sx={{ p: 3 }}>
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
    <Skeleton variant="rectangular" height={56} sx={{ borderRadius: 1 }} />
    <Skeleton variant="rectangular" height={100} sx={{ borderRadius: 1 }} />
    <Skeleton variant="rectangular" width={120} height={40} sx={{ borderRadius: 1 }} />
  </Stack>
);
