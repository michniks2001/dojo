"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/waiting-list/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name }),
      });
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className='min-h-screen flex'>
      {/* Left Section - Hero */}
      <motion.section
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className='w-1/2 h-screen flex items-center justify-center fixed left-0'
      >
        <div className='absolute inset-0 opacity-20 bg-gradient-to-b from-[#ff3333]/10 via-transparent to-transparent' />
        <div className='relative z-10 text-center px-4'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='text-6xl font-bold mb-6 text-[#ff3333] drop-shadow-lg'
          >
            Welcome to Dojo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-xl mb-8 text-white/90'
          >
            The Ultimate Platform for Martial Artists
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Button
              variant='destructive'
              size='lg'
              onClick={() => setShowModal(true)}
              className='font-bold hover:cursor-pointer hover:bg-[#cc0000] transition-colors duration-200'
            >
              Join the Community
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Right Section - Features & CTA */}
      <section className='w-1/2 min-h-screen ml-[50%] py-12 px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='mb-16'
        >
          <h2 className='text-4xl font-bold text-center mb-12 text-[#ff3333] drop-shadow-lg'>
            Connect. Train. Grow.
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className='bg-[#1a0808]/95 border border-[#ff3333]/30'>
          <DialogHeader>
            <DialogTitle className='text-white'>Enter Your Details</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <Input
              type='text'
              placeholder='Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='bg-[#1a0808] border-[#ff3333]/30 text-white'
            />
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='bg-[#1a0808] border-[#ff3333]/30 text-white'
            />
            <div className='flex justify-end space-x-2'>
              <Button
                type='button'
                variant='outline'
                onClick={() => setShowModal(false)}
                className='border-[#ff3333] text-white bg-[#1a0808] hover:bg-[#2a1515] hover:text-white transition-colors duration-200 cursor-pointer'
              >
                Cancel
              </Button>
              <Button
                variant='destructive'
                type='submit'
                className='hover:bg-[#cc0000] transition-colors duration-200 cursor-pointer'
              >
                Submit
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className='bg-[#1a0808]/95 border border-[#ff3333]/30'>
          <DialogHeader>
            <DialogTitle className='text-white'>
              You're on the list!
            </DialogTitle>
          </DialogHeader>
          <p className='text-white'>Thanks for signing up!</p>
          <Button
            variant='destructive'
            onClick={() => setShowSuccessModal(false)}
            className='w-full'
          >
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </main>
  );
}

const features = [
  {
    title: "Share Your Journey",
    description:
      "Post updates, tips, and techniques. Share photos and videos of your training.",
    icon: "📱",
  },
  {
    title: "Live Streaming",
    description: "Stream your matches and tournaments live to the community!",
    icon: "🎥",
  },
  {
    title: "Find Events",
    description:
      "Discover nearby open mats, tournaments, and training sessions",
    icon: "📍",
  },
  {
    title: "Connect with Others",
    description:
      "Follow your friends and favorite athletes. Chat, share tips, spar, and grow together.",
    icon: "🤝",
  },
];

function FeatureCard({ title, description, icon, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 * (index + 1) }}
    >
      <Card className='p-6 bg-[#1a0808]/50 backdrop-blur-sm border-[#ff3333]/10 hover:border-[#ff3333]/20'>
        <div className='text-4xl mb-4'>{icon}</div>
        <h3 className='text-xl font-bold mb-2 text-[#ff3333] drop-shadow-sm'>
          {title}
        </h3>
        <p className='text-gray-400'>{description}</p>
      </Card>
    </motion.div>
  );
}
