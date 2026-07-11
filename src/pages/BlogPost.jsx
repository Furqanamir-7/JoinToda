import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import MarkdownArticle from '../components/MarkdownArticle';
import { blogPosts, getBlogPost } from '../data/blogData';

export default function BlogPost() {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <section className="min-h-[70vh] bg-[#0A0A0A] pt-40 pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-mono tracking-[0.25em] text-sky-400 uppercase">
            Not Found
          </p>
          <h1 className="font-display text-5xl font-bold text-white mt-4">
            Article not found
          </h1>
          <Link to="/blog" className="inline-flex items-center gap-2 text-sky-400 mt-8">
            <FiArrowLeft /> Back to Blog
          </Link>
        </div>
      </section>
    );
  }

  const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article className="bg-[#0A0A0A]">
        <section className="relative pt-36 pb-12 overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-25" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full" />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm text-sky-400 hover:text-sky-300 transition-colors mb-8"
            >
              <FiArrowLeft /> Back to Blog
            </Link>
            <p className="text-xs font-mono tracking-[0.25em] text-sky-400 uppercase">
              {post.category}
            </p>
            <h1 className="font-display font-extrabold text-white leading-[1.1] mt-4 text-[clamp(1.875rem,7vw,3.75rem)]">
              {post.title}
            </h1>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
              <span>{post.date}</span>
              <span>·</span>
              <span>{post.readTime}</span>
              <span>·</span>
              <a
                href={post.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sky-400 hover:text-sky-300"
              >
                Original on JoinTODA <FiExternalLink />
              </a>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="rounded-3xl overflow-hidden border border-white/[0.06] bg-[#111111] mb-10">
              <img src={post.image} alt={post.title} className="w-full aspect-[16/8] object-cover" />
            </div>

            <div className="bg-[#0E0E0E] border border-white/[0.06] rounded-3xl p-5 sm:p-10">
              <MarkdownArticle content={post.content} />
            </div>
          </div>
        </section>
      </article>

      <section className="py-16 bg-[#0D0D0D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-mono tracking-[0.25em] text-sky-400 uppercase mb-2">
                Related
              </p>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                More from TODA
              </h2>
            </div>
            <Link to="/blog" className="text-sm text-sky-400 hover:text-sky-300 self-start sm:self-auto">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {related.map((item) => (
              <Link
                key={item.slug}
                to={`/blog/${item.slug}`}
                className="bg-[#111111] border border-white/[0.06] hover:border-sky-400/35 rounded-2xl overflow-hidden group transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-5">
                  <p className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                    {item.category}
                  </p>
                  <h3 className="font-display text-base font-bold text-white mt-2 leading-snug group-hover:text-sky-100 transition-colors">
                    {item.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
