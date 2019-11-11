(this["webpackJsonpmenu-dev"]=this["webpackJsonpmenu-dev"]||[]).push([[0],{132:function(e,t,n){e.exports=n(218)},137:function(e,t,n){},139:function(e,t,n){},218:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(8),l=n.n(i),u=(n(137),n(138),n(139),n(225)),s=n(51),o=n(23),c=n(117),m=n(118),g=n(127),d=n(119),f=n(129),p=n(7),h=n.n(p),y=n(89),v=n(224),E=n(223),x=n(221),C=n(125),M=n(13),b=n(55),D=new b.MDiningPromiseClient("https://michigan-dining-api.herokuapp.com"),H=n(222),S=function(e){var t=e.category;return r.a.createElement("div",null,r.a.createElement("h2",{style:{fontSize:"12pt",margin:"2px",marginTop:"10px",fontWeight:600}},t.getName()),r.a.createElement(E.a,{style:{boxShadow:"0px 0px 4px 0px rgba(0, 0, 0, 0.1)",borderRadius:"5px"},bodyStyle:{padding:"10px"}},r.a.createElement(H.a,{itemLayout:"horizontal",dataSource:t.getMenuitemList(),size:"small",split:!1,renderItem:function(e){return r.a.createElement(H.a.Item,{style:{padding:"0px"}},r.a.createElement(H.a.Item.Meta,{style:{padding:"0px"},description:r.a.createElement("div",null,r.a.createElement("h4",{style:{padding:"0px",margin:"0px"}},e.getName()),r.a.createElement("p",{style:{margin:"0px",padding:"0px",display:"block"}},r.a.createElement("i",null,e.getAttributeList().reduce((function(e,t){return"".concat(e," ").concat(t)}),"")," - "),r.a.createElement("i",null,e.getAllergensList().reduce((function(e,t){return"".concat(e," ").concat(t)}),""))))}))}})))},k=function(e){function t(e){var n;return Object(c.a)(this,t),(n=Object(g.a)(this,Object(d.a)(t).call(this,e))).state={diningHalls:[],menus:[],selectedCampus:"DINING HALLS",selectedDiningHall:0,selectedDate:h()(),selectedMenu:0,loading:!0},n.menuCache={},n}return Object(f.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=this;D.getDiningHalls(new b.DiningHallsRequest).then((function(t){var n=t.getDininghallsList(),a=n.findIndex((function(e){return"Bursley Dining Hall"===e.getName()}));e.setState({diningHalls:n,selectedDiningHall:a},(function(){return e.fetchMenu()}))})).catch((function(e){return console.log(e)}))}},{key:"getHoursOfMenu",value:function(e){var t=this.state,n=t.selectedDiningHall,a=t.selectedDate,r=t.diningHalls,i=0===r.length?null:r[n].getDayeventsList().find((function(e){return h()(e.getKey()).day()===a.day()})),l=i?i.getCalendareventList().find((function(t){return t.getEventtitle().toLowerCase()===e.getMeal().toLowerCase()})):null;return l||null}},{key:"getStartTimeOfMenu",value:function(e){var t=this.getHoursOfMenu(e);return t?h()(t.getEventtimestart()):null}},{key:"getEndTimeOfMenu",value:function(e){var t=this.getHoursOfMenu(e);return t?h()(t.getEventtimeend()):null}},{key:"firstMenuWithCategories",value:function(e){var t=this,n=this.state.selectedDate,a=h()();if(n.isSame(a,"day")){var r=e.map((function(e,t){return{idx:t,menu:e}})).filter((function(e){return e.menu.getHascategories()&&t.getEndTimeOfMenu(e.menu)&&t.getEndTimeOfMenu(e.menu).isSameOrAfter(a)}));return 0===r.length?0:r.sort((function(e,n){var r=t.getHoursOfMenu(e.menu),i=t.getHoursOfMenu(n.menu);return a.isAfter(h()(r.getEventtimestart()))?-1:a.isAfter(h()(i.getEventtimestart()))?1:h()(r.getEventtimestart()).diff(a)-h()(i.getEventtimestart()).diff(a)}))[0].idx}var i=e.findIndex((function(e){return e.getHascategories()}));return-1===i?0:i}},{key:"fetchMenu",value:function(){var e=this,t=this.state,n=t.diningHalls,a=t.selectedCampus,r=t.selectedDiningHall,i=t.selectedDate;if(0!==n.length){var l=a+r+i.format("YYYY-MM-DD");if(this.menuCache.hasOwnProperty(l)){var u=this.menuCache[l];this.setState({menus:u,selectedMenu:this.firstMenuWithCategories(u)})}else{var s=new b.MenuRequest;s.setDate(i.format("YYYY-MM-DD")),s.setDininghall(n[r].getName()),s.setMeal(null),this.setState({loading:!0}),D.getMenu(s).then((function(t){var n=t.getMenusList();e.menuCache[l]=n,e.setState({menus:n,selectedMenu:e.firstMenuWithCategories(n),loading:!1})})).catch((function(e){return console.log(e)}))}}}},{key:"onChangeDate",value:function(e){var t=this;this.setState({selectedDate:e},(function(){return t.fetchMenu()}))}},{key:"onChangeDiningHall",value:function(e){var t=this;this.setState({selectedDiningHall:e},(function(){return t.fetchMenu()}))}},{key:"onChangeCampus",value:function(e){var t=this,n=this.state.diningHalls.findIndex((function(t){return t.getCampus()===e}));this.setState({selectedCampus:e,selectedDiningHall:n},(function(){return t.fetchMenu()}))}},{key:"renderCategories",value:function(){var e=this.state,t=e.selectedMenu,n=e.menus;if(0===n.length)return r.a.createElement("b",null,"There's no data for this date :(");var a=n[t];return a.getHascategories()?a.getCategoryList().map((function(e){return r.a.createElement(S,{key:e.getName(),category:e})})):r.a.createElement("b",null,a.getDescription())}},{key:"render",value:function(){var e=this,t=this.props.style,n=this.state,a=n.selectedCampus,i=n.selectedDiningHall,l=n.selectedDate,u=n.selectedMenu,c=n.diningHalls,m=n.menus,g=n.loading,d=Array.from(new Set(c.map((function(e){return e.getCampus()})))).sort((function(e,t){return e.localeCompare(t)})).map((function(e){return r.a.createElement(v.a.Button,{key:e,value:e},e)})),f=c.map((function(e,t){return{idx:t,diningHall:e}})).sort((function(e,t){return e.diningHall.getName().localeCompare(t.diningHall.getName())})).filter((function(e){return e.diningHall.getCampus()===a})).map((function(e){return r.a.createElement(v.a.Button,{style:{minWidth:205},key:e.idx,value:e.idx},e.diningHall.getName())})),p=0===c.length||0===m.length?null:this.getHoursOfMenu(m[u]),b=p?h()(p.getEventtimestart()):h()(),D=p?h()(p.getEventtimeend()):h()(),H=null,S=b.format("h:mma"),k=D.format("h:mma");h()().isBetween(b.clone().subtract(24,"hours"),D.clone().add(24,"hours"))&&(H=h()().isBefore(b)?"Opens "+b.fromNow():h()().isBefore(D)?"Closes "+D.fromNow():"Closed "+D.fromNow()+" :(");var w=m.map((function(t,n){return{idx:n,meal:t.getMeal(),startTime:e.getStartTimeOfMenu(t)}})).sort((function(e,t){return e.startTime&&t.startTime?e.startTime.isBefore(t.startTime)?-1:e.meal.localeCompare(t.meal):e.startTime?-1:t.startTime?1:e.meal.localeCompare(t.meal)})).map((function(e){return r.a.createElement(v.a.Button,{style:{minWidth:125},key:e.idx,value:e.idx},e.meal)}));return r.a.createElement("div",{className:"Menu",style:t},r.a.createElement(s.a,{type:"flex",justify:"center"},r.a.createElement(o.a,{span:23},r.a.createElement(E.a,{style:{boxShadow:"0px 0px 4px 0px rgba(0, 0, 0, 0.1)",borderRadius:"5px",padding:"0px"},bodyStyle:{padding:"10px"}},r.a.createElement(v.a.Group,{style:{maxWidth:800,margin:"5px"},value:a,buttonStyle:"solid",onChange:function(t){return e.onChangeCampus(t.target.value)}},d),r.a.createElement(y.MobileView,null,r.a.createElement("input",{style:{margin:"5px",fontSize:"16px"},type:"date",value:l.format("YYYY-MM-DD"),onChange:function(t){return e.onChangeDate(h()(t.target.value))}})),r.a.createElement(y.BrowserView,{style:{display:"inline-block"}},r.a.createElement(x.a,{style:{margin:"5px"},value:l,onChange:function(t){return e.onChangeDate(t)},allowClear:!1})),r.a.createElement(v.a.Group,{style:{maxWidth:800,margin:"5px"},value:i,buttonStyle:"solid",onChange:function(t){return e.onChangeDiningHall(t.target.value)}},f),r.a.createElement("br",null),r.a.createElement(v.a.Group,{style:{maxWidth:400,margin:"5px"},value:u,buttonStyle:"solid",onChange:function(t){return e.setState({selectedMenu:t.target.value})}},w)))),r.a.createElement("br",null),r.a.createElement(C.a,{indicator:r.a.createElement(M.a,{type:"loading",style:{fontSize:24},spin:!0}),spinning:g},r.a.createElement(s.a,{type:"flex",justify:"center"},r.a.createElement(o.a,{span:23},r.a.createElement(E.a,{style:{boxShadow:"0px 0px 4px 0px rgba(0, 0, 0, 0.1)",borderRadius:"5px",padding:"0px"},bodyStyle:{padding:"10px"}},p?r.a.createElement("p",null,H,r.a.createElement("br",null),r.a.createElement("i",null,"Hours: ",S," - ",k)):null,this.renderCategories())))))}}]),t}(a.Component),w=u.a.Header,O=u.a.Footer,N=u.a.Content;var T=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(u.a,{style:{backgroundColor:"transparent"}},r.a.createElement(w,{style:{backgroundColor:"transparent",fontSize:"18pt",fontWeight:600}},"MDining Menus"),r.a.createElement(N,{style:{backgroundColor:"transparent"}},r.a.createElement(s.a,{type:"flex",justify:"center"},r.a.createElement(o.a,null,r.a.createElement(k,{style:{maxWidth:"700px"}})))),r.a.createElement(O,{style:{backgroundColor:"transparent"}},"\xa9 2019 Anders Boberg")))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(T,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[132,1,2]]]);
//# sourceMappingURL=main.acffb630.chunk.js.map