// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Task", {
    refresh(frm) {
        frm.fields_dict["centre"].get_query = function (doc) {
            return { filters: { 'state': 'Please select state' } };
        },
        frm.fields_dict["campaign"].get_query = function (doc) {
            return { filters: { 'centre': 'Please select centre' } };
        },
        frm.fields_dict["allocated_to"].get_query = function (doc) {
            return { filters: { 'centre': 'Please select centre' } };
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
        frm.fields_dict["campaign"].get_query = function (doc) {
            if(doc.centre){
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
        frm.set_value('campaign', '')
        frm.fields_dict["allocated_to"].get_query = function (doc) {
            if(doc.centre){
                return {
                    filters: { 'centre': doc.centre,'name':['!=','agent@brms.com'] },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
        frm.set_value('allocated_to', '')
        frm.fields_dict["beneficiaries"].get_query = function (doc) {
            if(doc.centre){
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            }else{
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
        frm.set_value('beneficiaries', '')
       
    },
    centre: function (frm) {
        frm.set_value('campaign', '')
        frm.set_value('allocated_to', '')
        frm.set_value('beneficiaries', '')
    },
});
