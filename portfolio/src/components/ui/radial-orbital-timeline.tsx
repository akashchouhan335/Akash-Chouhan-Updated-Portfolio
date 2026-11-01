"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowRight, Link } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
  timelineData,
}: RadialOrbitalTimelineProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const leaveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounced hover: clear any pending close when re-entering
  const handleNodeEnter = useCallback((id: number) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredId(id);
    setAutoRotate(false);
  }, []);

  const handleNodeLeave = useCallback(() => {
    // Small delay so cursor can travel from icon → card without flickering
    leaveTimerRef.current = setTimeout(() => {
      setHoveredId(null);
      setAutoRotate(true);
    }, 150);
  }, []);

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
    };
  }, []);

  // Auto-rotation
  useEffect(() => {
    let rotationTimer: ReturnType<typeof setInterval>;

    if (autoRotate) {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => (prev + 0.3) % 360);
      }, 50);
    }

    return () => {
      if (rotationTimer) clearInterval(rotationTimer);
    };
  }, [autoRotate]);

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    const x = radius * Math.cos(radian);
    const y = radius * Math.sin(radian);

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Math.max(
      0.4,
      Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
    );

    return { x, y, angle, zIndex, opacity, radian };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToHovered = (itemId: number): boolean => {
    if (!hoveredId) return false;
    return getRelatedItems(hoveredId).includes(itemId);
  };

  return (
    <div
      className="w-full h-full min-h-[600px] flex flex-col items-center justify-center bg-[var(--color-bg)] overflow-hidden"
      ref={containerRef}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{ perspective: "1000px" }}
        >
          {/* Central glowing core */}
          <div className="absolute w-16 h-16 rounded-full bg-white/10 border border-white/20 animate-pulse flex items-center justify-center z-10 shadow-[0_0_40px_rgba(255,255,255,0.15)] backdrop-blur-md">
            <div className="absolute w-20 h-20 rounded-full border border-white/20 animate-ping opacity-70"></div>
            <div
              className="absolute w-24 h-24 rounded-full border border-white/10 animate-ping opacity-50"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div className="w-8 h-8 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
          </div>

          {/* Orbit ring */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-white/10"></div>

          {/* Nodes */}
          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isHovered = hoveredId === item.id;
            const isRelated = isRelatedToHovered(item.id);
            const isBottomHalf = position.y > 0;
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="absolute"
                style={{
                  transform: `translate(${position.x}px, ${position.y}px)`,
                  zIndex: isHovered ? 200 : position.zIndex,
                  opacity: isHovered ? 1 : position.opacity,
                  transition: "opacity 0.3s ease",
                }}
                onMouseEnter={() => handleNodeEnter(item.id)}
                onMouseLeave={handleNodeLeave}
              >
                {/* Glow behind node */}
                <div
                  className="absolute rounded-full pointer-events-none transition-all duration-300"
                  style={{
                    background: `radial-gradient(circle, rgba(255,255,255,${isHovered ? 0.3 : 0.15}) 0%, rgba(255,255,255,0) 70%)`,
                    width: "60px",
                    height: "60px",
                    left: "-10px",
                    top: "-10px",
                  }}
                />

                {/* Node circle */}
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center cursor-pointer
                    border-2 transition-all duration-300 relative z-10
                    ${
                      isHovered
                        ? "bg-white text-black border-white shadow-lg shadow-white/30 scale-125"
                        : isRelated
                        ? "bg-white/40 text-black border-white/80"
                        : "bg-black text-white border-white/40 hover:border-white/70"
                    }
                  `}
                >
                  <Icon size={16} />
                </div>

                {/* Title label - hidden when hovered to prevent overlap */}
                <div
                  className={`
                    absolute top-14 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider
                    transition-all duration-300 pointer-events-none
                    ${isHovered ? "opacity-0 translate-y-2" : "opacity-100 text-white/60"}
                  `}
                >
                  {item.title}
                </div>

                {/* Expanded card — rendered inside the same hover zone */}
                <div
                  className={`
                    absolute left-1/2 -translate-x-1/2 w-64 flex z-50
                    transition-all duration-300 
                    ${isBottomHalf ? "bottom-16 origin-bottom flex-col-reverse" : "top-16 origin-top flex-col"}
                    ${isHovered
                      ? "opacity-100 scale-100 pointer-events-auto"
                      : "opacity-0 scale-95 pointer-events-none"
                    }
                  `}
                >
                  {/* Connector line */}
                  <div className="w-px h-4 bg-white/30 mx-auto" />

                  <Card className="bg-black/90 backdrop-blur-lg border-white/20 shadow-xl shadow-white/5 overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex justify-end items-center">
                        <span className="text-[10px] font-mono text-white/50">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-1 text-white">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-white/80">
                      <p className="leading-relaxed">{item.content}</p>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-white/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-white/40 mr-2" />
                            <h4 className="text-[10px] uppercase tracking-wider font-medium text-white/40">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2.5 py-0 text-[10px] rounded border-white/10 bg-white/5 hover:bg-white/20 text-white/70 hover:text-white transition-all"
                                  onMouseEnter={() => handleNodeEnter(relatedId)}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={10}
                                    className="ml-1.5 opacity-50"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
