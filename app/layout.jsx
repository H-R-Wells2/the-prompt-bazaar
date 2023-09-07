import Nav from "@components/Nav";
import Provider from "@components/Provider";
import "@styles/globals.css";
import { ToastContainer } from "./nexttoast";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "The Prompt Bazaar",
  description: "The Prompt Bazaar all about the prompts for ai",
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
            <ToastContainer />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
