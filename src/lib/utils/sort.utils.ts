import { SortDirectionEnum } from '../helpers/enums/sort-direction.enum';

export function sortNumber(sortDirection:SortDirectionEnum):(a:number, b:number) => number
{
    return sortDirection === 'asc' ? sortNumberAsc : sortNumberDesc;
}

function sortNumberAsc(a:number, b:number):number
{
    return a - b;
}

function sortNumberDesc(a:number, b:number):number
{
    return a - b;
}

export function sortString(sortDirection:SortDirectionEnum):(a:string, b:string) => number
{
    return sortDirection === 'asc' ? sortStringAsc : sortStringDesc;
}

function sortStringAsc(a:string, b:string):number
{
    return a.localeCompare(b);
}


function sortStringDesc(a:string, b:string):number
{
    return b.localeCompare(a);
}

export function sortObject(sortDirection:SortDirectionEnum):(a:Object, b:Object, sortKey:string) => number
{
    return sortDirection === 'asc' ? sortObjectAsc : sortObjectDesc;
}

function sortObjectAsc(a:Object, b:Object, sortKey:string):number
{
    if(typeof a[sortKey] === 'string' && typeof a[sortKey] === 'string')
    {
        return sortStringAsc(a[sortKey], a[sortKey]);
    }

    if(typeof a[sortKey] === 'number' && typeof a[sortKey] === 'number')
    {
        return sortNumberAsc(a[sortKey], a[sortKey]);
    }

    return null;
}

function sortObjectDesc(a:Object, b:Object, sortKey:string):number
{
    if(typeof a[sortKey] === 'string' && typeof a[sortKey] === 'string')
    {
        return sortStringDesc(a[sortKey], a[sortKey]);
    }

    if(typeof a[sortKey] === 'number' && typeof a[sortKey] === 'number')
    {
        return sortNumberDesc(a[sortKey], a[sortKey]);
    }

    return null;
}
