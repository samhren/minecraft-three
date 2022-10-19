import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";

export const Player = () => {
    const { camera } = useThree();
    const [ref, api] = useSphere(
        () => ({
            mass: 1,
            type: "Dynamic",
            position: [0, 1, 0],
        }),
        useRef<Mesh>(null)
    );

    // Handle velocity
    const vel = useRef([0, 0, 0]);
    useEffect(() => {
        api.velocity.subscribe((v) => (vel.current = v));
    }, [api.velocity]);

    // Handle position
    const pos = useRef([0, 0, 0]);
    useEffect(() => {
        api.position.subscribe((p) => (pos.current = p));
    }, [api.position]);

    useFrame(() => {
        // Move the camera with the player
        camera.position.copy(
            new Vector3(pos.current[0], pos.current[1], pos.current[2])
        );
    });

    return <mesh ref={ref}></mesh>;
};
