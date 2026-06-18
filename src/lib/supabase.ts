import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL or Anon Key is missing in environment variables.");
}

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
          transport: class DummyWebSocket {} as any,
        },
      }
    : {}),
});
