import { supabase } from "../lib/supabaseClient";
import { Flame, Chrome } from "lucide-react";

const AuthPage = () => {
  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // This line kills the localhost error
        redirectTo: 'https://ourflamefoundation.vercel.app/login',
      },
    });
    
    if (error) {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#020617', 
      color: 'white',
      fontFamily: 'sans-serif',
      padding: '20px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '400px', 
        padding: '40px', 
        borderRadius: '16px', 
        backgroundColor: '#0f172a', 
        border: '1px solid #1e293b',
        textAlign: 'center'
      }}>
        <Flame size={48} color="#f97316" style={{ marginBottom: '16px', marginLeft: 'auto', marginRight: 'auto' }} />
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Our Flame Foundation</h2>
        <p style={{ color: '#94a3b8', marginBottom: '32px' }}>Welcome back. Please sign in.</p>

        <button 
          onClick={handleGoogleLogin}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            padding: '14px',
            backgroundColor: 'white',
            color: 'black',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          <Chrome size={20} />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default AuthPage;
