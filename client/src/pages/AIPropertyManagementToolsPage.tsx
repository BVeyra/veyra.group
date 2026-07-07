import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function AIPropertyManagementToolsPage() {
  return <ResourceArticlePage article={getResourceArticle("/ai-property-management-tools")!} />;
}
