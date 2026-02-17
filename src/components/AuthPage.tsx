import { useState } from "react";
import { Flame, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

const AuthPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, 
      },
    });
    if (error) alert(error.message);
  };

  // EMAIL/PASSWORD LOGIN & SIGNUP
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error, data } = isLogin 
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

      if (error) throw error;
      
      if (isLogin && data.user) {
        navigate("/"); // Send to home page on success
      } else if (!isLogin) {
        alert("Check your email for the confirmation link!");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6 text-white">
      <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="w-full max-w-md space-y-6 p-8 rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl">
        <div className="text-center">
          <Flame className="w-12 h-12 text-orange-500 mx-auto mb-4" />
          <h2 className="text-3xl font-bold tracking-tight">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        <button 
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-3 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all font-medium"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="G" />
          Continue with Google
        </button>

        <div className="relative py-2">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-800"></span></div>
          <div className="relative flex justify-center text-xs uppercase"><span className="bg-slate-900 px-2 text-slate-500">Or use email</span></div>
        </div>

        <form className="space-y-4" onSubmit={handleAuth}>
          <input 
            type="email" 
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
          />
          <input 
            type="password" 
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-slate-800 border border-slate-700 focus:ring-2 focus:ring-orange-500 outline-none transition-all" 
          />
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 py-3 rounded-lg font-bold hover:bg-orange-700 transition-all flex items-center justify-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isLogin ? "Sign In" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-400">
          {isLogin ? "Need an account?" : "Have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-orange-500 font-bold hover:underline bg-transparent border-none">
            {isLogin ? "Join now" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
