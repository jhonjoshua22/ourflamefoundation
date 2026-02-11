import { Flame } from "lucide-react";

const AuthPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="w-full max-w-md space-y-8 p-8 rounded-2xl border border-border bg-card shadow-xl">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-flame-orange/10 mb-4">
            <Flame className="w-10 h-10 text-flame-orange" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to continue your impact
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="space-y-4">
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

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded border-border text-flame-orange focus:ring-flame-orange" />
              <span className="text-muted-foreground">Remember me</span>
            </label>
            <a href="#" className="text-flame-orange hover:underline font-medium">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full flame-gradient py-3 px-4 rounded-lg font-bold text-primary-foreground hover:opacity-90 transition-all shadow-lg shadow-flame-orange/20"
          >
            Sign In
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground">
          Don't have an account?{" "}
          <a href="#" className="text-flame-orange font-bold hover:underline">
            Join the movement
          </a>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
