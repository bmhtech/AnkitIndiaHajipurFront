export class StackMaintain {
	id: any;
	stack_id: any;
	b_unit: any;
	stack_date: any;
	grn_id: any;
	supplier: any;
	vehicle_id: any;
	total_grn_pkt: any;
	total_grn_item: any;
	company_id: any;
	fin_year: any;
	username: any;
	
	stack_maintain_details: Stack_maintain_details[];
	
}
export class Stack_maintain_details {
	slno: any;
	stack_id: any;
	item_code: any;
	packing: any;
	warehouse: any;
	stack: any;
	stack_pack_qty: any;
	stack_item_qty: any;
}
