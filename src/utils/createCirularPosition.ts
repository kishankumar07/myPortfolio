// src/utils/positions.ts
export const createCircularPositions = (radius: number, count: number) => {
      const positions: [number, number, number][] = [];
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;
        positions.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius]);
      }
      return positions;
    };
    