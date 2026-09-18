import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface AppConfig {
  features: Record<string, boolean>;
  projectHighlights: EngineeringHighlight[];
  experienceHighlights: EngineeringHighlight[];
  engineeringHighlights: EngineeringHighlight[];
  featuredWorkItems: FeaturedWorkItem[];
  projectSections: ProjectSection[];
  volunteeringHighlights: VolunteeringItem[];
}

export interface VolunteeringItem {
  title: string;
  role?: string;
  organization?: string;
  period?: string;
  description?: string;
  bullets?: string[];
  /** Single image (kept for backward compatibility). */
  imageUrl?: string;
  /** Multiple images for a gallery. Takes precedence over imageUrl. */
  imageUrls?: string[];
  redirectUrl?: string;
}

export interface EngineeringHighlight {
  title: string;
  description: string;
  imageUrl?: string;
  category?: string;
  redirectUrl?: string;
}

export interface FeaturedWorkItem {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ProjectSection {
  title: string;
  description: string;
}

const defaultConfig: AppConfig = {
  features: {
    blog: true,
    projects: true,
    featuredProjects: true,
    media: true,
    volunteering: true,
  },
  volunteeringHighlights: [
    {
      title: 'Leadership Role / Activity Title',
      role: 'Your role (e.g., President, Team Lead, Volunteer)',
      organization: 'Organization or club name',
      period: 'e.g., 2023 – 2024',
      description: 'Short one-line summary of the activity.',
      bullets: [
        'First bullet describing what you led or contributed',
        'Second bullet describing impact or responsibilities',
        'Third bullet (add as many as you need)',
      ],
      imageUrl: '',
      redirectUrl: '',
    },
  ],
  projectHighlights: [
    {
      title: 'Yurt: Collaborative Learning Platform',
      description: 'Built a full-stack platform with real-time chat, video calls, collaborative whiteboarding, and an AI assistant to improve academic collaboration.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Project',
    },
    {
      title: 'Masnoon Duas',
      description: 'A library of Authentic Duas for every moment',
      imageUrl: 'https://media.licdn.com/dms/image/v2/D4D22AQGxi0Ve5Rj1Qw/feedshare-shrink_800/B4DZ1Eh2.ZJMAc-/0/1774971220351?e=1776902400&v=beta&t=dOHcQdWbLiDYLQV1Ami52beAVjvwtmEQjogEXwDttO0',
      category: 'Project',
    },
  ],
  experienceHighlights: [
    {
      title: 'GraphQL Gateway at Expertflow',
      description: 'Designed and implemented a centralized GraphQL gateway microservice to streamline search across internal and external data sources.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Work',
    },
    {
      title: 'Angular Upgrade Initiative',
      description: 'Migrated Angular client components from v8 to v14 and helped reduce CI/CD pipeline completion time while improving maintainability.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Work',
    },
    {
      title: 'Cloud, CI/CD, and Quality',
      description: 'Hands-on with Docker, Kubernetes, Git-based workflows, and TDD/BDD practices to improve release reliability and engineering quality.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Engineering',
    },
  ],
  engineeringHighlights: [
    {
      title: 'Yurt: Collaborative Learning Platform',
      description: 'Built a full-stack platform with real-time chat, video calls, collaborative whiteboarding, and an AI assistant to improve academic collaboration.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Project',
    },
    {
      title: 'GraphQL Gateway at Expertflow',
      description: 'Designed and implemented a centralized GraphQL gateway microservice to streamline search across internal and external data sources.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Work',
    },
    {
      title: 'Angular Upgrade Initiative',
      description: 'Migrated Angular client components from v8 to v14 and helped reduce CI/CD pipeline completion time while improving maintainability.',
      imageUrl: 'images/nabeel-with-horse.png',
      category: 'Work',
    },
    {
      title: 'Platform Projects',
      description: 'Delivered Yurt and Past Papers Hub with REST APIs/WebSockets, measurable user engagement improvements, and practical performance gains.',
      category: 'Project',
    },
    {
      title: 'Cloud, CI/CD, and Quality',
      description: 'Hands-on with Docker, Kubernetes, Git-based workflows, and TDD/BDD practices to improve release reliability and engineering quality.',
      category: 'Engineering',
    },
  ],
  featuredWorkItems: [
    {
      title: 'Yurt: Collaborative Learning Platform',
      description: 'Built a full-stack collaboration platform with chat, video calls, whiteboarding, and an AI assistant to support student learning workflows.',
      imageUrl: 'assets/nabeel-with-horse.png',
    },
    {
      title: 'Centralized GraphQL Gateway',
      description: 'At Expertflow, designed and implemented a GraphQL gateway to unify search and access across internal and external data sources.',
      imageUrl: 'assets/nabeel-with-horse.png',
    },
    {
      title: 'Angular Modernization Initiative',
      description: 'Led migration of Angular components from v8 to v14 and contributed to reducing CI/CD pipeline completion time significantly.',
      imageUrl: 'assets/nabeel-with-horse.png',
    },
  ],
  projectSections: [
    {
      title: 'Product Engineering',
      description: 'Design and delivery of full-stack applications using Angular, Node.js, Express, and GraphQL with production-ready architecture.',
    },
    {
      title: 'Quality & Delivery',
      description: 'Applied TDD/BDD practices and release workflows to improve confidence, maintainability, and engineering velocity across teams.',
    },
    {
      title: 'Cloud & Scale',
      description: 'Hands-on with Docker, Kubernetes, and CI/CD tooling to deploy resilient systems and optimize real-world performance.',
    },
  ],
};

@Injectable({ providedIn: 'root' })
export class ConfigService {
  // Keep config in a signal so consumers can react if you ever reload it
  private readonly _config = signal<AppConfig>(defaultConfig);

  constructor(private readonly http: HttpClient) {}

  get value(): AppConfig {
    return this._config();
  }

  getFeature(flag: string): boolean {
    return !!this._config().features[flag];
  }

  async load(): Promise<void> {
    const url = new URL('config.json', document.baseURI).href;
    try {
      const data = (await this.http.get<Partial<AppConfig>>(url, { headers: { 'Cache-Control': 'no-store' } }).toPromise()) ?? {};
      const legacyHighlights = [
        ...((data.featuredWorkItems as FeaturedWorkItem[] | undefined) ?? defaultConfig.featuredWorkItems).map((item) => ({
          title: item.title,
          description: item.description,
          imageUrl: item.imageUrl,
          category: 'Work',
        })),
        ...((data.projectSections as ProjectSection[] | undefined) ?? defaultConfig.projectSections).map((item) => ({
          title: item.title,
          description: item.description,
          category: 'Engineering',
        })),
      ];
      const legacyProjects = legacyHighlights.filter((item) => item.category?.toLowerCase() === 'project');
      const legacyExperience = legacyHighlights.filter((item) => item.category?.toLowerCase() !== 'project');
      // Merge with defaults to avoid undefined flags if the file is partial
      const merged: AppConfig = {
        ...defaultConfig,
        ...data,
        features: { ...defaultConfig.features, ...(data.features ?? {}) } as AppConfig['features'],
        projectHighlights: (data.projectHighlights as EngineeringHighlight[] | undefined) ?? legacyProjects,
        experienceHighlights: (data.experienceHighlights as EngineeringHighlight[] | undefined) ?? legacyExperience,
        engineeringHighlights: (data.engineeringHighlights as EngineeringHighlight[] | undefined) ?? legacyHighlights,
        featuredWorkItems: (data.featuredWorkItems as FeaturedWorkItem[] | undefined) ?? defaultConfig.featuredWorkItems,
        projectSections: (data.projectSections as ProjectSection[] | undefined) ?? defaultConfig.projectSections,
        volunteeringHighlights: (data.volunteeringHighlights as VolunteeringItem[] | undefined) ?? defaultConfig.volunteeringHighlights,
      };
      this._config.set(merged);
    } catch (err: any) {
      if (err.status !== undefined) {
        console.error('Failed to load runtime config:', err.status, err.statusText || err.message);
      } else {
        console.error('Error loading runtime config:', err);
      }
    }
  }
}
