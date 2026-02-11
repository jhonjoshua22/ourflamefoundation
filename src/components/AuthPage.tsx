import { useState } from "react";
import { Flame, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const AuthPage = () => {
  // State to track if we are in 'login' mode or 'signup' mode
  const [isLogin, setIsLogin] = useState(true);

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

      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-flame-orange/10 mb-4">
            <Flame className="w-10 h-10 text-flame-orange" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {isLogin 
              ? "Sign in to continue your impact" 
              : "Join our community and start your journey"}
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-flame-orange focus:border-transparent outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-flame-orange focus:border-transparent outline-none transition-all"
                placeholder="name@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg bg-background border border-border focus:ring-2 focus:ring-flame-orange focus:border-transparent outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flame-gradient py-3 px-4 rounded-lg font-bold text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-flame-orange/20"
          >
            {isLogin ? "Sign In" : "Register Now"}
          </button>
        </form>

        {/* Footer with Toggle Logic */}
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-flame-orange font-bold hover:underline bg-transparent border-none cursor-pointer"
          >
            {isLogin ? "Join the movement" : "Sign in here"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
