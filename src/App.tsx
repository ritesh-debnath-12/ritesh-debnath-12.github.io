import { useEffect, useState } from "react";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";
import "./App.css";

/**
 * ### The App Component
 * This component serves as the main application container, managing the overall layout and state.
 *
 * It includes the following features:
 * - Dark mode toggle
 * - Dynamic loading of content sections
 * - Organizing various sections
 * @returns React.FC => \<App \/\>
 * @author Neko
 * @license GPLv3.0
 */
const App : React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [heroReady, setHeroReady] = useState(false);
  const [fontsReady, setFontsReady] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Google Fonts loading detection
  useEffect(() => {
    let cancelled = false;
    const fontFaces = (document as any).fonts;
    if (fontFaces && typeof fontFaces.load === "function") {
      const weights = ["300", "400", "500", "600", "700"];
      Promise.all(weights.map((w) => fontFaces.load(`${w} 16px Inter`)))
        .then(() => {
          if (!cancelled) setFontsReady(true);
        })
        .catch(() => {
          if (!cancelled) setFontsReady(true);
        });
    } else {
      setFontsReady(true);
    }
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (heroReady && fontsReady) {
      setIsLoading(false);
    }
  }, [heroReady, fontsReady]);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 1000); // loading fallback, because dial-up is still a thing
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`app ${isDarkMode ? "dark" : "light"}`}>
      <Loader visible={isLoading} />
      <Navigation isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
      <main className={isLoading ? "content-hidden" : "content-fade-in"}>
        <Home onHeroReady={() => setHeroReady(true)} isLoading={isLoading} />{" "}
        {/* Make sure this is the first section */}
        <About />
        <Skills />
        <Projects />
        <Hobbies />
        <Contact /> {/* Make sure this is the last section */}
      </main>
      <Footer />
    </div>
  );
}

export default App;
