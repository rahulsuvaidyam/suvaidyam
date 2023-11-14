// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
    refresh(frm) {
        if(frm?.doc?.first_name !== undefined){
        let d = new frappe.ui.Dialog({
            title: 'Make a call',
            fields: [
                {
                    label: 'Full Name',
                    fieldname: 'full_name',
                    fieldtype: 'Data',
                    default:frm?.doc?.first_name +' '+frm?.doc?.last_name,
                    read_only: 1,
                },
                {
                    label: 'Campaign',
                    fieldname: 'campaign',
                    fieldtype: 'Autocomplete',
                    options:frm?.doc?.campaign?.map((e)=>{
                        return{
                            label:e?.campaign,
                            value:e?.name
                        }
                    })
                },
            ],
            size: 'small',  
            secondary_action_label: 'Cancel',
            primary_action_label: 'Call',
            primary_action(values) {
                if(values?.campaign){
                    d.hide();
                    frappe.show_alert({ message:"Calling to " +values.full_name, indicator: "green"});
                    // frappe.set_route('List', 'Campaign',{name:values?.campaign});
                }else{
                    frappe.show_alert({ message:"Please select to campaign", indicator: "yellow"});
                }
            },
            secondary_action(){
                d.hide();
            }
        });
        
        frm.add_custom_button('+ Make a call', ()=>{
             d.show();
        })
    }
        frm.fields_dict["centre"].get_query = function (doc) {
            return { filters: { 'state': 'Please select state' } };
        },
            // district
            frm.fields_dict["district"].get_query = function (doc) {
                return { filters: { 'state': 'Please select state' } };
            },
            // block
            frm.fields_dict["block"].get_query = function (doc) {
                return { filters: { 'district': 'Please select district' } };
            },
            // village
            frm.fields_dict["village"].get_query = function (doc) {
                return { filters: { 'block': 'Please select block' } };
            }
        // campaign
        frm.fields_dict["campaign"].get_query = function (doc) {
            return { filters: { 'centre': 'Please select centre' } };
        }
    },
    state: function (frm) {
        frm.fields_dict["centre"].get_query = function (doc) {
            if (doc.state) {
                return {
                    filters: { 'state': doc.state },
                    page_length: 1000
                };
            } else {
                return { filters: { 'state': 'Please select state' } };
            }
        }
        frm.set_value('centre', '')
        frm.fields_dict["district"].get_query = function (doc) {
            if (doc.state) {
                return {
                    filters: { 'state': doc.state },
                    page_length: 1000
                };
            } else {
                return { filters: { 'state': 'Please select state' } };
            }
        },
            frm.set_value('district', '')
        frm.fields_dict["block"].get_query = function (doc) {
            if (doc.district) {
                return {
                    filters: { 'district': doc.district },
                    page_length: 1000
                };
            } else {
                return { filters: { 'district': 'Please select district' } };
            }
        },
        frm.set_value('block', '')
            frm.fields_dict["village"].get_query = function (doc) {
                if (doc.block) {
                    return {
                        filters: { 'block': doc.block },
                        page_length: 1000
                    };
                } else {
                    return { filters: { 'block': 'Please select block' } };
                }
            },
            frm.set_value('village', '')
            frm.fields_dict["campaign"].get_query = function (doc) {
                if (doc.centre) {
                    return {
                        filters: { 'centre': doc.centre },
                        page_length: 1000
                    };
                } else {
                    return { filters: { 'centre': 'Please select centre' } };
                }
            }
            frm.set_value('campaign', '')
    },
    centre: function (frm) {
        frm.set_value('campaign', '')
    },
    district: function (frm) {
        frm.set_value('block', '')
        frm.set_value('village', '')
    },
    block: function (frm) {
        frm.set_value('village', '')
    },
});
