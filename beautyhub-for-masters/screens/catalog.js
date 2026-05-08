// screens/catalog.jsx — catalog with filters

function Catalog({ onNav, layout }) {
  const [type, setType] = useState('all');
  const [duration, setDuration] = useState('h2');
  const [room, setRoom] = useState('any');
  const [equip, setEquip] = useState([]);
  const [sort, setSort] = useState('rec');
  const [date, setDate] = useState('Сегодня');

  const spaces = window.BH.SPACES;
  const filtered = useMemo(() => {
    let r = spaces.slice();
    if (type !== 'all') r = r.filter(s => s.type === type);
    if (room !== 'any') r = r.filter(s => s.room === room);
    if (equip.length) r = r.filter(s => equip.every(e => s.equip.includes(e)));
    if (sort === 'price') r.sort((a, b) => a.price - b.price);
    else if (sort === 'rating') r.sort((a, b) => b.rating - a.rating);
    else if (sort === 'available') r.sort((a, b) => b.available - a.available);
    return r;
  }, [type, room, equip, sort]);

  const toggleEquip = (id) => {
    setEquip(eq => eq.includes(id) ? eq.filter(x => x !== id) : [...eq, id]);
  };

  return (
    <main>
      {/* Header */}
      <section className="container" style={{ padding: '32px 28px 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 28 }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Каталог зон</div>
            <h1 style={{ fontSize: 36, letterSpacing: '-0.025em' }}>
              {filtered.length} {plural(filtered.length, 'зона','зоны','зон')}
              <span style={{ color: 'var(--muted)' }}> доступны на {date.toLowerCase()}</span>
            </h1>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="input" style={{ width: 220, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="search" />
              <input style={{ background: 'transparent', border: 0, outline: 0, color: 'inherit', flex: 1, font: 'inherit' }}
                     placeholder="Поиск по названию, коду…" />
            </div>
            <select className="input" style={{ width: 200 }} value={sort} onChange={e => setSort(e.target.value)}>
              <option value="rec">Рекомендуемые</option>
              <option value="price">Цена ↑</option>
              <option value="rating">Рейтинг ↓</option>
              <option value="available">Больше слотов</option>
            </select>
          </div>
        </div>

        {/* Service type chips */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {window.BH.SERVICE_TYPES.map(t => (
            <span key={t.id} className={`chip ${type === t.id ? 'active' : ''}`} onClick={() => setType(t.id)}>
              {t.label}
              <span className="num">{t.count}</span>
            </span>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="container" style={{ padding: '0 28px 32px', display: 'grid', gridTemplateColumns: '260px 1fr', gap: 24 }}>
        {/* Filter sidebar */}
        <aside style={{ borderRight: '1px solid var(--border)', paddingRight: 24 }}>
          <FilterGroup label="Дата">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
              {['Сегодня', 'Завтра', '+2 дня', '+3 дня', '+4 дня', 'Выбрать'].map(d => (
                <span key={d} className={`chip ${date === d ? 'active' : ''}`}
                      onClick={() => setDate(d)}
                      style={{ justifyContent: 'center', padding: '6px 4px', fontSize: 11.5 }}>
                  {d}
                </span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Длительность аренды">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {window.BH.DURATIONS.map(d => (
                <span key={d.id} className={`chip ${duration === d.id ? 'active' : ''}`} onClick={() => setDuration(d.id)}>
                  {d.label}
                </span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Цена за час">
            <div style={{ padding: '8px 0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--muted)', marginBottom: 6 }}>
                <span className="num">8 ₽</span>
                <span className="num">25 ₽</span>
              </div>
              <div style={{ position: 'relative', height: 4, background: 'var(--surface-2)', borderRadius: 2 }}>
                <div style={{ position: 'absolute', left: '12%', right: '32%', top: 0, bottom: 0, background: 'var(--accent)', borderRadius: 2 }} />
                <span style={{ position: 'absolute', left: '12%', top: -5, transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', border: '2px solid #0a0a0a' }} />
                <span style={{ position: 'absolute', left: '68%', top: -5, transform: 'translateX(-50%)', width: 14, height: 14, borderRadius: '50%', background: 'var(--accent)', border: '2px solid #0a0a0a' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                <span className="num">10 ₽</span>
                <span className="num">18 ₽</span>
              </div>
            </div>
          </FilterGroup>

          <FilterGroup label="Тип помещения">
            <div style={{ display: 'flex', gap: 6 }}>
              <span className={`chip ${room === 'any' ? 'active' : ''}`} onClick={() => setRoom('any')}>Любое</span>
              {window.BH.ROOM_TYPES.map(r => (
                <span key={r.id} className={`chip ${room === r.id ? 'active' : ''}`} onClick={() => setRoom(r.id)}>
                  {r.label}
                </span>
              ))}
            </div>
          </FilterGroup>

          <FilterGroup label="Оборудование">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {window.BH.EQUIPMENT.map(e => (
                <label key={e.id} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 13 }}>
                  <span style={{
                    width: 16, height: 16, borderRadius: 4,
                    border: `1px solid ${equip.includes(e.id) ? 'var(--accent)' : 'var(--border-strong)'}`,
                    background: equip.includes(e.id) ? 'var(--accent)' : 'transparent',
                    display: 'grid', placeItems: 'center', color: '#0a0a0a',
                  }}>
                    {equip.includes(e.id) && <Icon name="check" />}
                  </span>
                  <input type="checkbox" checked={equip.includes(e.id)} onChange={() => toggleEquip(e.id)} style={{ display: 'none' }} />
                  <Icon name={e.icon} />
                  <span>{e.label}</span>
                </label>
              ))}
            </div>
          </FilterGroup>

          <button className="btn" style={{ width: '100%', justifyContent: 'center', marginTop: 8 }}
                  onClick={() => { setType('all'); setRoom('any'); setEquip([]); setSort('rec'); }}>
            Сбросить фильтры
          </button>
        </aside>

        {/* Grid */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16, fontSize: 13, color: 'var(--muted)' }}>
            <div>
              {filtered.length > 0
                ? <>Найдено <span className="num" style={{ color: 'var(--text)' }}>{filtered.length}</span> зон</>
                : 'Ничего не найдено'}
            </div>
            <div className="mono" style={{ fontSize: 11 }}>обновлено · 12:24</div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: layout === 'data' ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 16 }}>
            {filtered.map(s => (
              <SpaceCard key={s.id} space={s} layout={layout} onOpen={() => onNav('space', s.id)} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="card" style={{ padding: 60, textAlign: 'center', color: 'var(--muted)' }}>
              <div style={{ fontSize: 16, marginBottom: 8 }}>Под ваши фильтры зон не нашлось</div>
              <button className="btn btn-sm" onClick={() => { setType('all'); setRoom('any'); setEquip([]); }}>
                Сбросить и показать все
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div className="eyebrow" style={{ marginBottom: 10, fontSize: 10 }}>{label}</div>
      {children}
    </div>
  );
}

function plural(n, one, few, many) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return few;
  return many;
}

Object.assign(window, { Catalog, FilterGroup, plural });
