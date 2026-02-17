import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { User, Mail, Calendar, ArrowLeft } from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) navigate("/login");
      else setUser(user);
    });
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pt-32 pb-12 px-6">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-muted-foreground hover:text-flame-orange mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
          <div className="h-32 flame-gradient w-full" />
          <div className="px-8 pb-8">
            <div className="relative -mt-16 mb-6">
              <img 
                src={user.user_metadata?.avatar_url} 
                className="w-32 h-32 rounded-2xl border-4 border-card bg-muted shadow-lg"
                alt="Avatar"
              />
            </div>

            <h1 className="text-3xl font-bold mb-1">{user.user_metadata?.full_name}</h1>
            <p className="text-muted-foreground mb-8">Foundation Member</p>

            <div className="grid gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <Mail className="w-5 h-5 text-flame-orange" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Email</p>
                  <p className="font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border">
                <Calendar className="w-5 h-5 text-flame-orange" />
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Member Since</p>
                  <p className="font-medium">{new Date(user.created_at).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
