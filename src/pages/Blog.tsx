import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { FadeIn } from "@/components/home/FadeIn";

const Blog = () => (
  <div className="py-12 px-4">
    <div className="max-w-3xl mx-auto">
      <FadeIn>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-2">Blog</h1>
        <p className="text-muted-foreground mb-10">
          Insights on AI video creation, cinematic storytelling, and prompt engineering.
        </p>
      </FadeIn>
      <div className="space-y-6">
        {blogPosts.map((post, i) => (
          <FadeIn key={post.slug} delay={i * 80}>
            <Link
              to={`/blog/${post.slug}`}
              className="block group p-6 rounded-xl border hover:bg-accent/50 transition-colors"
            >
              <time className="text-xs text-muted-foreground">{post.date}</time>
              <h2 className="text-xl font-bold tracking-tight mt-1 group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{post.excerpt}</p>
              <span className="inline-flex items-center text-sm font-medium mt-3 gap-1 group-hover:gap-2 transition-all">
                Read more <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  </div>
);

export default Blog;
