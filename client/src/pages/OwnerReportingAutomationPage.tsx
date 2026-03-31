import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function OwnerReportingAutomationPage() {
  return <ResourceArticlePage article={getResourceArticle("/automated-owner-reporting-for-property-managers")!} />;
}
