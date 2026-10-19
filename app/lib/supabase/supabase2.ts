import { createClient } from "@supabase/supabase-js";

const supabase2 = createClient(
  process.env.SUPABASE_URL_2!,
  process.env.SUPABASE_SERVICE_ROLE_KEY_2!,
);

export { supabase2 };
