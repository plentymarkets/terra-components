import {isNullOrUndefined} from "util";

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

    public static isAbsolute(path:string):boolean
    {
        return path.charAt(0) === this.DELIMITER;
    }

    public static isDirectory(path:string):boolean
    {
        return path.charAt(path.length - 1) === this.DELIMITER;
    }

    public static isFile(path:string):boolean
    {
        return path.charAt(path.length - 1) !== this.DELIMITER;
    }

    public static basename(path:string):string
    {
        let paths:Array<string> = this.getPaths(path);
        let i:number = paths.length - 1;
        return paths[i];
    }

    public static dirname(path:string):string
    {
        let prefix:string = this.isAbsolute(path) ? '/' : '';
        let paths:Array<string> = this.getPaths(path);
        paths.pop();

        return prefix + paths.join(this.DELIMITER);
    }

    public static extName(path:string):string
    {
        if(this.isDirectory(path))
        {
            return '';
        }

        let filename:string = this.basename(path);
        if (isNullOrUndefined(filename))
        {
            filename = '';
        }
        let splittedFilename:Array<string> = filename.split('.');
        return splittedFilename.pop();
    }

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
