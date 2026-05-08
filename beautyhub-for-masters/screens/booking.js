// screens/booking.jsx — booking flow (3 steps)

function Booking({ spaceId, onNav }) {
  const space = window.BH.SPACES.find(s => s.id === spaceId) || window.BH.SPACES[0];
  const [step, setStep] = useState(1);
  const [name, setName] = useState('Анна Соколова');
  const [phone, setPhone] = useState('+375 33 123 45 67');
  const [pay, setPay] = useState('card');
  const [agree, setAgree] = useState(true);

  const slots = ['11:00','12:00','13:00'];
  const total = slots.length * space.price;

  return (
    <main>
      <section className="container" style={{ padding: '48px 28px 16px' }}>
        <Stepper step={step} />
      </section>

      <section className="container" style={{ padding: '24px 28px 80px', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 32 }}>
        <div>
          {step === 0 && (
            <div>
              <h1 style={{ fontSize: 32, marginBottom: 24, letterSpacing: '-0.025em' }}>Выбрана зона</h1>
              <SpaceCard space={space} onOpen={() => onNav('space', space.id)} />
            </div>
          )}

          {step === 1 && (
            <div>
              <h1 style={{ fontSize: 32, marginBottom: 8, letterSpacing: '-0.025em' }}>Ваши данные</h1>
              <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>
                Бронь будет привязана к этому контакту. Подтверждение придёт в Telegram и на почту.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                <Field label="Имя">
                  <input className="input" value={name} onChange={e => setName(e.target.value)} />
                </Field>
                <Field label="Телефон">
                  <input className="input" value={phone} onChange={e => setPhone(e.target.value)} />
                </Field>
                <Field label="Email">
                  <input className="input" placeholder="anna@mail.com" />
                </Field>
                <Field label="Специализация">
                  <select className="input" defaultValue={space.type}>
                    {window.BH.SERVICE_TYPES.filter(t => t.id !== 'all').map(t => (
                      <option key={t.id} value={t.id}>{t.label}</option>
                    ))}
                  </select>
                </Field>
                <div style={{ gridColumn: 'span 2' }}>
                  <Field label="Комментарий администратору (опционально)">
                    <textarea className="input" rows={3} placeholder="Например: нужен дополнительный стул для клиента" style={{ resize: 'vertical', padding: 12 }} />
                  </Field>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Способ оплаты</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
                  {[
                    { id: 'card', label: 'Карта', sub: 'Visa · Mastercard · Belkart' },
                    { id: 'erip', label: 'ЕРИП',  sub: 'Через интернет-банк' },
                    { id: 'sub',  label: 'Подписка', sub: '20 смен · −28%' },
                  ].map(p => (
                    <div key={p.id}
                         onClick={() => setPay(p.id)}
                         style={{
                           padding: 16,
                           background: 'var(--surface)',
                           border: `1px solid ${pay === p.id ? 'var(--accent)' : 'var(--border)'}`,
                           borderRadius: 10, cursor: 'pointer',
                         }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, fontSize: 14 }}>{p.label}</span>
                        <span style={{
                          width: 16, height: 16, borderRadius: '50%',
                          border: `1px solid ${pay === p.id ? 'var(--accent)' : 'var(--border-strong)'}`,
                          background: pay === p.id ? 'var(--accent)' : 'transparent',
                        }} />
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--muted)' }}>{p.sub}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h1 style={{ fontSize: 32, marginBottom: 8, letterSpacing: '-0.025em' }}>Готово к подтверждению</h1>
              <p style={{ color: 'var(--muted)', marginBottom: 28, fontSize: 14 }}>
                Проверьте детали и подтвердите бронь. Деньги списываются после подтверждения.
              </p>

              <div className="card" style={{ padding: 24, marginBottom: 16 }}>
                <Row k="Зона"        v={`${space.code} · ${space.title}`} />
                <Row k="Дата"        v="14 мая 2026, четверг" />
                <Row k="Время"       v={`${slots[0]} – ${slots[slots.length-1].replace(':00', ':59')} (${slots.length} ч)`} />
                <Row k="Слоты"       v={slots.join(' · ')} mono />
                <Row k="Мастер"      v={name} />
                <Row k="Телефон"     v={phone} mono />
                <Row k="Оплата"      v={{ card: 'Карта', erip: 'ЕРИП', sub: 'Подписка' }[pay]} />
              </div>

              <label style={{ display: 'flex', gap: 12, alignItems: 'flex-start', cursor: 'pointer', fontSize: 13, color: 'var(--muted)' }}>
                <input type="checkbox" checked={agree} onChange={e => setAgree(e.target.checked)}
                       style={{ marginTop: 3, accentColor: 'var(--accent)' }} />
                <span>
                  Я ознакомлен и согласен с правилами аренды коворкинга, политикой отмены брони
                  (бесплатно за 24ч до начала) и обработкой персональных данных.
                </span>
              </label>
            </div>
          )}

          {/* Nav */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
            <button className="btn" onClick={() => step > 0 ? setStep(step - 1) : onNav('space', space.id)}>
              <Icon name="arrowL" />
              Назад
            </button>
            {step < 2 ? (
              <button className="btn btn-primary btn-lg" onClick={() => setStep(step + 1)}>
                Далее <Icon name="arrow" />
              </button>
            ) : (
              <button className="btn btn-primary btn-lg" disabled={!agree}
                      onClick={() => onNav('confirmed', space.id)}>
                Подтвердить и оплатить · {total} ₽
              </button>
            )}
          </div>
        </div>

        {/* Order summary */}
        <aside>
          <div className="card" style={{ padding: 22, position: 'sticky', top: 88 }}>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Сводка брони</div>
            <Photo label={space.photos[0]} h={140} style={{ marginBottom: 14 }} />
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{space.title}</h3>
            <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 18 }}>
              <span className="mono">{space.code}</span> · {space.roomLabel} · Этаж {space.floor}
            </div>

            <Row k="Дата" v="14 мая, чт" />
            <Row k="Время" v={`${slots[0]} – ${slots[slots.length-1].replace(':00',':59')}`} mono />
            <Row k="Слоты" v={`${slots.length}ч`} />

            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: 'var(--muted)' }}>{slots.length}ч × {space.price} ₽</span>
                <span className="num">{total} ₽</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 12 }}>
                <span style={{ fontWeight: 600 }}>Итого</span>
                <span className="num" style={{ fontSize: 22, fontWeight: 600, color: 'var(--accent)' }}>{total} ₽</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}

function Confirmed({ spaceId, onNav }) {
  const space = window.BH.SPACES.find(s => s.id === spaceId) || window.BH.SPACES[0];
  return (
    <main className="container" style={{ padding: '80px 28px', maxWidth: 720, textAlign: 'center' }}>
      <div style={{
        width: 64, height: 64, borderRadius: '50%',
        background: 'var(--accent-soft)', border: '1px solid var(--accent-line)',
        display: 'grid', placeItems: 'center', margin: '0 auto 24px',
        color: 'var(--accent)',
      }}>
        <Icon name="check" size={28} />
      </div>
      <h1 style={{ fontSize: 40, letterSpacing: '-0.025em', marginBottom: 12 }}>Бронь подтверждена</h1>
      <p style={{ color: 'var(--muted)', fontSize: 15, marginBottom: 32 }}>
        Мы отправили QR-доступ в Telegram. Покажите его на ресепшене — и можно работать.
      </p>
      <div className="card" style={{ padding: 24, textAlign: 'left', marginBottom: 24 }}>
        <Row k="Бронь №" v="BH-2026-04781" mono />
        <Row k="Зона" v={`${space.code} · ${space.title}`} />
        <Row k="Дата" v="14 мая 2026, чт · 11:00–13:59" />
      </div>
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
        <button className="btn btn-primary" onClick={() => onNav('catalog')}>
          Забронировать ещё
        </button>
        <button className="btn" onClick={() => onNav('landing')}>На главную</button>
      </div>
    </main>
  );
}

function Field({ label, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
      {children}
    </label>
  );
}

function Row({ k, v, mono }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)', fontSize: 13 }}>
      <span style={{ color: 'var(--muted)' }}>{k}</span>
      <span className={mono ? 'num' : ''}>{v}</span>
    </div>
  );
}

Object.assign(window, { Booking, Confirmed, Field, Row });
