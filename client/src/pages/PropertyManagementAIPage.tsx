import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementAIPage() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-ai")!} />;
}
