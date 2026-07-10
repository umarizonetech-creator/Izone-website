const ExpertCard = ({ name, role, avatar, bio, category }) => {
  const bioLines = Array.isArray(bio)
    ? bio
    : String(bio || "").split(/\r?\n/);

  return (
    <div className="glass-card w-full p-6 group flex flex-col relative overflow-hidden cursor-pointer shadow-lg transition-all duration-300">
      {/* Sliding Fill Background */}
      <div className="absolute inset-0 w-full h-full bg-primary -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0" />

      {/* Hover overlay */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 pointer-events-none group-hover:pointer-events-auto px-6">
        <h3 className="font-display font-bold text-xl text-primary-foreground text-center leading-tight">
          {name}
        </h3>
        <span className="text-primary-foreground/80 text-sm font-medium">{role}</span>
        {category && (
          <span className="px-3 py-1 rounded-full bg-white/20 text-primary-foreground text-xs font-semibold">
            {category}
          </span>
        )}
      </div>

      {/* Card Content (hidden on hover) */}
      <div className="flex items-center gap-4 mb-4 relative z-10 transition-all duration-300 group-hover:opacity-0">
        <div className="w-16 h-16 rounded-full bg-primary/20 flex flex-shrink-0 items-center justify-center text-primary font-display font-bold text-xl overflow-hidden transition-all duration-300">
          {avatar && (avatar.startsWith("data:") || avatar.startsWith("http") || avatar.startsWith("/") || avatar.startsWith("blob:")) ? (
            <img src={avatar} alt={name} className="w-full h-full object-cover" />
          ) : (
            <span>{avatar || name?.slice(0, 2)?.toUpperCase()}</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-base text-foreground transition-all duration-300 delay-100 leading-tight line-clamp-2">{name}</h3>
          <span className="text-primary text-sm font-medium transition-all duration-300 delay-100 block truncate">{role}</span>
          {category && (
            <div className="mt-1">
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                {category}
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 space-y-2 text-left text-sm leading-relaxed text-muted-foreground transition-all duration-300 delay-150 group-hover:opacity-0">
        {bioLines
          .map((line) => String(line).trim())
          .filter(Boolean)
          .map((line, index) => (
            <p key={index}>{line}</p>
          ))}
      </div>
    </div>
  );
};

export default ExpertCard;
