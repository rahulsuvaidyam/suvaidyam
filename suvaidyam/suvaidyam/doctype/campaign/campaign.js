// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Campaign", {
    refresh(frm) {

        frm.add_custom_button('Form',()=>{
           frappe.set_route('List', 'Campaign Form',{name:frm?.doc?.name});
        })
        // depended dropdown
        frm.fields_dict["centre"].get_query = function (doc) {
            return { filters: { 'state': 'Please select state' } };
        },
        frm.fields_dict["beneficiaries"].get_query = function (doc) {
            return { filters: { 'centre': 'Please select centre' } };
        }
    },
    state: function (frm) {
        frm.fields_dict["centre"].get_query = function (doc) {
            if(doc.state){
                return {
                    filters: { 'state': doc.state },
                    page_length: 1000
                };
            }else{
                return { filters: { 'state': 'Please select state' } };
            }
        },
        frm.set_value('centre', '')
        frm.fields_dict["beneficiaries"].get_query = function (doc) {
            if(doc.centre){
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        }
        frm.set_value('beneficiaries', '')
    },
    centre: function (frm) {
        frm.set_value('beneficiaries', '')
    },
});
