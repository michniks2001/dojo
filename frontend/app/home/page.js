"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Image, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [newPost, setNewPost] = useState("");

  const handleCreatePost = (e) => {
    e.preventDefault();
    // TODO: Implement post creation
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <Navbar />
      
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Create Post Card */}
        <Card className="bg-white p-4 mb-6">
          <form onSubmit={handleCreatePost}>
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 bg-[#C1272D]">
                <span className="font-semibold text-sm">JD</span>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share your martial arts journey..."
                  className="min-h-[100px] bg-[#F5F5F5] border-[#DDDDDD] focus:border-[#D4AF37] focus:ring-[#D4AF37] mb-3"
                />
                <div className="flex items-center justify-between">
                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
                    >
                      <Image className="h-5 w-5 mr-1" />
                      Photo
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
                    >
                      <Video className="h-5 w-5 mr-1" />
                      Video
                    </Button>
                  </div>
                  <Button
                    type="submit"
                    className="bg-[#C1272D] text-white hover:bg-[#C1272D]/90"
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Card>

        {/* Posts Feed */}
        <div className="space-y-4">
          {samplePosts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-white p-4">
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10 bg-[#C1272D]">
            <span className="font-semibold text-sm">
              {post.author.split(" ").map(n => n[0]).join("")}
            </span>
          </Avatar>
          <div>
            <h3 className="font-medium text-[#333333]">{post.author}</h3>
            <p className="text-sm text-[#333333]/60">{post.timestamp}</p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-[#333333] mb-4">{post.content}</p>
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img src={post.image} alt="" className="w-full h-auto" />
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center space-x-4 pt-2 border-t border-[#DDDDDD]">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
          >
            <Heart className="h-5 w-5 mr-1" />
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            {post.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]"
          >
            <Share className="h-5 w-5 mr-1" />
            Share
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}

const samplePosts = [
  {
    author: "John Danaher",
    timestamp: "2h ago",
    content: "Just finished another great leg lock seminar. Remember: The legs are the arms of the legs.",
    likes: 1240,
    comments: 89,
  },
  {
    author: "Michelle Nicolini",
    timestamp: "4h ago",
    content: "Great training session today! Preparing for the next competition. Always stay hungry, always keep learning. 🥋",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    likes: 958,
    comments: 45,
  },
  {
    author: "Gordon Ryan",
    timestamp: "6h ago",
    content: "Another day, another training session. Remember: hard work beats talent when talent doesn't work hard.",
    likes: 2451,
    comments: 156,
  }
];