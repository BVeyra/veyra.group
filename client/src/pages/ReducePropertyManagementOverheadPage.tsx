import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function ReducePropertyManagementOverheadPage() {
  return <ResourceArticlePage article={getResourceArticle("/reduce-property-management-overhead")!} />;
}
