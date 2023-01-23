export enum VideoFileFormat {
  SD = "video-sd.mp4",
  HD = "video-hd.mp4",
  AUDIO = "audio-only.mp4",
}

export class VideoUtils {
  static getApiUrl(url: string) {
    if (!url) return url;
    return url.replace(
      "storage.googleapis.com/fpass-content",
      "apis.fpass.com.br/media/video"
    );
  }
}
