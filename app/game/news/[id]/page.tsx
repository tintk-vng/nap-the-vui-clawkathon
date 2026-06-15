import { getArticleById } from '@/src/data/newsArticles'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type ArticlePageProps = {
  params: {
    id: string
  }
}

export default function ArticlePage({ params }: ArticlePageProps) {
  const article = getArticleById(params.id)

  if (!article) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link className="mb-4 inline-flex text-label-md font-bold text-blue-500" href="/mua-the-game">
        Quay lại nạp thẻ
      </Link>

      {article.coverImageUrl && (
        <div className="mb-5 grid aspect-[2/1] place-items-center overflow-hidden rounded-lg bg-blue-25 p-8">
          <img className="max-h-full max-w-full object-contain" src={article.coverImageUrl} alt="" />
        </div>
      )}

      <div className="text-label-md text-dark-300">
        {new Date(article.publishedAt).toLocaleDateString('vi-VN')}
      </div>
      <h1 className="mt-2 text-heading-lg text-dark-500">{article.title}</h1>
      <p className="mt-3 text-label-lg text-dark-300">{article.summary}</p>
      <div className="mt-6 rounded-lg border border-dark-50 bg-white-500 p-4 text-label-lg leading-7 text-dark-500">
        {article.content}
      </div>
    </article>
  )
}
