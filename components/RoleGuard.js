import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'
export default function RoleGuard({ allowed = [], children }) {
  const [ok, setOk] = useState(null)
  const router = useRouter()
  useEffect(()=>{ 
    supabase.auth.getUser().then(res=>{
      const u = res?.data?.user
      if(!u){ setOk(false); router.push('/auth'); return }
      supabase.from('profiles').select('role').eq('id', u.id).single()
        .then(r=>{
          const role = r.data?.role
          if(allowed.includes(role)) setOk(true)
          else { setOk(false); router.push('/') }
        })
    })
  },[])
  if(ok===null) return <div className="p-8">Checking...</div>
  if(ok===false) return null
  return children
}
