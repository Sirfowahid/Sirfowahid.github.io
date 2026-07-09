// ============================================================
//  SITE DATA — THE ONLY FILE YOU NEED TO EDIT
// ============================================================
//
//  Everything on this website (all pages, all text, all links,
//  all images) is generated from the object below. Change a
//  value here, reload the page, and the whole site updates.
//
//  ASSETS FOLDER LAYOUT
//  --------------------
//    assets/
//      images/   → photos & thumbnails (jpg / png / webp)
//                  e.g. assets/images/profile.jpg
//      static/   → documents you link to (pdf, etc.)
//                  e.g. assets/static/Md_Mehedi_Hasan_CV.pdf
//
//  IMAGES
//  ------
//  • Leave any `image` field as ""  -> the shared placeholder
//    (assets/images/placeholder.png) is shown automatically.
//  • Put an image in assets/images/ and set the path, e.g.
//    image: "assets/images/my-photo.png"
//  • The profile photo uses `profile.photo` (assets/images/profile.jpg).
//
//  DOCUMENTS (PDF)
//  ---------------
//  • Put PDFs (CV, certificates, guides) in assets/static/ and link
//    them, e.g. file: "assets/static/my-guide.pdf"
//
//  Tip: keep the shape of each object the same — only edit the
//  text/links. To add a card, copy an existing item in the list.
// ============================================================

const SITE_DATA = {

  // ---------------------------------------------------------
  // 1. PROFILE  — your identity, used across every page
  // ---------------------------------------------------------
  profile: {
    fullName: "Md. Mehedi Hasan",
    shortName: "M. M. Hasan",
    tagline: "Lecturer · Researcher · Engineer",
    location: "Dhaka, Bangladesh",
    email: "mehedii2912@gmail.com",
    phone: "+880 1732 796 789",
    phoneHref: "tel:+8801732796789",
    cv: "assets/static/Md_Mehedi_Hasan_CV.pdf",
    photo: "assets/images/profile.webp",         
    footerBlurb:
      "Lecturer at SMUCT, AI/ML researcher and software engineer based in Dhaka, Bangladesh. Working at the intersection of deep learning, computer vision and explainable AI.",
    copyright: "© 2026 Md. Mehedi Hasan",
  },

  // ---------------------------------------------------------
  // 2. SOCIAL / ELSEWHERE LINKS
  // ---------------------------------------------------------
  socials: [
    { label: "Google Scholar", href: "https://tinyurl.com/2fun2ceb", external: true },
    { label: "GitHub",         href: "https://tinyurl.com/yvc2e5u7", external: true },
    { label: "Portfolio",      href: "https://sirfowahid.github.io", external: true },
  ],

  // ---------------------------------------------------------
  // 3. NAVIGATION  — the top menu (order matters)
  // ---------------------------------------------------------
  nav: [
    { label: "Home",           href: "index.html" },
    { label: "Publications",   href: "publications.html" },
    { label: "Projects",       href: "projects.html" },
    { label: "Achievements",   href: "achievements.html" },
    { label: "Certifications", href: "certifications.html" },
    { label: "Blog",           href: "blog.html" },
    { label: "Contact",        href: "contact.html" },
  ],

  // ---------------------------------------------------------
  // 4. HOME PAGE
  // ---------------------------------------------------------
  home: {
    hero: {
      eyebrow: "Dhaka, Bangladesh — open to research collaboration",
      // The headline before the animated word.
      headlineLead: "Teaching machines to learn,",
      // Words that cycle in the animated role.
      roleWords: ["Lecturer.", "Researcher.", "Engineer."],
      lede:
        "I'm <strong>Md. Mehedi Hasan</strong> — a Lecturer in Computer Science, an AI/ML researcher publishing in deep learning and explainable AI, and an engineer who ships full-stack products. This is where the papers, the code, and the classroom meet.",
      primaryCta:   { label: "Read my publications →", href: "publications.html" },
      secondaryCta: { label: "Download CV",            href: "assets/static/Md_Mehedi_Hasan_CV.pdf" },
      status: ["lecturer@smuct", "role: AI/ML Researcher", "stack: PyTorch · React · FastAPI"],
      // Profile image caption when no photo is set.
      photoNote: "Add profile photo<br>(square, 1000×1000px or larger PNG)",
    },

    // ---------------------------------------------------------
    //  WHAT'S NEW  — your live feed of the latest things
    // ---------------------------------------------------------
    //  HOW TO USE
    //  ----------
    //  Add a publication, project or blog post here whenever you
    //  have something new. Just copy one item block below, change
    //  the text, and set the `date` (format: "YYYY-MM-DD").
    //
    //  You DON'T sort anything yourself — the site automatically:
    //    • orders items newest-first by `date`, and
    //    • adds a glowing "NEW" badge to anything published within
    //      the last `newWithinDays` days.
    //
    //  `type`  → one of "publication" | "project" | "blog"
    //            (controls the little coloured label + icon)
    //  `href`  → where the "View →" link goes.
    // ---------------------------------------------------------
    whatsNew: {
      eyebrow: "What's new",
      title: "Latest updates",
      linkLabel: "",                 // e.g. "All updates →" (leave "" to hide)
      linkHref: "",                  // link target for linkLabel
      newWithinDays: 45,             // anything newer than this gets a NEW badge
      maxItems: 5,                   // how many items to show on the home page
      items: [
        {
          type: "publication",
          date: "2026-01-15",
          title: "Hybrid NDT–ML framework with SHAP for steel slag concrete strength",
          note: "Engineering Reports (Q2) — SHAP-based interpretation.",
          href: "publications.html",
        },
        {
          type: "project",
          date: "2025-01-10",
          title: "Brain Stroke Prediction",
          note: "Real-time detection with YOLOv11 on a FastAPI backend.",
          href: "projects.html",
        },
        {
          type: "publication",
          date: "2025-02-05",
          title: "ML for predicting strength of waste iron slag concrete",
          note: "Published in Heliyon (Q1).",
          href: "publications.html",
        },
        {
          type: "blog",
          date: "2025-11-20",
          title: "Explainable AI: making black-box models accountable",
          note: "New write-up on interpretability in practice.",
          href: "blog.html",
        },
      ],
    },

    about: {
      eyebrow: "About",
      title: "Three roles, one thread",
      lede:
        "My work moves between the lecture hall, the lab, and the IDE. I research deep learning applications — from crop-water forecasting to brain-stroke detection — and I bring the same models into production software.",
      cards: [
        { tag: "Teach",    tagStyle: "tag-accent", title: "Lecturer",   text: "Machine Learning, Deep Learning & Python at SMUCT." },
        { tag: "Research", tagStyle: "tag-teal",   title: "Researcher", text: "6+ journal papers in Q1/Q2 venues, XAI & CV focus." },
        { tag: "Build",    tagStyle: "",           title: "Engineer",   text: "Full-stack MERN products shipped at Implevista." },
      ],
    },

    // Featured publications on the home page. `image:""` -> placeholder.
    publications: {
      eyebrow: "Selected publications",
      title: "Peer-reviewed work",
      linkLabel: "All publications →",
      items: [
        { image: "assets/images/journ-thesis.webp", tag: "Journal · Q1", tagStyle: "tag-accent", title: "Deep learning for evapotranspiration forecasting & crop water stress", meta: "Journal of Environmental Management, 2025" },
        { image: "assets/images/journ heliyon cs 26.webp", tag: "Journal · Q1", tagStyle: "tag-accent", title: "ML for predicting strength properties of waste iron slag concrete",   meta: "Heliyon, 2025" },
        { image: "assets/images/conf absa ieee.webp", tag: "Conference",   tagStyle: "",           title: "Aspect-based sentiment analysis in Bengali text using ML & DL",        meta: "ICCIT, Cox's Bazar, 2023" },
      ],
    },

    // Featured projects on the home page. `image:""` -> placeholder.
    projects: {
      eyebrow: "Selected projects",
      title: "Things I've built",
      linkLabel: "All projects →",
      items: [
        { image: "", tag: "FastAPI · PyTorch",  title: "Brain Stroke Prediction",     text: "Real-time detection with YOLOv11." },
        { image: "", tag: "MERN · SSLCommerz",  title: "Hotel Reservation System",    text: "Live availability & secure payments." },
        { image: "", tag: "Flask · OpenCV",     title: "Employee Management System",  text: "Role-based access & automated payroll." },
      ],
    },

    achievements: {
      eyebrow: "Recognition",
      title: "A few milestones",
      linkLabel: "All achievements →",
      // For an animated number, set `counter:true` and use `target`.
      items: [
        { counter: true,  target: "3.84", decimals: 2, suffix: "",  label: "CGPA, BSc CSE, IUBAT" },
        { counter: true,  target: "6",    decimals: 0, suffix: "+", label: "Journal & conference papers" },
        { counter: false, value: "Top",  label: "Fresher team, IUPC 2021" },
        { counter: false, value: "2026", label: "Organizer, ML Datathon" },
      ],
    },

    blog: {
      eyebrow: "From the blog",
      title: "Notes & write-ups",
      linkLabel: "Visit blog →",
      items: [
        { image: "", meta: "Coming soon", title: "Explainable AI: making black-box models accountable" },
        { image: "", meta: "Coming soon", title: "Teaching deep learning to a first cohort" },
        { image: "", meta: "Coming soon", title: "Notes on YOLOv11 for medical imaging" },
      ],
    },

    contactCta: {
      eyebrow: "Get in touch",
      title: "Let's collaborate on research or build something.",
      button: { label: "Contact me →", href: "contact.html" },
    },
  },

  // ---------------------------------------------------------
  // 5. PUBLICATIONS PAGE
  // ---------------------------------------------------------
  publications: {
    hero: {
      eyebrow: "Research output",
      title: "Publications",
      lede:
        "Journal articles, conference papers and work currently under peer review, spanning deep learning for environmental and structural engineering, NLP, computer vision, and explainable AI.",
      status: ["journals: 7", "conference: 1", "under review: 2", "ongoing: 5"],
      // Optional hero image for THIS page. Leave "" to show the themed
      // medallion instead. Put a file in assets/images and set the path,
      // e.g. heroPhoto: "assets/images/hero-publications.jpg".
      heroPhoto: "",
    },

    // Journal papers. `tags` power the filter pills (q1 / q2 / preprint).
    // Add `image: "assets/images/paper.jpg"` to any item to show a
    // graphical-abstract thumbnail; omit it (or "") for the placeholder.
    journals: {
      eyebrow: "Journal papers",
      title: "Published & in-press",
      filters: [
        { label: "All papers", value: "all" },
        { label: "Q1",         value: "q1" },
        { label: "Q2",         value: "q2" },
        { label: "Preprint",   value: "preprint" },
      ],
      items: [
        {
          tags: "q1", tag: "Q1 · Cite Score 13.7 · IF 8.0", tagStyle: "tag-accent",
          title: "Integrating deep learning algorithms for forecasting evapotranspiration and assessing crop water stress in agriculture water management",
          authors: "Rahman, M., <strong>Hasan, M. M.</strong>, Hossain, M. A., Islam, M. M., Das, U. K., Karim, M. R., &amp; Sadiq, S. (2025)",
          venue: "Journal of Environmental Management",
          doi: "https://doi.org/10.1016/j.jenvman.2025.124363",
          image: "assets/images/journ-thesis.webp",
        },
        {
          tags: "q1", tag: "Q1 · Cite Score 4.5 · IF 3.4", tagStyle: "tag-accent",
          title: "Machine learning for predicting strength properties of waste iron slag concrete",
          authors: "Raju, M. R., Ahmad, S. I., <strong>Hasan, M. M.</strong>, Hasan, N. M. S., Islam, M. M., Basit, M. A., Hossain, I. T., Santo, S. A., Alam, M. S., &amp; Rahman, M. (2025)",
          venue: "Heliyon, 11(2), e42133",
          doi: "https://doi.org/10.1016/j.heliyon.2025.e42133",
          image: "assets/images/journ heliyon cs 25.webp",
        },
        {
          tags: "q1", tag: "Q1 · Cite Score 4.5 · IF 3.4", tagStyle: "tag-accent",
          title: "Estimation of concrete materials' uniaxial compressive strength using soft computing techniques",
          authors: "Raju, M. R., Rahman, M., <strong>Hasan, M. M.</strong>, Islam, M. M., &amp; Alam, M. S. (2023)",
          venue: "Heliyon, 9(11), e22502",
          doi: "https://doi.org/10.1016/j.heliyon.2023.e22502",
          image: "assets/images/journ heliyon cs 23.webp",
        },
        {
          tags: "q2", tag: "Q2 · Cite Score 4.2 · IF 2.0", tagStyle: "tag-teal",
          title: "Hybrid NDT–machine learning framework with SHAP-based interpretation for predicting compressive strength of steel slag concrete",
          authors: "Raju, M. R., Tapu, M. T. P., Ahmed, H., Ahmad, S. I., <strong>Hasan, M. M.</strong>, Alam, M. S., Salauddin, M., Rahman, M. S., &amp; Santo, S. A. (2026)",
          venue: "Engineering Reports, 8(4), e70782",
          doi: "https://doi.org/10.1002/eng2.70782",
          image: "assets/images/journ eng reports.webp",
        },
        {
          tags: "preprint", tag: "SSRN preprint", tagStyle: "",
          title: "Advancing Evapotranspiration, Potential Evapotranspiration, and Crop Water Stress Index Forecasting: Integrating Deep Learning for Current and Future Agricultural Water Management",
          authors: "Rahman, M., <strong>Hasan, M. M.</strong>, Hossain, M. A., Islam, M. M., Das, U. K., Karim, M. R., &amp; Sadiq, S. (2025)",
          venue: "",
          doi: "http://dx.doi.org/10.2139/ssrn.4966439",
          image: "assets/images/journ ssrn.webp",
        },
        {
          tags: "preprint", tag: "", tagStyle: "",
          title: "A Comparative Analysis of Machine Learning Approaches for Evaluating the Compressive Strength of Pozzolanic Concrete",
          authors: "Raju, M. R., Rahman, M., Islam, N. M. S., <strong>Hasan, M. M.</strong>, Sharmily, T., &amp; Hosen, M. S. (2024)",
          venue: "IUBAT Review, 7(1), 90–122",
          doi: "https://doi.org/10.3329/iubatr.v7i1.74329",
          image: "assets/images/journ iubat.webp",
        },
      ],
    },

    conference: {
      eyebrow: "Conference papers",
      title: "Presented work",
      items: [
        {
          tag: "ICCIT 2023 · Cox's Bazar, Bangladesh",
          title: "Aspect Based Sentiment Analysis in Bengali Text using Machine Learning and Deep Learning Algorithms",
          authors: "Lamia, S., <strong>Hasan, M. M.</strong>, A. R. M. Kamal, and M. A. Hossain — 2023 26th International Conference on Computer and Information Technology, pp. 1–6",
          doi: "https://doi.org/10.1109/ICCIT60459.2023.10441511",
          image: "assets/images/conf absa ieee.webp",
        },
      ],
    },

    underReview: {
      eyebrow: "Under peer review",
      title: "Submitted, awaiting decision",
      items: [
        { tag: "VRST · CORE Rank A", tagStyle: "tag-teal",  title: "A Comparative Study of Gaze and Physiological Modalities for Cognitive Load Prediction Using Machine Learning and Explainable AI", authors: "<strong>Hasan, M. M.</strong>, Hossain, M. M., Imran, F., Mahmud, M. R." },
        { tag: "Q1 · Cite Score 4.9 · IF 2.6", tagStyle: "tag-accent", title: "Compound Multi-Hazard Assessment Under CMIP6 Climate Scenarios: Tracking Seasonal Flood-Landslide and Drought-Fire Interactions Across Nepal", authors: "Rahman, M., <strong>Hasan, M. M.</strong> · Journal of Natural Hazards" },
        { tag: "Q1 · Cite Score 11.6 · IF 9.4", tagStyle: "tag-accent", title: "Novel hybrid GBR-DNN model for predicting the Gravity Grouted Soil Nail Pullout Bond Strength in Weathered Soil", authors: "Won, M., Sadiq, S., <strong>Hasan, M. M.</strong>, Mahfuzur R. · Journal of Rock Mechanics and Geotechnical Engineering" },
      ],
    },

    ongoing: {
      eyebrow: "Ongoing projects",
      title: "In progress",
      items: [
        { title: "Continual Learning with Transformer Architectures", authors: "<strong>Hasan, M. M.</strong>, Mondol, D. R." },
        { title: "Hybrid Pretrained and Custom Attention-Based Models for Automated Brain Stroke Detection and Lesion Segmentation", authors: "<strong>Hasan, M. M.</strong>" },
        { title: "Comparative Evaluation of Compressive Strength Estimation using ML, DL and Mathematical Models with Explainable AI", authors: "<strong>Hasan, M. M.</strong>, Raju, M. R." },
        { title: "Advanced Breast Cancer Detection Using YOLOv10 and Predictive Modeling Through Fuzzy Ensemble Learning on Medical Imaging", authors: "<strong>Hasan, M. M.</strong>, Raju, M. R." },
        { title: "Transformer-Based Aspect Extraction Leveraging Generative AI Techniques", authors: "Lamia, S., <strong>Hasan, M. M.</strong>" },
      ],
    },
  },

  // ---------------------------------------------------------
  // 6. PROJECTS PAGE
  // ---------------------------------------------------------
  projects: {
    hero: {
      eyebrow: "Things I've shipped",
      title: "Projects",
      lede:
        "A mix of production work from Implevista and independent builds — full-stack platforms, computer-vision systems, and applied ML tools.",
      status: ["production: 2", "independent: 3", "stack: MERN · FastAPI · PyTorch"],
      heroPhoto: "",   // optional per-page hero image (else themed medallion)
    },

    work: {
      eyebrow: "At Implevista",
      title: "Production work",
      badge: "Software Engineer · Feb 2024 – Jul 2025",
      items: [
        {
          image: "",
          tags: ["MERN Stack", "Redux", "Tailwind"],
          title: "IV Trip",
          summary: "Travel booking platform for flights, hotels and tours.",
          bullets: ["Easy booking — quick, hassle-free reservation flow", "Seamless payment integration with multiple secure options"],
          link: { label: "Visit live site →", href: "https://ivtrip.implevista.com/", style: "btn-solid" },
        },
        {
          image: "",
          tags: ["MERN Stack", "Azure", "Redux"],
          title: "IV Avatar",
          summary: "AI avatar platform for automated video generation from scripts.",
          bullets: ["AI avatars with multiple gesture sets", "Text-to-video for pre-recorded and live news scripts"],
          badge: "Private / internal product",
        },
      ],
    },

    independent: {
      eyebrow: "Independent",
      title: "Personal & academic builds",
      items: [
        {
          image: "", date: "Jun 2024 – Sep 2024",
          title: "Online Hotel Reservation Management System",
          tags: ["MERN", "Redux", "SSLCommerz"],
          bullets: ["Real-time booking with live availability", "Secure multi-gateway payment integration"],
          link: { label: "View on GitHub →", href: "https://github.com/Sirfowahid/Practicum" },
        },
        {
          image: "", date: "Aug 2023 – Dec 2023",
          title: "Employee Management System",
          tags: ["Flask", "OpenCV", "PyTorch"],
          bullets: ["Role-based access control for employees", "Automated payroll & attendance tracking"],
          link: { label: "View on GitHub →", href: "https://github.com/Sirfowahid/Employee-Management-System" },
        },
        {
          image: "", date: "Dec 2024 – Jan 2025",
          title: "Brain Stroke Prediction",
          tags: ["FastAPI", "PyTorch", "YOLOv11"],
          bullets: ["Real-time detection for fast, accurate prediction", "Lightweight FastAPI backend for seamless integration"],
          link: { label: "View on GitHub →", href: "https://github.com/Sirfowahid/BrainStrokeDetection" },
        },
      ],
    },

    skills: {
      eyebrow: "Toolkit",
      title: "Skills & frameworks",
      groups: [
        { name: "AI Frameworks",   items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "XGBoost", "Transformers", "OpenCV"] },
        { name: "Data & Analysis", items: ["NumPy", "Pandas", "Matplotlib", "Seaborn"] },
        { name: "Languages",       items: ["Python", "JavaScript", "Java", "C#", "C++", "C", "SQL"] },
        { name: "Full-Stack",      items: ["Django", "Flask", "FastAPI", "Express", "Node.js", "Next.js", "React", "Tailwind", "MongoDB", "MySQL"] },
      ],
    },
  },

  // ---------------------------------------------------------
  // 7. ACHIEVEMENTS PAGE
  // ---------------------------------------------------------
  achievements: {
    hero: {
      eyebrow: "Milestones",
      title: "Achievements",
      lede: "Academic standing, contest results, mentoring roles and the communities I help run.",
      status: ["CGPA: 3.84/4.00", "IELTS: 6.5", "papers: 6+"],
      heroPhoto: "",   // optional per-page hero image (else themed medallion)
    },

    stats: {
      items: [
        { target: "3.84", decimals: 2, suffix: "/4.00", label: "CGPA — BSc CSE, IUBAT" },
        { target: "4.91", decimals: 2, suffix: "/5.00", label: "GPA — Secondary School" },
        { target: "4.50", decimals: 2, suffix: "/5.00", label: "GPA — Higher Secondary" },
        { target: "6.5",  decimals: 1, suffix: "",       label: "IELTS Overall Band Score" },
      ],
    },

    education: {
      eyebrow: "Education",
      title: "Academic timeline",
      items: [
        { date: "Dec 2025 — Current",    title: "M.Sc. in Computer Science and Engineering", org: "Dhaka University of Engineering and Technology, Bangladesh", note: "" },
        { date: "Jan 2021 — Feb 2025",   title: "B.Sc. in Computer Science and Engineering · CGPA 3.84/4.00", org: "IUBAT — International University of Business Agriculture and Technology, Bangladesh", note: "Thesis: Integrating deep learning algorithms for forecasting evapotranspiration and assessing crop water stress in agriculture water management." },
        { date: "Jun 2017 — May 2019",   title: "Higher Secondary School · GPA 4.50/5.00", org: "BAF Shaheen College Paharkanchanpur, Bangladesh", note: "" },
        { date: "Jan 2012 — Feb 2017",   title: "Secondary School · GPA 4.91/5.00", org: "Janata High School, Bangladesh", note: "" },
      ],
    },

    experience: {
      eyebrow: "Experience",
      title: "Work timeline",
      items: [
        { date: "21 Jul 2025 — Current",       title: "Lecturer",          org: "SMUCT — Shanto Mariam University of Creative Technology, Dept. of CSE and CSIT", tags: ["Machine Learning", "Neural Network & Deep Learning", "Python"] },
        { date: "10 Feb 2024 — 20 Jul 2025",   title: "Software Engineer", org: "Implevista — built IV Trip and IV Avatar on the MERN stack.", tags: [] },
      ],
    },

    coCurricular: {
      eyebrow: "Co-curricular",
      title: "Community & mentorship",
      items: [
        { tag: "Advisory",       tagStyle: "tag-accent", text: "Advisor in the Machine Learning Community at SMUCT" },
        { tag: "Organizer",      tagStyle: "tag-accent", text: "Organizer of the Machine Learning Datathon 2026" },
        { tag: "Contest",        tagStyle: "tag-accent", text: "Top Fresher Team, IUPC Programming Contest 2021" },
        { tag: "Mentorship",     tagStyle: "tag-teal",   text: "Mentor, Machine Learning and Deep Learning Bootcamp at IUBAT" },
        { tag: "Specialization", tagStyle: "tag-teal",   text: "Specialized in PyTorch (Professional level)" },
        { tag: "Specialization", tagStyle: "tag-teal",   text: "Specializing in Generative Adversarial Networks" },
      ],
    },

    references: {
      eyebrow: "References",
      title: "Who can vouch for me",
      // Each reference can have a `photo` (leave "" for placeholder).
      items: [
        { photo: "assets/images/profile.jpg", name: "Prof. Dr. Utpal Kanti Das", role: "Dean, Professor and Chair", org: "Dept. of CSE, IUBAT", email: "ukd@iubat.edu" },
        { photo: "assets/images/profile.jpg", name: "Faisal Imran", role: "Associate Professor and Head", org: "Dept. of CSE & CSIT, SMUCT", email: "hod_cse@smuct.ac.bd" },
        { photo: "assets/images/profile.jpg", name: "Dr. Md. Mahfuzur Rahman", role: "Higher Education Professor", org: "(Postdoctoral Researcher) KFUPM, Saudi Arabia", email: "mfz.rahman@iubat.edu" },
      ],
    },
  },

  // ---------------------------------------------------------
  // 8. BLOG PAGE
  // ---------------------------------------------------------
  //  Each post can be EITHER a web write-up OR a PDF you upload.
  //    • `kind`  → "Article" | "Tutorial" | "Guide" | "Notes"
  //                (shows as a coloured label + powers the filter)
  //    • `file`  → path to a PDF in assets/static, e.g.
  //                "assets/static/my-guide.pdf".
  //                If set, the card opens the PDF in a new tab and shows
  //                a "PDF" marker. Leave "" for a normal web post.
  //    • `href`  → web link used only when `file` is empty.
  //    • `date`  → free text, shown on the card (e.g. "Jun 2026").
  //  To add a write-up or upload a PDF, just copy an item below.
  // ---------------------------------------------------------
  blog: {
    hero: {
      eyebrow: "Notes, guides & write-ups",
      title: "Writing",
      lede:
        "Articles, step-by-step tutorials and PDF guides on AI research, teaching deep learning, and building AI-powered products. Web posts and downloadable PDFs both live here.",
      status: ["formats: web · PDF", "topics: AI · XAI · teaching"],
      heroPhoto: "",   // optional per-page hero image (else themed medallion)
    },

    // Filter pills — `value` must match a post's `kind` (lower-cased).
    filters: [
      { label: "All",       value: "all" },
      { label: "Articles",  value: "article" },
      { label: "Tutorials", value: "tutorial" },
      { label: "Guides",    value: "guide" },
      { label: "Notes",     value: "notes" },
    ],

    featured: {
      image: "",
      kind: "Article",
      href: "#",
      file: "",
      tag: "Featured · Explainable AI",
      title: "Explainable AI: making black-box models accountable",
      excerpt: "Placeholder excerpt — replace with a 2–3 sentence summary of your post once it's written.",
      meta: "Draft · Add publish date",
    },

    postsHead: { eyebrow: "All writing", title: "Latest posts, tutorials & guides" },
    posts: [
      { image: "", kind: "Guide",     file: "assets/static/example-guide.pdf", href: "",  date: "Jun 2026", tag: "Deep Learning",   title: "A practical guide to training your first CNN", excerpt: "Downloadable PDF — replace assets/static/example-guide.pdf with your file." },
      { image: "", kind: "Tutorial",  file: "",                          href: "#", date: "Coming soon", tag: "Computer Vision", title: "Notes on YOLOv11 for medical imaging",                  excerpt: "Placeholder · add excerpt" },
      { image: "", kind: "Article",   file: "",                          href: "#", date: "Coming soon", tag: "Teaching",        title: "Teaching deep learning to a first cohort",              excerpt: "Placeholder · add excerpt" },
      { image: "", kind: "Article",   file: "",                          href: "#", date: "Coming soon", tag: "Research",        title: "From thesis to journal: publishing your first paper",   excerpt: "Placeholder · add excerpt" },
      { image: "", kind: "Notes",     file: "",                          href: "#", date: "Coming soon", tag: "XAI",             title: "SHAP in practice: interpreting a concrete-strength model", excerpt: "Placeholder · add excerpt" },
      { image: "", kind: "Guide",     file: "",                          href: "#", date: "Coming soon", tag: "Community",       title: "Running the Machine Learning Datathon 2026",            excerpt: "Placeholder · add excerpt" },
    ],

    cta: {
      eyebrow: "Stay updated",
      title: "More write-ups and guides are on the way.",
      button: { label: "Get in touch →", href: "contact.html" },
    },
  },

  // ---------------------------------------------------------
  // 9. CERTIFICATIONS PAGE
  // ---------------------------------------------------------
  //  A gallery for your certificates. Add one item per certificate.
  //    • `category` → used by the filter pills (keep it short, e.g.
  //                   "Deep Learning", "Cloud", "Programming").
  //    • `image`    → optional thumbnail/screenshot in assets/images
  //                   ("" = placeholder).
  //    • `file`     → path to the certificate PDF in assets/static,
  //                   e.g. "assets/static/pytorch-cert.pdf". Opens in a new tab.
  //    • `credential` → optional public verification URL (Coursera, etc.).
  //    • `size`     → controls how big the card is, to spotlight important
  //                   certificates. One of:
  //                     ""     / "small" → normal card, 3 per row (default)
  //                     "wide"           → wider card, 2 per row
  //                     "large"          → full-width feature (image beside text)
  //  Copy an item block to add a new certificate.
  // ---------------------------------------------------------
  certifications: {
    hero: {
      eyebrow: "Verified credentials",
      title: "Certifications",
      lede:
        "Professional certificates and course completions across deep learning, computer vision, full-stack engineering and the cloud. Each card links to the certificate PDF or an online verification page.",
      status: ["certificates: update count", "verified: yes"],
      heroPhoto: "",   // optional per-page hero image (else themed medallion)
    },

    // The `value` of each pill must match an item `category` (lower-cased).
    filters: [
      { label: "All",           value: "all" },
      { label: "Deep Learning", value: "deep learning" },
      { label: "Computer Vision", value: "computer vision" },
      { label: "Programming",   value: "programming" },
      { label: "Cloud",         value: "cloud" },
    ],

    items: [
      {
        image: "", category: "Deep Learning",
        title: "PyTorch for Deep Learning (Professional)",
        issuer: "Example Academy", date: "2025",
        file: "assets/static/example-certificate.pdf", credential: "",
        size: "large",   // ← spotlight this one as a big feature tile
      },
      {
        image: "", category: "Computer Vision",
        title: "Computer Vision with OpenCV & YOLO",
        issuer: "Example Platform", date: "2025",
        file: "", credential: "#",
        size: "small",
      },
      {
        image: "", category: "Programming",
        title: "Advanced Python Programming",
        issuer: "Example Institute", date: "2024",
        file: "", credential: "#",
        size: "small",
      },
      {
        image: "", category: "Cloud",
        title: "Azure Fundamentals",
        issuer: "Microsoft", date: "2024",
        file: "", credential: "#",
        size: "small",
      },
    ],
  },

  // ---------------------------------------------------------
  // 10. CONTACT PAGE
  // ---------------------------------------------------------
  contact: {
    hero: {
      eyebrow: "Say hello",
      title: "Contact",
      lede:
        "For research collaboration, teaching enquiries, speaking invitations or engineering work — reach out directly or send a message below.",
      status: ["Dhaka, Bangladesh", "open to collaboration"],
      heroPhoto: "",   // optional per-page hero image (else themed medallion)
    },
    formNote:
      "This form is a front-end placeholder — connect it to a backend or a service like Formspree to receive messages.",
  },
};

// Expose globally for the renderer.
window.SITE_DATA = SITE_DATA;
