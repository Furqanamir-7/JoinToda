import { blogPosts } from './blogData';

export const newsData = blogPosts.map(({ content, sourceUrl, ...post }) => post);
