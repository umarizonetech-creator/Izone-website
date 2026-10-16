"""
Single seed script to insert and synchronize all courses in the database.
Includes:
- Existing courses: Digital Marketing Course, Video Editing Course
- Requested courses:
  * Full Stack Development (6 Months)
  * Java Programming (3 Months only)
  * Python Programming (3 Months only)
  * Data Structures & Algorithms / DSA (Basics 3 Months & Advanced 6 Months)
  * Frontend Development using React (3 Months)
"""

import sys
import os
import json

# Ensure stdout handles UTF-8 characters on Windows consoles
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")

# Add parent directory to path so imports work from backend directory
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from app.database import get_raw_conn, release_conn
from app.schema_bootstrap import ensure_database_schema

COURSES = [
    # 1. Existing Course: Digital Marketing
    {
        "title": "Digital Marketing Course",
        "slug": "digital-marketing-course",
        "badge": "DIGITAL MARKETING COURSE",
        "headline": "Learn. Implement. Grow.",
        "description": "Master in-demand digital marketing skills and build your career in the fastest growing industry. Our comprehensive program gives you complete understanding from basics to live projects.",
        "duration": "3 & 6 Months",
        "tech_stack": [
            "Meta Ads",
            "Instagram",
            "YouTube",
            "Facebook",
            "WhatsApp",
            "SEO",
            "Google Analytics"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "13+ Modules | Hands-on Training", "icon": "book"},
            {"title": "Live Real-World Projects & Case Studies", "icon": "briefcase"},
            {"title": "Industry Expert Trainers & Mentors", "icon": "users"},
            {"title": "100% Placement & Freelance Guidance", "icon": "award"}
        ],
        "basic_plan": {
            "name": "Basic Foundation",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Digital Marketing Fundamentals",
                "Social Media Marketing (Meta, Insta, FB)",
                "SEO Basics & Content Strategy",
                "Performance Marketing & Ads Setup",
                "1-2 Live Campaign Projects",
                "Certificate of Completion"
            ]
        },
        "advanced_plan": {
            "name": "Advanced Mastery",
            "duration": "6 Months",
            "price": "₹60,000",
            "features": [
                "Complete 13+ Advanced Modules",
                "Advanced Performance & Paid Ad Strategies",
                "Search Engine Optimization (SEO) & Analytics",
                "Freelancing, Client Acquisition & Monetization",
                "Multiple Live Client Projects & Budget Execution",
                "100% Placement Support & Career Mentorship"
            ]
        },
        "image_url": "/images/course-students.png"
    },

    # 2. Existing Course: Video Editing
    {
        "title": "Video Editing Course",
        "slug": "video-editing-course",
        "badge": "VIDEO EDITING COURSE",
        "headline": "Learn. Edit. Create. Inspire.",
        "description": "Master video editing with us from basic cutting to advanced cinematic effects. Learn motion graphics, color grading, sound design, and YouTube & social media editing workflows to deliver like a pro.",
        "duration": "3 Months",
        "tech_stack": [
            "Premiere Pro",
            "DaVinci Resolve",
            "After Effects",
            "Audition",
            "CapCut",
            "YouTube & Reels Workflow"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "Basic to Advanced Video Editing", "icon": "video"},
            {"title": "Motion Graphics, Titles & Effects", "icon": "sparkles"},
            {"title": "Color Grading & Audio Sound Design", "icon": "palette"},
            {"title": "YouTube, Reels & Freelance Workflows", "icon": "video"}
        ],
        "basic_plan": {
            "name": "Complete Editing Course",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Basic to Advanced Editing (Premiere & DaVinci)",
                "Motion Graphics & Dynamic Titles",
                "Cinematic Color Grading & Correction",
                "Sound Design & Audio Mixing",
                "YouTube & Social Media Workflow",
                "Export & Deliver Like a Pro",
                "Flexible Batches & Beginner Friendly",
                "Certificate of Completion"
            ]
        },
        "advanced_plan": {},
        "image_url": "/images/course-students.png"
    },

    # 3. Requested Course: Full Stack Development (6 Months)
    {
        "title": "Full Stack Development Course",
        "slug": "full-stack-development",
        "badge": "FULL STACK DEVELOPMENT",
        "headline": "Master Modern Full Stack Web Development.",
        "description": "Master end-to-end full stack web development covering frontend interfaces, robust backend APIs, databases, authentication, and cloud deployment with modern industry-standard technologies in 6 months.",
        "duration": "6 Months",
        "tech_stack": [
            "HTML5",
            "CSS3",
            "JavaScript",
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "PostgreSQL",
            "Git",
            "REST APIs"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "Complete Frontend to Backend Architecture", "icon": "code"},
            {"title": "RESTful API Development & Databases", "icon": "server"},
            {"title": "Authentication, Security & State Management", "icon": "shield"},
            {"title": "Live Full Stack Industry Capstone Projects", "icon": "award"}
        ],
        "basic_plan": {
            "name": "Full Stack Mastery",
            "duration": "6 Months",
            "price": "₹60,000",
            "features": [
                "Modern HTML5, CSS3, Responsive Design & TailwindCSS",
                "Advanced JavaScript (ES6+, DOM, Async/Await)",
                "React.js Component Architecture, Hooks & State Management",
                "Node.js & Express.js Backend Server Architecture",
                "Database Design & Queries (PostgreSQL / MongoDB)",
                "RESTful API Design, JWT Authentication & Security",
                "Git, GitHub, CI/CD & Cloud Deployment",
                "3+ Production-Ready Full Stack Capstone Projects",
                "Resume Building, Mock Technical Interviews & 100% Placement Support"
            ]
        },
        "advanced_plan": {},
        "image_url": "/images/course-students.png"
    },

    # 4. Requested Course: Java Programming (3 Months only)
    {
        "title": "Java Programming Course",
        "slug": "java-programming",
        "badge": "JAVA PROGRAMMING",
        "headline": "Master Core Java from Fundamentals to Advanced OOP.",
        "description": "Build a solid foundation in object-oriented programming with Java. Master memory architecture, collections framework, multithreading, exception handling, and JDBC database connectivity in 3 months.",
        "duration": "3 Months",
        "tech_stack": [
            "Java SE",
            "OOPs",
            "Collections Framework",
            "Multithreading",
            "JDBC",
            "MySQL",
            "IntelliJ / Eclipse"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "In-depth Object-Oriented Programming (OOPs)", "icon": "code"},
            {"title": "Java Collections Framework & Generics", "icon": "layers"},
            {"title": "Multithreading & Exception Architecture", "icon": "cpu"},
            {"title": "Database Connectivity with JDBC & MySQL", "icon": "database"}
        ],
        "basic_plan": {
            "name": "Java Foundation Plan",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Java Fundamentals, Syntax, Data Types & Control Structures",
                "Deep Dive into OOPs (Inheritance, Polymorphism, Abstraction, Encapsulation)",
                "Exception Handling Architecture & Custom Exceptions",
                "Multithreading, Concurrency & Synchronization",
                "Collections Framework (ArrayList, LinkedList, HashMap, HashSet)",
                "Java 8 Features (Lambda Expressions, Stream API)",
                "File I/O Streams and Serialization",
                "JDBC Database Connectivity with MySQL",
                "Hands-on Problem Solving, Mini Projects & Certification"
            ]
        },
        "advanced_plan": {},
        "image_url": "/images/course-students.png"
    },

    # 5. Requested Course: Python Programming (3 Months only)
    {
        "title": "Python Programming Course",
        "slug": "python-programming",
        "badge": "PYTHON PROGRAMMING",
        "headline": "Learn Python for Development, Automation & Problem Solving.",
        "description": "From clean syntax to object-oriented programming, data structures, file handling, APIs, and scripting. Perfect 3-month launchpad for software development and automation.",
        "duration": "3 Months",
        "tech_stack": [
            "Python 3",
            "OOPs",
            "Data Structures",
            "NumPy Basics",
            "File Handling",
            "REST APIs",
            "SQLite/PostgreSQL",
            "Git"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "Python Fundamentals & Data Structures", "icon": "terminal"},
            {"title": "Object-Oriented Programming (OOPs) & Modules", "icon": "code"},
            {"title": "Automation Scripts & Working with REST APIs", "icon": "cpu"},
            {"title": "Database Integration & Project Development", "icon": "database"}
        ],
        "basic_plan": {
            "name": "Python Foundation Plan",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Python Syntax, Variables, Operators & Control Flow",
                "Built-in Data Structures: Lists, Tuples, Dictionaries, Sets",
                "Functional Programming, List Comprehensions & Lambdas",
                "Object-Oriented Programming (Classes, Objects, Inheritance)",
                "File Handling, JSON Parsing & Regular Expressions",
                "Working with REST APIs using Requests module",
                "Introduction to Data Analysis with NumPy & Pandas",
                "Database Integration with SQLite / PostgreSQL",
                "2 Real-World Practical Automation Projects & Certification"
            ]
        },
        "advanced_plan": {},
        "image_url": "/images/course-students.png"
    },

    # 6. Requested Course: DSA Basics (3 Months) & Advanced (6 Months)
    {
        "title": "Data Structures & Algorithms (DSA) Course",
        "slug": "data-structures-and-algorithms",
        "badge": "DATA STRUCTURES & ALGORITHMS",
        "headline": "Crack Top Tech Coding Rounds with Data Structures & Algorithms.",
        "description": "Master algorithmic problem solving, time complexity analysis, data structures, recursion, dynamic programming, and graph algorithms to ace technical interviews.",
        "duration": "3 & 6 Months",
        "tech_stack": [
            "C++ / Java / Python",
            "Time & Space Complexity",
            "LeetCode",
            "Trees & Graphs",
            "Dynamic Programming"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "Time & Space Complexity (Big-O Analysis)", "icon": "code"},
            {"title": "Linear & Non-Linear Data Structures", "icon": "layers"},
            {"title": "Advanced Graph Algorithms & Dynamic Programming", "icon": "cpu"},
            {"title": "150+ Curated LeetCode Problem Solving & Mock Interviews", "icon": "award"}
        ],
        "basic_plan": {
            "name": "DSA Basics",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Asymptotic Analysis (Big-O, Big-Omega, Big-Theta)",
                "Arrays, Two Pointers & Sliding Window Technique",
                "Strings, Hashing & Hash Tables",
                "Recursion & Divide and Conquer Fundamentals",
                "Linked Lists (Singly, Doubly, Circular)",
                "Stacks & Queues (Implementation & Applications)",
                "Searching & Sorting Algorithms (Binary Search, Merge Sort, Quick Sort)",
                "100+ LeetCode Easy & Medium Problem Solutions",
                "Coding Interview Basics & Certificate"
            ]
        },
        "advanced_plan": {
            "name": "DSA Advanced",
            "duration": "6 Months",
            "price": "₹60,000",
            "features": [
                "Complete 3-Month DSA Basics Syllabus",
                "Binary Trees, Binary Search Trees (BST) & AVL Trees",
                "Heaps, Priority Queues & Disjoint Set Union (DSU)",
                "Graph Algorithms (BFS, DFS, Dijkstra, Bellman-Ford, Prim, Kruskal)",
                "Dynamic Programming (1D, 2D, Knapsack, Matrix Chain, Grids)",
                "Backtracking, Bit Manipulation, Greedy & Trie",
                "System Design Fundamentals & Object-Oriented Design",
                "250+ Curated LeetCode Medium & Hard Problems",
                "MAANG / Top Product Companies Mock Coding Interviews & Placement Prep"
            ]
        },
        "image_url": "/images/course-students.png"
    },

    # 7. Requested Course: Frontend Development using React (3 Months)
    {
        "title": "Frontend Development using React Course",
        "slug": "frontend-development-using-react",
        "badge": "FRONTEND DEVELOPMENT",
        "headline": "Craft Fast, Modern & Interactive Web Applications with React.",
        "description": "Master modern frontend engineering using HTML5, CSS3, JavaScript (ES6+), React 18, TailwindCSS, State Management, and REST API integration in 3 months.",
        "duration": "3 Months",
        "tech_stack": [
            "HTML5",
            "CSS3",
            "JavaScript ES6+",
            "React.js",
            "TailwindCSS",
            "REST APIs",
            "Vite",
            "Git"
        ],
        "mode": "Offline Classroom Training",
        "certificate": "Certificate of Completion",
        "highlights": [
            {"title": "Modern JavaScript ES6+ & DOM Manipulation", "icon": "terminal"},
            {"title": "React.js Hooks, State & Component Architecture", "icon": "code"},
            {"title": "TailwindCSS & Responsive Web Design", "icon": "palette"},
            {"title": "REST API Integration & Live Web Deployment", "icon": "globe"}
        ],
        "basic_plan": {
            "name": "React Frontend Development",
            "duration": "3 Months",
            "price": "₹30,000",
            "features": [
                "Semantic HTML5, CSS3, Flexbox & CSS Grid",
                "Modern JavaScript (ES6+, Promises, Fetch, Async/Await)",
                "React Fundamentals: JSX, Components, Props & State",
                "React Hooks (useState, useEffect, useRef, useMemo, useCallback)",
                "Modern Responsive UI with TailwindCSS",
                "Client-side Routing with React Router v6",
                "REST API Integration & Async Data Fetching",
                "Building 3 Production-Grade Interactive React Projects",
                "Git, GitHub, Vercel/Netlify Deployment & Certificate"
            ]
        },
        "advanced_plan": {},
        "image_url": "/images/course-students.png"
    }
]


def seed():
    # 1. Ensure table schema and all columns exist
    ensure_database_schema()

    conn = get_raw_conn()
    conn.autocommit = True
    cur = conn.cursor()

    print("==================================================")
    print("      IZONE TECHNOLOGIES - COURSE SEED SCRIPT     ")
    print("==================================================")
    print(f"Total courses to sync/insert: {len(COURSES)}\n")

    for c in COURSES:
        # Check if record already exists by slug or exact title
        cur.execute(
            "SELECT id FROM courses WHERE slug = %s OR title = %s",
            (c["slug"], c["title"])
        )
        existing = cur.fetchone()

        tech_stack_json = json.dumps(c["tech_stack"])
        highlights_json = json.dumps(c["highlights"])
        basic_plan_json = json.dumps(c["basic_plan"])
        advanced_plan_json = json.dumps(c["advanced_plan"])

        if existing:
            course_id = existing[0]
            cur.execute("""
                UPDATE courses
                SET title = %s,
                    slug = %s,
                    description = %s,
                    duration = %s,
                    tech_stack = %s,
                    headline = %s,
                    badge = %s,
                    mode = %s,
                    certificate = %s,
                    highlights = %s,
                    basic_plan = %s,
                    advanced_plan = %s,
                    image_url = %s,
                    updated_at = NOW()
                WHERE id = %s
            """, (
                c["title"],
                c["slug"],
                c["description"],
                c["duration"],
                tech_stack_json,
                c["headline"],
                c["badge"],
                c["mode"],
                c["certificate"],
                highlights_json,
                basic_plan_json,
                advanced_plan_json,
                c["image_url"],
                course_id
            ))
            print(f"[UPDATED] ID {course_id:>2}: {c['title']} ({c['duration']}) -> slug: {c['slug']}")
        else:
            cur.execute("""
                INSERT INTO courses (
                    title, slug, description, duration, tech_stack, headline, badge,
                    mode, certificate, highlights, basic_plan, advanced_plan, image_url
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (
                c["title"],
                c["slug"],
                c["description"],
                c["duration"],
                tech_stack_json,
                c["headline"],
                c["badge"],
                c["mode"],
                c["certificate"],
                highlights_json,
                basic_plan_json,
                advanced_plan_json,
                c["image_url"]
            ))
            new_id = cur.fetchone()[0]
            print(f"[INSERTED] ID {new_id:>2}: {c['title']} ({c['duration']}) -> slug: {c['slug']}")

    # Print summary of all courses currently in database
    print("\n--------------------------------------------------")
    print("CURRENT COURSES IN DATABASE:")
    print("--------------------------------------------------")
    cur.execute("""
        SELECT id, title, slug, duration,
               (basic_plan->>'duration') as b_dur,
               (advanced_plan->>'duration') as a_dur
        FROM courses
        ORDER BY id ASC
    """)
    rows = cur.fetchall()
    for r in rows:
        plans = []
        if r[4]:
            plans.append(f"Basic: {r[4]}")
        if r[5]:
            plans.append(f"Advanced: {r[5]}")
        plans_str = ", ".join(plans) if plans else "Single plan"
        print(f"ID {r[0]:>2} | {r[1]:<45} | {r[3]:<12} | {plans_str}")

    print("--------------------------------------------------")
    print(f"SUCCESS: {len(rows)} courses active in the database.")
    print("==================================================")

    cur.close()
    release_conn(conn)


if __name__ == "__main__":
    seed()
