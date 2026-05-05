import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function HowToReduceTenantTurnoverPage() {
  return <ResourceArticlePage article={getResourceArticle("/how-to-reduce-tenant-turnover")!} />;
}
