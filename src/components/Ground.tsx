import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import type { Mesh } from "three";

export const Ground = () => {
    const [ref] = usePlane(
        () => ({
            rotation: [0, 0, 0],
            position: [0, 0, 0],
        }),
        useRef<Mesh>(null)
    );

    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" color="hotpink" />
        </mesh>
    );
};
