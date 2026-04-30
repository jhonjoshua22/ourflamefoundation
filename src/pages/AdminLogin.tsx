import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pqhofufejzjewsmycogg.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

interface Profile {
  id: string;
  display_name: string | null;
  email: string | null;
  rank: string;
  is_admin: boolean;
  verified: boolean;
}

const AdminDashboard: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, []);

  const fetchProfiles = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('profiles')
      .select('id, display_name, email, rank, is_admin, verified')
      .order('created_at', { ascending: false });

    if (!error && data) setProfiles(data);
    setLoading(false);
  };

  const toggleAdminStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: !currentStatus })
      .eq('id', id);

    if (!error) {
      setProfiles(profiles.map(p => p.id === id ? { ...p, is_admin: !currentStatus } : p));
    }
  };

  const filteredProfiles = profiles.filter(p => 
    p.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.display_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.dashboardContainer}>
      <header style={styles.header}>
        <h1 style={styles.title}>Flame Foundation CMS</h1>
        <button onClick={() => supabase.auth.signOut()} style={styles.logoutBtn}>Logout</button>
      </header>

      <div style={styles.content}>
        <div style={styles.controls}>
          <input 
            type="text" 
            placeholder="Search users..." 
            style={styles.searchInput}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={fetchProfiles} style={styles.refreshBtn}>Refresh Data</button>
        </div>

        {loading ? (
          <p style={{ color: '#FF4D00' }}>Loading users...</p>
        ) : (
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Rank</th>
                <th style={styles.th}>Verified</th>
                <th style={styles.th}>Admin</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProfiles.map((profile) => (
                <tr key={profile.id} style={styles.tr}>
                  <td style={styles.td}>{profile.display_name || 'N/A'}</td>
                  <td style={styles.td}>{profile.email}</td>
                  <td style={styles.td}>
                    <span style={styles.rankBadge}>{profile.rank}</span>
                  </td>
                  <td style={styles.td}>{profile.verified ? '✅' : '❌'}</td>
                  <td style={styles.td}>{profile.is_admin ? '🛡️ Admin' : 'User'}</td>
                  <td style={styles.td}>
                    <button 
                      onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                      style={profile.is_admin ? styles.demoteBtn : styles.promoteBtn}
                    >
                      {profile.is_admin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  dashboardContainer: { minHeight: '100vh', backgroundColor: '#000', color: '#FFF', padding: '20px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #333', paddingBottom: '20px' },
  title: { color: '#FF4D00', fontSize: '1.5rem', margin: 0 },
  logoutBtn: { backgroundColor: 'transparent', color: '#888', border: '1px solid #333', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer' },
  content: { marginTop: '30px' },
  controls: { display: 'flex', gap: '15px', marginBottom: '20px' },
  searchInput: { flex: 1, padding: '12px', backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px', color: '#FFF' },
  refreshBtn: { backgroundColor: '#FF4D00', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' },
  table: { width: '100%', borderCollapse: 'collapse', backgroundColor: '#0A0A0A', borderRadius: '12px', overflow: 'hidden' },
  th: { textAlign: 'left', padding: '15px', borderBottom: '1px solid #222', color: '#666', fontSize: '0.8rem', textTransform: 'uppercase' },
  td: { padding: '15px', borderBottom: '1px solid #111', fontSize: '0.9rem' },
  rankBadge: { backgroundColor: '#222', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' },
  promoteBtn: { backgroundColor: '#10b981', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
  demoteBtn: { backgroundColor: '#ef4444', color: '#FFF', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' },
};

export default AdminDashboard;
