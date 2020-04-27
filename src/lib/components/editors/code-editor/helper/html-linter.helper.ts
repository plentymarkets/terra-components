import { HtmlLinterMessageInterface } from './html-linter-message.interface';
import { HtmlLinterRule } from './html-linter-rule.enum';
import { HTMLHint } from 'htmlhint';

export class HtmlLinter {
  private rules: { [key: string]: boolean } = {};

  constructor(rules: Array<string>) {
    Object.keys(HtmlLinterRule).forEach((ruleKey: HtmlLinterRule) => {
      const rule: string = HtmlLinterRule[ruleKey];
      this.rules[rule] = rules.indexOf(rule) >= 0;
    });
  }

  public verify(input: string): Array<HtmlLinterMessageInterface> {
    return HTMLHint.verify(input, this.rules).map((message: any) => {
      return {
        line: message.line,
        col: message.col,
        rule: message.rule.id
      };
    });
  }
}
