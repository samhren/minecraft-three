import { usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { Mesh, NearestFilter, RepeatWrapping } from "three";
import { groundTexture } from "../images/textures";

export const Ground = () => {
    const [ref] = usePlane(
        () => ({
            rotation: [-Math.PI / 2, 0, 0],
            position: [0, 0, 0],
        }),
        useRef<Mesh>(null)
    );

    groundTexture.magFilter = NearestFilter;
    groundTexture.wrapS = groundTexture.wrapT = RepeatWrapping;
    groundTexture.repeat.set(100, 100);

    return (
        <mesh ref={ref}>
            <planeBufferGeometry attach="geometry" args={[100, 100]} />
            <meshStandardMaterial attach="material" map={groundTexture} />
        </mesh>
    );
};
