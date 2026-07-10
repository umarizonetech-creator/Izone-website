import { useState } from "react";
import { Users } from "lucide-react";

const DepartmentCard = ({ name, description, members = [], teamMembers = [] }) => {
  const [flipped, setFlipped] = useState(false);

  // members is array of names (strings)
  const memberList = Array.isArray(members) ? members : [];

  // Try to match names to teamMembers for avatars
  const resolvedMembers = memberList.map((memberName) => {
    const found = teamMembers.find(
      (tm) => tm.name?.toLowerCase().trim() === String(memberName).toLowerCase().trim()
    );
    return { name: memberName, avatar: found?.avatar || "", role: found?.role || "" };
  });

  return (
    <div
      className="relative w-full md:min-h-[270px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((v) => !v)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          minHeight: "270px",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 glass-card p-6 flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 shrink-0">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h3 className="font-display font-bold text-lg text-foreground mb-2 leading-tight">{name}</h3>
          <p className="text-muted-foreground text-xs leading-relaxed line-clamp-5 flex-1">{description}</p>
          <div className="mt-4 flex items-center gap-1.5">
            <span className="text-sm text-primary font-semibold">{memberList.length} member{memberList.length !== 1 ? "s" : ""}</span>
            <span className="text-sm text-muted-foreground">· tap to view</span>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 glass-card bg-primary/5 border border-primary/20 flex flex-col"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="px-5 pt-5 pb-2 shrink-0 border-b border-primary/10">
            <h3 className="font-display font-bold text-base text-primary">{name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{memberList.length} member{memberList.length !== 1 ? "s" : ""}</p>
          </div>
          <div className="flex-1 overflow-y-auto px-5 py-3 space-y-2.5">
            {resolvedMembers.length === 0 ? (
              <p className="text-sm text-muted-foreground">No members added.</p>
            ) : (
              resolvedMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs shrink-0 overflow-hidden">
                    {m.avatar && (m.avatar.startsWith("data:") || m.avatar.startsWith("http") || m.avatar.startsWith("/")) ? (
                      <img src={m.avatar} alt={m.name} className="w-full h-full object-cover" />
                    ) : (
                      <span>{m.avatar || String(m.name).slice(0, 2).toUpperCase()}</span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{m.name}</p>
                    {m.role && <p className="text-xs text-muted-foreground truncate">{m.role}</p>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
