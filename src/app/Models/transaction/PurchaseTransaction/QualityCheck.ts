export class QualityCheck
{
    id:any;
    qcno: any;	
	qc_date: any;	
	supplier_name: any;	
	item_type: any;	
	item_sub_type: any;	
	ref_type: any;		
    qc_by:any;
    business_unit:any;
    approved_by:any;	
	wghmnt_no: any;
    vehicle_id:any;
    referenceid:any;
	company_id: any;
    fin_year: any;
    username:any;
    pur_Quality_Check_Details : QualityCheckDetails[];
    
}
export class QualityCheckDetails
{
    sl_no:any;	
    item_code:any;
    quantity:any;
    uom: any;
    packing: any; 
    s_qty: any;  
    s_uom: any; 
    warehouse:any;	
    stack:any;	
    qc:any;
    qc_id:any;
    qc_status:any

    pur_Quality_Check_Details_QcDetails: pur_Quality_Check_Details_QcDetails[];
}

export class pur_Quality_Check_Details_QcDetails
{
    sl_no:any;
    qc_code:any;
    qc_param:any;
    cal_basis:any;
    basis_amt_UoM:any;
    min:any;
    max:any;
    sample:any;
    observation:any;
    out_qc_param: any;
    master_observation: any;
    qc_remarks: any;
}

