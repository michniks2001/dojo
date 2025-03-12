"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import CTA from "@/components/CTA";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CardContainer, CardBody, CardItem } from "@/components/AnimatedCard";

export default function Home() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [referralCode, setReferralCode] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/waiting-list/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, interests }),
      });
      const data = await response.json();
      setReferralCode(data.referralCode);
      setShowModal(false);
      setShowSuccessModal(true);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className='min-h-screen flex flex-col lg:flex-row bg-white'>
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className='w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex items-center justify-center lg:sticky lg:top-0 px-4 py-12 lg:py-0'
      >
        <div className='absolute inset-0 opacity-20 bg-gradient-to-b from-[#C1272D]/10 via-transparent to-transparent' />
        <div className='relative z-10 text-center'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='text-5xl lg:text-6xl font-bold mb-6 text-[#C1272D] drop-shadow-lg'
          >
            Welcome to Dojo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className='text-lg lg:text-xl mb-8 text-[#333333]'
          >
            The Ultimate Platform for Martial Artists
          </motion.p>
          <CTA />
        </div>
      </motion.section>

      {/* Features Section */}
      <section className='w-full lg:w-1/2 bg-[#F5F5F5] py-12 px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className='max-w-2xl mx-auto'
        >
          <h2 className='text-4xl font-bold text-center mb-12 text-[#C1272D] drop-shadow-lg'>
            Connect. Train. Grow.
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8 px-4'>
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className='bg-[#1a0808]/95 border border-[#C1272D]/30'>
          <DialogHeader>
            <DialogTitle className='text-white'>
              You&apos;re on the list!
            </DialogTitle>
          </DialogHeader>
          <p className='text-white'>
            Thanks for signing up! Your referral code is: {referralCode}
          </p>
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
      transition={{
        delay: 0.2 * (index + 1),
        duration: 0.3,
        ease: [0.17, 0.55, 0.55, 1],
      }}
      whileHover={{ scale: 1.02 }}
    >
      <CardContainer>
        <CardBody className='bg-white relative group/card hover:shadow-2xl hover:shadow-[#C1272D]/[0.1] border-[#DDDDDD] hover:border-[#D4AF37] rounded-xl p-6 border transition-all duration-300 ease-out'>
          <CardItem
            translateZ='20'
            className='text-3xl mb-2 transform transition-transform scale-100'
          >
            {icon}
          </CardItem>
          <CardItem
            translateZ='30'
            className='text-lg font-bold text-[#C1272D] transform transition-transform scale-100'
          >
            {title}
          </CardItem>
          <CardItem
            as='p'
            translateZ='40'
            className='text-sm text-[#333333] mt-2 transform transition-transform scale-100'
          >
            {description}
          </CardItem>
        </CardBody>
      </CardContainer>
    </motion.div>
  );
}
