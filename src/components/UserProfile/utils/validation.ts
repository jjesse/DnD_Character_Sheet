export const validatePassword = (password: string): string[] => {
  const errors: string[] = [];
  if (password.length < 8) errors.push('Password must be at least 8 characters');
  if (!/[A-Z]/.test(password)) errors.push('Password must contain an uppercase letter');
  if (!/[a-z]/.test(password)) errors.push('Password must contain a lowercase letter');
  if (!/[0-9]/.test(password)) errors.push('Password must contain a number');
  return errors;
};

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateUsername = (username: string): string[] => {
  const errors: string[] = [];
  if (username.length < 3) errors.push('Username must be at least 3 characters');
  if (!/^[a-zA-Z0-9_-]+$/.test(username)) errors.push('Username can only contain letters, numbers, underscores, and hyphens');
  return errors;
};