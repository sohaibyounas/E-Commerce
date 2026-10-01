import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  size?: 'small' | 'medium';
}

export const SearchInput = ({ value, onChange, placeholder = 'Search...', size = 'small' }: SearchInputProps) => (
  <TextField
    size={size}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    InputProps={{
      startAdornment: <InputAdornment position="start"><Search sx={{ color: 'text.disabled' }} /></InputAdornment>,
    }}
    sx={{ minWidth: 200 }}
  />
);
