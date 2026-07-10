import { motion } from "framer-motion";

const CEOCard = ({ name, role, description, image }) => {
  const imageUrl = image || "/testimonials/ceo-potriat.png";

  const stats = [
    { value: "15+", label: "Years Experience" },
    { value: "200+", label: "Projects Led" },
    { value: "200+", label: "Team Members" },
  ];

  return (
    <div className="w-full max-w-[860px] mx-auto mb-10 relative px-0 sm:px-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative w-full rounded-[1.5rem] sm:rounded-[2rem] overflow-hidden bg-[#121b18] shadow-xl flex flex-col md:flex-row"
      >
        {/* Light green background layer */}
        <div className="absolute top-0 left-0 right-0 bottom-[14%] sm:bottom-[16%] md:bottom-[18%] bg-[#ecfdf5] rounded-bl-[2.5rem] rounded-br-[2.5rem] md:rounded-bl-[4rem] md:rounded-br-[4rem] z-0" />

        {/* Content Layer */}
        <div className="relative z-10 w-full flex flex-col md:flex-row">

          {/* ── Image area (top on mobile, right on desktop) ── */}
          <div className="order-1 md:order-2 w-full md:flex-1 relative flex items-end justify-center md:justify-end z-10
            h-[260px] sm:h-[300px] md:h-auto md:min-h-[420px] lg:min-h-[440px]
            pt-5 sm:pt-6 md:pt-7 md:pr-8 lg:pr-12 overflow-hidden">

            {/* Dark Circle */}
            <div className="absolute
              left-1/2 -translate-x-1/2 top-4
              sm:left-1/2 sm:-translate-x-1/2 sm:top-4
              md:left-auto md:translate-x-0 md:right-[18%] md:top-[4%]
              w-[44vw] h-[44vw]
              sm:w-52 sm:h-52
              md:w-52 md:h-52
              max-w-[220px] max-h-[220px]
              rounded-full bg-[#1a2e26] z-0 shadow-lg" />

            {/* Green pill */}
            <div className="absolute
              left-1/2 -translate-x-1/2
              bottom-3 sm:bottom-4
              md:left-auto md:translate-x-0 md:right-[0%] md:bottom-[14%]
              w-[38vw] sm:w-48 md:w-[16rem]
              h-20 sm:h-28 md:h-44
              max-w-[200px]
              rounded-full bg-primary z-0" />

            {/* Small rotated square icon */}
            <div className="absolute
              right-[12%] sm:right-[14%] md:right-8 lg:right-10
              top-4 sm:top-5 md:top-10
              w-7 h-7 sm:w-9 sm:h-9 md:w-11 md:h-11
              border-4 border-primary/80 rounded-[10px] opacity-80 -rotate-12 z-10" />

            {/* CEO Photo */}
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-20 flex items-end justify-center
                w-[52vw] sm:w-[220px] md:w-[78%] lg:w-[80%]
                max-w-[260px] md:max-w-none
                h-full"
            >
              <img
                src={imageUrl}
                alt={name}
                className="w-full h-full object-contain object-bottom"
              />
            </motion.div>
          </div>

          {/* ── Text + stats (bottom on mobile, left on desktop) ── */}
          <div className="order-2 md:order-1 flex-1 min-w-0 p-5 sm:p-7 md:p-10 flex flex-col items-center md:items-start justify-between text-center md:text-left z-20">
            <div className="w-full min-w-0">
              <h2 className="text-[#1a1a1a] text-[clamp(1.45rem,6vw,2.2rem)] md:text-[clamp(1.85rem,3.6vw,2.2rem)] font-black uppercase leading-[1.08] tracking-tight mb-2 sm:mb-3 whitespace-nowrap">
                {name}
              </h2>
              <h3 className="text-[#3b3b3b] text-[0.7rem] sm:text-sm md:text-[1.02rem] tracking-[0.2em] uppercase mb-3 sm:mb-4 font-medium">
                {role}
              </h3>
              <p className="text-[#4a4a4a] text-xs sm:text-sm md:text-sm max-w-md leading-relaxed font-medium mb-5 md:mb-6 text-justify">
                {description}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2 md:gap-3 w-full relative z-30 md:mt-[-44px]">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-primary text-white px-2 sm:px-3 md:px-5 py-2.5 md:py-3 rounded-full font-bold flex flex-col items-center justify-center gap-0.5 min-h-[64px] sm:min-h-[72px] md:min-h-[78px] w-full"
                >
                  <span className="text-sm sm:text-[0.92rem] md:text-[1rem] leading-none">{stat.value}</span>
                  <span className="text-[0.55rem] sm:text-[0.65rem] md:text-xs font-medium leading-tight text-center">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
};

export default CEOCard;
