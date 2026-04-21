import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Trophy, Zap, DollarSign, 
  ShieldCheck, Copy, CheckCircle2, X, Users, Mail, Calendar 
} from "lucide-react";
import { toast } from "sonner";
import defaultAvatar from "../assets/default-user.jpg";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referralInput, setReferralInput] = useState("");
  const [isSubmittingReferral, setIsSubmittingReferral] = useState(false);
  
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [loadingTeam, setLoadingTeam] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) {
      navigate("/login");
      return;
    }
    setUser(authUser);

    // FETCH: Getting referral_code and the trigger-updated referral_count
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (error) {
      console.error("Fetch error:", error);
    } else {
      setProfileData(profile);
    }
    setLoading(false);
  };

  const fetchTeamMembers = async () => {
    setLoadingTeam(true);
    const { data } = await supabase
      .from("profiles")
      .select("display_name, email, rank, photo_url")
      .eq("referred_by", user.id);
    setTeamMembers(data || []);
    setLoadingTeam(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  useEffect(() => {
    if (isTeamModalOpen) fetchTeamMembers();
  }, [isTeamModalOpen]);

  const copyReferralCode = () => {
    const code = profileData?.referral_code;
    if (code) {
      navigator.clipboard.writeText(code);
      toast.success(`COPIED: ${code}`);
    }
  };

  const handleReferralSubmit = async () => {
    if (!referralInput.trim()) return;
    setIsSubmittingReferral(true);
    try {
      const { data: referrer, error: findError } = await supabase
        .from("profiles")
        .select("id")
        .eq("referral_code", referralInput.trim().toUpperCase())
        .single();

      if (findError || !referrer) throw new Error("Invalid code");
      if (referrer.id === user.id) throw new Error("Self-referral blocked");

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ referred_by: referrer.id })
        .eq("id", user.id);

      if (updateError) throw updateError;

      toast.success("Recruitment Linked!");
      setReferralInput("");
      fetchUserData(); // Trigger fresh fetch to see new count
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsSubmittingReferral(false);
    }
  };

  if (loading || !user) return null;

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-6 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-8 font-black uppercase text-xs tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Network
        </button>

        <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="h-40 bg-gradient-to-r from-orange-600 to-purple-900 w-full" />

          <div className="px-8 pb-12">
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row md:items-end gap-6">
              <img 
                src={profileData?.photo_url || defaultAvatar} 
                className="w-40 h-40 rounded-[2rem] border-8 border-zinc-950 bg-zinc-900 object-cover" 
                alt="Profile" 
              />
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                   <h1 className="text-4xl font-black uppercase italic tracking-tighter">{profileData?.display_name || "MEMBER"}</h1>
                   <ShieldCheck className="text-orange-600" size={24} />
                </div>
                <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs">{profileData?.rank}</p>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Streak</span>
                <p className="text-2xl font-black italic">{profileData?.current_streak || 0} DAYS</p>
              </div>
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Valuation</span>
                <p className="text-2xl font-black italic">${(profileData?.valuation || 0).toLocaleString()}</p>
              </div>
              <button onClick={() => setIsTeamModalOpen(true)} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-purple-500 transition-all group">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Team Members</span>
                <p className="text-2xl font-black italic group-hover:text-purple-400">{profileData?.referral_count || 0} NODES</p>
              </button>
            </div>

            {/* Referral Display */}
            <div className="mb-10 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">Your Recruitment Asset</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 flex justify-between items-center group">
                  <span className="font-mono text-orange-600 font-bold tracking-widest">
                    {profileData?.referral_code || "---"}
                  </span>
                  <button onClick={copyReferralCode} className="text-zinc-500 hover:text-white"><Copy size={16} /></button>
                </div>
              </div>

              {!profileData?.referred_by ? (
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="ENTER FOUNDER CODE" 
                    value={referralInput}
                    onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                    className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold uppercase tracking-widest outline-none focus:border-orange-600"
                  />
                  <button onClick={handleReferralSubmit} className="bg-orange-600 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">
                    {isSubmittingReferral ? "LINKING..." : "LINK"}
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-500 bg-green-500/5 p-4 rounded-xl border border-green-500/20">
                  <CheckCircle2 size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Network Verified</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Team Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-[2rem] overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center">
              <h2 className="text-2xl font-black uppercase italic italic tracking-tighter">My Team</h2>
              <button onClick={() => setIsTeamModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={24} /></button>
            </div>
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              {loadingTeam ? (
                <p className="text-center py-10 animate-pulse text-zinc-500 uppercase font-black tracking-widest text-[10px]">Syncing nodes...</p>
              ) : teamMembers.length > 0 ? (
                teamMembers.map((member, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 mb-2 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <img src={member.photo_url || defaultAvatar} className="w-10 h-10 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-sm uppercase tracking-tight">{member.display_name}</p>
                      <p className="text-[10px] text-orange-600 font-black uppercase tracking-widest">{member.rank}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center py-10 text-zinc-500 uppercase font-black tracking-widest text-[10px]">No recruits found.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
