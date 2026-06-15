import Link from 'next/link'
import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { getCampaignBannerDiscountText } from '@/src/data/campaigns'
import { getItemById, getSkusForPublisher } from '@/src/data/catalog'
import { getDiscountForPublisher, getDiscountForSku, getEffectiveSku } from '@/src/data/discounts'
import { isLocalHost } from '@/src/agent/localOnly'
import { proposalToCampaign, proposalToNewsArticle, proposalToPopularSearchItems } from '@/src/agent/proposalAdapters'
import { getCampaignProposal, validateCampaignProposal } from '@/src/agent/proposalRepository'
import ApprovalPanel from './ApprovalPanel'

export const dynamic = 'force-dynamic'

type AgentPreviewPageProps = {
  params: {
    proposalId: string
  }
}

function hasRealIcon(iconUrl?: string) {
  return Boolean(iconUrl && !iconUrl.includes('supplier_placeholder'))
}

export default function AgentPreviewPage({ params }: AgentPreviewPageProps) {
  const proposal = getCampaignProposal(params.proposalId)

  if (!proposal) {
    notFound()
  }

  const campaign = proposalToCampaign(proposal)
  const article = proposalToNewsArticle(proposal)
  const popularItems = proposalToPopularSearchItems(proposal)
  const validationErrors = validateCampaignProposal(proposal)
  const publisher = getItemById(proposal.targetPublisherId)
  const packages = getSkusForPublisher(proposal.targetPublisherId)
  const publisherBadge = publisher ? getDiscountForPublisher(campaign, publisher.id) : undefined
  const discountText = getCampaignBannerDiscountText(campaign)
  const isLocalPreview = isLocalHost(headers().get('host'))

  return (
    <main className="mx-auto w-full max-w-[1200px] px-4 pb-12 pt-8 sm:px-6">
      <div className="mb-6 rounded-lg border border-orange-50 bg-orange-50 px-4 py-3">
        <div className="text-label-sm font-bold text-orange-500">Local agent preview</div>
        <h1 className="mt-1 text-heading-lg text-dark-500">{proposal.title}</h1>
        <div className="mt-1 text-label-md text-dark-300">
          Proposal ID: <span className="font-bold text-dark-500">{proposal.id}</span> · Status:{' '}
          <span className="font-bold text-dark-500">{proposal.status}</span>
        </div>
      </div>

      <ApprovalPanel proposalId={proposal.id} initialStatus={proposal.status} isLocalPreview={isLocalPreview} />

      {(proposal.reasoningSummary || proposal.validationWarnings?.length || proposal.researchVisitedUrls?.length || proposal.imagePrompt) && (
        <section className="mb-6 rounded-lg border border-dark-50 bg-white-500 p-4 shadow-soft">
          <div className="mb-3 text-heading-sm text-dark-500">Agent reasoning</div>

          {proposal.reasoningSummary && (
            <div className="whitespace-pre-line text-label-md leading-6 text-dark-400">{proposal.reasoningSummary}</div>
          )}

          {proposal.alternativesConsidered && proposal.alternativesConsidered.length > 0 && (
            <div className="mt-3 text-label-md text-dark-300">
              Alternatives considered:{' '}
              <span className="font-bold text-dark-500">{proposal.alternativesConsidered.join(', ')}</span>
            </div>
          )}

          {proposal.researchVisitedUrls && proposal.researchVisitedUrls.length > 0 && (
            <div className="mt-4">
              <div className="mb-2 text-label-sm font-bold text-dark-300">Research URLs visited</div>
              <ul className="space-y-1 text-label-sm text-dark-400">
                {proposal.researchVisitedUrls.slice(0, 6).map((url) => (
                  <li key={url} className="break-all rounded bg-dark-25 px-3 py-2">
                    {url}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {proposal.imagePrompt && (
            <div className="mt-4 rounded bg-blue-50 px-3 py-2 text-label-sm text-dark-400">
              <span className="font-bold text-dark-500">Future image prompt:</span> {proposal.imagePrompt}
            </div>
          )}

          {proposal.validationWarnings && proposal.validationWarnings.length > 0 && (
            <div className="mt-4 rounded border border-orange-100 bg-orange-50 px-3 py-2">
              <div className="mb-1 text-label-sm font-bold text-orange-500">Agent warnings</div>
              <ul className="list-disc space-y-1 pl-5 text-label-sm text-dark-500">
                {proposal.validationWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}

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

      <section className="mb-8 overflow-hidden rounded-lg bg-white-500 shadow-soft">
        <Link href={`/agent-preview/${proposal.id}/article`} className="block">
          <div className="relative min-h-[144px] bg-gradient-to-br from-[#E75648] via-[#F1865F] to-[#FFD58F] px-5 py-5 text-white-500 md:px-6">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.20),rgba(255,255,255,0.02))]" />

            <div className="relative z-10 flex h-full items-center justify-between gap-4">
              <div className="min-w-0">
                {discountText && (
                  <div className="mb-2 inline-flex rounded bg-white-500/95 px-2 py-1 text-label-xs font-bold text-blue-500">
                    {discountText}
                  </div>
                )}
                <div className="text-heading-lg md:text-[26px] md:leading-8">{campaign.title}</div>
                <p className="mt-1 max-w-[560px] text-label-md text-white-500/90 md:text-label-lg">{campaign.subtitle}</p>
                <span className="mt-3 inline-flex rounded-md bg-white-500 px-3 py-1.5 text-label-sm font-bold text-blue-500">
                  {campaign.ctaText}
                </span>
              </div>

              <div className="hidden h-24 w-32 shrink-0 items-center justify-center rounded-lg bg-white-500/95 p-4 shadow-soft sm:flex">
                <img className="max-h-full max-w-full object-contain" src={campaign.bannerImageUrl} alt={campaign.altText} />
              </div>
            </div>
          </div>
        </Link>
      </section>

      <section className="mb-8">
        <div className="mb-2 text-label-sm font-bold text-dark-300">Proposed popular searches</div>
        <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
          {popularItems.map((item) => {
            const target = getItemById(item.targetId)
            const iconUrl = item.iconUrl ?? target?.logoUrl

            return (
              <span
                key={item.id}
                className="flex h-8 shrink-0 items-center gap-1.5 rounded-full border border-dark-50 bg-white-500 px-3 text-label-sm font-bold text-dark-400 shadow-sm"
              >
                {hasRealIcon(iconUrl) && (
                  <span className="grid h-4 w-4 place-items-center rounded-full bg-white-500">
                    <img className="max-h-full max-w-full object-contain" src={iconUrl} alt="" />
                  </span>
                )}
                {item.label}
              </span>
            )
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <section>
          <div className="mb-4 text-heading-md md:text-heading-lg">Proposed publisher/SKU effect</div>

          {publisher ? (
            <div className="mb-5 rounded-lg border border-dark-50 bg-white-500 p-4 shadow-soft">
              <div className="relative flex items-center gap-4">
                <span className="grid h-14 w-24 shrink-0 place-items-center rounded-lg bg-dark-25 p-3">
                  <img className="max-h-full max-w-full object-contain" src={publisher.logoUrl} alt="" />
                </span>
                <div>
                  <div className="text-heading-sm text-dark-500">{publisher.displayName}</div>
                  <div className="mt-1 text-label-md text-dark-300">
                    Eligible campaign discount: {publisherBadge?.label ?? 'No publisher badge'}
                  </div>
                </div>
                {publisherBadge && (
                  <span className="absolute right-0 top-0 rounded bg-red-500 px-2 py-1 text-label-xs font-bold text-white-500">
                    {publisherBadge.label}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="mb-5 rounded-lg border border-red-500 bg-red-50 p-4 text-label-md text-dark-500">
              Publisher is missing from catalog.
            </div>
          )}

          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {packages.map((topupSku) => {
              const badge = getDiscountForSku(campaign, topupSku)
              const effectiveSku = getEffectiveSku(campaign, topupSku)

              return (
                <li key={topupSku.id}>
                  <div className="relative flex h-[92px] flex-col justify-center rounded-lg border border-dark-50 bg-white-500 px-3 py-3">
                    <span className="text-label-lg font-bold text-dark-500">{topupSku.displayAmount}</span>
                    <hr className="my-2 w-full border-t border-dashed border-dark-100" />
                    <span className="flex w-full items-center justify-between gap-3">
                      <span className="text-label-xs text-dark-500">Sale:</span>
                      <span className="whitespace-nowrap text-label-sm font-bold text-green-600">{effectiveSku.displaySalePrice}</span>
                    </span>
                    {badge && (
                      <span className="absolute -right-px -top-px rounded-bl rounded-tr-lg bg-red-50 px-1.5 py-0.5 text-[9px] font-bold leading-3 text-red-500">
                        {badge.label}
                      </span>
                    )}
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <aside className="h-fit rounded-lg border border-dark-50 bg-white-500 p-4 shadow-soft">
          <div className="mb-3 text-heading-md text-dark-500">Proposed Tin Tức article</div>
          <div className="relative mb-4 aspect-[2/1] overflow-hidden rounded-lg border border-dark-50 bg-dark-25">
            <div className="absolute inset-0 grid place-items-center bg-white-500 p-6">
              <img className="max-h-full max-w-full object-contain" src={article.coverImageUrl} alt="" />
            </div>
          </div>
          <div className="text-heading-sm text-dark-500">{article.title}</div>
          <p className="mt-2 text-label-md text-dark-300">{article.summary}</p>
          <Link href={`/agent-preview/${proposal.id}/article`} className="mt-4 inline-flex rounded-md bg-blue-500 px-3 py-2 text-label-sm font-bold text-white-500">
            Open article preview
          </Link>

          <div className="mt-6 border-t border-dark-50 pt-4">
            <div className="mb-2 text-heading-sm text-dark-500">Files that would change</div>
            <ul className="space-y-2 text-label-md text-dark-300">
              {proposal.proposedFileChanges.map((filePath) => (
                <li key={filePath} className="rounded bg-dark-25 px-3 py-2 font-bold text-dark-400">
                  {filePath}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  )
}
