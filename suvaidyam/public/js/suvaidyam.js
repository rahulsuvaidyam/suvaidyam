/**
* Add Language menu Item
*/
const languageDropdown = (parentNode, filters = null) => {
    // selected
    frappe.call({
        method: 'frappe.desk.form.load.getdoc',
        args: {
            doctype: 'User',
            name: frappe.session.user,
        },
        callback: function (response) {
           let defaultValue = response?.docs?.[0]?.language;
        //    dropown
           frappe.call({
            method: 'frappe.desk.search.search_link',
            args: {
                doctype: 'Language',
                txt: '',
                filters: [  ['name', 'IN', filters ? filters : ['en', 'hi']], ],
                page_length: 100,  
            },
            freeze: true,
            freeze_message: __("Calling"),
            callback: async function (response) {
                let options = response.results;
                const selectElement = document.createElement('select');
                for (var i = 0; i < options.length; i++) {
                    let option = document.createElement('option');
                    option.value = options[i].value; // Set the value attribute
                    option.text = options[i].label; // Set the text content
                    selectElement.appendChild(option);
    
                    if (options[i].value === defaultValue) { 
                        option.selected = true;
                    }
                }
                selectElement.addEventListener('change', function (event) {
                    var selectedValue = event.target.value;
                  
                    // update language
                    frappe.call({
                        method: 'frappe.clint.set_value',
                        args: {
                            name: frappe.session.user_email,
                            doctype:'User',
                            fieldname:{language: selectedValue}
                        },
                        callback:async(res)=>{
                            console.log(res)
                        }
                    })
                    // let date = frappe.datetime.get_datetime_as_string();
                        // args: {
                        //     doc: {
                        //         name: frappe.session.user_email,
                        //         doctype: 'User',
                        //         language: event.target.value,
                        //         modified: date
                        //     },
                        //     action:'Save'
 
                    // window.location.reload()
                });
                parentNode.appendChild(selectElement)
            }
        });
        }
    });
 
}
document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        let parentEl = document.querySelector('.form-inline');
        languageDropdown(parentEl);
    }, 500);
})
