import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function TenantCommunicationAutomationPage() {
  return <ResourceArticlePage article={getResourceArticle("/automate-tenant-communication-property-management")!} />;
}
