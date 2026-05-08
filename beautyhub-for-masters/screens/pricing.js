// screens/pricing.jsx — tariffs comparison

function Pricing({ onNav }) {
  const [billing, setBilling] = useState('month');
  const tariffs = window.BH.TARIFFS;

  return (
    <main>
      <section className="container" style={{ padding: '64px 28px 32px', textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Тарифы</div>
        <h1 style={{ fontSize: 48, letterSpacing: '-0.03em', marginBottom: 14 }}>
          Платите столько,<br/>сколько работаете.
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 15 }}>
          Час, смена или подписка. Никаких скрытых платежей. Расходники, кофе и Wi-Fi
          включены во все тарифы.
        </p>
      </section>

      <section className="container" style={{ padding: '24px 28px 0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', gap: 4, padding: 4, background: 'var(--surface-2)', border: '1px solid var(--border)', borderRadius: 999 }}>
          {[['hour','По часу'],['shift','Сменно'],['month','Подписка']].map(([id, lbl]) => (
            <button key={id} className="btn btn-sm" onClick={() => setBilling(id)}
                    style={{
                      background: billing === id ? 'var(--accent)' : 'transparent',
                      borderColor: 'transparent',
                      color: billing === id ? '#0a0a0a' : 'var(--muted)',
                      fontWeight: billing === id ? 600 : 500,
                    }}>
              {lbl}
            </button>
          ))}
        </div>
      </section>

      <section className="container" style={{ padding: '40px 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {tariffs.map(t => (
            <div key={t.id} className="card" style={{
              padding: 32,
              background: t.highlight ? 'linear-gradient(180deg, rgba(255,122,26,0.08), transparent 50%), var(--surface)' : 'var(--surface)',
              borderColor: t.highlight ? 'var(--accent-line)' : 'var(--border)',
              position: 'relative',
              overflow: 'visible',
            }}>
              {t.highlight && (
                <div style={{
                  position: 'absolute', top: -11, left: 32,
                  background: 'var(--accent)', color: '#0a0a0a',
                  padding: '4px 12px', borderRadius: 4, lineHeight: 1,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}>Популярно</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontSize: 20, fontWeight: 600 }}>{t.name}</h3>
                {t.save && <span className="badge accent">{t.save}</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
                <span className="num" style={{ fontSize: 56, fontWeight: 600, letterSpacing: '-0.035em' }}>{t.price}</span>
                <span style={{ color: 'var(--muted)', fontSize: 14 }}>{t.unit}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 28, minHeight: 40 }}>{t.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
                {t.perks.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13 }}>
                    <span style={{ color: 'var(--accent)' }}><Icon name="check" /></span>
                    {p}
                  </div>
                ))}
              </div>
              <button className={`btn ${t.highlight ? 'btn-primary' : ''} btn-lg`} style={{ width: '100%', justifyContent: 'center' }}
                      onClick={() => onNav('catalog')}>
                {t.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARE TABLE */}
      <section className="container" style={{ padding: '60px 28px 24px' }}>
        <h2 style={{ fontSize: 22, marginBottom: 24 }}>Что входит</h2>
        <div className="card" style={{ overflow: 'hidden' }}>
          {[
            ['Бронирование',           '1 час', '8 часов', '20 смен'],
            ['Расходники и стерильное', '✓', '✓', '✓'],
            ['Кофе, вода, Wi-Fi',       '✓', '✓', '✓'],
            ['Бесплатная парковка',     '—', '✓', '✓'],
            ['Профиль на витрине',      '—', '—', '✓'],
            ['Закреплённая зона',       '—', '—', '✓'],
            ['Доступ к мероприятиям',   '—', 'скидка 10%', 'бесплатно'],
            ['Скидка на Kevin Murphy',  '—', '—', '15%'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
              padding: '14px 22px',
              borderBottom: i < 7 ? '1px solid var(--border)' : 'none',
              fontSize: 13,
              background: i === 0 ? 'var(--surface-2)' : 'transparent',
              fontWeight: i === 0 ? 600 : 400,
            }}>
              <span style={{ color: i === 0 ? 'var(--text)' : 'var(--muted)' }}>{row[0]}</span>
              <span className={i === 0 ? '' : 'num'} style={{ textAlign: 'center' }}>{row[1]}</span>
              <span className={i === 0 ? '' : 'num'} style={{ textAlign: 'center' }}>{row[2]}</span>
              <span className={i === 0 ? '' : 'num'} style={{ textAlign: 'center', color: 'var(--accent)', fontWeight: 600 }}>{row[3]}</span>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="container" style={{ padding: '60px 28px 80px' }}>
        <h2 style={{ fontSize: 22, marginBottom: 24 }}>Частые вопросы</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14 }}>
          {window.BH.FAQ.map((f, i) => (
            <div key={i} className="card" style={{ padding: 22 }}>
              <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Events({ onNav }) {
  const events = window.BH.EVENTS;
  return (
    <main>
      <section className="container" style={{ padding: '48px 28px 32px' }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>Обучение и события</div>
        <h1 style={{ fontSize: 48, letterSpacing: '-0.03em', marginBottom: 14, maxWidth: 800 }}>
          Учитесь у топ-мастеров.<br/>
          <span style={{ color: 'var(--muted)' }}>Прямо в коворкинге.</span>
        </h1>
      </section>

      <section className="container" style={{ padding: '0 28px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 32 }}>
          <div className="card" style={{ overflow: 'hidden' }}>
            <Photo label="Kevin Murphy · Color bar workshop" h={320} style={{ borderRadius: 0 }} />
            <div style={{ padding: 24 }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <span className="badge accent">Партнёрский интенсив</span>
                <span className="badge">21 МАЯ · 11:00</span>
              </div>
              <h2 style={{ fontSize: 26, marginBottom: 8, letterSpacing: '-0.02em' }}>Color bar: палитра сезона</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
                Двухчасовой воркшоп по работе с новой коллекцией Kevin Murphy.
                Свободные слоты — 12 / 12.
              </p>
              <div style={{ display: 'flex', gap: 10 }}>
                <button className="btn btn-primary">Записаться · 95 ₽</button>
                <button className="btn">Программа</button>
              </div>
            </div>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Подписка на события</div>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 10 }}>Получайте анонс заранее</h3>
            <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20 }}>
              Раз в неделю — список ближайших мероприятий и приоритетный доступ к закрытым воркшопам.
            </p>
            <input className="input" placeholder="Email" style={{ marginBottom: 10 }} />
            <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>Подписаться</button>
            <div className="eyebrow" style={{ marginTop: 28, marginBottom: 12 }}>Темы</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['Колористика','Брови','Перманент','Маникюр','Кожа','Бизнес','Контент'].map(t => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="section-title">
          <h2>Ближайшие события</h2>
          <div className="meta">{events.length} запланировано</div>
        </div>

        <div className="card" style={{ overflow: 'hidden' }}>
          {events.map((e, i) => (
            <div key={i} style={{
              display: 'grid',
              gridTemplateColumns: '110px 140px 1fr 200px 120px 140px',
              alignItems: 'center',
              padding: '20px 24px',
              borderBottom: i < events.length - 1 ? '1px solid var(--border)' : 'none',
              gap: 16,
            }}>
              <span className="num" style={{ fontSize: 14, color: 'var(--accent)', fontWeight: 600 }}>{e.date}</span>
              <span className="badge">{e.type}</span>
              <span style={{ fontSize: 15, fontWeight: 500 }}>{e.title}</span>
              <span style={{ color: 'var(--muted)', fontSize: 13 }}>Ведёт: {e.host}</span>
              <span className="num" style={{ fontSize: 14, fontWeight: 600 }}>{e.price}</span>
              <button className="btn btn-sm" style={{ justifyContent: 'center' }}>Записаться</button>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

Object.assign(window, { Pricing, Events });
