import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";
import { Loader2 } from "lucide-react";

interface AdminGuardProps {
  children: React.ReactNode;
}

const AdminGuard: React.FC<AdminGuardProps> = ({ children }) => {
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminStatus = async () => {
      // 1. Check if there is an active session
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        setAuthorized(false);
        navigate("/login");
        return;
      }

      // 2. Check the is_admin column in the profiles table
      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", session.user.id)
        .single();

      if (error || !profile?.is_admin) {
        setAuthorized(false);
        navigate("/"); // Redirect non-admins to home
        return;
      }

      setAuthorized(true);
    };

    checkAdminStatus();
  }, [navigate]);

  // Loading state while checking permissions
  if (authorized === null) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-black">
        <Loader2 className="animate-spin text-orange-600 mb-4" size={48} />
        <p className="text-white font-black uppercase italic tracking-widest text-xs">
          Authenticating Operative...
        </p>
      </div>
    );
  }

  return authorized ? <>{children}</> : null;
};

export default AdminGuard;
