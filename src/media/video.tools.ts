export enum VideoFileFormat {
  SD = "video-sd",
  HD = "video-hd",
  AUDIO = "audio-only",
}

export class VideoUtils {
  static getApiUrl(url?: string) {
    if (!url) return url;
    return url.replace(
      "storage.googleapis.com/fpass-content",
      "apis.fpass.com.br/media/video"
    );
  }
}
