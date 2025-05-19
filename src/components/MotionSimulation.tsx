import React, { useEffect, useRef, useState } from "react";
import { Car } from "lucide-react";
import { MotionData, DataPoint } from "../types/motion";

interface MotionSimulationProps {
  data: MotionData;
  isRunning: boolean;
  onDataPoint: (point: DataPoint) => void;
  color: string;
  trackLength: number;
  onFinish: () => void;
}

export const MotionSimulation: React.FC<MotionSimulationProps> = ({
  data,
  isRunning,
  onDataPoint,
  color,
  trackLength,
  onFinish,
}) => {
  const [position, setPosition] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);
  const lastTimeRef = useRef<number | null>(null);
  const animationFrameRef = useRef<number>();
  const hasFinishedRef = useRef(false);

  useEffect(() => {
    if (!isRunning || hasFinishedRef.current) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      lastTimeRef.current = null;
      return;
    }

    const animate = (currentTime: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = currentTime;
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const deltaTime = (currentTime - lastTimeRef.current) / 1000;
      const newTime = elapsedTime + deltaTime;

      let newPosition = 0;
      let currentVelocity = 0;

      if (data.type === "GLB") {
        newPosition = data.initialVelocity * newTime;
        currentVelocity = data.initialVelocity;
      } else {
        newPosition =
          data.initialVelocity * newTime +
          0.5 * data.acceleration * newTime ** 2;
        currentVelocity = data.initialVelocity + data.acceleration * newTime;
      }

      if (newPosition >= trackLength) {
        newPosition = trackLength;
        currentVelocity = 0;
        hasFinishedRef.current = true;
        onFinish();
      }

      setElapsedTime(newTime);
      setPosition(newPosition);

      onDataPoint({
        time: newTime,
        position: newPosition,
        velocity: currentVelocity,
      });

      lastTimeRef.current = currentTime;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = null;
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isRunning, elapsedTime, data, trackLength, onDataPoint, onFinish]);

  // Reset on remount
  useEffect(() => {
    setElapsedTime(0);
    setPosition(0);
    hasFinishedRef.current = false;
  }, []);

  const positionPercentage = Math.min((position / trackLength) * 100, 100);
  // 100 = (80 / 200) * 100 = 40

  return (
    <div className="w-full h-24 bg-gray-100 rounded-lg relative overflow-hidden">
      <div
        className="absolute transition-all duration-200 ease-linear"
        style={{
          left: `${positionPercentage}%`,
          bottom: "20%",
          transform: "translateX(-50%)",
        }}
      >
        <Car className={`w-8 h-8  relative left-4 ${color}`} />
      </div>

      <div className="absolute bottom-0 w-full h-2 bg-gray-300" />
    </div>
  );
};
