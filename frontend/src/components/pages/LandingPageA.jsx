import { useState, useMemo, useEffect } from "react";
import CardPreview from "../layout/CardPreview";
import { mockCards } from "../../data/mockCards";
import Button from "../common/Button";
import AddCardModal from "../common/AddCardModal";
import ConfirmModal from "../common/ConfirmModal";

const LandingPageA = () => {
  const [query, setQuery] = useState("");
  const [cards, setCards] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("bestcard_user_cards") || "[]");
      return [...mockCards, ...saved];
    } catch {
      return [...mockCards];
    }
  });

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);

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

  // keep localStorage in sync for user-added cards only
  useEffect(() => {
    try {
      const userOnly = cards.filter((c) => !mockCards.find((m) => m.id === c.id));
      localStorage.setItem("bestcard_user_cards", JSON.stringify(userOnly));
    } catch {
      // ignore
    }
  }, [cards]);

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
        onAdd={(data) => {
          const existingIds = cards.map((c) => Number(c.id) || 0);
          const nextId = existingIds.length ? Math.max(...existingIds) + 1 : 1;
          const newCard = { id: nextId, ...data };
          setCards((prev) => [...prev, newCard]);
          setShowAddModal(false);
        }}
        onUpdate={(updated) => {
          setCards((prev) => prev.map((c) => (c.id === updated.id ? { ...c, ...updated } : c)));
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
        onConfirm={() => {
          if (!deleteCandidate) return;
          setCards((prev) => prev.filter((c) => c.id !== deleteCandidate.id));
          // clear edit state and close add/edit modal if it was open for this card
          if (editingCard && deleteCandidate && editingCard.id === deleteCandidate.id) {
            setEditingCard(null);
            setShowAddModal(false);
          }
          setDeleteCandidate(null);
        }}
        onCancel={() => setDeleteCandidate(null)}
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
                  style={{ width: `${item.pct * 10}%`, background: item.color }}
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
