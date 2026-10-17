import React from "react";
import { ArrowDown, Flame, Clock } from "lucide-react";

/**
 * Parses numeric price from strings like "₹18,990", "18990", "18,990"
 */
export function parseNumericPrice(str) {
  if (!str) return null;
  const cleaned = String(str).replace(/[^0-9.]/g, "");
  const num = parseFloat(cleaned);
  return Number.isNaN(num) ? null : num;
}

/**
 * Formats a number to Indian Rupees format with ₹ symbol
 */
export function formatRupees(num) {
  if (num === null || num === undefined || Number.isNaN(num)) return "";
  return "₹" + Number(num).toLocaleString("en-IN");
}

/**
 * Checks if an offer is currently active and not expired
 */
export function isOfferValid(course) {
  if (!course) return false;
  const active = Boolean(course.offerActive ?? course.offer_active ?? course.active);
  if (!active) return false;

  const offerPrice = course.offerPrice ?? course.offer_price;
  const originalPrice = course.originalPrice ?? course.original_price;
  const discountPercent = course.discountPercent ?? course.discount_percent;
  const offerMessage = course.offerMessage ?? course.offer_message ?? course.message;
  const offerBadge = course.offerBadge ?? course.offer_badge ?? course.badge;

  const hasOffer =
    (offerPrice && String(offerPrice).trim() !== "") ||
    (originalPrice && String(originalPrice).trim() !== "") ||
    (!Number.isNaN(Number(discountPercent)) && Number(discountPercent) > 0) ||
    (offerMessage && String(offerMessage).trim() !== "") ||
    (offerBadge && String(offerBadge).trim() !== "");

  if (!hasOffer) return false;

  const deadline = course.offerDeadline ?? course.offer_deadline ?? course.deadline;
  if (deadline && String(deadline).trim() !== "") {
    const end = new Date(deadline);
    if (!Number.isNaN(end.getTime())) {
      // If deadline date string is YYYY-MM-DD without time, compare until end of that day
      if (String(deadline).length === 10) {
        end.setHours(23, 59, 59, 999);
      }
      if (new Date() > end) {
        return false; // Offer has expired
      }
    }
  }
  return true;
}

/**
 * Formats human-friendly deadline string (e.g. "Ends in 2 days" or "Ends on 25 Oct 2026")
 */
export function getOfferDeadlineLabel(deadlineStr) {
  if (!deadlineStr || String(deadlineStr).trim() === "") return null;
  const end = new Date(deadlineStr);
  if (Number.isNaN(end.getTime())) return null;

  if (String(deadlineStr).length === 10) {
    end.setHours(23, 59, 59, 999);
  }

  const now = new Date();
  const diffMs = end.getTime() - now.getTime();
  if (diffMs <= 0) return "Offer expired";

  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays > 0) {
    return `Ends in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
  } else if (diffHours > 0) {
    return `Ends in ${diffHours} hr${diffHours > 1 ? "s" : ""}`;
  } else {
    const diffMins = Math.floor(diffMs / (1000 * 60));
    return `Ends in ${Math.max(1, diffMins)} min${diffMins > 1 ? "s" : ""}`;
  }
}

/**
 * CourseOfferPriceDisplay
 * Renders the exact UI from the provided image:
 * [Top Discount of the Sale] purple badge
 * ↓XX% (green with downward arrow)  ORIGINAL_PRICE (struck through)  OFFER_PRICE (bold black/white)
 * + deadline chip if present
 */
export default function CourseOfferPriceDisplay({
  offerBadge = "Top Discount of the Sale",
  offerMessage = "",
  discountPercent: explicitDiscount = null,
  offerPrice,
  originalPrice,
  offerDeadline,
  size = "md", // "sm" | "md" | "lg"
  className = "",
  showDeadline = true,
}) {
  const numOffer = parseNumericPrice(offerPrice);
  const numOriginal = parseNumericPrice(originalPrice);

  let discountPercent = null;
  if (explicitDiscount !== null && explicitDiscount !== undefined && Number(explicitDiscount) > 0) {
    discountPercent = Number(explicitDiscount);
  } else if (numOffer && numOriginal && numOriginal > numOffer) {
    discountPercent = Math.round(((numOriginal - numOffer) / numOriginal) * 100);
  }

  // If discountPercent is provided by admin and offerPrice is not set, calculate offerPrice automatically
  let calculatedOffer = offerPrice;
  if ((!offerPrice || String(offerPrice).trim() === "") && numOriginal && discountPercent) {
    const discounted = Math.round(numOriginal * (1 - discountPercent / 100));
    calculatedOffer = formatRupees(discounted);
  }

  const formattedOffer = typeof calculatedOffer === "string" && calculatedOffer.includes("₹")
    ? calculatedOffer
    : (parseNumericPrice(calculatedOffer) ? formatRupees(parseNumericPrice(calculatedOffer)) : calculatedOffer);

  const formattedOriginal = typeof originalPrice === "string" && originalPrice.includes("₹")
    ? originalPrice
    : (numOriginal ? formatRupees(numOriginal) : originalPrice);

  const deadlineLabel = showDeadline ? getOfferDeadlineLabel(offerDeadline) : null;

  const isSmall = size === "sm";
  const isLarge = size === "lg";

  const displayBadge = offerMessage || offerBadge;

  return (
    <div className={`inline-flex flex-col items-start gap-1 ${className}`}>
      {/* Badge: Vijayadasami offer / Offer Message or Badge */}
      {displayBadge && (
        <span
          className={`inline-flex items-center gap-1 font-bold text-white rounded-full tracking-tight bg-[#8a0bd6] dark:bg-[#9914ec] shadow-sm ${
            isSmall
              ? "text-[9px] px-2 py-0.5"
              : isLarge
              ? "text-xs px-3.5 py-1"
              : "text-[10px] sm:text-[11px] px-2.5 py-0.5"
          }`}
        >
          <Flame className={isSmall ? "w-2.5 h-2.5" : "w-3 h-3"} />
          <span>{displayBadge}</span>
        </span>
      )}

      {/* Main Pricing Row */}
      <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
        {/* Discount with Down Arrow: ↓33% in green */}
        {discountPercent !== null && (
          <span
            className={`font-black tracking-tight text-[#0d8744] dark:text-[#22c55e] inline-flex items-center leading-none ${
              isSmall
                ? "text-base sm:text-lg"
                : isLarge
                ? "text-2xl sm:text-3xl"
                : "text-xl sm:text-2xl"
            }`}
          >
            <ArrowDown
              className={`stroke-[3.5] mr-0.5 ${
                isSmall ? "w-3.5 h-3.5" : isLarge ? "w-5 h-5" : "w-4 h-4"
              }`}
            />
            <span>{discountPercent}%</span>
          </span>
        )}

        {/* Original Price with strikethrough (grey text) */}
        {formattedOriginal && (
          <span
            className={`line-through font-bold text-neutral-500 dark:text-neutral-400 decoration-neutral-500/80 leading-none ${
              isSmall
                ? "text-xs sm:text-sm"
                : isLarge
                ? "text-lg sm:text-xl"
                : "text-sm sm:text-base"
            }`}
          >
            {formattedOriginal}
          </span>
        )}

        {/* Offer Price: Bold, prominent ₹ price */}
        {formattedOffer && (
          <span
            className={`font-black font-display text-neutral-900 dark:text-white leading-none tracking-tight ${
              isSmall
                ? "text-lg sm:text-xl"
                : isLarge
                ? "text-2xl sm:text-3xl md:text-4xl"
                : "text-xl sm:text-2xl md:text-3xl"
            }`}
          >
            {formattedOffer}
          </span>
        )}
      </div>

      {/* Deadline countdown badge if provided */}
      {deadlineLabel && (
        <div className="inline-flex items-center gap-1 text-[10px] font-semibold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800/60 px-2 py-0.5 rounded-md mt-0.5">
          <Clock className="w-2.5 h-2.5 shrink-0" />
          <span>{deadlineLabel}</span>
          {offerDeadline && (
            <span className="text-[9px] text-muted-foreground ml-1">
              (valid till {new Date(offerDeadline).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })})
            </span>
          )}
        </div>
      )}
    </div>
  );
}
