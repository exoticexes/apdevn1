import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export interface TestLog {
  id?: number
  email: string
  password: string
  action: string
  created_at?: string
}

// Local fallback storage when Supabase is not configured
const localLogs: TestLog[] = []

export async function insertTestLog(log: Omit<TestLog, 'id' | 'created_at'>): Promise<void> {
  if (supabase) {
    await supabase.from('test_logs').insert([log])
  } else {
    localLogs.push({ ...log, id: localLogs.length + 1, created_at: new Date().toISOString() })
  }
}

export async function fetchTestLogs(): Promise<TestLog[]> {
  if (supabase) {
    const { data, error } = await supabase
      .from('test_logs')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      console.error('Supabase error:', error)
      return localLogs
    }
    return data || []
  }
  return localLogs
}
