import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { useThree } from '@react-three/fiber';
import { Box3, Group, MathUtils, Mesh, PerspectiveCamera, Vector3 } from 'three';
import type { OrbitControls } from 'three-stdlib';

/** Fit the projected model corners, rather than a large enclosing sphere.
 * Cache geometry bounds; only reframe on resize or an actual camera rotation.
 */
export default function FitScene({ children, margin = 1.08 }: { children: ReactNode; margin?: number }) {
  const group = useRef<Group>(null);
  const previousCenter = useRef<Vector3>();
  const { camera, controls, size, invalidate } = useThree();

  useLayoutEffect(() => {
    if (!group.current || !(camera instanceof PerspectiveCamera) || !size.width || !size.height) return;
    group.current.updateWorldMatrix(true, true);
    const box = new Box3().setFromObject(group.current);
    if (box.isEmpty()) return;
    const center = box.getCenter(new Vector3());
    const points: Vector3[] = [];
    group.current.traverse(object => {
      if (!(object instanceof Mesh)) return;
      const geometry = object.geometry;
      if (!geometry.boundingBox) geometry.computeBoundingBox();
      const bounds = geometry.boundingBox;
      if (!bounds) return;
      for (const x of [bounds.min.x, bounds.max.x]) {
        for (const y of [bounds.min.y, bounds.max.y]) {
          for (const z of [bounds.min.z, bounds.max.z]) {
            points.push(new Vector3(x, y, z).applyMatrix4(object.matrixWorld).sub(center));
          }
        }
      }
    });
    const verticalTangent = Math.tan(MathUtils.degToRad(camera.fov) / 2);
    const horizontalTangent = verticalTangent * size.width / size.height;
    const direction = previousCenter.current
      ? camera.position.clone().sub(previousCenter.current).normalize()
      : new Vector3(0, 0.36, 1).normalize();
    const right = new Vector3();
    const up = new Vector3();
    const orbit = controls as OrbitControls | null;
    let fitting = false;
    const fit = () => {
      if (fitting) return;
      fitting = true;
      right.crossVectors(camera.up, direction).normalize();
      up.crossVectors(direction, right).normalize();
      let distance = 0;
      for (const point of points) {
        const depth = point.dot(direction);
        distance = Math.max(distance,
          depth + Math.abs(point.dot(right)) * margin / horizontalTangent,
          depth + Math.abs(point.dot(up)) * margin / verticalTangent);
      }
      camera.position.copy(center).addScaledVector(direction, distance);
      camera.near = 0.01;
      camera.far = distance + box.getSize(new Vector3()).length() * 3;
      camera.lookAt(center);
      camera.updateProjectionMatrix();
      if (orbit) {
        orbit.target.copy(center);
        orbit.update();
      }
      fitting = false;
      invalidate();
    };
    const onRotate = () => {
      if (fitting) return;
      direction.copy(camera.position).sub(center).normalize();
      fit();
    };
    fit();
    previousCenter.current = center.clone();
    orbit?.addEventListener('change', onRotate);
    return () => orbit?.removeEventListener('change', onRotate);
  }, [camera, controls, size.width, size.height, children, margin, invalidate]);

  return <group ref={group}>{children}</group>;
}
