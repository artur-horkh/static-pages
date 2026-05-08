// screens/signup.jsx — onboarding/registration

function Signup({ onNav }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    name: '', phone: '', email: '',
    spec: 'nails',
    exp: '3-5',
    portfolio: 'instagram',
    plan: 'shift',
  });
  const set = (k, v) => setData(d => ({ ...d, [k]: v }));

  const steps = ['О вас', 'Специализация', 'Тариф', 'Готово'];

  return (
    <main>
      <section className="container" style={{ padding: '48px 28px 24px', maxWidth: 920, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="eyebrow">Регистрация мастера · {step + 1} / {steps.length}</span>
        </div>
        <h1 style={{ fontSize: 40, letterSpacing: '-0.025em', marginBottom: 28 }}>
          {step === 0 && 'Расскажите о себе'}
          {step === 1 && 'Что вы делаете?'}
          {step === 2 && 'Выберите тариф'}
          {step === 3 && 'Заявка отправлена'}
        </h1>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 6, marginBottom: 36 }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              flex: 1, height: 3, borderRadius: 2,
              background: i <= step ? 'var(--accent)' : 'var(--surface-2)',
            }} />
          ))}
        </div>

        <div className="card" style={{ padding: 32 }}>
          {step === 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Field label="Имя и фамилия">
                <input className="input" value={data.name} onChange={e => set('name', e.target.value)} placeholder="Анна Соколова" />
              </Field>
              <Field label="Телефон">
                <input className="input" value={data.phone} onChange={e => set('phone', e.target.value)} placeholder="+375 33 ___ __ __" />
              </Field>
              <Field label="Email">
                <input className="input" value={data.email} onChange={e => set('email', e.target.value)} placeholder="anna@mail.com" />
              </Field>
              <Field label="Telegram">
                <input className="input" placeholder="@username" />
              </Field>
              <div style={{ gridColumn: 'span 2' }}>
                <Field label="Город">
                  <select className="input" defaultValue="minsk">
                    <option value="minsk">Минск</option>
                    <option value="grodno">Гродно</option>
                    <option value="brest">Брест</option>
                  </select>
                </Field>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <div className="eyebrow" style={{ marginBottom: 12 }}>Основная специализация</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
                {window.BH.SERVICE_TYPES.filter(t => t.id !== 'all').map(s => (
                  <div key={s.id} onClick={() => set('spec', s.id)} style={{
                    padding: 16, textAlign: 'center', cursor: 'pointer',
                    background: 'var(--surface-2)',
                    border: `1px solid ${data.spec === s.id ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 10,
                    color: data.spec === s.id ? 'var(--accent)' : 'var(--text)',
                    fontWeight: 500, fontSize: 13,
                  }}>
                    {s.label}
                  </div>
                ))}
              </div>

              <div className="eyebrow" style={{ marginBottom: 12 }}>Опыт работы</div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
                {[['0-1','до 1 года'],['1-3','1–3 года'],['3-5','3–5 лет'],['5+','более 5 лет']].map(([id, lbl]) => (
                  <span key={id} className={`chip ${data.exp === id ? 'active' : ''}`}
                        style={{ padding: '8px 14px' }}
                        onClick={() => set('exp', id)}>
                    {lbl}
                  </span>
                ))}
              </div>

              <div className="eyebrow" style={{ marginBottom: 12 }}>Портфолио</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                {[['instagram','Instagram'],['file','Загрузить файлы'],['none','Покажу при встрече']].map(([id, lbl]) => (
                  <div key={id} onClick={() => set('portfolio', id)} style={{
                    padding: 14, cursor: 'pointer',
                    background: 'var(--surface-2)',
                    border: `1px solid ${data.portfolio === id ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: 10, fontSize: 13,
                    color: data.portfolio === id ? 'var(--accent)' : 'var(--text)',
                    fontWeight: 500, textAlign: 'center',
                  }}>
                    {lbl}
                  </div>
                ))}
              </div>
              {data.portfolio === 'instagram' && (
                <div style={{ marginTop: 14 }}>
                  <input className="input" placeholder="@your_handle" />
                </div>
              )}
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
              {window.BH.TARIFFS.map(t => (
                <div key={t.id} onClick={() => set('plan', t.id)} style={{
                  padding: 24,
                  background: 'var(--surface-2)',
                  border: `1px solid ${data.plan === t.id ? 'var(--accent)' : 'var(--border)'}`,
                  borderRadius: 12, cursor: 'pointer',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 600 }}>{t.name}</h3>
                    {t.save && <span className="badge accent">{t.save}</span>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
                    <span className="num" style={{ fontSize: 32, fontWeight: 600 }}>{t.price}</span>
                    <span style={{ color: 'var(--muted)', fontSize: 12 }}>{t.unit}</span>
                  </div>
                  <p style={{ color: 'var(--muted)', fontSize: 12, margin: 0 }}>{t.desc}</p>
                </div>
              ))}
            </div>
          )}

          {step === 3 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'var(--accent-soft)', border: '1px solid var(--accent-line)',
                display: 'grid', placeItems: 'center', margin: '0 auto 24px',
                color: 'var(--accent)',
              }}>
                <Icon name="check" size={28} />
              </div>
              <h2 style={{ fontSize: 26, marginBottom: 12, letterSpacing: '-0.02em' }}>Спасибо!</h2>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 28, maxWidth: 480, margin: '0 auto 28px' }}>
                Заявка отправлена. Администратор свяжется с вами в течение нескольких часов
                для подтверждения и выдачи доступа к каталогу зон.
              </p>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="btn btn-primary" onClick={() => onNav('catalog')}>Открыть каталог</button>
                <button className="btn" onClick={() => onNav('landing')}>На главную</button>
              </div>
            </div>
          )}
        </div>

        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
            <button className="btn" onClick={() => step > 0 ? setStep(step - 1) : onNav('landing')}>
              <Icon name="arrowL" /> Назад
            </button>
            <button className="btn btn-primary btn-lg" onClick={() => setStep(step + 1)}>
              {step === 2 ? 'Отправить заявку' : 'Далее'} <Icon name="arrow" />
            </button>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}

Object.assign(window, { Signup });
