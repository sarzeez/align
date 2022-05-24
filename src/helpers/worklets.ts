type Point = {
  x: number;
  y: number;
};

type Point3d = {
  x: number;
  y: number;
  z: number;
};

// Возвращает true, если a <= value <= b
export const isBetween = (value: number, a: number, b: number) => {
  "worklet";
  return (a <= value && value <= b);
}

// Возвращает value, если min <= value <= b, min, если value < min и max, если value > max
export const clamp = (value: number, min: number, max: number) => {
  "worklet";
  return Math.min(Math.max(value, min), max);
}

export const vectorsEqual = (a: Point, b: Point) => {
  "worklet";
  return (a.x === b.x && a.y === b.y);
}

// Возвращает расстояние между двумя точками на плоскости
export const distance = (a: Point, b: Point) => {
  "worklet";
  const ΔX = b.x - a.x;
  const ΔY = b.y - a.y;

  return Math.sqrt(ΔX ** 2 + ΔY ** 2);
}

// Возвращает расстояние между двумя точками в пространстве
export const distance3d = (a: Point3d, b: Point3d) => {
  "worklet";
  const ΔX = b.x - a.x;
  const ΔY = b.y - a.y;
  const ΔZ = b.z - a.z;

  return Math.sqrt(ΔX ** 2 + ΔY ** 2 + ΔZ ** 2);
}