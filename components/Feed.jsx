"use client";

import React, { useEffect, useState, useMemo } from "react";
import PromptCard from "./PromptCard";
import { toast } from "react-toastify";

const PromptsList = ({ prompts, handleTagClick }) => (
  <div className="mt-16 prompt_layout">
    {prompts.map((post) => (
      <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
    ))}
  </div>
);

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const searchedResults = useMemo(() => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter((item) => {
      const creatorName = item.creator?.username || "";
      return (
        regex.test(creatorName) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
      );
    });
  }, [allPosts, searchText]);

  const handleSearchChange = (e) => {
    const newText = e.target.value;
    setSearchText(newText);

    if (newText) {
      toast.success(`Showing results for ${newText}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);
  };

  return (
    <section className="feed">
      <form
        className="relative w-full flex-center"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <PromptsList
        prompts={searchText ? searchedResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
