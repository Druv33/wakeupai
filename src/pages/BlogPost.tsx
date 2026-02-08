import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";
import { FadeIn } from "@/components/home/FadeIn";

const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="py-20 px-4 text-center">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground mt-4 inline-block">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <FadeIn>
          <Link
            to="/blog"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground gap-1 mb-8 transition-colors"
          >
            <ArrowLeft className="h-3 w-3" /> Back to Blog
          </Link>
          <time className="text-xs text-muted-foreground block mb-2">
            {post.date} · {post.readTime}
          </time>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter mb-6">
            {post.title}
          </h1>
        </FadeIn>
        <FadeIn delay={100}>
          <div
            className="blog-content text-sm"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </FadeIn>
      </div>
    </article>
  );
};

export default BlogPost;
