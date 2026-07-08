import { useEffect, useRef, useState } from 'react';
import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import Reveal from '../../components/Reveal/Reveal';
import './Interior.css';

const INTERIOR_STEPS = [
  {
    num: '01',
    title: 'Дизайн-проект',
    points: [
      'Обсуждаем ваши пожелания, стиль, бюджет и задачи будущего интерьера',
      'Выезд специалистов для замера помещения с помощью лазерного сканирования',
      'Заполнение брифа и разбор референсов — дизайнер анализирует и учитывает ваши пожелания',
      'Разработка планов, выбор отделки и мебели в трёх разных вариантах',
      'Проработка концепции интерьера — интерьерных коллажей, мудбордов цветовой гаммы',
      'Создаем реалистичные 3D-визуализации, чтобы вы увидели будущий интерьер еще до начала ремонта',
      'Разработка рабочей документации',
    ],
  },
  {
    num: '02',
    title: 'Реализация проекта',
    points: [
      'Подготовка объекта. Демонтажные работы, подготовка помещений и закупка необходимых материалов',
      'Черновые работы. Монтаж инженерных коммуникаций, электрики, сантехники, выравнивание стен, полов и потолков',
      'Чистовая отделка. Укладка напольных покрытий, покраска, плиточные работы, установка дверей, освещения и других элементов',
      'Комплектация интерьера. Подбираем и устанавливаем мебель, технику, освещение и предметы декора в соответствии с дизайн-проектом',
      ' Сдача готового объекта. Проводим финальную проверку качества, уборку помещения и передаем полностью готовый интерьер заказчику',
    ],
  },
];

const INTERIOR_PACKAGES = [
  {
    title: 'ПАКЕТ «ЭСКИЗНЫЙ»',
    src: '/friz/services/sketch.webp',
    text:
      'Отрисовка коллажей, без 3д визуализации,  ' +
      'подходит для тех, кто уже имеет точное  ' +
      'представления интерьера'
  },
  {
    title: 'ПАКЕТ «АВТОРСКИЙ»',
    src: '/friz/services/author.webp',
    text:
      'Стандартный набор услуг, закрывающий основные потребности для ' +
      'реализации проекта. Подходит для базовых запросов создания интерьера ' +
      'без углубления в авторскую концепцию',
  },
  {
    title: 'ПАКЕТ «ПРЕМИУМ»',
    src: '/friz/services/premium.webp',
    text:
      'Глубокая проработка интерьера со стороны стилистических и технических ' +
      'решений. Подходит для реализации нешаблонных задач, при запросе на ' +
      'индивидуальный сложный стиль, при необходимости проектирования ' +
      'архитектурных конструкций, арт-элементов',
  },
];

const REPAIR_STEPS = [
  {
    num: '01',
    title: 'Консультация и замер',
    text: 'Выезжаем на объект, выполняем замеры, обсуждаем ваши пожелания и составляем предварительную смету.',
  },
  {
    num: '02',
    title: 'Подготовка проекта',
    text: 'Согласовываем план работ, материалы, сроки и заключаем договор.',
  },
  {
    num: '03',
    title: 'Демонтаж и подготовка',
    text: 'Выполняем демонтаж старых покрытий и конструкций, подготавливаем помещение к ремонту.',
  },
  {
    num: '04',
    title: 'Черновые работы',
    text: 'Прокладываем инженерные коммуникации, выполняем электромонтаж, сантехнические работы, выравниваем стены, полы и потолки.',
  },
  {
    num: '05',
    title: 'Чистовая отделка',
    text: 'Укладываем плитку и напольные покрытия, красим стены, устанавливаем двери, потолки, освещение и сантехнику.',
  },
  {
    num: '06',
    title: 'Комплектация и меблировка',
    text: 'Устанавливаем мебель, бытовую технику и декоративные элементы, полностью завершая интерьер.',
  },
  {
    num: '07',
    title: 'Сдача объекта',
    text: 'Проводим финальную проверку качества, выполняем уборку и передаем вам полностью готовый объект, соответствующий проекту.',
  },
];

const REPAIR_GALLERY = [
  { caption: 'Уют и комфорт', src: '/friz/services/repair-gal-1.webp' },
  { caption: 'Уют и комфорт', src: '/friz/services/repair-gal-2.webp' },
  { caption: 'Уют и комфорт', src: '/friz/services/repair-gal-3.webp' },
];

export default function Interior({ initialTab = 'interior' }) {
  const [tab, setTab] = useState(initialTab === 'repair' ? 'repair' : 'interior');
  const interiorRef = useRef(null);
  const repairRef = useRef(null);
  const [bar, setBar] = useState({ top: 0, trackLeft: 0, trackWidth: 0, indLeft: 0, indWidth: 0 });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setTab(initialTab === 'repair' ? 'repair' : 'interior');
  }, [initialTab]);

  useEffect(() => {
    const measure = () => {
      const a = interiorRef.current;
      const b = repairRef.current;
      if (!a || !b) return;
      const active = tab === 'repair' ? b : a;
      setBar({
        top: a.offsetTop + a.offsetHeight - 1,
        trackLeft: a.offsetLeft,
        trackWidth: b.offsetLeft + b.offsetWidth - a.offsetLeft,
        indLeft: active.offsetLeft,
        indWidth: active.offsetWidth,
      });
    };
    measure();
    document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [tab]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <>
      <section className="intHero">
        <img className="intHero__photo" src="/friz/services/hero.webp" alt="" draggable="false" />
        <div className="intHero__overlay">
          <Reveal>
            <h1 className="intHero__title">
              Выход за рамки привычного.
              <br />
              Искусство создавать пространство
            </h1>
          </Reveal>
        </div>
      </section>

      <div className="intTabs">
        <div className="intTabs__inner">
          <button
            ref={interiorRef}
            type="button"
            className={`intTabs__btn ${tab === 'interior' ? 'is-active' : ''}`}
            onClick={() => setTab('interior')}
          >
            Дизайн интерьера
          </button>
          <button
            ref={repairRef}
            type="button"
            className={`intTabs__btn ${tab === 'repair' ? 'is-active' : ''}`}
            onClick={() => setTab('repair')}
          >
            Ремонт под ключ
          </button>
          <span
            className="intTabs__track"
            aria-hidden="true"
            style={{ top: bar.top, left: bar.trackLeft, width: bar.trackWidth }}
          />
          <span
            className={`intTabs__indicator ${ready ? 'is-ready' : ''}`}
            aria-hidden="true"
            style={{ top: bar.top, width: bar.indWidth, transform: `translateX(${bar.indLeft}px)` }}
          />
        </div>
      </div>

      {tab === 'interior' ? <InteriorTab /> : <RepairTab />}

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}

function InteriorTab() {
  const [pkg, setPkg] = useState(0);
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const len = INTERIOR_PACKAGES.length;
  const frameRef = useRef(null);
  const startX = useRef(null);

  const clamp = (i) => Math.min(len - 1, Math.max(0, i));

  const onPointerDown = (e) => {
    startX.current = e.clientX;
    setDragging(true);
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (startX.current == null) return;
    let dx = e.clientX - startX.current;
    if ((pkg === 0 && dx > 0) || (pkg === len - 1 && dx < 0)) dx *= 0.35;
    setDragX(dx);
  };
  const onPointerUp = () => {
    if (startX.current == null) return;
    const w = frameRef.current?.offsetWidth || 1;
    const dx = dragX;
    startX.current = null;
    setDragging(false);
    setDragX(0);
    if (Math.abs(dx) > w * 0.15) setPkg((i) => clamp(i + (dx < 0 ? 1 : -1)));
  };

  const wheelLock = useRef(false);
  const onWheel = (e) => {
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 24) return;
    if (wheelLock.current) return;
    wheelLock.current = true;
    setPkg((i) => clamp(i + (e.deltaX > 0 ? 1 : -1)));
    setTimeout(() => {
      wheelLock.current = false;
    }, 450);
  };

  return (
    <>
      <section className="intService">
        <img className="intService__photo" src="/friz/services/design-hero.webp" alt="Дизайн интерьера" draggable="false" />
        <div className="intService__overlay">
          <Reveal>
            <h2 className="intService__title">Дизайн интерьера</h2>
            <p className="intService__sub">
              Полный цикл создания интерьера — от идеи до готового пространства.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="intAbout">
        <h3 className="intAbout__heading">Об услуге</h3>
        <div className="intAbout__content">
          <p className="intAbout__text">
            Разрабатываем современные дизайн-проекты любой сложности и создаем фотореалистичные 3D-визуализации. Мы помогаем реализовать уникальные интерьерные решения, превращая ваши идеи в продуманные и функциональные пространства.
          </p>
          <button
            type="button"
            className="frizBtn frizBtn--outline intAbout__btn"
            onClick={() =>
              document
                .getElementById('request')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            Обсудить проект
          </button>
        </div>
      </section>

      <section className="intSteps">
        <h3 className="intSteps__heading">Этапы работы</h3>
        {INTERIOR_STEPS.map((step) => (
          <div key={step.num} className="intSteps__row">
            <div className="intSteps__num">{step.num}</div>
            <div className="intSteps__title">{step.title}</div>
            <ul className="intSteps__list">
              {step.points.map((p, i) => (
                <li key={i}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="intPackage intPackage--light">
        <div
          className="intPackage__frame"
          ref={frameRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
        >
          <div
            className={`intPackage__track ${dragging ? 'is-dragging' : ''}`}
            style={{ transform: `translateX(calc(${-pkg * 100}% + ${dragX}px))` }}
          >
            {INTERIOR_PACKAGES.map((p, i) => (
              <div className="intPackage__slide" key={i} aria-hidden={i !== pkg}>
                <img
                  className="intPackage__photo"
                  src={p.src}
                  alt=""
                  draggable="false"
                  loading={i === 0 ? undefined : 'lazy'}
                />
                <div className="intPackage__info">
                  <h3 className="intPackage__title">{p.title}</h3>
                  <p className="intPackage__text">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          {pkg > 0 && (
            <button
              type="button"
              className="intPackage__edge intPackage__edge--prev"
              aria-label="Предыдущий пакет"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setPkg((i) => clamp(i - 1))}
            />
          )}
          {pkg < len - 1 && (
            <button
              type="button"
              className="intPackage__edge intPackage__edge--next"
              aria-label="Следующий пакет"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setPkg((i) => clamp(i + 1))}
            />
          )}
          <div className="intPackage__dots">
            {INTERIOR_PACKAGES.map((p, i) => (
              <button
                key={i}
                type="button"
                className={`intPackage__dot ${i === pkg ? 'is-active' : ''}`}
                aria-label={p.title}
                aria-current={i === pkg}
                onClick={() => setPkg(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function RepairTab() {
  const [shot, setShot] = useState(null);
  return (
    <>
      <section className="intService">
        <img className="intService__photo" src="/friz/services/repair-hero.webp" alt="Комплексный ремонт под ключ" draggable="false" />
        <div className="intService__overlay">
          <Reveal>
            <h2 className="intService__title">Комплексный ремонт под ключ</h2>
            <p className="intService__sub">
              Полный цикл создания интерьера — от идеи до готового пространства.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="intAbout">
        <h3 className="intAbout__heading">Об услуге</h3>
        <div className="intAbout__content">
          <p className="intAbout__text">
            Ремонт под ключ — это комплексное решение, при котором мы полностью берем на себя все этапы работ: от демонтажа и подготовки помещения до чистовой отделки, установки сантехники, освещения и мебели. Вам не придется искать разных подрядчиков и контролировать каждый процесс — мы организуем весь ремонт, соблюдая сроки, качество и утвержденный бюджет
          </p>
          <button
            type="button"
            className="frizBtn frizBtn--outline intAbout__btn"
            onClick={() =>
              document
                .getElementById('request')
                ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }
          >
            Обсудить проект
          </button>
        </div>
      </section>

      <section className="intSteps intSteps--compact">
        <h3 className="intSteps__heading">Этапы ремонта под ключ</h3>
        {REPAIR_STEPS.map((step) => (
          <div key={step.num} className="intSteps__row intSteps__row--compact">
            <div className="intSteps__num">{step.num}</div>
            <div className="intSteps__title">{step.title}</div>
            <p className="intSteps__text">{step.text}</p>
          </div>
        ))}
      </section>



      <section className="intPackage">
        <img className="intPackage__photo" src="/friz/services/repair-works.webp" alt="" draggable="false" />
        <div className="intPackage__overlay">
          <Reveal>
            <h3 className="intPackage__title">РЕМОНТНЫЕ РАБОТЫ</h3>
            <p className="intPackage__text">
              У нас своя строительная бригада в СПб и Москве. С бригадирами на каждом
              объекте на три проекта, помощь видим как одну работу, а если одна
              бригада сидит на объекте — приезжаем другую. Прорабы и бригады
              приходят руководители и комплектатор.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
