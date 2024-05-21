import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import CallToAction from "../components/CallToAction";
import CommentSection from "../components/CommentSection";
import PostCard from "../components/PostCard";

const PostPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [recentPosts, setRecentPosts] = useState([]);
  const { postSlug } = useParams();

  useEffect(() => {
    try {
      setLoading(true);
      const fetchPost = async () => {
        const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          setLoading(false);
          return;
        }

        if (res.ok) {
          setPost(data.posts[0]);
          setLoading(false);
          setError(false);
        }
      };
      fetchPost();
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  }, [postSlug]);

  useEffect(() => {
    try {
      const fetchRecentPosts = async () => {
        const res = await fetch("/api/post/getposts?limit=3");
        const data = await res.json();

        if (!res.ok) {
          setError(data.message);
          return;
        }

        if (res.ok) {
          setRecentPosts(data.posts);
        }
      };
      fetchRecentPosts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(recentPosts);

  if (loading)
    return (
      <div>
        <Spinner
          size="xl"
          className="flex items-center justify-center min-h-[65vh] mx-auto"
        />
      </div>
    );

  return (
    <main className="p-3 mx-auto flex flex-col max-w-6xl min-h-[65vh]">
      <h1 className="mt-10 text-3xl lg:text-4xl font-serif p-3 max-w-2xl mx-auto">
        {post && post.title}
      </h1>
      <Link
        to={`/search?category=${post && post.category}`}
        className="mt-5 self-center"
      >
        <Button color="gray" pill size="xs">
          {post && post.category}
        </Button>
      </Link>
      <img
        src={post && post.image}
        alt={post && post.title}
        className="mt-10 p-3 max-h-[500px] w-full object-cover rounded-lg shadow-lg"
      />
      <div className="flex justify-between p-3 border-b border-slate-300 dark:border-gray-500 text-sm">
        <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
        <span>{post && (post.content.length / 1000).toFixed(0)} mins read</span>
      </div>

      <div
        dangerouslySetInnerHTML={{ __html: post && post.content }}
        className="p-3 mx-auto max-w-2xl post-content"
      ></div>

      <div className="max-w-4xl mx-auto w-full">
        <CallToAction />
      </div>

      <CommentSection postId={post._id} />

      <section className="flex flex-col justify-center items-center mb-5">
        <h1 className="text-xl mt-5">Recent articles</h1>

        <div className="flex flex-wrap gap-5 mt-5 justify-center">
          {recentPosts &&
            recentPosts.map((post) => <PostCard key={post._id} post={post} />)}
        </div>
      </section>
    </main>
  );
};

export default PostPage;
