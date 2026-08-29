"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type UniformValue = number | number[] | number[][];
type UniformType = "uniform1f" | "uniform1fv" | "uniform2f" | "uniform3fv";

type UniformDefinition = {
  value: UniformValue;
  type?: UniformType;
};

type Uniforms = Record<string, UniformDefinition>;

type CanvasRevealEffectProps = {
  /** 0.1 is slower; 1.0 is faster. */
  animationSpeed?: number;
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
};

export function CanvasRevealEffect({
  animationSpeed = 0.4,
  opacities = [0.3, 0.3, 0.3, 0.5, 0.5, 0.5, 0.8, 0.8, 0.8, 1],
  colors = [[0, 223, 130], [3, 98, 76], [255, 255, 255]],
  containerClassName,
  dotSize = 3,
  showGradient = true,
}: CanvasRevealEffectProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none relative h-full w-full overflow-hidden bg-[var(--surface-dark)]",
        containerClassName,
      )}
    >
      <Canvas className="absolute inset-0 h-full w-full" dpr={[1, 2]} gl={{ antialias: false }}>
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          shader={`
            float animation_speed_factor = ${animationSpeed.toFixed(1)};
            float intro_offset = distance(u_resolution / 2.0 / u_total_size, st2) * 0.01 + (random(st2) * 0.15);
            opacity *= step(intro_offset, u_time * animation_speed_factor);
            opacity *= clamp((1.0 - step(intro_offset + 0.1, u_time * animation_speed_factor)) * 1.25, 1.0, 1.25);
          `}
          center={["x", "y"]}
        />
      </Canvas>
      {showGradient ? (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--surface-dark)] via-[var(--surface-dark)]/70 to-transparent" />
      ) : null}
    </div>
  );
}

type DotMatrixProps = {
  colors: number[][];
  opacities: number[];
  totalSize?: number;
  dotSize: number;
  shader: string;
  center: ("x" | "y")[];
};

function DotMatrix({
  colors,
  opacities,
  totalSize = 4,
  dotSize,
  shader,
  center,
}: DotMatrixProps) {
  const uniforms = useMemo<Uniforms>(() => {
    let colorsArray = [colors[0], colors[0], colors[0], colors[0], colors[0], colors[0]];

    if (colors.length === 2) {
      colorsArray = [colors[0], colors[0], colors[0], colors[1], colors[1], colors[1]];
    } else if (colors.length >= 3) {
      colorsArray = [colors[0], colors[0], colors[1], colors[1], colors[2], colors[2]];
    }

    return {
      u_colors: {
        value: colorsArray.map((color) => color.map((channel) => channel / 255)),
        type: "uniform3fv",
      },
      u_opacities: { value: opacities, type: "uniform1fv" },
      u_total_size: { value: totalSize, type: "uniform1f" },
      u_dot_size: { value: dotSize, type: "uniform1f" },
    };
  }, [colors, dotSize, opacities, totalSize]);

  const source = useMemo(
    () => `
      precision mediump float;
      in vec2 fragCoord;

      uniform float u_time;
      uniform float u_opacities[10];
      uniform vec3 u_colors[6];
      uniform float u_total_size;
      uniform float u_dot_size;
      uniform vec2 u_resolution;
      out vec4 fragColor;

      float PHI = 1.61803398874989484820459;

      float random(vec2 xy) {
        return fract(tan(distance(xy * PHI, xy) * 0.5) * xy.x);
      }

      void main() {
        vec2 st = fragCoord.xy;
        ${center.includes("x") ? "st.x -= abs(floor((mod(u_resolution.x, u_total_size) - u_dot_size) * 0.5));" : ""}
        ${center.includes("y") ? "st.y -= abs(floor((mod(u_resolution.y, u_total_size) - u_dot_size) * 0.5));" : ""}

        float opacity = step(0.0, st.x);
        opacity *= step(0.0, st.y);

        vec2 st2 = vec2(int(st.x / u_total_size), int(st.y / u_total_size));
        float frequency = 5.0;
        float show_offset = random(st2);
        float rand = random(st2 * floor((u_time / frequency) + show_offset + frequency) + 1.0);
        opacity *= u_opacities[int(rand * 10.0)];
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

        vec3 color = u_colors[int(show_offset * 6.0)];
        ${shader}

        fragColor = vec4(color, opacity);
        fragColor.rgb *= fragColor.a;
      }
    `,
    [center, shader],
  );

  return <Shader source={source} uniforms={uniforms} maxFps={60} />;
}

type PreparedUniform = {
  value: number | number[] | THREE.Vector2 | THREE.Vector3[];
};

function Shader({ source, uniforms, maxFps }: { source: string; uniforms: Uniforms; maxFps: number }) {
  return (
    <ShaderMaterial source={source} uniforms={uniforms} maxFps={maxFps} />
  );
}

function ShaderMaterial({
  source,
  uniforms,
  maxFps,
}: {
  source: string;
  uniforms: Uniforms;
  maxFps: number;
}) {
  const { size } = useThree();
  const meshRef = useRef<THREE.Mesh | null>(null);
  const lastFrameTime = useRef(0);

  const preparedUniforms = useMemo<Record<string, PreparedUniform>>(() => {
    const result: Record<string, PreparedUniform> = {};

    for (const [uniformName, uniform] of Object.entries(uniforms)) {
      switch (uniform.type) {
        case "uniform1f":
        case "uniform1fv":
          result[uniformName] = { value: uniform.value as number | number[] };
          break;
        case "uniform3fv":
          result[uniformName] = {
            value: (uniform.value as number[][]).map((value) => new THREE.Vector3().fromArray(value)),
          };
          break;
        case "uniform2f":
          result[uniformName] = {
            value: new THREE.Vector2().fromArray(uniform.value as number[]),
          };
          break;
        default:
          break;
      }
    }

    result.u_time = { value: 0 };
    result.u_resolution = { value: new THREE.Vector2(size.width * 2, size.height * 2) };
    return result;
  }, [size.height, size.width, uniforms]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: `
          precision mediump float;
          uniform vec2 u_resolution;
          out vec2 fragCoord;

          void main() {
            gl_Position = vec4(position.xy, 0.0, 1.0);
            fragCoord = (position.xy + vec2(1.0)) * 0.5 * u_resolution;
            fragCoord.y = u_resolution.y - fragCoord.y;
          }
        `,
        fragmentShader: source,
        uniforms: preparedUniforms,
        glslVersion: THREE.GLSL3,
        blending: THREE.CustomBlending,
        blendSrc: THREE.SrcAlphaFactor,
        blendDst: THREE.OneFactor,
        transparent: true,
      }),
    [preparedUniforms, source],
  );

  useFrame(({ clock }) => {
    if (!meshRef.current) return;

    const timestamp = clock.getElapsedTime();
    if (timestamp - lastFrameTime.current < 1 / maxFps) return;
    lastFrameTime.current = timestamp;

    const shaderMaterial = meshRef.current.material as THREE.ShaderMaterial;
    shaderMaterial.uniforms.u_time.value = timestamp;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
