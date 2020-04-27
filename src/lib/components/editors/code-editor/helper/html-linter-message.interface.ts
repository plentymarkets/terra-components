import { HtmlLinterRule } from './html-linter-rule.enum';

export interface HtmlLinterMessageInterface {
  line: number;
  col: number;
  rule: HtmlLinterRule;
}
