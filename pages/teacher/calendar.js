import RoleGuard from '../../components/RoleGuard'
import { supabase } from '../../lib/supabaseClient'
import { useEffect, useState } from 'react'
export default function Calendar(){
  const [classes, setClasses] = useState([])
  useEffect(()=>{ async function load(){
    const u = (await supabase.auth.getUser()).data.user
    if(!u) return
    const { data } = await supabase.from('classes').select('*').eq('teacher_id', u.id).order('start_time',{ascending:true})
    setClasses(data||[])
  } load() },[])
  return (
    <RoleGuard allowed={['teacher']}>
      <div>
        <h2 className="text-2xl">Teacher Calendar</h2>
        <ul className="mt-4">
          {classes.map(c=> <li key={c.id}>{c.title} — {new Date(c.start_time).toLocaleString()}</li>)}
        </ul>
      </div>
    </RoleGuard>
  )
}
