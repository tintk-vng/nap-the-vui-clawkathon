import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <div className="h-14 w-full md:h-[72px]" />
      <nav className="fixed left-0 top-0 z-30 h-14 w-full bg-white-500 shadow-soft md:h-[72px]">
        <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 sm:px-6">
          <Link href="/game" className="relative flex h-full w-[105px] items-center md:w-[124px]">
            <img
              className="h-full w-auto object-contain"
              src="https://scdn.zalopay.com.vn/zst/zpi/images/telco/logos_v2/full_zalopay.svg"
              alt="ZaloPay"
            />
          </Link>

          <div className="hidden h-full items-center justify-center gap-6 md:flex">
            <Link className="font-bold text-blue-500" href="/game">
              Nạp ngay
            </Link>
            <Link className="font-bold text-dark-400" href="/game/news">
              Tin tức
            </Link>
          </div>

          <Link
            href="/game"
            className="flex h-full flex-1 flex-col items-end justify-center gap-x-1 whitespace-break-spaces text-right text-label-xs font-bold text-blue-500 underline md:flex-row md:items-center md:justify-end md:whitespace-normal md:text-label-lg"
          >
            Web nạp thẻ
            <span className="text-green-500">rẻ, nhanh và uy tín</span>
          </Link>
        </div>

        <div className="flex h-11 items-center justify-center gap-8 border-t border-dark-50 bg-white-500 text-label-md font-bold md:hidden">
          <Link className="text-blue-500" href="/game">
            Nạp ngay
          </Link>
          <Link className="text-dark-400" href="/game/news">
            Tin tức
          </Link>
        </div>
      </nav>
      <div className="h-11 md:hidden" />
    </header>
  )
}
