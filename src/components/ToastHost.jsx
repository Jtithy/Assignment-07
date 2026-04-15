import { useAppContext } from "../context/AppContext";

function ToastHost() {
  const { toasts } = useAppContext();

  return (
    <div className="toast-host" role="status" aria-live="polite">
      {toasts.map((toast) => (
        <div className="toast-item" key={toast.id}>
          {toast.message}
        </div>
      ))}
    </div>
  );
}

export default ToastHost;
