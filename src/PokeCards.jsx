import { Children, isValidElement, useId } from "react";

const findChildColor = (children) => {
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;

    const { style, children: nestedChildren } = child.props;
    const color =
      style?.backgroundColor || style?.color || findChildColor(nestedChildren);

    if (color) return color;
  }
};

const PokeCards = ({ children, color, image, name }) => {
  const ballColor = color || findChildColor(children) || "#ef4444";
  const nameArcId = useId();

  return (
    <div
      style={{
        position: "relative",
        width: 240,
        height: 240,
        flexShrink: 0,
        boxSizing: "border-box",
        overflow: "hidden",
        border: "6px solid #171717",
        borderRadius: "50%",
        backgroundColor: "white",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 0 50%",
          backgroundColor: ballColor,
        }}
      />
      <svg
        viewBox="0 0 228 228"
        role="img"
        aria-label={name}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <path id={nameArcId} d="M 30 114 A 84 84 0 0 1 198 114" />
        </defs>
        <text fill="#171717" fontSize="22" fontWeight="700" textAnchor="middle">
          <textPath href={`#${nameArcId}`} startOffset="50%">
            {name}
          </textPath>
        </text>
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: 12,
          transform: "translateY(-50%)",
          backgroundColor: "#171717",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: 104,
          height: 104,
          boxSizing: "border-box",
          transform: "translate(-50%, -50%)",
          border: "6px solid #171717",
          borderRadius: "50%",
          backgroundColor: "white",
          overflow: "hidden",
          display: "grid",
          placeItems: "center",
        }}
      >
        {image}
      </div>
      <div
        style={{
          position: "absolute",
          top: "calc(50% + 52px)",
          left: 0,
          right: 0,
          bottom: 0,
          padding: "2px 20px 8px",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#171717",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PokeCards;
