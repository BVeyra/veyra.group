import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function PropertyManagementWorkflowAutomationPage() {
  return <ResourceArticlePage article={getResourceArticle("/property-management-workflow-automation")!} />;
}
