import { Children, isValidElement, useId } from 'react';

const findChildColor = (children) => {
  for (const child of Children.toArray(children)) {
    if (!isValidElement(child)) continue;

    const { style, children: nestedChildren } = child.props;
    const color =
      style?.backgroundColor || style?.color || findChildColor(nestedChildren);

    if (color) return color;
  }
};

const PokeCards = ({ attack, children, color, hp, image, name, onClick }) => {
  const ballColor = color || findChildColor(children) || '#ef4444';
  const nameArcId = useId();
  const statsArcId = useId();
  const maxStat = 160;
  const hpPercent = Math.min(hp / maxStat, 1) * 100;
  const attackPercent = Math.min(attack / maxStat, 1) * 100;
  const labelArcId = useId();
  const hpLabelPathId = useId();
  const hpBarPathId = useId();
  const attackBarPathId = useId();

  return (
    <div
      className="pokemon-card"
      style={{
        position: 'relative',
        width: 240,
        height: 240,
        flexShrink: 0,
        boxSizing: 'border-box',
        overflow: 'hidden',
        border: '6px solid #171717',
        borderRadius: '50%',
        backgroundColor: 'white',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
        '--type-color': ballColor,
        cursor: onClick ? 'pointer' : 'default',
        transition:
          'background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
      }}
      onClick={onClick}
    >
      <div
        className="type-color"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: '0 0 50%',
          backgroundColor: ballColor,
        }}
      />
      <svg
        viewBox="0 0 228 228"
        role="img"
        aria-label={name}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <path id={nameArcId} d="M 30 104 A 84 84 0 0 1 198 104" />
        </defs>
        <text fill="#171717" fontSize="22" fontWeight="700">
          <textPath
            href={`#${nameArcId}`}
            startOffset="50%"
            textAnchor="middle"
          >
            {name}
          </textPath>
        </text>
      </svg>
      <svg
        viewBox="0 0 228 228"
        aria-label={`HP ${hp}, Attack ${attack}`}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <path id={statsArcId} d="M 30 124 A 84 84 0 0 0 198 124" />
        </defs>
        <line
          x1="114"
          y1="204"
          x2="114"
          y2="224"
          stroke="#171717"
          strokeWidth="3"
        />
        <path
          d="M 105 218 A 100 100 0 0 1 14 114"
          id={hpBarPathId}
          pathLength="100"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="16"
          strokeLinecap="butt"
        />
        <path
          d="M 105 218 A 100 100 0 0 1 14 114"
          pathLength="100"
          fill="none"
          stroke="#6390F0"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${hpPercent} 100`}
        />
        <path
          d="M 123 218 A 100 100 0 0 0 214 114"
          id={attackBarPathId}
          pathLength="100"
          fill="none"
          stroke="#d1d5db"
          strokeWidth="16"
          strokeLinecap="butt"
        />
        <path
          d="M 123 218 A 100 100 0 0 0 214 114"
          pathLength="100"
          fill="none"
          stroke="#EE8130"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${attackPercent} 100`}
        />
      </svg>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          right: 0,
          height: 12,
          transform: 'translateY(-50%)',
          backgroundColor: '#171717',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 180,
          height: 180,
          boxSizing: 'border-box',
          transform: 'translate(-50%, -50%)',
          border: '6px solid #171717',
          borderRadius: '50%',
          backgroundColor: 'silver',
          overflow: 'hidden',
          display: 'grid',
          placeItems: 'center',
        }}
      >
        {image}
      </div>
      <svg
        viewBox="0 0 228 228"
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <path id={labelArcId} d="M 54 136 A 60 60 0 0 0 174 136" />
          <path id={hpLabelPathId} d="M 14 114 A 100 100 0 0 0 105 218" />
        </defs>
        <text className="stat-label hp-label" fontSize="11" fontWeight="700">
          <textPath
            href={`#${labelArcId}`}
            startOffset="35%"
            textAnchor="middle"
          >
            HP
          </textPath>
        </text>
        <text
          className="stat-label attack-label"
          fontSize="11"
          fontWeight="700"
        >
          <textPath
            href={`#${labelArcId}`}
            startOffset="65%"
            textAnchor="middle"
          >
            Attack
          </textPath>
        </text>
        <text fill="#171717" fontSize="11" fontWeight="700">
          <textPath
            href={`#${hpLabelPathId}`}
            startOffset={`${100 - hpPercent / 2}%`}
            dy="5"
            textAnchor="middle"
          >
            {hp}
          </textPath>
        </text>
        <text fill="#171717" fontSize="11" fontWeight="700">
          <textPath
            href={`#${attackBarPathId}`}
            startOffset={`${attackPercent / 2}%`}
            dy="5"
            textAnchor="middle"
          >
            {attack}
          </textPath>
        </text>
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 'calc(50% + 52px)',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '2px 20px 8px',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          color: '#171717',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default PokeCards;
