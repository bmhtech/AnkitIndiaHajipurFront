export class ItemMaster {
    id:any;
    item_id:any;
    item_code:any;
    hsn_code:any;
    item_name:any;
    item_active:any;
    item_group:any;
    sub_group:any;
    item_type:any;
    item_group_name:any;
    //product_type:any;
    item_category:any;
    alt_name:any;
    mrp:any;
    unit_type:any;
    mstock_unit:any;
    standard_rate:any;
    inventory_item:any;
    sales_item:any;
    purchase_item:any;
    processed_item:any;
    impurities_item:any;
    qc_require:any;
    all_unit:any;
    group_name:any;
    // unit1_itc:any;
    // unit2_fmill:any;
    // rice_mill:any;
    confirmed_by:any;
    reason:any;
    approval:any;
    item_unit:any;
    checkbox:any;
    company_id: any;
    fin_year: any;
    username:any;
    chakki_prod:any;
    roller_prod:any;
    input_prod:any;
    //upload_picture:any;
    //nutrition_chart:any;
   // fin_year:any;
    item_master_stat_infos : Item_master_stat_info[];
    item_master_inv_data1:Item_master_inv_data1;
    item_master_inv_data2:Item_master_inv_data2;
    item_master_other_info:Item_master_other_info;
    item_master_pack_mat_tags:Item_master_pack_mat_tag[];
    itmItem_master_qc_details:itmItem_master_qc_details[];
    item_master_alternative_dtls:item_master_alternative_dtls[];
    item_master_stock_details:Item_master_stock_details[];
    item_master_classification:Item_master_classification[];
    item_master_size_weight:Item_master_size_weight[];
    // item_id: {};
   }

    export class Item_master_stat_info{
       // item_code: any;
       // company_id: any;
        sl_no: any;
        tax_code: any;
        tax_rate: any;
        eff_date: any;
        applicable: any;
        fin_year: any;
        cess:any;
        
    }

    export class Item_master_inv_data1{
       // item_code: any;
       // company_id: any;
        selling_unit: any;
        purchase_unit: any;
        valuation_type: any;
        mrp: any;
        msp: any;
        min_inv_limit: any;

        eanno1: any;
        eanno2: any;
        tolerance: any;
        srno: any;
        catalog_no: any;
        opening_stock:any;
        std_lead_time: any;
       // uom: any;
        mng_by_batch: any;
        mng_by_slno: any;
        //fin_year: any;
        
    }

    export class  Item_master_inv_data2{
        //item_code: any;
        //company_id: any;
        neg_inv_allow: any;
        manage_inv_wh: any;
        sales_qty: any;
        sales_uom: any;
        pur_qty: any;
        pur_uom: any;

        eoq_qty: any;
        eoq_uom: any;
        reorder_qty: any;
        reorder_uom: any;
       // fin_year: any;
       
    }
    
    export class  Item_master_other_info{
       // item_code: any;
        //company_id: any;
        gen_name: any;
        self_life: any;
        exp_date: any;
        // net_wt: any;
        // gross_wt: any;
        specific_desc: any;

        ser_item: any;
        non_store_item: any;
        stock_item: any;
       // pack_item: any;
        //loose_item: any;
       // fin_year: any;
       
    }

    export class  Item_master_pack_mat_tag{
      
       // company_id: any;
        sl_no: any;
        item_name:any;
        capacity: any;
        uom1: any;
        empbagwt_based_on:any;
        empty_big_wt: any;
        //gross_wt: any;
        item_code:any;
        tolerance: any;
        item_uom:any;
    
    }

    export class item_master_alternative_dtls
    {
      checkbox:any;
      item_id_old: any;
      // item_code: any;
      hsn_code: any;
      item_name: any;
      item_group: any;
      item_category: any;
      mstock_unit: any;
      group_name:any;
      category_name:any;
      uom_name:any;
      addless:any;
      packing_cost:any;
      // item_active: any;
    }

    export class Item_master_stock_details
    {
      businessunit: any;
      opening_stock: any;
      uom:any;
      
    }

    export class itmItem_master_qc_details{
      
                sl_no:any;
                qc_code:any;
                qc_id:any;
    }

    export class Uomdopdown{
      code:any;
      name:any;
    }
    export class uom {
      item_group_id: any;
      item_group_code: any;
      group_name: any;
      group_active: any;
      item_uom:any;
    }

    export class dy_taxCode{
      tax_id: any;
      tax_code: any;
      tax_description:any;
    }
    export class Item_category {
      catagory_code:any;
      company_id:any;
      catagory_name:any;
      item_active:any;
      item_type:any;
      //fin_year:any;
     
  }
  export class ItemType{
    item_id:any;
    item_code:any;
    item_name:any;
    item_active:any;
  }

  export class Bussiness_Unit
  {
    businessunit_id: any;
    businessunit_code: any;
    businessunit_name: any;
    work_address: any;
    country_name: any;
    state_name:any;
    city_name: any;
    pin_code: any;
    add: any;
  }

  export class itemModalPopUp
  {
    checkbox:any;
    item_id: any;
    hsn_code: any;
    item_name: any;
    item_group: any;
    item_category: any;
    mstock_unit: any;
    group_name:any;
    category_name:any;
    uom_name:any;
  }
  
  export class Item_master_classification{
     sl_no: any;
     classified_item_name:any;
 }
 
 export class Item_master_size_weight{
  sl_no: any;
  item_code:any;
  master_code:any;
  item_size:any;
  item_weight:any;
  weight_tolerance:any;
}