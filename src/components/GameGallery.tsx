import React, { useState } from "react";
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";
import g3 from "../assets/g3.png";
import g4 from "../assets/g4.png";
import g5 from "../assets/g5.mp4";
import magicWorlds from "../assets/magicworlds.mp4";
import gameCollage from "../assets/gamecollage.png"; 

const GameGallery = () => {
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const images = [g1, g2, g3, g4];

  return (
    <section id="gallery" className="bg-white dark:bg-black py-16 px-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white mb-10 text-center">
          PLAY & <span className="text-orange-600">EDUCATE</span>
        </h2>

        {/* Layout: Magic Worlds Section on Top */}
        <div className="mb-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <a 
              href="https://magicworlds.itch.io/magic-world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-3xl font-black uppercase tracking-tight text-black transition-colors"
            >
              Magic Worlds
            </a>
            <p className="text-zinc-500 text-sm leading-relaxed mt-4 mb-6">
              Magic Worlds is an interactive universe of themed worlds where players explore, learn, and grow through conversation and experience. Each world features AI characters, activities, and challenges designed to inspire curiosity, creativity, and real-world knowledge in a fun, game-driven way.
            </p>
            <a 
              href="https://magicworlds.itch.io/magic-world" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 hover:bg-orange-700 transition-colors"
            >
              Click to download
            </a>
          </div>

          <a 
            href="https://magicworlds.itch.io/magic-world" 
            target="_blank" 
            rel="noopener noreferrer"
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg border border-zinc-800 aspect-video">
                <img src={img} alt={`Magic Worlds Scene ${i + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </a>
        </div>

        {/* Videos below the Magic Worlds section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <video controls className="w-full aspect-video rounded-xl shadow-2xl border-2 border-zinc-800 bg-zinc-900">
            <source src={g5} type="video/mp4" />
          </video>
          <video controls className="w-full aspect-video rounded-xl shadow-2xl border-2 border-zinc-800 bg-zinc-900">
            <source src={magicWorlds} type="video/mp4" />
          </video>
        </div>

        {/* Bottom Section */}
        <div className="w-full">
          <a href="https://www.youtube.com/@FlameFoundationTV/playlists" target="_blank" rel="noopener noreferrer" className="block group relative overflow-hidden rounded-xl border-2 border-zinc-800 shadow-2xl">
            <img src={gameCollage} alt="Game Snippets Collage" className="w-full h-auto max-h-[400px] object-cover transform group-hover:scale-[1.01] transition-transform duration-700" />
            <div className="absolute bottom-4 right-4 z-20 bg-black/80 backdrop-blur-md px-4 py-2 border border-orange-600 rounded-full">
              <span className="text-white text-[10px] font-black uppercase tracking-widest">
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
