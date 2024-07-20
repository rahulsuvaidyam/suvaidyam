function main_conatiner(id,frm) {
    document.getElementById(id).innerHTML = `
    <style>
        * { margin: 0%; padding: 0%; box-sizing: border-box; }
        #container { background-color: #f4f4f4; display: flex; width: 100%; height: 100vh;  gap: 10px}
        #card_1 { width: 250px;  height: 100% }
        #card_2 {  width: 60%;  border: 2px solid f4f4f4; height: 100% }
        #card_3 { width: 20%; border: 2px solid f4f4f4; height: 100% }
        #child_card1 { border: 2px solid f4f4f4;  padding: 13px; }
        #child_card2 {
            border: 2px solid f4f4f4;
            height: 50%
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
            border-left:5px solid transparent;
        }
        .dropdown {
            min-width: 160px;
            max-height: 150px;
            padding: 0px 16px;
            overflow-y: auto;
        }
        .dropdown a {
            color: black;
            padding: 4px 12px;
            text-decoration: none;
            display: block;
            border-left:5px solid transparent;
        }
        .dropdown a:hover {
            background-color: #f1f1f1;
        }
        #in_bounds {
            width: 90px;
            height:23px;
            background-color: #f4f4f4;
            border-radius: 40px;
            font-size: 13px;
            text-align:center;
            padding:1.5px
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
        .his_dropdown{
            min-width: 160px;
            max-height: 150px;
            padding: 0px 16px;
            overflow-y: auto
        }
        .his_dropdown a {
            color: black;
            padding: 4px 12px;
            text-decoration: none;
            display: block;
        }
        .inbound-full-height{
            height: 100%;
        }
    </style>
    <body>
        <div class="p-3" id="container">
            <div id="card_1">
            ${left_side(frm)}
            </div>
            <div id="card_2" class="card p-3">No Data avilable</div>
            ${right_side()}

        </div>
    </body>
    `
    const sidePage = document.getElementById("card_2")

    const contentMap = {
        "Inbounds": inbound(),
        "Outbound": outbound(),
    };
    function deselectParagraphs() {
        const paragraphs = document.querySelectorAll("#Inbounds, #Outbound");
        paragraphs.forEach(p => {
            p.style.backgroundColor = "";
            p.style.borderLeft = '';
            p.style.color = '';
        });
        sidePage.innerHTML = "";
    }
    frm?.doc?.campaign.length > 0 && frm?.doc?.campaign.forEach(camp => {
        let paragraph = document.querySelector(`#${camp.campaign}`);
        paragraph.addEventListener("click", function () {
            deselectParagraphs()
            frm?.doc?.campaign.forEach((campaign) => {
                if (campaign.campaign !== camp.campaign) {
                    let paragraph = document.querySelector(`#${campaign.campaign}`);
                    paragraph.style.backgroundColor = "";
                    paragraph.style.borderLeft = '5px solid transparent';
                }
            })
            this.style.backgroundColor = "#f4f4f4";
            this.style.borderLeft = '5px solid blue';
            fetchData(camp.campaign,sidePage);
        });
    });
    // ====== #Inbounds, #Outbound ===
    const paragraphs = document.querySelectorAll("#Inbounds, #Outbound");

    paragraphs.forEach(paragraph => {
        paragraph.addEventListener("click", function (event) {
            event.stopPropagation();
            deselectParagraphs();
            frm?.doc?.campaign.length > 0 && frm?.doc?.campaign.forEach(camp => {
                let paragraph = document.querySelector(`#${camp.campaign}`);
                paragraph.style.backgroundColor = "";
                paragraph.style.borderLeft = '5px solid transparent';
            });
            this.style.backgroundColor = "#f4f4f4";
            this.style.borderLeft = '5px solid blue';
            sidePage.innerHTML = contentMap[this.id];
        });
    });
}
// 
function left_side(frm) {
    return ` <div id="child_card1" class="card ">
                <div id="avtar_main" class="d-flex justify-content-between">
                    <div id="gap_avtar"> 
                        <div>
                            <p>${frm?.doc?.first_name + ' ' + frm?.doc?.last_name}</p>
                            <p>${frm?.doc?.gender?.split('')[0]} || <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-telephone" viewBox="0 0 16 16">
                                    <path
                                        d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                                </svg> <span  style="color: blue;">${frm?.doc?.phone_number}</span></p>
                            <div class="d-flex" id="location"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-geo-alt" viewBox="0 0 16 16">
                                    <path
                                        d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A32 32 0 0 1 8 14.58a32 32 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10" />
                                    <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4m0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                                </svg>
                                <div id="span_p">${frm?.doc?.address_1}</div></div>
                        </div>
                    </div>

                   
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <p id="in_bounds">Inbound : 0</p>
                    <p id="in_bounds">Outbound : 0</p>
                </div>
            </div>
            <div id="child_card2" class="card mt-2 ">
                <div id="child_card2_inner">
                    <p id="Inbounds">Inbound</p>
                    <p id="Outbound">Outbound</p>
                    <p id="Campgain">Campgain</p>
                    <div id="dropdown" class="dropdown">
                     ${frm?.doc?.campaign.map(e => `<a id=${e.campaign}>${e.campaign}</a>`).join('\n')}
                    </div>
                </div>
            </div>`
}
function right_side() {
    return`<div id="card_3" class="card">
            <div id="rt_contant">
                <svg style="margin-top: 5;" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z" />
                    <path
                        d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                </svg>
                <p class="">History</p>
            </div>
            <div id="dropdown" class="his_dropdown">
                <a>Option 1</a>
                <a>Option 2</a>
                <a>Option 3</a>
                <a>Option 4</a>
                <a>Option 5</a>
                <a>Option 6</a>
                <a>Option 7</a>
                <a>Option 8</a>
                <a>Option 9</a>
                <a>Option 10</a>    
            </div>
        </div>`
}
// 
async function fetchData(campaignId,sidePage) {
    try {
        const response = await new Promise((resolve, reject) => {
            frappe.call({
                method: 'frappe.desk.reportview.get',
                args: {
                    doctype: 'Campaign Form',
                    fields: ['name', 'title'],
                    filters: [["Campaign Form", "campaign", "=", campaignId]],
                    page_length: 'all',
                    order_by: 'modified desc',
                },
                callback: function (response) {
                    if (response && response.message && response.message.values) {
                        resolve(response.message.values);
                        // console.log(response, "response")
                    } else {
                        reject("No data found");
                    }
                }
            });
        });

       let datas = response;
       
        let values = response.map(item => item[1]);
       
        if (sidePage) {
            let paragraphs = values.map((value, index) =>
                `<p class="horizontal-paragraph" data-index="${index}">
                    <span class="bold">${value}</span></p>`).join('');
            sidePage.innerHTML = `
                <style>
                    .horizontal-container {
                        white-space: nowrap; 
                        font-size: 0;
                    }
                    .horizontal-paragraph {
                        display: inline-block; 
                        margin-right: 20px;
                        vertical-align: top; 
                        font-size: 14px; 
                        line-height: 1.5;
                        cursor: pointer; /* Add cursor pointer to indicate clickable */
                    }
                     
                    .horizontal-paragraph:not(:last-child) {
                        margin-right: 30px;
                    }
                    .horizontal-paragraph p {
                        margin: 0; 
                        color: #333;
                    }
                    .data-inputs {
                        margin-top: 10px;
                    }
                    .data-inputs input {
                        display: block;
                        margin-bottom: 5px;
                    }
                    .clicked-data {
                        margin-top: 10px;
                        font-weight: bold;
                    }
                     .horizontal-paragraph.active {
                            font-weight: bold; 
                            border-bottom: 1.5px solid black;
                        }
                    .horizontal-paragraph:not(.active) {
                    color: #888; /* Gray color for inactive paragraphs */
                    }

                </style>
                <div class="horizontal-container">${paragraphs}</div>
                <div id="form-container"></div>`;

            const horizontalParagraphs = sidePage.querySelectorAll('.horizontal-paragraph');
            horizontalParagraphs.forEach((paragraph, index) => {
                paragraph.addEventListener('click', () => {
                    horizontalParagraphs.forEach((p) => {
                        p.classList.remove('active');
                    });
                    paragraph.classList.add('active');
                    
                    cam_from_builder(datas,index,'#form-container')
                });
            });
        }

    } catch (error) {
        console.error(error);
    }
}

function cam_from_builder(datas,index,form_con) {
      let tab_id;
    
    frappe.call({
        method: 'frappe.desk.form.load.getdoc',
        args: {
            doctype: 'Campaign Form',
            fields: ['fields'],
            name: datas[index][0],
            order_by: 'modified desc',
        },
        callback: function (response) {
            tab_id = response.docs[0].fields;

            let sidePage = document.querySelector(form_con);
            if (sidePage) {
                let formContent = tab_id.map(item => {
                    switch (item.fieldtype) {
                        case 'Data':
                            return `
                                <div class="form-group">
                                    <label for="${item.label}">${item.label}</label>
                                    <input type="text" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
                                </div>
                            `;
                        case "Select":
                            // Assuming item.options is a comma-separated string of options
                            let options = item.options.split('\n').map(option => `<option value="${option}">${option}</option>`).join('');
                            return `
                                <div class="form-group">
                                    <label for="${item.label}">${item.label}</label>
                                    <select id="${item.fieldname}" name="${item.fieldname}" class="form-control">
                                        ${options}
                                    </select>
                                </div>
                                `;
                        case 'Date':
                            return `
                                <div class="form-group">
                                    <label for="${item.label}">${item.label}</label>
                                    <input type="date" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
                                </div>
                                `;
                        default:
                            return `
                                <div class="form-group">
                                    <label for="${item.label}">${item.label}</label>
                                    <input type="text" id="${item.fieldname}" name="${item.fieldname}" class="form-control">
                                </div>
                            `;
                    }
                }).join('');
                sidePage.innerHTML = `<form>${formContent}</form>`;
            } else {
                console.error('Element with class "clicked-data" not found.');
            }
        }
    });
}

async function call_popup (frm,id) {
    if (!$(id).length) {
        await $('body').append(`
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
}

function inbound(params) {
    return `
        <div class="d-flex justify-content-center align-items-center inbound-full-height">
            <p>inbound</p>
        </div>
        `
}
function outbound(params) {
    return `
        <div class="d-flex justify-content-center align-items-center inbound-full-height">
            <p>outbound</p>
        </div>
        `
}