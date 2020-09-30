import { isNullOrUndefined } from 'util';

export class PathHelper {
    public static readonly DELIMITER: string = '/';

    /**
     * Check if a path is absolute.
     * @param path
     */
    public static isAbsolute(path: string): boolean {
        return path.charAt(0) === this.DELIMITER;
    }

    /**
     * Check if a path is a directory.
     * @param path
     */
    public static isDirectory(path: string): boolean {
        return path.charAt(path.length - 1) === this.DELIMITER;
    }

    /**
     * Check if a path is a file.
     * @param path
     */
    public static isFile(path: string): boolean {
        return path.charAt(path.length - 1) !== this.DELIMITER;
    }

    /**
     * Get the basename (dirname or filename) of a path.
     * @param path
     */
    public static basename(path: string): string {
        let paths: Array<string> = this._getPaths(path);
        let i: number = paths.length - 1;
        return paths[i];
    }

    /**
     * Get the name of the directory of a file
     * @param path
     */
    public static dirname(path: string): string {
        let prefix: string = this.isAbsolute(path) ? '/' : '';
        let paths: Array<string> = this._getPaths(path);
        paths.pop();

        return prefix + paths.join(this.DELIMITER);
    }

    /**
     * Get the file extension of a path.
     * Extension will be transformed to lower case.
     * @param path
     */
    public static extName(path: string): string {
        if (this.isDirectory(path)) {
            return '';
        }

        let filename: string = this.basename(path);
        if (isNullOrUndefined(filename)) {
            filename = '';
        }
        let splittedFilename: Array<string> = filename.split('.');
        return splittedFilename.pop().toLowerCase();
    }

    /**
     * Join multiple paths.
     * @param paths
     */
    public static join(...paths: Array<string>): string {
        let completePath: string = paths
            .map((path: string) => {
                if (path.charAt(0) === this.DELIMITER) {
                    path = path.substr(1);
                }
                if (path.charAt(path.length - 1) === this.DELIMITER) {
                    path = path.substr(0, path.length - 1);
                }

                return path;
            })
            .join(this.DELIMITER);
        return completePath;
    }

    /**
     * Convert a number to a readable memory size.
     * @param size
     */
    public static sizeString(size: number): string {
        let units: Array<string> = ['B', 'kB', 'MB', 'GB', 'TB'];
        let unitIdx: number = 0;
        while (size > 1000) {
            size = size / 1000;
            unitIdx++;
        }

        while (unitIdx >= units.length) {
            unitIdx--;
            size = size * 1000;
        }

        return size.toFixed(2) + units[unitIdx];
    }

    private static _getPaths(path: string): Array<string> {
        let paths: Array<string> = path.split(this.DELIMITER);
        while (paths.length > 0 && paths[0].length <= 0) {
            paths.shift();
        }

        let lastIdx: number = paths.length - 1;
        while (lastIdx > 0 && paths[lastIdx].length <= 0) {
            paths.pop();
            lastIdx--;
        }

        return paths;
    }

    private static getPaths(path: string): Array<string> {
        let paths: Array<string> = path.split(this.DELIMITER);
        while (paths.length > 0 && paths[0].length <= 0) {
            paths.shift();
        }

        let lastIdx: number = paths.length - 1;
        while (lastIdx > 0 && paths[lastIdx].length <= 0) {
            paths.pop();
            lastIdx--;
        }

        return paths;
    }
}
