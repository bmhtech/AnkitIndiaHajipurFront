export class employee {
    matcategory_code:any;
    matcategory_name:any;
    mattype_code:any;
    mattype_name:any;
  
    businessunit_code:any;
    businessunit_name:any;
    matcategory_active:any;
   
}

export class employee_master_list
{
    id: any;
    emp_id: any;
    emp_code:any;  
    emp_name: any;
    country_id:any;
    state_id:any;
    city_id: any;
    address:any;
    password:any;
    emp_username:any;
    dept_id: any;
    email_id: any;
    mobile_no: any;
    concat_multi: any;
    preference: any;
   
    // pan_no: any;
    // aadhaar_no: any;
    // uan_no: any;
    // employee_category:any;
    // employee_grade:any;
    company_id:any;
    fin_year:any;

    role:Role[];
}

 export class Role
 {
     user_role_id:any;
 }
 