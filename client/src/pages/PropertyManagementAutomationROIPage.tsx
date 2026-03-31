import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementAutomationROIPage() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-automation-roi")!} />;
}
