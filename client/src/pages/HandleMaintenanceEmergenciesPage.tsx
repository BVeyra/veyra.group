import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function HandleMaintenanceEmergenciesPage() {
  return <ResourceArticlePage article={getResourceArticle("/handle-maintenance-emergencies")!} />;
}
