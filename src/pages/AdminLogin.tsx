import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqhofufejzjewsmycogg.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    // 1. Authenticate the user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setErrorMsg(authError.message);
      setLoading(false);
      return;
    }

    if (authData.user) {
      // 2. Check the 'profiles' table for is_admin = true
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', authData.user.id)
        .single();

      if (profileError || !profile?.is_admin) {
        // 3. Unauthorized: Sign them out immediately
        await supabase.auth.signOut();
        setErrorMsg("Access Denied: You do not have administrator privileges.");
        setLoading(false);
      } else {
        // 4. Success: User is an admin
        window.location.href = '/admin/dashboard';
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>Flame Foundation</h1>
          <h2 style={styles.subtitle}>Admin Login</h2>
          <p style={styles.description}>Access is restricted to verified administrators.</p>
        </div>

        <form onSubmit={handleLogin} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@flamefoundation.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          {errorMsg && <p style={styles.errorText}>{errorMsg}</p>}

          <button 
            type="submit" 
            disabled={loading} 
            style={{
              ...styles.button, 
              backgroundColor: loading ? '#444' : '#FF4D00',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Verifying Permissions...' : 'Access CMS'}
          </button>
        </form>
      </div>
    </div>
  );
};

// ... Styles remain the same as previous version ...
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#000', 
    fontFamily: 'Inter, sans-serif',
  },
  card: {
    backgroundColor: '#0A0A0A',
    border: '1px solid #222',
    padding: '48px',
    borderRadius: '12px',
    width: '100%',
    maxWidth: '400px',
  },
  header: { textAlign: 'center', marginBottom: '32px' },
  title: { color: '#FF4D00', fontSize: '1.5rem', fontWeight: 'bold', margin: 0 },
  subtitle: { color: '#FFF', fontSize: '1.1rem', margin: '8px 0' },
  description: { color: '#555', fontSize: '0.85rem' },
  form: { display: 'flex', flexDirection: 'column', gap: '20px' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
  label: { color: '#888', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' },
  input: { padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '6px', color: '#FFF' },
  button: { padding: '14px', border: 'none', borderRadius: '6px', color: '#FFF', fontWeight: 'bold' },
  errorText: { color: '#FF4D00', fontSize: '0.85rem', textAlign: 'center', backgroundColor: 'rgba(255, 77, 0, 0.1)', padding: '10px', borderRadius: '4px' }
};

export default AdminLogin;
