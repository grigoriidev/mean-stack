const path = require("path"),
    jwt = require("jsonwebtoken"),
    _ = require("lodash"),
    mongoose = require("mongoose"),
    FORMIDABLE = require("formidable"),
    FS = require("fs"),
    mv = require("mv"),
    shortid = require("shortid"),
    async = require("async"),
    /**/
    env = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    error = require(path.resolve(`./app/config/libs/error`)),
    DATE = require(path.resolve(`./app/config/libs/date`)),
    DECODE = require(path.resolve('./app/config/libs/verify_jwt')),
    HELPER = require(path.resolve('./app/config/libs/helper')),
    PAGINATE = require(path.resolve('./app/config/libs/paginate')),
    App = require(path.resolve("./app/controllers/frontend/AppController")),
    Lead = require(path.resolve("./app/models/Lead"));


class GeneratorController extends App {
    constructor() {
        super();

		/*
			- add folder --done
			- list folders --done
			- remove folder --done
			- share folder
			- folder details 
			- update all folders --done
			- update folder --done
			- 
		*/

    }

    quote(req, res) {
        /*get single post*/
        var fs = require('fs');
        var pdf = require('html-pdf');
        var base64Img = require('base64-img');
        console.log('filepath====>', req.body);
        // var html = fs.readFileSync(path.resolve('./public/components/quote-creator/views/pdf-creator.html'), 'utf8');
        var addBlank = (num) => {
            var blank = '';
            for (let index = 0; index < num; index++) {
                
                blank = blank + '<br>';
            }

            return blank;
        }
        var quotedata = req.body;
        
        quotedata.date = (quotedata.date).substring(0, (quotedata.date).indexOf('T'));
        var footerimage1 = base64Img.base64Sync(path.resolve('./image/new/footer1.png'));
        var footerimage2 = base64Img.base64Sync(path.resolve('./image/new/footer2.png'));
        var footerimage3 = base64Img.base64Sync(path.resolve('./image/new/footer3.png'));
        var footerimage4 = base64Img.base64Sync(path.resolve('./image/new/footer4.png'));

        var headerimage1 = base64Img.base64Sync(path.resolve('./image/new/header1.png'));
        var headerimage2 = base64Img.base64Sync(path.resolve('./image/new/header2.png'));
        var headerimage3 = base64Img.base64Sync(path.resolve('./image/new/header3.png'));
        var headerimage4 = base64Img.base64Sync(path.resolve('./image/new/header4.png'));
        var headerimage5 = base64Img.base64Sync(path.resolve('./image/new/header5.png'));
        
        var notes = "Proprietary:"+
        "➢ L.O.T. as a benefit to you, has developed the ideas and concepts detailed in this proposal. <br>These are considered by L.O.T. to be confidential and proprietary. <br>These ideas and"+
        "concepts remain the sole property of L.O.T. The customer acknowledges and agrees to honor our proprietary right to the contents of this proposal and refrain from discling"+
        "such content or any information to any third party.<br> without the prior written consent of L.O.T. Any unauthorized use of these ideas and concepts is strictly prohibited.<br>"+
        "Warranty:<br>"+
        "➢ L.O.T. shall protect all material workmanship incorporated in the electrical installation performed on such said projects, as noted by contract. <br>This program will cover"+
        "defects due to faulty workmanship or negligence for a period of twelve (12) months or one (1) year for the General Construction warranty, and modified by the supplementary"+
        "conditions, or for such longer periods as may be designated in specific division of the Specifications.<br>"+
        "➢ This protection plan is binding where defects occur due to normal usage conditions and does not cover willful and malicious damage, damages inadvertently caused by the"+
        "customer, damages caused by Acts of God or other Casualty.<br>"+
        "➢ This protection plan shall begin upon final inspection date of such said specific project.<br>"+
        "➢ Warranty service calls, to include troubleshooting and repairs to be completed Monday through Friday 9a.m. to 5p.m. EST. Warranty service calls outside of the normal"+
        "service hours listed may be subject to emergency service call rates.<br>"+
        "Terms and Conditions:<br>"+
        "➢ Customer/applicant agrees to pay for all invoices for all labor, material, supplies, equipment, consumables, rents, additional costs of bonds, insurance premiums, permits,"+
        "fees, taxes, and any costs of additional supervision, field, or office services supplied to the customer/applicant, to the customer/applicant’s representative or at the customer/"+
        "applicant’s direction upon receipt unless otherwise expressly agreed in writing.<br> Customer/applicant agrees to pay, upon demand, a late charge of 1.5% (A.P.R. 18%) for all"+
        "invoiced amounts that have not been paid within thirty (30) days from the invoice date.<br> For time and material jobs, payment is due COD or by Mastercard, VISA, American"+
        "Express, or Discover.<br>"+
        "➢ Late charges of 1.5% (18% APR) will be applied to the account at 30 days past due with actual services ceased and/or terminated at 60 days past due.<br>"+
        "➢ NOTICE TO OWNER: FAILURE OF THIS CONTRACTOR/CUSTOMER TO PAY THOSE PERSONS SUPPLYING MATERIAL OR SERVICES TO COMPLETE THIS"+
        "CONTRACT CAN RESULT IN THE FILING OF A MECHANIC’S LIEN ON THE PROPERTY WHICH IS THE SUBJECT OF THIS CONTRACT PURSUANT TO CHAPTER"+
        "84, The Florida Uniform Federal Lien Registration Act .<br> TO AVOID THIS RESULT YOU MAY ASK THIS CONTRACTOR FOR “LIEN WAIVERS” FROM ALL PERSONS"+
        "SUPPLYING MATERIAL OR SERVICES FOR THE WORK DESCRIBED IN THIS CONTRACT. <br>FAILURE TO SECURE LIEN WAIVERS MAY RESULT IN YOUR PAYING"+
        "FOR LABOR AND MATERIAL TWICE.<br>"+
        "➢ Should L.O.T. refer any past-due balance to an attorney or collection agency for collection efforts, customer/applicant agrees to pay, upon demand, in addition to any"+
        "balance then due and owing, reasonable attorney’s fees together with any other fees, costs, or expenses incurred to collect the past-due balance, including court costs.<br>"+
        "Applicant/customer agrees that the term ‘reasonable attorneys’ fees’ as used herein shall not be construed as being less than one-third (1/3) of the sum owing to L.O.T.."+
        "➢ Customer understands and agrees to being held financially responsible for any and all additional work requested and/or directed by the customer including its owners,"+
        "officers, manager, superintendent, or other representative.<br>"+
        "➢ Customer acknowledges that L.O.T. maintains an employment agreement that contains current and post-employment restrictions.<br> Restrictions, such as but not limited to;"+
        "engaging in business that competes with L.O.T., soliciting present or perspective customers, etc. <br>Attempts to engage employees outside of this agreement will result in"+
        "reasonable attorney fees together with any other cost or expenses incurred to protect L.O.T. and employee agreement.<br>"+
        "➢ A minimum restocking fee of 25% will be charged on all non stock or special order items.<br>"+
        "➢ Due to the volatility of the copper market and its direct impact on our cost, this proposal may be withdrawn if not accepted within ten days.<br>"+
        "Exclusions:<br>"+
        "➢ Damages to any public or private unmarked utilities such as but not limited to phone, cable, electric, gas, irrigation system, water and/or sewer.<br>"+
        "➢ Damages to all surfaces and coverings, such as but not limited to drywall, plaster, paint, tile, brick, carpet, wallpaper, concrete, etc.<br>"+
        "➢ All engineered and design drawings.<br>"+
        "➢ Demolition and clean-up unless clearly specified"+
        "➢ Electrical work outlined in any other sections"+
        "➢ All voice/data, fire alarm, security and HVAC/temperature controls"+
        "➢ All shift overtime, temporary electric, utility charges, and roof patching"+
        "➢ Repairs to landscape, seeding and sodding, plants, trees, shrubs, etc.<br>"+
        "➢ The assembly of specialty fixtures, accessories, and equipment and/or any non-standard products/devices.<br>"+
        "➢ Any losses due to failure of back up power system.<br>"+
        "➢ Provisions for labor, materials and/or related costs for unforeseen items underground which need to be removed, altered, or drilled through such as, but not limited to,"+
        "stumps, tree roots, rocks, footings, foundations, etc.<br>"+
        "➢ Provisions for adjustments of settings for motion or photovoltaic operated switches, lights, or other electrical components.<br> All adjustments will be completed on an hourly"+
        "basis.<br>"+
        "Delays:<br>"+
        "➢ If the work of L.O.T. is prevented, hindered, delayed or otherwise made impracticable by reason beyond the control of L.O.T. including, but not limited to, any strike, flood,"+
        "riot, fire, explosion, war, terrorist act or any other casualty, by any act or request of a governmental body, or as a result of any cause which cannot be overcome by reasonable"+
        "diligence and without unusual expense, L.O.T. will be excused from such performance and the Customer agrees to pay for any and all portions of work completed, according to"+
        "the terms herein.<br>"+
        "Schedule:<br>"+
        "➢Upon authorizing proposal in all appropriate locations, please contact L.O.T. to schedule the commencement of specified work on this project.";

        var header ='<div id="pageHeader-1" style="text-align:center; font-size: 15px;color:black;papdding-top:0px !important;">'+ '<img src="' + headerimage1 + '" style="width:100%;height:250px;"/>' +'</div>'+
                  '<div id="pageHeader-2" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + headerimage2 + '" style="width:100%;height:150px;"/>' +'</div>'+
                  '<div id="pageHeader-3" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + headerimage3 + '" style="width:100%;height:150px;"/>' +'</div>'+
                  '<div id="pageHeader-4" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + headerimage4 + '" style="width:100%;height:150px;"/>' +'</div>'+
                  '<div id="pageHeader-5" style="text-align:center; font-size: 15px;color:black;margin-bottom:200px;">'+ '<img src="' + headerimage5 + '" style="width:100%;height:200px;"/>' +'</div>'+
                  '<div id="pageHeader-6" style="text-align:center; font-size: 15px;color:black;margin-bottom:200px;">'+ '<img src="' + headerimage5 + '" style="width:100%;height:150px;"/>' +'</div>';

                  
        var footer = '<div id="pageFooter-1" style="text-align:center; font-size: 15px;color:black;">' + '<img src="' + footerimage1 + '" style="width:100%;height:100px;"/>'+'<span style="position:relative; top:-30%;z-index:1;">www.lightingoftomorrow.com</span>' +'</div>'+
                     '<div id="pageFooter-2" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + footerimage2 + '" style="width:100%;height:100px;"/>' +'</div>'+
                     '<div id="pageFooter-3" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + footerimage3 + '" style="width:100%;height:100px;"/>' +'</div>'+
                     '<div id="pageFooter-4" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + footerimage4 + '" style="width:100%;height:100px;"/>' +'</div>'+
                     '<div id="pageFooter-5" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + footerimage4 + '" style="width:100%;height:100px;"/>' +'</div>'+
                     '<div id="pageFooter-6" style="text-align:center; font-size: 15px;color:black;">'+ '<img src="' + footerimage4 + '" style="width:100%;height:100px;"/>' +'</div>';

        var first = '<div style="width:100%; height:15%;"></div>'+
                    '<img src="'+ quotedata.projectimg +'" style="width:50%; height:130%; border-radius:15px; margin-left:25%;">'+ addBlank(3)+
                    '<div style="width:100%; height:5%;"><span style="color:green; font-weight:bold; font-size:37px;margin-left:25%;">'+ quotedata.proname +'</span></div>'+
                    '<div style="width:60%; height:5%;"><span style="color:green; font-weight:bold; font-size:23px; word-wrap: break-word;text-align: center;margin-left:50%">'+ quotedata.proemail +'</span></div><br><br><br>'+
                    '<div style="width:100%; height:5%;"><span style="text-align:center; color:green; font-size:25px; font-weight:bold;">Prepared by:'+ quotedata.byname +'<br>Prepared for:'+ quotedata.name +'</span></div><br>'
                    
                    
        ;
        var products = '';
        
        for(var index=0; index<quotedata.products.length; index++) {

            products = products + '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                                '<th rowspan="2" style="width:20%;height:20px;text-align:center;font-size:12px;border-bottom:1px dotted gray;">'+quotedata.products[index].title+'</td>'+
                                '<th rowspan="2" style="width:20%;height:20px;border-bottom:1px dotted gray;"><img style="width:50px;height:50px;margin:auto;border-radius:5px;" src="'+quotedata.products[index].file+'"></td>'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:10px;">'+quotedata.products[index].qty+'</td>'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:10px;">'+quotedata.products[index].price+'</td>'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:11px; font-weight:bold;">$'+quotedata.products[index].extended_cost+'</td></tr>'+
                                '<tr style="width:100%;height:10px;">'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:10px;border-bottom:1px dotted gray;font-weight:bold;">Installation Cost:</td>'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:10px;border-bottom:1px dotted gray;">'+quotedata.products[index].install+'</td>'+
                                '<td style="width:20%;height:10px;text-align:center;font-size:11px;font-weight:bold;border-bottom:1px dotted gray;">$'+(quotedata.products[index].qty)*(quotedata.products[index].install)+'</td></tr>'
                                ;
        }
       
        var second = '<div style="width:100%; height:15%;"></div>' +
                     '<div style="width:100%; height:3px; border-top: 3px solid black;"></div>'+'<div style="width:100%; height:85%;">'+
                     '<table style="width:100%;"><thead style="width:100%;height:40px;"><tr style="width:100%;height:40px;"><th style="width:20%;height:40px;font-size:20px">Product Description</th><th style="width:20%;height:40px;font-size:20px"></th><th style="width:20%;height:40px;font-size:20px">Quantity</th><th style="width:20%;height:40px;font-size:20px">Cost</th><th style="width:20%;height:40px;font-size:20px">Extended Cost</th></tr></thead>'+ 
                     '<tbody>'+ products + '</tbody>' +
                     '</table>'+'</div>';

        var third = '<div style="width:100%; height:20%;"></div>' + 
                    '<div style="width:100%; height:35%;">'+'<table style="width:100%;"><thead style="width:100%; height:10px;"><tr style="width:100%;height:10px;"><th style="width:50%;height:10px;"></th><th style="width:50%;height:10px;"></th></tr></thead>'+
                    '<tbody>'+
                    '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                    '<td style="width:50%;height:20px;text-align:left;font-size:18px;border-bottom:1px dotted gray;padding-left:50px;">Total Materials Cost</td>'+
                    '<td style="width:50%;height:20px;text-align:right;font-size:18px;border-bottom:1px dotted gray;padding-right:50px;">$'+ quotedata.material_cost +'</td></tr>'+
                    '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                    '<td style="width:50%;height:20px;text-align:left;font-size:18px;border-bottom:1px dotted gray;padding-left:50px;">Tax</td>'+
                    '<td style="width:50%;height:20px;text-align:right;font-size:18px;border-bottom:1px dotted gray;padding-right:50px;">$'+ quotedata.tax +'</td></tr>'+
                    '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                    '<td style="width:50%;height:20px;text-align:left;font-size:18px;border-bottom:1px dotted gray;padding-left:50px;">Installation Cost</td>'+
                    '<td style="width:50%;height:20px;text-align:right;font-size:18px;border-bottom:1px dotted gray;padding-right:50px;">$'+ quotedata.installation +'</td></tr>'+
                    '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                    '<td style="width:50%;height:20px;text-align:left;font-size:18px;border-bottom:2px solid gray;padding-left:50px;">Shipping Cost</td>'+
                    '<td style="width:50%;height:20px;text-align:right;font-size:18px;border-bottom:2px solid gray;padding-right:50px;">$'+ quotedata.shipping +'</td></tr>'+
                    '<tr style="width:100%;height:30px;margin-bottom: 10px;">'+
                    '<td style="width:50%;height:20px;text-align:left;font-size:20px;font-weight:bold;padding-left:50px;">Total Project Cost</td>'+
                    '<td style="width:50%;height:20px;text-align:right;font-size:20px;font-weight:bold;padding-right:50px;">$'+ quotedata.total +'</td></tr>'+
                    '</tbody></table></div>'+
                    '<div style="width:100%; height:10%;text-align:center;"><span style="color:green; font-weight:bold; font-size:32px;text-align:center;border-bottom:2px solid black;">INSTALLATION NOTES</span></div>'+
                    '<div style="width:100%;height:40%;"><div style="padding-left: 50px;"><span style="width:80%;color:black;font-size:13px;white-space: pre-wrap;text-align:left;">'+ quotedata.notes +'</span></div></div>'
        ;

        var fourth = '<div style="width:100%; height:15%;"></div>' +
                     
                     '<div style="width:100%;white-space: pre-wrap;content-aling:center"><div style="padding-left:30px;padding-right:30;"><span style="color:black;font-size:13px;white-space: pre-wrap;">'+ notes +'</span></div>'
        ;
        var html = header +  first + second + third + fourth + footer;
        
        
        var options = { 

            "border": {
                "top": "0in",            // default is 0, units: mm, cm, in, px
                "right": "0in",
                "bottom": "0in",
                "left": "0.0in"
              },
              "header": {
                "height": "45mm",
                "contents": '<div style="text-align: center;padding-top:0px;">Author: Marc Bachmann</div>'
              },
            
        };
     
        var currentdate = new Date(); 
        var year = currentdate.getFullYear();
        var month = currentdate.getMonth();
        var date = currentdate.getDate();
        var hour = currentdate.getHours();
        var minute = currentdate.getMinutes();
        var second = currentdate.getSeconds();

        pdf.create(html, options).toFile('./quotes/quote '+year+'-'+month+'-'+date+'-'+hour+'-'+minute+'-'+second +'.pdf', function (err, res) {
       
            if (err) return console.log(err);
            console.log(res); // { filename: '/app/businesscard.pdf' }
        });
    }

}

/* var fs = require('fs');
var pdf = require('html-pdf');
var html = fs.readFileSync(path.resolve('./index.html'), 'utf8');
var options = { 
    "height": "11.3in",        // allowed units: mm, cm, in, px
    "width": "8.7in",

    "border": "0",   
    format: 'A3',
    // base: 'file://' + __dirname + '/image/',
    base: 'file:///E:/node/andersen/intranet/image/',
    paginationOffset: 1,       // Override the initial pagination number
};

console.log("Test.........", 'file://' + __dirname + '/image/')

pdf.create(html, options).toFile('./index.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
});

 */

module.exports = GeneratorController;