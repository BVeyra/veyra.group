import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementKpisPage() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-kpis")!} />;
}
