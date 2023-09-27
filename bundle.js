(()=>{"use strict";class t{constructor(t,e,s){this.coord_parity=0,this.width=100,this.height=100,this.distance=120,this.max_squares=16,this.squares=[],this.parent=t,this.x=e,this.y=s}create(t){let e;if(t){let s=[];for(let n=0;n<t;n++)e=this.__add_one(),this.squares.push(e),s.push(e);return s}return e=this.__add_one(),this.squares.push(e),e}__add_one(){if(this.squares.length==this.max_squares)throw Error(`SquareGenerator maximum capacity (${this.max_squares}) exceded`);let t=this.p__define_color(),e=function(t,e,s,n,i){let r=document.createElement("div");return r.style.position="absolute",r.style.top=String(e),r.style.left=String(t),r.style.width=String(s),r.style.height=String(n),r.style.backgroundColor=i,r.style.borderRadius="20%",r}(this.x,this.y,this.width,this.height,t);return this.parent.appendChild(e),this.__update_coords(),e}__update_coords(){this.coord_parity%2==0?this.y+=this.distance:(this.x+=this.distance,this.y-=this.distance),this.coord_parity+=1}}const e=["rgb(255, 0, 0)","rgb(0, 0, 255)","rgb(0, 255, 0)","rgb(0, 255, 255)","rgb(255, 51, 153)","rgb(255, 255, 0)","rgb(255, 102, 0)","rgb(102, 0, 204)"];function s(t){return t[Math.floor(Math.random()*t.length)]}const n={clasic:{class:class extends t{constructor(t,e,s){super(t,e,s),this.color_options=["rgb(10, 226, 118)","rgb(255, 115, 0)","rgb(221, 255, 0)","rgb(0, 115, 255)"],this.color_iterator=this.iterator(this.color_options),this.options_index=0}p__define_color(){return console.log(this.color_options),this.color_iterator.next()}iterator(t){let e=0;return{next:function(){return e>=t.length&&(e=0),t[e++]}}}},descr:"Los colores clasicos"},similar:{class:class extends t{constructor(t,n,i){super(t,n,i),this.base_color=s(e),this.base_colorArr=function(t){let e="",s=[];for(let n of t)0==isNaN(n)&&(e+=n),","!=n&&")"!=n||(s.push(parseInt(e)),e="");return s}(this.base_color),this.light_or_dark=0,this.dark_factor=0,this.light_factor=0}p__define_color(){let t;return this.light_or_dark=s([0,1]),0==this.light_or_dark&&(t=this.__darker()),1==this.light_or_dark&&(t=this.__lighter()),`rgb(${t[0]},${t[1]},${t[2]})`}__darker(){let t=this.base_colorArr.map((t=>Math.floor(t*(1-this.dark_factor))));return this.dark_factor+=.1,t}__lighter(){let t=this.base_colorArr.map((t=>Math.floor(t+(255-t)*this.light_factor)));return this.light_factor+=.1,t}},descr:"Gradientes que confunden"},random:{class:class extends t{constructor(t,e,s){super(t,e,s)}p__define_color(){return s(e)}},descr:"Mezcla al azar de colores"}};class i{constructor(){this.options=[],this.curr_sequence=[],this.last_chosed}generate(){let t;do{t=this.__get_option()}while(this.last_chosed==t);return this.last_chosed=t,this.p__generate(this.last_chosed),this.curr_sequence.push(this.last_chosed),this.curr_sequence}add_option(t){this.options.push(t)}empty(){this.curr_sequence=[],this.last_chosed=void 0}__get_option(){let t=Math.floor(Math.random()*this.options.length);return this.options[t]}p__generate(t){}}class r extends i{constructor(){super()}}class o extends i{constructor(t){super(),this.alter_sequence=[],this.displace=t}p__generate(t){let e,s=this.options.indexOf(t);for(let t=0;t<this.displace;t++)e=s+2,s=null==this.options[e]?s%2==0?1:0:e;let n=this.options[s];this.alter_sequence.push(n)}}class h{constructor(t,e){this.element=e,this.element.id=t,this.color=e.style.backgroundColor}change_color(t){this.element.style.backgroundColor=t}setClick_event(t,e){this.element.addEventListener("click",t)}removeClick_event(t){this.element.removeEventListener("click",t)}delete(){this.element.remove()}}class l{constructor(t,e,s,n){this.id=t,this.element=e,this.normal_color=s,this.dark_color=n}animate(){this.element.change_color(this.dark_color),setTimeout((()=>{this.element.change_color(this.normal_color)}),200)}delete(){this.element.delete(),delete this.element}}class c{constructor(t,e){this.ButtonClass=h,this.id=0,this.type=t,this.opacity=e}create(t){this.id+=1;let e=new this.ButtonClass(this.id,t),s=e.color,n=(i=s,r=this.opacity,`rgb(${function(t,e){const s=e/100;let n=t.map((t=>Math.floor(t-t*s)));return n}(function(t){let e="",s=[];for(let n of t)0==isNaN(n)&&(e+=n),","!=n&&")"!=n||(s.push(parseInt(e)),e="");return s}(i),r)})`);var i,r;return new l(this.id,e,s,n)}}class a{constructor(t){this.on_press=t=>{},this.buttons={},this.on_press=t,this.functions={}}add_button(t,e){let s=this.on_press;this.buttons[t]=e,this.functions[t]=function(){return s(e.id)}}activate(t){this.buttons[t].animate()}enable_buttons(){for(let t of Object.keys(this.buttons))this.buttons[t].element.setClick_event(this.functions[t])}disable_buttons(){for(let t of Object.keys(this.buttons))this.buttons[t].element.removeClick_event(this.functions[t])}delete(){for(let t of Object.keys(this.buttons))this.buttons[t].delete(),delete this.buttons[t]}}class u{constructor(t){this.callback=t,this.time_out}new_TimeOut(t){this.time_out=setTimeout(this.callback,t)}delete_timeOut(){clearTimeout(this.time_out)}}function _(t){return new Promise((e=>setTimeout(e,t)))}var d=function(t,e,s,n){return new(s||(s=Promise))((function(i,r){function o(t){try{l(n.next(t))}catch(t){r(t)}}function h(t){try{l(n.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,h)}l((n=n.apply(t,e||[])).next())}))};class p{constructor(t,e,s,n){this.SquareFactory=t,this.on_nextround=e,this.on_finish=s,this.level=0,this.on_game=!0,this.in_round=!1,this.finish_game=this.__finish_game.bind(this),this.response_controller=new u(this.finish_game),this.p__define_timeVars(),this.sequence,this.SequenceGenerator=this.p__build_SequenceGenerator(),this.init_buttons=n,this.press_button=this.press_button.bind(this),this.ButtonFactory=new c("html",50),this.ButtonHandler=this.__build_buttons(this.init_buttons)}start(){this.next_round(!0),this.main_loop()}main_loop(){return d(this,void 0,void 0,(function*(){for(;1==this.on_game;)0==this.in_round&&(this.in_round=!0,yield this.show_sequence(),this.handle_player(),this.response_controller.new_TimeOut(this.time_plyr_response)),yield _(50);this.response_controller.delete_timeOut(),this.ButtonHandler.disable_buttons(),yield _(this.time_btw_round),this.show_sequence(),this.on_finish()}))}next_round(t){return d(this,void 0,void 0,(function*(){this.ButtonHandler.disable_buttons(),this.level++,this.sequence=this.SequenceGenerator.generate(),this.p__nextRound(),this.on_nextround(),t||(yield _(this.time_btw_round)),this.in_round=!1}))}show_sequence(){return d(this,void 0,void 0,(function*(){for(let t of this.sequence)this.ButtonHandler.activate(t),yield _(this.time_btw_sequence)}))}handle_player(){this.player_index=0,this.ButtonHandler.enable_buttons()}__finish_game(){this.p__finish(),this.on_game=!1}__build_buttons(t){let e=new a(this.press_button);for(let s=0;s<t;s++){let t=this.__add_button();e.add_button(t.id,t)}return e}__add_button(){let t=this.SquareFactory.create(),e=this.ButtonFactory.create(t);return this.SequenceGenerator.add_option(e.id),e}press_button(t){this.ButtonHandler.activate(t);let e=this.p__onPress(t);e.correctOption(this.player_index)?(this.response_controller.delete_timeOut(),e.passedRound(this.player_index)?this.next_round():this.response_controller.new_TimeOut(this.time_plyr_response)):this.__finish_game(),this.player_index++}delete(){this.ButtonHandler.delete()}p__define_timeVars(){this.time_btw_round=1e3,this.time_btw_sequence=300,this.time_plyr_response=3e3}}const m={normal:{class:class extends p{constructor(t,e,s,n=10){super(t,e,s,n)}p__build_SequenceGenerator(){return new r}p__onPress(t){return{correctOption:e=>{if(this.sequence[e]==t)return!0},passedRound:t=>{if(this.sequence.length-1==t)return!0}}}p__nextRound(){}p__finish(){}},descr:"Presionar el boton que se encienda"},nextto:{class:class extends p{constructor(t,e,s,n=10){super(t,e,s,n),this.alter_sequence}p__build_SequenceGenerator(){return new o(3)}p__onPress(t){return{correctOption:e=>{if(this.alter_sequence[e]==t)return!0},passedRound:t=>{if(this.alter_sequence.length-1==t)return!0}}}p__nextRound(){this.alter_sequence=this.SequenceGenerator.alter_sequence}p__finish(){this.sequence=this.alter_sequence}},descr:"Presionar el boton que este 3 lugares a la izquierda del encendido"}};window.start=function(){return t=this,e=void 0,i=function*(){y&&y.delete(),f=function(){let t=document.getElementById("square_type"),e=t[t.selectedIndex].value;return n[e].class}(),g=new f(x,400,100),q.innerText="Level:0",v.innerText="",b=function(){let t=document.getElementById("game_mode"),e=t[t.selectedIndex].value;return m[e].class}(),y=new b(g,k,w),yield _(1e3),y.start()},new((s=void 0)||(s=Promise))((function(n,r){function o(t){try{l(i.next(t))}catch(t){r(t)}}function h(t){try{l(i.throw(t))}catch(t){r(t)}}function l(t){var e;t.done?n(t.value):(e=t.value,e instanceof s?e:new s((function(t){t(e)}))).then(o,h)}l((i=i.apply(t,e||[])).next())}));var t,e,s,i};let f,b,g,y,q=document.getElementById("level"),v=document.getElementById("game_over"),x=document.getElementById("game_zone");function w(){v.innerText="Game Over"}function k(){q.innerText=`Level: ${y.level}`}console.log("putoo")})();