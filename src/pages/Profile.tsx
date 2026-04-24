import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { 
  User, Mail, Calendar, ArrowLeft, 
  Trophy, Zap, DollarSign, ShieldCheck,
  UserPlus, Copy, CheckCircle2, X, Users,
  Flag, Target, Share2, Award, TrendingUp
} from "lucide-react";
import { toast } from "sonner";

// Asset Import
import defaultAvatar from "../assets/default-user.jpg";

const Profile = () => {
  const { id } = useParams(); 
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
    setLoading(true);
    const { data: { user: authUser } } = await supabase.auth.getUser();
    
    if (!authUser) {
      navigate("/login");
      return;
    }
    setUser(authUser);

    const targetId = id || authUser.id;

    const [profileRes, countRes] = await Promise.all([
      supabase.from("profiles").select("*").eq("id", targetId).single(),
      supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("referred_by", targetId)
    ]);

    if (profileRes.data) {
      setProfileData({
        ...profileRes.data,
        referral_count: countRes.count || 0
      });
    }
    setLoading(false);
  };

  const fetchTeamMembers = async () => {
    const targetId = id || user?.id;
    if (!targetId) return;

    setLoadingTeam(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("display_name, rank, photo_url")
      .eq("referred_by", targetId);
    
    if (error) {
      toast.error("Failed to load family members");
    } else {
      setTeamMembers(data || []);
    }
    setLoadingTeam(false);
  };

  useEffect(() => {
    fetchUserData();
  }, [id, navigate]);

  useEffect(() => {
    if (isTeamModalOpen) {
      fetchTeamMembers();
    }
  }, [isTeamModalOpen]);

  const handleReferralSubmit = async () => {
    if (!referralInput.trim()) return;
    setIsSubmittingReferral(true);

    try {
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

      const { error: updateMeError } = await supabase
        .from("profiles")
        .update({ referred_by: referrer.id })
        .eq("id", user.id);

      if (updateMeError) throw updateMeError;

      const { error: updateReferrerError } = await supabase
        .from("profiles")
        .update({ referral_count: (referrer.referral_count || 0) + 1 })
        .eq("id", referrer.id);

      if (updateReferrerError) throw updateReferrerError;

      toast.success("Referral successful!");
      setReferralInput("");
      fetchUserData();
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

  const profileImage = profileData?.photo_url || (id ? defaultAvatar : user.user_metadata?.avatar_url) || defaultAvatar;
  const isOwnProfile = !id || id === user.id;

  const objectives = [
    {
      title: "Expand Your Dynasty",
      desc: "Recruit 5 new members using your unique referral code to reach the next tier.",
      icon: <UserPlus className="text-orange-500" size={24} />,
    },
    {
      title: "Viral Integration",
      desc: "Share your node status to social media to increase your network visibility.",
      icon: <Share2 className="text-blue-500" size={24} />,
    },
    {
      title: "Maintain Dominance",
      desc: "Log in daily to keep your active streak alive and boost your node priority.",
      icon: <Zap className="text-yellow-500" size={24} />,
    },
    {
      title: "Rank Elevation",
      desc: "Increase your total investment to unlock the 'Elite Founder' rank badge.",
      icon: <TrendingUp className="text-green-500" size={24} />,
    },
    {
      title: "Complete Identity",
      desc: "Ensure your photo and display name are set to maximize trust within the network.",
      icon: <Award className="text-purple-500" size={24} />,
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-6 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 mb-8 transition-all font-black uppercase text-[16px] tracking-widest"
        >
          <ArrowLeft className="w-5 h-5" /> Back to Network
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
                   <h1 className="text-4xl font-black uppercase italic tracking-tighter">
                     {profileData?.display_name || 
                      (isOwnProfile ? (user.user_metadata?.full_name || user.email?.split('@')[0]) : (profileData?.email?.split('@')[0] || "Anonymous"))}
                   </h1>
                   <ShieldCheck className="text-orange-600" size={28} />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-orange-600 font-black uppercase tracking-[0.3em] text-[25px]">
                    {profileData?.rank || "Foundation Member"}
                  </p>
                  {profileData?.tribe_id && (
                    <p className="text-zinc-500 font-black uppercase tracking-widest text-[20px] flex items-center gap-2">
                      <Flag size={18} className="text-purple-500" /> {profileData.tribe_id}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Zap size={20} className="text-orange-500" />
                  <span className="text-[16px] font-black uppercase tracking-widest">Active Streak</span>
                </div>
                <p className="text-2xl font-black italic">{profileData?.current_streak || 0} DAYS</p>
              </div>

              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <DollarSign size={20} className="text-green-500" />
                  <span className="text-[16px] font-black uppercase tracking-widest">Invested</span>
                </div>
                <p className="text-2xl font-black italic">${(Number(profileData?.paid || 0)).toLocaleString()}</p>
              </div>

              <button 
                onClick={() => setIsTeamModalOpen(true)}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-purple-500/50 transition-all group"
              >
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Trophy size={20} className="text-purple-500" />
                  <span className="text-[16px] font-black uppercase tracking-widest">Families</span>
                </div>
                <p className="text-2xl font-black italic group-hover:text-purple-400 transition-colors">
                  {profileData?.referral_count || 0}
                </p>
              </button>
            </div>

            {isOwnProfile && (
              <>
                <div className="mb-10 p-6 bg-zinc-900 border border-zinc-800 rounded-3xl">
                  <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-4">Your Recruitment Asset</h3>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 flex justify-between items-center group">
                      <span className="font-mono text-orange-600 font-bold tracking-widest text-[18px]">
                        {profileData?.referral_code || "GENERATING..."}
                      </span>
                      <button onClick={copyReferralCode} className="text-zinc-500 hover:text-white transition-colors">
                        <Copy size={20} />
                      </button>
                    </div>
                    <p className="text-[16px] text-zinc-500 uppercase font-black w-32 leading-tight">Share this code to build your network</p>
                  </div>

                  {!profileData?.referred_by ? (
                    <div className="space-y-4">
                      <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500">Referred By?</h3>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          placeholder="ENTER REFERRAL CODE"
                          value={referralInput}
                          onChange={(e) => setReferralInput(e.target.value.toUpperCase())}
                          className="flex-1 bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[16px] font-bold tracking-widest focus:border-orange-600 outline-none transition-all uppercase"
                        />
                        <button 
                          onClick={handleReferralSubmit}
                          disabled={isSubmittingReferral || !referralInput}
                          className="bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 rounded-xl font-black text-[16px] uppercase tracking-widest transition-all active:scale-95"
                        >
                          {isSubmittingReferral ? "LINKING..." : "LINK FOUNDER"}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 text-green-500 bg-green-500/5 border border-green-500/20 p-4 rounded-xl">
                      <CheckCircle2 size={24} />
                      <span className="text-[16px] font-black uppercase tracking-widest">Network Node Linked Successfully</span>
                    </div>
                  )}
                </div>

                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-6 ml-2">
                    <Target className="text-orange-600" size={24} />
                    <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500">Next Objectives</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {objectives.map((obj, idx) => (
                      <div key={idx} className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] group hover:border-orange-600/50 transition-all">
                         <div className="flex items-start gap-4">
                            <div className="p-3 bg-black rounded-xl border border-zinc-800 group-hover:border-orange-600/50 transition-colors">
                              {obj.icon}
                            </div>
                            <div>
                              <p className="text-[16px] font-black uppercase tracking-tight mb-2 group-hover:text-orange-500 transition-colors">{obj.title}</p>
                              <p className="text-[16px] text-zinc-500 font-medium leading-relaxed">{obj.desc}</p>
                            </div>
                         </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-4">
              <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 ml-2">Verification Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors">
                  <div className="p-3 bg-black rounded-xl">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[16px] text-zinc-500 uppercase font-black tracking-wider">Rebirth</p>
                    <p className="font-bold text-[18px]">
                      {profileData?.Rebirth || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-zinc-800 flex justify-between items-center">
              <div className="flex gap-2 items-center">
                 <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-[16px] font-black uppercase tracking-widest text-zinc-500">Node Active</span>
              </div>
              <button className="text-[16px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>

      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <div>
                <h2 className="text-2xl font-black uppercase italic tracking-tighter">Families</h2>
                <p className="text-[16px] text-zinc-500 font-black uppercase tracking-widest">Active Recruitment Network</p>
              </div>
              <button 
                onClick={() => setIsTeamModalOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-500 hover:text-white"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-4 overflow-y-auto custom-scrollbar">
              {loadingTeam ? (
                <div className="py-20 text-center">
                  <div className="animate-spin w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
                  <p className="text-[16px] font-black uppercase tracking-widest text-zinc-500">Scanning Database...</p>
                </div>
              ) : teamMembers.length > 0 ? (
                <div className="space-y-3">
                  {teamMembers.map((member, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                      <img 
                        src={member.photo_url || defaultAvatar} 
                        className="w-14 h-14 rounded-xl object-cover border border-zinc-700" 
                        alt="" 
                      />
                      <div className="flex-1 overflow-hidden">
                        <p className="font-bold text-[16px] truncate uppercase tracking-tight">
                          {member.display_name || "Anonymous"}
                        </p>
                        <p className="text-[16px] text-zinc-500 font-black tracking-widest uppercase">{member.rank}</p>
                      </div>
                      <div className="text-right">
                        <Users size={18} className="text-orange-600 ml-auto mb-1" />
                        <p className="text-[16px] text-zinc-600 font-black uppercase tracking-tighter">Verified</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center">
                  <Trophy size={48} className="mx-auto mb-4 text-zinc-800" />
                  <p className="text-[16px] font-black uppercase tracking-widest text-zinc-500 text-balance">No members found.</p>
                </div>
              )}
            </div>
            
            <div className="p-8 border-t border-zinc-800 bg-zinc-900/50 text-center">
              <p className="text-[16px] font-black uppercase tracking-widest text-zinc-500">
                Total Strength: {teamMembers.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
