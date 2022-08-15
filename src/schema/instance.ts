import { InteractionDataforwardType } from "./interaction";
import { Metadata } from "./metadata";
import { ProviderExtra } from "./provider";
import { Resource, ResourceType } from "./resource";
import { Whitelabel } from "./whitelabel";

export enum InstanceStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  ACTIVE = "active",
  DELETED = "deleted",
}

interface EmailConfig {
  image436x168?: string;
  senderEmail?: string;
  senderName?: string;
  supportEmail?: string;
}

interface FpayProvider {
  dryRunKey?: string;
  marketplaceId?: string;
  privateApiKey?: string;
  sellerId?: string;
}

interface ElasticSearchProvider {
  endpointUrl: string;
  privateKey: string;
  searchKey: string;
}

export interface DataForwardConfig {
  type: InteractionDataforwardType;
  url?: string;
  apiKey?: string;
  mongodbUri?: string;
  gcpStorageBucket?: string;
}

export interface KycField {
  name: string;
  usageDescription?: string;
  label?: string;
  regex?: string;
}
export interface KyCConfig {
  termsOfUseFile?: string;
  privacyPolicyFile?: string;
  fields?: KycField[];
}

export const InstanceStatusTransitionMap = new Map<
  InstanceStatus,
  InstanceStatus[]
>([
  [InstanceStatus.CREATED, [InstanceStatus.PROVIDER_CREATED]],
  [InstanceStatus.PROVIDER_CREATED, [InstanceStatus.ACTIVE]],
  [InstanceStatus.ACTIVE, [InstanceStatus.DELETED]],
]);

export class Instance extends Resource<InstanceStatus> {
  resourceType = ResourceType.INSTANCE;
  transitionMap = InstanceStatusTransitionMap;
  //
  name!: Whitelabel;
  description!: string;
  fqdn!: string;
  displayName!: string;
  // Media
  /**
   * Favicon
   */
  image32x32?: string;
  /**
   * Logo Mobile
   */
  image42x42?: string;
  /**
   * Channel By
   */
  image98x42?: string;
  /**
   * Logo
   */
  image130x40?: string;
  /**
   * Passport
   */
  image400x400?: string;
  //
  urls!: Metadata<InstanceUrlSettings>[];
  theme!: Metadata<InstanceThemeSettings>[];
  features_provider?: Pick<Instance, "resourceId" | "fqdn">;
  features!: Metadata<InstanceFeatureFlags>[];
  parameters!: Metadata<InstanceParametersSettings>[];
  i18n_ptBr!: Metadata<string>[];
  disclaimers!: Metadata<InstanceDisclaimers>[];
  urlRedirect?: string;
  // Email
  emailConfig?: EmailConfig;
  // Provider
  __fpay?: FpayProvider;
  __elascticSearch?: ElasticSearchProvider;
  // Data Forward
  __dataforward?: DataForwardConfig;
  // KyC
  kyc?: KyCConfig;
  // Provider Extra
  providerExtra?: ProviderExtra[];
}

export enum InstanceApplications {
  FLABEL = "flabel",
  FMANAGEMENT = "fmanagement",
}

export enum InstanceFeatureFlags {
  AFFILIATE = "affiliate",
  CALENDAR = "calendar",
  CERTIFICATE = "certificate",
  CHANNEL = "channel",
  COMMUNITY = "community",
  COUPON = "coupon",
  COURSE_SHARE_LINK = "course.share.link",
  LEARNING_ANALYTICS = "learning.analytics",
  PREMIUM = "premium",
  PUSH_NOTIFICATIONS = "push.notifications",
  STORY = "story",
  WIZARD = "wizard",
  SUBSCRIPTION_PLATFORM = "subscription.platform",
  PLAYER_VIDEO_USER_LOGGED = "player.video.user.logged",
}

export enum InstanceThemeSettings {
  // Base colors
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  // Background colors
  BACKGROUND = "background",
  LIGHTBACKGROUND = "lightBackground",
  DARKBACKGROUND = "darkBackground",
  // General colors
  GRAY = "gray",
  DARKGRAY = "darkGray",
  LIGHTGRAY = "lightGray",
  LIGHTGRAY2 = "lightGray2",
  WHITE = "white",
  WHITE2 = "white2",
  BLACK = "black",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  INFO = "info",
  SPOTLIGHT = "spotlight",
  // Blurs
  BLUR = "blur",
  // Gradients
  GRADIENT = "gradient",
  HEADERGRADIENT = "headerGradient",
  BOTTOMOVERLAYSHADOW = "bottomOverlayShadow",
  BOTTOMOVERLAYSHADOWMOBILE = "bottomOverlayShadowMobile",
  MIDDLEOVERLAYSHADOW = "middleOverlayShadow",
}

export enum InstanceUrlSettings {
  // Apps
  FLABEL_URL = "flabel.url",
  FCERTITIFICATE_URL = "certitificate.url",
  CONTENT_API = "content.api",
  FSTAGE_URL = "stage.url",
  // About
  PRIVACYPOLICY_URL = "privacypolicy.url",
  TERMSOFUSE_URL = "termsofuse.url",
  CONTACTUS_URL = "contactus.url",
  LANDINGPAGE_URL = "landingpage.url",
  // Social
  INSTAGRAM_URL = "instagram.url",
  FACEBOOK_URL = "facebook.url",
  YOUTUBE_URL = "youtube.url",
  LINKEDIN_URL = "linkedin.url",
  TWITTER_URL = "twitter.url",
  WHATSAPP_URL = "whatsapp.url",
  SUPPORT_EMAIL = "support.email",
  BANNER_EMAIL_URL = "banner.email.url",
}

export enum InstanceParametersSettings {
  GOOGLE_GTM_ID = "google.gtm.id",
  GOOGLE_GA_ID = "google.ga.id",
  ONESIGNAL_APP_ID = "onesignal.app.id",
  ONESIGNAL_API_KEY = "onesignal.api.key",
  FPASS_PLAYER_PAGEVIEW_INTERVAL = "fpass.player.pageview.interval",
  FPASS_COPYRIGHT = "fpass.copyright",
}

export enum InstanceDisclaimers {
  COPYRIGHT = "copyright",
  USER_COMMENTS = "user.comments",
}
