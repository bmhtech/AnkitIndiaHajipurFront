
// export let MENU_ITEM =[{"path":"index","title":"Dashboard","icon":"dashboard","children":[{"path":"","title":"","children":[{"path":"","title":"","icon":""}]}]}
// ]

export let MENU_ITEM = [
    {
        path: 'index',
        title: 'Dashboard',
        icon: 'dashboard'
    },

    {
        path: 'Masters',
        title: 'Masters',
        icon: 'sitemap',
        children: [
            {
                path: 'ItemMaster',
                title: 'Item Master',
                children: [ 
                    
                 {
                    path: 'ItemCategory',
                    title: 'Item Category',
                    icon: 'angle-right',
                 },
                 {
                    path: 'ItemGroup',
                    title: 'Item group',
                    icon: 'angle-right',
                  },

                  {
                    path: 'itemsmaster',
                    title: 'Items master',
                    icon: 'angle-right',
                 },

                 {
                    path: 'ItemOpeningStock',
                    title: 'Item Opening Stock',
                    icon: 'angle-right',
                 },
                 {
                    path: 'item-stock',
                    title: 'Item Stock',
                    icon: 'angle-right',
                 },
                 {
                    path: 'item-service-master',
                    title: 'Item Service Master',
                    icon: 'angle-right',
                 },
                 {
                    path: 'JobWorkItemAllocation',
                    title: 'JobWork Item Allocation',
                    icon: 'angle-right',
                 },
                 {
                    path: 'JobWorkItemAllocationGrn',
                    title: 'Job work Grn Tagging',
                    icon: 'angle-right',
                 },
                 
                 {
                    path: 'JobWorkItemAllocationGrnnew',
                    title: 'Job work Grn Tagging new',
                    icon: 'angle-right',
                 },
                 

                ]
            },
            {
                path: 'Masters/SupplierMaster',
                title: 'Supplier Master',
                children: [
                    {
                        path: 'SupplierGroup',
                        title: 'Supplier Group',
                        icon: 'angle-right',
                    },
               
                   {
                    path: 'SuppliersMaster',
                    title: 'Suppliers Master',
                    icon: 'angle-right',
                   },

                 {
                    path: 'Transportergroup',
                    title: 'Transporter group',
                    icon: 'angle-right',
                  },

                  {
                    path: 'TransporterMaster',
                    title: 'Transporter master',
                    icon: 'angle-right',
                 },


                ]
            },
            {
                path: 'Masters/CustomerMaster',
                title: 'Customer Master',
                children: [
                    {
                        path: 'CustomerGroup',
                        title: 'Customer Group',
                        icon: 'angle-right',
                    },
               
                   {
                    path: 'CustomersMaster',
                    title: 'Customers Master',
                    icon: 'angle-right',
                   },

                 


                ]
            },
            {
                path: 'Masters/BrokerMaster',
                title: 'Broker Master',
                children: [
                    {
                        path: 'BrokerGroup',
                        title: 'Broker Group',
                        icon: 'angle-right',
                    },
               
                   {
                    path: 'BrokersMaster',
                    title: 'Broker Master',
                    icon: 'angle-right',
                   },

                 


                ]
            },
            {
                path: 'Masters/OtherPartnerMaster',
                title: 'Other Partner Master',
                children: [
                    {
                        path: 'OtherPartnerGroup',
                        title: 'Other Partner Group',
                        icon: 'angle-right',
                    },
               
                   {
                    path: 'OtherPartners',
                    title: 'Other Partner Master',
                    icon: 'angle-right',
                   },

                 


                ]
            },
            
            {
                path: 'Masters/OtherMasters',
                title: 'Other Masters',
                //icon: 'bar-chart',
                children: [
                    // {
                    //     path: 'AccNorms',
                    //     title: 'Acceptance Norms Master',
                    //     icon: 'angle-right',
                    // },
                   
                     {
                         path: 'shop-floor-master',
                         title: 'Shop Floor Master ',
                         icon: 'angle-right',
                     },
                    {
                        path: 'PaymentTerm',
                        title: 'Payment Term Master',
                        icon: 'angle-right',
                    },
                    {
                        // path: 'QCRulesSetup',
                        path: 'qcrulessetup',
                        title: 'QC Rules Setup',
                        icon: 'angle-right',
                    },
                    {
                        path: 'tds-master',
                        title: 'TDS Master',
                        icon: 'angle-right',
                    },

                    {
                        path: 'charges-master',
                        title: 'Charges Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'zone-master',
                        title: 'Zone Master',
                        icon: 'angle-right',
                    },

                    {
                        path: 'ChannelCustomerMasterComponent',
                        title: 'Channel Customer Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'WeighmentChargesMaster',
                        title: 'Weighment Charges Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'loadingPoint',
                        title: 'Loading Point',
                        icon: 'angle-right',
                    },
                    {
                        path: 'otherPartyMaster',
                        title: 'Other Party Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'otherItemMaster',
                        title: 'Other Item Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'storeInventoryCharges',
                        title: 'Store Inventory Charges Master',
                        icon: 'angle-right',
                    }
                ]
            },
            // {
            //     path: 'Masters/AccountMaster',
            //     title: 'Account Master',
            //    // icon: 'check-square-o',
            //     children: [
            //         {
            //             path: 'accountgroup',
            //             title: 'Account Group Master',
            //             icon: 'angle-right',
            //         },
            //         {
            //             path: 'accountsubgroup',
            //             title: 'Account SubGroup Master',
            //             icon: 'angle-right',
            //         },
            //         {
            //             path: 'accountledger',
            //             title: 'General Account Ledger Master',
            //             icon: 'angle-right',
            //         },
            //         {
            //             path: 'categorymaster',
            //             title: 'Cost Category Master',
            //             icon: 'angle-right',
            //         },
            //         {
            //             path: 'costcentre',
            //             title: 'Cost Centre Master',
            //             icon: 'angle-right',
            //         },
            //         {
            //             path: 'narrationmaster',
            //             title: 'Narration Master',
            //             icon: 'angle-right',
            //         },
                    
                   
            //     ]
            // },
            
            {
                path: 'Masters/MisMaster',
                title: 'Mislenious Master',
              //  icon: 'paint-brush',
                children: [


                   
                    {
                        path: 'company',
                        title: 'Company Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'company-business-unit-master',
                        title: 'Company Business Unit  Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'warehouse-master',
                        title: 'WareHouse Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'bingroup',
                        title: 'Bin Group',
                        icon: 'angle-right',
                    },
                    {
                        path: 'bin-master',
                        title: 'Bin Master',
                        icon: 'angle-right',
                    },

                    // {
                    //     path: 'employee-master',
                    //     title: 'Employee Master',
                    //     icon: 'angle-right',
                    // },

                    {
                        path: 'department-master',
                        title: 'Department Master',
                        icon: 'angle-right',
                    },


                    {
                        path: 'custom-uom-master',
                        title: 'Custom UOM Master',
                        icon: 'angle-right',
                    },
                   
                    
                    {
                        path: 'misc-master',
                        title: 'Miscellaneous Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'tax-type-master',
                        title: 'Tax Type Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'vehicle-type-master',
                        title: 'Vehicle Type Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'vehicle-master',
                        title: 'Vehicle Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'transportation-charges-matrix-master',
                        title: 'Transportation Charges Matrix Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'tax-code-master',
                        title: 'Tax Code Master',
                        icon: 'angle-right',
                    },
                      {
                         path: 'designation-master',
                         title: 'Designation Master',
                         icon: 'angle-right',
                     }, 

                     {
                        path: 'district-master',
                        title: 'District Master',
                        icon: 'angle-right',
                    }, 

                    {
                        path: 'city-master',
                        title: 'City Master',
                        icon: 'angle-right',
                    }, 

                    {
                        path: 'PostOffice',
                        title: 'Post Office Master',
                        icon: 'angle-right',
                    }, 

                    {
                        path: 'area-master',
                        title: 'Area Master',
                        icon: 'angle-right',
                    }, 
                    {
                        path: 'reason-master',
                        title: 'Reason Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'screen-master',
                        title: 'Screen Master',
                        icon: 'angle-right',
                    },
                    
                    {
                        path: 'purpose-master',
                        icon: 'angle-right',
                        title: 'Purpose Master',
                        
                    },
                    {
                        path: 'invoice-type-master',
                        icon: 'angle-right',
                        title: 'Invoice Type',
                        
                    },
                    {
                        path: 'driver-master',
                        icon: 'angle-right',
                        title: 'Driver Master',
                        
                    },
                    {
                        path: 'godownmaster',
                        icon: 'angle-right',
                        title: 'Godown Master',
                        
                    },
                    {
                        path: 'hubmaster',
                        icon: 'angle-right',
                        title: 'Hub Master',
                        
                    },
                    {
                        path: 'seivesmaster',
                        icon: 'angle-right',
                        title: 'Seives Master',
                    
                    },

                ]
            },
            
            {
                path: 'Masters/ServiceItemMaster',
                title: 'Service Item Master',
                children: [
                    {
                        path: 'servicemaster',
                        title: 'Service Master',
                        icon: 'angle-right',
                    }
               
                 


                ]
            },
            // {
            //     path: 'Masters/ChannelMaster',
            //     title: 'Channel Partner Master',
            //   /*  children: [
            //         {
            //             path: 'Channels',
            //             title: 'Channels'
            //         }
            //     ]
            //     */

                
            // }, 
        ]
    },
    {
        path: 'invTrans',
        title: 'Inventory Transaction',
        icon: 'sitemap',
        children: [
            {
                path: 'purchase',
                title: 'Purchase Inventory',
                children: [
                    {
                        path: 'IndentOrder',
                        title: 'Indent Order',
                        icon: 'angle-right',
                    },
                    {
                        path: 'purchase-enquiry',
                        title: 'Purchase Enquiry',
                        icon: 'angle-right',
                    },
                    {
                        path: 'purchase-quotation',
                        title: 'Purchase Quotation',
                        icon: 'angle-right',
                    },
                    {
                        path: 'purchase-order',
                        title: 'Purchase Order',
                        icon: 'angle-right',
                    },
                    {
                        path: 'quality-check',
                        title: 'Quality Check',
                        icon: 'angle-right',
                    },
                    {
                        path: 'PeripheralQualityCheck',
                        title: 'Peripheral Quality Check',
                        icon: 'angle-right',
                    },
                    {
                        path: 'grn',
                        title: 'GRN',
                        icon: 'angle-right',
                    },
                    {
                        path: 'l1-selection',
                        title: 'L1 Selection',
                        icon: 'angle-right',
                    },
                    {
                        path: 'purchase-bill',
                        title: 'Purchase Bill',
                        icon: 'angle-right',
                    },
                    {
                        path: "stack-maintain",
                        title: "Stack Maintain",
                        icon: "angle-right",
                    },
                    {
                        path: 'pur-return-approval-note',
                        title: 'Purchase Return Approval Note',
                        icon: 'angle-right',
                    },

                    {
                        path: 'pur-return-note',
                        title: 'Purchase Return Note',
                        icon: 'angle-right',
                    },

                    {
                        path: 'debit-note',
                        title: 'Debit Note',
                        icon: 'angle-right',
                    },
                   
                    {
                        path: 'payment-approval',
                        title: 'Payment Approval',
                        icon: 'angle-right',
                    },


                ]
            },
                     
            {
              //  path: 'invTrans/weighment',//no
              path: 'weighment',
                title: 'Weighment',
                children: [

                    {
                        path: 'TagAdviceWithPo',
                        title: 'Tag Advice With PO',
                        icon: 'angle-right',
                    },

                    {
                        path: 'unloadAdvice',
                        title: 'Unload Advice',
                        icon: 'angle-right',
                    },
                    {
                        path: 'unloadWeightment',
                        title: 'Weightment',
                        icon: 'angle-right',
                    },
                    {
                        path: 'loadingAdvice',
                        title: 'Loading Advice',
                        icon: 'angle-right',
                    },
                    {
                        path: 'OtherWeighment',
                        title: 'Other Weighment',
                        icon: 'angle-right',
                    },
                   

                    // {
                    //     path: 'loadingWeightment',
                    //     title: 'Loading Weightment',
                    //     icon: 'angle-right',
                    // },
                  
                    
                ]
            },
            {
                path: 'invTrans/salestransaction',
              //  path: 'salestransaction',
                title: 'Sales Transaction',
                children: [
                    {
                        path: 'ratechart',
                        title: 'Rate Chart',
                        icon: 'angle-right',
                    },
                    {
                        path: 'salesenquiry',
                        title: 'Sales Enquiry',
                        icon: 'angle-right',
                    },
                    {
                        path: 'SalesQuotation',
                        title: 'Sales Quotation',
                        icon: 'angle-right',
                    },
                    {
                        path: 'SalesOrder',
                        title: 'Sales Order',
                        icon: 'angle-right',
                    },
                    {
                        path: 'DeliveryChallan',
                        title: 'Delivery Challan',
                        icon: 'angle-right',
                    },
                  
                    {
                        path: 'SalesInvoice',
                        title: 'Sales Invoice',
                        icon: 'angle-right',
                    },
                    {
                        path: 'PartyBillPayment',
                        title: 'Party Bill Payment From',
                        icon: 'angle-right',
                    },
                    {
                        path: 'ReturnApprovalNote',
                        title: 'Return Approval Note',
                        icon: 'angle-right',
                    },

                    {
                        path: 'SalesReturnNote',
                        title: 'Sales Return Note',
                        icon: 'angle-right',
                    },
                    {
                        path: 'CreditNote',
                        title: 'Credit Note',
                        icon: 'angle-right',
                    },

                    {
                        path: 'PartyBillPaymentTo',
                        title: 'Party Bill Payment To',
                        icon: 'angle-right',
                    },

                    {
                        path: 'GatePass',
                        title: 'Gate Pass',
                        icon: 'angle-right',
                    },
                    
                ]
            },

            {
                path: 'invTrans/production',
              //  path: 'production',
                title: 'Production Module',
                children: [
                    {
                        path: 'process-master',
                        title: 'ProcessMaster',
                        icon: 'angle-right',
                    },
                     {
                         path: 'bom-master',
                         title: 'Bom Master',
                         icon: 'angle-right',
                     },
                     {
                         path: 'production-planning',
                         title: 'Production Planning',
                         icon: 'angle-right',
                     },
                    {
                        path: 'production-transaction',
                        title: 'Production Transaction(Reg)',
                        icon: 'angle-right',
                    },

                    {
                        path: 'production-transaction-special',
                        title: 'Production Transaction(Spc)',
                        icon: 'angle-right',
                    },
                     {
                         path: 'production-summary',
                         title: 'Production Summary',
                         icon: 'angle-right',
                     },
                    // {
                    //     path: 'ReturnApprovalNote',
                    //     title: 'Return Approval Note',
                    //     icon: 'angle-right',
                    // },

                    // {
                    //     path: 'SalesReturnNote',
                    //     title: 'Sales Return Note',
                    //     icon: 'angle-right',
                    // },
                    // {
                    //     path: 'CreditNote',
                    //     title: 'Credit Note',
                    //     icon: 'angle-right',
                    // },
                    // {
                    //     path: 'GatePass',
                    //     title: 'Gate Pass',
                    //     icon: 'angle-right',
                    // },
                    
                ]
            },

            {
                path: 'invTrans/stocktransfer',
             //  path: 'stocktransfer',
                title: 'Stock Transfer',
                children: [
                    {
                        path: 'indentorder',
                        title: 'StockTransfer Indent',
                        icon: 'angle-right',
                    },
                    {
                        path: 'StockTransfers',
                        title: 'Stock Transfer Order',
                        icon: 'angle-right',
                    },
                    {
                        path: 'StockTransferChallan',
                        title: 'Stock Transfer Challan',
                        icon: 'angle-right',
                    },
                    {
                        path: 'StockTransferGrnComponent',
                        title: 'Stock Transfer GRN',
                        icon: 'angle-right',
                    },
                    {
                        path: 'StockTransferPurchaseInvoiceComponent',
                        title: 'Stock Transfer Pur Inv',
                        icon: 'angle-right',
                    },
                    {
                        path: 'StockTransferSalesInvoiceComponent',
                        title: 'Stock Transfer Sales Inv',
                        icon: 'angle-right',
                    },

                   
                    // {
                    //     path: 'StockTransferInvoice',
                    //     title: 'Stock Transfer Invoice',
                    //     icon: 'angle-right',
                    // }
                ]
            },

            {
                path: 'invTrans/gatepass',
         
                title: 'Gate Pass',
                children: [
                    {
                        path: 'gatepass_checklist',
                        title: 'Gate Pass Check List',
                        icon: 'angle-right',
                    },
                    {
                        path: 'gatepass-gatin',
                        title: 'Gate In',
                        icon: 'angle-right',
                    },
                   
                    {
                        path: 'gatepass-gateout-a',
                        title: 'Gate Out Authorization',
                        icon: 'angle-right',
                    },
                    {
                        path: 'gatepass-geteout',
                        title: 'Gate Pass Get Out',
                        icon: 'angle-right',
                    },
                    {
                        path: 'visitor-master',
                        title: 'Visitor Master',
                        icon: 'angle-right',
                    }
                    
                ]
            }
            ,
            //starts here
            {
                path: 'invTrans/jobwork',
                title: 'JobWork',
                children: [
                    {
                        path: 'joborder',
                        title: 'Job Order',
                        icon: 'angle-right',
                    },
                    {
                        path: 'nongoodsservice',
                        title: 'Non Goods Service',
                        icon: 'angle-right',
                    },
                    {
                        path: 'nongoodssrn',
                        title: 'Service Received Note',
                        icon: 'angle-right',
                    },
                    {
                        path: 'nongoodsservicebill',
                        title: 'Non Goods Service Bill',
                        icon: 'angle-right',
                    },
                    {
                        path: 'nongoodssubtypemaster',
                        title: 'Non Goods SubType Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'nongoodstypemaster',
                        title: 'Non Goods Type Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'exitclausemaster',
                        title: 'Exit Clause Master',
                        icon: 'angle-right',
                    },
                    {
                        path: 'termasservice',
                        title: 'Term as Service',
                        icon: 'angle-right',
                    }
                    
                ]
            },
            {
                path: 'invTrans/transport',
                title: 'Transport Module',
                children: [
                    {
                        path: 'sales-transport',
                        title: 'Sales Transport',
                        icon: 'angle-right',
                    },
                    {
                        path: 'purchase-transport',
                        title: 'Purchase Transport',
                        icon: 'angle-right',
                    }
                    
                ]
            },
            {
                path: 'invTrans/storetransaction',
                title: 'Store Transaction',
                children: [
                    {
                        path: 'store-issue-note',
                        title: 'Store Issue Note',
                        icon: 'angle-right',
                    },
                    {
                        path: 'warehouse-to-warehouse-store-transfer',
                        title: 'Warehouse To Warehouse Store Transfer',
                        icon: 'angle-right',
                    }
                    
                ]
            }
  
        ]
    }
    
,
{
    path: 'taskManager',
    title: 'Task Manager',
    icon: 'sitemap',
    children: [
        
                {
                    path: 'task-allocation',
                    title: 'Task Allocation',
                    icon: 'angle-right',
                },
                {
                    path: 'taskprogress',
                    title: 'Task Progress',
                    icon: 'angle-right',
                },
                {
                    path: 'progress-report',
                    title: 'Progress Report',
                    icon: 'angle-right',
                }
    ]
}

,
    {
        path: 'stock-transaction',
        title: 'Store Transaction',
        icon: 'sitemap',
        children: [
            
                    {
                        path: 'storeflooraccess',
                        title: 'Store Floor Access',
                        icon: 'angle-right',
                    },

                    {
                        path: 'storedashboard',
                        title: 'Store Dashboard',
                        icon: 'angle-right',
                    },
                    {
                        path: 'requisition',
                        title: 'Requisition',
                        icon: 'angle-right',
                    },
                    {
                        path: 'issuestock',
                        title: 'Issue Stock',
                        icon: 'angle-right',
                    },
                    {
                        path: 'viewstore',
                        title: 'View Store',
                        icon: 'angle-right',
                    }
        ]
    }

    ,
    {
        path: 'report',
        title: 'Report',
        icon: 'angle-right',
        children: [
            {
                path: 'salesreport',
                title: 'Sales Report',
                children: [ 
                    
                    {
                        path: 'partyledger',
                        title: 'Party Ledger',
                        icon: 'angle-right',
                    },

                    {
                        path: 'controlaccount',
                        title: 'Control Account',
                        icon: 'angle-right',
                    },
                  
                    {
                        path: 'SalesReportDynamic',
                        title: 'Sales/Purchase-Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'Salesreportsorting',
                        title: 'Report-Sorting',
                        icon: 'angle-right',
                    },
                    {
                        path: 'SalesReportDynamicView',
                        title: 'View-Reports',
                        icon: 'angle-right',
                    }
                    ]
            },
            {  
                path: 'report/specialreports',
                title: 'Special Reports',
                children: [ 
                    {
                        path: 'salesspecial',
                        title: 'Sales Special',
                        children: [ 
                            
                                {
                                    path: 'salessummaryreports',
                                    title: 'Sales Summary Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'salesordermiscleaneousreport',
                                    title: 'Sales Order Miscellaneous Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'salesinvoicesummaryreport',
                                    title: 'Sales Invoice Summary Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'salesinvoice-miscellaneousreport',
                                    title: 'Sales Invoice Miscellaneous Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'purchaseordermiscleaneousreport',
                                    title: 'Purchase Order Miscellaneous Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'purchasebillmiscleaneousreport',
                                    title: 'Purchase Bill Miscellaneous Reports',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'productionreport',
                                    title: 'Production Report',
                                    icon: 'angle-right',
                                }
                                ,
                                {
                                    path: 'specialproductionreport',
                                    title: 'Special Production Report',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'solarpowergeneration',
                                    title: 'Solar Power Generation',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'inverterwisesolarpowergeneration',
                                    title: 'Inverterwise Solar Power Generation',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'solarpowergenerationwithpowercut',
                                    title: 'Solar Power Generation With PowerCut',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'solarpowergenerationwithpowercutreport',
                                    title: 'Solar Power Generation With PowerCut Report',
                                    icon: 'angle-right',
                                }
                        ]
                    }
                    
                    ]
            },
            {  
                path: 'report/miscellaneousreport',
                title: 'Miscellaneous Report',
                children: [ 
                    
                   

                    {
                        path: 'powercutreport',
                        title: 'Power Cut Report',
                        icon: 'angle-right',
                    }
                    ,
                    {
                        path: 'dailystockfinishgood',
                        title: 'Daily Stock Finished Goods',
                        icon: 'angle-right',
                    },
                    {
                        path: 'grnregister',
                        title: 'Grn Rgister',
                        icon: 'angle-right',
                    },
                    {
                        path: 'dailypowerreport',
                        title: 'Daily Power Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'dieselusedimportreport',
                        title: 'Diesel Used Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'dailygetwheatreport',
                        title: 'Daily Inward And Outward Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'wheatreceivingreport',
                        title: 'Wheat Receiving Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'wheatstackcardreport',
                        title: 'Wheat Stack Card Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'gateinandoutregister',
                        title: 'Gate In And Out Register',
                        icon: 'angle-right',
                    },
                    {
                        path: 'gatepassregister',
                        title: 'GatePass Register Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'dailyproductionreport',
                        title: 'Daily Production Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'misclabreportfg',
                        title: 'Misc Lab Finshed Goods Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'otherparameterreport',
                        title: 'Other Parameter Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'granulationreport',
                        title: 'Granulation Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'dailyitemwiseloadingreport',
                        title: 'Daily Itemwise Loading Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'wheatacceptancereport',
                        title: 'Wheat Acceptance Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'transcationreport',
                        title: 'Transactional Report',
                        icon: 'angle-right',
                    },
                    
                    {
                        path: 'stocktracking',
                        title: 'Stock Tracking Report',
                        icon: 'angle-right',
                    },
                    {
                        path: 'binreport',
                        title: 'Bin Report',
                        
                        children: [ 
                            
                                {
                                    path: 'binreports',
                                    title: 'Bin Repors',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'weigherredingsreport',
                                    title: 'Weigher Redings Report',
                                    icon: 'angle-right',
                                },
                                {
                                    path: 'millbreakdownreport',
                                    title: 'Mill Breakdown Report',
                                    icon: 'angle-right',
                                }
                            
                        ]},
                        
                        {  
                            path: 'report/anujsirrports',
                            title: 'Anuj Sir Reports',
                            children: [ 

                                    {
                                        path: 'pendingporeport',
                                        title: 'Pending Po Reports',
                                        icon: 'angle-right',
                                    },
                                    {
                                        path: 'salesorderreport',
                                        title: 'Pending So Report',
                                        icon: 'angle-right',
                                    },
                                    {
                                        path: 'wheatunloadingmasterreport',
                                        title: 'Wheat Unloading Reports',
                                        icon: 'angle-right',
                                    }
                                    ,
                                    {
                                        path: 'salesdispatchreport',
                                        title: 'Sales Dispatch Reports',
                                        icon: 'angle-right',
                                    },
                                    {
                                        path: 'dailyweigherreport',
                                        title: 'Daily Weigherreport Reports',
                                        icon: 'angle-right',
                                    }
                                
                                ]
                        },
                    
                    ]
            }
        ]
    },

    {
    path: 'profile',
    title: 'System Settings',
    icon: 'user',
    children: [
        {
            path: 'systemsettings',
            title: 'Administrator',
            children: [ 
                
                {
                    path: 'userprofile',
                    title: 'User Profile',
                    icon: 'angle-right',
                },
                {
                        path: 'NavbarSetting',
                        title: 'Role Creation',
                        icon: 'angle-right',
                },
                {
                        path: 'Settings',
                        title: 'Settings',
                        icon: 'angle-right',
                },
                {
                    path: 'User-Role-Access',
                    title: 'User Role Access',
                    icon: 'angle-right',
            }
        ]
        }]
    },
    {
        path: 'accounts',
        title: 'Accounts',
        icon: 'user',
        children: [
            {
                path: 'account',
                title: 'Accounts Url',
                icon: 'angle-right',
            },
            {
                path: 'accountledgerposting',
                title: 'Accounts View',
                icon: 'angle-right',
            }
        ]
   }
   ,
   {
        path: 'accountsmaster',
        title: 'Accounts Master',
        icon: 'user',
        children: 
        [
            {
                path: 'accountsmastertype',
                title: 'Type',
                icon: 'angle-right',
            },
            {
                path: 'accountsmastercategory',
                title: 'Category',
                icon: 'angle-right',
            },
            {
                path: 'accountsmastergroup',
                title: 'Group',
                icon: 'angle-right',
            },
            {
                path: 'accountsmasterledger',
                title: 'Ledger',
                icon: 'angle-right',
            }
            
        ]
    }
        
];
