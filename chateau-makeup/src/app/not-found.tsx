import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-stone-200 mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-2">Page non trouvee</h2>
        <p className="text-sm text-stone-500 mb-6">La page que vous recherchez n&apos;existe pas.</p>
        <Link
          href="/"
          className="px-6 py-3 bg-stone-900 text-white text-sm font-semibold uppercase tracking-wider hover:bg-stone-800 transition-colors"
        >
          Retour a l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
