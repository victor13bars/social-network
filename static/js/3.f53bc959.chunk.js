(this["webpackJsonpsn-ts-template"]=this["webpackJsonpsn-ts-template"]||[]).push([[3],{291:function(e,t,a){e.exports={descriptionBlock:"ProfileInfo_descriptionBlock__1yGOj",img:"ProfileInfo_img__3iXWd"}},292:function(e,t,a){e.exports={postsBlock:"MyPosts_postsBlock__2PbKd",posts:"MyPosts_posts__1RwQ4"}},293:function(e,t,a){e.exports={item:"Post_item__CkvLJ"}},294:function(e,t,a){"use strict";a.r(t);var n=a(35),r=a(36),s=a(39),o=a(38),u=a(0),l=a.n(u),i=a(291),c=a.n(i),p=a(65),m=a(128),d=function(e){var t=Object(u.useState)(!1),a=Object(m.a)(t,2),n=a[0],r=a[1],s=Object(u.useState)(e.status),o=Object(m.a)(s,2),i=o[0],c=o[1];Object(u.useEffect)((function(){c(e.status)}),[e.status]);return l.a.createElement("div",null,!n&&l.a.createElement("div",null,l.a.createElement("span",{onDoubleClick:function(){r(!0)}},e.status||"----------------")),n&&l.a.createElement("div",null,l.a.createElement("input",{onChange:function(e){c(e.currentTarget.value)},autoFocus:!0,onBlur:function(){r(!1),e.updateStatusThunkCreator(i)},value:i})))},f=function(e){var t=e.profile,a=e.status,n=e.updateStatusThunkCreator;return t?l.a.createElement("div",null,l.a.createElement("div",{className:c.a.descriptionBlock},l.a.createElement("img",{src:t.photos.large,alt:""}),l.a.createElement("div",null,t.aboutMe),l.a.createElement("div",null,t.lookingForAJobDescription),l.a.createElement(d,{status:a,updateStatusThunkCreator:n}))):l.a.createElement(p.a,null)},h=a(292),b=a.n(h),E=a(293),k=a.n(E),v=function(e){return l.a.createElement("div",{className:k.a.item},l.a.createElement("img",{src:"https://avatars.mds.yandex.net/get-pdb/750997/2f4a61ff-0c60-41d6-a2f1-049bc4ee8f21/s1200?webp=false",alt:""}),e.message,l.a.createElement("div",null,l.a.createElement("span",null,"like")," ",e.likeCount))},g=a(87),C=a(127),j=a(55),O=a(33),P=Object(j.a)(10),S=l.a.memo((function(e){console.log(e.posts);var t=e.posts.map((function(e){return l.a.createElement(v,{id:e.id,message:e.message,likeCount:e.likeCount})}));return l.a.createElement("div",{className:b.a.postsBlock},l.a.createElement("h3",null,"My posts"),l.a.createElement(_,{onSubmit:function(t){e.addPost(t.newMyPost)}}),l.a.createElement("div",{className:b.a.posts},t))})),_=Object(C.a)({form:"profileAddNewMyPost"})((function(e){return l.a.createElement("form",{onSubmit:e.handleSubmit},l.a.createElement("div",null,l.a.createElement(g.a,{component:O.b,name:"newMyPost",placeholder:"Enter your post",validate:[j.b,P]})),l.a.createElement("div",null,l.a.createElement("button",null,"Add post")))})),T=S,y=a(13),M=a(95),w=Object(y.b)((function(e){return{posts:e.profilePage.posts}}),(function(e){return{addPost:function(t){e(Object(M.a)(t))}}}))(T),B=function(e){return l.a.createElement("div",null,l.a.createElement(f,{profile:e.profile,status:e.status,updateStatusThunkCreator:e.updateStatusThunkCreator}),l.a.createElement(w,null))},A=a(8),I=a(94),N=a(7),x=function(e){Object(s.a)(a,e);var t=Object(o.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(r.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userId;e||(e=this.props.authorizedUserId),this.props.getUserProfileThunkCreator(e),this.props.getStatusThunkCreator(e)}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement(B,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatusThunkCreator:this.props.updateStatusThunkCreator})))}}]),a}(l.a.Component);t.default=Object(N.d)(Object(y.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.id,isAuth:e.auth.isAuth}}),{getUserProfileThunkCreator:M.d,getStatusThunkCreator:M.c,updateStatusThunkCreator:M.e}),A.f,I.a)(x)}}]);
//# sourceMappingURL=3.f53bc959.chunk.js.map