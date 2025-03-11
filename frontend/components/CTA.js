"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState([]);
  const [referralCode, setReferralCode] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [generatedReferralCode, setGeneratedReferralCode] = useState("");

  const interestOptions = [
    { value: 'events', label: 'Events' },
    { value: 'gyms', label: 'Gym Finder' },
    { value: 'forum', label: 'Community Forum' },
    { value: 'news', label: 'Share News' },
    { value: 'sparring', label: 'Find Sparring Partners' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/waiting-list/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          interests,
          referred_by: referralCode || null
        }),
      });
      if (response.ok) {
        const data = await response.json();
        setGeneratedReferralCode(data.referral_code);
        setShowSuccess(true);
        setEmail("");
        setName("");
        setInterests([]);
        setReferralCode("");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const copyReferralCode = async () => {
    try {
      await navigator.clipboard.writeText(generatedReferralCode);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-lg border border-[#DDDDDD] p-6">
      <h3 className="text-2xl font-bold mb-4 text-[#C1272D]">Join Our Community</h3>
      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="bg-[#F5F5F5] border border-[#D4AF37] text-[#333333] p-4 rounded-md">
            <p className="mb-2">Thanks for signing up! We'll be in touch soon.</p>
            <p className="text-sm mb-4">Share your referral code with friends:</p>
            <div className="flex items-center space-x-2">
              <Input
                readOnly
                value={generatedReferralCode}
                className="bg-white border-[#DDDDDD] text-[#333333] font-mono"
              />
              <Button
                onClick={copyReferralCode}
                variant="outline"
                size="icon"
                className="hover:bg-[#F5F5F5] hover:text-[#C1272D]"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Button
            onClick={() => setShowSuccess(false)}
            className="w-full bg-[#C1272D] text-white hover:bg-[#C1272D]/90 transition-colors duration-200 font-bold cursor-pointer"
          >
            Add Another
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#333333]">Name</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="bg-[#F5F5F5] border-[#DDDDDD] text-[#333333] w-full focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#333333]">Email</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-[#F5F5F5] border-[#DDDDDD] text-[#333333] w-full focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#333333]">What interests you most?</label>
            <Select
              onValueChange={(value) => {
                if (!interests.includes(value)) {
                  setInterests([...interests, value]);
                }
              }}
            >
              <SelectTrigger className="bg-[#F5F5F5] border-[#DDDDDD] text-[#333333] w-full focus:border-[#D4AF37] focus:ring-[#D4AF37]">
                <SelectValue placeholder="Select your interests" />
              </SelectTrigger>
              <SelectContent className="bg-white border-[#DDDDDD]">
                {interestOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="text-[#333333] hover:bg-[#F5F5F5] cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className="bg-[#F5F5F5] text-[#333333] px-2 py-1 rounded-md flex items-center gap-2 border border-[#DDDDDD]"
                  >
                    {interestOptions.find(opt => opt.value === interest)?.label}
                    <button
                      type="button"
                      onClick={() => setInterests(interests.filter(i => i !== interest))}
                      className="text-[#333333]/60 hover:text-[#C1272D]"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-[#333333]">
              Referral Code (Optional)
            </label>
            <Input
              type="text"
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder="Enter referral code if you have one"
              className="bg-[#F5F5F5] border-[#DDDDDD] text-[#333333] w-full focus:border-[#D4AF37] focus:ring-[#D4AF37]"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#C1272D] text-white hover:bg-[#C1272D]/90 transition-colors duration-200 font-bold cursor-pointer"
          >
            Join the Community
          </Button>
        </form>
      )}
    </div>
  );
}