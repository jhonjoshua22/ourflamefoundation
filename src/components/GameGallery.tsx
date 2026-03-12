import React from "react";
// 1. Import them at the top
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";
import g3 from "../assets/g3.png";
import g4 from "../assets/g4.png";
import g5 from "../assets/g5.mp4";
import gameCollage from "../assets/gamecollage.png"; // New Import

const GameGallery = () => {
  // 2. Array for the small grid images
  const images = [g1, g2, g3, g4];

  return (
    <section id="gallery" className="bg-white dark:bg-black py-24 px-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white mb-16 text-center">
          PLAY & <span className="text-orange-600">EDUCATE</span>
        </h2>

        {/* Top Section: Video and 4-Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          <div className="w-full">
            <video controls className="w-full aspect-video rounded-xl shadow-2xl border-4 border-zinc-800 bg-zinc-900">
              <source src={g5} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg border border-zinc-800">
                <img 
                  src={img} 
                  alt={`Game Scene ${i + 1}`} 
                  className="w-full h-40 object-cover hover:scale-110 transition-transform duration-500" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section: Big Collage Photo Link */}
        <div className="w-full">
          <a 
            href="https://www.youtube.com/@FlameFoundationTV/playlists" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block group relative overflow-hidden rounded-xl border-4 border-zinc-800 shadow-2xl"
          >
            <img 
              src={gameCollage} 
              alt="Game Snippets Collage" 
              className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
            />
            {/* Overlay Text */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/80 backdrop-blur-md px-6 py-3 border border-orange-600 rounded-full">
              <span className="text-white text-xs font-black uppercase tracking-widest">
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
