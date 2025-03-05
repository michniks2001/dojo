"use client"

import Image from 'next/image';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div className="absolute inset-0 opacity-20 bg-gradient-to-b from-[#ff3333]/10 via-transparent to-transparent" />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl font-bold mb-6 text-[#ff3333] drop-shadow-lg">Welcome to Dojo</h1>
          <p className="text-xl mb-8 text-white/90">The Ultimate Platform for Martial Artists</p>
          <button className="bg-[#ff3333] hover:bg-[#cc0000] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:cursor-pointer">
            Join the Community
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <h2 className="text-4xl font-bold text-center mb-16 text-[#ff3333] drop-shadow-lg">Connect. Train. Grow.</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            title="Share Your Journey"
            description="Post updates, tips, and techniques. Share photos and videos of your training."
            icon="📱"
          />
          <FeatureCard 
            title="Live Streaming"
            description="Stream your matches and tournaments live to the community."
            icon="🎥"
          />
          <FeatureCard 
            title="Find Events"
            description="Discover nearby open mats, tournaments, and training sessions."
            icon="🗺️"
          />
          <FeatureCard 
            title="Challenge Others"
            description="Connect with fellow martial artists and arrange sparring sessions."
            icon="🥋"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 text-[#ff3333] drop-shadow-lg">Ready to Join the Community?</h2>
          <p className="text-xl mb-8 text-white/90">Connect with martial artists from around the world.</p>
          <button className="bg-[#ff3333] hover:bg-[#cc0000] text-white font-bold py-3 px-8 rounded-full transition-all shadow-lg hover:shadow-xl hover:cursor-pointer">
            Get Started Now
          </button>
        </div>
      </section>
    </main>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div className="p-6 bg-[#1a0808]/50 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl transition-all border border-[#ff3333]/10 hover:border-[#ff3333]/20">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-[#ff3333] drop-shadow-sm">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
