import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/navigation";
import { authConfig } from "@/lib/config/auth";

export function useAuth() {
  const router = useRouter();
  const auth0 = authConfig.isEnabled
    ? useUser()
    : {
        user: null,
        error: null,
        isLoading: false,
      };

  const login = () => {
    if (!authConfig.isEnabled) {
      console.warn("Auth0 is not configured");
      return;
    }
    router.push("/api/auth/login");
  };

  const logout = () => {
    if (!authConfig.isEnabled) {
      console.warn("Auth0 is not configured");
      return;
    }
    router.push("/api/auth/logout");
  };

  const signup = () => {
    if (!authConfig.isEnabled) {
      console.warn("Auth0 is not configured");
      return;
    }
    router.push("/api/auth/signup");
  };

  return {
    user: auth0.user,
    error: auth0.error,
    isLoading: auth0.isLoading,
    isAuthenticated: !!auth0.user,
    isConfigured: authConfig.isEnabled,
    login,
    logout,
    signup,
  };
}
