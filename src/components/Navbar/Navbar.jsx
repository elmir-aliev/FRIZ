import { useEffect, useRef, useState } from 'react';
import { useHashRoute } from '../../router/hashRouter';
import './Navbar.css';

const services = [
  { label: 'ДИЗАЙН-ИНТЕРЬЕРА', to: '/interior' },
  { label: 'РЕМОНТ ПОД КЛЮЧ', to: '/services/repair' },
];

const menu = [
  { label: 'МЕБЕЛИРОВКА', to: '/furniture' },
  { label: 'КУХНИ', to: '/kitchens' },
  { label: 'ПРОЕКТЫ', to: '/projects' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const route = useHashRoute();
  const onServicesPage = route.startsWith('/services');
  const mobileMenuRef = useRef(null);
  const burgerRef = useRef(null);

  const scrollToFooter = (e) => {
    e.preventDefault();
    const footer = document.getElementById('contacts');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth', block: 'end' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (!menuOpen) return;
    const onDocPointerDown = (e) => {
      if (
        mobileMenuRef.current?.contains(e.target) ||
        burgerRef.current?.contains(e.target)
      ) {
        return;
      }
      setMenuOpen(false);
      setServicesOpen(false);
    };
    document.addEventListener('pointerdown', onDocPointerDown);
    return () => document.removeEventListener('pointerdown', onDocPointerDown);
  }, [menuOpen]);

  return (
    <>
    <nav className="navbar">
      <div className="navbar__inner">
        <a
          href="#/"
          className="navbar__logo"
          aria-label="FRIZ, главная"
          onClick={() => {
            setMenuOpen(false);
            setServicesOpen(false);
          }}
        >
          <img src="/friz/logo.svg" alt="FRIZ" className="navbar__logoImg" draggable="false" />
        </a>

        <ul className="navbar__menu" aria-label="Главное меню">
          <li
            className={`navbar__item ${onServicesPage ? '' : 'navbar__item--dropdown'} ${servicesOpen && !onServicesPage ? 'is-open' : ''}`}
            onMouseLeave={() => setServicesOpen(false)}
          >
            {onServicesPage ? (
              <a className="navbar__link" href="#/services/interior">
                УСЛУГИ
              </a>
            ) : (
              <>
                <a
                  className="navbar__link navbar__link--trigger"
                  href="#/interior"
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen}
                  onClick={() => setServicesOpen(false)}
                >
                  УСЛУГИ
                </a>
                
              </>
            )}
          </li>

          {menu.map((item) => (
            <li className="navbar__item" key={item.to}>
              <a className="navbar__link" href={`#${item.to}`}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a className="navbar__contacts" href="#/contacts" onClick={scrollToFooter}>
          О НАС
        </a>

      <button ref={burgerRef} className="navbar__burger" onClick={() => setMenuOpen(!menuOpen)}>
        <span /><span /><span />
      </button>
      </div>
    </nav>

    {menuOpen && (
      <div className="navbar__mobile-menu"  ref={mobileMenuRef}>
        <button
          className="navbar__mobileTrigger"
          type="button"
          onClick={() => setServicesOpen((v) => !v)}
          
        >
          УСЛУГИ
        </button>

        {servicesOpen
          ? services.map((item) => (
              <a
                key={item.to}
                className="navbar__mobileSubLink"
                href={`#${item.to}`}
                onClick={() => {
                  setServicesOpen(false);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </a>
            ))
          : null}

        {menu.map((item) => (
          <a
            key={item.to}
            href={`#${item.to}`}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}

        <a
          href="#/contacts"
          onClick={(e) => {
            setMenuOpen(false);
            scrollToFooter(e);
          }}
        >
          О НАС
        </a>
      </div>
    )}
    </>
  );
}
