import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TerraNodeTreeConfig } from './data/terra-node-tree.config';
import { isNullOrUndefined } from 'util';
import { TerraNodeInterface } from './data/terra-node.interface';
import { Language, TranslationService } from 'angular-l10n';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StringHelper } from '../../../helpers';

@Component({
  selector: 'terra-node-tree',
  styleUrls: ['./terra-node-tree.component.scss'],
  templateUrl: './terra-node-tree.component.html'
})
export class TerraNodeTreeComponent<D> implements OnDestroy, OnInit {
  /**
   * @description The config to handle actions on tree or node.
   */
  @Input()
  public inputConfig: TerraNodeTreeConfig<D>;

  /**
   * @description Shows the search box above the tree.
   */
  @Input()
  public inputShowSearch: boolean;

  /**
   * @description Disables or enables the System Tree
   */
  @Input()
  public isTreeDisabled: boolean;

  @Language()
  public _lang: string;

  public _formControl: FormControl = new FormControl();

  constructor(private _translation: TranslationService) {}

  public ngOnInit(): void {
    this.inputConfig.checkVisibilityAndAssignDefault(this.inputConfig.list);
    this._formControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((searchValue: string) => {
        if (StringHelper.isNullUndefinedOrEmpty(searchValue)) {
          this.inputConfig.checkDefaultAndAssignVisibility(this.inputConfig.list);
          this.inputConfig.toggleOpenChildren(this.inputConfig.list, false);

          if (!isNullOrUndefined(this.inputConfig.currentSelectedNode)) {
            this.inputConfig.toggleOpenParent(this.inputConfig.currentSelectedNode, true);
          }
        } else {
          this._doSearch(searchValue);
        }
      });
  }

  public ngOnDestroy(): void {
    this.inputConfig.reset();
  }

  private _doSearch(searchValue: string): void {
    this.inputConfig.list.forEach((node: TerraNodeInterface<D>) => {
      this._search(node, false, searchValue);
    });
  }

  private _search(
    node: TerraNodeInterface<D>,
    isParentVisible: boolean,
    searchValue: string
  ): boolean {
    // ignore non visible nodes
    if (!node.defaultVisibility) {
      return;
    }

    let isVisible: boolean = isParentVisible || this._matchesSearchString(node, searchValue);
    let isEmptySearchString: boolean = isNullOrUndefined(searchValue) || searchValue.length === 0;

    let hasVisibleChild: boolean = false;
    let hasChildren: boolean = false;

    if (!isNullOrUndefined(node.children)) {
      node.children.forEach((childNode: TerraNodeInterface<D>) => {
        hasChildren = true;
        hasVisibleChild = this._search(childNode, isVisible, searchValue) || hasVisibleChild;
      });
    }

    if (hasChildren) {
      if (!node.isOpen && !isEmptySearchString) {
        node.isOpen = true;
        this.inputConfig.toggleOpenChildren(node.children, true);
      } else if (isEmptySearchString) {
        node.isOpen = false;
      }
    }

    node.isVisible = isVisible || hasVisibleChild;

    return isVisible || hasVisibleChild;
  }

  /** @description Checks whether a node matches a given search string */
  private _matchesSearchString(node: TerraNodeInterface<D>, searchValue: string): boolean {
    return this._matchesName(node.name, searchValue) || this._matchesTags(node.tags, searchValue);
  }

  /** @description Checks whether a given search string matches some of the node's tags. */
  private _matchesTags(nodeTags: Array<string>, searchValue: string): boolean {
    const tags: Array<string> = nodeTags || [];
    return tags.some((tag: string) => {
      return tag.toUpperCase().includes(searchValue.toUpperCase());
    });
  }

  /** @description Checks whether a given search string matches the name of a node. */
  private _matchesName(nodeName: string, searchValue: string): boolean {
    if (!isNullOrUndefined(nodeName)) {
      // TODO do not translate name here, should be translated from outside
      let name: string = this._translation.translate(nodeName);

      let suggestion: string = name.toUpperCase();

      // check if search string is included in the given suggestion
      return suggestion.includes(searchValue.toUpperCase());
    }

    return false;
  }
}
