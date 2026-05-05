import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function ScalePropertyManagementBusinessPage() {
  return <ResourceArticlePage article={getResourceArticle("/scale-property-management-business")!} />;
}
