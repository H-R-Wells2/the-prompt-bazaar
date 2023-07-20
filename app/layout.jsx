import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import Head from "next/head";

export const metadata = {
  title: "The Prompt Bazaar",
  description: "The Prompt Shastra all about the prompts for ai",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
