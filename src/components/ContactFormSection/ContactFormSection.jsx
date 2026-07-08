import { useState } from 'react';
import './ContactFormSection.css';

const WEB3FORMS_KEY = '40071198-9716-40c2-ab4e-dfd0c4596ade';

export default function ContactFormSection() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === 'sending') return;
    if (!name.trim() || !phone.trim() || !consent) return;

    setStatus('sending');
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: 'Новая заявка с сайта FRIZ',
          from_name: 'Сайт FRIZ',
          Имя: name.trim(),
          Телефон: phone.trim(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        setStatus('success');
        setName('');
        setPhone('');
        setConsent(false);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="contactForm" id="request">
      <div className="contactForm__inner">
        <p className="contactForm__lead">Заполните форму или свяжитесь удобным способом</p>

        <div className="contactForm__links">
          <a href="https://www.instagram.com/friz.spb/">Instagram</a>
          <a href="https://t.me/frizmanager">Telegram</a>
          <a href="tel:+79910269468">+7 (991) 026-94-68</a>
        </div>

        <form className="contactForm__form" onSubmit={handleSubmit}>
          <label className="contactForm__field">
            <input
              type="text"
              name="name"
              placeholder="Имя*"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="contactForm__field">
            <input
              type="tel"
              name="phone"
              placeholder="Номер телефона*"
              inputMode="tel"
              autoComplete="tel"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value.replace(/[^\d+\s()-]/g, ''))}
            />
          </label>

          <label className="contactForm__consent">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            <span>
              Я подтверждаю, что ознакомился с политикой конфиденциальности в отношении обработки персональных данных
            </span>
          </label>

          <div className="contactForm__actions">
            <button
              className="frizBtn frizBtn--dark"
              type="submit"
              disabled={status === 'sending' || !name.trim() || !phone.trim() || !consent}
            >
              {status === 'sending' ? 'Отправляем…' : 'Отправить'}
            </button>
            {status === 'success' && (
              <p className="contactForm__status contactForm__status--ok">
                Спасибо! Заявка отправлена — мы скоро свяжемся с вами.
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
