webpackJsonp([5],{247:function(n,l,t){"use strict";function e(n){return i._25(0,[(n()(),i._5(0,null,null,7,"div",[["class","header"]],null,null,null,null,null)),(n()(),i._24(null,["\n      "])),(n()(),i._5(0,null,null,1,"ion-icon",[["class","icon-retour"],["name","arrow-round-back"],["role","img"]],[[2,"hide",null]],[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.goBack()&&e),e},null,null)),i._3(147456,null,0,E.a,[P.a,i.k,i.D],{name:[0,"name"]},null),(n()(),i._24(null,["\n      "])),(n()(),i._5(0,null,null,1,"h1",[],null,null,null,null,null)),(n()(),i._24(null,[" "," "])),(n()(),i._24(null,["\n  "]))],function(n,l){n(l,3,0,"arrow-round-back")},function(n,l){var t=l.component;n(l,2,0,i._19(l,3)._hidden),n(l,6,0,t.ev.name)})}function a(n){return i._25(0,[(n()(),i._24(null,["\n      "])),(n()(),i._5(0,null,null,1,"ion-icon",[["class","icon-retour"],["name","arrow-round-back"],["role","img"]],[[2,"hide",null]],[[null,"click"]],function(n,l,t){var e=!0;return"click"===l&&(e=!1!==n.component.goBack()&&e),e},null,null)),i._3(147456,null,0,E.a,[P.a,i.k,i.D],{name:[0,"name"]},null),(n()(),i._24(null,["\n    "])),(n()(),i._5(0,null,null,1,"div",[["class","header"]],null,null,null,null,null)),(n()(),i._24(null,["\n    "])),(n()(),i._24(null,["\n  "]))],function(n,l){n(l,2,0,"arrow-round-back")},function(n,l){n(l,1,0,i._19(l,2)._hidden)})}function o(n){return i._25(0,[i._22(402653184,1,{mapCanvas:0}),(n()(),i._5(0,null,null,10,"ion-content",[],[[2,"statusbar-padding",null],[2,"has-refresher",null]],null,null,I.b,I.a)),i._3(4374528,null,0,B.a,[P.a,A.a,D.a,i.k,i.D,L.a,N.a,i.y,[2,R.a],[2,V.a]],null,null),(n()(),i._24(1,["\n  "])),(n()(),i.Z(16777216,null,1,1,null,e)),i._3(16384,null,0,x.i,[i.N,i.J],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(n()(),i._24(1,["\n  "])),(n()(),i.Z(0,[["noEV",2]],1,0,null,a)),(n()(),i._24(1,["\n  \n  "])),(n()(),i._5(0,[[1,0],["mapCanvas",1]],1,1,"div",[["id","map-canvas"]],null,null,null,null,null)),(n()(),i._24(null,["\n  "])),(n()(),i._24(1,["\n\n"])),(n()(),i._24(null,["\n"]))],function(n,l){n(l,5,0,l.component.ev,i._19(l,7))},function(n,l){n(l,1,0,i._19(l,2).statusbarPadding,i._19(l,2)._hasRefresher)})}Object.defineProperty(l,"__esModule",{value:!0});var i=t(0),u=t(3),r=t(77),c=t(84),s=t(78),d=new c.d(48.8566,2.3522),_=function(){function n(n,l,t){this.navCtrl=n,this.navParams=l,this.geolocation=t}return n.prototype.ngAfterViewInit=function(){this.initPage()},n.prototype.initPage=function(){this.ev=this.navParams.get("ev"),this.getEVCoordinates(),setTimeout(this.loadMap.bind(this),1e3)},n.prototype.getEVCoordinates=function(){var n=this;this.ev&&this.geolocation.getPlace(this.ev.name).subscribe(function(l){if(l.results[0]){var t=l.results[0].geometry.location;n.ev.coordinates=new c.d(t.lat,t.lng),n.ev.address=l.results[0].formatted_address}else n.ev.coordinates=d})},n.prototype.loadMap=function(){var n=this,l=this.ev.coordinates?this.ev.coordinates:d;this.map=c.a.create(this.mapCanvas.nativeElement,{controls:{compass:!0,myLocationButton:!0,indoorPicker:!0,zoom:!0},gestures:{scroll:!0,tilt:!0,rotate:!0,zoom:!0},camera:{target:l,tilt:30,zoom:15,bearing:50}}),this.map.one(c.b.MAP_READY).then(function(){n.loadMarker(l)})},n.prototype.loadMarker=function(n){var l=this;if(n!==d)this.map.addMarker({position:n,icon:"#68D7A5",animation:"BOUNCE"}).then(function(n){l.loadInfoBox(n)});else this.map.addMarker({position:n,title:"Espace vert actuellement non accessible !",icon:"#68D7A5",animation:"BOUNCE"}).then(function(n){return n.showInfoWindow()})},n.prototype.loadInfoBox=function(n){var l=new c.c,t=document.createElement("div");t.innerHTML=["<h2>"+this.ev.name+"</h2>","<p>"+this.ev.address+"</p>"].join(""),t.classList.add("info-box"),l.setContent(t),l.open(n),n.on(c.b.MARKER_CLICK).subscribe(function(){l.open(n)})},n.prototype.goBack=function(){this.navCtrl.pop()},n}();Object(u.__decorate)([Object(i.M)("mapCanvas"),Object(u.__metadata)("design:type","function"==typeof(p=void 0!==i.k&&i.k)&&p||Object)],_.prototype,"mapCanvas",void 0),_=Object(u.__decorate)([Object(i.i)({selector:"page-map",templateUrl:"map.html"}),Object(u.__metadata)("design:paramtypes",["function"==typeof(f=void 0!==r.h&&r.h)&&f||Object,"function"==typeof(m=void 0!==r.i&&r.i)&&m||Object,"function"==typeof(v=void 0!==s.a&&s.a)&&v||Object])],_);var p,f,m,v,h=function(){return function(){}}();h=Object(u.__decorate)([Object(i.v)({declarations:[_],imports:[r.e.forChild(_)]})],h);var b=t(201),g=t(202),k=t(203),y=t(204),j=t(205),C=t(206),O=t(207),M=t(208),w=t(209),E=t(38),P=t(1),I=t(210),B=t(20),A=t(4),D=t(9),L=t(8),N=t(24),R=t(5),V=t(19),x=t(12),z=t(11),U=i._2({encapsulation:2,styles:[],data:{}}),J=i._0("page-map",_,function(n){return i._25(0,[(n()(),i._5(0,null,null,1,"page-map",[],null,null,null,o,U)),i._3(4243456,null,0,_,[V.a,z.a,s.a],null,null)],null,null)},{},{},[]),K=t(16),T=t(123),Z=t(37);t.d(l,"MapPageModuleNgFactory",function(){return F});var F=i._1(h,[],function(n){return i._16([i._17(512,i.j,i.X,[[8,[b.a,g.a,k.a,y.a,j.a,C.a,O.a,M.a,w.a,J]],[3,i.j],i.w]),i._17(4608,x.k,x.j,[i.u]),i._17(4608,K.r,K.r,[]),i._17(4608,K.d,K.d,[]),i._17(512,x.b,x.b,[]),i._17(512,K.p,K.p,[]),i._17(512,K.e,K.e,[]),i._17(512,K.n,K.n,[]),i._17(512,T.a,T.a,[]),i._17(512,T.b,T.b,[]),i._17(512,h,h,[]),i._17(256,Z.a,_,[])])})}});