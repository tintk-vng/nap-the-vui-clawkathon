import { NewsArticle } from '@/src/data/newsArticles'
import Link from 'next/link'

export default function NewsCards({ articles }: { articles: NewsArticle[] }) {
  return (
    <>
      <div className="mb-4 text-heading-md md:text-heading-lg">Tin Tức</div>

      <div className="no-scrollbar mx-[-16px] flex gap-4 overflow-y-scroll px-4 md:mx-0 md:gap-5 md:px-0">
        {articles.map((article) => (
          <Link
            key={article.id}
            className="w-[calc(78vw-48px)] min-w-[calc(78vw-48px)] cursor-pointer md:w-1/3 md:min-w-0"
            href={`/mua-the-game/tin-tuc/${article.id}`}
          >
            <div className="relative aspect-[2/1] h-auto w-full overflow-hidden rounded-lg border border-dark-50 bg-dark-25">
              {article.coverImageUrl && (
                <div className="absolute inset-0 grid place-items-center bg-white-500 p-6">
                  <img className="max-h-full max-w-full object-contain" src={article.coverImageUrl} alt="" />
                </div>
              )}
            </div>

            <div className="mt-3 line-clamp-2 font-bold text-dark-500">{article.title}</div>
            <div className="mt-1 text-label-xs text-dark-300">
              {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
            </div>
            <div className="mt-2 line-clamp-2 text-label-md text-dark-300">{article.summary}</div>
          </Link>
        ))}
      </div>
    </>
  )
}
