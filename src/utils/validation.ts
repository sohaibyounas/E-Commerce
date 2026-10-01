export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isStrongPassword = (password: string): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('At least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('Contains uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Contains lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Contains number');
  if (!/[!@#$%^&*]/.test(password)) errors.push('Contains special character');
  return { valid: errors.length === 0, errors };
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]{10,}$/;
  return phoneRegex.test(phone);
};
