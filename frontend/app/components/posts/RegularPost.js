import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Image, Video } from "lucide-react";

export default function RegularPost({ post, onLike, onComment, onShare }) {
  return (
    <Card className="bg-[var(--background)] p-6 rounded-2xl shadow-xl border border-[var(--border)] mb-2">
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
          <h3 className="font-medium text-[var(--text-primary)] hover:text-[var(--primary)] cursor-pointer">
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
      {post.video && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <Video src={post.video} controls className="w-full h-auto" />
        </div>
      )}
      {/* Post Actions */}
      <div className="flex items-center space-x-4 pt-2 mt-2 border-t border-[var(--border)]">
        <Button variant="ghost" size="sm" onClick={onLike} className={`text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--background-secondary)] cursor-pointer ${post.isLiked ? "text-[var(--primary)]" : ""}`}>
          <Heart className={`h-5 w-5 mr-1 ${post.isLiked ? "fill-current" : ""}`} />
          {post.likes}
        </Button>
        <Button variant="ghost" size="sm" onClick={onComment} className="text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--background-secondary)] cursor-pointer rounded-lg">
          <MessageCircle className="h-5 w-5 mr-1" />
          {post.comments}
        </Button>
        <Button variant="ghost" size="sm" onClick={onShare} className="text-[var(--text-primary)] hover:text-[var(--primary)] hover:bg-[var(--background-secondary)] cursor-pointer rounded-lg">
          <Share className="h-5 w-5 mr-1" />
          Share
        </Button>
      </div>
    </Card>
  );
}
