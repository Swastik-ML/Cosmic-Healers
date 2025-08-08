import RoleGuard from '../../components/RoleGuard'
import { supabase } from '../../lib/supabaseClient'
import { useState, useEffect } from 'react'
export default function AdminCourses(){
  const [title,setTitle]=useState(''); const [desc,setDesc]=useState(''); const [courses,setCourses]=useState([])
  useEffect(()=>{ load() },[])
  async function load(){ const { data } = await supabase.from('courses').select('*').order('created_at',{ascending:false}); setCourses(data||[]) }
  async function createCourse(e){ e.preventDefault(); const slug = title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,''); await supabase.from('courses').insert([{ title, slug, description: desc }]); setTitle(''); setDesc(''); load() }
  return (
    <RoleGuard allowed={['admin']}>
      <div>
        <h2 className="text-2xl">Admin — Courses</h2>
        <form onSubmit={createCourse} className="mt-4 flex flex-col gap-3 max-w-xl">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Course title" className="p-2 border" />
          <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Description" className="p-2 border" />
          <button className="px-4 py-2 border">Create Course</button>
        </form>
        <div className="mt-6">
          <h3 className="text-xl">Existing courses</h3>
          <ul className="mt-3">{courses.map(c=> <li key={c.id} className="py-2 border-b">{c.title}</li>)}</ul>
        </div>
      </div>
    </RoleGuard>
  )
}
