import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollWorksSection({
  works,
  title = "Our Work",
  subtitle = "Case Studies",
  className = "",
}) {
  const sectionRef = useRef(null);
  const cardsContainerRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll(".portfolio-card");
    const mobileCards = section.querySelectorAll(".portfolio-mobile-card");

    const ctx = gsap.context(() => {
      // Animate desktop cards (3D rotation layout reveal)
      if (cards.length > 0) {
        gsap.fromTo(cards, 
          { opacity: 0, scale: 0.85, y: 70, rotationX: 12, transformPerspective: 1000 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            rotationX: 0,
            duration: 1.2,
            stagger: 0.18,
            ease: "power4.out",
            scrollTrigger: {
              trigger: cardsContainerRef.current || section,
              start: "top 85%",
              toggleActions: "play none none reverse",
            }
          }
        );
      }

      // Animate mobile cards individually as they scroll into view
      if (mobileCards.length > 0) {
        mobileCards.forEach((card) => {
          gsap.fromTo(card,
            { opacity: 0, y: 45 },
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 92%",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, [works]);

  return (
    <section ref={sectionRef} className={`relative pt-32 sm:pt-36 md:pt-40 pb-12 overflow-hidden flex flex-col items-center ${className}`}>
      <div className="container-custom w-full relative z-10 px-4 md:px-8">
        
        {/* Unified Premium Header Reveal */}
        <div className="section-header-reveal text-center mb-14 md:mb-24 flex flex-col items-center gap-2">
          <span className="reveal-badge font-['Dancing_Script'] text-primary text-3xl md:text-4xl font-bold -rotate-2">
            {title}
          </span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl uppercase tracking-tighter text-zinc-900 dark:text-white mt-1 overflow-hidden">
            <span className="reveal-title-line block overflow-hidden">
              <span className="inline-block" style={{ opacity: 0 }}>{subtitle}</span>
            </span>
          </h2>
        </div>

        <div className="md:hidden grid gap-4 w-full">
          {works.slice(0, 3).map((work, index) => (
            <div
              key={index}
              className="portfolio-mobile-card relative overflow-hidden rounded-[1.5rem] border border-border bg-card shadow-[0_18px_45px_rgba(0,0,0,0.12)] opacity-0"
            >
              <div
                className="h-[220px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${work.image})`,
                }}
              >
                <div className="h-full w-full bg-gradient-to-t from-black/55 via-black/20 to-transparent" />
              </div>
              <div className="p-5">
                <div className="text-[11px] uppercase tracking-[0.28em] text-primary/90 mb-2">
                  {work.category}
                </div>
                <h3 className="text-lg font-semibold text-foreground leading-tight">
                  {work.title}
                </h3>
                <div className="mt-4">
                  <Link
                    to="/portfolio"
                    className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground"
                  >
                    View Project
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div ref={cardsContainerRef} className="portfolio-cards-shell hidden md:flex justify-center items-center h-[380px] w-full">
          <div className="portfolio-cards">
            {works.slice(0, 3).map((work, index) => {
              const positions = ["one", "two", "three"];
              const posClass = positions[index] || "one";
              return (
                <div 
                  key={index}
                  className={`portfolio-card ${posClass}`}
                  style={{
                    backgroundImage: `url(${work.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0,
                  }}
                >
                  <div className="portfolio-cardDetails">
                    <div className="portfolio-cardDetailsHeader text-[#16a34a]">
                      <div className="text-[12px] uppercase tracking-wider mb-2 opacity-90 text-[#16a34a] leading-tight">{work.category}</div>
                      <div className="text-lg leading-snug">{work.title}</div>
                    </div>
                    <Link
                      to="/portfolio"
                      className="portfolio-cardDetailsButton text-[13px] px-5 py-2 inline-flex items-center justify-center"
                    >
                      View Project
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScrollWorksSection;
