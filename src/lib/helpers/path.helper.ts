import { isNullOrUndefined } from "../public-api";

export class PathHelper
{
    public static readonly DELIMITER:string = '/';

    private static getPaths(path:string):Array<string>
    {
        let paths:Array<string> = path.split(this.DELIMITER);
        while(paths.length > 0 && paths[0].length <= 0)
        {
            paths.shift();
        }

        let lastIdx:number = paths.length - 1;
        while(lastIdx > 0 && paths[lastIdx].length <= 0)
        {
            paths.pop();
            lastIdx--;
        }

        return paths;
    }

    /**
     * Check if a path is absolute.
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    public static isAbsolute(path:string):boolean
    {
        return path.charAt(0) === this.DELIMITER;
    }

    /**
     * Check if a path is a directory.
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    public static isDirectory(path:string):boolean
    {
        return path.charAt(path.length - 1) === this.DELIMITER;
    }

    /**
     * Check if a path is a file.
     *
     * @param {string} path
     *
     * @returns {boolean}
     */
    public static isFile(path:string):boolean
    {
        return path.charAt(path.length - 1) !== this.DELIMITER;
    }

    /**
     * Get the basename (dirname or filename) of a path.
     *
     * @param {string} path
     *
     * @returns {string}
     */
    public static basename(path:string):string
    {
        let paths:Array<string> = this.getPaths(path);
        let i:number = paths.length - 1;
        return paths[i];
    }

    /**
     * Get the name of the directory of a file
     *
     * @param {string} path
     *
     * @return {string}
     */
    public static dirname(path:string):string
    {
        let prefix:string = this.isAbsolute(path) ? '/' : '';
        let paths:Array<string> = this.getPaths(path);
        paths.pop();

        return prefix + paths.join(this.DELIMITER);
    }

    /**
     * Get the file extension of a path.
     * Extension will be transformed to lower case.
     *
     * @param {string} path
     *
     * @returns {string}
     */
    public static extName(path:string):string
    {
        if(this.isDirectory(path))
        {
            return '';
        }

        let filename:string = this.basename(path);
        if(isNullOrUndefined(filename))
        {
            filename = '';
        }
        let splittedFilename:Array<string> = filename.split('.');
        return splittedFilename.pop().toLowerCase();
    }

    /**
     * Join multiple paths.
     *
     * @param {string} paths
     *
     * @returns {string}
     */
    public static join(...paths:Array<string>):string
    {
        return paths.map((path:string) =>
        {
            if(path.charAt(0) === this.DELIMITER)
            {
                path = path.substr(1);
            }
            if(path.charAt(path.length - 1) === this.DELIMITER)
            {
                path = path.substr(0, path.length - 1);
            }

            return path;
        }).join(this.DELIMITER);
    }

    /**
     * Convert a number to a readable memory size.
     *
     * @param {number} size
     *
     * @returns {string}
     */
    public static sizeString(size:number):string
    {
        let units:Array<string> = ['B',
                              'kB',
                              'MB',
                              'GB',
                              'TB'];
        let unitIdx:number = 0;
        while(size > 1000)
        {
            size = size / 1000;
            unitIdx++;
        }

        while(unitIdx >= units.length)
        {
            unitIdx--;
            size = size * 1000;
        }

        return size.toFixed(2) + units[unitIdx];
    }
}
