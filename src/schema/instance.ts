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
  image32x32?: string; // Favicon
  image42x42?: string; // Mobile logo
  image130x40?: string;
  image400x400?: string;
  //
  urls!: Metadata[];
  theme!: Metadata[];
  features!: Metadata[];
  parameters!: Metadata[];
  urlRedirect?: string;
  // Provider
  providerExtra?: ProviderExtra[];
}

export enum InstanceFeatureFlags {
  COUPON = "coupon",
  CALENDAR = "calendar",
  CERTIFICATE = "certificate",
  LEARNING_ANALYTICS = "learning.analytics",
  COMMUNITY = "community",
  WIZARD = "wizard",
}

export enum InstanceThemeSettings {
  LOGO = "logo",
  LOGOMARK = "logomark",
  FAVICON = "favicon",
  LOGODARK = "logoDark",
  MOBILELOGO = "mobileLogo",
  PRIMARY = "primary",
  SECONDARY = "secondary",
  TERTIARY = "tertiary",
  GRADIENT = "gradient",
  ERROR = "error",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
  WHITE = "white",
  GREY = "grey",
  GRAY = "gray",
  LIGHTGRAY = "lightGray",
  LIGHTGRAY2 = "lightGray2",
  DARKGRAY = "darkGray",
  BACKGROUND = "background",
  LIGHTBACKGROUND = "lightBackground",
  DARKBACKGROUND = "darkBackground",
  THIRD = "third",
  SPOTLIGHT = "spotlight",
  DARK = "dark",
  DARK2 = "dark2",
  DARK3 = "dark3",
  DARKGREY = "darkGrey",
  LIGHTGREY = "lightGrey",
  LIGHTGREY2 = "lightGrey2",
  BLACK = "black",
  WHITE2 = "white2",
  YELLOW = "yellow",
  DARKERBLUR = "darkerBlur",
  BLUR = "blur",
  CARDCAROUSEL = "cardCarousel",
  CARDCAROUSELBEFORE = "cardCarouselBefore",
  GRADIENTHEADER = "gradientHeader",
  OVERLAYDARKERBLUR = "overlayDarkerBlur",
  OVERLAYLIGHTBLUR = "overlayLightBlur",
  GREENCHECK = "greenCheck",
  REDCHECK = "redCheck",
  SHADOWOVERLAYTOP = "shadowOverlayTop",
  SHADOWOVERLAYBOTTOM = "shadowOverlayBottom",
  SHADOWOVERLAYMOBILEBOTTOM = "shadowOverlayMobileBottom",
  OVERLAYDARKERMIDDLEBLUR = "overlayDarkerMiddleBlur",
  OVERLAYGRADIENTPLAYER = "overlayGradientPlayer",
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
}

export enum InstanceParametersSettings {
  GOOGLE_GTM_ID = "google.gtm.id",
  GOOGLE_GA_ID = "google.ga.id",
  ONESIGNAL_APP_ID = "onesignal.app.id",
  FPASS_PLAYER_PAGEVIEW_INTERVAL = "fpass.player.pageview.interval",
  FPASS_COPYRIGHT = "fpass.copyright",
}
