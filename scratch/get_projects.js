import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://tkzzonjmpaqymyneufdi.supabase.co";
const supabaseKey = "sb_publishable_bNbYWo1EJFR8pwtjE93Thw_me9M0UAV";

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) {
    console.error('Error fetching:', error);
  } else {
    console.log('Projects:', JSON.stringify(data, null, 2));
  }
}
run();
