"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import * as THREE from "three";

type UniformValue = number | number[] | number[][];
type UniformType = "uniform1f" | "uniform1fv" | "uniform2f" | "uniform3fv";

type UniformDefinition = {
  value: UniformValue;
  type?: UniformType;
};

type Uniforms = Record<string, UniformDefinition>;

type CanvasRevealEffectProps = {
  opacities?: number[];
  colors?: number[][];
  containerClassName?: string;
  dotSize?: number;
  showGradient?: boolean;
};

export function CanvasRevealEffect({
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
      <Canvas className="absolute inset-0 h-full w-full" dpr={[1, 2]} frameloop="demand" gl={{ antialias: false }}>
        <DotMatrix
          colors={colors}
          dotSize={dotSize}
          opacities={opacities}
          center={["x", "y"]}
        />
      </Canvas>
      {showGradient ? (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to top, var(--surface-dark) 0%, var(--surface-dark) 75%, transparent 100%)" }}
        />
      ) : null}
    </div>
  );
}

type DotMatrixProps = {
  colors: number[][];
  opacities: number[];
  totalSize?: number;
  dotSize: number;
  center: ("x" | "y")[];
};

function DotMatrix({
  colors,
  opacities,
  totalSize = 4,
  dotSize,
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
        float show_offset = random(st2);
        float rand = random(st2 + 1.0);
        opacity *= u_opacities[int(rand * 10.0)];
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.x / u_total_size));
        opacity *= 1.0 - step(u_dot_size / u_total_size, fract(st.y / u_total_size));

        vec3 color = u_colors[int(show_offset * 6.0)];
        fragColor = vec4(color, opacity);
        fragColor.rgb *= fragColor.a;
      }
    `,
    [center],
  );

  return <Shader source={source} uniforms={uniforms} />;
}

type PreparedUniform = {
  value: number | number[] | THREE.Vector2 | THREE.Vector3[];
};

function Shader({ source, uniforms }: { source: string; uniforms: Uniforms }) {
  return <ShaderMaterial source={source} uniforms={uniforms} />;
}

function ShaderMaterial({
  source,
  uniforms,
}: {
  source: string;
  uniforms: Uniforms;
}) {
  const { size } = useThree();

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

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
