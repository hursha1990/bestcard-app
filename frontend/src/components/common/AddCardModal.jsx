import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import "./common.css";

const AddCardModal = ({ isOpen, onClose, onAdd, initialData = null, onUpdate }) => {
  const [cardName, setCardName] = useState("");
  const [category, setCategory] = useState("");
  const [discount, setDiscount] = useState("");
  const [errors, setErrors] = useState({ name: "", category: "", discount: "" });
  const nameRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      // populate fields when editing, otherwise reset for add
      if (initialData) {
        setCardName(initialData.name || "");
        setCategory(initialData.category || "");
        setDiscount(initialData.rewards != null ? String(initialData.rewards) : "");
      } else {
        setCardName("");
        setCategory("");
        setDiscount("");
      }
      setErrors({ name: "", category: "", discount: "" });
      // focus first field for accessibility
      setTimeout(() => nameRef.current?.focus(), 0);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validateName = (val) => {
    if (!val.trim()) return "Card name is required.";
    if (!/^[A-Za-z0-9\s]+$/.test(val)) return "Use letters, numbers, spaces or hyphens only.";
    return "";
  };

  const validateCategory = (val) => {
    if (!val.trim()) return "Category is required.";
    if (!/^[A-Za-z0-9\s]+$/.test(val)) return "Use letters, numbers, spaces or hyphens only.";
    return "";
  };

  const validateDiscount = (val) => {
    if (!String(val).trim()) return "Discount is required.";
    if (!/^\d+(\.\d+)?$/.test(String(val).trim())) return "Enter a valid number (e.g. 3 or 1.5).";
    return "";
  };

  const handleAdd = () => {
    const name = (cardName || "").trim();
    const cat = (category || "").trim();
    const disc = String((discount || "").trim());

    const nameErr = validateName(name);
    const catErr = validateCategory(cat);
    const discErr = validateDiscount(disc);

    setErrors({ name: nameErr, category: catErr, discount: discErr });

    if (nameErr || catErr || discErr) return;

    const payload = { name, category: cat, rewards: disc };

    if (initialData && typeof onUpdate === "function") {
      // preserve id when updating
      onUpdate({ id: initialData.id, ...payload });
    } else {
      onAdd(payload);
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3>{initialData ? "Edit Card" : "Add New Card"}</h3>

        <label htmlFor="new-card-name">Card Name:</label>
        <input
          id="new-card-name"
          ref={nameRef}
          value={cardName}
          onChange={(e) => {
            setCardName(e.target.value);
            setErrors((s) => ({ ...s, name: validateName(e.target.value) }));
          }}
          placeholder="e.g. My Rewards Card"
          aria-invalid={errors.name ? "true" : "false"}
          aria-describedby={errors.name ? "err-name" : undefined}
          className={errors.name ? "input-error" : ""}
        />
        {errors.name && <div id="err-name" className="error-text">{errors.name}</div>}

        <label htmlFor="new-card-category">Category:</label>
        <input
          id="new-card-category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setErrors((s) => ({ ...s, category: validateCategory(e.target.value) }));
          }}
          placeholder="e.g. travel"
          aria-invalid={errors.category ? "true" : "false"}
          aria-describedby={errors.category ? "err-category" : undefined}
          className={errors.category ? "input-error" : ""}
        />
        {errors.category && <div id="err-category" className="error-text">{errors.category}</div>}

        <label htmlFor="new-card-discount">Discount:</label>
        <input
          id="new-card-discount"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
            setErrors((s) => ({ ...s, discount: validateDiscount(e.target.value) }));
          }}
          placeholder="e.g. 3 or 1.5"
          aria-invalid={errors.discount ? "true" : "false"}
          aria-describedby={errors.discount ? "err-discount" : undefined}
          className={errors.discount ? "input-error" : ""}
        />
        {errors.discount && <div id="err-discount" className="error-text">{errors.discount}</div>}

        <div className="modal-actions">
          <Button className="btn-primary" onClick={handleAdd} ariaLabel={initialData ? "Update card" : "Confirm add card"}>
            {initialData ? "Update" : "Add"}
          </Button>

          <Button
            onClick={() => {
              setCardName("");
              setCategory("");
              setDiscount("");
              onClose();
            }}
            ariaLabel="Cancel add card"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddCardModal;
