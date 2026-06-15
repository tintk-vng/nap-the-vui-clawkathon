import { Campaign } from '@/src/data/campaigns'
import { TopupSku } from '@/src/data/catalog'
import { getDiscountForSku, getEffectiveSku } from '@/src/data/discounts'
import { Ref } from 'react'

type PackageGridProps = {
  campaign: Campaign
  packages: TopupSku[]
  selectedId?: string
  innerRef?: Ref<HTMLDivElement>
  onSelect: (id: string) => void
}

export default function PackageGrid({ campaign, packages, selectedId, innerRef, onSelect }: PackageGridProps) {
  return (
    <div ref={innerRef} className="mb-9 scroll-mt-24">
      <div className="mb-4 text-heading-md md:text-heading-lg">Chọn mệnh giá & số lượng</div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {packages.map((topupSku) => {
          const active = topupSku.id === selectedId
          const badge = getDiscountForSku(campaign, topupSku)
          const effectiveSku = getEffectiveSku(campaign, topupSku)

          return (
            <li key={topupSku.id}>
              <button
                className={`group relative flex h-[88px] w-full flex-col justify-center rounded-lg border px-3 py-3 text-left transition hover:border-blue-500 ${
                  active ? 'border-blue-500 bg-blue-25' : 'border-dark-50 bg-white-500'
                }`}
                onClick={() => onSelect(topupSku.id)}
                type="button"
              >
                <span className={`text-label-lg font-bold ${active ? 'text-blue-500' : 'text-dark-500 group-hover:text-blue-500'}`}>
                  {topupSku.displayAmount}
                </span>

                <hr className="my-2 w-full border-t border-dashed border-dark-100" />

                <span className="flex w-full items-center justify-between gap-3">
                  <span className="text-label-xs text-dark-500">Giá bán:</span>
                  <span className="whitespace-nowrap text-label-sm font-bold text-green-600">{effectiveSku.displaySalePrice}</span>
                </span>

                {badge && (
                  <span className="absolute -right-px -top-px rounded-bl rounded-tr-lg bg-red-50 px-1.5 py-0.5 text-[9px] font-bold leading-3 text-red-500">
                    {badge.label}
                  </span>
                )}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
