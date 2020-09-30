export class TerraPdfHelper {
    public static createPdfBlob(base64String: string): Blob {
        let sliceSize: number = 512;
        let byteCharacters: string = atob(base64String);
        let byteArrays: Array<Uint8Array> = [];

        for (let offset: number = 0; offset < byteCharacters.length; offset += sliceSize) {
            let slice: string = byteCharacters.slice(offset, offset + sliceSize);

            let byteNumbers: Array<number> = new Array(slice.length);
            for (let i: number = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            let byteArray: Uint8Array = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new Blob(byteArrays, { type: 'application/pdf' });
    }
}
