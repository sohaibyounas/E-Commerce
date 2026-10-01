import { TextField, InputAdornment } from '@mui/material';
import { Search } from 'lucide-react';

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
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} color="#CC6F00" />
          </InputAdornment>
        ),
      },
    }}
    sx={{ minWidth: 200 }}
  />
);
