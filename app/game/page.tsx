import Main from './_components/Main'
import { getActiveCampaign } from '@/src/data/campaigns'
import { getCardItems, getPopularSearchItems, topupItems } from '@/src/data/catalog'
import { getEnabledArticles } from '@/src/data/newsArticles'

export default function GamePage() {
  const activeCampaign = getActiveCampaign()

  return (
    <Main
      articles={getEnabledArticles()}
      campaign={activeCampaign}
      catalogItems={topupItems}
      popularItems={getPopularSearchItems()}
      suppliers={getCardItems()}
    />
  )
}
