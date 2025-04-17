import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, Share, Mail } from "lucide-react";

export default function SparringRequestPost({ post, onLike, onComment, onShare, onMessage }) {
  return (
    <Card className="bg-[var(--background)] p-6 rounded-2xl shadow-xl border border-[var(--border)] mb-2">
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
      <div className="mb-4">
        <div className="font-bold text-lg text-[var(--primary)]">Looking for Sparring Partner</div>
        <div className="text-[#333] mb-2">{post.content}</div>
      </div>
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
        <Button variant="ghost" size="sm" onClick={onMessage} className="text-[var(--text-primary)] hover:text-[var(--accent-secondary)] hover:bg-[var(--background-secondary)] cursor-pointer rounded-lg">
          <Mail className="h-5 w-5 mr-1" />
          Message
        </Button>
      </div>
    </Card>
  );
}
