import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
  loading?: boolean;
}

export const ConfirmDialog = ({
  open,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
  isDestructive = false,
  loading = false,
}: ConfirmDialogProps) => (
  <Dialog open={open} onClose={onCancel} maxWidth="xs" fullWidth>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent><DialogContentText>{message}</DialogContentText></DialogContent>
    <DialogActions>
      <Button onClick={onCancel} disabled={loading}>{cancelText}</Button>
      <Button onClick={onConfirm} variant="contained" color={isDestructive ? 'error' : 'primary'} disabled={loading}>{confirmText}</Button>
    </DialogActions>
  </Dialog>
);
