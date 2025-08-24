import { useDispatch, useSelector } from "react-redux";
import { clearNotifications, removeNotification } from "../redux/notificationsSlice";

export default function Notifications() {
  const dispatch = useDispatch();
  const notifications = useSelector((s) => s.notifications.items);

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
          {notifications.map((n) => (
            <li key={n.id} className="p-4 bg-white border rounded-xl shadow-sm">
              <div className="flex justify-between items-start gap-3">
                <div>
                  <p className="font-medium">{n.sender}</p>
                  <p className="text-sm text-gray-700">{n.message}</p>
                  {n.time && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(n.time).toLocaleString()}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => dispatch(removeNotification(n.id))}
                  className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded"
                >
                  Dismiss
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {notifications.length > 0 && (
        <button
          onClick={() => dispatch(clearNotifications())}
          className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
        >
          Clear All
        </button>
      )}
    </div>
  );
}
