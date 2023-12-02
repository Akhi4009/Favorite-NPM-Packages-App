interface PackageLink {
  npm: string;
  homepage: string;
  repository: string;
  bugs: string;
}

interface PackageAuthor {
  name: string;
}

interface PackagePublisher {
  username: string;
  email: string;
}

interface PackageMaintainer {
  username: string;
  email: string;
}

interface Package {
  name: string;
  scope: string;
  version: string;
  description: string;
  keywords: string[];
  date: string;
  links: PackageLink;
  publisher: PackagePublisher;
  maintainers: PackageMaintainer[];
}

interface ScoreDetail {
  quality: number;
  popularity: number;
  maintenance: number;
}

interface Score {
  final: number;
  detail: ScoreDetail;
}

export interface SearchResultItem {
  package: Package;
  score: Score;
  searchScore: number;
}

export interface SearchApiResponse {
  total: number;
  results: SearchResultItem[];
}
