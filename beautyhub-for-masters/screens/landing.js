// screens/landing.jsx — Hero + benefits + tariffs preview + how it works

function Landing({ onNav }) {
  const facts = window.BH.FACTS;
  const benefits = window.BH.BENEFITS;
  const tariffs = window.BH.TARIFFS;
  const events = window.BH.EVENTS;

  return (
    <main>
      {/* HERO */}
      <section className="container" style={{ padding: '64px 28px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 48, alignItems: 'center' }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              Минск · Франциска Скорины 2
            </div>
            <h1 style={{ fontSize: 64, lineHeight: 1.02, letterSpacing: '-0.035em', marginBottom: 24 }}>
              Рабочее место<br/>
              для бьюти-мастера.<br/>
              <span style={{ color: 'var(--muted)' }}>Без салона. Без обязательств.</span>
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: 16, maxWidth: 520, marginBottom: 32 }}>
              Берите час, смену или подписку. Полностью оборудованные зоны, расходники, кофе и
              витрина для клиентов — в одном пространстве в центре Минска.
            </p>
            <div style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
              <button className="btn btn-primary btn-lg" onClick={() => onNav('catalog')}>
                Найти зону
                <Icon name="arrow" />
              </button>
              <button className="btn btn-lg" onClick={() => onNav('pricing')}>Тарифы</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }}>
              {facts.map((f, i) => (
                <div key={i} style={{
                  padding: '20px 0',
                  borderRight: i < 3 ? '1px solid var(--border)' : 'none',
                  paddingLeft: i === 0 ? 0 : 20,
                }}>
                  <div className="num" style={{ fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>{f.num}</div>
                  <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 2 }}>{f.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <HoverGallery photos={['Open space — общий план', 'Color bar', 'Нейл-зона', 'Кабинет лэшмейкера']} h={520} />
            <div style={{
              position: 'absolute', top: 20, right: 20,
              background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)', borderRadius: 10,
              padding: '12px 14px', minWidth: 180,
            }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 4 }}>СВОБОДНО ПРЯМО СЕЙЧАС</div>
              <div className="num" style={{ fontSize: 26, fontWeight: 600, color: 'var(--accent)' }}>5 / 8</div>
              <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>зон · обновлено 2 мин назад</div>
            </div>
            <div style={{
              position: 'absolute', bottom: 20, left: 20,
              background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)',
              border: '1px solid var(--border)', borderRadius: 10,
              padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: 'var(--muted)', marginBottom: 6 }}>СЕГОДНЯ В КОВОРКИНГЕ</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                {[0,1,2,3].map(i => (
                  <div key={i} style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: ['#2a2826','#1f1d1b','#3a3835','#252320'][i],
                    border: '2px solid #0a0a0a',
                    marginLeft: i > 0 ? -8 : 0,
                  }} />
                ))}
                <span style={{ marginLeft: 8, fontSize: 13, color: 'var(--text)' }}>+ 12 мастеров</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="container" style={{ padding: '80px 28px 40px' }}>
        <div className="section-title">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Почему мастера выбирают нас</div>
            <h2>Только работа. Всё остальное — на нас.</h2>
          </div>
          <div className="meta">04 / преимущества</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid var(--border)' }}>
          {benefits.map((b, i) => (
            <div key={i} style={{
              padding: '28px 24px 28px 0',
              borderRight: i < 3 ? '1px solid var(--border)' : 'none',
              paddingLeft: i === 0 ? 0 : 24,
            }}>
              <div className="mono" style={{ color: 'var(--accent)', fontSize: 12, marginBottom: 16 }}>{b.num}</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>{b.title}</h3>
              <p style={{ color: 'var(--muted)', fontSize: 13, margin: 0 }}>{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SPACES PREVIEW */}
      <section className="container" style={{ padding: '60px 28px 40px' }}>
        <div className="section-title">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Доступные зоны</div>
            <h2>8 зон. 4 типа услуг.</h2>
          </div>
          <button className="btn" onClick={() => onNav('catalog')}>
            Все зоны <Icon name="arrow" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {window.BH.SPACES.slice(0, 4).map(s => (
            <SpaceCard key={s.id} space={s} onOpen={() => onNav('space', s.id)} />
          ))}
        </div>
      </section>

      {/* TARIFFS */}
      <section className="container" style={{ padding: '80px 28px 40px' }}>
        <div className="section-title">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Тарифы</div>
            <h2>Платите столько, сколько работаете.</h2>
          </div>
          <button className="btn" onClick={() => onNav('pricing')}>
            Сравнить тарифы <Icon name="arrow" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {tariffs.map(t => (
            <div key={t.id} className="card" style={{
              padding: 28,
              background: t.highlight ? 'linear-gradient(180deg, rgba(255,122,26,0.06), transparent 60%), var(--surface)' : 'var(--surface)',
              borderColor: t.highlight ? 'var(--accent-line)' : 'var(--border)',
              position: 'relative',
              overflow: 'visible',
            }}>
              {t.highlight && (
                <div style={{
                  position: 'absolute', top: -11, left: 28,
                  background: 'var(--accent)', color: '#0a0a0a',
                  padding: '4px 10px', borderRadius: 4, lineHeight: 1,
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', whiteSpace: 'nowrap',
                }}>Популярно</div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                <h3 style={{ fontSize: 18, fontWeight: 600 }}>{t.name}</h3>
                {t.save && <span className="badge accent">{t.save}</span>}
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 8 }}>
                <span className="num" style={{ fontSize: 44, fontWeight: 600, letterSpacing: '-0.03em' }}>{t.price}</span>
                <span style={{ color: 'var(--muted)', fontSize: 13 }}>{t.unit}</span>
              </div>
              <p style={{ color: 'var(--muted)', fontSize: 13, marginBottom: 20, minHeight: 40 }}>{t.desc}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {t.perks.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
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

      {/* EVENTS PREVIEW */}
      <section className="container" style={{ padding: '60px 28px 40px' }}>
        <div className="section-title">
          <div>
            <div className="eyebrow" style={{ marginBottom: 8 }}>Обучение и события</div>
            <h2>Растите быстрее с комьюнити.</h2>
          </div>
          <button className="btn" onClick={() => onNav('events')}>
            Все события <Icon name="arrow" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {events.map((e, i) => (
            <div key={i} className="card" style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="mono" style={{ fontSize: 12, color: 'var(--accent)', fontWeight: 600 }}>{e.date}</span>
                <span className="badge">{e.type}</span>
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.25 }}>{e.title}</h3>
              <div style={{ color: 'var(--muted)', fontSize: 12 }}>Ведёт: {e.host}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 'auto' }}>
                <span className="num" style={{ fontWeight: 600 }}>{e.price}</span>
                <span style={{ fontSize: 11, color: 'var(--muted)' }}>{e.seats} мест</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="container" style={{ padding: '80px 28px 40px' }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(255,122,26,0.12), transparent 50%), var(--surface)',
          border: '1px solid var(--accent-line)',
          borderRadius: 16,
          padding: '48px 48px',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr',
          gap: 32,
          alignItems: 'center',
        }}>
          <div>
            <h2 style={{ fontSize: 36, lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 12 }}>
              Готовы начать?<br/>
              <span style={{ color: 'var(--accent)' }}>Первый час — −50%.</span>
            </h2>
            <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 480 }}>
              Заполните короткую анкету. Подтверждаем за пару часов и сразу даём
              доступ к каталогу зон.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button className="btn btn-primary btn-lg" style={{ justifyContent: 'center' }} onClick={() => onNav('signup')}>
              Зарегистрироваться <Icon name="arrow" />
            </button>
            <button className="btn btn-lg" style={{ justifyContent: 'center' }} onClick={() => onNav('catalog')}>
              Посмотреть каталог
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 32 }}>
        <div>
          <Brand />
          <p style={{ color: 'var(--muted)', fontSize: 12, marginTop: 12, maxWidth: 320 }}>
            Бьюти-коворкинг в центре Минска. Аренда рабочих мест для мастеров красоты.
          </p>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Навигация</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#">Каталог зон</a>
            <a href="#">Тарифы</a>
            <a href="#">Обучение</a>
            <a href="#">Регистрация</a>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Контакты</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#">+375 33 600 00 05</a>
            <a href="#">Минск, Скорины 2</a>
            <a href="#">Instagram</a>
          </div>
        </div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 12 }}>Компания</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="#">О проекте</a>
            <a href="#">Правила аренды</a>
            <a href="#">Договор оферты</a>
          </div>
        </div>
      </div>
      <div className="container" style={{ marginTop: 40, paddingTop: 20, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 11 }}>
        <span>© 2026 ООО «ХЭЛС ФИТ ПЛЮС» · УНП 193271196</span>
        <span className="mono">v 2.0 · for masters</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Landing, Footer });
