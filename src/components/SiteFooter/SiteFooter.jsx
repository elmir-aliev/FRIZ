import './SiteFooter.css';

export default function SiteFooter() {
  return (
    <footer className="siteFooter" id="contacts">
      <div className="siteFooter__inner">
        <h2 className="siteFooter__title">О нас</h2>

        <div className="siteFooter__grid">
          <div className="siteFooter__col">
            <div className="siteFooter__label">График</div>
            <div className="siteFooter__value">Пн - Вс 11:00 - 19:30</div>
          </div>

          <div className="siteFooter__col">
            <div className="siteFooter__label">Контакты</div>
            <a className="siteFooter__link" href="tel:+79910269468">
              +7 (991) 026-94-68
            </a>
            <a className="siteFooter__link" href="tel:+78001017964">
              +7 (800) 101-79-64
            </a>
            <a className="siteFooter__link" href="mailto:friz.spb@mail.ru">
              friz.spb@mail.ru
            </a>
          </div>

          <div className="siteFooter__col">
            <div className="siteFooter__label">Документы</div>
            <a
              className="siteFooter__link"
              href="/privacy-policy.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Политика конфиденциальности
            </a>
          </div>
        </div>

        <div className="siteFooter__bottomRow">
          <img
            className="siteFooter__image"
            src="/friz/blocks/footer/friz.webp"
            alt=""
            draggable="false"
            aria-hidden="true"
          />

          <div className="siteFooter__brandWrap" aria-hidden="true">
            <div className="siteFooter__line" />
            <img
              className="siteFooter__brand"
              src="/friz/logo.svg"
              alt="FRIZ"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
