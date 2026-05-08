// components.jsx — shared UI atoms

const { useState, useEffect, useRef, useMemo } = React;

// SVG injector (renders raw SVG strings)
function Icon({ name, size }) {
  const html = window.BH.ICONS[name] || '';
  const style = size ? { width: size, height: size, display: 'inline-flex' } : { display: 'inline-flex' };
  return <span style={style} dangerouslySetInnerHTML={{ __html: html }} />;
}

// Brand mark
function Brand() {
  return (
    <div className="brand">
      <img src="photos/logo.png" alt="beautyhub" style={{ height: 28, display: 'block' }} />
    </div>
  );
}

// Top nav
function TopBar({ screen, onNav }) {
  const items = [
    ['landing',  'Главная'],
    ['catalog',  'Каталог зон'],
    ['pricing',  'Тарифы'],
    ['events',   'Обучение'],
  ];
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Brand />
        <nav className="nav">
          {items.map(([id, label]) => (
            <button key={id} className={screen === id ? 'active' : ''} onClick={() => onNav(id)}>
              {label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}

// Real photos from beautyhub.by
// real-1.jpg = Beauty hub illuminated sign (great for hero / brand)
// real-2.jpg, real-3.jpg = parikmaher / makeup workstations (mirrors + chairs)
// real-nail.jpg = nail manicure shot
const REAL_PHOTOS = {
  brand:  'photos/real-1.jpg',
  salon1: 'photos/real-2.jpg',
  salon2: 'photos/real-3.jpg',
  nail:   'photos/real-nail.jpg',
};
const SALON_POOL = [REAL_PHOTOS.salon1, REAL_PHOTOS.salon2];
const NAIL_POOL  = [REAL_PHOTOS.nail, REAL_PHOTOS.salon1];
const BROW_POOL  = [REAL_PHOTOS.salon2, REAL_PHOTOS.salon1];

// Pick a photo by label — workstation photos for hair/brow/makeup, nail photo for nail tables
function pickPhoto(label) {
  if (!label) return REAL_PHOTOS.salon1;
  const s = String(label).toLowerCase();
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  // nail / маникюр / педикюр / nail-zone
  if (/нейл|маник|педик|nail/.test(s)) return NAIL_POOL[h % NAIL_POOL.length];
  // brow / lash / визаж / макияж
  if (/бров|brow|lash|лэш|визаж|макияж|makeup/.test(s)) return BROW_POOL[h % BROW_POOL.length];
  // hero / brand mentions
  if (/hero|brand|sign|beauty.?hub/.test(s)) return REAL_PHOTOS.brand;
  // default — hairdresser / general workspace
  return SALON_POOL[h % SALON_POOL.length];
}

// Image block — uses real photo when available
function Photo({ label, h, style, children }) {
  const src = pickPhoto(label);
  if (src) {
    return (
      <div style={{
        height: h || 200, borderRadius: 10, overflow: 'hidden',
        backgroundImage: `url(${src})`, backgroundSize: 'cover', backgroundPosition: 'center',
        position: 'relative',
        ...(style || {}),
      }}>
        {children}
      </div>
    );
  }
  return (
    <div className="ph" style={{ height: h || 200, borderRadius: 10, ...(style || {}) }} data-label={label}>
      {children}
    </div>
  );
}

// Hover gallery — cycles dummy "photos" while hovered
function HoverGallery({ photos, h, style }) {
  const [idx, setIdx] = useState(0);
  const [hover, setHover] = useState(false);
  useEffect(() => {
    if (!hover) return;
    const t = setInterval(() => setIdx(i => (i + 1) % photos.length), 900);
    return () => clearInterval(t);
  }, [hover, photos.length]);
  return (
    <div className="gallery"
         onMouseEnter={() => setHover(true)}
         onMouseLeave={() => { setHover(false); setIdx(0); }}
         style={{ borderRadius: 10, ...(style || {}) }}>
      <Photo label={photos[idx]} h={h} style={{ borderRadius: 10 }} />
      <div className="gal-dots">
        {photos.map((_, i) => (
          <span key={i} className={`gal-dot ${i === idx ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
}

// Stars
function Stars({ value }) {
  return (
    <span style={{ color: 'var(--accent)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
      <Icon name="star" />
      <span className="num" style={{ fontSize: 12, color: 'var(--text)' }}>{value.toFixed(1)}</span>
    </span>
  );
}

// Busy bar
function BusyBar({ value }) {
  return (
    <div style={{ height: 4, background: 'var(--surface-3)', borderRadius: 2, overflow: 'hidden', flex: 1 }}>
      <div style={{
        height: '100%',
        width: `${value * 100}%`,
        background: value > 0.7 ? '#ff5b5b' : value > 0.4 ? 'var(--accent)' : 'var(--ok)',
      }} />
    </div>
  );
}

// Equipment chip row
function EquipRow({ ids, max }) {
  const items = window.BH.EQUIPMENT.filter(e => ids.includes(e.id));
  const shown = max ? items.slice(0, max) : items;
  const rest = max ? Math.max(0, items.length - max) : 0;
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
      {shown.map(e => (
        <span key={e.id} className="chip" style={{ padding: '3px 8px', fontSize: 11, color: 'var(--muted)' }}>
          <Icon name={e.icon} />
          {e.label}
        </span>
      ))}
      {rest > 0 && (
        <span className="chip" style={{ padding: '3px 8px', fontSize: 11 }}>+{rest}</span>
      )}
    </div>
  );
}

// Stepper for booking flow
function Stepper({ step }) {
  const steps = ['Зона', 'Дата и время', 'Подтверждение'];
  return (
    <div className="stepper">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className={`step ${step === i ? 'active' : step > i ? 'done' : ''}`}>
            <span className="step-num">{step > i ? '✓' : i + 1}</span>
            <span>{s}</span>
          </div>
          {i < steps.length - 1 && <div className="step-sep" />}
        </React.Fragment>
      ))}
    </div>
  );
}

// SpaceCard — supports photo-first and data-first layout
function SpaceCard({ space, layout = 'photo', onOpen }) {
  const equip = window.BH.EQUIPMENT.filter(e => space.equip.includes(e.id));

  if (layout === 'data') {
    return (
      <div className="card" style={{ display: 'flex', flexDirection: 'column' }}
           onClick={onOpen}
           role="button"
           style2={{ cursor: 'pointer' }}>
        <div style={{ padding: '16px 18px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 10 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span className="mono" style={{ fontSize: 11, color: 'var(--muted)' }}>{space.code}</span>
              <span className="badge">{space.typeLabel}</span>
              {space.badge && <span className={`badge ${space.badgeKind}`}>{space.badge}</span>}
            </div>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 4 }}>{space.title}</h3>
            <div style={{ color: 'var(--muted)', fontSize: 12, display: 'flex', gap: 10 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon name="pin" /> Этаж {space.floor} · {space.roomLabel}
              </span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="num" style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent)' }}>{space.price}</div>
            <div style={{ fontSize: 11, color: 'var(--muted)' }}>{space.priceUnit}</div>
          </div>
        </div>
        <div style={{ padding: '0 18px 14px', display: 'flex', gap: 14, fontSize: 12, color: 'var(--muted)' }}>
          <Stars value={space.rating} />
          <span>·</span>
          <span>{space.reviews} отзывов</span>
          <span>·</span>
          <span className="num">{space.bookings} броней</span>
        </div>
        <div style={{ padding: '0 18px 14px' }}>
          <EquipRow ids={space.equip} max={4} />
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)',
                      display: 'flex', alignItems: 'center', gap: 10 }}>
          <BusyBar value={space.busy} />
          <span className="num" style={{ fontSize: 11, color: 'var(--muted)' }}>
            {space.available} слотов сегодня
          </span>
          <button className="btn btn-primary btn-sm" onClick={(e) => { e.stopPropagation(); onOpen(); }}>
            Открыть
            <Icon name="arrow" />
          </button>
        </div>
      </div>
    );
  }

  // photo-first
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer' }} onClick={onOpen}>
      <div style={{ position: 'relative' }}>
        <HoverGallery photos={space.photos} h={210} style={{ borderRadius: 0 }} />
        <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', gap: 6 }}>
          <span className="badge">{space.typeLabel}</span>
          {space.badge && <span className={`badge ${space.badgeKind}`}>{space.badge}</span>}
        </div>
        <div style={{ position: 'absolute', top: 12, right: 12 }}>
          <span className="badge dot ok" style={{ color: 'var(--ok)' }}>{space.available} слотов</span>
        </div>
        <div style={{
          position: 'absolute', bottom: 12, right: 12,
          background: 'rgba(10,10,10,0.85)', backdropFilter: 'blur(10px)',
          padding: '6px 10px', borderRadius: 8,
          border: '1px solid var(--border)',
        }}>
          <span className="num" style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent)' }}>{space.price}</span>
          <span style={{ fontSize: 11, color: 'var(--muted)', marginLeft: 4 }}>{space.priceUnit}</span>
        </div>
      </div>
      <div style={{ padding: '14px 16px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8 }}>
        <div>
          <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{space.title}</h3>
          <div style={{ color: 'var(--muted)', fontSize: 12 }}>
            <span className="mono">{space.code}</span> · Этаж {space.floor} · {space.roomLabel}
          </div>
        </div>
        <Stars value={space.rating} />
      </div>
      <div style={{ padding: '0 16px 14px' }}>
        <EquipRow ids={space.equip} max={3} />
      </div>
    </div>
  );
}

Object.assign(window, { Icon, Brand, TopBar, Photo, HoverGallery, Stars, BusyBar, EquipRow, Stepper, SpaceCard });
