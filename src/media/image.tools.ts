export class ImageUtils {
  /**
   * Image Otimized url
   * @param url Google Storage public Url
   * @param size Ex.: 256x128
   * @returns Content API media public url
   */
  static imageOptimized(url: string, size: string) {
    if (!url) return url;
    url = url.replace(
      "storage.googleapis.com/fpass-content",
      "apis.fpass.com.br/media"
    );
    const sizes = size.split("x");
    return url.concat(`?width=${sizes[0]}&height=${sizes[1]}`);
  }
  /**
   * Image Placeholder
   * @param size Ex.: 128x128
   * @param text Ex: 'Jonh Silva' will generate 'JS'
   * @returns url string
   */
  static imagePlaceholder(size: string, text?: string) {
    return `https://via.placeholder.com/${size}/?text=${text}`;
  }
}
