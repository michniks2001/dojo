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
    { value: "events", label: "Events" },
    { value: "gyms", label: "Gym Finder" },
    { value: "forum", label: "Community Forum" },
    { value: "news", label: "Share News" },
    { value: "sparring", label: "Find Sparring Partners" },
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
          referred_by: referralCode || null,
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
    <div className='w-full max-w-md mx-auto bg-[var(--background)] rounded-lg shadow-lg border border-[var(--border)] p-6'>
      <h3 className='text-2xl font-bold mb-4 text-[var(--primary)]'>
        Join Our Community
      </h3>
      {showSuccess ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className='space-y-4'
        >
          <div className='bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--text-primary)] p-4 rounded-md'>
            <p className='mb-2'>
              Thanks for signing up! We&apos;ll be in touch soon.
            </p>
            <p className='text-sm mb-4'>
              Share your referral code with friends:
            </p>
            <div className='flex items-center space-x-2'>
              <Input
                readOnly
                value={generatedReferralCode}
                className='bg-[var(--background)] border-[var(--border)] text-[var(--text-primary)] font-mono'
              />
              <Button
                onClick={copyReferralCode}
                variant='outline'
                size='icon'
                className='hover:bg-[var(--background-secondary)] hover:text-[var(--primary)]'
              >
                <Copy className='h-4 w-4' />
              </Button>
            </div>
          </div>
          <Button
            onClick={() => setShowSuccess(false)}
            className='w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-colors duration-200 font-bold cursor-pointer'
          >
            Add Another
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-[var(--text-primary)]'>
              Name
            </label>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder='Enter your name'
              required
              className='bg-[var(--background-secondary)] border-[var(--border)] text-[var(--text-primary)] w-full focus:border-[var(--border)] focus:ring-[var(--accent-secondary)]'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-[var(--text-primary)]'>
              Email
            </label>
            <Input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Enter your email'
              required
              className='bg-[var(--background-secondary)] border-[var(--border)] text-[var(--text-primary)] w-full focus:border-[var(--border)] focus:ring-[var(--accent-secondary)]'
            />
          </div>

          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-[var(--text-primary)]'>
              What interests you most?
            </label>
            <Select
              onValueChange={(value) => {
                if (!interests.includes(value)) {
                  setInterests([...interests, value]);
                }
              }}
            >
              <SelectTrigger className='bg-[var(--background-secondary)] border-[var(--border)] text-[var(--text-primary)] w-full focus:border-[var(--border)] focus:ring-[var(--accent-secondary)]'>
                <SelectValue placeholder='Select your interests' />
              </SelectTrigger>
              <SelectContent className='bg-[var(--background)] border-[var(--border)]'>
                {interestOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className='text-[var(--text-primary)] hover:bg-[var(--background-secondary)] cursor-pointer'
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {interests.length > 0 && (
              <div className='flex flex-wrap gap-2 mt-2'>
                {interests.map((interest) => (
                  <div
                    key={interest}
                    className='bg-[var(--background-secondary)] text-[var(--text-primary)] px-2 py-1 rounded-md flex items-center gap-2 border border-[var(--border)]'
                  >
                    {
                      interestOptions.find((opt) => opt.value === interest)
                        ?.label
                    }
                    <button
                      type='button'
                      onClick={() =>
                        setInterests(interests.filter((i) => i !== interest))
                      }
                      className='text-[var(--text-primary)]/60 hover:text-[var(--primary)]'
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className='space-y-1.5'>
            <label className='block text-sm font-medium text-[var(--text-primary)]'>
              Referral Code (Optional)
            </label>
            <Input
              type='text'
              value={referralCode}
              onChange={(e) => setReferralCode(e.target.value)}
              placeholder='Enter referral code if you have one'
              className='bg-[var(--background-secondary)] border-[var(--border)] text-[var(--text-primary)] w-full focus:border-[var(--border)] focus:ring-[var(--accent-secondary)]'
            />
          </div>

          <Button
            type='submit'
            className='w-full bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 transition-colors duration-200 font-bold cursor-pointer'
          >
            Join the Community
          </Button>
        </form>
      )}
    </div>
  );
}
