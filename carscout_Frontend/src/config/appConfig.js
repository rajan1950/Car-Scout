const isLocalHost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const APP_CONFIG = {
  apiBaseUrl: import.meta.env.VITE_API_URL || "http://localhost:4444",
  email: {
    endpoints: [
      `${import.meta.env.VITE_API_URL || "http://localhost:4444"}/email/send`,
      `${import.meta.env.VITE_API_URL || "http://localhost:4444"}/email/send-purchase`,
      `${import.meta.env.VITE_API_URL || "http://localhost:4444"}/mail/send`,
      `${import.meta.env.VITE_API_URL || "http://localhost:4444"}/mailer/send`,
    ],
    emailJs: {
      serviceId: "",
      templateId: "",
      publicKey: "",
    },
  },
  logs: {
    enableProfileApiLogs: isLocalHost,
  },
};
