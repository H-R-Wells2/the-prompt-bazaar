"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from 'react-toastify';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession;
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const [creator, setCreator] = useState({
    username: "deleted account",
    email: "NA",
    image: "/assets/images/logo.svg",
  });

  useEffect(() => {
    if (post.creator) {
      setCreator(post.creator);
    }
  }, [post.creator]);

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex-start items-center gap-3 cursor-pointer"
          onClick={handleProfileClick}
        >
          <Image
            src={creator.image}
            alt="User Profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {creator.email}
            </p>
          </div>
        </div>

        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="copy"
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <button
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </button>

      {session?.user.id === creator.id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <button
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
