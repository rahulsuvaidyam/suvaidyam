// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
   async refresh(frm) {
       await call_popup(frm,'#customPopup')
        $('#closePopup , #callend').off('click').on('click', function () {
            $('#customPopup').hide();
            frm.refresh();
        });
        // calling popup
        // if (frm?.doc?.first_name !== undefined && frappe.session.user_fullname === 'Agent') {
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
                    only_select:1,
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
                    // frappe.show_alert({ message: "Calling to " + values.full_name, indicator: "green" });
                    $('#customPopup').show();
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
        // }

        // depended dropdown
        depended_dropdown(frm,frm.doc.state,'centre','state')
        depended_dropdown(frm,frm.doc.state,'district','state')
        depended_dropdown(frm,frm.doc.district,'block','district')
        depended_dropdown(frm,frm.doc.block,'village','block')
        depended_dropdown(frm,frm.doc.centre,'campaign','centre')
         
        // Custom Html Block
        main_conatiner('beneficiary_details',frm)
      
    },
    state: function (frm) {
        depended_dropdown(frm,frm.doc.state,'centre','state')
        depended_dropdown(frm,frm.doc.state,'district','state')
        frm.set_value('centre', '')
        frm.set_value('district', '')
        frm.set_value('block', '')
        frm.set_value('village', '')
        frm.set_value('campaign', '')
    },
    centre: function (frm) {
        depended_dropdown(frm,frm.doc.centre,'campaign','centre')
        frm.set_value('campaign', '')
    },
    district: function (frm) {
        depended_dropdown(frm,frm.doc.district,'block','district')
        frm.set_value('block', '')
        frm.set_value('village', '')
    },
    block: function (frm) {
        depended_dropdown(frm,frm.doc.block,'village','block')
        frm.set_value('village', '')
    },
    // match number to parent
    phone_number: function (frm) {
        if (frm.doc?.phone_number.length >= 10) {
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
                    setTimeout(function () {
                        frm.set_df_property('parent1', 'read_only', matchedBeneficiary ? 1 : 0);
                        frm.set_df_property('branching', 'read_only', matchedBeneficiary ? 1 : 0);
                    }, 100);
                }
            });
        }

    },
 
});
