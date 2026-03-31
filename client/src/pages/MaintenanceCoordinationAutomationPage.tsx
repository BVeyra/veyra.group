import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function MaintenanceCoordinationAutomationPage() {
  return <ResourceArticlePage article={getResourceArticle("/automate-maintenance-coordination-property-management")!} />;
}
