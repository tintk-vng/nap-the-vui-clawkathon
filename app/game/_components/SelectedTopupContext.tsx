import { TopupItem } from '@/src/data/catalog'

type SelectedTopupContextProps = {
  selectedItem?: TopupItem
  selectedPublisher: TopupItem
}

export default function SelectedTopupContext({ selectedItem, selectedPublisher }: SelectedTopupContextProps) {
  if (!selectedItem) {
    return null
  }

  const isGame = selectedItem.type === 'game'

  return (
    <section className="mb-5 rounded-lg border border-blue-50 bg-blue-25 px-4 py-3">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white-500 p-1 shadow-sm">
          <img className="max-h-full max-w-full object-contain" src={selectedItem.logoUrl || selectedPublisher.logoUrl} alt="" />
        </span>

        <div className="min-w-0">
          {isGame ? (
            <>
              <div className="text-label-sm font-bold text-blue-500">Đang nạp</div>
              <div className="truncate text-label-lg font-bold text-dark-500">
                {selectedItem.displayName} <span className="text-dark-300">→</span> {selectedPublisher.displayName}
              </div>
              <div className="text-label-sm text-dark-300">Nạp qua: {selectedPublisher.displayName}</div>
            </>
          ) : (
            <>
              <div className="text-label-sm font-bold text-blue-500">Đang nạp</div>
              <div className="truncate text-label-lg font-bold text-dark-500">{selectedPublisher.displayName}</div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
