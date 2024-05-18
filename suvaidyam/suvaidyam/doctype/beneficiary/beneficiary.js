// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Beneficiary", {
    refresh(frm) {
        if (!$('#customPopup').length) {
            $('body').append(`
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            <div id="customPopup" class="custom-popup card">
            <button type="button" class="close" id="closePopup" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
            </button>
            <div class="custom-popup-body d-flex flex-column align-items-center pt-1">
                    <div class="bg-success rounded-circle d-flex align-items-center justify-content-center mb-1" style="width: 40px; height: 40px;">
                        <span class="text-white display-5">${frm?.doc?.first_name?.split('')[0]}</span>
                    </div>
                    <p class="mb-0 font-weight-bold">${frm?.doc?.first_name +' '+frm?.doc?.last_name}</p>
                    <p class="text-muted">Mobile ${frm?.doc?.phone_number}</p>
               
                <div class="d-flex justify-content-around mt-1" role="group">
                    <button type="button" class="btn btn-light rounded-circle mx-2"><i class="fa fa-microphone"></i></button>
                    <button type="button" class="btn btn-light rounded-circle mx-2"><i class="fa fa-volume-up"></i></button>
                </div>
                <div class="pt-3">
                    <div id="callend" class="bg-danger btn rounded-circle d-flex align-items-center justify-content-center" style="width: 35px; height: 35px;">
                        <i class="fa fa-phone text-white display-4"></i>
                    </div>
                </div>
            </div>
        </div>
        
                <style>
                    #closePopup{
                        position: absolute;
                    }
                    .custom-popup {
                        width:260px;
                        height:210px;
                        position: fixed;
                        bottom: 8px;
                        right: 8px;
                        margin: 0;
                        padding: 10px;
                        background: white;
                        border: 1px solid #ccc;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                        z-index: 1050; 
                        display: none;
                    }
                    .custom-popup-header {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        border-bottom: 1px solid #eee;
                        // padding-bottom: 10px;
                        margin-bottom: 10px;
                    }
                    .custom-popup-footer {
                        display: flex;
                        justify-content: flex-end;
                        border-top: 1px solid #eee;
                        padding-top: 10px;
                        margin-top: 10px;
                    }
                </style>
            `);
        }

        // Add a custom button to the form
        frm.add_custom_button('Make Call', () => {
            $('#customPopup').show(); 
        });
        $('#closePopup , #callend').off('click').on('click', function() {
            $('#customPopup').hide();
            frm.refresh();
        }); 
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
            },
            // campaign
            frm.fields_dict["campaign"].get_query = function (doc) {
                return { filters: { 'centre': 'Please select centre' } };
            },
            // form
            frm.fields_dict["campaign_name"].get_query = function (doc) {
                let filters = (doc?.campaign || []).map(item => item.campaign);
                return { filters: [['name', 'in', filters]] };
            },
            frm.fields_dict["form"].get_query = function (doc) {
                return { filters: { 'campaign': 'Please select campaign name' } };
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
                    setTimeout(function () {
                        frm.set_df_property('parent1', 'read_only', matchedBeneficiary ? 1 : 0);
                        frm.set_df_property('branching', 'read_only', matchedBeneficiary ? 1 : 0);
                    }, 100);
                }
            });
        }

    },
    // form 
    campaign_name: function (frm) {
        frm.fields_dict["form"].get_query = function (doc) {
            if (doc.campaign_name) {
                return {
                    filters: { 'campaign': doc.campaign_name },
                    page_length: 1000
                };
            } else {
                return { filters: { 'campaign': 'Please select campaign name' } };
            }
        },
            frm.set_value('form', '')
    },
    // form builder
    form: function (frm) {
        if (frm.doc.form) {
            frappe.call({
                method: 'frappe.desk.form.load.getdoc',
                args: {
                    doctype: 'Campaign Form',
                    name: frm.doc.form, // Assuming frm.doc.form is the text you want to search
                    fields: ['*'],
                    page_length: 1,
                    order_by: 'modified desc' // Change to 'creation' for creation time
                },
                callback: function (response) {
                    let nextForm = [{
                        "fieldname": "next_follow_up",
                        "fieldtype": "Date",
                        "in_list_view": 1,
                        "label": "Next Follow Up",
                    },
                    {
                        label: 'IR',
                        fieldname: 'ir',
                        fieldtype: 'Link',
                        options: 'IR',
                        reqd: 1

                    },
                    {
                        label: 'DR',
                        fieldname: 'dr',
                        fieldtype: 'Link',
                        options: 'DR',
                        reqd: 1

                    },
                    {
                        label: 'Sub DR',
                        fieldname: 'ds',
                        fieldtype: 'Link',
                        options: 'DS',
                        reqd: 1,
                        get_query: function () {
                            return { filters: { dr: frm?.doc?.dr } };
                        }

                    },]
                    let Data = {}
                    let next = new frappe.ui.Dialog({
                        title: response?.docs?.[0]?.title,
                        fields: nextForm,
                        size: 'small',
                        primary_action_label: 'Save',
                        primary_action(values) {
                            Data = {
                                ...Data,
                                campaign:frm.doc.campaign_name,
                                form:frm.doc?.form,
                                doctype:'Campaign Form Data',
                                state:frm.doc?.state,
                                centre:frm.doc?.centre,
                                beneficiary:frm.doc?.name,
                                next_follow_up:values?.next_follow_up,
                                ir: values?.ir,
                                disposition: values?.dr,
                                disposition_subset: values?.ds
                            }
                            console.log(Data)
                            frappe.call({
                                method: 'frappe.desk.form.save.savedocs',
                                args: { 
                                    doc: Data,
                                    action:'Save'
                                },
                            })
                            next.hide()
                        },

                    });
                    let form = new frappe.ui.Dialog({
                        title: response?.docs?.[0]?.title,
                        fields: response?.docs?.[0]?.fields,
                        size: 'small',
                        primary_action_label: 'Next',
                        primary_action(values) {
                            Data = { data: values }
                            form.hide()
                            next.show()
                        },

                    });

                    if (response?.docs?.[0]?.fields.length >= 2) {
                        form.show()
                    } else {
                        frappe.show_alert({ message: response?.docs?.[0]?.title + " " + "fields not found!", indicator: "yellow" });
                    }
                }
            });


        }

    }
});
