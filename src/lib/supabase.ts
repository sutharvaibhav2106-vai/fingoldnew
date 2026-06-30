import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "";

const isServer = typeof window === "undefined";

function createSupabaseClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase URL or Anon Key is missing in environment variables. Returning proxy client to avoid startup crashes.");
    return new Proxy({} as any, {
      get(target, prop) {
        if (prop === 'auth') {
          return new Proxy({} as any, {
            get(authTarget, authProp) {
              if (authProp === 'onAuthStateChange') {
                return () => ({ data: { subscription: { unsubscribe: () => {} } } });
              }
              return async () => ({ data: { session: null }, error: new Error("Supabase is not configured.") });
            }
          });
        }
        return undefined;
      }
    });
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
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
}

export const supabase = createSupabaseClient();
