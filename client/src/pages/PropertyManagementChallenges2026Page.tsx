import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementChallenges2026Page() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-challenges-2026")!} />;
}
