import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CardPreview from "../layout/CardPreview";
import { getCards, deleteCard } from "../../services/cardService";
import { logout } from "../../services/authService";
import Button from "../common/Button";
import AddCardModal from "../common/AddCardModal";
import ConfirmModal from "../common/ConfirmModal";

const LandingPageA = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };


  // memoize filtered results for performance
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        (c.name && c.name.toLowerCase().includes(q)) ||
        (c.category && c.category.toLowerCase().includes(q))
    );
  }, [query, cards]);

  const fetchCards = async () => {
    try {
      const response = await getCards();

      const formattedCards = response.data.map((card) => ({
        id: card.id,
        name: card.cardName,
        category: card.category,
        rewards: card.discount
      }));

      setCards(formattedCards);

    } catch (error) {
      console.error("Failed to load cards", error);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  const colorPalette = [
    "#d9534f",
    "#f0ad4e",
    "#0275d8",
    "#20c997",
    "#28a745",
    "#8f6076ff",
    "#6f42c1",
    "#fd7e14",
  ];

  const discountItems = cards.map((card, idx) => {
    const pct = Number(card.rewards) || parseFloat(card.rewards) || 0;
    const color = colorPalette[idx % colorPalette.length];
    return { id: card.id, label: card.name, pct, color };
  });

  return (
    <main>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "10px" }}>
        <Button
          className="logout-btn"
          onClick={handleLogout} ariaLabel="Logout">Logout
        </Button>
      </div>
      <div className="search-row">
        <label htmlFor="card-search" className="search-label">
          Search cards:
        </label>

        <div className="search-controls" style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            id="card-search"
            className="search-input"
            type="search"
            value={query}
            placeholder="Search by name or rewards..."
            onChange={(e) => setQuery(e.target.value)}
          />

          <Button
            className="add-card-button"
            onClick={() => {
              setEditingCard(null);
              setShowAddModal(true);
            }}
            ariaLabel="Add a new card"
          >
            Add Card
          </Button>
        </div>
      </div>
      <AddCardModal
        isOpen={showAddModal}
        initialData={editingCard}
        onClose={() => {
          setEditingCard(null);
          setShowAddModal(false);
        }}
        onAdd={() => {
          fetchCards();
          setShowAddModal(false);
        }}
        onUpdate={() => {
          fetchCards();
          setEditingCard(null);
          setShowAddModal(false);
        }}
      />

      <CardPreview
        cards={filtered}
        onEdit={(card) => {
          setEditingCard(card);
          setShowAddModal(true);
        }}
        onDelete={(card) => {
          // open confirmation modal instead of deleting immediately
          setDeleteCandidate(card);
        }}
      />

      <ConfirmModal
        isOpen={!!deleteCandidate}
        title="Delete card"
        message={deleteCandidate ? `Delete ${deleteCandidate.name}? This cannot be undone.` : "Delete?"}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={async () => {
          if (!deleteCandidate) return;

          try {
            await deleteCard(deleteCandidate.id);

            // refresh cards
            fetchCards();

          } catch (error) {
            console.error("Failed to delete card", error);
          }

          setDeleteCandidate(null);
        }}
      />
      <section aria-label="category-discounts" className="discount-card">
        <h3 className="discount-tracker-title">Discount Tracker</h3>
        <p className="discount-desc">Category discounts and progress</p>

        <div className="discount-list">
          {discountItems.map((item) => (
            <div key={item.id}>
              <div className="discount-item-row">
                <span className="discount-item-label">{item.label}</span>
                <span className="discount-item-pct">{`${item.pct}%`}</span>
              </div>

              <div className="discount-track">
                <div
                  className="discount-fill"
                  style={{ width: `${Math.min(item.pct * 10, 100)}%`, background: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
      <br />
    </main>
  );
};

export default LandingPageA;
