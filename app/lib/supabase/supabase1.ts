import { createClient } from "@supabase/supabase-js";

const supabase1 = createClient(
  process.env.SUPABASE_URL_1!,
  process.env.SUPABASE_SERVICE_ROLE_KEY_1!,
);

export { supabase1 };
