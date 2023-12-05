// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("State", {
	refresh(frm) {
        let d = new frappe.ui.Dialog({
            title: 'Make a call',
            fields: [
                {
                    label: 'Language',
                    fieldname: 'full_name',
                    fieldtype: 'Link',
                    options:'Language'
                },
               
            ],
            size: 'small',
            primary_action_label: 'Call',
            primary_action(values) {
                d.hide();
            },
          
        });

        frm.add_custom_button('Language', () => {
            d.show();
        })
	},
});
