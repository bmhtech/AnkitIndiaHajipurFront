import { Injectable } from '@angular/core';
//import { MENU_ITEM } from '../../pages/menu';
import { Router } from '@angular/router';
import { GlobalService } from './global.service';
import { DropdownServiceService } from '../../service/dropdown-service.service';
import { MENU_ITEM1} from '../../Models/NavDynamicChanges';

@Injectable()
export class menuService {
user_role="";
username="";
menu="";
MENU_ITEM: MENU_ITEM1[];


  constructor(public _globalService: GlobalService, private _router: Router,private DropDownListService: DropdownServiceService) {
// this.user_role=localStorage.getItem("user_role");
 let getnavs=localStorage.getItem("navItem");
// console.log("get val: "+getnavs);
 this.MENU_ITEM=JSON.parse(getnavs);
   
     this.getNodePath(this.MENU_ITEM);
    
  }

  private parent_node = null;
  private node = null;
  private path_item = [];

  protected queryParentNode(json: any, node_id: any) {
    for (let i = 0; i < json.length; i++) {
      if (this.node)
        break;
      const object = json[i];
      if (!object || !object.path)
        continue;
      if (object.path === node_id) {
        this.node = object;
        break;
      } else {
        if (object.children) {
          this.parent_node = object;
          this.queryParentNode(object.children, node_id);
        } else {
          continue;
        }
      }
    }
    if (!this.node)
      this.parent_node = null;
    return {
      parent_node: this.parent_node,
      node: this.node
    };
  }

  protected creatRouterLink(nodeId: any) {
    this.node = null;
    this.parent_node = null;
    const menuObj = this.queryParentNode(this.MENU_ITEM, nodeId);
    if (menuObj.parent_node && menuObj.parent_node.path) {
      this.path_item.unshift(menuObj.parent_node.path);
      return this.creatRouterLink(menuObj.parent_node.path);
    } else {
      return this.path_item;
    }
  }

  protected getNodePath(json: any): void {
    json.forEach((index) => {
      if (index.children) {
        //delete index.routerLink;
        this.getNodePath(index.children);
        index.toggle = 'init';
      } else {
        this.path_item = [index.path];
        index.routerLink = this.creatRouterLink(index.path);
        index.routerLink.unshift('/', 'pages');
      }
    })
  }

  public putSidebarJson() {
    return this.MENU_ITEM;
  }

  public selectItem(item) {
    item.forEach(element => {
      if (element.routerLink) {
        element.isActive = this._router.isActive(this._router.createUrlTree(element.routerLink), true);
        if (element.isActive)
          //this._globalService._isActived(element);
          this._globalService.dataBusChanged('isActived', element);
      } else if (element.children)
        this.selectItem(element.children);
    });
  }

}
