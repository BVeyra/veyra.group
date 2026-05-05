import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function MaintenanceResponseTimeBenchmarkPage() {
  return <ResourceArticlePage article={getResourceArticle("/maintenance-response-time-benchmark")!} />;
}
