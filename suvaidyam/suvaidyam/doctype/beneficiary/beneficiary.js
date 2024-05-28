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
                    <p class="mb-0 font-weight-bold">${frm?.doc?.first_name + ' ' + frm?.doc?.last_name}</p>
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


        document.getElementById('beneficiary_details').innerHTML = `
        <style>
        * {
            margin: 0%;
            padding: 0%;
            box-sizing: border-box;
        }

        #container {
            background-color: #f4f4f4;
            display: flex;
            width: 100%;
            height: 100vh;
            gap: 10px
        }

        #card_1 {
            width: 250px;
            height: 100%
        }

        #card_2 {
            width: 60%;
            border: 2px solid f4f4f4;
            height: 100%
        }

        #card_3 {
            width: 20%;
            border: 2px solid f4f4f4;
            height: 100%
        }

        #child_card1 {
            border: 2px solid f4f4f4;
            /* height: 30%; */
            padding: 13px;
        }

        #child_card2 {
            border: 2px solid f4f4f4;
            height: 50%
        }

        #avtar_child {
            width: 30px;
            height: 30px;
            background-color: #f4f4f4;
            border-radius: 100%;
            display:flex;
            justify-content: center;
            align-items: center;        
        }

        #avtar_head {
            margin-left: 10px;
        }

        #child_card2_inner {
            display: flex;
            flex-direction: column;
        }

        #Inbounds,
        #Outbound,
        #Campgain {
            cursor: pointer;
            padding: 5px;
            margin: 5px 0;
        }

        .dropdown {
            min-width: 160px;
            max-height: 150px;
            padding: 0px 16px;
            overflow-y: auto
        }

        .dropdown a {
            color: black;
            padding: 4px 12px;
            text-decoration: none;
            display: block;
        }

        .dropdown a:hover {
            background-color: #f1f1f1;
        }

        #in_bounds {
            background-color: #f4f4f4;
            border-radius: 40px;
            padding: 4px 8px;
            font-size: 13px;
        }
        #span_p{
            margin-top:-2px;
            margin-left:3px
        }
        #gap_avtar{
            display: flex;
            gap:10px;
        }
        #rt_contant{
            display: flex;
            gap:5px;
            padding: 10px
        }
    </style>

<body>
    <div class="p-3" id="container">
        <div id="card_1">
            <div id="child_card1" class="card ">
                <div id="avtar_main" class="d-flex justify-content-between">
                    <div id="gap_avtar">
                        <p id="avtar_child">A</p>
                        <div>
                            <p>Abhishek Kumar</p>
                            <p>M || <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path
                                        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg> <span  style="color: blue;">8989920776</span></p>
                            <div class="d-flex" id="location"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <div id="span_p">Panjab,Moga,Panjab</div></div>
                        </div>
                    </div>

                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                            class="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path
                                d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                        </svg>
                    </div>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <p id="in_bounds">Inbounds : 0</p>
                    <p id="in_bounds">Outbounds : 0</p>
                </div>
            </div>
            <div id="child_card2" class="card mt-2 ">
                <div id="child_card2_inner">
                    <p id="Inbounds">Inbounds</p>
                    <p id="Outbound">Outbound</p>
                    <p id="Campgain">Campgain</p>
                    <div id="dropdown" class="dropdown">
                        <a id="d">Option 1</a>
                        <a id="d">Option 2</a>
                        <a>Option 3</a>
                        <a>Option 4</a>
                        <a>Option 5</a>
                        <a>Option 6</a>
                        <a>Option 7</a>
                        <a>Option 8</a>
                        <a>Option 9</a>
                        <a>Option 10</a>
                    </div>
                </div>
            </div>
        </div>
        <div id="card_2" class="card p-3">No Data avilable</div>
        <div id="card_3" class="card">
            <div id="rt_contant">
                <svg style="margin-top: 5;" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                    <path
                        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
                <p class="">History</p>
            </div>
            <div id="dropdown" class="dropdown">
                <a id="d">Option 1</a>
                <a id="d">Option 2</a>
                <a>Option 3</a>
                <a>Option 4</a>
                <a>Option 5</a>
                <a>Option 6</a>
                <a>Option 7</a>
                <a>Option 8</a>
                <a>Option 9</a>
                <a>Option 10</a>
            </div>
        </div>

    </div>
    </body>
    `
        const paragraphs = document.querySelectorAll("#Inbounds,#Outbound, #d");
        const sidePage = document.getElementById("card_2")
        const contentMap = {
            "Inbounds": "This is the content for Inbounds.",
            "Outbound": "This is the content for Outbound.",
            // "Campgain": "",
            "d": "Option1.",

        };

        paragraphs.forEach(paragraph => {
            paragraph.addEventListener("click", function () {
                paragraphs.forEach(p => {
                    p.style.backgroundColor = "";
                    p.style.borderLeft = '';
                    p.style.color = '';
                });
                this.style.backgroundColor = "#f4f4f4";
                this.style.borderLeft = '5px solid blue';
                sidePage.innerHTML = contentMap[this.id];
            });
        });
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
                                campaign: frm.doc.campaign_name,
                                form: frm.doc?.form,
                                doctype: 'Campaign Form Data',
                                state: frm.doc?.state,
                                centre: frm.doc?.centre,
                                beneficiary: frm.doc?.name,
                                next_follow_up: values?.next_follow_up,
                                ir: values?.ir,
                                disposition: values?.dr,
                                disposition_subset: values?.ds
                            }
                            console.log(Data)
                            frappe.call({
                                method: 'frappe.desk.form.save.savedocs',
                                args: {
                                    doc: Data,
                                    action: 'Save'
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
