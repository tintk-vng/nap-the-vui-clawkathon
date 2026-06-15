'use client'

import { Campaign } from '@/src/data/campaigns'
import {
  PopularSearchResolvedItem,
  TopupItem,
  TopupSku,
  getPublisherForItem,
  getSkusForPublisher
} from '@/src/data/catalog'
import { NewsArticle } from '@/src/data/newsArticles'
import { useEffect, useMemo, useRef, useState } from 'react'
import BannerSlot from './BannerSlot'
import CheckoutPanel from './CheckoutPanel'
import NewsCards from './NewsCards'
import PackageGrid from './PackageGrid'
import PopularSearchChips from './search/PopularSearchChips'
import SearchBar from './search/SearchBar'
import SelectedTopupContext from './SelectedTopupContext'
import SupplierGrid from './SupplierGrid'

type MainProps = {
  campaign: Campaign
  catalogItems: TopupItem[]
  suppliers: TopupItem[]
  popularItems: PopularSearchResolvedItem[]
  articles: NewsArticle[]
}

export default function Main({ campaign, catalogItems, suppliers, popularItems, articles }: MainProps) {
  const [supplierId, setSupplierId] = useState(suppliers[0]?.id)
  const [packageId, setPackageId] = useState('')
  const [selectedContextItem, setSelectedContextItem] = useState<TopupItem | undefined>(undefined)
  const [confirmation, setConfirmation] = useState('')
  const packageSectionRef = useRef<HTMLDivElement | null>(null)

  const selectedSupplier = useMemo(
    () => suppliers.find((supplier) => supplier.id === supplierId) ?? suppliers[0],
    [supplierId, suppliers]
  )

  const packages = useMemo(() => getSkusForPublisher(selectedSupplier.id), [selectedSupplier.id])

  useEffect(() => {
    if (!packages.some((sku) => sku.id === packageId)) {
      setPackageId(packages[0]?.id ?? '')
    }
  }, [packageId, packages])

  const selectedPackage = useMemo<TopupSku>(
    () => packages.find((topupSku) => topupSku.id === packageId) ?? packages[0],
    [packageId, packages]
  )

  const scrollToPackages = (delay = 50) => {
    window.setTimeout(() => {
      packageSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, delay)
  }

  const handleSelectSupplier = (id: string) => {
    const publisher = suppliers.find((supplier) => supplier.id === id)
    setSupplierId(id)
    setSelectedContextItem(publisher)
    scrollToPackages()
  }

  const handleResolveTopupItem = (item: TopupItem) => {
    const publisher = getPublisherForItem(item)
    if (!publisher) {
      return
    }

    setSupplierId(publisher.id)
    setSelectedContextItem(item)
    setConfirmation(`Đã chọn: ${item.displayName} → ${publisher.displayName}`)
    window.setTimeout(() => setConfirmation(''), 2600)
    scrollToPackages(80)
  }

  return (
    <>
      <SearchBar items={catalogItems} onSelect={handleResolveTopupItem} />

      <PopularSearchChips items={popularItems} onSelect={handleResolveTopupItem} />

      {confirmation && (
        <div className="mb-6 rounded-lg border border-green-500 bg-[#F0FFF8] px-4 py-3 text-label-md font-bold text-green-700">
          {confirmation}
        </div>
      )}

      <BannerSlot campaign={campaign} />

      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-8 xl:grid-cols-[minmax(0,1fr)_380px]">
        <div>
          <SupplierGrid campaign={campaign} selectedId={supplierId} suppliers={suppliers} onSelect={handleSelectSupplier} />

          <SelectedTopupContext selectedItem={selectedContextItem} selectedPublisher={selectedSupplier} />

          <PackageGrid campaign={campaign} innerRef={packageSectionRef} packages={packages} selectedId={packageId} onSelect={setPackageId} />

          <section className="hidden md:block">
            <NewsCards articles={articles} />
          </section>
        </div>

        <div>
          <CheckoutPanel campaign={campaign} selectedPackage={selectedPackage} selectedSupplier={selectedSupplier} />

          <section className="md:hidden">
            <NewsCards articles={articles} />
          </section>
        </div>
      </div>
    </>
  )
}
