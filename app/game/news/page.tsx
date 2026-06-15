import { getEnabledArticles } from '@/src/data/newsArticles'
import NewsCards from '../_components/NewsCards'

export default function NewsPage() {
  return (
    <section>
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-label-sm font-semibold uppercase tracking-wide text-blue-500">Tin Tức</p>
          <h1 className="mt-1 text-heading-lg text-dark-500">Cập nhật mới nhất</h1>
        </div>
      </div>

      <NewsCards articles={getEnabledArticles()} />
    </section>
  )
}
