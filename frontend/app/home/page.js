"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Image, Video } from "lucide-react";
import Navbar from "@/components/Navbar";
import MiniCalendar from "../components/MiniCalendar";
import RegularPost from "../components/posts/RegularPost";
import EventPost from "../components/posts/EventPost";
import SparringRequestPost from "../components/posts/SparringRequestPost";

export default function Home() {
  const [newPost, setNewPost] = useState("");
  const [posts, setPosts] = useState(samplePosts);
  const [newComment, setNewComment] = useState("");
  const [showComments, setShowComments] = useState({});

  // Calendar state
  const [selectedDay, setSelectedDay] = useState(null);
  // Example events (use YYYY-MM-DD format as keys)
  const eventsByDate = {
    "2025-04-19": [
      { title: "Boxing Sparring", time: "5:00 PM", icon: "🥊" },
    ],
    "2025-04-21": [
      { title: "Judo Sparring", time: "6:30 PM", icon: "🥋" },
      { title: "Yoga Recovery", time: "8:00 PM", icon: "🧘" },
    ],
    "2025-04-24": [
      { title: "Wrestling Sparring", time: "7:00 PM", icon: "🤼‍♂️" },
    ],
  };

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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      <Navbar />
      <div className="flex flex-1 w-full max-w-7xl mx-auto px-2 md:px-6 gap-4 mt-6">
        {/* Left Sidebar */}
        <aside className="hidden lg:flex flex-col w-72 bg-[var(--background)] rounded-2xl shadow-md p-4 h-fit sticky top-8 self-start gap-2">
          {/* Profile Card */}
          <div>
            <h2 className="font-bold text-base mb-1">Profile</h2>
            <div className="flex items-center gap-2">
              <Avatar className="w-10 h-10 bg-[var(--primary)]">
                <AvatarImage src="/avatars/johndoe.png" alt="John Doe" />
                <AvatarFallback className="font-semibold text-base text-white">🥋</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-semibold text-sm">John Doe</div>
                <div className="text-xs text-gray-400">@johndoe</div>
              </div>
            </div>
          </div>
          {/* Registered Events (compact) */}
          <div className="mt-2">
            <div className="flex items-center text-xs text-gray-700 bg-gray-100 rounded-lg px-2 py-1 cursor-pointer group relative w-fit">
              <span className="font-semibold mr-1">Registered Events:</span>
              <span>BJJ Seminar (4/20), Kickboxing (4/23)</span>
              <div className="absolute left-0 top-full mt-1 z-10 hidden group-hover:block bg-[var(--background)] shadow rounded p-2 text-xs min-w-max border border-gray-200">
                <div><b>BJJ Seminar</b> – Apr 20, 2:00 PM</div>
                <div><b>Kickboxing Class</b> – Apr 23, 7:00 PM</div>
              </div>
            </div>
          </div>
          <MiniCalendar
            eventsByDate={eventsByDate}
            onDayClick={setSelectedDay}
          />
          {selectedDay && eventsByDate[selectedDay] && (
            <div className="bg-[var(--background)] rounded-2xl shadow p-4 mt-4 border border-[var(--border)] animate-fade-in">
              <h3 className="font-bold text-md mb-2 text-[#C1272D]">Scheduled for {selectedDay}</h3>
              <ul className="space-y-2 text-sm text-[#333]">
                {eventsByDate[selectedDay].map((ev, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <span className="text-lg">{ev.icon}</span>
                    <span>{ev.title}</span>
                    <span className="ml-auto text-xs text-gray-500">{ev.time}</span>
                  </li>
                ))}
              </ul>
              <button
                className="mt-2 text-xs text-[#C1272D] hover:underline"
                onClick={() => setSelectedDay(null)}
              >Close</button>
            </div>
          )}
        </aside>
        {/* Main Content */}
        <main className="flex-1 flex flex-col gap-6">
          {/* Create Post Card */}
          <Card className="bg-[var(--background)] p-6 mb-2 shadow-xl rounded-2xl border border-[var(--border)]">
            <form onSubmit={handleCreatePost}>
              <div className="flex items-start gap-4">
                <Avatar className="w-10 h-10 bg-[var(--primary)]">
  <AvatarImage src="/avatars/johndoe.png" alt="John Doe" />
  <AvatarFallback className="font-semibold text-base text-white">
    🥋
  </AvatarFallback>
</Avatar>
                <div className="flex-1">
                  <Textarea
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="Share your martial arts journey..."
                    className="min-h-[100px] bg-[#F5F5F5] border-[var(--border)] text-[var(--text-primary)] focus:border-[#D4AF37] focus:ring-[#D4AF37] mb-3 rounded-lg px-3 py-2 text-sm"
                  />
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-[var(--text-primary)] hover:text-[#C1272D] hover:bg-[var(--background-secondary)] rounded-lg px-3 py-1"
                      >
                        <Image className="h-5 w-5 mr-1" alt="" />
                        Photo
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-[var(--text-primary)] hover:text-[#C1272D] hover:bg-[var(--background-secondary)] rounded-lg px-3 py-1"
                      >
                        <Video className="h-5 w-5 mr-1" />
                        Video
                      </Button>
                    </div>
                    <Button
                      type="submit"
                      className="w-28 flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-white rounded-lg shadow font-bold transition-all duration-150 cursor-pointer active:scale-95 hover:scale-95 hover:translate-y-px focus:outline-none focus:ring-2 focus:ring-[#C1272D]"
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </Card>
          {/* Posts Feed */}
          <div className="space-y-4 pb-8">
            {posts.map((post, index) => {
              if (post.type === "event") {
                return (
                  <EventPost
                    key={index}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onShare={() => {}}
                  />
                );
              } else if (post.type === "sparring") {
                return (
                  <SparringRequestPost
                    key={index}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onComment={() => {}}
                    onShare={() => {}}
                    onMessage={() => {}}
                  />
                );
              } else {
                return (
                  <RegularPost
                    key={index}
                    post={post}
                    onLike={() => handleLike(post.id)}
                    onComment={() => {}}
                    onShare={() => {}}
                  />
                );
              }
            })}
          </div>
        </main>
        {/* Right Sidebar */}
        <aside className="hidden xl:flex flex-col w-80 bg-[var(--background)] rounded-2xl shadow-md p-6 h-fit sticky top-8 self-start gap-8">
          <div>
            <h2 className="font-bold text-lg mb-4">Local Events Overview</h2>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex flex-col bg-gray-100 rounded-lg px-3 py-2">
                <span className="font-semibold">Open Mat - Apr 18</span>
                <span className="text-xs text-gray-500">10:00 AM, Senkai Gym</span>
              </li>
              <li className="flex flex-col bg-gray-100 rounded-lg px-3 py-2">
                <span className="font-semibold">Judo Workshop - Apr 22</span>
                <span className="text-xs text-gray-500">6:00 PM, Martial Arts Center</span>
              </li>
              <li className="flex flex-col bg-gray-100 rounded-lg px-3 py-2">
                <span className="font-semibold">Muay Thai Sparring - Apr 25</span>
                <span className="text-xs text-gray-500">7:00 PM, Fight Club</span>
              </li>
            </ul>
          </div>
        </aside>
      </div>
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
      <Card className="bg-[var(--background)] p-6 rounded-2xl shadow-xl border border-[var(--border)]">
        {/* Post Header */}
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10 bg-[var(--primary)] hover:bg-[var(--primary)]/90 cursor-pointer">
            {post.avatarUrl ? (
              <AvatarImage src={post.avatarUrl} alt={post.author} />
            ) : null}
            <AvatarFallback className="font-semibold text-base text-white">
              {post.author
                ? post.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                : "🥋"}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-[var(--text-primary)] hover:text-[#C1272D] cursor-pointer">
              {post.author}
            </h3>
            <p className="text-sm text-[var(--text-primary)]/60">{post.timestamp}</p>
          </div>
        </div>

        {/* Post Content */}
        <p className="text-[var(--text-primary)] mb-4 text-base">{post.content}</p>
        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <Image src={post.image} alt="" className="w-full h-auto" />
          </div>
        )}

        {/* Post Actions */}
        <div className="flex items-center space-x-4 pt-2 mt-2 border-t border-[var(--border)]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleLike(post.id)}
            className={`text-[var(--text-primary)] hover:text-[#C1272D] hover:bg-[var(--background-secondary)] cursor-pointer ${
              post.isLiked ? "text-[#C1272D]" : ""
            }`}
          >
            <Heart
              className={`h-5 w-5 mr-1 ${post.isLiked ? "fill-current" : ""}`}
            />
            {post.likes}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowComments(!showComments)}
            className="text-[var(--text-primary)] hover:text-[#C1272D] hover:bg-[var(--background-secondary)] cursor-pointer rounded-lg"
          >
            <MessageCircle className="h-5 w-5 mr-1" />
            {post.comments}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="text-[var(--text-primary)] hover:text-[#C1272D] hover:bg-[var(--background-secondary)] cursor-pointer rounded-lg"
          >
            <Share className="h-5 w-5 mr-1" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 space-y-4 bg-[#FAFAFA] p-4 rounded-xl border border-[var(--border)]">
            <div className="flex items-start space-x-2">
              <Avatar className="w-8 h-8 bg-[var(--primary)]">
                <AvatarFallback className="font-semibold text-xs text-white">
                  🥋
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                  className="min-h-[60px] bg-[#F5F5F5] border-[var(--border)] text-[var(--text-primary)] focus:border-[#D4AF37] focus:ring-[#D4AF37] text-sm"
                />
                <Button
                  onClick={() => {
                    handleAddComment(post.id, newComment);
                    setNewComment("");
                  }}
                  className="mt-2 bg-[var(--primary)] text-white hover:bg-[var(--primary)]/90 cursor-pointer rounded-lg px-4 py-1 font-semibold"
                  size="sm"
                >
                  Comment
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-3">
              {post.commentsList?.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-2">
                  <Avatar className="w-8 h-8 bg-[var(--primary)]">
                    <span className="font-semibold text-xs">
                      {comment.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </Avatar>
                  <div className="flex-1 bg-[#F5F5F5] rounded-lg p-3 border border-[var(--border)]">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-[var(--text-primary)]">
                        {comment.author}
                      </h4>
                      <span className="text-xs text-[var(--text-primary)]/60">
                        {comment.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-[var(--text-primary)] mt-1 leading-relaxed">
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
    type: "regular",
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
    type: "event",
    author: "Alliance Gym",
    timestamp: "3h ago",
    eventTitle: "Alliance Gym Spring Open Mat",
    content: "Alliance Gym is holding a special open mat event. All are welcome!",
    eventLink: "https://register.alliancegym.com/spring-open-mat",
    likes: 87,
    isLiked: false,
  },
  {
    id: 3,
    type: "sparring",
    author: "Michelle Nicolini",
    timestamp: "4h ago",
    content: "Looking for a sparring partner for competition prep this weekend. Any featherweights available?",
    likes: 12,
    comments: 3,
    isLiked: false,
  },
  {
    id: 4,
    type: "regular",
    author: "Gordon Ryan",
    timestamp: "6h ago",
    content:
      "Another day, another training session. Remember: hard work beats talent when talent doesn't work hard.",
    likes: 2451,
    comments: 156,
    isLiked: false,
  },
];
