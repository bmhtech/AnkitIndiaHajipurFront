export class material {
    // material_id:any;
     material_code:any; 
     material_name:any;   
     matgroup_code:any;
     matgroup_name:any;
     alternative_name:any;
     master_sku:any;
     standard_rate:any;   
     manageby_batch:any;    
     businessunit_code:any;
     businessunit_name:any;
     selling_unit:any;
     purchase_unit:any;
     
     valuation_type:any;
     mrp_rate:any;
     
     msp_rate:any;
     inventory_item:any;
     purchase_item:any;
     processed_item:any;
     impurites_item:any;
     
     sales_item:any;
     qc_required:any;
     accept_norms_req:any;
     material_uom:any;
     batch_gen_method:any;
     
     negative_inv_allowed:any;
     mng_inv_bywarehouse:any;
 
     min_sales_ord_qty:any;
     min_sales_ord_uom:any;
     min_prchs_ord_qty:any;
     
     min_prchs_ord_uom:any;
     eoq_level_qty:any;
     eoq_level_uom:any;
     reorder_level_qty:any;
     reorder_level_uom:any;
     
     generic_name:any;
     self_life:any;
     expairy_date:any;
     mat_open_stock:any;
     mat_curr_stock:any;
     mat_stock_value:any;
 
     mat_stat_info :dmat_stat_info[];
     mat_pref_ven :dmat_pref_ven[];
     mat_pack_info :dmat_pack_info[];
     mat_alt_item :dmat_alt_item[];    
     
 }

 export class dmat_stat_info {
     serial_no:any;
     hsn_sac_code:any;
     tax_code:any;
     tax_name:any;
     effect_date:any;
     app_statutory:any;
 }
 
 export class dmat_pref_ven{
     sln_no:any;
     vendor_code:any;
     vendor_name:any;
     active_vendor:any;
 }
 
 export class dmat_pack_info{
     pack_slno:any;
     material_code:any;
     material_name:any;
     packing_capacity:any;
     packing_uom1:any;
     emptybag_weight:any;
     packing_uom2:any;
     tolerence_per:any;
 
 }
 
export class dmat_alt_item {
    sln_no:any;
    material_code:String;
    material_name:String;
    item_active:boolean;
}
