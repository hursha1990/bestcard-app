import "./common.css";

const ConfirmModal = ({ isOpen, title = "Confirm", message = "Are you sure?", onConfirm, onCancel, confirmLabel = "Delete", cancelLabel = "Cancel" }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3>{title}</h3>
        <p>{message}</p>

        <div className="modal-actions">
          <button className="btn-primary" onClick={onConfirm} aria-label={confirmLabel}>
            {confirmLabel}
          </button>

          <button onClick={onCancel} aria-label={cancelLabel}>
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
