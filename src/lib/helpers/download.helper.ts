export class TerraDownloadHelper {
    public static downloadFile(object: any, filename: string): void {
        let fileURL: string = URL.createObjectURL(object);
        this.downloadFileFromUrl(fileURL, filename);
    }

    public static downloadFileFromUrl(url: string, filename: string): void {
        let link: HTMLAnchorElement = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();

        // TODO: Implement method to remove unused Download a-tags
    }
}
