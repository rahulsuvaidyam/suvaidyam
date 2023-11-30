// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
    refresh(frm) {
        // calling popup
        if (frm?.doc?.first_name !== undefined && frappe.session.user_fullname === 'Agent') {
            let d = new frappe.ui.Dialog({
                title: 'Make a call',
                fields: [
                    {
                        label: 'Full Name',
                        fieldname: 'full_name',
                        fieldtype: 'Data',
                        default: frm?.doc?.first_name + ' ' + frm?.doc?.last_name,
                        read_only: 1,
                    },
                    {
                        label: 'Campaign',
                        fieldname: 'campaign',
                        fieldtype: 'Link',
                        options: 'Campaign',
                        get_query: function () {
                            let filters = (frm?.doc?.campaign || []).map(item => item.campaign);
                            return { filters: [['name', 'in', filters]] };
                        }
                    },
                ],
                size: 'small',
                secondary_action_label: 'Cancel',
                primary_action_label: 'Call',
                primary_action(values) {
                    if (values?.campaign) {
                        d.hide();
                        frappe.show_alert({ message: "Calling to " + values.full_name, indicator: "green" });
                        // frappe.set_route('List', 'Campaign',{name:values?.campaign});
                    } else {
                        frappe.show_alert({ message: "Please select to campaign", indicator: "yellow" });
                    }
                },
                secondary_action() {
                    d.hide();
                }
            });

            frm.add_custom_button('+ Make a call', () => {
                d.show();
            })
        }
        // depended dropdown
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
    // match number to parent
    phone_number: function (frm) {
        if (frm.doc?.phone_number.length >= 12) {
            frappe.call({
                method: 'frappe.client.get_list',
                args: {
                    doctype: 'Beneficiary',
                    filters: { 'phone_number': frm?.doc.phone_number, 'branching': 'Parent' },
                    fields: ['name']
                },
                callback: function (response) {
                    const matchedBeneficiary = response.message[0];
                    if (matchedBeneficiary) {
                        frm.set_value('branching', 'Child')
                        frm.set_value('parent1', matchedBeneficiary.name); 
                    } else {
                        frm.set_value('branching', 'Parent')
                        frm.set_value('parent1', '') 
                    }
                    setTimeout(function() {
                        frm.set_df_property('parent1', 'read_only', matchedBeneficiary ? 1 : 0);
                        frm.set_df_property('branching', 'read_only', matchedBeneficiary ? 1 : 0);
                    }, 100);
                }
            });
        }

    },
});
