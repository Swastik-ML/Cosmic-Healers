import RoleGuard from '../../components/RoleGuard'
import { supabase } from '../../lib/supabaseClient'
import { useState } from 'react'
export default function AdminUpload(){
  const [file,setFile]=useState(null); const [title,setTitle]=useState(''); const [status,setStatus]=useState('')
  async function handleUpload(e){ e.preventDefault(); if(!file) return setStatus('Select file'); const ext=file.name.split('.').pop(); const filename=`${Date.now()}.${ext}`; setStatus('Uploading...')
    const { data, error } = await supabase.storage.from('documents').upload(filename, file)
    if(error){ setStatus('Upload failed'); console.error(error); return }
    await supabase.from('documents').insert([{ title, storage_path: filename }])
    setStatus('Uploaded'); setFile(null); setTitle('')
  }
  return (
    <RoleGuard allowed={['admin']}>
      <div>
        <h2 className="text-2xl">Admin Upload</h2>
        <form onSubmit={handleUpload} className="mt-3 flex flex-col gap-3 max-w-lg">
          <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Title" className="p-2 border" />
          <input type="file" onChange={e=>setFile(e.target.files[0])} />
          <button className="px-4 py-2 border">Upload</button>
          <div>{status}</div>
        </form>
      </div>
    </RoleGuard>
  )
}
