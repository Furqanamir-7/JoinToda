import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import PageHero from '../components/PageHero';
import { blogPosts } from '../data/blogData';

export default function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="BLOG"
        title="TODA"
        accentTitle="Newsroom"
        subtitle="Actual articles and member guidance from the Truck Owners and Drivers Association."
      />

      <section className="py-16 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
              className="bg-[#111111] rounded-2xl overflow-hidden border border-white/[0.06] hover:border-sky-400/35 group transition-colors"
            >
              <Link to={`/blog/${post.slug}`} className="block h-full">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-mono tracking-widest text-sky-400 uppercase">
                    {post.category}
                  </span>
                  <h2 className="font-display text-lg font-bold text-white mt-2 leading-snug group-hover:text-sky-100 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-neutral-400 mt-3 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      {post.date} · {post.readTime}
                    </span>
                    <span className="text-sky-400 text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>
    </>
  );
}
