import { useMediaQuery } from 'react-responsive';
import { useGLTF } from '@react-three/drei';
import React, { useEffect } from 'react';
import * as THREE from 'three';

interface BooksProps {
  scale: number;
  position: number[];
  rotation: number[];
}

const Books: React.FC<BooksProps> = (props) => {
  const mobile = useMediaQuery({ query: '(max-width: 768px), (pointer: coarse)' });
  const { nodes, materials } = useGLTF(mobile ? '/models/books_mobile.glb' : '/models/books.glb');

  useEffect(() => {
    // Lighten open book pages for clear contrast in light theme
    if (materials.Open_book_Mat) {
      const mat = materials.Open_book_Mat as THREE.MeshStandardMaterial;
      mat.roughness = 0.45;
      mat.metalness = 0.05;
      mat.toneMapped = true;
    }
    // Enhance magnifier glass and brass trim
    if (materials.Magnifier) {
      const magMat = materials.Magnifier as THREE.MeshStandardMaterial;
      magMat.roughness = 0.2;
      magMat.metalness = 0.6;
    }
    // Enhance stacked leather books
    if (materials.Book_1_Mat) (materials.Book_1_Mat as THREE.MeshStandardMaterial).roughness = 0.5;
    if (materials.Book_2_Mat) (materials.Book_2_Mat as THREE.MeshStandardMaterial).roughness = 0.5;
    if (materials.Book_3_Mat) (materials.Book_3_Mat as THREE.MeshStandardMaterial).roughness = 0.5;
  }, [materials]);

  return (
    <group 
      scale={props.scale} 
      position={new THREE.Vector3(...props.position)} 
      rotation={new THREE.Euler(...props.rotation)} 
      dispose={null}
    >
      <group scale={0.01}>
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Magnifier_Magnifier_0 as THREE.Mesh).geometry}
          material={materials.Magnifier}
          position={[-1.018, 3.294, -4.697]}
          rotation={[-1.58, 0.006, -0.544]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Open_book_Open_book_Mat_0 as THREE.Mesh).geometry}
          material={materials.Open_book_Mat}
          position={[0, 0, -4.723]}
          rotation={[-Math.PI / 2, 0, -Math.PI]}
          scale={100}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Book_3_Book_3_Mat_0 as THREE.Mesh).geometry}
          material={materials.Book_3_Mat}
          position={[7.947, 6.977, 24.666]}
          rotation={[Math.PI, -1.164, 0]}
          scale={75}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Book_2_Book_2_Mat_0 as THREE.Mesh).geometry}
          material={materials.Book_2_Mat}
          position={[19.832, 0, 9.66]}
          rotation={[-Math.PI / 2, 0, -2.055]}
          scale={75}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={(nodes.Book_1_Book_1_Mat_0 as THREE.Mesh).geometry}
          material={materials.Book_1_Mat}
          position={[1.245, 2.425, 17.906]}
          rotation={[Math.PI, 1.426, 0]}
          scale={75}
        />
      </group>
    </group>
  );
}


export default Books;
