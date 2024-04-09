import { createClient } from '@supabase/supabase-js'
import { Database } from './type'

const supabaseUrl = process.env.SUPABASE_URL || ''
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || ''
const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase
