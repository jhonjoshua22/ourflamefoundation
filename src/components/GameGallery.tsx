import React from "react";
// 1. Import them at the top just like your existing code
import g1 from "../assets/g1.png";
import g2 from "../assets/g2.png";
import g3 from "../assets/g3.png";
import g4 from "../assets/g4.png";
import g5 from "../assets/g5.mp4"; // This usually works as a string path

const GameGallery = () => {
  // 2. Put the imported images into an array for the map loop
  const images = [g1, g2, g3, g4];

  return (
    <section id="gallery" className="bg-white dark:bg-black py-24 px-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="container mx-auto max-w-7xl">
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter italic uppercase text-zinc-900 dark:text-white mb-16 text-center">
          Game <span className="text-orange-600">Gallery</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="w-full">
            <video controls className="w-full aspect-video rounded-xl shadow-2xl border-4 border-zinc-800 bg-zinc-900">
              <source src={g5} type="video/mp4" />
            </video>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {images.map((img, i) => (
              <div key={i} className="overflow-hidden rounded-lg shadow-lg border border-zinc-800">
                <img src={img} alt={`Game Scene ${i + 1}`} className="w-full h-40 object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameGallery;
