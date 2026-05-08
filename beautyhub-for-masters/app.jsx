// app.jsx — main App shell + routing

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "cardLayout": "photo",
  "tone": "premium"
}/*EDITMODE-END*/;

const COPY = {
  premium: {
    heroEyebrow: 'Минск · Франциска Скорины 2',
    landingTitle: 'Рабочее место для бьюти-мастера. Без салона. Без обязательств.',
  },
  bold: {
    heroEyebrow: 'BeautyHub · Минск',
    landingTitle: 'Заработай больше. Без аренды салона.',
  },
  warm: {
    heroEyebrow: 'Своё пространство в центре Минска',
    landingTitle: 'Место, где удобно работать каждый день.',
  },
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [screen, setScreen] = useState('landing');
  const [spaceId, setSpaceId] = useState('N-04');

  const onNav = (s, id) => {
    setScreen(s);
    if (id) setSpaceId(id);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Apply tone to body via copy data attribute (consumed where relevant via window.BH_TONE)
  useEffect(() => { window.BH_TONE = t.tone; }, [t.tone]);

  return (
    <div className="app" data-tone={t.tone}>
      <TopBar screen={screen} onNav={onNav} />
      <div className="fade-up" key={screen + spaceId}>
        {screen === 'landing'   && <Landing onNav={onNav} />}
        {screen === 'catalog'   && <Catalog onNav={onNav} layout={t.cardLayout} />}
        {screen === 'space'     && <SpaceDetail spaceId={spaceId} onNav={onNav} />}
        {screen === 'booking'   && <Booking spaceId={spaceId} onNav={onNav} />}
        {screen === 'confirmed' && <Confirmed spaceId={spaceId} onNav={onNav} />}
        {screen === 'pricing'   && <Pricing onNav={onNav} />}
        {screen === 'events'    && <Events onNav={onNav} />}
        {screen === 'signup'    && <Signup onNav={onNav} />}
      </div>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Карточки" />
        <TweakRadio label="Стиль карточек" value={t.cardLayout}
                    options={[
                      { value: 'photo', label: 'Фото' },
                      { value: 'data',  label: 'Данные' },
                    ]}
                    onChange={(v) => setTweak('cardLayout', v)} />
        <TweakSection label="Tone of voice" />
        <TweakRadio label="Тон копирайта" value={t.tone}
                    options={[
                      { value: 'premium', label: 'Премиум' },
                      { value: 'bold',    label: 'Дерзко' },
                      { value: 'warm',    label: 'Тёпло' },
                    ]}
                    onChange={(v) => setTweak('tone', v)} />
        <TweakSection label="Навигация" />
        <TweakButton label="Открыть каталог" onClick={() => onNav('catalog')} />
        <TweakButton label="Открыть карточку зоны" onClick={() => onNav('space', 'N-04')} />
        <TweakButton label="Открыть бронирование" onClick={() => onNav('booking', 'N-04')} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
