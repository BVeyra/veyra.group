import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function HowToUseAIInPropertyManagementPage() {
  return <ResourceArticlePage article={getResourceArticle("/how-to-use-ai-in-property-management")!} />;
}
