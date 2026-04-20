import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { 
  User, Mail, Calendar, ArrowLeft, 
  Trophy, Zap, DollarSign, ShieldCheck,
  UserPlus, Copy, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

// Asset Import
import defaultAvatar from "../assets/default-user.jpg";

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [referralInput, setReferralInput] = useState("");
  const [isSubmittingReferral, setIsSubmittingReferral] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      navigate("/login");
      return;
    }

    setUser(user);

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    if (profile) {
      setProfileData(profile);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleReferralSubmit = async () => {
    if (!referralInput.trim()) return;
    setIsSubmittingReferral(true);

    try {
      // 1. Find the referrer
      const { data: referrer, error: findError } = await supabase
        .from("profiles")
        .select("id, referral_count")
        .eq("referral_code", referralInput.trim())
        .single();

      if (findError || !referrer) {
        toast.error("Invalid referral code.");
        return;
      }

      if (referrer.id === user.id) {
        toast.error("You cannot refer yourself.");
        return;
      }

      if (profileData?.referred_by) {
        toast.error("You have already been referred.");
        return;
      }

      // 2. Update current user's referred_by
      const { error: updateMeError } = await supabase
        .from("profiles")
        .update({ referred_by: referrer.id })
        .eq("id", user.id);

      if (updateMeError) throw updateMeError;

      // 3. Increment referrer's count
      const { error: updateReferrerError } = await supabase
        .from("profiles")
        .update({ referral_count: (referrer.referral_count || 0) + 1 })
        .eq("id", referrer.id);

      if (updateReferrerError) throw updateReferrerError;

      toast.success("Referral successful!");
      setReferralInput("");
      fetchUserData(); // Refresh data
    } catch (err: any) {
      toast.error(err.message || "Referral failed");
    } finally {
      setIsSubmittingReferral(false);
    }
  };

  const copyReferralCode = () => {
    if (profileData?.referral_code) {
      navigator.clipboard.writeText(profileData.referral_code);
      toast.success("Code copied to clipboard!");
    }
  };

  if (loading || !user) return null;

  const profileImage = profileData?.photo_url || user.user_metadata?.avatar_url || defaultAvatar;

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-6 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-8 transition-all font-black uppercase text-xs tracking-widest"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Network
        </button>

        <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] overflow-hidden shadow-2xl">
          <div className="h-40 bg-gradient-to-r from-orange-600 to-purple-900 w-full relative">
            <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
          </div>

          <div className="px-8 pb-12">
            <div className="relative -mt-20 mb-8 flex flex-col md:flex-row md:items-end gap-6">
              <img 
                src={profileImage} 
                className="w-40 h-40 rounded-[2rem] border-8 border-zinc-950 bg-zinc-900 shadow-2xl object-cover"
                alt="Profile"
                referrerPolicy="no-referrer"
                onError={(e) => { (e.target as HTMLImageElement).src = defaultAvatar; }}
              />
              <div className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                   <h1 className="text-4xl font-black uppercase italic tracking-tighter">{profileData?.display_name || user.user_metadata?.full_name}</h1>
                   <ShieldCheck className="text-orange-600" size={24} />
                </div>
                <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-xs">
                  {profileData?.rank || "Foundation Member"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Zap size={18} className="text-orange-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Active Streak</span>
                </div>
                <p className="text-2xl font-black italic">{profileData?.current_streak || 0} DAYS</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <DollarSign size={18} className="text-green-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Valuation</span>
                </div>
                <p className="text-2xl font-black italic">${(profileData?.valuation || 0).toLocaleString()}</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Trophy size={18} className="text-purple-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Network Score</span>
                </div>
                <p className="text-2xl font-black italic">{profileData?.referral_count || 0} RECRUITS</p>
              </div>
            </div>

            {/* Referral Section */}
            <div className="mb-10 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">Your Recruitment Asset</h3>
              <div className="flex items-center gap-4 mb-8">
                <div className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 flex justify-between items-center group">
                  <span className="font-mono text-orange-600 font-bold tracking-widest">
                    {profileData?.referral_code || "GENERATING..."}
                  </span>
                  <button onClick={copyReferralCode} className="text-zinc-500 hover:text-white transition-colors">
                    <Copy size={16} />
                  </button>
                </div>
                <p className="text-[9px] text-zinc-500 uppercase font-black w-24 leading-tight">Share this code to build your network</p>
              </div>

              {!profileData?.referred_by ? (
                <div className="space-y-4">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">Referred By?</h3>
                  <div className="flex gap-2">
                    <input 
                      type="text"
                      placeholder="ENTER REFERRAL CODE"
                      value={referralInput}
                      onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                      className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-sm font-bold tracking-widest focus:border-orange-600 outline-none transition-all uppercase"
                    />
                    <button 
                      onClick={handleReferralSubmit}
                      disabled={isSubmittingReferral || !referralInput}
                      className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95"
                    >
                      {isSubmittingReferral ? "LINKING..." : "LINK FOUNDER"}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 text-green-500 bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                  <CheckCircle2 size={18} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Network Node Linked Successfully</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 ml-2">Verification Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors">
                  <div className="p-3 bg-black rounded-xl">
                    <Mail className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-wider">Secure Email</p>
                    <p className="font-bold text-sm">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors">
                  <div className="p-3 bg-black rounded-xl">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[10px] text-zinc-500 uppercase font-black tracking-wider">Joined Flame</p>
                    <p className="font-bold text-sm">{new Date(user.created_at).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
              <div className="flex gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Node Active</span>
              </div>
              <button className="text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
