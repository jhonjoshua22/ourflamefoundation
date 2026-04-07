import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";
import g3 from "../assets/g3.png";
import g4 from "../assets/g4.png";
import g5 from "../assets/g5.mp4";
import gameCollage from "../assets/popup.jpg"; 

const GameGallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const images = [g1, g2, g3, g4];

  return (
    <section id="gallery" className="bg-white dark:bg-black py-16 px-6 border-t border-black dark:border-white transition-colors duration-500">
      <div className="container mx-auto max-w-7xl">
        
        {/* Header Title forced to Black/White */}
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-black dark:text-white mb-10 text-center">
          YOUR <span className="text-orange-600">REWARDS</span>
        </h2>

        {/* Layout: Magic Worlds Section on Top */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <a 
              href="https://magicworlds.itch.io/magic-world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl font-black uppercase tracking-tight text-black dark:text-white hover:text-orange-600 transition-colors"
            >
              Magic Worlds
            </a>
            
            {/* Description forced to Black/White - No Gray */}
            <p className="text-black dark:text-white text-sm leading-relaxed mt-4 mb-6 font-medium">
              Track your progress and convert your in-game milestones into real ecosystem standing! Visit your scoretable to log your achievements or log in to pull your data directly from your persistent profile.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/scoretable" 
                className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-8 py-4 hover:bg-orange-700 transition-all rounded shadow-lg"
              >
                Reward Me
              </Link>
              <Link 
                to="/login" 
                className="inline-block bg-black dark:bg-white text-white dark:text-black text-[10px] font-black uppercase tracking-widest px-8 py-4 hover:opacity-80 transition-all rounded shadow-lg"
              >
                Log In
              </Link>
            </div>
          </div>

          <a 
            href="https://magicworlds.itch.io/magic-world" 
            target="_blank" 
            rel="noopener noreferrer"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg border-2 border-black dark:border-white aspect-video bg-black">
                <img 
                  src={img} 
                  alt={`Magic Worlds Scene ${i + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </a>
        </div>

        {/* Media Grid: Left Video, Right Playlist Picture */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Video forced to high contrast border */}
          <video controls className="w-full aspect-video rounded-xl shadow-2xl border-2 border-black dark:border-white bg-black">
            <source src={g5} type="video/mp4" />
          </video>
          
          <a 
            href="https://www.youtube.com/@FlameFoundationTV/playlists" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block group relative overflow-hidden rounded-xl border-2 border-black dark:border-white shadow-2xl aspect-video bg-black"
          >
            <img 
              src={gameCollage} 
              alt="Playlist Collage" 
              className="w-full h-full object-cover transform group-hover:scale-[1.03] transition-transform duration-700 opacity-90 group-hover:opacity-100" 
            />
            <div className="absolute bottom-4 right-4 z-20 bg-black dark:bg-white px-6 py-3 border-2 border-orange-600 rounded-full shadow-xl">
              <span className="text-white dark:text-black text-[10px] font-black uppercase tracking-widest">
                Watch All Playlists on <span className="text-orange-600">YouTube</span>
              </span>
            </div>
          </a>
        </div>        
      </div>
    </section>
  );
};

export default GameGallery;
