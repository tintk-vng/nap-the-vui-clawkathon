import Link from 'next/link'
import { notFound } from 'next/navigation'
import { proposalToNewsArticle } from '@/src/agent/proposalAdapters'
import { getCampaignProposal, validateCampaignProposal } from '@/src/agent/proposalRepository'

export const dynamic = 'force-dynamic'

type AgentArticlePreviewPageProps = {
  params: {
    proposalId: string
  }
}

export default function AgentArticlePreviewPage({ params }: AgentArticlePreviewPageProps) {
  const proposal = getCampaignProposal(params.proposalId)

  if (!proposal) {
    notFound()
  }

  const article = proposalToNewsArticle(proposal)
  const validationErrors = validateCampaignProposal(proposal)

  return (
    <main className="mx-auto w-full max-w-[920px] px-4 pb-12 pt-8 sm:px-6">
      <Link href={`/agent-preview/${proposal.id}`} className="mb-5 inline-flex text-label-md font-bold text-blue-500">
        Back to proposal preview
      </Link>

      <div className="mb-6 rounded-lg border border-orange-50 bg-orange-50 px-4 py-3">
        <div className="text-label-sm font-bold text-orange-500">Local article preview</div>
        <div className="mt-1 text-label-md text-dark-300">
          Proposal ID: <span className="font-bold text-dark-500">{proposal.id}</span> · Status:{' '}
          <span className="font-bold text-dark-500">{proposal.status}</span>
        </div>
      </div>

      {validationErrors.length > 0 && (
        <section className="mb-6 rounded-lg border border-red-500 bg-red-50 px-4 py-3">
          <div className="mb-2 text-heading-sm text-red-500">Validation issues</div>
          <ul className="list-disc space-y-1 pl-5 text-label-md text-dark-500">
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </section>
      )}

      <article>
        <div className="relative mb-6 aspect-[2/1] overflow-hidden rounded-lg border border-dark-50 bg-dark-25">
          {article.coverImageUrl && (
            <div className="absolute inset-0 grid place-items-center bg-white-500 p-8">
              <img className="max-h-full max-w-full object-contain" src={article.coverImageUrl} alt="" />
            </div>
          )}
        </div>

        <h1 className="text-[32px] font-bold leading-10 text-dark-500">{article.title}</h1>
        <p className="mt-3 text-label-lg text-dark-300">{article.summary}</p>
        <div className="mt-6 whitespace-pre-line rounded-lg border border-dark-50 bg-white-500 p-5 text-label-lg leading-7 text-dark-500 shadow-soft">
          {article.content}
        </div>
      </article>
    </main>
  )
}
