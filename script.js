/**
 * SOHAM WADEKAR — PORTFOLIO INTERACTIONS & ANIMATION ENGINE
 * Royal Sapphire Blue Edition with 17-Achievement Dynamic Rotation
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. THEME MANAGEMENT ---
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  const savedTheme = localStorage.getItem('soham_portfolio_theme') || 'light';
  body.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = body.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      body.setAttribute('data-theme', next);
      localStorage.setItem('soham_portfolio_theme', next);
      showToast(`Switched to ${next === 'dark' ? 'Midnight Noir' : 'Editorial Light'} theme`);
    });
  }

  // --- 2. CUSTOM MAGNETIC CURSOR ---
  const cursorDot = document.getElementById('cursorDot');
  const cursorOutline = document.getElementById('cursorOutline');
  
  if (cursorDot && cursorOutline && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    const animateCursor = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      cursorOutline.style.left = `${outlineX}px`;
      cursorOutline.style.top = `${outlineY}px`;
      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    const interactiveElements = document.querySelectorAll('a, button, .project-card, .cta-box, .filter-pill, .connect-channel-item, .highlight-chip, .award-card-detailed, .cert-item, .floating-badge');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => body.classList.add('cursor-hover'));
      el.addEventListener('mouseleave', () => body.classList.remove('cursor-hover'));
    });
  }

  // --- 3. 3D PARALLAX TILT ON HERO PORTRAIT ---
  const portraitStage = document.getElementById('portraitStage');
  const heroCircle = document.getElementById('heroCircle');
  const mainPortraitImg = document.getElementById('mainPortraitImg');
  const floatingBadges = document.querySelectorAll('.floating-badge');

  if (portraitStage && heroCircle && mainPortraitImg) {
    portraitStage.addEventListener('mousemove', (e) => {
      const rect = portraitStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      const circleX = (x * 0.05);
      const circleY = (y * 0.05);
      const portraitX = (x * 0.02);
      const portraitY = (y * 0.02);

      heroCircle.style.transform = `translate(${circleX}px, ${circleY}px) scale(1.02)`;
      mainPortraitImg.style.transform = `translate(${portraitX}px, ${portraitY}px) scale(1.01)`;

      floatingBadges.forEach(badge => {
        const speed = parseFloat(badge.getAttribute('data-tilt-speed') || '0.06');
        badge.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
      });
    });

    portraitStage.addEventListener('mouseleave', () => {
      heroCircle.style.transform = 'translate(0px, 0px) scale(1)';
      mainPortraitImg.style.transform = 'translate(0px, 0px) scale(1)';
      floatingBadges.forEach(badge => {
        badge.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  // --- 4. PORTRAIT MODE SWITCHER (Editorial B&W vs Vibrant Color) ---
  const btnModeBw = document.getElementById('btnModeBw');
  const btnModeColor = document.getElementById('btnModeColor');

  if (btnModeBw && btnModeColor && mainPortraitImg) {
    btnModeBw.addEventListener('click', () => {
      btnModeBw.classList.add('active');
      btnModeColor.classList.remove('active');
      mainPortraitImg.classList.remove('color-mode');
      showToast('Editorial Monochrome Mode active');
    });

    btnModeColor.addEventListener('click', () => {
      btnModeColor.classList.add('active');
      btnModeBw.classList.remove('active');
      mainPortraitImg.classList.add('color-mode');
      showToast('Vibrant Natural Color Mode active');
    });
  }

  // --- 5. DYNAMIC 17 ACHIEVEMENTS HOVERING AROUND PHOTO ---
  // The exact 17 achievements provided by Soham Wadekar:
  const allAchievements = [
    { num: 17, title: "ICAHTE — UEM Jaipur", result: "🥈 2nd Prize", year: 2026, icon: "🥈" },
    { num: 16, title: "Techfest — IIT Bombay, RoboWars", result: "Team Nemesis × Team Xenon", year: 2026, icon: "🏆" },
    { num: 15, title: "BLM Muljal University — Robowar", result: "🥉 3rd Place", year: 2025, icon: "🥉" },
    { num: 14, title: "BLM Muljal University — Robowar", result: "🥈 2nd Place", year: 2025, icon: "🥈" },
    { num: 13, title: "UEM Tech Utopia — Death Race", result: "🥇 1st Place", year: 2025, icon: "🥇" },
    { num: 12, title: "JU Rhythm — Robowar", result: "🥈 15 kg Runner-Up", year: 2025, icon: "🥈" },
    { num: 11, title: "JU Rhythm — Robowar", result: "🥇 15 kg Winner", year: 2025, icon: "🥇" },
    { num: 10, title: "JU Rhythm — Robowar", result: "🥇 8 kg Winner", year: 2025, icon: "🥇" },
    { num: 9,  title: "JU Rhythm — Robowar", result: "🥇 3 lb Winner", year: 2025, icon: "🥇" },
    { num: 8,  title: "ADVItya — IIT Ropar, Robowar", result: "🥇 1st Place", year: 2025, icon: "🥇" },
    { num: 7,  title: "Technoxian World Robotics", result: "🥈 1st Runner-Up • RC Race", year: 2024, icon: "🥈" },
    { num: 6,  title: "TechSpark — IIT Delhi", result: "🥈 2nd & 🥉 3rd Robo Sumo", year: 2024, icon: "🥈" },
    { num: 5,  title: "Makerfest — JECRC Jaipur", result: "🥈 2nd Place Challenge", year: 2024, icon: "🥈" },
    { num: 4,  title: "COEP MindSpark — Take-Off", result: "4th Position", year: 2024, icon: "🏅" },
    { num: 3,  title: "AVISHKAR — NIT Surathkal", result: "🥉 2nd Runner-Up / 3rd Place", year: 2024, icon: "🥉" },
    { num: 2,  title: "InnoSpark — Chandigarh Univ × IEEE", result: "🥉 3rd Place", year: 2024, icon: "🥉" },
    { num: 1,  title: "Innovative Bharat IIC Regional", result: "🥇 1st Place Best Stall", year: 2023, icon: "🥇" }
  ];

  let currentAchievementIdx = 0;
  let achievementTimer = null;

  const b1Icon = document.getElementById('heroBadge1Icon');
  const b1Title = document.getElementById('heroBadge1Title');
  const b1Sub = document.getElementById('heroBadge1Sub');

  const b2Icon = document.getElementById('heroBadge2Icon');
  const b2Title = document.getElementById('heroBadge2Title');
  const b2Sub = document.getElementById('heroBadge2Sub');

  const b3Icon = document.getElementById('heroBadge3Icon');
  const b3Title = document.getElementById('heroBadge3Title');
  const b3Sub = document.getElementById('heroBadge3Sub');

  const tickerCounterText = document.getElementById('tickerCounterText');
  const tickerPrevBtn = document.getElementById('tickerPrevBtn');
  const tickerNextBtn = document.getElementById('tickerNextBtn');

  function renderFloatingAchievements(index) {
    const total = allAchievements.length;
    const item1 = allAchievements[index % total];
    const item2 = allAchievements[(index + 1) % total];
    const item3 = allAchievements[(index + 2) % total];

    if (b1Title && item1) {
      b1Icon.textContent = item1.icon;
      b1Title.textContent = item1.title;
      b1Sub.textContent = `${item1.result} • ${item1.year}`;
    }
    if (b2Title && item2) {
      b2Icon.textContent = item2.icon;
      b2Title.textContent = item2.title;
      b2Sub.textContent = `${item2.result} • ${item2.year}`;
    }
    if (b3Title && item3) {
      b3Icon.textContent = item3.icon;
      b3Title.textContent = item3.title;
      b3Sub.textContent = `${item3.result} • ${item3.year}`;
    }
    if (tickerCounterText) {
      tickerCounterText.textContent = `Honors ${(index % total) + 1}–${((index + 2) % total) + 1} of ${total}`;
    }
  }

  function nextAchievement() {
    currentAchievementIdx = (currentAchievementIdx + 1) % allAchievements.length;
    renderFloatingAchievements(currentAchievementIdx);
  }

  function prevAchievement() {
    currentAchievementIdx = (currentAchievementIdx - 1 + allAchievements.length) % allAchievements.length;
    renderFloatingAchievements(currentAchievementIdx);
  }

  function startAchievementTimer() {
    if (!achievementTimer) {
      achievementTimer = setInterval(nextAchievement, 3600);
    }
  }

  function stopAchievementTimer() {
    if (achievementTimer) {
      clearInterval(achievementTimer);
      achievementTimer = null;
    }
  }

  if (tickerNextBtn) {
    tickerNextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      nextAchievement();
    });
  }
  if (tickerPrevBtn) {
    tickerPrevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      prevAchievement();
    });
  }

  if (portraitStage) {
    portraitStage.addEventListener('mouseenter', stopAchievementTimer);
    portraitStage.addEventListener('mouseleave', startAchievementTimer);
  }

  // Initialize
  renderFloatingAchievements(0);
  startAchievementTimer();

  // --- 6. 17-ACHIEVEMENTS YEAR FILTER TABS IN AWARDS SECTION ---
  const awardTabs = document.querySelectorAll('.award-tab-btn');
  const awardCards = document.querySelectorAll('.award-card-detailed');

  awardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      awardTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const yearFilter = tab.getAttribute('data-award-filter');

      awardCards.forEach(card => {
        const cardYear = card.getAttribute('data-year');
        if (yearFilter === 'all' || cardYear === yearFilter) {
          card.style.display = 'grid';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(4px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- 7. INTERACTIVE PROJECT FILTER ---
  const filterPills = document.querySelectorAll('.filter-pill');
  const projectCards = document.querySelectorAll('.project-card');

  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const filterVal = pill.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterVal === 'all' || category === filterVal) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // --- 8. ANIMATED SKILL BARS & IMPACT NUMBERS (IntersectionObserver) ---
  const skillSection = document.getElementById('skills-impact');
  let animatedSkills = false;

  const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animatedSkills) {
        animatedSkills = true;

        const fills = document.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const target = fill.style.getPropertyValue('--target-width') || '90%';
          fill.style.width = target;
        });

        const statNumbers = document.querySelectorAll('.stat-number');
        statNumbers.forEach(stat => {
          const targetVal = parseFloat(stat.getAttribute('data-count'));
          const decimals = parseInt(stat.getAttribute('data-decimals') || '0');
          const suffix = stat.getAttribute('data-suffix') || '';
          animateCounter(stat, targetVal, 1600, decimals, suffix);
        });
      }
    });
  }, { threshold: 0.25 });

  if (skillSection) {
    skillsObserver.observe(skillSection);
  }

  function animateCounter(element, target, duration, decimals = 0, suffix = '') {
    let startTime = null;
    const startVal = 0;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (target - startVal) * easeProgress;

      if (decimals > 0) {
        element.textContent = current.toFixed(decimals) + suffix;
      } else {
        element.textContent = Math.floor(current) + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        if (decimals > 0) {
          element.textContent = target.toFixed(decimals) + suffix;
        } else {
          element.textContent = target + suffix;
        }
      }
    }
    requestAnimationFrame(step);
  }

  // --- 9. FLOATING NAV ACTIVE SPY ---
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.fnav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  });

  // --- 10. PROJECT DEEP DIVE MODAL DATABASE ---
  const projectDatabase = {
    autopilot: {
      num: "01",
      name: "JOB APPLICATION AUTOPILOT",
      subtitle: "AI Job Discovery & Application Automation Engine",
      award: "⚡ Autonomous AI Career Agent",
      overview: "Developed an AI-powered Job Application Autopilot using Make.com, IndianAPI, Google Gemini, Google Sheets, and Telegram Bot. Automates job fetching, AI-based resume matching and relevance scoring, and personalized cover letter generation for each job. Integrates Google Sheets for application tracking and Telegram for real-time job alerts, creating an end-to-end automated job discovery and application assistance workflow.",
      stack: ["Make.com", "Google Gemini API", "Telegram Bot API", "Google Sheets API", "IndianAPI", "Webhooks", "JSON"],
      features: [
        "Continuous automated job fetching via IndianAPI filtering for targeted high-match engineering roles.",
        "AI-driven resume matching and deep semantic relevance scoring powered by Google Gemini.",
        "Personalized, role-tailored cover letter synthesis generated on-the-fly for every qualifying job match.",
        "Integrated Google Sheets database for full status tracking and instant Telegram push alerts for live dispatches."
      ],
      github: "https://github.com/STARBORN-10/Job-Application-Autopilot"
    },
    medisense: {
      num: "02",
      name: "MEDISENSE",
      subtitle: "AI Medical Report Analyzer & Clinical OCR Pipeline",
      award: "🥈 2nd Prize Award — ICAHTE-2026 International Conference",
      overview: "MediSense is an end-to-end intelligent healthcare data pipeline designed to democratize medical report interpretation for patients while relieving clinician workloads. It parses unstructured, high-variance scanned PDF/image clinical reports, cleans and aligns diagnostic values, and generates clear, jargon-free health summaries with localized guidance.",
      stack: ["React.js", "FastAPI (Python)", "EasyOCR", "OpenCV", "Ollama", "LLaMA 3", "NLP Tokenization", "REST APIs"],
      features: [
        "Robust document pre-processing using OpenCV (binarization, skew correction, noise elimination) to handle uneven lighting and smartphone captures.",
        "Precision OCR extraction of vital blood panels, lipid profiles, and metabolic assays with tabular structure preservation.",
        "Local private LLM inference via Ollama running LLaMA 3, safeguarding patient clinical data with zero third-party cloud leakage.",
        "Interactive React frontend with visual danger/normal metric range gauges and downloadable patient-friendly health briefs.",
        "Peer-reviewed academic methodology honored with the 2nd Prize at the ICAHTE-2026 International Conference."
      ],
      github: "https://github.com/STARBORN-10/medical_report_analyzer"
    },
    invoice: {
      num: "03",
      name: "INVOICE INTELLIGENCE SYSTEM",
      subtitle: "SQL-Backed ETL Pipeline & Statistical Anomaly Detection",
      award: "Enterprise Grade Solution",
      overview: "An automated invoice auditing and freight cost estimation pipeline developed to eliminate financial leakages and streamline vendor settlements. Built with an automated Python/SQL ETL foundation, the system flags suspicious billing discrepancies and predicts fair shipping freight expenditures.",
      stack: ["Python", "SQL / SQLite", "Scikit-learn", "Streamlit", "Pandas", "NumPy", "Feature Engineering"],
      features: [
        "Modular SQL-backed ETL architecture automating ingestion, validation, duplicate detection, and relational schema mapping.",
        "Statistical anomaly detection flagging irregular unit charges, phantom fees, and statistical outliers before accounting sign-off.",
        "Machine learning regression model trained on historical logistics data predicting freight expenditures with >92% accuracy.",
        "Interactive executive Streamlit dashboard with risk heatmaps, vendor dispute queues, and audit trail exports."
      ],
      github: "https://github.com/STARBORN-10/-Invoice-Intelligence-System"
    },
    techplusai: {
      num: "04",
      name: "TECHPLUS AI",
      subtitle: "Autonomous News Aggregation & LLM Synthesis Engine",
      award: "Autonomous AI Automation Pipeline",
      overview: "A continuous, zero-maintenance content workflow orchestrated using n8n and Make.com. The automation polls multi-source technical RSS feeds, applies deduplication logic, extracts core tech breakthroughs, generates structured editorial summaries using Groq API (LLaMA 3), and logs publication-ready briefings.",
      stack: ["n8n", "Make.com", "Groq API", "LLaMA 3", "Google Sheets API", "RSS Feeds", "Webhooks", "JSON"],
      features: [
        "Multi-branch event-driven workflow operating 24/7 on scheduled cron triggers with automatic failover.",
        "Contextual prompt engineering filtering clickbait and producing high-density bullet summaries for technical readers.",
        "Automated delivery pipeline writing structured schemas (Date, Topic, Score, Summary, Source URL) into Google Sheets and webhook endpoints.",
        "Significantly reduces manual tech news research time by over 90%."
      ],
      github: "https://github.com/STARBORN-10/TechPlusAI---Daily-Tech-News-Automation",
      secondaryGithub: { name: "TOI News Pipeline", url: "https://github.com/STARBORN-10/TOI-News-Automation" }
    },
    retail: {
      num: "05",
      name: "RETAIL SALES & INVENTORY PIPELINE",
      subtitle: "100,000+ Multi-Category Transaction Analytics Engine",
      award: "Production Project @ Renu Sharma Foundation",
      overview: "A comprehensive data analysis and business intelligence initiative analyzing 100,000+ retail transactions across 8 product categories. Surfaced $39.3M+ in gross revenue and a 19.34% average margin through multi-tier SQL scripts and executive KPI dashboards.",
      stack: ["SQL (CTEs & Window Functions)", "Python (Pandas & NumPy)", "Power BI", "Excel", "Data Modeling"],
      features: [
        "Audited and cleaned dirty real-world datasets, reconciling null attributes, customer duplicates, and currency inconsistencies.",
        "Wrote complex SQL queries evaluating customer lifetime value (LTV), cohort retention, and peak hourly order distributions.",
        "Engineered executive KPI dashboards visualizing regional profit margins, category velocities, and sales rep performance.",
        "Conducted deep telecom customer churn analysis isolating critical behavioral risk factors."
      ],
      github: "https://github.com/yogeshsince2023/UrbanNest-Lifestyle-Store"
    },
    loandefault: {
      num: "06",
      name: "LOAN DEFAULT RISK PREDICTOR",
      subtitle: "Credit Risk Classification & Supervised ML Pipeline",
      award: "Machine Learning Pipeline",
      overview: "A production-oriented credit risk assessment framework designed to predict loan default probabilities for prospective borrowers. Incorporates complete end-to-end data preparation, outlier treatment, class imbalance mitigation, and model benchmarking.",
      stack: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Cross-Validation"],
      features: [
        "Comprehensive Exploratory Data Analysis (EDA) evaluating correlation matrices, debt-to-income distributions, and delinquency history.",
        "Addressed high credit class skewness through SMOTE / stratified rebalancing techniques.",
        "Trained and evaluated Logistic Regression, Random Forest, and Gradient Boosting classifiers, achieving an 89.4% ROC-AUC.",
        "Implemented feature importance extraction explaining top predictive risk drivers to ensure financial transparency."
      ],
      github: "https://github.com/STARBORN-10/Loan-Default-Risk-Predictor"
    },
    thirstcheck: {
      num: "07",
      name: "THIRSTCHECK PRO",
      subtitle: "IoT Real-Time Hydration Telemetry & Web Dashboard",
      award: "IoT Engineering Project",
      overview: "A wearable embedded telemetry device that continuously measures dermal conductivity via Galvanic Skin Response (GSR) to monitor dehydration levels in active environments. Synchronizes sensor telemetry directly to Google Firebase Realtime Database for responsive browser monitoring.",
      stack: ["ESP32 / ESP8266", "GSR Sensor", "C++", "Firebase Realtime DB", "JavaScript", "HTML5 / CSS3"],
      features: [
        "Hardware circuit design interfacing analog skin conductance sensors with microcontrollers over WiFi.",
        "Low-latency telemetry streaming sensor packets directly into Firebase cloud collections.",
        "Responsive web dashboard presenting live hydration gauge visualizations and automated threshold warning alarms.",
        "Tested across various physical exercise conditions with high reliability."
      ],
      github: "https://github.com/STARBORN-10"
    },
    pizzahut: {
      num: "08",
      name: "PIZZA HUT SALES ANALYTICS",
      subtitle: "Relational SQL Data Modeling & Peak Order Profiling",
      award: "SQL Query Mastery",
      overview: "An in-depth enterprise database exploration analyzing pizza order distributions, inventory requirements, and customer purchasing patterns across high-volume sales datasets using MySQL.",
      stack: ["SQL", "MySQL Workbench", "CTEs", "Window Functions", "Aggregations", "Database Normalization"],
      features: [
        "Structured query architecture divided into Basic, Intermediate, and Advanced tiers demonstrating progressive optimization.",
        "Pinpointed top revenue-generating menu items, regional preference variances, and peak rush operating hours.",
        "Utilized cumulative percentage distributions and window ranking functions to assist inventory planning and margin optimization."
      ],
      github: "https://github.com/STARBORN-10/pizza-sales---sql"
    }
  };

  window.openProjectModal = (projectId) => {
    const data = projectDatabase[projectId];
    if (!data) return;

    const modalBody = document.getElementById('projectModalBody');
    const modal = document.getElementById('projectModal');

    modalBody.innerHTML = `
      <div style="display: flex; align-items: baseline; gap: 12px; margin-bottom: 8px;">
        <span style="font-family: var(--font-mono); font-size: 24px; font-weight: 700; color: var(--accent-blue);">${data.num}</span>
        <h3 style="font-family: var(--font-display); font-size: 38px; line-height: 1; letter-spacing: 0.02em; color: var(--text-primary); text-transform: uppercase;">${data.name}</h3>
      </div>
      <p style="font-size: 13px; font-weight: 700; color: var(--accent-blue); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">${data.subtitle}</p>
      
      ${data.award ? `<div style="display: inline-block; background: var(--accent-blue-soft); border: 1px solid rgba(26,86,219,0.3); color: var(--accent-blue); font-size: 12px; font-weight: 700; padding: 6px 12px; border-radius: 4px; margin-bottom: 20px;">${data.award}</div>` : ''}

      <div style="font-size: 15px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 24px;">
        <p>${data.overview}</p>
      </div>

      <h4 style="font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Engineering Highlights</h4>
      <ul style="padding-left: 20px; font-size: 14px; color: var(--text-secondary); line-height: 1.65; margin-bottom: 24px;">
        ${data.features.map(f => `<li style="margin-bottom: 8px;">${f}</li>`).join('')}
      </ul>

      <h4 style="font-size: 12px; font-weight: 800; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 10px;">Technologies &amp; Architecture</h4>
      <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 30px;">
        ${data.stack.map(s => `<span style="background: var(--bg-subtle); border: 1px solid var(--border-light); color: var(--text-primary); font-family: var(--font-mono); font-size: 12px; padding: 5px 10px; border-radius: 4px;">${s}</span>`).join('')}
      </div>

      <div style="display: flex; flex-wrap: wrap; gap: 14px;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-primary">
          <span>View Source on GitHub</span>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        </a>
        ${data.secondaryGithub ? `
        <a href="${data.secondaryGithub.url}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="display: inline-flex; align-items: center; gap: 8px;">
          <span>${data.secondaryGithub.name}</span>
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>` : ''}
        <button class="btn-secondary" onclick="closeProjectModal()">Close</button>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = () => {
    const modal = document.getElementById('projectModal');
    if (modal) {
      modal.classList.remove('open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const projectModal = document.getElementById('projectModal');
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // --- 11. CONTACT MODAL & SUBMIT ---
  const contactModal = document.getElementById('contactModal');
  const contactModalCloseBtn = document.getElementById('contactModalCloseBtn');

  window.openContactModal = () => {
    if (contactModal) {
      contactModal.classList.add('open');
      contactModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeContactModal = () => {
    if (contactModal) {
      contactModal.classList.remove('open');
      contactModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  if (contactModalCloseBtn) contactModalCloseBtn.addEventListener('click', closeContactModal);
  if (contactModal) {
    contactModal.addEventListener('click', (e) => {
      if (e.target === contactModal) closeContactModal();
    });
  }

  window.handleContactSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
    const subject = encodeURIComponent(form.subject.value);
    const message = encodeURIComponent(`From: ${name} (${email})\n\n${form.message.value}`);

    window.location.href = `mailto:shwadekar10@gmail.com?subject=${subject}&body=${message}`;
    showToast('Launching email client with your message...');
    closeContactModal();
    form.reset();
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeContactModal();
    }
  });

  // --- 12. COPY CONTACT TO CLIPBOARD ---
  window.copyContact = (text, successMsg) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg);
    }).catch(() => {
      showToast(`Copied: ${text}`);
    });
  };

  // --- 13. TOAST NOTIFICATIONS ---
  function showToast(message) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerHTML = `
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s forwards ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

});
