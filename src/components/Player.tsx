import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Mesh, Vector3 } from "three";
import { useKeyboard } from "../hooks/useKeyboard";

const JUMP_HEIGHT = 4;

export const Player = () => {
    // handle keyboard input
    const actions = useKeyboard();

    // get the camera and set the position
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

        // Move the player
        if (actions.jump && Math.abs(vel.current[1]) < 0.05) {
            api.velocity.set(vel.current[0], JUMP_HEIGHT, vel.current[2]);
        }
    });

    return <mesh ref={ref}></mesh>;
};
