import { useState } from "react";

const DEFAULT_SETTINGS = {
  username: "student",
  email: "student@example.com",
  language: "ka",
  theme: "light",
  notifications: true,
  newsletter: false,
  fontSize: 16,
  timezone: "Asia/Tbilisi",
};

export default function Settings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saved, setSaved] = useState(false);

  const update = (key, value) => {
    setSettings((s) => ({ ...s, [key]: value }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 500 }}>
      <h1>Settings</h1>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Username</span>
          <input
            value={settings.username}
            onChange={(e) => update("username", e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Email</span>
          <input
            type="email"
            value={settings.email}
            onChange={(e) => update("email", e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14 }}
          />
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Language</span>
          <select
            value={settings.language}
            onChange={(e) => update("language", e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14 }}
          >
            <option value="ka">Georgian</option>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Theme</span>
          <select
            value={settings.theme}
            onChange={(e) => update("theme", e.target.value)}
            style={{ padding: "8px 12px", border: "1px solid #d1d5db", borderRadius: 6, fontSize: 14 }}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </select>
        </label>

        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span style={{ fontSize: 14, fontWeight: 500 }}>Font Size: {settings.fontSize}px</span>
          <input
            type="range"
            min="12"
            max="24"
            value={settings.fontSize}
            onChange={(e) => update("fontSize", Number(e.target.value))}
          />
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => update("notifications", e.target.checked)}
          />
          <span style={{ fontSize: 14 }}>Enable Notifications</span>
        </label>

        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={settings.newsletter}
            onChange={(e) => update("newsletter", e.target.checked)}
          />
          <span style={{ fontSize: 14 }}>Subscribe to Newsletter</span>
        </label>

        <button
          onClick={handleSave}
          style={{
            padding: "10px 20px", background: "#4F46E5", color: "#fff",
            border: "none", borderRadius: 6, cursor: "pointer", fontSize: 14,
            marginTop: 8,
          }}
        >
          Save Settings
        </button>

        {saved && (
          <div style={{ padding: "8px 16px", background: "#d1fae5", color: "#065f46", borderRadius: 6 }}>
            Settings saved successfully!
          </div>
        )}
      </div>
    </div>
  );
}
