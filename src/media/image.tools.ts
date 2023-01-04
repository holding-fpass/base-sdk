export class ImageUtils {
  static imageOptimized(url: string, size: string) {
    if (!url) return url;
    url = url.replace(
      "storage.googleapis.com/fpass-content",
      "apis.fpass.com.br/media"
    );
    const sizes = size.split("x");
    return url.concat(`?width=${sizes[0]}&height=${sizes[1]}`);
  }
}
