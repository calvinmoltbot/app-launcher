"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, type PanInfo } from "framer-motion";

interface ScreenshotCarouselProps {
  screenshots: string[];
  appName: string;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) =>
  Math.abs(offset) * velocity;

export function ScreenshotCarousel({
  screenshots,
  appName,
}: ScreenshotCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const paginate = (direction: number) => {
    setCurrentIndex((prev) => {
      const next = prev + direction;
      if (next < 0) return 0;
      if (next >= screenshots.length) return screenshots.length - 1;
      return next;
    });
  };

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    const swipe = swipePower(info.offset.x, info.velocity.x);
    if (swipe < -swipeConfidenceThreshold) {
      paginate(1);
    } else if (swipe > swipeConfidenceThreshold) {
      paginate(-1);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
      className="mb-5 w-full flex flex-col items-center"
    >
      {/* Carousel container */}
      <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[9/16] rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl">
        <motion.div
          className="flex h-full"
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
        >
          {screenshots.map((src, index) => (
            <div
              key={src}
              className="relative w-full h-full shrink-0"
            >
              <Image
                src={src}
                alt={`${appName} screenshot ${index + 1}`}
                fill
                className="object-contain pointer-events-none"
                sizes="360px"
                priority={index === 0}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Dot indicators */}
      {screenshots.length > 1 && (
        <div className="flex gap-1.5 mt-3">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex
                  ? "bg-primary"
                  : "bg-text-muted/40"
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
}
