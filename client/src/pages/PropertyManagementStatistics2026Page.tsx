import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementStatistics2026Page() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-statistics-2026")!} />;
}
