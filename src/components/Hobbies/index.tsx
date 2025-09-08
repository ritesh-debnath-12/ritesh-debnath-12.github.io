import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaEdit } from "react-icons/fa";
import hobbiesData from "../../assets/json/hobbies_data.json";
import symbolLookUpTable from "../../util/SymbolLookUpTable";
import renderIcon from "../../util/SymbolComponentRenderer";
import "./Hobbies.css";

gsap.registerPlugin(ScrollTrigger);

// Icon mapping object - maps string names to React components
/**
 * @see {@link symbolLookUpTable}
 */
const iconMap: { [key: string]: React.ComponentType } = symbolLookUpTable;

interface HobbyItem {
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

interface HobbySection {
  title: string;
  subtitle: string;
  color: string;
  colorRgb: string;
  items: HobbyItem[];
}

interface HobbyData {
  [key: string]: HobbySection;
}

/**
 * ### Hobbies Component
 * This is the Hobbies Section... it is about my 'hobbies'.
 * @returns React.FC => \<Hobbies \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Hobbies: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [hobbyLimits, setHobbyLimits] = useState({
    games: 3,
    anime: 3,
    languages: 3,
    books: 3,
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hobby-subsection", {
        opacity: 0,
        y: 50,
        visibility: "visible",
      });

      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.fromTo(
        ".hobby-subsection",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const hobbyData: HobbyData = hobbiesData.hobbies;

  const handleLimitChange = (section: string, newLimit: number) => {
    if (newLimit >= 1 && newLimit <= 10) {
      setHobbyLimits((prev) => ({
        ...prev,
        [section]: newLimit,
      }));
    }
  };

  const startEditing = (section: string) => {
    setEditingSection(section);
  };

  const stopEditing = () => {
    setEditingSection(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      stopEditing();
    }
  };

  return (
    <section id="hobbies" className="hobbies-section" ref={sectionRef}>
      <div className="hobbies-container">
        <h2 className="hobbies-title" ref={titleRef}>
          Hobbies & Interests
        </h2>
        <p className="hobbies-subtitle">
          A deep dive into my personal interests and passions
        </p>

        {Object.entries(hobbyData).map(([key, section]) => (
          <div
            key={key}
            className="hobby-subsection"
            style={
              {
                "--subsection-color": section.color,
                "--subsection-color-rgb": section.colorRgb,
              } as React.CSSProperties
            }
          >
            <div className="subsection-header">
              <h3 className="subsection-title">{section.title}</h3>
              <p className="subsection-subtitle">{section.subtitle}</p>
              <div className="subsection-count">
                Showing{" "}
                {editingSection === key ? (
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={hobbyLimits[key as keyof typeof hobbyLimits]}
                    onChange={(e) =>
                      handleLimitChange(key, parseInt(e.target.value) || 1)
                    }
                    onBlur={stopEditing}
                    onKeyPress={handleKeyPress}
                    className="editable-count"
                    autoFocus
                  />
                ) : (
                  <span
                    className="editable-count"
                    onClick={() => startEditing(key)}
                  >
                    {hobbyLimits[key as keyof typeof hobbyLimits]}
                    <FaEdit className="edit-icon" />
                  </span>
                )}{" "}
                of {section.items.length} {section.title.toLowerCase()}
              </div>
            </div>

            <div className="hobby-grid">
              {section.items
                .slice(0, hobbyLimits[key as keyof typeof hobbyLimits])
                .map((item, index) => (
                  <div key={index} className="hobby-card">
                    <div className="hobby-icon">{renderIcon(iconMap, item.icon)}</div>
                    <div className="hobby-content">
                      <h4 className="hobby-title">{item.title}</h4>
                      <p className="hobby-description">{item.description}</p>
                      <div className="hobby-tags">
                        {item.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="hobby-tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hobbies;
