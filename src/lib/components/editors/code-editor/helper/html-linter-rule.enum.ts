export enum HtmlLinterRule
{
    tagnameLowercase = 'tagname-lowercase',
    attrLowercase = 'attr-lowercase',
    attrValueDoubleQuotes = 'attr-value-double-quotes',
    attrValueNotEmpty = 'attr-value-not-empty',
    attrNoDuplicate = 'attr-no-duplication',
    doctypeFirst = 'doctype-first',
    tagPair = 'tag-pair',
    tagSelfClose = 'tag-self-close',
    specCharEscape = 'spec-char-escape',
    idUnique = 'id-unique',
    srcNotEmpty = 'src-not-empty',
    titleRequire = 'title-require',
    altRequire = 'alt-require',
    doctypeHtml5 = 'doctype-html5',
    styleDisabled = 'style-disabled',
    inlineStyleDisabled = 'inline-style-disabled',
    inlineScriptDisabled = 'inline-script-disabled',
    hrefAbsOrRel = 'href-abs-or-rel',
    attrUnsafeChars = 'attr-unsafe-chars',
    headScriptDisabled = 'head-script-disabled'
}
