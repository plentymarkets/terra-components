import { isNullOrUndefined } from 'util';

const DELIMITER: string = '/';

export function getPaths(path: string): Array<string> {
    let paths: Array<string> = path.split(DELIMITER);
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

/**
 * Check if a path is absolute.
 * @param path
 */
export function isAbsolute(path: string): boolean {
    return path.charAt(0) === DELIMITER;
}

/**
 * Check if a path is a directory.
 * @param path
 */
export function isDirectory(path: string): boolean {
    return path.charAt(path.length - 1) === DELIMITER;
}

/**
 * Check if a path is a file.
 * @param path
 */
export function isFile(path: string): boolean {
    return path.charAt(path.length - 1) !== DELIMITER;
}

/**
 * Get the basename (dirname or filename) of a path.
 * @param path
 */
export function basename(path: string): string {
    let paths: Array<string> = getPaths(path);
    let i: number = paths.length - 1;
    return paths[i];
}

/**
 * Get the name of the directory of a file
 * @param path
 */
export function dirname(path: string): string {
    let prefix: string = isAbsolute(path) ? '/' : '';
    let paths: Array<string> = getPaths(path);
    paths.pop();

    return prefix + paths.join(DELIMITER);
}

/**
 * Get the file extension of a path.
 * Extension will be transformed to lower case.
 * @param path
 */
export function extName(path: string): string {
    if (isDirectory(path)) {
        return '';
    }

    let filename: string = basename(path);
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
export function join(...paths: Array<string>): string {
    let completePath: string = paths
        .map((path: string) => {
            if (path.charAt(0) === DELIMITER) {
                path = path.substr(1);
            }
            if (path.charAt(path.length - 1) === DELIMITER) {
                path = path.substr(0, path.length - 1);
            }

            return path;
        })
        .join(DELIMITER);
    return completePath;
}

/**
 * Convert a number to a readable memory size.
 * @param size
 */
export function sizeString(size: number): string {
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
