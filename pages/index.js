import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../utils/supabaseClient';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'student') router.push('/student');
        else if (profile?.role === 'teacher') router.push('/teacher');
        else if (profile?.role === 'admin') router.push('/admin');
        else router.push('/dashboard');
      } else {
        setLoading(false);
      }
    });
    return () => authListener.subscription.unsubscribe();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">COSMIC HEALERS</h1>
      <p>Cinematic courses, live classes via Google Meet, and downloadable resources.</p>
    </div>
  );
}
