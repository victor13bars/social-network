(this["webpackJsonpsn-ts-template"]=this["webpackJsonpsn-ts-template"]||[]).push([[0],{128:function(e,t,n){e.exports={selectedPage:"Paginator_selectedPage__2qyGL"}},129:function(e,t,n){e.exports={userPhoto:"users_userPhoto__CIWxI",selectedPage:"users_selectedPage__2fG4e"}},130:function(e,t,n){e.exports=n.p+"static/media/user.98fd41aa.png"},131:function(e,t,n){e.exports=n.p+"static/media/preloader.088f5f2e.svg"},132:function(e,t,n){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__1yGOj",img:"ProfileInfo_img__3iXWd"}},133:function(e,t,n){e.exports={item:"Post_item__CkvLJ"}},14:function(e,t,n){e.exports={nav:"Navbar_nav__1KpQm",item:"Navbar_item__1T86p",activeLink:"Navbar_activeLink__1Dlvh"}},159:function(e,t,n){e.exports=n(286)},164:function(e,t,n){},24:function(e,t,n){e.exports={dialogs:"Dialogs_dialogs__M95VY",dialogsItems:"Dialogs_dialogsItems__2nFq3",dialog:"Dialogs_dialog__1OLky",active:"Dialogs_active__3UHKX",messages:"Dialogs_messages__1VmHk",message:"Dialogs_message__1a9NF"}},246:function(e,t,n){},286:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(62),s=n.n(o);n(164),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var u=n(7),i=n(123),c=n(10),l=n.n(c),m=n(18),d=n(43),f=n(5),p=n(124),g=n.n(p).a.create({withCredentials:!0,baseURL:"https://social-network.samuraijs.com/api/1.0/",headers:{"api-key":"8eaba7cd-8849-4eb5-b90f-f5fda0cd9786"}}),h=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;return g.get("users?page=".concat(e,"&count=").concat(t)).then((function(e){return e.data}))},E=function(e){return g.post("follow/".concat(e))},v=function(e){return g.delete("follow/".concat(e))},b=function(e){return console.warn("Obsolute method. Please profileAPI object"),O.getProfile(e)},O={getProfile:function(e){return g.get("profile/".concat(e))},getStatus:function(e){return g.get("profile/status/".concat(e))},updateStatus:function(e){return g.put("profile/status",{status:e})}},S=function(){return g.get("auth/me")},w=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return g.post("auth/login",{email:e,password:t,rememberMe:n})},j=function(){return g.delete("auth/login")},C="PROFILE/ADD-POST",k={posts:[{id:1,message:"Hello",likeCount:12},{id:2,message:"How are you?",likeCount:25}],profile:null,status:"123"},P=function(e){return{type:"PROFILE/SET-STATUS",status:e}},_=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:k,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case C:var n={id:5,message:t.newMyPost,likeCount:0};return Object(f.a)(Object(f.a)({},e),{},{posts:[].concat(Object(d.a)(e.posts),[n])});case"PROFILE/SET-USER-PROFILE":return Object(f.a)(Object(f.a)({},e),{},{profile:t.profile});case"PROFILE/SET-STATUS":return Object(f.a)(Object(f.a)({},e),{},{status:t.status});case"PROFILE/DELETE-POST":return Object(f.a)(Object(f.a)({},e),{},{posts:e.posts.filter((function(e){return e.id!=t.postId}))});default:return e}},y={dialogs:[{id:1,name:"Victor"},{id:2,name:"Valera"},{id:3,name:"Veronika"},{id:4,name:"Alex"},{id:5,name:"Dima"},{id:6,name:"Toxa"}],messages:[{id:1,message:"Hello"},{id:2,message:"How are you?"},{id:3,message:"kikii"},{id:4,message:"Alex"},{id:5,message:"Dima"},{id:6,message:"Toxa"}]},T=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"DIALOGS/SEND-MESSAGE":var n=t.newMessageBody;return Object(f.a)(Object(f.a)({},e),{},{messages:[].concat(Object(d.a)(e.messages),[{id:6,message:n}])});default:return e}},I={},U=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:I;return e},N=function(e,t,n,a){return e.map((function(e){return e[n]===t?Object(f.a)(Object(f.a)({},e),a):e}))},A="USERS/FOLLOW",L={users:[],pageSize:5,totalUsersCount:0,currentPage:1,isFetching:!0,followingInProgress:[]},x=function(e){return{type:"USERS/TOGGLE/IS_FETCHING",isFetching:e}},F=function(e,t){return{type:"USERS/TOGGLE/IS_FOLLOWING_PROGRESS",isFetching:e,userId:t}},R=function(e){return{type:"USERS/SET_CURRENT_PAGE",currentPage:e}},M=function(e){return{type:A,id:e}},D=function(e){return{type:"USERS/UNFOLLOW",id:e}},G=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:L,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A:return Object(f.a)(Object(f.a)({},e),{},{users:N(e.users,t.id,"id",{followed:!0})});case"USERS/UNFOLLOW":return Object(f.a)(Object(f.a)({},e),{},{users:N(e.users,t.id,"id",{followed:!1})});case"USERS/SET_USERS":return Object(f.a)(Object(f.a)({},e),{},{users:t.users});case"USERS/SET_CURRENT_PAGE":return Object(f.a)(Object(f.a)({},e),{},{currentPage:t.currentPage});case"USERS/SET_TOTAL_COUNT":return Object(f.a)(Object(f.a)({},e),{},{totalUsersCount:t.totalUsersCount});case"USERS/TOGGLE/IS_FETCHING":return Object(f.a)(Object(f.a)({},e),{},{isFetching:t.isFetching});case"USERS/TOGGLE/IS_FOLLOWING_PROGRESS":return Object(f.a)(Object(f.a)({},e),{},{followingInProgress:t.isFetching?[].concat(Object(d.a)(e.followingInProgress),[t.userId]):e.followingInProgress.filter((function(e){return e!=t.userId}))});default:return e}},z=n(35),B={id:null,email:null,login:null,isFetching:!1,isAuth:!1},H=function(e,t,n,a,r){return{type:"AUTH/SET_USER_DATA",data:{id:e,email:t,login:n,isFetching:a,isAuth:r}}},W=function(){return function(){var e=Object(m.a)(l.a.mark((function e(t){var n,a,r,o,s,u;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,S();case 2:0===(n=e.sent).data.resultCode&&(a=n.data.data,r=a.id,o=a.login,s=a.email,u=a.isFetching,a.isAuth,t(H(r,o,s,u,!0)));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},V=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"AUTH/SET_USER_DATA":return Object(f.a)(Object(f.a)({},e),t.data);default:return e}},Z=n(125),q={initialized:!1},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"INITIALIZED-SUCCESS":return Object(f.a)(Object(f.a)({},e),{},{initialized:!0});default:return e}},K=Object(u.c)({profilePage:_,dialogsPage:T,sidebar:U,usersPage:G,auth:V,form:i.a,app:J}),Q=Object(u.e)(K,Object(u.a)(Z.a));window.store=Q,console.log(window.store);var X=Q,Y=n(8),$=n(11),ee=n(28),te=n(29),ne=n(31),ae=n(30),re=(n(246),n(9)),oe=n(14),se=n.n(oe);console.log(se.a);var ue=function(){return r.a.createElement("nav",{className:se.a.nav},r.a.createElement("div",{className:"".concat(se.a.item," ").concat(se.a.active)},r.a.createElement($.b,{to:"/profile",activeClassName:se.a.activeLink},"Profile")),r.a.createElement("div",{className:se.a.item},r.a.createElement($.b,{to:"/dialogs",activeClassName:se.a.activeLink},"Message")),r.a.createElement("div",{className:se.a.item},r.a.createElement($.b,{to:"/users",activeClassName:se.a.activeLink},"Users")),r.a.createElement("div",{className:se.a.item},r.a.createElement($.b,{to:"/news",activeClassName:se.a.activeLink},"News")),r.a.createElement("div",{className:se.a.item},r.a.createElement($.b,{to:"/music",activeClassName:se.a.activeLink},"Music")),r.a.createElement("div",{className:se.a.item},r.a.createElement($.b,{to:"/settings",activeClassName:se.a.activeLink},"Settings")))},ie=function(e){return r.a.createElement("div",null,"News")},ce=function(e){return r.a.createElement("div",null,"Music")},le=function(e){return r.a.createElement("div",null,"Settings")},me=n(24),de=n.n(me),fe=function(e){var t="/dialog/"+e.id;return r.a.createElement("div",{className:de.a.dialog+" "+de.a.active},r.a.createElement($.b,{to:t},e.name))},pe=function(e){return r.a.createElement("div",{className:de.a.message},e.message)},ge=n(121),he=n(122),Ee=n(37),ve=n(52),be=n.n(ve),Oe=function(e){if(!e)return"Field is required"},Se=function(e){return function(t){if(t.length>e)return"Max length is ".concat(e," symbols")}},we=function(e){e.input;var t=e.meta,n=t.touched,a=t.error,o=e.children,s=n&&a;return r.a.createElement("div",{className:be.a.formControl+" "+(s?be.a.error:"")},r.a.createElement("div",null,o),s&&r.a.createElement("span",null,a))},je=function(e){var t=e.input,n=(e.meta,e.child,Object(Ee.a)(e,["input","meta","child"]));return r.a.createElement(we,e,r.a.createElement("textarea",Object.assign({},t,n)))},Ce=function(e){var t=e.input,n=(e.meta,e.child,Object(Ee.a)(e,["input","meta","child"]));return r.a.createElement(we,e,r.a.createElement("input",Object.assign({},t,n)))},ke=function(e,t,n,a){var o=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{},s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:"";return r.a.createElement("div",null,r.a.createElement(ge.a,Object.assign({placeholder:e,name:t,component:n,validate:a},o)),s)},Pe=Se(10),_e=Object(he.a)({form:"dialogAddMessageForm"})((function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("div",null,r.a.createElement(ge.a,{component:je,name:"newMessageBody",placeholder:"Enter your message ",validate:[Oe,Pe]})),r.a.createElement("div",null,r.a.createElement("button",null,"Send")))})),ye=function(e){var t=e.dialogs.map((function(e){return r.a.createElement(fe,{id:e.id,key:e.id,name:e.name})})),n=e.messages.map((function(e){return r.a.createElement(pe,{id:e.id,message:e.message,key:e.id})}));return r.a.createElement("div",{className:de.a.dialogs},r.a.createElement("div",{className:de.a.dialogsItems},t),r.a.createElement("div",{className:de.a.messages},r.a.createElement("div",null,n),r.a.createElement(_e,{onSubmit:function(t){console.log(t),e.sendMessage(t.newMessageBody)}})))},Te=function(e){return{isAuth:e.auth.isAuth}};function Ie(e){return Object(Y.b)(Te,{})((function(t){t.isAuth;var n=Object(Ee.a)(t,["isAuth"]);return t.isAuth?r.a.createElement(e,n):r.a.createElement(re.a,{to:"/login"})}))}var Ue=Object(u.d)(Object(Y.b)((function(e){return{dialogs:e.dialogsPage.dialogs,messages:e.dialogsPage.messages}}),(function(e){return{sendMessage:function(t){e(function(e){return{type:"DIALOGS/SEND-MESSAGE",newMessageBody:e}}(t))}}})),Ie)(ye),Ne=n(128),Ae=n.n(Ne),Le=function(e){for(var t=Math.ceil(e.totalUsersCount/e.pageSize),n=[],a=1;a<=t;a++)n.push(a);return r.a.createElement("div",null,n.map((function(t){return r.a.createElement("span",{className:e.currentPage===t?Ae.a.selectedPage:"",onClick:function(n){e.onPageChanged(t)}},t)})))},xe=n(129),Fe=n.n(xe),Re=n(130),Me=n.n(Re),De=function(e){var t=e.user,n=e.followingInProgress,a=e.unfollowThunkCreator,o=e.followThunkCreator;return r.a.createElement("div",null,r.a.createElement("span",null,r.a.createElement("div",null,r.a.createElement($.b,{to:"/profile/"+t.id},r.a.createElement("img",{src:null!=t.photos.small?t.photos.small:Me.a,className:Fe.a.userPhoto}))),r.a.createElement("div",null,t.followed?r.a.createElement("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){a(t.id)}},"Unfollow"):r.a.createElement("button",{disabled:n.some((function(e){return e===t.id})),onClick:function(){o(t.id)}},"Follow"))),r.a.createElement("span",null,r.a.createElement("span",null,r.a.createElement("div",null,t.name),r.a.createElement("div",null,t.status)),r.a.createElement("span",null,r.a.createElement("div",null,"u.location.country"),r.a.createElement("div",null,"u.location.city"))))},Ge=function(e){var t=e.pageSize,n=e.totalUsersCount,a=e.currentPage,o=e.onPageChanged,s=Object(Ee.a)(e,["pageSize","totalUsersCount","currentPage","onPageChanged"]);return r.a.createElement("div",null,r.a.createElement(Le,{pageSize:t,totalUsersCount:n,currentPage:a,onPageChanged:o}),r.a.createElement("div",null,s.users.map((function(e){return r.a.createElement(De,{user:e,key:e.id,followingInProgress:s.followingInProgress,followThunkCreator:s.followThunkCreator,unfollowThunkCreator:s.unfollowThunkCreator})}))))},ze=n(131),Be=n.n(ze),He=function(){return r.a.createElement("div",null,r.a.createElement("img",{src:Be.a}))},We=function(e){return e.usersPage.users},Ve=function(e){return e.usersPage.pageSize},Ze=function(e){return e.usersPage.totalUsersCount},qe=function(e){return e.usersPage.currentPage},Je=function(e){return e.usersPage.isFetching},Ke=function(e){return e.usersPage.followingInProgress},Qe=function(e){Object(ne.a)(n,e);var t=Object(ae.a)(n);function n(){var e;Object(ee.a)(this,n);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(e=t.call.apply(t,[this].concat(r))).onPageChanged=function(t){var n=e.props;(0,n.getUsersThunkCreator)(t,n.pageSize)},e}return Object(te.a)(n,[{key:"componentDidMount",value:function(){var e=this.props,t=e.currentPage,n=e.pageSize;this.props.getUsersThunkCreator(t,n)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,this.props.isFetching?r.a.createElement(He,null):null,r.a.createElement(Ge,{totalUsersCount:this.props.totalUsersCount,pageSize:this.props.pageSize,currentPage:this.props.currentPage,onPageChanged:this.onPageChanged,users:this.props.users,followSuccess:this.props.followSuccess,unfollowSuccess:this.props.unfollowSuccess,followingInProgress:this.props.followingInProgress,unfollowThunkCreator:this.props.unfollowThunkCreator,followThunkCreator:this.props.followThunkCreator}))}}]),n}(r.a.Component),Xe=Object(u.d)(Object(Y.b)((function(e){return{users:We(e),pageSize:Ve(e),totalUsersCount:Ze(e),currentPage:qe(e),isFetching:Je(e),followingInProgress:Ke(e)}}),{followSuccess:M,unfollowSuccess:D,setCurrentPage:R,getUsersThunkCreator:function(e,t){return function(){var n=Object(m.a)(l.a.mark((function n(a){var r;return l.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a(x(!0)),a(R(e)),n.next=4,h(e,t);case 4:r=n.sent,a(x(!1)),a({type:"USERS/SET_USERS",users:r.items}),a({type:"USERS/SET_TOTAL_COUNT",totalUsersCount:r.totalCount});case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()},followThunkCreator:function(e){return function(){var t=Object(m.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(F(!0,e)),t.next=3,E(e);case 3:0===t.sent.data.resultCode&&n(M(e)),n(F(!1,e));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},unfollowThunkCreator:function(e){return function(){var t=Object(m.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(F(!0,e)),t.next=3,v(e);case 3:0===t.sent.data.resultCode&&n(D(e)),n(F(!1,e));case 6:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}),Ie)(Qe),Ye=n(132),$e=n.n(Ye),et=n(90),tt=function(e){var t=Object(a.useState)(!1),n=Object(et.a)(t,2),o=n[0],s=n[1],u=Object(a.useState)(e.status),i=Object(et.a)(u,2),c=i[0],l=i[1];Object(a.useEffect)((function(){l(e.status)}),[e.status]);return r.a.createElement("div",null,!o&&r.a.createElement("div",null,r.a.createElement("span",{onDoubleClick:function(){s(!0)}},e.status||"----------------")),o&&r.a.createElement("div",null,r.a.createElement("input",{onChange:function(e){l(e.currentTarget.value)},autoFocus:!0,onBlur:function(){s(!1),e.updateStatusThunkCreator(c)},value:c})))},nt=function(e){var t=e.profile,n=e.status,a=e.updateStatusThunkCreator;return t?r.a.createElement("div",null,r.a.createElement("div",{className:$e.a.descriptionBlock},r.a.createElement("img",{src:t.photos.large,alt:""}),r.a.createElement("div",null,t.aboutMe),r.a.createElement("div",null,t.lookingForAJobDescription),r.a.createElement(tt,{status:n,updateStatusThunkCreator:a}))):r.a.createElement(He,null)},at=n(88),rt=n.n(at),ot=n(133),st=n.n(ot),ut=function(e){return r.a.createElement("div",{className:st.a.item},r.a.createElement("img",{src:"https://avatars.mds.yandex.net/get-pdb/750997/2f4a61ff-0c60-41d6-a2f1-049bc4ee8f21/s1200?webp=false",alt:""}),e.message,r.a.createElement("div",null,r.a.createElement("span",null,"like")," ",e.likeCount))},it=Se(10),ct=r.a.memo((function(e){console.log(e.posts);var t=e.posts.map((function(e){return r.a.createElement(ut,{id:e.id,message:e.message,likeCount:e.likeCount})}));return r.a.createElement("div",{className:rt.a.postsBlock},r.a.createElement("h3",null,"My posts"),r.a.createElement(lt,{onSubmit:function(t){e.addPost(t.newMyPost)}}),r.a.createElement("div",{className:rt.a.posts},t))})),lt=Object(he.a)({form:"profileAddNewMyPost"})((function(e){return r.a.createElement("form",{onSubmit:e.handleSubmit},r.a.createElement("div",null,r.a.createElement(ge.a,{component:je,name:"newMyPost",placeholder:"Enter your post",validate:[Oe,it]})),r.a.createElement("div",null,r.a.createElement("button",null,"Add post")))})),mt=ct,dt=Object(Y.b)((function(e){return{posts:e.profilePage.posts}}),(function(e){return{addPost:function(t){e(function(e){return{type:C,newMyPost:e}}(t))}}}))(mt),ft=function(e){return r.a.createElement("div",null,r.a.createElement(nt,{profile:e.profile,status:e.status,updateStatusThunkCreator:e.updateStatusThunkCreator}),r.a.createElement(dt,null))},pt=function(e){Object(ne.a)(n,e);var t=Object(ae.a)(n);function n(){return Object(ee.a)(this,n),t.apply(this,arguments)}return Object(te.a)(n,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserId),this.props.getUserProfileThunkCreator(e),this.props.getStatusThunkCreator(e)}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(ft,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatusThunkCreator:this.props.updateStatusThunkCreator})))}}]),n}(r.a.Component),gt=Object(u.d)(Object(Y.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.id,isAuth:e.auth.isAuth}}),{getUserProfileThunkCreator:function(e){return function(){var t=Object(m.a)(l.a.mark((function t(n){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,b(e);case 2:a=t.sent,n({type:"PROFILE/SET-USER-PROFILE",profile:a.data});case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},getStatusThunkCreator:function(e){return function(){var t=Object(m.a)(l.a.mark((function t(n){var a;return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.getStatus(e);case 2:a=t.sent,n(P(a.data));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()},updateStatusThunkCreator:function(e){return function(){var t=Object(m.a)(l.a.mark((function t(n){return l.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,O.updateStatus(e);case 2:0===t.sent.data.resultCode&&n(P(e));case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()}}),re.f,Ie)(pt),ht=n(89),Et=n.n(ht),vt=function(e){var t;return r.a.createElement("header",{className:Et.a.header},r.a.createElement("img",{src:"https://miro.medium.com/max/1200/1*OQOVtYZWdAqGkWmZT4_BFw.jpeg",alt:""}),r.a.createElement("div",{className:Et.a.loginBlock},(null===(t=e.auth)||void 0===t?void 0:t.isAuth)?r.a.createElement("div",null,e.auth.login," - ",r.a.createElement("button",{onClick:e.logout})):r.a.createElement($.b,{to:"/login"},"Login")))},bt=function(e){Object(ne.a)(n,e);var t=Object(ae.a)(n);function n(){return Object(ee.a)(this,n),t.apply(this,arguments)}return Object(te.a)(n,[{key:"render",value:function(){return r.a.createElement(vt,Object.assign({},this.props,{auth:this.props.auth,logout:this.props.logout}))}}]),n}(r.a.Component),Ot=Object(Y.b)((function(e){return{auth:e.auth}}),{getAuthUserDataThunk:W,logout:function(){return function(){var e=Object(m.a)(l.a.mark((function e(t){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j();case 2:0===e.sent.data.resultCode&&t(H(null,null,null,!1,!1));case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()}})(bt),St=Object(he.a)({form:"login"})((function(e){var t=e.handleSubmit,n=e.error;return r.a.createElement("form",{onSubmit:t},ke("Email","email",Ce,[Oe]),ke("Password","password",Ce,[Oe],{type:"password"}),ke(null,"rememberMe",Ce,[],{type:"checkbox"},"remember me"),n&&r.a.createElement("div",{className:be.a.formSummaryError},n),r.a.createElement("div",null,r.a.createElement("button",null,"Login")))})),wt=Object(Y.b)((function(e){return{isAuth:e.auth.isAuth}}),{login:function(e,t,n){return function(){var a=Object(m.a)(l.a.mark((function a(r){var o,s;return l.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,w(e,t,n);case 2:0===(o=a.sent).data.resultCode?r(W()):(s=o.data.messages.length>0?o.data.messages[0]:"Some error",r(Object(z.a)("login",{_error:s})));case 4:case"end":return a.stop()}}),a)})));return function(e){return a.apply(this,arguments)}}()}})((function(e){return e.isAuth?r.a.createElement(re.a,{to:"/profile"}):r.a.createElement("div",null,r.a.createElement("h1",null,"Login"),r.a.createElement(St,{onSubmit:function(t){e.login(t.email,t.password,t.rememberMe)}}))})),jt=function(e){Object(ne.a)(n,e);var t=Object(ae.a)(n);function n(){return Object(ee.a)(this,n),t.apply(this,arguments)}return Object(te.a)(n,[{key:"componentDidMount",value:function(){this.props.initializeAppThunk()}},{key:"render",value:function(){return this.props.initialized?r.a.createElement("div",{className:"app-wrapper"},r.a.createElement(Ot,null),r.a.createElement(ue,null),r.a.createElement("div",{className:"app-wrapper-content"},r.a.createElement(re.b,{path:"/dialogs",render:function(){return r.a.createElement(Ue,null)}}),r.a.createElement(re.b,{path:"/profile/:userId?",render:function(){return r.a.createElement(gt,null)}}),r.a.createElement(re.b,{path:"/users",render:function(){return r.a.createElement(Xe,null)}}),r.a.createElement(re.b,{path:"/news",component:ie}),r.a.createElement(re.b,{path:"/music",component:ce}),r.a.createElement(re.b,{path:"/settings",component:le}),r.a.createElement(re.b,{path:"/login",render:function(){return r.a.createElement(wt,null)}}))):r.a.createElement(He,null)}}]),n}(r.a.Component),Ct=Object(u.d)(Object(Y.b)((function(e){return{initialized:e.app.initialized}}),{initializeAppThunk:function(){return function(e){e(W()).then((function(){e({type:"INITIALIZED-SUCCESS"})}))}}}),re.f)(jt);s.a.render(r.a.createElement($.a,null,r.a.createElement(Y.a,{store:X},r.a.createElement(Ct,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},52:function(e,t,n){e.exports={formControl:"FormsControls_formControl___qzNh",error:"FormsControls_error__31HZd",formSummaryError:"FormsControls_formSummaryError__1zDUG"}},88:function(e,t,n){e.exports={postsBlock:"MyPosts_postsBlock__2PbKd",posts:"MyPosts_posts__1RwQ4"}},89:function(e,t,n){e.exports={header:"Header_header__3vImZ",loginBlock:"Header_loginBlock__EIyyf"}}},[[159,1,2]]]);
//# sourceMappingURL=main.56fbf3bb.chunk.js.map