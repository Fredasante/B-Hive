import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Button, Table } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaAngleDown } from "react-icons/fa";

const DashPosts = () => {
  const [userPosts, setUserPosts] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `/api/post/getPosts/?userId=${currentUser._id}`
        );
        const data = await res.json();

        if (res.ok) {
          setUserPosts(data.posts);
          if (data.posts.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log("Error fetching posts", error);
      }
    };
    if (currentUser.isAdmin) {
      fetchPosts();
    }
  }, [currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userPosts.length;

    try {
      const res = await fetch(
        `/api/post/getPosts/?userId=${currentUser._id}&startIndex=${startIndex}`
      );
      const data = await res.json();

      if (res.ok) {
        setUserPosts((prevPosts) => [...prevPosts, ...data.posts]);
        if (data.posts.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log("Error fetching more posts", error);
    }
  };

  return (
    <section className="table-auto overflow-x-scroll md:mx-auto mt-7 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table className="shadow-md">
            <Table.Head>
              <Table.HeadCell>Date Updated</Table.HeadCell>
              <Table.HeadCell>Post Image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
              <Table.HeadCell>Delete</Table.HeadCell>
              <Table.HeadCell>
                <span>Edit</span>
              </Table.HeadCell>
            </Table.Head>
            {userPosts.map((post) => (
              <Table.Body key={post._id} className="divide-y">
                <Table.Row className="dark:bg-gray-800">
                  <Table.Cell>
                    {new Date(post.updatedAt).toLocaleDateString()}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-20 h-10 object-cover rounded-md bg-gray-500"
                      />
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      className="text-gray-900 dark:text-gray-100"
                      to={`/posts/${post.slug}`}
                    >
                      {post.title}
                    </Link>
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/posts/${post.slug}`}>{post.category}</Link>
                  </Table.Cell>
                  <Table.Cell>
                    <span className="font-medium text-red-500 hover:underline cursor-pointer">
                      Delete
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Link
                      to={`/update-post/${post._id}`}
                      className="text-teal-500"
                    >
                      <span className="font-medium hover:underline text-teal-500 cursor-pointer">
                        Edit
                      </span>
                    </Link>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="self-center w-full my-7 text-teal-500"
            >
              Show More
              <FaAngleDown className="inline-block ml-1 text-xl" />
            </button>
          )}
        </>
      ) : (
        <h2>No posts found</h2>
      )}
    </section>
  );
};

export default DashPosts;
