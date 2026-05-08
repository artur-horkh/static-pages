// screens/space.jsx — single space detail with calendar

function SpaceDetail({ spaceId, onNav }) {
  const space = window.BH.SPACES.find(s => s.id === spaceId) || window.BH.SPACES[0];
  const [photoIdx, setPhotoIdx] = useState(0);
  const [selDay, setSelDay] = useState(14);
  const [selSlots, setSelSlots] = useState(['11:00', '12:00']);

  const days = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 28; i++) {
      const day = i + 1;
      const dim = i < 2 || i > 25;
      const av = dim ? 0 : Math.max(2, 14 - ((day * 3) % 12));
      arr.push({ day, dim, av });
    }
    return arr;
  }, []);

  const toggleSlot = (t) => {
    setSelSlots(s => s.includes(t) ? s.filter(x => x !== t) : [...s, t].sort());
  };

  const takenSlots = ['08:00','09:00','13:00','17:00','18:00'];
  const slotsCount = selSlots.length;
  const total = slotsCount * space.price;

  return (
    <main>
      {/* Breadcrumb */}
      <section className="container" style={{ padding: '24px 28px 12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: 'var(--muted)' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => onNav('catalog')}>Каталог</span>
          <span>/</span>
          <span>{space.typeLabel}</span>
          <span>/</span>
          <span style={{ color: 'var(--text)' }}>{space.code}</span>
        </div>
      </section>

      {/* Hero */}
      <section className="container" style={{ padding: '8px 28px 32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, gap: 24 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span className="mono" style={{ color: 'var(--muted)', fontSize: 12 }}>{space.code}</span>
              <span className="badge">{space.typeLabel}</span>
              {space.badge && <span className={`badge ${space.badgeKind}`}>{space.badge}</span>}
              <span className="badge dot ok">{space.available} слотов сегодня</span>
            </div>
            <h1 style={{ fontSize: 40, letterSpacing: '-0.025em', marginBottom: 10 }}>{space.title}</h1>
            <div style={{ display: 'flex', gap: 18, color: 'var(--muted)', fontSize: 13 }}>
              <Stars value={space.rating} />
              <span>{space.reviews} отзывов</span>
              <span>·</span>
              <span><Icon name="pin" /> Этаж {space.floor}, {space.roomLabel}</span>
              <span>·</span>
              <span className="num">{space.bookings} броней всего</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, justifyContent: 'flex-end' }}>
              <span className="num" style={{ fontSize: 42, fontWeight: 600, color: 'var(--accent)', letterSpacing: '-0.03em' }}>{space.price}</span>
              <span style={{ color: 'var(--muted)', fontSize: 14 }}>{space.priceUnit}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--muted)' }}>Смена 8ч — 85 ₽ · Подписка — 1 280 ₽/мес</div>
          </div>
        </div>

        {/* Photo grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gridTemplateRows: '210px 210px', gap: 8, marginBottom: 8 }}>
          <Photo label={space.photos[0]} h="100%" style={{ gridRow: 'span 2' }} />
          {space.photos.slice(1, 5).map((p, i) => (
            <Photo key={i} label={p} h="100%" />
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="container" style={{ padding: '0 28px 60px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32 }}>
        {/* Left */}
        <div>
          <SectionBlock title="Об этом месте">
            <p style={{ color: 'var(--muted)', fontSize: 14, lineHeight: 1.6 }}>
              {space.title} расположен в {space.roomLabel.toLowerCase()} на {space.floor}-м этаже коворкинга.
              Эргономичная зона для {space.typeLabel.toLowerCase()}: подобранный свет, удобное кресло клиента,
              стерилизованные расходники и доступ к общей фотозоне для контента.
            </p>
          </SectionBlock>

          <SectionBlock title="Что в комплекте">
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
              {space.equip.map(eid => {
                const e = window.BH.EQUIPMENT.find(x => x.id === eid);
                return (
                  <div key={eid} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                    <span style={{ color: 'var(--accent)' }}><Icon name={e.icon} /></span>
                    <span style={{ fontSize: 13 }}>{e.label}</span>
                  </div>
                );
              })}
              {['coffee','park','wifi'].filter(x => !space.equip.includes(x)).slice(0,2).map(id => {
                const map = { coffee: 'Кофе и вода', park: 'Парковка', wifi: 'Wi-Fi' };
                return (
                  <div key={id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10 }}>
                    <span style={{ color: 'var(--accent)' }}><Icon name={id} /></span>
                    <span style={{ fontSize: 13 }}>{map[id]}</span>
                  </div>
                );
              })}
            </div>
          </SectionBlock>

          <SectionBlock title="Загруженность по дням">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 80, marginBottom: 8 }}>
              {[40,55,72,68,90,82,30, 50,65,78,72,85,90,40].map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{
                    width: '100%', height: `${v}%`,
                    background: i === 5 ? 'var(--accent)' : 'var(--surface-3)',
                    border: '1px solid var(--border)', borderRadius: 3,
                  }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: 'var(--muted-2)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em' }}>
              {['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС','ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map((d, i) => <span key={i}>{d}</span>)}
            </div>
          </SectionBlock>

          <SectionBlock title="Отзывы мастеров">
            {[
              { name: 'Алина К.', role: 'Нейл-мастер', text: 'Лампа топ, стол широкий, вытяжка тихая. Беру сюда смену уже 4-й месяц.', rating: 5 },
              { name: 'Дарья С.', role: 'Бровист',     text: 'Свет идеальный для съёмки до/после. Удобно, что палитру можно оставлять в шкафчике.', rating: 5 },
              { name: 'Полина Л.', role: 'Парикмахер', text: 'Color bar укомплектован, мойка работает безупречно. Минус — иногда шумно в open space.', rating: 4 },
            ].map((r, i) => (
              <div key={i} style={{ padding: '16px 0', borderTop: i > 0 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{r.name}</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12 }}>{r.role}</div>
                  </div>
                  <Stars value={r.rating} />
                </div>
                <p style={{ fontSize: 13, color: 'var(--text)', margin: 0 }}>{r.text}</p>
              </div>
            ))}
          </SectionBlock>
        </div>

        {/* Right — booking widget */}
        <aside style={{ position: 'sticky', top: 88, alignSelf: 'flex-start' }}>
          <div className="card" style={{ padding: 22 }}>
            <div className="eyebrow" style={{ marginBottom: 12 }}>Календарь · Май 2026</div>

            {/* Day labels */}
            <div className="cal-grid" style={{ marginBottom: 6 }}>
              {['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'].map(d => (
                <div key={d} style={{ textAlign: 'center', fontSize: 10, color: 'var(--muted-2)', fontVariantNumeric: 'tabular-nums', letterSpacing: '0.04em', padding: '4px 0' }}>{d}</div>
              ))}
            </div>

            <div className="cal-grid" style={{ marginBottom: 18 }}>
              {days.map((d, i) => (
                <div key={i}
                     className={`cal-day ${d.dim ? 'dim' : ''} ${selDay === d.day && !d.dim ? 'selected' : ''}`}
                     onClick={() => !d.dim && setSelDay(d.day)}>
                  <span className="num">{d.day}</span>
                  {!d.dim && <span className="av">{d.av}</span>}
                </div>
              ))}
            </div>

            <div className="eyebrow" style={{ marginBottom: 12 }}>
              Слоты на 14 мая · {selSlots.length > 0 ? <span style={{ color: 'var(--accent)' }}>{selSlots.length} выбрано</span> : 'выберите время'}
            </div>
            <div className="slots" style={{ marginBottom: 18 }}>
              {window.BH.TIMES.map(t => (
                <div key={t}
                     className={`slot ${takenSlots.includes(t) ? 'taken' : ''} ${selSlots.includes(t) ? 'selected' : ''}`}
                     onClick={() => !takenSlots.includes(t) && toggleSlot(t)}>
                  {t}
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}>{slotsCount}ч × {space.price} ₽</span>
                <span className="num">{slotsCount * space.price} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: 'var(--muted)' }}>Сервисный сбор</span>
                <span className="num">0 ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                <span style={{ fontWeight: 600 }}>Итого</span>
                <span className="num" style={{ fontSize: 22, fontWeight: 600 }}>{total} ₽</span>
              </div>
            </div>

            <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}
                    disabled={slotsCount === 0}
                    onClick={() => onNav('booking', spaceId)}>
              {slotsCount === 0 ? 'Выберите слоты' : 'Перейти к бронированию'}
              {slotsCount > 0 && <Icon name="arrow" />}
            </button>
            <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--muted-2)', marginTop: 10 }}>
              Бесплатная отмена за 24 часа · Оплата картой
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function SectionBlock({ title, children }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, letterSpacing: '-0.01em' }}>{title}</h2>
      {children}
    </div>
  );
}

Object.assign(window, { SpaceDetail, SectionBlock });
