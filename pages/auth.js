import { supabase } from '../lib/supabaseClient'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
export default function AuthPage(){
  const [loading, setLoading] = useState(false)
  async function signInWithGoogle(){
    setLoading(true)
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' })
    if(error) console.error(error)
    setLoading(false)
  }
  return (
    <Layout>
      <div className="max-w-md">
        <h2 className="text-xl">Sign in</h2>
        <button onClick={signInWithGoogle} className="mt-4 px-4 py-2 border">Sign in with Google</button>
        <p className="mt-2 text-sm">On first sign-in, a profile row should be created server-side (see README). [Unverified]</p>
      </div>
    </Layout>
  )
}
