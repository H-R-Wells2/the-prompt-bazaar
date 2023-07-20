import React from "react";
import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <div className="flex">
        <h1 className="head_text text-center mt-5">AI-Powered Prompts</h1>
      </div>
      <span className="text-center sm:my-0 sm:mt-4 my-2 font-bold text-2xl text-gray-600">
        with
      </span>
      <span className="head_text blue_gradient text-center">
        {" "}
        The Prompt Bazaar
      </span>
      <p className="desc text-center">
        The Prompt Bazaar is a marketplace for creative minds to discover,
        create, and share AI-powered prompts.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
