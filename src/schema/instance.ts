import {
  DisplayResource,
  Resource,
  ResourceType,
  SearchableResource,
} from "./resource";

import { InteractionDataforwardType } from "./interaction";
import { Metadata } from "./metadata";
import { ProviderExtra } from "./provider";
import { Whitelabel } from "./whitelabel";
import { ImageUtils } from "../media";

export enum InstanceStatus {
  CREATED = "created",
  PROVIDER_CREATED = "provider.created",
  ACTIVE = "active",
  DELETED = "deleted",
}

export enum ExternalAuthProvider {
  SOCIA = "socia",
}

interface EmailConfig {
  image436x168?: string;
  senderEmail?: string;
  senderName?: string;
  supportEmail?: string;
  financeEmail?: string;
}

interface InstanceCertificateSettings {
  minimumWatchTime: number;
  primaryTextColor: string;
  platformDisplayName: string;
  /**
   * Certificate background
   */
  image824x556?: string;
}

interface SplitConfig {
  email: string;
  value: number;
}

interface ActiveCampaignProvider {
  accountUrl?: string;
  accountKey?: string;
}

interface ExternalAuthConfig {
  provider: ExternalAuthProvider;
  authUrl: string;
  purchaseUrl?: string;
}

interface ExternalAuthSecret {
  jwtSecret: string;
}

interface RDStationProvider {
  token: string;
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
  googleSpreadsheet?: string;
  azureBlobStorageContainerName?: string;
  azureBlobStorageURI?: string;
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

export interface InstanceIconTextItem {
  icon: string;
  text: string;
}

export interface InstanceHomeUrl {
  name: string;
  url: string;
}

interface InstancePagePlaylists {
  resourceId: string;
  name: string;
}

interface InstanceJwt {
  iss: string;
  secret: string;
}

interface ZoomProvider {
  ZOOM_SECRET_WEBHOOK_TOKEN: string;
  ZOOM_WEBHOOK_VERIFICATION_TOKEN: string;
  ZOOM_ACCOUNT_ID: string;
  ZOOM_CLIENT_ID: string;
  ZOOM_CLIENT_SECRET: string;
}

export interface IGradeConfig {
  examGrade: number;
  approvalGrade: number;
}

interface EbscoProvider {
  customerId: string;
  password: string;
  user: string;
}

export const InstanceStatusTransitionMap = new Map<
  InstanceStatus,
  InstanceStatus[]
>([
  [InstanceStatus.CREATED, [InstanceStatus.PROVIDER_CREATED]],
  [InstanceStatus.PROVIDER_CREATED, [InstanceStatus.ACTIVE]],
  [InstanceStatus.ACTIVE, [InstanceStatus.DELETED]],
]);

export class Instance
  extends Resource<InstanceStatus>
  implements SearchableResource
{
  resourceType = ResourceType.INSTANCE;
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
  /**
   * Overlay background: InstanceFeatureFlags.CATALOG_USER_LOGGED = true
   */
  image1920x1080?: string;
  //
  pagesDefault?: {
    home?: {
      urlsHeader?: InstanceHomeUrl[];
      urlsFooter?: InstanceHomeUrl[];
      playlists?: InstancePagePlaylists[];
    };
    premium?: {
      image1440x440?: string;
      benefits?: InstanceIconTextItem[];
      playlists?: InstancePagePlaylists[];
    };
    channels?: {
      image1440x440?: string;
    };
  };
  pagesPath?: Metadata<InstancePagePath>[];
  urls!: Metadata<InstanceUrlSettings>[];
  theme!: Metadata<InstanceThemeSettings>[];
  features_provider?: Pick<Instance, "resourceId" | "fqdn">;
  features!: Metadata<InstanceFeatureFlags>[];
  parameters!: Metadata<InstanceParametersSettings>[];
  i18n_ptBr!: Metadata<string>[];
  i18n_enUs!: Metadata<string>[];
  i18n_es!: Metadata<string>[];
  disclaimers!: Metadata<InstanceDisclaimers>[];
  urlRedirect?: string;
  ebsco?: boolean;
  // Instance Certificate
  certificate?: InstanceCertificateSettings;
  // Configurations
  emailConfig?: EmailConfig;
  splitConfig?: SplitConfig;
  formula?: string;
  gradeConfig?: IGradeConfig;
  // Provider
  externalAuthProvider?: ExternalAuthConfig;
  __externalAuthProviderSecret?: ExternalAuthSecret;
  __activeCampaign?: ActiveCampaignProvider;
  __fpay?: FpayProvider;
  __elascticSearch?: ElasticSearchProvider;
  __rdstation?: RDStationProvider;
  __jwt?: InstanceJwt;
  __zoom?: ZoomProvider;
  __ebsco?: EbscoProvider;
  // Data Forward
  __dataforward?: DataForwardConfig;
  // KyC
  kyc?: KyCConfig;
  // Provider Extra
  providerExtra?: ProviderExtra[];
  // SearchableResource implementation
  isPublic = false;
  public static asDisplayResource(
    resource: Instance
  ): DisplayResource<any, InstanceStatus> {
    return {
      resourceType: ResourceType.INSTANCE,
      resourceId: resource.resourceId,
      h1: resource.name,
      status: resource.status,
      isPublic: resource.isPublic,
      whitelabel: resource.whitelabel,
      timestamp: resource.timestamp,
      createdAt: resource.createdAt,
      updatedAt: resource.updatedAt,
      deletedAt: resource.deletedAt,
      imageUrl: ImageUtils.imageOptimized(
        resource.image130x40 as string,
        "130x40"
      ),
    };
  }
}

export enum InstanceApplications {
  FLABEL = "flabel",
  FMANAGEMENT = "fmanagement",
  FEDUCATOR = "feducator",
}

export enum InstanceFeatureFlags {
  AFFILIATE = "affiliate",
  CALENDAR = "calendar",
  CATALOG_USER_LOGGED = "instance.feature-flag.catalog.user.logged",
  CERTIFICATE = "instance.feature-flag.certificate",
  CHANNEL = "channel",
  CHANNEL_USER_LOGIN_ONLY = "instance.feature-flag.channel.user.login.only",
  CHAT = "chat",
  COMMUNITY = "community",
  COUPON = "coupon",
  COURSE_SHARE_LINK = "course.share.link",
  EMAIL_TEMPLATE_MFA_TEXT = "instance.feature-flag.email.template.mfa.text",
  FORM_EVALUATION_HIDE = "instance.feature-flag.form.evaluation.hide",
  GLOBAL_CHAT = "global-chat",
  HEADER_BUY_CTA_HIDE = "instance.feature-flag.header.buy.cta.hide",
  HIDE_UNRELATED_CHANNELS = "instance.feature-flag.hide.unrelated.channels",
  LEARNING_ANALYTICS = "learning.analytics",
  MODULE_CONTENT_ORDER_HIDE = "instance.feature-flag.module.content.order.hide",
  MODULE_CUSTOM_NAME = "instance.feature-flag.module.custom.name",
  NOTIFICATIONS = "instance.feature-flag.notifications",
  ONLY_EXTERNAL_SALES = "only.external.sales",
  PLAYER_VIDEO_USER_LOGGED = "player.video.user.logged",
  PLAYLIST_CARD_TAG_HIDE = "instance.feature-flag.playlist.card.tag.hide",
  PREMIUM = "premium",
  PUSH_NOTIFICATIONS = "push.notifications",
  RATING_COURSE_USER_LOGGED = "rating.course.user.logged",
  SEARCH = "instance.feature-flag.search",
  SHOW_CHANNELS_LOGIN_ONLY = "instance.feature-flag.show.channels.login.only",
  STAGE = "instance.feature-flag.stage",
  STORY = "story",
  SUBSCRIPTION_ONLY_CHANNELS = "instance.feature-flag.subscription.only.channels",
  SUBSCRIPTION_PLATFORM = "subscription.platform",
  TIMELINE = "timeline",
  SMARTPLAYER_ADMIN = "smartplayer.admin",
  USER_CREATION_RESTRICT = "instance.feature-flag.user.creation",
  USER_PROFILE_HIDE = "instance.feature-flag.user.profile.hide",
  USER_SAMPLE = "instance.feature-flag.user.sample",
  VLIBRAS = "vlibras",
  WALLET = "instance.feature-flag.wallet",
  WIZARD = "wizard",
  MY_ACTIVITIES = "my.activities",
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

export enum InstancePagePath {
  CHANNEL_HOME = "/channel",
  CHANNEL = "/channel/:channelId",
  CHANNEL_COURSE = "/channel/:channelId/course/:courseId",
  CHANNEL_PLAYER = "/channel/:channelId/player/:contentId",
  PREMIUM_HOME = "/premium",
  PREMIUM_COURSE = "/premium/:courseId",
  COURSE = "/course/:courseId",
  COURSE_CERTIFICATE = "/course/:id/certificate",
  PLAYER = "/player/:contentId",
  STAGE = "/stage/:slug",
  LIBRARY = "/library",
}

export enum InstanceParametersSettings {
  FPASS_COPYRIGHT = "fpass.copyright",
  FPASS_PLAYER_PAGEVIEW_INTERVAL = "fpass.player.pageview.interval",
  GOOGLE_CAST_ID = "google.cast.id",
  GOOGLE_GA_ID = "google.ga.id",
  GOOGLE_GTM_ID = "google.gtm.id",
  ONESIGNAL_API_KEY = "onesignal.api.key",
  ONESIGNAL_APP_ID = "onesignal.app.id",
  RD_STATION_TOKEN = "rdstation.token",
}

export enum InstanceDisclaimers {
  COPYRIGHT = "copyright",
  USER_COMMENTS = "user.comments",
}
