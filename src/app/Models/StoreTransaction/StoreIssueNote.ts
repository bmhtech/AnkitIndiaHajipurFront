export class StoreIssueNote {
     id:any;
     store_issue_id: any;
     store_issue_date: any;  
     company_id: any;
     fin_year: any;
     username:any;
     store_issue_note_details:Store_issue_note_details[];
}


export class Store_issue_note_details {
   
     slno:any;
     store_issue_id:any;
     store_issue_date:any;
     item:any;
     item_name:any;
     classified_item:any;
     avail_qty:any;
     issue_qty:any;
     warehouse:any;
     warehouse_name:any;
     transferable:any;
     transfer_warehouse:any;
     transfer_warehouse_name:any;
}
