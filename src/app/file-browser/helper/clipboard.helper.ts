export class ClipboardHelper
{
    public static copySelection():boolean
    {
        let success:boolean = false;
        try
        {
            success = document.execCommand('copy');
        }
        catch(err)
        {
            success = false;
        }

        return success;
    }

    public static copyText(text:string):boolean
    {
        let container:HTMLElement = ClipboardHelper.createElement('div', {
            position: 'fixed',
            left:     '0px',
            top:      '0px',
            width:    '0px',
            height:   '0px',
            display:  'block',
            opacity:  '0',
            zIndex:   '10000'
        });

        let textarea:HTMLTextAreaElement = ClipboardHelper.createElement<HTMLTextAreaElement>('textarea', {
            width:   '1px',
            height:  '1px',
            padding: '0px'
        });

        textarea.value = text;
        container.appendChild(textarea);
        document.body.appendChild(container);
        textarea.focus();
        textarea.select();

        let success = ClipboardHelper.copySelection();

        document.body.removeChild(container);

        return success;
    }

    private static createElement<T extends HTMLElement>(tagName:string, styles:{ [key:string]:string } = {}):T
    {
        let element:T = <T>document.createElement(tagName);
        Object.keys(styles).forEach(style =>
        {
            element.style[style] = styles[style];
        });
        return element;
    }
}
