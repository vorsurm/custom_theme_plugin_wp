!function(e){"function"==typeof define&&define.amd?define("typeEditor",e):e()}(function(){"use strict";function r(e){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}Vue.component("nav-item",{props:["label","tab","icon","color","subtab"],template:'\n\t\t<li :class="[ { active: $root.currentTab === tab }, \'tab-\'+tab, \'editor-nav-item\' ]">\n\t\t\t<a @click.prevent="$root.setTab( tab, subtab )" href="#"><i :class="icon"></i><span>{{ label }}</span></a>\n\t\t</li>\n\t',created:function(){var e=".editor-nav-item.tab-"+this.tab;this.$root.addStyle("\n\t\t\t".concat(e," a i { color: ").concat(this.color,"; border-color: ").concat(this.color,"; }\n\t\t\t").concat(e,".active a i { background: ").concat(this.color,"; }\n\t\t"))}}),Vue.component("nav-sub-item",{props:["label","tab","subtab"],template:'\n\t\t<div\n\t\t\t@click.prevent="$root.setTab( tab, subtab )"\n\t\t\t:class="$root.currentTab === tab && $root.currentSubTab === subtab ? \'active\' : \'\'"\n\t\t\tclass="sub-tab"\n\t\t>{{ label }}</div>\n\t'}),Vue.component("atwho",{props:{value:String,placeholder:String,template:String},data:function(){return{modifiers:this.$root.editor.modifiers,aliases:CASE27_TypeDesigner.fieldAliases,fields:this.$root.fields.used}},template:'\n        <div>\n            <div class="atwho-wrapper">\n                <textarea ref="textarea"\n                    :value="value"\n                    :placeholder="placeholder"\n                    :style="template === \'input\' ? \'height:38px;\' : \'\'"\n                ></textarea>\n            </div>\n            <p class="form-description">\n                This form item supports the\n                <a href="#" class="cts-show-tip" data-tip="bracket-syntax">field bracket syntax.</a>\n                Type <code>@</code> or <code>[[</code> for list of available tags.\n            </p>\n        </div>\n    ',mounted:function(){var t=this,e=jQuery(this.$refs.textarea),i={at:"[[",data:Object.values(this.$root.atWhoItems),insertTpl:"[[${slug}]]",displayTpl:'<li class="${classes}">${label} <small>${slug}</small></li>',limit:1e6,startWithSpace:!1,searchKey:"search"};e.atwho(i).atwho(jQuery.extend(i,{at:"@"})),e.on("input change",function(e){return t.$emit("input",e.target.value)}),e.on("blur",function(e){return t.$emit("blur",e.target.value)})},beforeDestroy:function(){jQuery(this.$refs.textarea).atwho("destroy")}}),Vue.component("seo",{props:["value"],data:function(){return{markup:null,editor:null}},created:function(){this.markup=this.$root.settings.seo.markup},mounted:function(){this.$nextTick(function(){this.initEditor()}.bind(this))},methods:{setDefaultMarkup:function(){confirm("Are you sure?")&&(this.markup=this.$root.blueprints.structured_data,this.editor.set(this.markup))},initEditor:function(){var o=this;(!this.markup||"object"!==r(this.markup)||Object.keys(this.markup).length<1)&&(this.markup=this.$root.blueprints.structured_data);var e=new JSONEditor(this.$el.querySelector(".lte-seo-markup"),{mode:"tree",modes:["tree","text"],search:!1,onChange:function(){o.markup=e.get()},autocomplete:{caseSensitive:!1,getOptions:function(e,t,i,n){var s=o.$root.allFields();return Object.keys(s).map(function(e){return CASE27_TypeDesigner.fieldAliases[s[e].slug]?"[["+CASE27_TypeDesigner.fieldAliases[s[e].slug]+"]]":"[["+s[e].slug+"]]"})}}});e.set(this.markup),this.editor=e}},watch:{markup:function(e){this.$root.settings.seo.markup=e}}}),Vue.component("packages",{data:function(){return{activePackage:null}},methods:{add:function(e){void 0!==this.$root.state.settings.packages[e]&&(this.isUsed(e)||this.$root.settings.packages.used.push({package:e,label:"",description:"",featured:!1}))},remove:function(t){this.$root.settings.packages.used=this.$root.settings.packages.used.filter(function(e){return t!==e})},isUsed:function(t){var i=!1;return this.$root.settings.packages.used.forEach(function(e){e.package===t&&(i=!0)}),i},isActive:function(e){return this.activePackage===e}}}),Vue.component("reviews",{data:function(){return{activeCategory:null}},methods:{addCategory:function(){this.$root.settings.reviews.ratings.categories.push({id:"category-key",label:"Category Name",label_l10n:{},is_new:!0})},removeCategory:function(t){this.$root.settings.reviews.ratings.categories=this.$root.settings.reviews.ratings.categories.filter(function(e){return t!==e})},isActive:function(e){return this.activeCategory===e}}}),Vue.component("expiry-rules",{data:function(){return{rules:this.$root.settings.expiry_rules}},methods:{addRule:function(e){e.trim().length&&!this.rules.includes(e)&&this.rules.push(e)},removeRule:function(e){-1!==this.rules.indexOf(e)&&this.rules.splice(this.rules.indexOf(e),1)},getRuleLabel:function(t){var e=this.$root.fields.used.find(function(e){return e.slug===t});if(e){if("recurring-date"===e.type)return e.allow_recurrence?'When the repeat end date for "'.concat(e.label,'" is reached'):'When the last occurence of "'.concat(e.label,'" is finished');if("date"===e.type)return'When the date in "'.concat(e.label,'" field is reached')}}},computed:{availableRules:function(){var t=this,i=[];return this.$root.fields.used.forEach(function(e){t.rules.includes(e.slug)||("recurring-date"===e.type&&i.push({value:e.slug,label:e.allow_recurrence?'When the repeat end date for "'.concat(e.label,'" is reached'):'When the last occurence of "'.concat(e.label,'" is finished')}),"date"===e.type&&i.push({value:e.slug,label:'When the date in "'.concat(e.label,'" field is reached')}))}),i}}}),Vue.component("head-buttons",{data:function(){return{active:null}},methods:{isActive:function(e){return this.active===e},setActive:function(e){this.active=e},toggleActive:function(e){return this.active=e===this.active?null:e},deleteItem:function(t){this.$root.result.buttons=this.$root.result.buttons.filter(function(e){return e!==t})},addItem:function(){this.$root.result.buttons.push({label:""})}}}),Vue.component("info-fields",{data:function(){return{active:null}},methods:{isActive:function(e){return this.active===e},setActive:function(e){this.active=e},toggleActive:function(e){return this.active=e===this.active?null:e},deleteItem:function(t){this.$root.result.info_fields=this.$root.result.info_fields.filter(function(e){return e!==t})},addItem:function(){this.$root.result.info_fields.push({label:"",icon:""})}}}),Vue.component("footer-sections",{data:function(){return{active:null,activeDetail:null,sectionTypes:{categories:{type:"categories",taxonomy:"job_listing_category",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},host:{type:"host",label:"[[title]]",show_field:"related_listing",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},author:{type:"author",label:"[[:authname]]",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},details:{type:"details",details:[],show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},actions:{type:"actions",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""}}}},methods:{isActive:function(e){return this.active===e},setActive:function(e){this.active=e},toggleActive:function(e){return this.active=e===this.active?null:e},deleteSection:function(t){this.$root.result.footer.sections=this.$root.result.footer.sections.filter(function(e){return e!==t})},addSection:function(e){this.$root.result.footer.sections.push(jQuery.extend(!0,{},this.sectionTypes[e]))},deleteDetail:function(t,e){e.details=e.details.filter(function(e){return e!==t})},addDetail:function(e){e.details.push({icon:"",label:""})}}}),Vue.component("form-filters",{data:function(){return{filterTypes:CASE27_TypeDesigner.blueprints.filters,activeFilter:null}},methods:{isActive:function(e){return this.activeFilter===e},setActive:function(e){this.activeFilter=e},toggleActive:function(e){return this.activeFilter=e===this.activeFilter?null:e},addFilter:function(e){this.$root.search[this.activeFormKey].facets.push(jQuery.extend(!0,{},this.filterTypes[e]))},deleteFilter:function(t){this.$root.search[this.activeFormKey].facets=this.$root.search[this.activeFormKey].facets.filter(function(e){return e!==t})},canAddFilter:function(t){var e=this.$root.search[this.activeFormKey].facets;return(!t.form||t.form===this.activeFormKey)&&(("basic"!==this.activeFormKey||"ui"!==t.type.slice(-2))&&(void 0!==t.show_field||"ui"===t.type.slice(-2)||!e.find(function(e){return e.type===t.type})))},recurringRangeIsUsed:function(t,e){return e.ranges.find(function(e){return e.key===t})},setPrimaryFilter:function(e){return e.is_primary?e.is_primary=!1:(this.$root.search.advanced.facets.forEach(function(e){return e.is_primary=!1}),e.is_primary=!0)},getFieldType:function(e){if(!e)return!1;var t=this.$root.getField(e);return!!t&&t.type}},computed:{activeFormKey:function(){return"basic"===this.$root.currentSubTab?"basic":"advanced"},activeForm:function(){return this.$root.search[this.activeFormKey]}}}),document.getElementById("case27-listing-type-options")&&(MyListing.TypeEditor=new Vue({el:"#case27-listing-options-inside",data:{postid:null,currentTab:"settings",currentSubTab:"general",drag:!1,styles:!1,editor:window.Type_Editor_Data,state:{custom_field_category:"all",fields:{editingOptions:!1,active:null},single:{active_button:null,active_block:null,active_detail:null,active_cover_action:null,active_quick_action:null},preview:{active_footer_section:null},search:{active_form:"advanced",active_facet:null,active_order:null,active_explore_tab:null},settings:{packages:CASE27_TypeDesigner.listing_packages}},blueprints:{menu_page:{defaults:{page:"main",label:"New Page",label_l10n:{locale:"en_US"},slug:""},main:{page:"main",layout:[],sidebar:[],template:"masonry"},comments:{page:"comments"},related_listings:{page:"related_listings",related_listing_field:"related_listing"},custom:{page:"custom",layout:[],sidebar:[],template:"masonry"},store:{page:"store",field:"",hide_if_empty:!1},bookings:{page:"bookings",field:"",provider:[],contact_form_id:0}},facet:{type:"text",label:"New Facet",placeholder:"",search_field:""},layout_blocks:window.Type_Editor_Data.content_blocks,quick_actions:CASE27_TypeDesigner.blueprints.quick_actions,structured_data:CASE27_TypeDesigner.blueprints.structured_data,explore_tabs:CASE27_TypeDesigner.blueprints.explore_tabs,map_skins:{},preview:{sections:{categories:{type:"categories",title:"Terms",taxonomy:"job_listing_category",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},host:{type:"host",title:"Related Listing",label:"[[title]]",show_field:"related_listing",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},author:{type:"author",title:"Author",label:"[[author]]",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},details:{type:"details",title:"Details",details:[],show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""},actions:{type:"actions",title:"Actions",show_bookmark_button:"",show_quick_view_button:"",show_compare_button:""}}}},fields:CASE27_TypeDesigner.schemes.fields,single:CASE27_TypeDesigner.schemes.single,result:CASE27_TypeDesigner.schemes.result,search:CASE27_TypeDesigner.schemes.search,settings:CASE27_TypeDesigner.schemes.settings},created:function(){if(window.location.hash){var e=window.location.hash.replace("#","").split(".");this.setTab(e[0],e[1])}this.postid=jQuery("#case27-post-id").val(),this.blueprints.map_skins=CASE27.map_skins,this.getListingMeta()},methods:{setTab:function(e,t){this.currentTab=e,this.currentSubTab=t,window.location.hash=t?e+"."+t:e},addStyle:function(e){this.styles||(this.styles=document.createElement("style"),document.body.appendChild(this.styles)),this.styles.innerHTML+=e},getPackageDefaultTitle:function(e){return void 0===this.state.settings.packages[e.package]?"":this.state.settings.packages[e.package]},getPackageTitle:function(e){return e.label?e.label:this.getPackageDefaultTitle(e)},getListingMeta:function(){var e=CASE27_TypeDesigner.config;this.setupFields(e.fields.used),this.setupSinglePage(e.single),this.setupPreviewCard(e.result),this.search=jQuery.extend({},this.search,e.search),this.setupSearchForms(),this.setupOrderingOptions(),this.setupExploreTabs(),this.settings=jQuery.extend({},this.settings,e.settings),this.setupReviewSettings()},setupFields:function(n){var s=this;this.fields.used=Object.keys(n).map(function(e){var t=n[e],i=s.editor.preset_fields[t.slug];return void 0!==i&&(t.default_label=i.label,i._used=!0),t});var i=!1;this.fields.used.forEach(function(e,t){"job_title"===e.slug&&(e.required=!0,e.show_in_admin=!0,e.show_in_compare=!0,e.show_in_submit_form=!0,e.conditional_logic=!1,e.conditions=[],i=!0)}),i||this.usePresetField("job_title")},setupSinglePage:function(e){var o=this;o.single=jQuery.extend({},o.single,e),o.single.menu_items=Object.keys(o.single.menu_items).map(function(e){var t=jQuery.extend(!0,{},o.blueprints.menu_page.defaults,o.blueprints.menu_page[o.single.menu_items[e].page]),i=jQuery.extend({},t,o.single.menu_items[e]);return Object.keys(i).map(function(e){void 0===t[e]&&delete i[e]}),i}),o.single.menu_items.map(function(t){if(void 0!==t.layout){["layout","sidebar"].forEach(function(e){var n=[];t[e].forEach(function(t,e){if(void 0!==o.blueprints.layout_blocks[t.type]){var i=jQuery.extend(!0,{},o.blueprints.layout_blocks[t.type]);t=jQuery.extend({},i,t);if(Object.keys(t).map(function(e){void 0===i[e]&&delete t[e]}),i.options){var s=[];i.options.forEach(function(i,e){var n=jQuery.extend({},i);t.options.forEach(function(e,t){i.name==e.name&&(n.value=e.value)}),s.push(n)}),t.options=s}void 0!==t.icon&&-1!==["view_headline","insert_photo","view_module","map","email","layers","av_timer","attach_file","alarm","videocam","account_circle"].indexOf(t.icon)&&(t.icon="mi "+t.icon),n.push(t)}}),t[e]=n})}return t}),o.single.quick_actions=o.single.quick_actions.map(function(t,e){var i=jQuery.extend(!0,{},o.blueprints.quick_actions[t.action]);return Object.keys(i).forEach(function(e){void 0!==t[e]&&(i[e]=t[e])}),i}),o.single.cover_actions=o.single.cover_actions.map(function(t,e){var i=jQuery.extend(!0,{},o.blueprints.quick_actions[t.action]);return Object.keys(i).forEach(function(e){void 0!==t[e]&&(i[e]=t[e])}),i})},setupPreviewCard:function(e){var n=this;if(!e)return!1;e.footer.sections=e.footer.sections.map(function(t){var i=jQuery.extend(!0,{},n.blueprints.preview.sections[t.type]);return!!i&&(Object.keys(i).map(function(e){void 0!==t[e]&&(i[e]=t[e])}),i)}),n.result=e},setupSearchForms:function(){var t=this;this.search.advanced.facets=this.search.advanced.facets.map(function(e){return t.setupFacet(e)}),this.search.basic.facets=this.search.basic.facets.map(function(e){return t.setupFacet(e)})},setupOrderingOptions:function(){this.search.order.options.length||this.searchTab().setDefaultOrderOptions(),this.search.order.options.forEach(function(e){e.is_new=!1})},setupExploreTabs:function(){this.search.explore_tabs.length||(this.search.explore_tabs=[],this.searchTab().addTab(this.blueprints.explore_tabs["search-form"]),this.searchTab().addTab(this.blueprints.explore_tabs.categories))},setupFacet:function(i){var e=CASE27_TypeDesigner.blueprints.filters[i.type];if(void 0===e)return i;var n=jQuery.extend({},e,i);return n.options=[],Array.isArray(e.options)&&e.options.forEach(function(t){var e=i.options.filter(function(e){return e.name===t.name})[0];void 0!==e&&(t.value=e.value),n.options.push(jQuery.extend({},t))}),n},setupReviewSettings:function(){this.settings.reviews.ratings.categories.length<1&&this.settings.reviews.ratings.categories.push({id:"rating",label:"Overall Rating",label_l10n:{},is_new:!1}),this.settings.reviews.ratings.categories.forEach(function(e){e.is_new=!1})},usePresetField:function(e){var t=this.editor.preset_fields[e];if(t){var i=jQuery.extend(!0,{},t);this.fields.used.push(i),t._used=!0}},addCustomField:function(e){if(this.editor.custom_fields[e]){var t=jQuery.extend(!0,{},this.editor.custom_fields[e]);t.is_new=!0;var i=Math.floor(9e3*Math.random())+1e3;t.slug="custom-field-".concat(i),this.fields.used.push(t)}},deleteField:function(t){var e=this.fieldLabelBySlug(t);CASE27_TypeDesigner.fieldAliases[t]&&CASE27_TypeDesigner.fieldAliases[t];confirm('Are you sure you want to delete "'.concat(e,'" field?'))&&(this.fields.used=this.fields.used.filter(function(e){return e.slug!==t}),this.editor.preset_fields[t]&&delete this.editor.preset_fields[t]._used)},editFieldOptions:function(e,n){n.options={},jQuery(e.target).val().trim().split("\n").map(function(e,t){if(e.length<1)return!1;var i=e.split(":");return 1===i.length?n.options[i[0].trim()]=i[0].trim():2===i.length&&(n.options[i[0].trim()]=i[1].trim())})},editFieldMimeTypes:function(e,n){n.allowed_mime_types={},jQuery(e.target).val().map(function(e,t){var i=e.split("=>");if(!i[0]||!i[1])return!1;n.allowed_mime_types[i[0].trim()]=i[1].trim()})},slugify:function(e){return e.toString().trim().toLowerCase().replace(/\s+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").replace(/^-+/,"")},addMenuItem:function(e){var t=jQuery.extend(!0,{},this.blueprints.menu_page.defaults,this.blueprints.menu_page[e]);this.single.menu_items.push(t)},deleteMenuItem:function(t){this.single.menu_items=this.single.menu_items.filter(function(e){return e!==t})},addBlock:function(e,t){"none"!=e&&void 0!==this.blueprints.layout_blocks[e]&&t.layout.push(jQuery.extend(!0,{},this.blueprints.layout_blocks[e]))},deleteBlock:function(t,e,i){i[e]=i[e].filter(function(e){return e!==t})},moveBlock:function(t,e,i){var n="layout"==e?"sidebar":"layout";i[e]=i[e].filter(function(e){return e!==t}),i[n].push(t)},getFooterSectionTitle:function(e){var t={categories:"Terms",host:"Related Listing",author:"Author",details:"Details",actions:"Actions"};return t[e.type]?t[e.type]:"Section"},searchTab:function(){var u=this;return{addOption:function(e,t,i,n,s,o,r,a){u.search.order.options.push({label:e||"New option",key:t||"new-option",ignore_priority:a||!1,is_new:!0,clauses:[{orderby:i||"date",order:n||"DESC",context:s||"option",type:o||"CHAR",custom_type:r||!1}]})},removeOption:function(t){u.search.order.options=u.search.order.options.filter(function(e){return t!==e})},optionType:function(e){var t=u.fieldByName(e);return t?t.type:""},addClause:function(e){e.clauses.push({orderby:"date",order:"DESC",context:"option",type:"CHAR",custom_type:!1})},removeClause:function(t,e){e.clauses=e.clauses.filter(function(e){return t!==e})},setOptionKey:function(e){e.is_new&&(e.key=u.slugify(e.label))},setDefaultOrderOptions:function(){u.search.order.options=[],u.searchTab().addOption("Latest","latest","date","DESC","option"),u.searchTab().addOption("Top rated","top-rated","rating","DESC","option","DECIMAL(10,2)",!1,!0),u.searchTab().addOption("Random","random","rand","DESC","option")},addTab:function(e,t,i,n,s,o){"object"!==r(e)||null===e?u.search.explore_tabs.push({type:e,label:t,icon:i,orderby:n||"",order:s||"",hide_empty:o||!1}):u.search.explore_tabs.push(jQuery.extend(!0,{},e))},removeTab:function(t){u.search.explore_tabs=u.search.explore_tabs.filter(function(e){return t!==e})}}},quickActions:function(){var i=this;return{remove:function(t){i.single.quick_actions=i.single.quick_actions.filter(function(e){return e!==t})},add:function(e){i.blueprints.quick_actions[e]&&i.single.quick_actions.push(jQuery.extend(!0,{},i.blueprints.quick_actions[e]))}}},coverActions:function(){var i=this;return{remove:function(t){i.single.cover_actions=i.single.cover_actions.filter(function(e){return e!==t})},add:function(e){i.blueprints.quick_actions[e]&&i.single.cover_actions.push(jQuery.extend(!0,{},i.blueprints.quick_actions[e]))}}},coverDetails:function(){var o=this;return{remove:function(t){o.single.cover_details=o.single.cover_details.filter(function(e){return e!==t})},add:function(e,t,i,n,s){o.single.cover_details.push({label:e||"",field:t||"",format:i||"plain",prefix:n||"",suffix:s||""})}}},getFields:function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];var n=this.fields.used;return t.length?n.filter(function(e){return t.includes(e.type)}):n},getField:function(t){return this.fields.used.find(function(e){return e.slug===t})},fieldsByType:function(t){return this.fields.used.filter(function(e){return"object"===r(e)&&-1!==jQuery.inArray(e.type,t)}).map(function(e){return{slug:e.slug,label:e.label}})},allFields:function(){return this.fields.used.filter(function(e){return"object"===r(e)}).map(function(e){return{slug:e.slug,label:e.label}})},fieldByName:function(t){var e=this.fields.used.filter(function(e){return e.slug===t});return!!e.length&&e[0]},fieldLabelBySlug:function(e){var t=this.fieldByName(e);return!!t&&t.label},fieldsByTypeFormatted:function(e){if(!jQuery.isArray(e))return e;var t=this.fieldsByType(e),i={};return t.forEach(function(e){i[e.slug]=e.label}),i},textFields:function(){return this.fieldsByType(["text","checkbox","date","recurring-date","email","location","multiselect","number","password","radio","select","textarea","texteditor","wp-editor","url"])},toggleRepeaterItem:function(e){jQuery(e.target).closest(".row-item").toggleClass("open")},capitalize:function(e){if("string"!=typeof e||!e.length)return e;for(var t=e.split(/[\s,_-]+/),i=0;i<t.length;i++){var n=t[i];t[i]=n.charAt(0).toUpperCase()+n.slice(1)}return t.join(" ").replace(/^Job\s/,"")},formatLabel:function(e,t){var i=this.fieldByName(t)?this.fieldByName(t).label:this.capitalize(t);return this.capitalize(e.replace("[[field]]",i).replace(/\[27-format(.*?)?\]/g,"").replace(/\[\/27-format\]/g,""))},conditions:function(){return{addOrCondition:function(e){e.conditions.push([{key:"__listing_package",value:"",compare:"=="}])},deleteConditionGroup:function(t,e){e.conditions=e.conditions.filter(function(e){return t!==e})}}},getLabelParts:function(e,t){var i,n=1<arguments.length&&void 0!==t?t:"",s=this.atWhoItems;return(i=(i=e.split(/\[\[+(.*?)\]\]/g).filter(Boolean)).map(function(e){var t=s[e];return t?{type:"tag",content:t.displayLabel?t.displayLabel:t.label}:{type:"text",content:e}})).length?i:[{type:"empty",content:n}]}},computed:{fields_json_string:function(){return JSON.stringify(this.fields.used)},single_page_options_json_string:function(){return JSON.stringify(this.single)},result_template_json_string:function(){return JSON.stringify(this.result)},search_page_json_string:function(){return JSON.stringify(this.search)},settings_page_json_string:function(){return JSON.stringify(this.settings)},atWhoItems:function(){var r=this,a={};return this.fields.used.forEach(function(s){if(!s.is_ui){var o=CASE27_TypeDesigner.fieldAliases[s.slug]?CASE27_TypeDesigner.fieldAliases[s.slug]:s.slug;a[o]={slug:o,label:s.label,search:"".concat(s.label," ").concat(o).replace(/\s+/g,""),classes:""},r.editor.modifiers[s.type]&&Object.keys(r.editor.modifiers[s.type]).forEach(function(e){var t=r.editor.modifiers[s.type][e],i=t.replace("%s","").trim(),n=t.replace("%s",s.label).trim();a["".concat(o,".").concat(e)]={slug:"".concat(o,".").concat(e),label:"&mdash; <span>".concat(i,"</span>"),search:"".concat(s.label," ").concat(i," ").concat(o," ").concat(e).replace(/\s+/g,""),displayLabel:n,classes:"sub-item"}})}}),Object.keys(this.editor.special_keys).forEach(function(e,t){var i=r.editor.special_keys[e];a[e]={slug:e,label:i,search:"".concat(i," ").concat(e).replace(/\s+/g,""),classes:0===t?"divide-top":""}}),a}}}))});
