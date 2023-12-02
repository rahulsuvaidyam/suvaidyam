// Copyright (c) 2023, rahul and contributors
// For license information, please see license.txt

frappe.ui.form.on("Campaign Form", {
	refresh(frm) {
		frm.add_custom_button('View Form Data ',()=>{
			frappe.set_route('List', 'Campaign Form Data',{form:frm?.doc?.name});
		 })
	},
});
