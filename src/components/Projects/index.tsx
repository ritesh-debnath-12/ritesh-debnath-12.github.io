import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import projectsData from "../../assets/json/projects_data.json";
import "./Projects.css";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  description: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  color: string;
  colorRgb: string;
}

interface ProjectsProps {
  maxProjects?: number;
}

/**
 * ### Projects Component
 * This is the Projects Section... this section showcases my work and projects.
 * @returns React.FC => \<Projects \/\>
 * @author Neko
 * @license GPLv3.0
 */
const Projects: React.FC<ProjectsProps> = ({ maxProjects }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [editableCount, setEditableCount] = useState<string>("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Immediate fallback - ensure visibility
    if (titleRef.current) titleRef.current.style.opacity = "1";
    if (subtitleRef.current) subtitleRef.current.style.opacity = "1";
    const cards = gridRef.current?.querySelectorAll(".project-card");
    if (cards) {
      cards.forEach((card) => {
        const element = card as HTMLElement;
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      });
    }

    const ctx = gsap.context(() => {
      // Reset elements to ensure clean state
      gsap.set([titleRef.current, subtitleRef.current], { opacity: 1, y: 0 });

      const projectCards = gridRef.current?.querySelectorAll(".project-card");
      if (projectCards) {
        gsap.set(projectCards, { opacity: 1, y: 0 });
      }

      // Only animate if ScrollTrigger is properly loaded
      if (typeof ScrollTrigger !== "undefined") {
        // Title animation
        gsap.fromTo(
          titleRef.current,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Subtitle animation
        gsap.fromTo(
          subtitleRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            delay: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: subtitleRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          }
        );

        // Project cards animation
        if (projectCards) {
          gsap.fromTo(
            projectCards,
            { y: 80, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 1,
              stagger: 0.15,
              ease: "power3.out",
              scrollTrigger: {
                trigger: gridRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const projects: Project[] = projectsData.projects;

  // Calculate the number of projects to display
  const getDisplayCount = (): number => {
    let targetCount = maxProjects;

    // If we have an edited value, use that instead
    if (editableCount !== "") {
      const parsedCount = parseInt(editableCount, 10);
      if (!isNaN(parsedCount)) {
        targetCount = parsedCount;
      }
    } else if (targetCount === undefined) {
      return projects.length;
    } else if (targetCount < 0) {
      return 0;
    } else if (targetCount > projects.length) {
      return projects.length;
    }

    return targetCount as number;
  };

  const displayCount = getDisplayCount();
  const projectsToShow = projects.slice(0, displayCount);

  const handleCountClick = () => {
    setIsEditing(true);
    setEditableCount(displayCount.toString());
  };

  const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // regex magic...
    if (value === "" || /^-?\d+$/.test(value)) {
      setEditableCount(value);
      // Auto-resize input based on content
      e.target.style.width = Math.max(1, value.length) + "ch";
    }
  };

  const handleCountBlur = () => {
    setIsEditing(false);
    // Keep the editableCount value for future calculations
  };

  const handleCountKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === "Escape") {
      setIsEditing(false);
    }
  };

  return (
    <section id="projects" className="projects-section" ref={sectionRef}>
      <div className="projects-container">
        <h2 className="projects-title" ref={titleRef}>
          Projects
        </h2>
        <p className="projects-subtitle" ref={subtitleRef}>
          A showcase of my projects. #
          {isEditing ? (
            <input
              type="text"
              value={editableCount}
              onChange={handleCountChange}
              onBlur={handleCountBlur}
              onKeyDown={handleCountKeyDown}
              className="editable-count"
              autoFocus
              style={{ width: Math.max(1, editableCount.length) + "ch" }}
            />
          ) : (
            <span
              className="editable-count-display"
              onClick={handleCountClick}
              title="Click to edit"
            >
              {displayCount}
            </span>
          )}
        </p>

        <div className="projects-grid" ref={gridRef}>
          {projectsToShow.map((project) => (
            <div
              key={project.title}
              className="project-card"
              style={
                {
                  "--project-color": project.color,
                  "--project-color-rgb": project.colorRgb,
                } as React.CSSProperties
              }
            >
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>

                <div className="project-technologies">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-links">
                  <a href={project.liveUrl} className="project-link live-link">
                    <FaExternalLinkAlt />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    className="project-link github-link"
                  >
                    <FaGithub />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
