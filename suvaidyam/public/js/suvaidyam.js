
frappe.router.on('change', async () => {
    let cur_router = await frappe.get_route()

    if (cur_router[0] != 'Workspaces') {
        $('.sidebar-toggle-btn').hide()
        $('.layout-side-section').hide();
        $('.custom-actions').hide()
        $('.standard-actions').show();
        if (!frappe.user_roles.includes('Administrator')) {
            $('.search-bar').hide()
        }
        
    } else {
        $('.sidebar-toggle-btn').show()
        $('.layout-side-section').show();
        // search bar and create workspace
        if (!frappe.user_roles.includes('Administrator')) {
            $('.standard-actions').hide();
            $('.custom-actions').hide();
            $('.search-bar').hide()
        }
        
    }
});