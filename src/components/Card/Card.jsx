import './Card.css';

export default function Card({ icon, title, description }) {
  return (
    <div className="card">
      <div className="card__icon">{icon}</div>
      <h3 className="card__title">{title}</h3>
      <p className="card__description">{description}</p>
    </div>
  );
}
