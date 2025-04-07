export interface MotionData {
  id: string;
  type: "GLB" | "GLBB";
  initialVelocity: number;
  acceleration: number;
  time: number;
  position: number;
  currentVelocity: number;
  name: string;
  trackLength: number;
}

export interface DataPoint {
  time: number;
  position: number;
  velocity: number;
}

export interface GraphData {
  time: number[];
  position: number[];
  velocity: number[];
}
