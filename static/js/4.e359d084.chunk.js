(this["webpackJsonpsn-ts-template"]=this["webpackJsonpsn-ts-template"]||[]).push([[4],{375:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__M95VY",dialogsItems:"Dialogs_dialogsItems__2nFq3",dialog:"Dialogs_dialog__1OLky",active:"Dialogs_active__3UHKX",messages:"Dialogs_messages__1VmHk",message:"Dialogs_message__1a9NF"}},376:function(e,s,a){"use strict";a.d(s,"a",(function(){return g}));var t=a(8),i=a(140),n=(a(0),a(20)),c=a(14),d=a(1),o=["isAuth"],r=function(e){return{isAuth:e.auth.isAuth}};function g(e){return Object(c.b)(r,{})((function(s){var a=s.isAuth,c=Object(i.a)(s,o);return a?Object(d.jsx)(e,Object(t.a)({},c)):Object(d.jsx)(n.a,{to:"/login"})}))}},381:function(e,s,a){"use strict";a.r(s);a(0);var t=a(375),i=a.n(t),n=a(40),c=a(1),d=function(e){var s="/dialog/"+e.id;return Object(c.jsx)("div",{className:i.a.dialog+" "+i.a.active,children:Object(c.jsx)(n.b,{to:s,children:e.name})})},o=function(e){return Object(c.jsx)("div",{className:i.a.message,children:e.message})},r=a(186),g=a(54),l=a(125),j=Object(l.a)(10),u=Object(r.a)({form:"dialogAddMessageForm"})((function(e){return Object(c.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(c.jsx)("div",{children:Object(g.c)("Enter your message","newMessageBody",g.b,[l.b,j])}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{children:"Send"})})]})})),b=function(e){var s=e.dialogs.map((function(e){return Object(c.jsx)(d,{id:e.id,name:e.name},e.id)})),a=e.messages.map((function(e){return Object(c.jsx)(o,{id:e.id,message:e.message},e.id)}));return Object(c.jsxs)("div",{className:i.a.dialogs,children:[Object(c.jsx)("div",{className:i.a.dialogsItems,children:s}),Object(c.jsxs)("div",{className:i.a.messages,children:[Object(c.jsx)("div",{children:a}),Object(c.jsx)(u,{onSubmit:function(s){e.sendMessage(s.newMessageBody)}})]})]})},m=a(14),O=a(22),h=a(376),f=a(164);s.default=Object(O.d)(Object(m.b)((function(e){return{dialogs:e.dialogsPage.dialogs,messages:e.dialogsPage.messages}}),{sendMessage:f.a.sendMessageAC}),h.a)(b)}}]);
//# sourceMappingURL=4.e359d084.chunk.js.map