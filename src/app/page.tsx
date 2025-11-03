"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [selectedProfile, setSelectedProfile] = useState<string>("1"); // 1=Recruiter, 2=Developer, 3=Stalker, 4=Adventurer
  
  const getProfileImage = () => {
    switch(selectedProfile) {
      case "1": return "/images/Recruiter.png";
      case "2": return "/images/Developer.png";
      case "3": return "/images/Stalker.png";
      case "4": return "/images/Adventurer.png";
      default: return "/images/Recruiter.png";
    }
  };

  const hideAllPages = () => {
    [
      "browsePage",
      "skillsPage",
      "experiencePage",
      "projectsPage",
      "extracurricularsPage",
      "booksPage",
      "musicPage",
      "contactPage",
      "profilePage",
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.classList.remove("active");
    });
  };

  const selectProfile = (profileId: string) => {
    setSelectedProfile(profileId);
    const profilePage = document.getElementById("profilePage");
    const browsePage = document.getElementById("browsePage");
    if (profilePage) profilePage.classList.remove("active");
    if (browsePage) browsePage.classList.add("active");
    window.scrollTo(0, 0);
  };

  const backToProfiles = () => {
    hideAllPages();
    const profilePage = document.getElementById("profilePage");
    if (profilePage) profilePage.classList.add("active");
  };

  const showBrowsePage = () => {
    hideAllPages();
    document.getElementById("browsePage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showSkillsPage = () => {
    hideAllPages();
    document.getElementById("skillsPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showExperiencePage = () => {
    hideAllPages();
    document.getElementById("experiencePage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showProjectsPage = () => {
    hideAllPages();
    document.getElementById("projectsPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showExtracurricularsPage = () => {
    hideAllPages();
    document.getElementById("extracurricularsPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showBooksPage = () => {
    hideAllPages();
    document.getElementById("booksPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showMusicPage = () => {
    hideAllPages();
    document.getElementById("musicPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };
  const showContactPage = () => {
    hideAllPages();
    document.getElementById("contactPage")?.classList.add("active");
    window.scrollTo(0, 0);
  };

  const showGenreAlbums = (genre: string, e: React.MouseEvent<HTMLButtonElement>) => {
    document.querySelectorAll(".genre-btn").forEach((btn) => btn.classList.remove("active"));
    (e.currentTarget as HTMLButtonElement).classList.add("active");
    document.querySelectorAll(".albums-display").forEach((s) => s.classList.remove("active"));
    document.getElementById(`${genre}-albums`)?.classList.add("active");
  };

  const openModal = (id: string) => {
    document.getElementById(id)?.classList.add("active");
    document.body.style.overflow = "hidden";
  };
  const closeModal = (id: string) => {
    document.getElementById(id)?.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    const logoIntro = document.getElementById("logoIntro");
    const profilePage = document.getElementById("profilePage");
    const fadeTimer = setTimeout(() => logoIntro?.classList.add("fade-out"), 2800);
    const hideTimer = setTimeout(() => {
      if (logoIntro) (logoIntro as HTMLElement).style.display = "none";
      profilePage?.classList.add("active");
    }, 3800);

    const modalClickHandlers: Array<[(e: Event) => void, Element]> = [];
    document.querySelectorAll(".modal").forEach((modal) => {
      const handler = (e: Event) => {
        if (e.target === modal) {
          closeModal((modal as HTMLElement).id);
        }
      };
      modal.addEventListener("click", handler as EventListener);
      modalClickHandlers.push([handler, modal]);
    });

    const onScroll = () => {
      const navbar = document.getElementById("navbar");
      if (!navbar) return;
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
      window.removeEventListener("scroll", onScroll);
      modalClickHandlers.forEach(([handler, modal]) => modal.removeEventListener("click", handler as EventListener));
    };
  }, []);

  return (
    <div>
      <div className="logo-intro" id="logoIntro">
        <div className="animated-logo" id="animatedLogo">TEJAS CHAKKARWAR</div>
      </div>

      <div className="profile-page" id="profilePage">
        <h1 className="profile-title">Who's Watching?</h1>
        <div className="profile-grid">
          <div className="profile-card" onClick={() => selectProfile("1")}>
            <img className="profile-avatar" src="/images/Recruiter.png" alt="Recruiter Profile" />
            <p className="profile-name">Recruiter</p>
          </div>
          <div className="profile-card" onClick={() => selectProfile("2")}>
            <img className="profile-avatar" src="/images/Developer.png" alt="Developer Profile" />
            <p className="profile-name">Developer</p>
          </div>
          <div className="profile-card" onClick={() => selectProfile("3")}>
            <img className="profile-avatar" src="/images/Stalker.png" alt="Stalker Profile" />
            <p className="profile-name">Stalker</p>
          </div>
          <div className="profile-card" onClick={() => selectProfile("4")}>
            <img className="profile-avatar" src="/images/Adventurer.png" alt="Adventurer Profile" />
            <p className="profile-name">Adventurer</p>
          </div>
        </div>
      </div>

      <div className="browse-page" id="browsePage">
        <nav id="navbar">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="hero">
          {(selectedProfile === "1" || selectedProfile === "3") ? (
            <iframe 
              className="hero-video" 
              src="https://player.vimeo.com/video/1133031009?autoplay=1&loop=1&muted=1&background=1&controls=0&playsinline=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <iframe 
              className="hero-video" 
              src="https://player.vimeo.com/video/1130720129?autoplay=1&loop=1&muted=1&background=1&controls=0&playsinline=1" 
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
            ></iframe>
          )}
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1>Tejas Chakkarwar - Software Engineer</h1>
            <p className="hero-subtitle">Master's Student @ San Jose State University</p>
            <p>Dynamic and results-driven Software Engineer with 2+ years in full-stack development across high-impact, large-scale applications. Expertise in Java, Spring Boot, React, AWS, and microservices architecture.</p>
            <div className="hero-buttons">
              <button className="btn btn-play" onClick={() => window.open('https://drive.google.com/file/d/1kTszx2r988BjyoIQ5txwcfuydju_hIJz/view?usp=sharing', '_blank')}>▶ Resume</button>
              <button className="btn btn-info" onClick={() => window.open('https://linkedin.com/in/tejaschakkarwar', '_blank')}>ⓘ LinkedIn</button>
            </div>
          </div>
        </div>

        <div>
          <h2 className="section-title">Today's Top Picks for recruiter</h2>
          <div className="card-row">
            <div className="card" onClick={() => openModal('workPermitModal')} style={{ backgroundImage: "url('/images/work permit.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Work Permit</h3><p className="card-subtitle">F1 Visa • Valid until 2030</p></div></div>
            <div className="card" onClick={showSkillsPage} style={{ backgroundImage: "url('/images/Skills.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Skills</h3><p className="card-subtitle">Spring Boot • React • AWS</p></div></div>
            <div className="card" onClick={showExperiencePage} style={{ backgroundImage: "url('/images/Experience.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Experience</h3><p className="card-subtitle">Accelya • Hitachi Vantara</p></div></div>
            <div className="card" onClick={showProjectsPage} style={{ backgroundImage: "url('/images/projects.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Projects</h3><p className="card-subtitle">ResuMatch • RouteGuard • SaaS</p></div></div>
            <div className="card" onClick={showExtracurricularsPage} style={{ backgroundImage: "url('/images/Extracurriculars.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Extracurriculars</h3><p className="card-subtitle">ACM • Rotary International</p></div></div>
          </div>
        </div>

        <div className="continue-section">
          <h2 className="section-title">Continue Watching for recruiter</h2>
          <div className="card-row">
            <div className="card continue-card" onClick={showMusicPage} style={{ backgroundImage: "url('/images/Music.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Music</h3><p className="card-subtitle">Interests & Hobbies</p></div></div>
            <div className="card continue-card" onClick={showBooksPage} style={{ backgroundImage: "url('/images/Reading.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Reading</h3><p className="card-subtitle">Books That Shaped My Journey</p></div></div>
            <div className="card continue-card" onClick={() => alert('Blogs section coming soon!')} style={{ backgroundImage: "url('/images/Blog.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Blogs</h3><p className="card-subtitle">Technical Writing</p></div></div>
            <div className="card continue-card" onClick={() => window.open('https://github.com/Tejas-Chakkarwar?tab=repositories', '_blank')} style={{ backgroundImage: "url('/images/github.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">GitHub</h3><p className="card-subtitle">View My Repositories</p></div></div>
            <div className="card continue-card" onClick={showContactPage} style={{ backgroundImage: "url('/images/contact me.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}><div className="card-content"><h3 className="card-title">Contact Me</h3><p className="card-subtitle">Get in Touch</p></div></div>
          </div>
        </div>
      </div>

      <div className="skills-page" id="skillsPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="skills-hero">
          <h1>Skills</h1>
          <p>Spring Boot • React • AWS</p>
        </div>

        <div className="skills-category">
          <h2 className="category-title">Programming Languages</h2>
          <div className="skills-grid">
            <div className="skill-item"><div className="skill-item-icon">🔷</div><div className="skill-item-name">Go</div><div className="skill-item-desc">Backend Language</div></div>
            <div className="skill-item"><div className="skill-item-icon">🐍</div><div className="skill-item-name">Python</div><div className="skill-item-desc">General Purpose Language</div></div>
            <div className="skill-item"><div className="skill-item-icon">☕</div><div className="skill-item-name">Java</div><div className="skill-item-desc">Object-Oriented Language</div></div>
            <div className="skill-item"><div className="skill-item-icon">📜</div><div className="skill-item-name">JavaScript</div><div className="skill-item-desc">Frontend & Backend</div></div>
            <div className="skill-item"><div className="skill-item-icon">⚡</div><div className="skill-item-name">C++</div><div className="skill-item-desc">System Programming</div></div>
            <div className="skill-item"><div className="skill-item-icon">🎨</div><div className="skill-item-name">HTML/CSS</div><div className="skill-item-desc">Web Technologies</div></div>
          </div>
        </div>

        <div className="skills-category">
          <h2 className="category-title">Frameworks & Libraries</h2>
          <div className="skills-grid">
            <div className="skill-item"><div className="skill-item-icon">🍃</div><div className="skill-item-name">Spring Boot</div><div className="skill-item-desc">Java Framework</div></div>
            <div className="skill-item"><div className="skill-item-icon">💾</div><div className="skill-item-name">Spring Data JPA</div><div className="skill-item-desc">Data Access Layer</div></div>
            <div className="skill-item"><div className="skill-item-icon">🔗</div><div className="skill-item-name">Hibernate</div><div className="skill-item-desc">ORM Framework</div></div>
            <div className="skill-item"><div className="skill-item-icon">🔌</div><div className="skill-item-name">Spring JDBC</div><div className="skill-item-desc">Database Connectivity</div></div>
            <div className="skill-item"><div className="skill-item-icon">🌶️</div><div className="skill-item-name">Flask</div><div className="skill-item-desc">Python Web Framework</div></div>
            <div className="skill-item"><div className="skill-item-icon">⚛️</div><div className="skill-item-name">React</div><div className="skill-item-desc">JavaScript Library</div></div>
            <div className="skill-item"><div className="skill-item-icon">🖼️</div><div className="skill-item-name">Tkinter</div><div className="skill-item-desc">Python GUI</div></div>
            <div className="skill-item"><div className="skill-item-icon">🎸</div><div className="skill-item-name">Django</div><div className="skill-item-desc">Python Framework</div></div>
            <div className="skill-item"><div className="skill-item-icon">🔗</div><div className="skill-item-name">LangChain</div><div className="skill-item-desc">AI Framework</div></div>
            <div className="skill-item"><div className="skill-item-icon">📊</div><div className="skill-item-name">LangGraph</div><div className="skill-item-desc">AI Workflow Framework</div></div>
          </div>
        </div>

        <div className="skills-category">
          <h2 className="category-title">Data Stores & Messaging</h2>
          <div className="skills-grid">
            <div className="skill-item"><div className="skill-item-icon">🐬</div><div className="skill-item-name">MySQL</div><div className="skill-item-desc">Relational Database</div></div>
            <div className="skill-item"><div className="skill-item-icon">🐘</div><div className="skill-item-name">PostgreSQL</div><div className="skill-item-desc">Advanced RDBMS</div></div>
            <div className="skill-item"><div className="skill-item-icon">🍃</div><div className="skill-item-name">MongoDB</div><div className="skill-item-desc">NoSQL Database</div></div>
            <div className="skill-item"><div className="skill-item-icon">🔍</div><div className="skill-item-name">Elasticsearch</div><div className="skill-item-desc">Search Engine</div></div>
            <div className="skill-item"><div className="skill-item-icon">⚡</div><div className="skill-item-name">Redis</div><div className="skill-item-desc">In-Memory Cache</div></div>
            <div className="skill-item"><div className="skill-item-icon">🏛️</div><div className="skill-item-name">Oracle</div><div className="skill-item-desc">Enterprise Database</div></div>
          </div>
        </div>

        <div className="skills-category">
          <h2 className="category-title">Cloud & DevOps</h2>
          <div className="skills-grid">
            <div className="skill-item"><div className="skill-item-icon">☁️</div><div className="skill-item-name">AWS EC2</div><div className="skill-item-desc">Virtual Servers</div></div>
            <div className="skill-item"><div className="skill-item-icon">🪣</div><div className="skill-item-name">AWS S3</div><div className="skill-item-desc">Object Storage</div></div>
            <div className="skill-item"><div className="skill-item-icon">⚡</div><div className="skill-item-name">AWS Lambda</div><div className="skill-item-desc">Serverless Computing</div></div>
            <div className="skill-item"><div className="skill-item-icon">🌱</div><div className="skill-item-name">Elastic Beanstalk</div><div className="skill-item-desc">PaaS Deployment</div></div>
            <div className="skill-item"><div className="skill-item-icon">🔐</div><div className="skill-item-name">AWS Cognito</div><div className="skill-item-desc">Authentication</div></div>
            <div className="skill-item"><div className="skill-item-icon">📧</div><div className="skill-item-name">AWS SES</div><div className="skill-item-desc">Email Service</div></div>
            <div className="skill-item"><div className="skill-item-icon">🌐</div><div className="skill-item-name">AWS VPC</div><div className="skill-item-desc">Virtual Network</div></div>
            <div className="skill-item"><div className="skill-item-icon">⚖️</div><div className="skill-item-name">Amazon ELB</div><div className="skill-item-desc">Load Balancing</div></div>
            <div className="skill-item"><div className="skill-item-icon">🐳</div><div className="skill-item-name">Docker</div><div className="skill-item-desc">Containerization</div></div>
            <div className="skill-item"><div className="skill-item-icon">☸️</div><div className="skill-item-name">Kubernetes</div><div className="skill-item-desc">Container Orchestration</div></div>
          </div>
        </div>

        <div className="skills-category">
          <h2 className="category-title">Developer Tools</h2>
          <div className="skills-grid">
            <div className="skill-item"><div className="skill-item-icon">🔧</div><div className="skill-item-name">Git</div><div className="skill-item-desc">Version Control</div></div>
            <div className="skill-item"><div className="skill-item-icon">📋</div><div className="skill-item-name">JIRA</div><div className="skill-item-desc">Project Management</div></div>
            <div className="skill-item"><div className="skill-item-icon">📮</div><div className="skill-item-name">Postman</div><div className="skill-item-desc">API Testing</div></div>
            <div className="skill-item"><div className="skill-item-icon">💡</div><div className="skill-item-name">IntelliJ</div><div className="skill-item-desc">Java IDE</div></div>
            <div className="skill-item"><div className="skill-item-icon">💻</div><div className="skill-item-name">VSCode</div><div className="skill-item-desc">Code Editor</div></div>
            <div className="skill-item"><div className="skill-item-icon">🐧</div><div className="skill-item-name">Unix/Linux</div><div className="skill-item-desc">Operating Systems</div></div>
          </div>
        </div>
      </div>

      <div className="experience-page" id="experiencePage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="experience-hero">
          <h1>📅 Work Experience & Education Timeline</h1>
        </div>

        <div className="timeline-container">
          <div className="timeline-line"></div>

          <div className="timeline-item education left">
            <div className="timeline-content">
              <h3>San Jose State University</h3>
              <h4>Master's 🎓</h4>
              <p className="tech-stack">🎓 Master of Science in Computer Science</p>
              <ul>
                <li>Coursework: Enterprise Distributed Systems, Cloud Computing, Machine Learning</li>
                <li>Focus on advanced software engineering and distributed systems</li>
              </ul>
            </div>
            <div className="timeline-dot education">🎓</div>
            <div className="timeline-date">Aug 2025 - May 2027</div>
          </div>

          <div className="timeline-item right">
            <div className="timeline-content">
              <h3>Software Engineer 💼</h3>
              <h4>Accelya Solutions</h4>
              <p className="tech-stack">🔧 Spring Boot, Microservices, REST APIs, SQL, Redis, Ehcache</p>
              <ul>
                <li>Migrated six legacy modules into Spring Boot microservices, reducing system latency by 29%</li>
                <li>Integrated over 12 REST and SOAP partner APIs, reducing reconciliation time by 25%</li>
                <li>Optimized 100+ SQL queries on 5M+ rows with indexing and batch processing</li>
                <li>Implemented asynchronous Java processing with CompletableFuture and caching</li>
              </ul>
            </div>
            <div className="timeline-dot">💼</div>
            <div className="timeline-date">Oct 2023 - Jun 2025</div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-content">
              <h3>Big Data Analytics Intern 🎉</h3>
              <h4>Hitachi Vantara</h4>
              <p className="tech-stack">🔧 Python, PySpark, Pentaho, Hive, Snowflake, Power BI</p>
              <ul>
                <li>Migrated 50K+ lines of SAS code to Python/PySpark, reducing licensing costs by 30%</li>
                <li>Designed and maintained ETL pipelines for 100M+ record datasets</li>
                <li>Developed 5+ Power BI dashboards, reducing reporting turnaround time by 25%</li>
                <li>Collaborated with Agile teams to analyze data migration workflows</li>
              </ul>
            </div>
            <div className="timeline-dot">💼</div>
            <div className="timeline-date">Feb 2023 - Aug 2023</div>
          </div>

          <div className="timeline-item education right">
            <div className="timeline-content">
              <h3>Savitribai Phule Pune University</h3>
              <h4>Bachelor's 🎓</h4>
              <p className="tech-stack">🎓 Bachelor of Computer Engineering with Data Science</p>
              <ul>
                <li>GPA: 3.71/4.00</li>
                <li>Coursework: Data Structures, Algorithms, Database Management, Machine Learning</li>
                <li>Led ACM Student Chapter as Secretary</li>
                <li>Volunteered with Rotary International teaching coding to underprivileged students</li>
              </ul>
            </div>
            <div className="timeline-dot education">🎓</div>
            <div className="timeline-date">Aug 2019 - Jun 2023</div>
          </div>

          <div className="timeline-item left">
            <div className="timeline-dot start">⭐</div>
          </div>
        </div>
      </div>

      <div className="projects-page" id="projectsPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="projects-hero">
          <h1>💻 Featured Projects</h1>
          <p>Building scalable solutions with modern technologies</p>
        </div>

        <div className="projects-container">
          <div className="project-grid">
            <div className="project-card" onClick={() => window.open('https://github.com/Tejas-Chakkarwar/CuriosityAI', '_blank')}>
              <div className="project-image" style={{ backgroundImage: "url('/images/CuriosityAI.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">CuriosityAI</h3>
                  <a href="https://github.com/Tejas-Chakkarwar/CuriosityAI" target="_blank" className="github-link" onClick={(e) => { e.stopPropagation(); }}>
                    <span>⭐</span> GitHub
                  </a>
                </div>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">FetchAI</span>
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">Hugging Face</span>
                  <span className="tech-tag">ChromaDB</span>
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">Three.js</span>
                </div>
                <p className="project-description">
                  AI-powered agentic system that democratizes invention and R&D by identifying research gaps, analyzing feasibility, and generating research proposals with automated code pushing to GitHub.
                </p>
                <ul className="project-highlights">
                  <li>Identifies unexplored innovations using GMM/KDE density estimation on embeddings from ArXiv/PubChem APIs</li>
                  <li>Autonomous agents evaluate novelty, technical viability, and ethical considerations using LLMs</li>
                  <li>Generates structured research proposals with abstracts, methods, and impact assessments via RAG</li>
                  <li>Auto-commits prototype code to GitHub repositories via GitHub API integration</li>
                </ul>
                <div className="project-stats">
                  <span className="stat-badge"><strong>Hackathon:</strong> CalHacks 12.0</span>
                  <span className="stat-badge"><strong>Type:</strong> AI Agents + RAG</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://github.com/7shantanu7/Weave-Hackathon', '_blank')}>
              <div className="project-image" style={{ backgroundImage: "url('/images/ResuMatch.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">ResuMatch</h3>
                  <a href="https://github.com/7shantanu7/Weave-Hackathon" target="_blank" className="github-link" onClick={(e) => { e.stopPropagation(); }}>
                    <span>⭐</span> GitHub
                  </a>
                </div>
                <div className="project-tech">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Next.js</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Flask</span>
                  <span className="tech-tag">LangGraph</span>
                  <span className="tech-tag">LangChain</span>
                  <span className="tech-tag">Google Gemini</span>
                </div>
                <p className="project-description">
                  AI-powered resume optimization platform that surfaces top-match roles and generates ATS-optimized resumes using agentic workflows.
                </p>
                <ul className="project-highlights">
                  <li>Orchestrated agentic loop with LangGraph/LangChain + Google Gemini for iterative resume rewriting</li>
                  <li>Built REST APIs with JSON guardrails and CORS-enabled integration with external ML services</li>
                  <li>Implemented lightweight RAG layer using in-memory knowledge base for company-specific patterns</li>
                  <li>Created job-matching system with relevance scoring and visual progress tracking</li>
                </ul>
                <div className="project-stats">
                  <span className="stat-badge"><strong>Impact:</strong> ATS-Optimized Resumes</span>
                  <span className="stat-badge"><strong>Tech:</strong> Full-Stack + AI</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => alert('GitHub repository coming soon!')}>
              <div className="project-image">🚚</div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">RouteGuard</h3>
                  <a href="#" className="github-link" onClick={(e) => { e.stopPropagation(); alert('GitHub repo coming soon!'); }}>
                    <span>⭐</span> GitHub
                  </a>
                </div>
                <div className="project-tech">
                  <span className="tech-tag">Java</span>
                  <span className="tech-tag">Spring Boot</span>
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">Hibernate</span>
                  <span className="tech-tag">JWT</span>
                  <span className="tech-tag">AWS</span>
                </div>
                <p className="project-description">
                  Full-stack transport order management system with role-based interfaces for customers, drivers, and business clients.
                </p>
                <ul className="project-highlights">
                  <li>Implemented JWT-based authentication with Spring Security for 100+ mock users</li>
                  <li>Automated invoice generation using Spring Boot schedulers</li>
                  <li>Built role-based access control for secure workflow management</li>
                  <li>Deployed on AWS for cloud integration and scalability</li>
                </ul>
                <div className="project-stats">
                  <span className="stat-badge"><strong>Users:</strong> 100+ Mock Users</span>
                  <span className="stat-badge"><strong>Deployment:</strong> AWS Cloud</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => window.open('https://github.com/Tejas-Chakkarwar/My-SAAS-Subscription', '_blank')}>
              <div className="project-image">💳</div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">SaaS Subscription Management</h3>
                  <a href="https://github.com/Tejas-Chakkarwar/My-SAAS-Subscription" target="_blank" className="github-link" onClick={(e) => { e.stopPropagation(); }}>
                    <span>⭐</span> GitHub
                  </a>
                </div>
                <div className="project-tech">
                  <span className="tech-tag">Spring Boot</span>
                  <span className="tech-tag">MySQL</span>
                  <span className="tech-tag">Redis</span>
                  <span className="tech-tag">RabbitMQ</span>
                  <span className="tech-tag">Stripe</span>
                  <span className="tech-tag">AWS S3</span>
                  <span className="tech-tag">JWT</span>
                </div>
                <p className="project-description">
                  Enterprise-grade backend service for managing SaaS subscriptions, billing, and user management with automated workflows.
                </p>
                <ul className="project-highlights">
                  <li>Built comprehensive user management with JWT authentication and role-based access control</li>
                  <li>Integrated Stripe for payment processing with automated billing cycles</li>
                  <li>Implemented Redis caching for session management and rate limiting</li>
                  <li>Automated invoice generation with PDF creation and S3 storage</li>
                  <li>Added RabbitMQ for asynchronous processing of heavy operations</li>
                </ul>
                <div className="project-stats">
                  <span className="stat-badge"><strong>Architecture:</strong> Microservices</span>
                  <span className="stat-badge"><strong>Features:</strong> Automated Billing</span>
                </div>
              </div>
            </div>

            <div className="project-card" onClick={() => alert('GitHub repository coming soon!')}>
              <div className="project-image">🏨</div>
              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">Hotel Management System</h3>
                  <a href="#" className="github-link" onClick={(e) => { e.stopPropagation(); alert('GitHub repo coming soon!') }}>
                    <span>⭐</span> GitHub
                  </a>
                </div>
                <div className="project-tech">
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">Tkinter</span>
                  <span className="tech-tag">MySQL</span>
                </div>
                <p className="project-description">
                  Desktop application for hotel staff to manage guest records, bookings, and billing with secure authentication.
                </p>
                <ul className="project-highlights">
                  <li>Built MySQL backend with role-based authentication for secure data handling</li>
                  <li>Designed intuitive Tkinter GUI for efficient guest management</li>
                  <li>Implemented automated reporting features for business analytics</li>
                  <li>Optimized SQL queries to improve system efficiency</li>
                </ul>
                <div className="project-stats">
                  <span className="stat-badge"><strong>Type:</strong> Desktop Application</span>
                  <span className="stat-badge"><strong>Database:</strong> MySQL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="extracurriculars-page" id="extracurricularsPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="extracurriculars-hero">
          <h1>🌟 Beyond the Code</h1>
          <p>Leadership, community engagement, and personal growth through diverse experiences</p>
        </div>

        <div className="activities-container">
          <div className="activity-section">
            <div className="activity-header">
              <span className="activity-icon">👥</span>
              <h2 className="activity-title">Leadership & Student Organizations</h2>
            </div>
            <div className="activity-cards">
              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">Secretary</h3>
                    <p className="activity-org">ACM Student Chapter</p>
                  </div>
                  <span className="activity-date">Aug 2021 – Jun 2023</span>
                </div>
                <ul className="activity-highlights">
                  <li>Orchestrated operations for 200+ member chapter with 15+ technical events</li>
                  <li>Coordinated workshops and competitions hosting 50-100 attendees each</li>
                  <li>Bridged communication between executive board, faculty, and members</li>
                </ul>
                <span className="stats-badge">200+ Members</span>
                <span className="stats-badge">15+ Events</span>
              </div>

              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">Alumni Relations Team Member</h3>
                    <p className="activity-org">Indian Student Organization</p>
                  </div>
                  <span className="activity-date">Aug 2025 – Present</span>
                </div>
                <ul className="activity-highlights">
                  <li>Foster connections across 100+ member alumni network</li>
                  <li>Coordinate networking events and cultural programs</li>
                  <li>Support new students' transition to campus life with mentorship</li>
                </ul>
                <span className="stats-badge">100+ Alumni Network</span>
              </div>

              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">Active Member</h3>
                    <p className="activity-org">Google Developers Student Club</p>
                  </div>
                  <span className="activity-date">Aug 2021 – Jun 2023</span>
                </div>
                <ul className="activity-highlights">
                  <li>Supported 10+ hackathons, coding competitions, and tech talks</li>
                  <li>Promoted club activities and recruited new members</li>
                  <li>Contributed to community-building initiatives</li>
                </ul>
                <span className="stats-badge">10+ Tech Events</span>
              </div>
            </div>
          </div>

          <div className="activity-section">
            <div className="activity-header">
              <span className="activity-icon">❤️</span>
              <h2 className="activity-title">Community Service & Volunteering</h2>
            </div>
            <div className="activity-cards">
              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">Education Volunteer</h3>
                    <p className="activity-org">Rotary International</p>
                  </div>
                  <span className="activity-date">May 2020 – Aug 2021</span>
                </div>
                <ul className="activity-highlights">
                  <li>Provided educational support to 25+ underprivileged students during COVID-19</li>
                  <li>Taught Math and Coding through virtual platforms</li>
                  <li>Created culturally appropriate teaching materials for diverse learners</li>
                  <li>Managed weekly schedules while adapting to changing circumstances</li>
                </ul>
                <span className="stats-badge">25+ Students Impacted</span>
                <span className="stats-badge">Virtual Teaching</span>
              </div>
            </div>
          </div>

          <div className="activity-section">
            <div className="activity-header">
              <span className="activity-icon">🎯</span>
              <h2 className="activity-title">Event Coordination</h2>
            </div>
            <div className="activity-cards">
              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">Event Coordinator</h3>
                    <p className="activity-org">Debate & Elocution Competitions</p>
                  </div>
                  <span className="activity-date">Jan 2022 – May 2022</span>
                </div>
                <ul className="activity-highlights">
                  <li>Organized intercollegiate competitions for 100+ participants</li>
                  <li>Coordinated with 5+ colleges for promotion and outreach</li>
                  <li>Managed registrations, scheduling, and participant communications</li>
                  <li>Handled event logistics including setup and equipment management</li>
                </ul>
                <span className="stats-badge">100+ Participants</span>
                <span className="stats-badge">5+ Colleges</span>
              </div>
            </div>
          </div>

          <div className="activity-section">
            <div className="activity-header">
              <span className="activity-icon">🏓</span>
              <h2 className="activity-title">Sports & Athletics</h2>
            </div>
            <div className="activity-cards">
              <div className="activity-card">
                <div className="activity-card-header">
                  <div>
                    <h3 className="activity-role">District Level Table Tennis Player</h3>
                    <p className="activity-org">Competitive Sports</p>
                  </div>
                  <span className="activity-date">Aug 2019 – Jun 2023</span>
                </div>
                <ul className="activity-highlights">
                  <li>Competed in district-level table tennis tournaments</li>
                  <li>Maintained rigorous training schedule alongside full-time academics</li>
                  <li>Developed mental resilience and adaptability through competitive sports</li>
                  <li>Built teamwork skills through collaboration with coaches and teammates</li>
                </ul>
                <span className="stats-badge">District Level</span>
                <span className="stats-badge">4 Years</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="books-page" id="booksPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="books-hero">
          <h1>📚 Books That Shaped My Journey</h1>
          <p>These books have influenced my perspectives, motivation, and self-growth.</p>
        </div>

        <div className="books-container">
          <div className="books-grid">
            <div className="book-card">
              <img className="book-cover" src="/images/atmoic habits.jpg" alt="Atomic Habits Book Cover" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Atomic Habits</h3>
                <p className="book-author">James Clear</p>
                <p className="book-description">A practical guide to building good habits and breaking bad ones.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/rich dad poor dad.jpeg" alt="Rich Dad Poor Dad" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Rich Dad Poor Dad</h3>
                <p className="book-author">Robert Kiyosaki</p>
                <p className="book-description">An eye-opener on wealth, assets, and financial literacy.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/the alchemist.jpeg" alt="The Alchemist" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">The Alchemist</h3>
                <p className="book-author">Paulo Coelho</p>
                <p className="book-description">A magical journey of following one's dreams.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/eat that frog.jpg" alt="Eat That Frog" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Eat That Frog</h3>
                <p className="book-author">Brian Tracy</p>
                <p className="book-description">A motivational book on overcoming procrastination.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/deep work.jpg" alt="Deep Work" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Deep Work</h3>
                <p className="book-author">Cal Newport</p>
                <p className="book-description">Rules for focused success in a distracted world.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/The Pragmatic Programmer.jpg" alt="The Pragmatic Programmer" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">The Pragmatic Programmer</h3>
                <p className="book-author">Andrew Hunt & David Thomas</p>
                <p className="book-description">Essential reading for software developers.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/Clean Code.jpg" alt="Clean Code" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Clean Code</h3>
                <p className="book-author">Robert C. Martin</p>
                <p className="book-description">A handbook of agile software craftsmanship.</p>
              </div>
            </div>

            <div className="book-card">
              <img className="book-cover" src="/images/Verity.jpeg" alt="Verity" style={{ objectFit: 'cover' }} />
              <div className="book-info">
                <h3 className="book-title">Verity</h3>
                <p className="book-author">Colleen Hoover</p>
                <p className="book-description">A gripping psychological thriller that keeps you on edge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="music-page" id="musicPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="music-hero">
          <h1>🎵 Music</h1>
          <p>Discover my musical journey and favorite tracks</p>
        </div>

        <div className="music-container">
          <div className="music-quote">
            "Rock and Roll isn't a genre, it's a way of life." <span className="guitar-icon">🎸</span>
          </div>

          <div className="genre-section">
            <h2 className="genre-title">Explore by Genre</h2>
            <div className="genre-buttons">
              <button className="genre-btn active" onClick={(e) => showGenreAlbums('edm', e)}>🎧 EDM</button>
              <button className="genre-btn" onClick={(e) => showGenreAlbums('folk', e)}>🎸 Folk Rock / Indie Folk</button>
              <button className="genre-btn" onClick={(e) => showGenreAlbums('hiphop', e)}>🎤 Hip-Hop / Rap</button>
              <button className="genre-btn" onClick={(e) => showGenreAlbums('sufi', e)}>🕊️ Sufi</button>
              <button className="genre-btn" onClick={(e) => showGenreAlbums('lofi', e)}>☁️ Lo-Fi</button>
            </div>
          </div>

          <div className="albums-section albums-display active" id="edm-albums">
            <h2 className="albums-title">🎧 EDM (Electronic Dance Music)</h2>
            <div className="albums-grid">
              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/martin garrix.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">Gold Skies (EP)</h3>
                  <p className="album-artist">Martin Garrix (2014)</p>
                  <p className="album-description">Includes hits like Animals and Wizard that shaped modern progressive house.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/avicii.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">True</h3>
                  <p className="album-artist">Avicii (2013)</p>
                  <p className="album-description">A genre-blending album mixing EDM with folk and soul (Wake Me Up, Hey Brother).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/calvin harris.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">Motion</h3>
                  <p className="album-artist">Calvin Harris (2014)</p>
                  <p className="album-description">Mainstream EDM bangers (Summer, Blame, Outside).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/deadmau5.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">4×4=12</h3>
                  <p className="album-artist">Deadmau5 (2010)</p>
                  <p className="album-description">Progressive and electro-house classic featuring Ghosts 'n' Stuff.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/swedish house mafia.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">Until Now</h3>
                  <p className="album-artist">Swedish House Mafia (2012)</p>
                  <p className="album-description">Anthemic festival energy (Don't You Worry Child).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="albums-section albums-display" id="folk-albums">
            <h2 className="albums-title">🎸 Folk Rock / Indie Folk</h2>
            <div className="albums-grid">
              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/Mumford & Sons.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">Sigh No More</h3>
                  <p className="album-artist">Mumford & Sons (2009)</p>
                  <p className="album-description">Emotional harmonies and banjo-driven folk anthems (Little Lion Man).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/Fleet_foxes.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">Fleet Foxes</h3>
                  <p className="album-artist">Fleet Foxes (2008)</p>
                  <p className="album-description">Rich vocal layering and poetic lyrics defining indie folk.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/Bon_iver_album_cover.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">For Emma, Forever Ago</h3>
                  <p className="album-artist">Bon Iver (2007)</p>
                  <p className="album-description">A minimal, heartfelt masterpiece written in isolation.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/the lumineers.avif')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">The Lumineers</h3>
                  <p className="album-artist">The Lumineers (2012)</p>
                  <p className="album-description">Accessible folk storytelling (Ho Hey, Stubborn Love).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('/images/of monsters and men.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <div className="album-info">
                  <h3 className="album-title">My Head Is an Animal</h3>
                  <p className="album-artist">Of Monsters and Men (2011)</p>
                  <p className="album-description">Icelandic indie folk glory (Little Talks).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="albums-section albums-display" id="hiphop-albums">
            <h2 className="albums-title">🎤 Hip-Hop / Rap</h2>
            <div className="albums-grid">
              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">To Pimp a Butterfly</h3>
                  <p className="album-artist">Kendrick Lamar (2015)</p>
                  <p className="album-description">A cultural landmark blending jazz, funk, and rap — Pulitzer-level storytelling.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">My Beautiful Dark Twisted Fantasy</h3>
                  <p className="album-artist">Kanye West (2010)</p>
                  <p className="album-description">Lavish, genre-defying production and introspection.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">2014 Forest Hills Drive</h3>
                  <p className="album-artist">J. Cole (2014)</p>
                  <p className="album-description">Authentic, soulful, and self-reflective — no features, pure vision.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">ASTROWORLD</h3>
                  <p className="album-artist">Travis Scott (2018)</p>
                  <p className="album-description">Trap-driven, psychedelic production (SICKO MODE).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Take Care</h3>
                  <p className="album-artist">Drake (2011)</p>
                  <p className="album-description">Emotional hip-hop infused with R&B (Marvins Room, Headlines).</p>
                </div>
              </div>
            </div>
          </div>

          <div className="albums-section albums-display" id="sufi-albums">
            <h2 className="albums-title">🕊️ Sufi</h2>
            <div className="albums-grid">
              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Shahenshah</h3>
                  <p className="album-artist">Nusrat Fateh Ali Khan (1989)</p>
                  <p className="album-description">His vocal range and spiritual power are unmatched.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Raqs-e-Bismil</h3>
                  <p className="album-artist">Abida Parveen (2001)</p>
                  <p className="album-description">Deeply spiritual qawwalis evoking transcendence.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Kailasa</h3>
                  <p className="album-artist">Kailash Kher (2006)</p>
                  <p className="album-description">A modern Sufi-pop fusion with songs like Teri Deewani.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Azadi</h3>
                  <p className="album-artist">Junoon (1997)</p>
                  <p className="album-description">Pioneers of Sufi rock blending Pakistani poetry with guitars (Sayonee).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Coke Studio Pakistan</h3>
                  <p className="album-artist">Various Artists - Season 3 & 4</p>
                  <p className="album-description">Iconic Sufi renditions like Alif Allah (Jugni) and Tajdar-e-Haram.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="albums-section albums-display" id="lofi-albums">
            <h2 className="albums-title">☁️ Lo-Fi / Chillhop</h2>
            <div className="albums-grid">
              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">beats to relax/study to</h3>
                  <p className="album-artist">ChilledCow (Lofi Girl)</p>
                  <p className="album-description">The most iconic lo-fi stream that defined the genre.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Hiraeth</h3>
                  <p className="album-artist">Idealism (2016)</p>
                  <p className="album-description">Smooth, dreamy instrumentals that embody nostalgic calm.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Life</h3>
                  <p className="album-artist">Jinsang (2016)</p>
                  <p className="album-description">A classic lo-fi hip-hop album with warm, jazzy undertones.</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Modal Soul</h3>
                  <p className="album-artist">Nujabes (2005)</p>
                  <p className="album-description">Lo-fi's spiritual father; blends hip-hop with Japanese jazz (Luv(sic) series).</p>
                </div>
              </div>

              <div className="album-card">
                <div className="album-cover" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop')" }}></div>
                <div className="album-info">
                  <h3 className="album-title">Beat Tapes, Vol. 1–3</h3>
                  <p className="album-artist">eevee (2015–2017)</p>
                  <p className="album-description">Gentle, minimal beats for focus and comfort.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact-page" id="contactPage">
        <button className="back-button" onClick={showBrowsePage}>← Back to Home</button>
        <nav className="scrolled">
          <div className="logo">TEJAS CHAKKARWAR</div>
          <ul className="nav-links">
            <li><a onClick={showBrowsePage}>Home</a></li>
            <li><a onClick={showExperiencePage}>Professional</a></li>
            <li><a onClick={showSkillsPage}>Skills</a></li>
            <li><a onClick={showProjectsPage}>Projects</a></li>
            <li><a onClick={showExtracurricularsPage}>Extracurriculars</a></li>
            <li><a onClick={showContactPage}>Hire Me</a></li>
            <img className="profile-icon" src={getProfileImage()} alt="Profile" onClick={backToProfiles} style={{ cursor: 'pointer' }} />
          </ul>
        </nav>

        <div className="contact-container">
          <div className="profile-card" style={{ background: 'linear-gradient(135deg, #2C3E50 0%, #34495E 100%)' }}>
            <img className="profile-image" src="/images/Tejas Chakkarwar.png" alt="Tejas Chakkarwar" />
            <div className="profile-details">
              <h2>Tejas Chakkarwar</h2>
              <p className="role">Software Engineer</p>
              <p className="bio">With 2+ years in full-stack development, skilled in Java, Spring Boot, React, AWS, and microservices architecture. Passionate about building scalable systems and solving complex problems.</p>
              <p className="education">San Jose State University | Accelya Solutions</p>
              <button className="linkedin-btn" onClick={() => window.open('https://linkedin.com/in/tejaschakkarwar', '_blank')}>
                <span>in</span> View Profile
              </button>
            </div>
          </div>

          <p className="contact-tagline">I'm always up for a chat or a coffee! Feel free to reach out.</p>

          <div className="contact-methods">
            <div className="contact-item" onClick={() => { window.location.href = 'mailto:tejaschakkarwar@gmail.com'; }}>
              <span className="contact-icon">📧</span>
              <span>tejaschakkarwar@gmail.com</span>
            </div>
            <div className="contact-item" onClick={() => { window.location.href = 'tel:+14082072348'; }}>
              <span className="contact-icon">📱</span>
              <span>+1 (408) 207-2348</span>
            </div>
          </div>

          <p className="coffee-message">Or catch up over a coffee ☕ 🤝</p>
        </div>
      </div>

      <div className="modal" id="workPermitModal">
        <div className="modal-content">
          <button className="modal-close" onClick={() => closeModal('workPermitModal')}>&times;</button>
          <h2 className="modal-title"><span>🎓</span>Work Permit</h2>
          <p className="modal-text">I'm currently pursuing my Master's in Computer Science on an <strong>F1 visa 🇺🇸</strong>, which allows me to work in the U.S. during internships and post-graduation through OPT and CPT programs! 💼</p>
          <p className="modal-text">My visa is valid until <strong>June 10, 2030 📅</strong>, giving me the opportunity to gain valuable experience and grow my career here. 🌟</p>
          <p className="modal-contact">For any additional queries, feel free to reach out at <strong>+1 (408) 207-2348</strong></p>
        </div>
      </div>
    </div>
  );
}
