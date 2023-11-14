// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Team", {
    refresh(frm) {
        frm.fields_dict["centre"].get_query = function (doc) {
            return { filters: { 'state': 'Please select state' } };
        },
        frm.fields_dict["agent"].get_query = function (doc) {
            return { filters: { 'centre': 'Please select centre' } };
        }
        frm.fields_dict["team_lead"].get_query = function (doc) {
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
        frm.fields_dict["agent"].get_query = function (doc) {
            if(doc.centre){
                console.log(doc)
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
        frm.set_value('agent', '')
        frm.fields_dict["team_lead"].get_query = function (doc) {
            if(doc.centre){
                console.log(doc)
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        }
        frm.set_value('team_lead', '')
    },
    centre:function(frm){
        frm.set_value('agent', '')
        frm.set_value('team_lead', '')
    }
});


