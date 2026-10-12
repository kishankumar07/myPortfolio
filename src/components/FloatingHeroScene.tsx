import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { ContactShadows, OrbitControls, useGLTF } from '@react-three/drei';
import { type ThreeEvent, useFrame, useThree } from '@react-three/fiber';
import { useMediaQuery } from 'react-responsive';
import { Group, OrthographicCamera, Plane, Vector3 } from 'three';
import SceneCanvas from './SceneCanvas';
import { TbHandMove, TbRotate360, TbRefresh, TbSparkles } from 'react-icons/tb';

function FloatingObject({ name, position, scale = 1, phase = 0, reduced = false, activeDrags, mobile = false }: { name: string; position: [number, number, number]; scale?: number; phase?: number; reduced?: boolean; activeDrags: Set<number>; mobile?: boolean }) {
  const { scene } = useGLTF('/models/kta-floating-world.glb');
  const object = useMemo(() => scene.getObjectByName(name)!.clone(true), [scene, name]);
  const anchor = useRef<Group>(null);
  const animated = useRef<Group>(null);
  const time = useRef(0);
  const drag = useRef<{ id: number; plane: Plane; offset: Vector3 } | null>(null);
  const { camera, controls, gl, invalidate } = useThree();
  const orbit = controls as { enabled: boolean } | null;
  const release = (id: number) => {
    if (drag.current?.id !== id) return;
    activeDrags.delete(id); drag.current = null;
    if (orbit && activeDrags.size === 0 && !mobile) orbit.enabled = true;
    gl.domElement.style.cursor = 'grab';
  };
  useEffect(() => {
    const end = (event: PointerEvent) => release(event.pointerId);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    return () => {
      window.removeEventListener('pointerup', end);
      window.removeEventListener('pointercancel', end);
      if (drag.current) activeDrags.delete(drag.current.id);
      if (orbit && activeDrags.size === 0 && !mobile) orbit.enabled = true;
    };
  });
  const down = (event: ThreeEvent<PointerEvent>) => {
    if (mobile || !anchor.current || drag.current || event.button !== 0) return;
    event.stopPropagation();
    const plane = new Plane().setFromNormalAndCoplanarPoint(camera.getWorldDirection(new Vector3()), anchor.current.position);
    const hit = event.ray.intersectPlane(plane, new Vector3());
    if (!hit) return;
    drag.current = { id: event.pointerId, plane, offset: anchor.current.position.clone().sub(hit) };
    activeDrags.add(event.pointerId);
    if (orbit) orbit.enabled = false;
    (event.target as unknown as { setPointerCapture: (id: number) => void }).setPointerCapture(event.pointerId);
    gl.domElement.style.cursor = 'grabbing';
  };
  const move = (event: ThreeEvent<PointerEvent>) => {
    if (!drag.current || drag.current.id !== event.pointerId || !anchor.current) return;
    event.stopPropagation();
    const hit = event.ray.intersectPlane(drag.current.plane, new Vector3());
    if (!hit) return;
    const next = hit.add(drag.current.offset);
    const projected = next.clone().project(camera);
    if (Math.abs(projected.x) < .88 && Math.abs(projected.y) < .88) anchor.current.position.copy(next);
    invalidate();
  };
  useFrame((_, delta) => {
    if (!animated.current || reduced) return;
    time.current += Math.min(delta, 0.05);
    const t = time.current;
    animated.current.position.y = Math.sin(t * (name === 'FloatingDiamond' ? 1.15 : .8) + phase) * (name === 'Desk' ? .07 : .2);
    animated.current.rotation.y = name === 'Desk' ? Math.sin(t * .24) * .045 : t * (name === 'Spiral' ? .45 : .28) + phase;
    if (name === 'FloatingCube') animated.current.rotation.x = t * .23;
    if (name === 'FloatingDiamond' || name === 'Spiral') animated.current.rotation.z = Math.sin(t * .6 + phase) * .12;
  });
  return <group ref={anchor} position={position} onPointerDown={down} onPointerMove={move} onPointerUp={(event) => { event.stopPropagation(); release(event.pointerId); }}>
    <group ref={animated} scale={scale}><primitive object={object} /></group>
    {name === 'Desk' && <ContactShadows position={[0, -.15, 0]} opacity={.32} scale={12} blur={2.7} far={5} resolution={256} frames={1} />}
  </group>;
}

function Framing({ mobile }: { mobile: boolean }) {
  const { camera, size, gl, invalidate } = useThree();
  useEffect(() => {
    if (!(camera instanceof OrthographicCamera)) return;
    camera.zoom = mobile ? Math.min(size.width / 7.4, size.height / 15) : Math.min(size.width / 15.8, size.height / 8.5);
    camera.updateProjectionMatrix();
    gl.domElement.style.touchAction = 'pan-y';
    invalidate();
  }, [camera, size.width, size.height, mobile, gl, invalidate]);
  return null;
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <div className="floating-hero-fallback">Explore my experience below</div> : this.props.children; }
}

export default function FloatingHeroScene() {
  const [revision, setRevision] = useState(0);
  const activeDrags = useRef(new Set<number>()).current;
  const mobile = useMediaQuery({ maxWidth: 768 });
  const reduced = useMediaQuery({ query: '(prefers-reduced-motion: reduce)' });
  return <>{!mobile && <aside className="playground-guide" aria-label="How to play with the 3D scene">
    <div className="playground-guide-heading"><span><TbSparkles aria-hidden="true" /> 3D PLAYGROUND</span><strong>Go on. Grab something.</strong></div>
    <div className="playground-guide-actions">
      <div className="playground-cue"><TbHandMove aria-hidden="true" /><span><strong>Grab & move</strong><small>Drag any object</small></span></div>
      <div className="playground-cue"><TbRotate360 aria-hidden="true" /><span><strong>Spin the view</strong><small>Drag empty space</small></span></div>
      <button className="playground-reset" aria-label="Reset objects" onClick={() => setRevision(value => value + 1)}><TbRefresh aria-hidden="true" /><span><strong>Start fresh</strong><small>Reset the scene</small></span></button>
    </div>
  </aside>}<SceneBoundary><Suspense fallback={null}><SceneCanvas key={revision} orthographic camera={{ position: [0, 3.4, 12], zoom: 70, near: 0.01, far: 100 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={1.6} />
    <directionalLight position={[4, 8, 6]} intensity={2.8} />
    <directionalLight position={[-5, 4, 2]} intensity={1.7} color="#dcecff" />
    <directionalLight position={[2, 5, -4]} intensity={2} color="#e4cfff" />
    <hemisphereLight args={['#ffffff', '#b7c6da', 1]} />
    <FloatingObject name="Desk" position={mobile ? [0, -4.1, 0] : [3.1, -2.2, 0]} scale={mobile ? 1.45 : 1.75} reduced={reduced} activeDrags={activeDrags} mobile={mobile} />
    <FloatingObject name="ReactSymbol" position={mobile ? [2.5, -1.4, 0] : [5.8, 2.1, 0]} scale={1.05} phase={0.2} reduced={reduced} activeDrags={activeDrags} mobile={mobile} />
    <FloatingObject name="Spiral" position={mobile ? [-2.7, -1.4, 0] : [-5.9, 2.65, -1]} scale={mobile ? 0.7 : 1} phase={1} reduced={reduced} activeDrags={activeDrags} mobile={mobile} />
    <FloatingObject name="FloatingDiamond" position={mobile ? [-2.6, -5.7, 0] : [-6.5, -3.5, 0]} scale={0.85} phase={2} reduced={reduced} activeDrags={activeDrags} mobile={mobile} />
    <FloatingObject name="FloatingCube" position={mobile ? [2.8, -5.5, 0] : [6.4, -2.5, 1]} scale={1} phase={0.6} reduced={reduced} activeDrags={activeDrags} mobile={mobile} />
    <OrbitControls makeDefault enabled={!mobile} target={[0, 0, 0]} enablePan={false} enableZoom={false} enableDamping dampingFactor={0.055} minPolarAngle={Math.PI / 3} maxPolarAngle={Math.PI / 2.1} />
    <Framing mobile={mobile} />
  </SceneCanvas></Suspense></SceneBoundary></>;
}
