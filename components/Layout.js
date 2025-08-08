import Link from 'next/link'
export default function Layout({children}){
  return (
    <div className="min-h-screen bg-black text-white">
      <header className="p-6 border-b">
        <h1 className="text-2xl">COSMIC HEALERS</h1>
        <nav className="mt-3 flex gap-3">
          <Link href="/"><a>Home</a></Link>
          <Link href="/auth"><a>Sign in</a></Link>
        </nav>
      </header>
      <main className="p-6">{children}</main>
    </div>
  )
}
