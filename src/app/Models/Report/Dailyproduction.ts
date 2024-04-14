export class Dailyproduction 

{
    id:any;
    dailyproductionid:any;
    date:any;
    business_unit:any;
    shopfloor:any;
    remarks:any;
    company_id:any;
    fin_year:any;
    username:any;

    dailyproduction_Dtls: dailyproduction_Dtls[];
    dailyproduction_Dtls_One: dailyproduction_Dtls_One[];
}

export class dailyproduction_Dtls
    {
        dailyproductionid:any;
        slno:any;
        item_code:any;
        six_bag:any;
        six_quantity:any;
        six_percen:any;
        eight_bag:any;
        eight_quantity:any;
        eight_percen:any;
        ten_bag:any;
        ten_quantity:any;
        ten_percen:any;
        twelve_bag:any;
        twelve_quantity:any;
        twelve_percen:any;
        forteen_bag:any;
        forteen_quantity:any;
        forteen_percen:any;
        sixteen_bag:any;
        sixteen_quantity:any;
        sixteen_percen:any;
        eighteen_bag:any;
        eighteen_quantity:any;
        eighteen_percen:any;
        twenty_bag:any;
        twenty_quantity:any;
        twenty_percen:any;
        twentytwo_bag:any;
        twentytwo_quantity:any;
        twentytwo_percen:any;
        zero_bag:any;
        zero_quantity:any;
        zero_percen:any;
        two_bag:any;
        two_quantity:any;
        two_percen:any;
        four_bag:any;
        four_quantity:any;
        four_percen:any;
        total:any;
        total_quantity:any;
        total_percen:any;
    }

    export class dailyproduction_Dtls_One
    {
        dailyproductionid:any;
       
        six_bag_total:any;
        six_quantity_total:any;
      
        eight_bag_total:any;
        eight_quantity_total:any;
       
        ten_bag_total:any;
        ten_quantity_total:any;
        
        twelve_bag_total:any;
        twelve_quantity_total:any;
       
        forteen_bag_total:any;
        forteen_quantity_total:any;
       
        sixteen_bag_total:any;
        sixteen_quantity_total:any;
       
        eighteen_bag_total:any;
        eighteen_quantity_total:any;
        
        twenty_bag_total:any;
        twenty_quantity_total:any;
        
        twentytwo_bag_total:any;
        twentytwo_quantity_total:any;
        
        zero_bag_total:any;
        zero_quantity_total:any;
       
        two_bag_total:any;
        two_quantity_total:any;
        
        four_bag_total:any;
        four_quantity_total:any;

        total_bag_total:any;
        total_quantity_total:any;
       
    }