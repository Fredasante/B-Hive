import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>

      <form className="flex flex-col gap-4 border p-5 rounded-lg border-gray-300 dark:border-gray-700">
        <div className="w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full">
          <img
            src={currentUser.profilePicture}
            alt="user"
            className="w-full h-full object-cover rounded-full border-8 border-[lightgray]"
          />
        </div>
        <TextInput
          type="text"
          defaultValue={currentUser.username}
          id="username"
          placeholder="Username"
        />
        <TextInput
          type="email"
          defaultValue={currentUser.email}
          id="email"
          placeholder="Email"
        />
        <TextInput type="password" id="password" placeholder="Password" />
        <Button type="submit">Update</Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500">Delete Account?</span>
        <span className="text-teal-500">Sign Out</span>
      </div>
    </div>
  );
};

export default DashProfile;
