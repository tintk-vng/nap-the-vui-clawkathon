import { Campaign } from '@/src/data/campaigns'
import { TopupItem } from '@/src/data/catalog'
import { getDiscountForPublisher } from '@/src/data/discounts'
import { Ref } from 'react'

type SupplierGridProps = {
  campaign: Campaign
  suppliers: TopupItem[]
  selectedId?: string
  innerRef?: Ref<HTMLDivElement>
  onSelect: (id: string) => void
}

export default function SupplierGrid({ campaign, suppliers, selectedId, innerRef, onSelect }: SupplierGridProps) {
  return (
    <div ref={innerRef} className="mb-8">
      <div className="mb-4 text-heading-md md:text-heading-lg">Chọn loại thẻ</div>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {suppliers.map((supplier, index) => {
          const active = supplier.id === selectedId
          const badge = getDiscountForPublisher(campaign, supplier.id)
          const relatedGames = (supplier.topGames ?? [supplier.displayName]).slice(0, 3).join(', ')

          return (
            <li key={supplier.id}>
              <button
                className={`relative flex h-[112px] w-full cursor-pointer flex-col items-center justify-center rounded-lg border px-3 py-3 transition hover:border-blue-500 ${
                  active ? 'border-blue-500 bg-blue-25' : 'border-dark-50 bg-white-500'
                }`}
                onClick={() => onSelect(supplier.id)}
                type="button"
                title={`${supplier.displayName}: ${relatedGames}`}
              >
                <span className={`relative flex h-12 w-full items-center justify-center ${index === 0 ? 'scale-[1.08]' : ''}`}>
                  <img className="max-h-11 max-w-full object-contain" src={supplier.logoUrl} alt={`${supplier.displayName} logo`} />
                </span>

                <span className="line-clamp-2 mt-3 block min-h-[32px] text-center text-label-sm font-bold leading-4 text-dark-400">
                  {relatedGames}
                </span>

                {badge && (
                  <span className="absolute -right-px -top-px rounded-bl rounded-tr-lg bg-red-500 px-1.5 py-0.5 text-[9px] font-bold leading-3 text-white-500">
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
