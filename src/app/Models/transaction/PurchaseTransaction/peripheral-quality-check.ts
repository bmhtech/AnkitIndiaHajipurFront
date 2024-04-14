export class PeripheralQualityCheck
{
    pqcno: any;	
	pqc_date: any;	
	supplier_name: any;	
	item_type: any;	
	item_sub_type: any;	
	ref_type: any;	
	pqc_parameter: any;	
	recieved_by: any;	
	wghmnt_no: any;
	company_id: any;
    fin_year: any;
	username:any;
    peripheral_Quality_Check_Details : QualityCheckDetails[];
}
export class QualityCheckDetails
{
    sl_no: any; 	
	item_code: any;	
	item_name: any;	
	packing: any;	
	quantity: any;	
	uom: any;	
	bags: any;	
	warehouse: any;	
	stack: any;	
	sample_size: any;	
	pqc: any;

}
