import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'

export default function GameLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-[1200px] px-4 pb-12 pt-5 sm:px-6 md:pb-16 md:pt-8">
        <div className="w-full">{children}</div>
      </main>
      <Footer />
    </>
  )
}
