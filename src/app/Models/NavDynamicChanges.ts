export class MENU_ITEM1
{
  
    MENU_ITEM :ParentNavItem[];
}

export class ParentNavItem
{

    
    path:String
    title:String
    icon:String
    children:ChildNavItem1[];
}
export class ChildNavItem1
{

    path:String
    title:String
    children:ChildNavItem2[];
}
export class ChildNavItem2
{

    path:String
    title:String
    icon:String
   
}