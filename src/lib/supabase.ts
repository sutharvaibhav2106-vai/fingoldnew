import { createClient } from "@supabase/supabase-js";

// Use Vercel env variables if present, otherwise fall back to the project's public keys
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL || "https://lowvtavqeukfapwniwxb.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvd3Z0YXZxZXVrZmFwd25pd3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODU0NzAsImV4cCI6MjA5NzE2MTQ3MH0.x-t8n3-wz-C-kkQuRBeyhWHSUuRYVBBz5ZUt8fG7PSs";

const isServer = typeof window === "undefined";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: !isServer,
    detectSessionInUrl: !isServer,
  },
  // Supply a WebSocket transport class on server side to avoid Node.js SSR errors
  ...(isServer
    ? {
        realtime: {
          transport: class DummyWebSocket {} as unknown as typeof WebSocket,
        },
      }
    : {}),
});
