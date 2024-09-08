"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [creator, setCreator] = useState({
    _id: 8888,
    username: "deleted account",
    email: "NA",
    image: "/assets/images/logo.svg",
  });

  const [copied, setCopied] = useState("");

  // Navigate to profile page or show info if user not found
  const handleProfileClick = () => {
    if (creator._id === session?.user.id) return router.push("/profile");
    else if (creator._id === 8888)
      return toast.info("User not found", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
      });
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // Set creator details when post data changes
  useEffect(() => {
    if (post.creator) {
      setCreator(post.creator);
    }
  }, [post.creator]);

  // Copy prompt text to clipboard and show notification
  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    toast.success("Copied to clipboard", {
      position: "top-right",
      autoClose: 2000,
      theme: "dark",
    });
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card z-10">
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
            <p className="font-inter text-sm text-gray-500">{creator.email}</p>
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

      {/* Show edit and delete options if the current user created the prompt */}
      {session?.user.id === creator.id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-200 pt-3">
          <button
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </button>

          {/* Delete prompt with confirmation dialog */}
          <AlertDialog.Root>
            <AlertDialog.Trigger asChild>
              <button
                className="font-inter text-sm orange_gradient cursor-pointer"
              >
                Delete
              </button>
            </AlertDialog.Trigger>
            <AlertDialog.Portal>
              <AlertDialog.Overlay className="bg-blackA9 fixed inset-0" />
              <AlertDialog.Content className="fixed top-[50%] left-[50%] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[0px_10px_38px_-10px] z-50">
                <AlertDialog.Title className="text-[17px] font-medium">
                  Are you absolutely sure?
                </AlertDialog.Title>
                <AlertDialog.Description className="text-[15px] leading-normal">
                  This action cannot be undone. This will permanently delete
                  the prompt from the server.
                </AlertDialog.Description>
                <div className="flex justify-end gap-[25px]">
                  <AlertDialog.Cancel asChild>
                    <button className="text-mauve11 bg-mauve4 hover:bg-mauve5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium">
                      Cancel
                    </button>
                  </AlertDialog.Cancel>
                  <AlertDialog.Action asChild>
                    <button
                      className="text-red11 bg-red4 hover:bg-red5 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium"
                      onClick={handleDelete}
                    >
                      Yes, delete prompt
                    </button>
                  </AlertDialog.Action>
                </div>
              </AlertDialog.Content>
            </AlertDialog.Portal>
          </AlertDialog.Root>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
