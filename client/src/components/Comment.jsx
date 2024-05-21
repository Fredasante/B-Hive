import { useEffect, useState } from "react";
import moment from "moment";
import { FaThumbsUp } from "react-icons/fa";
import { useSelector } from "react-redux";

const Comment = ({ comment, onLike }) => {
  const [user, setUser] = useState({});
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/api/user/${comment.userId}`);
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [comment]);

  console.log(comment);

  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className="flex-shrink-0 mr-3">
        <img
          className="w-10 h-10 rounded-full bg-gray-200"
          src={user.profilePicture}
          alt={user.username}
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center mb-1">
          <span className="font-bold mr-1 text-xs truncate">
            {user ? `@${user.username}` : "anonymous user"}
          </span>
          <span className="text-gray-500 text-xs">
            {moment(comment.createdAt).fromNow()}
          </span>
        </div>
        <p className="text-gray-500 pb-2">{comment.content}</p>
        <div className="flex items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit gap-2">
          <button
            onClick={() => onLike(comment._id)}
            type="button"
            className={`text-gray-500 hover:text-teal-500 ${
              currentUser &&
              comment.likes.includes(currentUser._id) &&
              "!text-teal-500"
            }`}
          >
            <FaThumbsUp className=" text-sm" />
          </button>
          {comment.numberOfLikes > 0 &&
            (comment.numberOfLikes === 1 ? (
              <p className="text-xs text-gray-500">
                {comment.numberOfLikes} like
              </p>
            ) : (
              <p className="text-xs text-gray-500">
                {comment.numberOfLikes} likes
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comment;