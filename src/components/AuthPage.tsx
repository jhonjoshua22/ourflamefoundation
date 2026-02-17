import { useState } from "react";
import { Flame, ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
// Note the "../" to go up from components into lib
import { supabase } from "../lib/supabaseClient";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // --- GOOGLE SSO HANDLER ---
  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          // This must match your "Site URL" in Supabase Auth Settings
          redirectTo: window.location.origin, 
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      if (error) throw error;
    } catch (error: any) {
      alert(error.message);
    }
  };

  // --- EMAIL/PASSWORD HANDLER ---
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;
      
      if (!isLogin) {
        alert("Success! Check your email for a confirmation link.");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      {/* Back to Home Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-orange-500/10 mb-4">
            <Flame className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin ? "Sign in to continue" : "Start your journey today"}
          </p>
        </div>

        {/* Social Login Button */}
        <div className="pt-2">
          <button 
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 border border-border rounded-lg hover:bg-muted transition-all font-medium"
          >
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              className="w-5 h-5" 
              alt="Google Logo" 
            />
            Continue with Google
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border"></span>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or email & password</span>
          </div>
        </div>

        {/* Traditional Form */}
        <form className="space-y-4" onSubmit={handleAuth}>
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
              placeholder="name@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-orange-500 transition-all" 
              placeholder="••••••••" 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 py-3 rounded-lg font-bold text-white shadow-lg hover:bg-orange-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLogin ? "Sign In" : "Register Now"}
          </button>
        </form>

        {/* Footer Toggle */}
        <p className="text-center text-sm text-muted-foreground pt-2">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button"
            onClick={() => setIsLogin(!isLogin)} 
            className="text-orange-500 font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isLogin ? "Join now" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
