import { useEffect } from "react";
import MainRouter from "./MainRouter";
import useWebsiteTitle from "./hooks/useWebsiteTitle";

function App() {
  const { title } = useWebsiteTitle();

  // Update favicon and other meta tags if needed
  useEffect(() => {
    // You can add more dynamic meta tag updates here
    console.log("🏷️ App loaded with title:", title);
  }, [title]);

  return <MainRouter />;
}

export default App;
