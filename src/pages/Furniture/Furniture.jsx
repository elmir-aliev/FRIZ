import ContactFormSection from '../../components/ContactFormSection/ContactFormSection';
import SiteFooter from '../../components/SiteFooter/SiteFooter';
import Reveal from '../../components/Reveal/Reveal';
import '../Interior/Interior.css';

export default function Furniture() {
  return (
    <>
      <section className="intHero">
        <img className="intHero__photo" src="/friz/hub/hero.webp" alt="Мебелировка" draggable="false" />
        <div className="intHero__overlay">
          <Reveal>
            <h1 className="intHero__title">
              Архитектура уюта, где каждая
              <br />
              деталь имеет смысл
            </h1>
          </Reveal>
        </div>
      </section>

      <section className="intAbout">
        <h3 className="intAbout__heading">Об услуге</h3>
        <div className="intAbout__content">
          <p className="intAbout__text">
            Мебелировка — это завершающий этап создания идеального интерьера. Мы подбираем мебель, освещение, технику и элементы декора в соответствии с дизайн-проектом, вашим бюджетом и стилем жизни. При необходимости изготавливаем мебель на заказ, чтобы она идеально вписалась в пространство, так как для нас — это искусство интеграции: мы проектируем корпусную мебель как продолжение архитектуры, избавляя дом от визуального шума, и дополняем её мягкими зонами, приглашающими к отдыху.
            В результате вы получаете полностью укомплектованный интерьер, где каждая деталь гармонично сочетается между собой и готова к комфортной жизни.
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

      <a className="intService intService--link" href="#/furniture/soft">
        <img className="intService__photo" src="/friz/hub/soft.webp" alt="Мягкая мебель" draggable="false" />
        <div className="intService__overlay">
          <Reveal>
            <h2 className="intService__title">Мягкая мебель</h2>
            <p className="intService__sub">
              Подбираем и изготавливаем мягкую мебель, которая сочетает комфорт, качество и современный дизайн. Диваны, кровати, кресла, пуфы и другие элементы подбираются индивидуально под интерьер, размеры помещения и ваши предпочтения, создавая уютное пространство для отдыха.
            </p>
          </Reveal>
        </div>
      </a>

      <a className="intService intService--link" href="#/furniture/case">
        <img className="intService__photo" src="/friz/hub/case.webp" alt="Корпусная мебель" draggable="false" />
        <div className="intService__overlay">
          <Reveal>
            <h2 className="intService__title">Корпусная мебель</h2>
            <p className="intService__sub">
              Проектируем и изготавливаем корпусную мебель на заказ: кухни, шкафы, гардеробные, прихожие, тумбы, стеллажи и другие решения. Каждое изделие создается по индивидуальным размерам, максимально эффективно используя пространство и идеально дополняя интерьер.
            </p>
          </Reveal>
        </div>
      </a>

      <ContactFormSection />
      <SiteFooter />
    </>
  );
}
