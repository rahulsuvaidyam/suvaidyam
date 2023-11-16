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
            frm.fields_dict["agent"].get_query = function (doc) {
                return { filters: { 'centre': 'Please select centre' } };
            },
            frm.fields_dict["team"].get_query = function (doc) {
                return { filters: { 'centre': 'Please select centre' } };
            },
            frm.fields_dict["beneficiaries"].get_query = function (doc) {
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
        },
            frm.set_value('centre', '')
        frm.fields_dict["campaign"].get_query = function (doc) {
            if (doc.centre) {
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            } else {
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
            frm.set_value('campaign', '')
        frm.fields_dict["agent"].get_query = function (doc) {
            if (doc.centre) {
                return {
                    filters: { 'centre': doc.centre, 'role_profile_name': 'Agent' },
                    page_length: 1000
                };
            } else {
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
            frm.set_value('agent', '')
        frm.fields_dict["team"].get_query = function (doc) {
            if (doc.centre) {
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            } else {
                return { filters: { 'centre': 'Please select centre' } };
            }
        },
            frm.set_value('team', '')
        frm.fields_dict["beneficiaries"].get_query = function (doc) {
            if (doc.centre) {
                return {
                    filters: { 'centre': doc.centre },
                    page_length: 1000
                };
            } else {
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
    allocated_to: function (frm) {
        if (frm.doc.allocated_to === 'Agent') {
            frm.set_value('team', '')
        }else{
            frm.set_value('agent', '')
            frm.set_value('beneficiaries', '')
        }
    },
});
