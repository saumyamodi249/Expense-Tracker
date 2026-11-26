export type RouteOption = 'dashboard' | 'expenses' | 'categories' | 'profile' | 'signin' | 'signup';

export interface LogoutProps {
  className?: string;
  onLogoutSuccess?: () => void;
}
