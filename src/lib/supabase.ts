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
const LOCAL_LOGS_KEY = 'epinfy_test_logs'

function getLocalLogs(): TestLog[] {
  try {
    const stored = localStorage.getItem(LOCAL_LOGS_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

function saveLocalLogs(logs: TestLog[]): void {
  localStorage.setItem(LOCAL_LOGS_KEY, JSON.stringify(logs))
}

export async function insertTestLog(log: Omit<TestLog, 'id' | 'created_at'>): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('test_logs').insert([log])
    if (error) {
      console.error('Supabase insert error:', error)
      const logs = getLocalLogs()
      logs.push({ ...log, id: logs.length + 1, created_at: new Date().toISOString() })
      saveLocalLogs(logs)
    }
  } else {
    const logs = getLocalLogs()
    logs.push({ ...log, id: logs.length + 1, created_at: new Date().toISOString() })
    saveLocalLogs(logs)
  }
}

export async function clearTestLogs(): Promise<void> {
  if (supabase) {
    const { error } = await supabase.from('test_logs').delete().neq('id', 0)
    if (error) {
      console.error('Supabase delete error:', error)
      saveLocalLogs([])
    }
  } else {
    saveLocalLogs([])
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
      return getLocalLogs()
    }
    return data || []
  }
  return getLocalLogs()
}
