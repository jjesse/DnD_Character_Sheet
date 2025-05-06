interface User {
  id: string;
  username: string;
  email: string;
}

interface ProfileUpdate {
  username: string;
  email: string;
}

export class AuthService {
  private static readonly USER_KEY = 'current_user';

  static async login(email: string, password: string): Promise<User> {
    // In a real app, this would make an API call
    const user = {
      id: Math.random().toString(36).substr(2, 9),
      username: email.split('@')[0],
      email
    };
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
    return user;
  }

  static logout(): void {
    localStorage.removeItem(AuthService.USER_KEY);
  }

  static getCurrentUser(): User | null {
    const userStr = localStorage.getItem(AuthService.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  static isAuthenticated(): boolean {
    return !!AuthService.getCurrentUser();
  }

  static async updateProfile(data: ProfileUpdate): Promise<User> {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) throw new Error('Not authenticated');

    const updatedUser = {
      ...currentUser,
      ...data
    };
    localStorage.setItem(AuthService.USER_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  }

  static async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');
    
    // In a real app, this would make an API call
    // For now, we'll just simulate success
    return Promise.resolve();
  }

  static async deleteAccount(): Promise<void> {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error('Not authenticated');

    // Delete all user's characters
    Object.keys(localStorage)
      .filter(key => key.startsWith(`character-${user.id}`))
      .forEach(key => localStorage.removeItem(key));

    // Remove user data
    localStorage.removeItem(AuthService.USER_KEY);
  }
}