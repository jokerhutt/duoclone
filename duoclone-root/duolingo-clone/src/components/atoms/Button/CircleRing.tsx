import type { ColorType } from "../../../Types/ColorType";
import { colorMap } from "../../../util/colorMap";

type CircleRingProps = {
  children: React.ReactNode;
  unitColor?: ColorType
  show?: boolean;       // ← new
  size?: number;
  stroke?: number;
  color?: string;
  progress?: number;    // 0–1
  offset?: string;
};

export function CircleRing({
  children,
  show = false,
  size = 86,
  stroke = 4,
  unitColor = "LOCKED",
  progress = 1,
  offset = "",
}: CircleRingProps) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dashOffset = c * (1 - progress);

  const style = colorMap[unitColor]

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {show && (
        <svg className={`absolute ${offset} mt-2`} width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size/2} cy={size/2} r={r} stroke={style.color} strokeWidth={stroke}
                  fill="none" strokeDasharray={c} strokeDashoffset={dashOffset} strokeLinecap="round" />
        </svg>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}