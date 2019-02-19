// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://pinkdolphins.myshopify.com/admin/orders*
// @grant        none
// @require      http://code.jquery.com/jquery-3.3.1.min.js
// ==/UserScript==

(function() {
    'use strict';
    // Your code here...
    var export_flg = false,previd = "";
    $( document ).ready(function() {
        console.log( "ready!" );
        app_logic();
        $(".action-bar").ready(function() {
            setTimeout(add_button,3000);
            $( document ).on( "click", "#export_all_orders", function() {
                export_flg = true;previd = "";setTimeout(app_logic,200);
            });
        });
        function app_logic(){
            if(export_flg == false) return;
            var now = get_firstID();
            if(now != previd && now){
                previd = now;
                click_expert_button();
            }
            else setTimeout(app_logic,200);
        }
        function get_firstID(){
            if($("td>a[data-nested-link-target='true']").length)return $("td>a[data-nested-link-target='true']").eq(0).text();
            else return false;
        }
        function add_button(){
            $(".action-bar__item.action-bar__item--link-container").append('<a href="#" id = "export_all_orders" class="ui-button">Export all orders</a>');
        }
        function click_expert_button(){
            console.log("Download : " + previd);
            $(".ui-button.ui-button--transparent.action-bar__link[name='button']").trigger("click");
            $("#export-format-plain-csv").trigger("click");
            $(':contains("Export orders")').trigger("click");
            setTimeout(next_page,1000);
        }
        function next_page(){
            console.log("next_page");
            if($('.btn.js-keep-open.js-pagination-link.js-next-btn.tooltip.tooltip-bottom,.btn.js-keep-open.js-pagination-link.js-next-btn.tooltip.tooltip-bottom.is-active').length == 0) {
                export_flg = false;return;
            }
            $('.btn.js-keep-open.js-pagination-link.js-next-btn.tooltip.tooltip-bottom,.btn.js-keep-open.js-pagination-link.js-next-btn.tooltip.tooltip-bottom.is-active')[0].click();
            setTimeout(app_logic,500);
        }

    });
})();