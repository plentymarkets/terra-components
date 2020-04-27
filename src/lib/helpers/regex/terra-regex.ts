/**
 * @author mkunze
 */
export class TerraRegex {
  public static COLOR_HEX: string = '^#[0-9a-fA-F]{3}(?:[0-9a-fA-F]{3})?$';
  public static NUMERIC: string = '^[-+]?\\d+$';
  public static ONLY_STRING_WITH_SLASH_AND_UNDERSCORE: string =
    '^([a-zA-Z0-9]+)((\\/|_)([a-zA-Z0-9]+))*$';
  public static START_WITH_CAPITAL: string = '^[A-Z][A-Za-z]*';
  public static NUMERIC_POSITIVE: string = '^[1-9]+\\d*';
  public static NUMERIC_EAN_13: string = '^[0-9]{13}$';
  public static DOUBLE: string = TerraRegex.getDouble(2);
  public static WEIGHT: string = '^\\d+([\\.,]0)?$';
  public static ISBN: string = '^(97(8|9))?\\d{9}(\\d|X)$';
  public static UPC: string = '"^[0-9]{0,12}$"';
  public static HEX_COLOR_SHORT: string = '^#?([0-9a-f]{3}){1,2}$';
  public static EMAIL: string =
    "^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@" +
    '(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$';
  public static EMAIL_LOCAL_PART: string = '^[a-zA-Z0-9_\\-\\.]*$';
  public static EMAIL_FORWARDING: string = '^[^üÜäÄöÖ!§$%&/{([)=}\\]?\\*+#^°:`µ¤<>|"\']*$';
  public static DATE: string = '^\\d{1,2}\\.\\d{1,2}\\.\\d{4}$';
  public static MYSQL_DATE_TIMESTAMP: string =
    '^[0-9]{4}-(((0[13578]|(10|12))-(0[1-9]|[1-2][0-9]|3[0-1]))|' +
    '(02-(0[1-9]|[1-2][0-9]))|((0[469]|11)-(0[1-9]|[1-2][0-9]|30)))$';
  public static MIXED: string = '^.*$';
  public static SCORE_ALPHA_NUMERIC_POSITIVE_WITH_DOTS: string = '^[a-zA-Z0-9öäüÜÄÖ\\-\\._ ]+$';
  public static PERCENTAGE: string =
    '^((100[\\.,][0]*)|100|[0-9]{0,2}|[0-9]{1,2}[\\.,][0-9]{0,3})$';
  public static SIGNED_PERCENTAGE: string =
    '^[+-]?((100[\\.,][0]*)|100|[0-9]{0,2}|[0-9]{1,2}[\\.,][0-9]{0,3})$';
  public static IP_V4: string =
    '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$';
  public static INT_PHONE: string = '^\\+?(?:[0-9 \\.-/] ?){5,14}[0-9]$';
  public static URL: string =
    '^(http|https|ftp)\\://[a-zA-Z0-9\\-\\.]+\\.[a-zA-Z]{2,3}' +
    "(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\\-\\._\\?\\,\\]\\,\\[\\,\\'/\\\\\\+&amp;%\\$#\\=~])*$";
  public static CANONICAL: string = '^(http:\\/\\/|https:\\/\\/)[a-zA-Z0-9]';
  public static COMMA_DEVIDED: string = '^\\d+[\\, 0-9]*$';
  public static UMLAUTS: string = '[öäüÖÄÜ]';
  public static UPPERCASE_A_Z: string = '[A-Z]';
  public static USERNAME_COMBINED: string = '[^a-zA-Z0-9_\\-\\.]';
  public static HAS_NUMBERS: string = '[0-9]';
  public static PASSWORD_COMBINED: string =
    '[^a-zA-Z0-9äöüÄÖÜ@<\\(\\{\\[/=\\\\\\]\\}\\)>!\\?\\$%&#\\*\\-\\+\\.,;:_\\^\\|~]';
  public static IP_V4_OR_DOMAIN: string =
    '(^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}' +
    '(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$)|(^(?:[a-zA-Z0-9]+(?:\\-*[a-zA-Z0-9])*\\.)+[a-zA-Z]{2,6}$)';
  public static IBAN_BIC: string = '^[a-zA-Z0-9]+$';
  public static NUMBER_LETTERS: string = '^[a-zA-Z0-9_]+$';
  public static WITHOUT_HTML: string = '^[^<]*[^>]*$';
  public static RECOMMENDATIONS_FULL_DATE: string = '^[0-9]{4}[0-1][0-9][0-3][0-9]$';
  public static RECOMMENDATIONS_PARTIAL_DATE: string = '^[0-9]{4}[0-1][0-9]$';
  public static RECOMMENDATIONS_YEAR: string = '^[0-9]{4}$';
  public static HTML_LINEBREAK_ENTITY: string = '<\\s*/?\\s*br\\s*/?\\s*>';
  public static VERSION: string = '^[0-9]+\\.[0-9]+$';
  public static COMPLETE_VERSION: string = '^[0-9]+\\.[0-9]+\\.[0-9]+$';
  public static ROYAL_MAIL_CONTRACT_NUMBER: string = '^[A-Za-z0-9]{1,12}$';
  public static ROYAL_MAIL_COUNTRY_CODE: string = '^[A-Z0-9]{3}$';
  public static PLENTY_CMS_SYNTAX: string =
    '(\\{%[\\s]*(if|for))([\\s\\S]*)(\\{%[\\s]*(endif|endfor)[\\s]*%\\})';

  public static getDouble(decimalPlacesCount: number): string {
    return (
      '^[-+]?[0-9]*' +
      (decimalPlacesCount > 0 ? '[\\.,]?[0-9]{0,' + decimalPlacesCount + '}' : '') +
      '$'
    );
  }

  public static getPositiveDouble(decimalPlacesCount: number): string {
    return (
      '^[+]?[0-9]*' +
      (decimalPlacesCount > 0 ? '[\\.,]?[0-9]{0,' + decimalPlacesCount + '}' : '') +
      '$'
    );
  }
}
