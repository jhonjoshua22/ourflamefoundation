import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { useNavigate, useParams } from "react-router-dom";
import { 
  User, Mail, Calendar, ArrowLeft, 
  Trophy, Zap, DollarSign, ShieldCheck,
  UserPlus, Copy, CheckCircle2, X, Users,
  Flag, Target, Share2, Award, TrendingUp,
  Link as LinkIcon, Globe, Plus, Edit3, Linkedin, Facebook, Smile
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

  // Edit Profile States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    display_name: "",
    linkedin_link: "",
    country: "",
    facebook: "", // Used for Followers
    happiness_score: "",
    photo_url: "",
    paid: "" // Added Invested field
  });
  const [isSavingProfile, setIsSavingProfile] = useState(false);

  // Team Locations States
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [isUpdatingLocation, setIsUpdatingLocation] = useState(false);

  // Clapmi Specific States
  const [isClapmiModalOpen, setIsClapmiModalOpen] = useState(false);
  const [clapmiLinkInput, setClapmiLinkInput] = useState("");
  const [isUpdatingClapmi, setIsUpdatingClapmi] = useState(false);

  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const { data: { user: authUser }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !authUser) {
        navigate("/login");
        return;
      }
      setUser(authUser);

      const targetId = id || authUser.id;

      const [profileRes, countRes] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", targetId).maybeSingle(),
        supabase.from("profiles").select("*", { count: 'exact', head: true }).eq("referred_by", targetId)
      ]);

      if (profileRes.error) throw profileRes.error;

      if (profileRes.data) {
        let rawCountries = profileRes.data.team_countries;
        let formattedCountries: string[] = [];

        if (Array.isArray(rawCountries)) {
          formattedCountries = rawCountries;
        } else if (typeof rawCountries === 'string') {
          try {
            const parsed = JSON.parse(rawCountries);
            formattedCountries = Array.isArray(parsed) ? parsed : [rawCountries];
          } catch (e) {
            formattedCountries = rawCountries.split(',').map(c => c.trim()).filter(Boolean);
          }
        }

        const data = {
          ...profileRes.data,
          team_countries: formattedCountries,
          referral_count: countRes.count || 0
        };
        setProfileData(data);
        
        // Prep edit form
        setEditFormData({
          display_name: data.display_name || "",
          linkedin_link: data.linkedin_link || "",
          country: data.country || "",
          facebook: data.facebook || "",
          happiness_score: data.happiness_score || "",
          photo_url: data.photo_url || "",
          paid: data.paid || ""
        });
      }
    } catch (err: any) {
      console.error("Error fetching profile:", err);
      toast.error("Error loading profile");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setIsSavingProfile(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          display_name: editFormData.display_name,
          linkedin_link: editFormData.linkedin_link,
          country: editFormData.country,
          facebook: editFormData.facebook,
          happiness_score: editFormData.happiness_score,
          photo_url: editFormData.photo_url,
          paid: editFormData.paid
        })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Profile fully integrated");
      setIsEditModalOpen(false);
      fetchUserData();
    } catch (err: any) {
      toast.error(err.message || "Update failed");
    } finally {
      setIsSavingProfile(false);
    }
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

  const handleAddLocation = async () => {
    if (!newLocation.trim()) return;
    setIsUpdatingLocation(true);
    
    try {
      const currentLocations = Array.isArray(profileData?.team_countries) 
        ? profileData.team_countries 
        : [];
        
      const updatedLocations = [...currentLocations, newLocation.trim()];

      const { error } = await supabase
        .from("profiles")
        .update({ 
          team_countries: updatedLocations 
        })
        .eq("id", user.id);

      if (error) throw error;
      
      toast.success("Location added to the network");
      setNewLocation("");
      setIsLocationModalOpen(false);
      fetchUserData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update locations");
    } finally {
      setIsUpdatingLocation(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [id]);

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

  const handleClapmiAction = () => {
    if (profileData?.clapmi) {
      window.open(profileData.clapmi, "_blank");
    } else {
      setIsClapmiModalOpen(true);
    }
  };

  const updateClapmiLink = async () => {
    if (!clapmiLinkInput.trim()) return;
    setIsUpdatingClapmi(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ clapmi: clapmiLinkInput.trim() })
        .eq("id", user.id);

      if (error) throw error;
      toast.success("Clapmi link updated!");
      setIsClapmiModalOpen(false);
      fetchUserData();
    } catch (err: any) {
      toast.error(err.message || "Failed to update link");
    } finally {
      setIsUpdatingClapmi(false);
    }
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-[16px] font-black uppercase tracking-[0.3em] text-orange-600">Syncing Profile</p>
        </div>
      </div>
    );
  }

  const profileImage = profileData?.photo_url || (id ? defaultAvatar : user.user_metadata?.avatar_url) || defaultAvatar;
  const isOwnProfile = !id || id === user.id;

  // Happiness score rounded to 2 decimals
  const formattedHappiness = profileData?.happiness_score 
    ? parseFloat(profileData.happiness_score).toFixed(2) 
    : "0.00";

  // Payment Request Validation
  const isPaymentClickable = 
    profileData?.display_name && 
    profileData?.linkedin_link && 
    profileData?.country && 
    profileData?.facebook && 
    profileData?.happiness_score;

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

  const calculateIOU = (dateString) => {
    if (!dateString) return 0;
    
    const joined = new Date(dateString);
    const now = new Date();
    
    // Calculate difference in months
    const months = (now.getFullYear() - joined.getFullYear()) * 12 + (now.getMonth() - joined.getMonth());
    
    // Return at least 1 if they just joined, or the actual count
    return months <= 0 ? 0 : months;
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-12 px-6 text-white font-sans">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-zinc-500 hover:text-orange-600 transition-all font-black uppercase text-[16px] tracking-widest"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Network
          </button>
          
          {isOwnProfile && (
            <button 
              onClick={() => setIsEditModalOpen(true)}
              className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-2 rounded-xl text-[14px] font-black uppercase tracking-widest hover:border-orange-600 transition-all"
            >
              <Edit3 size={18} className="text-orange-600" /> Edit Profile
            </button>
          )}
        </div>

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
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-2">
                    {profileData?.country && (
                      <p className="text-zinc-500 font-black uppercase tracking-widest text-[18px] flex items-center gap-2">
                        <Globe size={18} className="text-blue-500" /> {profileData.country}
                      </p>
                    )}
                    <p className="text-zinc-500 font-black uppercase tracking-widest text-[18px] flex items-center gap-2">
                      <Calendar size={18} className="text-orange-600" /> Rebirth: <span className="text-white">{profileData?.Rebirth || "Unknown"}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {/* TOP ROW (effectively 3 items) */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl w-full md:w-[calc(33.33%-1rem)] min-w-[200px]">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <DollarSign size={20} className="text-green-500" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Invested</span>
                </div>
                <p className="text-2xl font-black italic">${(Number(profileData?.paid || 0)).toLocaleString()}</p>
              </div>
            
              <button 
                onClick={() => setIsTeamModalOpen(true)}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-purple-500/50 transition-all group w-full md:w-[calc(33.33%-1rem)] min-w-[200px]"
              >
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Trophy size={20} className="text-purple-500" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Families</span>
                </div>
                <p className="text-2xl font-black italic group-hover:text-purple-400 transition-colors">
                  {profileData?.referral_count || 0}
                </p>
              </button>
            
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl w-full md:w-[calc(33.33%-1rem)] min-w-[200px]">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Users size={20} className="text-blue-500" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Followers</span>
                </div>
                <p className="text-2xl font-black italic">{profileData?.facebook || "0"}</p>
              </div>
            
              {/* BOTTOM ROW (centered 2 items) */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl w-full md:w-[calc(33.33%-1rem)] min-w-[200px]">
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Smile size={20} className="text-yellow-500" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Happiness</span>
                </div>
                <p className="text-2xl font-black italic">{formattedHappiness}%</p>
              </div>
            
              <a 
                href="https://crowd-funding-orpin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-orange-500/50 transition-all group w-full md:w-[calc(33.33%-1rem)] min-w-[200px]"
              >
                <div className="flex items-center gap-3 text-zinc-500 mb-2">
                  <Target size={20} className="text-orange-500" />
                  <span className="text-[12px] font-black uppercase tracking-widest">Projects</span>
                </div>
                <p className="text-xs font-black italic uppercase text-zinc-400 group-hover:text-white transition-colors">
                  Visit Crowdfund Site
                </p>
              </a>
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

            {/* Profile Action Links */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              <button 
                onClick={handleClapmiAction}
                className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-orange-500/50 transition-all group flex justify-between items-center"
              >
                <div>
                  <div className="flex items-center gap-3 text-zinc-500 mb-2">
                    <Zap size={20} className="text-orange-500" />
                    <span className="text-[14px] font-black uppercase tracking-widest">Clapmi Node</span>
                  </div>
                  <p className="text-xl font-black italic uppercase truncate">
                    {profileData?.clapmi ? "CONNECTED" : "LINK ACCOUNT"}
                  </p>
                </div>
                <ArrowLeft size={24} className="rotate-180 text-zinc-800 group-hover:text-orange-500" />
              </button>
            
              {profileData?.linkedin_link ? (
                <a 
                  href={profileData.linkedin_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left hover:border-blue-500/50 transition-all group flex justify-between items-center"
                >
                  <div>
                    <div className="flex items-center gap-3 text-zinc-500 mb-2">
                      <Linkedin size={20} className="text-blue-500" />
                      <span className="text-[14px] font-black uppercase tracking-widest">Professional Node</span>
                    </div>
                    <p className="text-xl font-black italic uppercase truncate text-blue-400">View LinkedIn</p>
                  </div>
                  <LinkIcon size={24} className="text-zinc-800 group-hover:text-blue-500" />
                </a>
              ) : (
                <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl opacity-50 flex items-center gap-4">
                  <Linkedin size={20} className="text-zinc-600" />
                  <p className="font-black uppercase tracking-widest text-zinc-600 text-sm">LinkedIn Unlinked</p>
                </div>
              )}
            
              {/* NEW IOU COLUMN */}
              <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-3xl text-left flex justify-between items-center">
                <div>
                  <div className="flex items-center gap-3 text-zinc-500 mb-2">
                    <DollarSign size={20} className="text-green-500" />
                    <span className="text-[14px] font-black uppercase tracking-widest">IOU</span>
                  </div>
                  <p className="text-xl font-black italic uppercase truncate text-white">
                    ${calculateIOU(profileData?.created_at)}
                  </p>
                </div>
              </div>
            </div>

            {/* Request Payment Button */}
            {isOwnProfile && (
              <div className="mb-10">
                 <button 
                  disabled={!isPaymentClickable}
                  className={`w-full py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xl transition-all shadow-xl ${
                    isPaymentClickable 
                    ? "bg-gradient-to-r from-green-600 to-green-400 text-black hover:scale-[1.02] active:scale-95" 
                    : "bg-zinc-900 text-zinc-600 border border-zinc-800 cursor-not-allowed"
                  }`}
                  onClick={() => toast.success("Payment request submitted to governance.")}
                >
                  {isPaymentClickable ? "Request Payment" : "Profile Incomplete - Payment Locked"}
                </button>
                {!isPaymentClickable && (
                  <p className="text-center text-zinc-500 text-xs font-bold uppercase mt-3 tracking-widest">
                    Fill all profile data to unlock rewards
                  </p>
                )}
              </div>
            )}

            {isOwnProfile && (
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
            )}

            {/* Team Locations Section */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-6 ml-2">
                <div className="flex items-center gap-3">
                  <Globe className="text-orange-600" size={24} />
                  <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500">Team Locations</h3>
                </div>
                {isOwnProfile && (
                  <button 
                    onClick={() => setIsLocationModalOpen(true)}
                    className="p-2 bg-zinc-900 border border-zinc-800 rounded-lg hover:border-orange-600 transition-all"
                  >
                    <Plus size={20} className="text-orange-600" />
                  </button>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3">
                {Array.isArray(profileData?.team_countries) && profileData.team_countries.length > 0 ? (
                  profileData.team_countries.map((country: string, idx: number) => (
                    <div key={idx} className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[14px] font-black uppercase tracking-widest text-white italic">
                      {country}
                    </div>
                  ))
                ) : (
                  <p className="text-zinc-600 uppercase font-black tracking-widest text-[14px] ml-2">No locations identified</p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[16px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6 ml-2">Verification Details</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center gap-4 p-5 rounded-2xl bg-zinc-900 border border-zinc-800 transition-colors">
                  <div className="p-3 bg-black rounded-xl">
                    <ShieldCheck className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-[16px] text-zinc-500 uppercase font-black tracking-wider">Status</p>
                    <p className="font-bold text-[18px]">Verified Network Node</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={() => setIsEditModalOpen(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-lg rounded-[3rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="p-8 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-orange-600">Integrate Identity</h2>
              <button onClick={() => setIsEditModalOpen(false)} className="text-zinc-500 hover:text-white"><X size={28} /></button>
            </div>
            
            <div className="p-8 overflow-y-auto space-y-6">
              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Display Name</label>
                <div className="relative">
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-600" />
                  <input 
                    type="text" 
                    value={editFormData.display_name}
                    onChange={(e) => setEditFormData({...editFormData, display_name: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="Justice1"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">LinkedIn Link</label>
                <div className="relative">
                  <Linkedin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500" />
                  <input 
                    type="url" 
                    value={editFormData.linkedin_link}
                    onChange={(e) => setEditFormData({...editFormData, linkedin_link: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Country</label>
                <div className="relative">
                  <Globe size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
                  <input 
                    type="text" 
                    value={editFormData.country}
                    onChange={(e) => setEditFormData({...editFormData, country: e.target.value.toUpperCase()})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none uppercase"
                    placeholder="UNITED KINGDOM"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Total Followers</label>
                <div className="relative">
                  <Facebook size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600" />
                  <input 
                    type="number" 
                    value={editFormData.facebook}
                    onChange={(e) => setEditFormData({...editFormData, facebook: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Invested Amount ($)</label>
                <div className="relative">
                  <DollarSign size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500" />
                  <input 
                    type="number" 
                    value={editFormData.paid}
                    onChange={(e) => setEditFormData({...editFormData, paid: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Happiness Score (1-100)</label>
                <div className="relative">
                  <Smile size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-yellow-500" />
                  <input 
                    type="number" 
                    step="0.01"
                    value={editFormData.happiness_score}
                    onChange={(e) => setEditFormData({...editFormData, happiness_score: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="95.00"
                  />
                </div>
              </div>

              <div>
                <label className="text-[12px] font-black uppercase tracking-widest text-zinc-500 block mb-2">Profile Image URL</label>
                <div className="relative">
                  <LinkIcon size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-500" />
                  <input 
                    type="text" 
                    value={editFormData.photo_url}
                    onChange={(e) => setEditFormData({...editFormData, photo_url: e.target.value})}
                    className="w-full bg-black border border-zinc-800 rounded-xl py-3 pl-12 pr-4 font-bold focus:border-orange-600 outline-none"
                    placeholder="https://image-link.com/photo.jpg"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 border-t border-zinc-800 bg-zinc-900/50">
              <button 
                onClick={handleUpdateProfile}
                disabled={isSavingProfile}
                className="w-full bg-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSavingProfile ? "INTEGRATING..." : "SAVE IDENTITY"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Team Locations Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsLocationModalOpen(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-orange-600">Add Location</h2>
              <button onClick={() => setIsLocationModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[14px] text-zinc-500 font-black uppercase tracking-widest mb-2">Country Name</p>
                <input 
                  type="text"
                  placeholder="E.G. UNITED KINGDOM"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value.toUpperCase())}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[16px] font-bold focus:border-orange-600 outline-none transition-all uppercase tracking-widest"
                />
              </div>

              <button 
                onClick={handleAddLocation}
                disabled={isUpdatingLocation || !newLocation}
                className="w-full bg-orange-600 text-white hover:bg-orange-500 disabled:opacity-50 py-4 rounded-xl font-black uppercase tracking-widest transition-all active:scale-95"
              >
                {isUpdatingLocation ? "SYNCING..." : "ADD TO NETWORK"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clapmi Modal */}
      {isClapmiModalOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsClapmiModalOpen(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black uppercase italic tracking-tighter">Link Clapmi</h2>
              <button onClick={() => setIsClapmiModalOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <p className="text-[14px] text-zinc-500 font-black uppercase tracking-widest mb-2">Paste Your Link</p>
                <input 
                  type="url"
                  placeholder="https://app.clapmi.com/yourname"
                  value={clapmiLinkInput}
                  onChange={(e) => setClapmiLinkInput(e.target.value)}
                  className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-[16px] font-bold focus:border-orange-600 outline-none transition-all"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button 
                  onClick={updateClapmiLink}
                  disabled={isUpdatingClapmi || !clapmiLinkInput}
                  className="w-full bg-white text-black hover:bg-zinc-200 disabled:opacity-50 py-4 rounded-xl font-black uppercase tracking-widest transition-all"
                >
                  {isUpdatingClapmi ? "UPDATING..." : "SAVE LINK"}
                </button>
                
                <div className="relative py-2">
                   <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
                   <div className="relative flex justify-center text-xs uppercase"><span className="bg-zinc-950 px-2 text-zinc-500 font-black">OR</span></div>
                </div>

                <a 
                  href="https://app.clapmi.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full bg-orange-600/10 border border-orange-600/50 text-orange-500 hover:bg-orange-600/20 py-4 rounded-xl font-black uppercase tracking-widest text-center transition-all"
                >
                  Create a Clapmi Account
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Families Modal */}
      {isTeamModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsTeamModalOpen(false)} />
          <div className="relative bg-zinc-950 border border-zinc-800 w-7xl max-lg rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col max-h-[80vh]">
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
