import { mockCards } from "../../data/mockCards";

const CardPreview = ({ cards = mockCards, onEdit, onDelete }) => {
  return (
    <div className="card-preview">
      {cards.map((card) => (
        <div key={card.id} className="card-item">
          <div style={{ display: "flex", gap: 8 }}>
            <button
              className="edit-icon"
              aria-label={`Edit ${card.name}`}
              title="Edit card"
              onClick={() => typeof onEdit === "function" && onEdit(card)}
            >
              <i className="fa-solid fa-pen" aria-hidden="true" />
            </button>

            <button
              className="delete-icon"
              aria-label={`Delete ${card.name}`}
              title="Delete card"
              onClick={() => typeof onDelete === "function" && onDelete(card)}
            >
              <i className="fa-solid fa-trash" aria-hidden="true" />
            </button>
          </div>

          <h3>{card.name}</h3>
          <p>{card.rewards}%</p>
          <p>Category: {card.category}</p>
        </div>
      ))}
    </div>
  );
};

export default CardPreview;