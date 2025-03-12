"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Image, Video } from "lucide-react";
import Navbar from "@/components/Navbar";

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(samplePosts);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState({});

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: "John Doe",
      timestamp: "Just now",
      content: newPost,
      likes: 0,
      comments: 0,
      commentsList: [],
      isLiked: false,
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked,
          };
        }
        return post;
      })
    );
  };

  const handleAddComment = (postId, comment) => {
    if (!comment.trim()) return;

    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newComment = {
            id: Date.now(),
            author: "John Doe",
            content: comment,
            timestamp: "Just now",
          };
          return {
            ...post,
            comments: post.comments + 1,
            commentsList: [...(post.commentsList || []), newComment],
          };
        }
        return post;
      })
    );
  };

  return (
    <div className='min-h-screen bg-[#F5F5F5]'>
      <Navbar />

      <main className='max-w-2xl mx-auto px-4 py-6'>
        {/* Create Post Card */}
        <Card className='bg-white p-4 mb-6'>
          <form onSubmit={handleCreatePost}>
            <div className='flex items-start space-x-4'>
              <Avatar className='w-10 h-10 bg-[#C1272D]'>
                <span className='font-semibold text-sm'>JD</span>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder='Share your martial arts journey...'
                  className='min-h-[100px] bg-[#F5F5F5] border-[#DDDDDD] focus:border-[#D4AF37] focus:ring-[#D4AF37] mb-3'
                />
                <div className='flex items-center justify-between'>
                  <div className='flex space-x-2'>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]'
                    >
                      <Image className='h-5 w-5 mr-1' alt='' />
                      Photo
                    </Button>
                    <Button
                      type='button'
                      variant='ghost'
                      size='sm'
                      className='text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5]'
                    >
                      <Video className='h-5 w-5 mr-1' />
                      Video
                    </Button>
                  </div>
                  <Button
                    type='submit'
                    className='bg-[#C1272D] text-white hover:bg-[#C1272D]/90'
                  >
                    Post
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Card>

        {/* Posts Feed */}
        <div className='space-y-4'>
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className='bg-white p-4'>
        {/* Post Header */}
        <div className='flex items-center space-x-3 mb-4'>
          <Avatar className='w-10 h-10 bg-[#C1272D] hover:bg-[#C1272D]/90 cursor-pointer'>
            <AvatarImage src={post.avatarUrl} alt={post.author} />
            <AvatarFallback className='font-semibold text-sm'>
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className='font-medium text-[#333333] hover:text-[#C1272D] cursor-pointer'>
              {post.author}
            </h3>
            <p className='text-sm text-[#333333]/60'>{post.timestamp}</p>
          </div>
        </div>

        {/* Post Content */}
        <p className='text-[#333333] mb-4'>{post.content}</p>
        {post.image && (
          <div className='mb-4 rounded-lg overflow-hidden'>
            <Image src={post.image} alt='' className='w-full h-auto' />
          </div>
        )}

        {/* Post Actions */}
        <div className='flex items-center space-x-4 pt-2 border-t border-[#DDDDDD]'>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => handleLike(post.id)}
            className={`text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5] cursor-pointer ${
              post.isLiked ? "text-[#C1272D]" : ""
            }`}
          >
            <Heart
              className={`h-5 w-5 mr-1 ${post.isLiked ? "fill-current" : ""}`}
            />
            {post.likes}
          </Button>
          <Button
            variant='ghost'
            size='sm'
            onClick={() => setShowComments(!showComments)}
            className='text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5] cursor-pointer'
          >
            <MessageCircle className='h-5 w-5 mr-1' />
            {post.comments}
          </Button>
          <Button
            variant='ghost'
            size='sm'
            className='text-[#333333] hover:text-[#C1272D] hover:bg-[#F5F5F5] cursor-pointer'
          >
            <Share className='h-5 w-5 mr-1' />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className='mt-4 space-y-4'>
            <div className='flex items-start space-x-2'>
              <Avatar className='w-8 h-8 bg-[#C1272D]'>
                <span className='font-semibold text-xs'>JD</span>
              </Avatar>
              <div className='flex-1'>
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Write a comment...'
                  className='min-h-[60px] bg-[#F5F5F5] border-[#DDDDDD] focus:border-[#D4AF37] focus:ring-[#D4AF37] text-sm'
                />
                <Button
                  onClick={() => {
                    handleAddComment(post.id, newComment);
                    setNewComment("");
                  }}
                  className='mt-2 bg-[#C1272D] text-white hover:bg-[#C1272D]/90 cursor-pointer'
                  size='sm'
                >
                  Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className='space-y-3'>
              {post.commentsList?.map((comment) => (
                <div key={comment.id} className='flex items-start space-x-2'>
                  <Avatar className='w-8 h-8 bg-[#C1272D]'>
                    <span className='font-semibold text-xs'>
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </Avatar>
                  <div className='flex-1 bg-[#F5F5F5] rounded-lg p-2'>
                    <div className='flex items-center justify-between'>
                      <h4 className='text-sm font-medium text-[#333333]'>
                        {comment.author}
                      </h4>
                      <span className='text-xs text-[#333333]/60'>
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className='text-sm text-[#333333] mt-1'>
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>
    </motion.div>
  );
}

const samplePosts = [
  {
    id: 1,
    author: "John Danaher",
    timestamp: "2h ago",
    content:
      "Just finished another great leg lock seminar. Remember: The legs are the arms of the legs.",
    likes: 1240,
    comments: 2,
    isLiked: false,
    commentsList: [
      {
        id: 1,
        author: "Gordon Ryan",
        content: "Great seminar as always, Professor!",
        timestamp: "1h ago",
      },
      {
        id: 2,
        author: "Craig Jones",
        content: "The heel hook details were mind-blowing 🔥",
        timestamp: "30m ago",
      },
    ],
  },
  {
    id: 2,
    author: "Michelle Nicolini",
    timestamp: "4h ago",
    content:
      "Great training session today! Preparing for the next competition. Always stay hungry, always keep learning. 🥋",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    likes: 958,
    comments: 45,
  },
  {
    id: 3,
    author: "Gordon Ryan",
    timestamp: "6h ago",
    content:
      "Another day, another training session. Remember: hard work beats talent when talent doesn't work hard.",
    likes: 2451,
    comments: 156,
  },
];
