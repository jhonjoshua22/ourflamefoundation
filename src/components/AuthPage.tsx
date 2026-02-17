import { useState } from "react";
import { Flame, ArrowLeft, Mail } from "lucide-react"; // Added Mail icon
import { Link } from "react-router-dom";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  // Mock functions for the SSO logic
  const handleGoogleLogin = () => {
    console.log("Redirecting to Google SSO...");
    // If using Firebase: signInWithPopup(auth, googleProvider)
  };

  const handleMicrosoftLogin = () => {
    console.log("Redirecting to Microsoft SSO...");
    // If using Supabase: supabase.auth.signInWithOAuth({ provider: 'azure' })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
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
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-flame-orange/10 mb-4">
            <Flame className="w-10 h-10 text-flame-orange" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
        </div>

        {/* SSO Section */}
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="Google" />
            Google
          </button>
          <button 
            onClick={handleMicrosoftLogin}
            className="flex items-center justify-center gap-2 py-2.5 border border-border rounded-lg hover:bg-muted transition-colors font-medium text-sm"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" className="w-4 h-4" alt="Microsoft" />
            Outlook
          </button>
        </div>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border"></span></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-flame-orange" placeholder="John Doe" />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input type="email" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-flame-orange" placeholder="name@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" className="w-full px-4 py-2.5 rounded-lg bg-background border border-border outline-none focus:ring-2 focus:ring-flame-orange" placeholder="••••••••" />
          </div>

          <button type="submit" className="w-full flame-gradient py-3 rounded-lg font-bold text-white shadow-lg shadow-flame-orange/20 hover:opacity-90 transition-opacity">
            {isLogin ? "Sign In" : "Register Now"}
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-flame-orange font-bold hover:underline">
            {isLogin ? "Join the movement" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
