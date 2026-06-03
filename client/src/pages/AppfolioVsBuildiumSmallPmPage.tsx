import { ResourceArticlePage } from "@/components/ResourceArticlePage";
import { getResourceArticle } from "@/content/resources";

export default function AppfolioVsBuildiumSmallPmPage() {
  return <ResourceArticlePage article={getResourceArticle("/appfolio-vs-buildium-small-pm")!} />;
}
