import { Campaign } from '@/src/data/campaigns'
import { TopupItem, TopupSku } from '@/src/data/catalog'
import { getEffectiveSku } from '@/src/data/discounts'

type CheckoutPanelProps = {
  campaign: Campaign
  selectedSupplier: TopupItem
  selectedPackage: TopupSku
}

const paymentSources = [
  { id: 'zalopay', name: 'Ví ZaloPay', badge: 'Khuyên dùng', icon: 'Z' },
  { id: 'atm', name: 'Thẻ ATM', badge: '', icon: 'ATM' }
]

export default function CheckoutPanel({ campaign, selectedSupplier, selectedPackage }: CheckoutPanelProps) {
  const effectiveSku = getEffectiveSku(campaign, selectedPackage)

  return (
    <aside className="h-fit rounded-lg border border-dark-50 bg-white-500 p-4 shadow-soft lg:sticky lg:top-24 lg:p-5">
      <h2 className="mb-5 text-heading-md text-dark-500 md:text-heading-lg">Thanh toán</h2>

      <section className="mb-6">
        <div className="mb-3 text-heading-sm text-dark-500">Phương thức thanh toán</div>

        <div className="divide-y divide-dark-50">
          {paymentSources.map((source, index) => (
            <button key={source.id} className="flex w-full items-center gap-3 py-3 text-left" type="button">
              <span className={`relative h-5 w-5 shrink-0 rounded-full border-2 ${index === 0 ? 'border-blue-800' : 'border-dark-200'}`}>
                {index === 0 && <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-800" />}
              </span>

              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-blue-50 text-[11px] font-bold text-blue-500">
                {source.icon}
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-label-lg font-bold text-dark-500">{source.name}</span>
                {source.badge && <span className="mt-0.5 block text-label-xs font-bold text-green-600">{source.badge}</span>}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-3 text-heading-sm text-dark-500">Chi tiết giao dịch</div>

        <div className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-label-md text-dark-300">Loại mã thẻ</span>
            <span className="text-right text-label-md font-bold text-dark-500">{selectedSupplier.displayName}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-label-md text-dark-300">Mệnh giá thẻ</span>
            <span className="text-right text-label-md font-bold text-dark-500">{selectedPackage.displayAmount}</span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-label-md text-dark-300">Số lượng</span>
            <div className="flex h-9 items-center rounded-lg border border-dark-50">
              <button className="grid h-9 w-9 place-items-center text-dark-300" type="button">
                -
              </button>
              <span className="grid h-9 w-10 place-items-center border-x border-dark-50 text-label-md font-bold">1</span>
              <button className="grid h-9 w-9 place-items-center text-blue-500" type="button">
                +
              </button>
            </div>
          </div>

          {effectiveSku.discountAmount > 0 && (
            <div className="flex items-center justify-between gap-4">
              <span className="text-label-md text-dark-300">Giảm giá</span>
              <span className="text-right text-label-md font-bold text-green-600">-{effectiveSku.discountAmount.toLocaleString('vi-VN')}đ</span>
            </div>
          )}

          <div className="flex items-center justify-between gap-4">
            <span className="text-label-md text-dark-300">Nguồn tiền</span>
            <span className="text-right text-label-md font-bold text-dark-500">Ví ZaloPay</span>
          </div>

          <div className="flex items-center justify-between gap-4 border-t border-dark-50 pt-4">
            <span className="text-label-md text-dark-300">Thành tiền</span>
            <span className="text-right text-heading-md text-dark-500">{effectiveSku.displaySalePrice}</span>
          </div>

          <label className="block pt-2 text-label-md text-dark-300" htmlFor="email">
            Email nhận thẻ
          </label>
          <input
            id="email"
            className="h-11 w-full rounded-lg border border-dark-50 px-3 text-label-lg outline-none focus:border-blue-500"
            placeholder="you@example.com"
            type="email"
          />

          <button
            className="mt-2 h-12 w-full rounded-lg bg-blue-500 text-label-lg font-bold text-white-500 transition hover:bg-blue-800"
            type="button"
          >
            Thanh toán
          </button>
        </div>
      </section>
    </aside>
  )
}
