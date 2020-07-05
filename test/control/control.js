(() => { 'use strict';
	'⯈⯆◉⭗⭘⚫⚪☘❦⠿Ⲽ∥≬⛓─│┌┐└┘├┤┬┴┼━┃┏┓┗┛┣┫┳┻╋═║╔╗╚╝╠╣╦╩╬';
	/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
	╔╦╗-╔╦╦╗--╔╦╗-╔╦╦╦╦╦╦╗--╔╦╗-╔╦╦╦╦╦╦╦╗-╔╦╦╦╦╦╦╦╗--╔╦╦╦╦╦╗-
	╠╬╣-╠╬╬╬╗-╠╬╣-╠╬╬╩╩╩╬╬╗-╠╬╣-╠╬╬╩╩╩╩╩╝-╠╬╬╩╩╩╩╩╝-╔╬╬╩╩╩╬╬╗
	╠╬╣-╠╬╬╬╬╗╠╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╬╦╦╦╗---╠╬╣-╔╦╦╦╗-╠╬╣---╠╬╣
	╠╬╣-╠╬╣╚╬╬╬╬╣-╠╬╣---╠╬╣-╠╬╣-╠╬╬╩╩╩╝---╠╬╣-╚╩╬╬╣-╠╬╣---╠╬╣
	╠╬╣-╠╬╣-╚╬╬╬╣-╠╬╬╦╦╦╬╬╝-╠╬╣-╠╬╬╦╦╦╦╦╗-╠╬╬╦╦╦╬╬╣-╚╬╬╦╦╦╬╬╝
	╚╩╝-╚╩╝--╚╩╩╝-╚╩╩╩╩╩╩╝--╚╩╝-╚╩╩╩╩╩╩╩╝-╚╩╩╩╩╩╩╩╝--╚╩╩╩╩╩╝-
	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
	/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
		UTILITIES
	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
	Math.rand = (min, max) => Math.trunc(Math.random()*(max-min+1))+min;
	Element.prototype.newChild = function(element, ...attr) {
		let el = document.createElement(element);
		attr.forEach(attr => {
			attr      = attr.split('|');
			let name  = attr[0];
			let value = attr[1]
			if (!value) value = '';
			el.setAttribute(name, value);
		});
		Object.defineProperty(el, 'css', {
			set: function(css) {
				Object.entries(css).forEach(([key, value]) => {
					let fix = [null, 'Ms', 'Moz', 'Webkit'];
					for(let i=0, len=fix.length, type; i<len; i++) {
						type = !i ? key : fix[i]+key.replace(key[0], key[0].toUpperCase());
						if(typeof this.style[type] === 'string') {
							this.style[type] = value;
							break;
						}
					}
				});
			}
		});
		this.append(el);
		return el;
	}
	/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
		CONTROL PROGRAM
	━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
	Object.defineProperties(self.Control = {}, {
		id    : { value:[] },
		change: { set: function(data) {

		}},
		create: { set: function(data) {

			let Theme = {
				t_color:[], t_backgroundColor:[],
				t_borderColor:[], t_textShadow:[],
			}
			Object.defineProperties(Theme, {
				color: { value:[], writable:true },
				style: { value: {
					'indiego'  : ['#508', '#CCC', '#FCD', '#F7B', '#FCD', '#FCD', '#555', '#333'],
					'seagreen' : ['#456', '#CCC', '#2BA', '#088', '#0FF', '#2BA', '#456', '#333'],
				}},
				change: { set: function(style) {
					this.color = this.style[style.toLowerCase()];
				}},
			});
			let t_ctrl  = document.body.newChild('div');
			let t_head  = t_ctrl.newChild('div');
			let t_theme = t_ctrl.newChild('div');
			let t_body  = t_ctrl.newChild('div');
			t_ctrl.css = {
				width : data.width+'px',
				left  : innerWidth-data.width+'px',
			}
			Theme.color = Theme.style[data.theme.toLowerCase()];
			Theme.canvas = t_theme;
			Theme.body  = t_body;
			data.items.forEach(data => this.switch = [data, t_body, Theme]);
			this.createHeader = [t_ctrl, t_head, t_body, Theme, data.title, data.isEnable];
			this.createTheme = Theme;
			Theme.change = data.theme;
		}},
		switch: { set: function([data, target, Theme]) {

			switch(data.type.toLowerCase()) {
				case 'group'    : this.createGroup    = [data, target, Theme];
					break;
				case 'column'   : this.createColumn   = [data, target, Theme];
					break;
				case 'slider'   : this.createSlider   = [data, target, Theme];
					break;
				case 'check'    : this.createCheck    = [data, target, Theme];
					break;
				case 'text'     : this.createText     = [data, target, Theme];
					break;
				case 'file'     : this.createFile     = [data, target, Theme];
					break;
				case 'radio'    : this.createRadio    = [data, target, Theme];
					break;
				case 'dropdown' : this.createDropdown = [data, target, Theme];
					break;
				default:break;
			}
		}},
		createTheme: { set: function(Theme) {
			let canvas  = Theme.canvas.newChild('canvas');
			Theme.canvas.css = {
				width           : '100%',
				height          : '30px',
				backgroundColor : Theme.color[7],
			}
			canvas.css = {
				width           : Theme.canvas.clientHeight*3+'px',
				height          : Theme.canvas.clientHeight+'px',
			}
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
			Theme.canvas.css = {
				display         : 'none',
			}
			{
				/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
					COLOR MIXER
				━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
				let mixer = (col1, col2, div) => {
					let rgb = [], rgb1 = [], rgb2 = [];
					for(let i=1; i<7; i+=2) {
						rgb1[rgb1.length] = parseInt(col1.substr(i, 2), 16);
						rgb2[rgb2.length] = parseInt(col2.substr(i, 2), 16);
					}
					for(let i=0; i<3; i++) {
						rgb[i] = rgb1[i]+(rgb2[i]-rgb1[i])*div;
						rgb[i] = parseInt(rgb[i]).toString(16);
						if(rgb[i].length < 2) rgb[i] = '0'+rgb[i];
					}
					return '#'+rgb[0]+rgb[1]+rgb[2];
				}
				let hsl = (hue, sat, lig) => {

				}
				let to_hsl = col => {
					let hue = '';
					let sat = 0;
					let lig = 0;
					let rgb = [];
					for(let i=1; i<7; i+=2) {
						rgb[rgb.length] = parseInt(col1.substr(i, 2), 16);
					}
					return [hue, sat, lig];
				}
				let x, y, old_x, old_y, cx, cy,
					w = canvas.width,
					h = canvas.height,
					t_2d = canvas.getContext('2d'),
					c_ryb  = [
						'#FE2712', // Red	 <=>	#FC600A R-O
						'#FB9902', // Orange <=>	#FCCB1A Y-O
						'#FEFE33', // Yellow <=>	#B2D732 Y-G
						'#66B032', // Green	 <=>	#347C98 B-G
						'#0247FE', // Blue	 <=>	#4424D6 B-P
						'#8601AF', // Purple <=>	#C21460 R-P
					],
					c_sch = 0,	/* ===== Schemes =====
												 [0] Monochromatic
												 [1] Complementary
												 [2] Analogous
												 [3] Analogous Inverse
												 [4] Triadic
												 [5] Triadic Inverse
												 [6] Compound
												 [7] Compound Inverse
											*/
					c_mlt = 255, // Multiplier
					c_now = 0,
					c_max = c_ryb.length*c_mlt, // 1530 Colors
					c_sat = 100,
					c_lig = 50,
					c_rad = h/2,
					c_arc = c_max/(2*Math.PI),
					hue_1, hue_2, hue_3, hue_4, hue_5,
					sat_1, sat_2, sat_3, sat_4, sat_5,
					lig_1, lig_2, lig_3, lig_4, lig_5,
					loc_c = [w*4/9, h*1/4],
					loc_1 = [w*4/9, h*3/4],
					loc_2 = [w*6/9, h*1/4],
					loc_3 = [w*6/9, h*3/4],
					loc_4 = [w*8/9, h*1/4],
					loc_5 = [w*8/9, h*3/4];


				let c_wheel = () => {
					t_2d.clearRect(0, 0, c_rad*2, c_rad*2);
					let anti_clockwise = false;
					let c_rot = c_max*(3/4)/c_arc;

					if(c_sch == 3 || c_sch == 5 || c_sch == 7) {
						anti_clockwise = true;
						c_rot = 0;
					}
					// Draw RYB Wheel
					for(let i=0, max=c_mlt/6, len=c_max/c_mlt*6; i<len; i++) {
						let col1 = Math.trunc(i/6);
						let col2 = col1+1;
						let div  = i/6-col1;
						if(col2 >= c_ryb.length) col2 %= c_ryb.length;
						let hue  = mixer(c_ryb[col1], c_ryb[col2], div);
						t_2d.strokeStyle = hue;
						t_2d.lineWidth = 3;
						t_2d.beginPath();
						{
							let start = i*max/c_arc+c_rot;
							let end   = (i+1)*max/c_arc+c_rot;
							if(anti_clockwise) {
								start = c_arc-start;
								end   = c_arc-end;
							}
							t_2d.arc(c_rad, c_rad, c_rad-4, start, end, anti_clockwise);
						}
						t_2d.stroke();
					}

					t_2d.translate(c_rad, c_rad);
					t_2d.lineWidth = 2;

					let now  = anti_clockwise ? c_max-c_now : c_now;
					let col1 = Math.trunc(now/c_mlt);
					let div  = now/c_mlt-col1;
					let col2 = col1+1;
					if(col1 >= c_ryb.length) col1 %= c_ryb.length;
					if(col2 >= c_ryb.length) col2 %= c_ryb.length;
					let hue  = mixer(c_ryb[col1], c_ryb[col2], div);

					// Draw point;
					t_2d.fillStyle = hue;
					t_2d.beginPath();
					t_2d.arc(0, 0, 2, 0, 2*Math.PI);
					t_2d.fill();

					// Draw Arrow 1
					t_2d.strokeStyle = hue;
					t_2d.rotate(c_now/c_arc);
					t_2d.beginPath();
					t_2d.moveTo(0, -3);
					t_2d.lineTo(0, -c_rad*1/2);
					t_2d.stroke();

					// Draw Arrow 2
					if(c_sch) {
						if(c_sch == 2 || c_sch == 3) {
							t_2d.rotate(-Math.PI*1/6);
							if(c_sch == 2) {
								col1 = Math.trunc((now+c_max*11/12)/c_mlt);
								div = (now+c_max*11/12)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*1/12)/c_mlt);
								div = (now+c_max*1/12)/c_mlt-col1;
							}
						}
						else if(c_sch == 4 || c_sch == 5) {
							t_2d.rotate(Math.PI*2/3);
							if(c_sch == 4) {
								col1 = Math.trunc((now+c_max*1/3)/c_mlt);
								div = (now+c_max*1/3)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*2/3)/c_mlt);
								div = (now+c_max*2/3)/c_mlt-col1;
							}
						}
						else if(c_sch == 6 || c_sch == 7) {
							t_2d.rotate(Math.PI*5/6);
							if(c_sch == 6) {
								col1 = Math.trunc((now+c_max*5/12)/c_mlt);
								div = (now+c_max*5/12)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*7/12)/c_mlt);
								div = (now+c_max*7/12)/c_mlt-col1;
							}
						}
						col2 = col1+1;
						if(col1 >= c_ryb.length) col1 %= c_ryb.length;
						if(col2 >= c_ryb.length) col2 %= c_ryb.length;
						hue = mixer(c_ryb[col1], c_ryb[col2], div);
						t_2d.strokeStyle = hue;
					}
					t_2d.beginPath();
					t_2d.moveTo(0, -3);
					t_2d.lineTo(0, -c_rad*1/2);
					t_2d.stroke();

					// Draw Arrow 3
					if(c_sch) {
						if(c_sch == 1) {
							t_2d.rotate(Math.PI);
							col1 = Math.trunc((now+c_max*1/2)/c_mlt);
							div = (now+c_max*1/2)/c_mlt-col1;
						}
						else if(c_sch == 2 || c_sch == 3) {
							t_2d.rotate(Math.PI*2/6);
							if(c_sch == 2) {
								col1 = Math.trunc((now+c_max*1/12)/c_mlt);
								div = (now+c_max*1/12)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*11/12)/c_mlt);
								div = (now+c_max*11/12)/c_mlt-col1;
							}
						}
						else if(c_sch == 4 || c_sch == 5) {
							t_2d.rotate(Math.PI*2/3);
							if(c_sch == 4) {
								col1 = Math.trunc((now+c_max*2/3)/c_mlt);
								div = (now+c_max*2/3)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*1/3)/c_mlt);
								div = (now+c_max*1/3)/c_mlt-col1;
							}
						}
						else if(c_sch == 6 || c_sch == 7) {
							t_2d.rotate(Math.PI*2/6);
							if(c_sch == 6) {
								col1 = Math.trunc((now+c_max*7/12)/c_mlt);
								div = (now+c_max*7/12)/c_mlt-col1;
							}
							else {
								col1 = Math.trunc((now+c_max*5/12)/c_mlt);
								div = (now+c_max*5/12)/c_mlt-col1;
							}
						}
						col2 = col1+1;
						if(col1 >= c_ryb.length) col1 %= c_ryb.length;
						if(col2 >= c_ryb.length) col2 %= c_ryb.length;
						hue = mixer(c_ryb[col1], c_ryb[col2], div);
						t_2d.strokeStyle = hue;
					}
					t_2d.beginPath();
					t_2d.moveTo(0, -3);
					t_2d.lineTo(0, -c_rad*1/2);
					t_2d.stroke();

					// Reset Matrix 
					t_2d.setTransform(1, 0, 0, 1, 0, 0);
				}
				c_wheel();

				let hitCircle = (x, y, width, mask=1) => {
					let angle = Math.atan2(x, y);
					let cx = Math.sin(angle)*mask;
					let cy = Math.cos(angle)*mask;
					let dx = Math.abs(x-cx);
					let dy = Math.abs(y-cy);
					let status = dx*dx + dy*dy < width*width;
					return status;
				}
				let angle = (x, y) => -Math.atan2(x, y)+Math.PI;

				let canvas_is_down,
					wheel_is_down,
					col_c_is_down,
					col_1_is_down,
					col_2_is_down,
					col_3_is_down,
					col_4_is_down,
					col_5_is_down,
					is_hit_wheel,
					is_hit_c_hue,
					is_hit_col_c,
					is_hit_col_1,
					is_hit_col_2,
					is_hit_col_3,
					is_hit_col_4,
					is_hit_col_5;

				canvas.onmousemove = e => {
					cx = e.layerX-e.target.offsetLeft;
					cy = e.layerY-e.target.offsetTop;
					is_hit_wheel = hitCircle(cx-c_rad, cy-c_rad, c_rad-9);
					is_hit_c_hue = hitCircle(cx-c_rad, cy-c_rad, 2, c_rad-4);
					if(!canvas_is_down) {
						if(is_hit_wheel)
							canvas.css = { cursor:'crosshair' }
						else if(is_hit_c_hue)
							canvas.css = { cursor:'pointer' }
						else
							canvas.css = { cursor:'auto' }
					}
				}
				canvas.onmousedown = e => {
					old_x = e.pageX;
					old_y = e.pageY;
					canvas_is_down = true;
					if(is_hit_wheel) {
						x = cx-c_rad;
						y = cy-c_rad;
						wheel_is_down = true;
					}
					else if(is_hit_c_hue) {
						x = cx-c_rad;
						y = cy-c_rad;
						c_now = parseInt(c_arc*angle(x, y));
						if(c_now < 0) c_now = c_max-1;
						if(c_now >= c_max) c_now = 0;
						c_wheel(c_sch, c_now);
					}
				}
				canvas.onmouseup = e => {
					if(is_hit_wheel && wheel_is_down) {
						c_sch++;
						if(c_sch > 7) c_sch = 0;
						c_wheel(c_sch, c_now);
					}
				}
				let mousemove = e => {
					// Canvas Events
					if(wheel_is_down) {
						canvas.css = { cursor:'crosshair' }
						x += e.pageX-old_x;
						y += e.pageY-old_y;
						old_x = e.pageX;
						old_y = e.pageY;
						c_now = parseInt(c_arc*angle(x, y));
						if(c_now < 0) c_now = c_max-1;
						if(c_now >= c_max) c_now = 0;
						c_wheel(c_sch, c_now);
					}
				}
				let mousedown = e => {

				}
				let mouseup = e => {
					if(wheel_is_down && !is_hit_wheel) {
						canvas.css = { cursor:'auto' }
					}
					canvas_is_down =
					wheel_is_down =
					false;
				}
				window.addEventListener('mousemove', mousemove);
				window.addEventListener('mousedown', mousedown);
				window.addEventListener('mouseup', mouseup);
			}
		}},
		createHeader: { set: function([t_ctrl, t_head, t_body, Theme, title, isEnable]) {
			let t_move  = t_head.newChild('div');
			let t_coll  = t_head.newChild('div');
			let t_title = t_head.newChild('div');
			let t_theme = t_head.newChild('div');
			let t_size  = t_head.newChild('div');
			let i_coll  = t_coll.newChild('div');
			let i_theme = t_theme.newChild('div');
			t_move.innerText  = '⠿';
			i_coll.innerText  = isEnable ? '⯆' : '⯈';
			i_theme.innerText  = '❦';
			t_title.innerText = title;
			t_size.innerText  = '∥';
			t_ctrl.css = {
				userSelect      : 'none',
				position        : 'fixed',
				top             : '0',
				minWidth        : '90px',
				textAlign       : 'center',
				fontFamily      : 'sans-serif',
				borderBottom    : '5px double '+Theme.color[0],
			}
			t_head.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				backgroundColor : Theme.color[0],
			}
			t_title.css = {
				flexGrow        : '1',
				padding         : '4px 0',
				color           : Theme.color[0],
				fontSize        : 'small',
				fontWeight      : 'bold',
				textShadow      : '-1px -1px '+Theme.color[1]+', 1px -1px '+Theme.color[1]+', -1px 1px '+Theme.color[1]+', 1px 1px '+Theme.color[1],
				overflow        : 'hidden',
				textOverflow    : 'ellipsis',
			}
			t_move.css = t_size.css = {
				minWidth        : '10px',
				color           : Theme.color[0],
				backgroundColor : Theme.color[1]+'6',
			}
			t_move.css = {
				padding         : '2px 0 1px 0',
			}
			t_size.css = {
				padding         : '1px 0 1px 0',
			}
			t_coll.css = t_theme.css = {
				margin          : '4px',
				minWidth        : '10px',
				width           : '10px',
				height          : '10px',
				fontSize        : 'x-small',
				color           : Theme.color[1],
				border          : '1px solid '+Theme.color[1],
				cursor          : 'pointer',
				overflow        : 'hidden',
			}
			i_coll.css = i_theme.css = {
				marginTop       : '-2px',
			}
			t_body.css = {
				width           : '100%',
				height          : 'auto',
				overflow        : 'hidden',
				display         : isEnable ? 'block' : 'none',
			}
			t_move.css = { cursor:'move' }
			t_size.css = { cursor:'e-resize' }
			t_coll.onmouseover = t_theme.onmouseover = e => {
				e.target.css = {
					color           : Theme.color[0],
					backgroundColor : Theme.color[1],
					borderColor     : Theme.color[0],
				}
			}
			t_coll.onmouseout = t_theme.onmouseout = e => {
				e.target.css = {
					color           : Theme.color[1],
					backgroundColor : 'transparent',
					borderColor     : Theme.color[1],
				}
			}
			t_coll.onmousedown = e => {
				isEnable = isEnable ? false : true;
				i_coll.innerText = isEnable ? '⯆' : '⯈';
				t_body.css = { display: isEnable ? 'block' : 'none' }
			}
			let isOpen;
			t_theme.onmousedown = e => {
				isOpen = isOpen ? false : true;
				Theme.canvas.css = { display: isOpen ? 'block' : 'none' }
			}
			{
				let x, y, old_x, old_y,
					t_move_is_down = false,
					t_size_is_down = false,
					t_body_is_down = false,
					win_w  = innerWidth,
					win_h  = innerHeight,
					min_w  = parseFloat(t_ctrl.style.minWidth),
					ctrl_h = t_ctrl.offsetHeight,
					head_w = t_head.offsetWidth,
					head_h = t_head.offsetHeight,
					body_h = t_body.offsetHeight,
					body_t = 0,
					x_now  = t_ctrl.offsetLeft,
					y_now  = t_ctrl.offsetTop,
					x_min  = 0,
					y_min  = 0,
					x_max  = win_w-head_w,
					y_max  = win_h-head_h;

				/*━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
					DISPLAY CONTROLS
				━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━*/
				let t_ctrl_move = () => {
					if(x_now < x_min) x_now = x_min;
					if(y_now < y_min) y_now = y_min;
					if(x_now > x_max) x_now = x_max;
					if(y_now > y_max) y_now = y_max;
					t_ctrl.style.left = x_now+'px';
					t_ctrl.style.top  = y_now+'px';
				}
				let t_ctrl_width = () => {
					if(head_w < min_w) head_w = min_w;
					if(head_w > win_w) head_w = win_w;
					x_max = win_w-head_w;
					t_ctrl.style.width = head_w+'px';
				}
				let t_ctrl_height = () => {
					if(ctrl_h != t_ctrl.offsetHeight) ctrl_h = t_ctrl.offsetHeight;
					if(body_h != t_body.offsetHeight) body_h = t_body.offsetHeight;
					fix_height();
				}
				let fix_height = loop => {
					if(ctrl_h+y_now > win_h ) {
						t_body.style.height = body_h-(ctrl_h+y_now-win_h)+'px';
						t_body.scrollTop = body_t;
					}
					else if(!loop) {
						if(!t_body.scrollTop || t_move_is_down) {
							t_body.style.height = 'auto';
						}
						if(ctrl_h != t_ctrl.offsetHeight) ctrl_h = t_ctrl.offsetHeight;
						if(body_h != t_body.offsetHeight) body_h = t_body.offsetHeight;
						fix_height(true);
					}
				}
				t_move.onmousedown = e => {
					old_x = e.pageX;
					old_y = e.pageY;
					t_move_is_down = true;
				}
				t_size.onmousedown = e => {
					old_x = e.pageX;
					t_size_is_down = true;
				}
				t_body.onmousedown = e => {
					old_y = e.pageY;
					t_body_is_down = true;
				}
				t_body.onwheel = e => {
					t_body.scrollTop += e.deltaY;
					body_t = t_body.scrollTop;
				}
				t_body.onkeyup = t_ctrl_height;
				let mousemove = e => {
					if(t_move_is_down) {
						x      = e.pageX;
						y      = e.pageY;
						x_now += x-old_x;
						y_now += y-old_y;
						old_x  = x;
						old_y  = y;
						fix_height();
						t_ctrl_move();
					}
					if(t_size_is_down) {
						x       = e.pageX;
						head_w += x-old_x;
						old_x   = x;
						t_ctrl_width();
						t_ctrl_move();
					}
					if(t_body_is_down) {
						y      = e.pageY;
						t_body.scrollTop -= y-old_y;
						body_t = t_body.scrollTop;
						old_y  = y;
					}
				}
				let mousedown = e => {
					t_ctrl_height()
				}
				let mouseup = e => {
					t_move_is_down =
					t_size_is_down =
					t_body_is_down =
					false;
				}
				let keydown = e => {
					t_ctrl_height()
				}
				let resize = e => {
					win_w = innerWidth;
					win_h = innerHeight;
					x_max = win_w-head_w;
					y_max = win_h-head_h;
					if(x_now < x_min || y_now < y_min || x_now > x_max || y_now > y_max)
						fix_height();
						t_ctrl_move();
					if(head_w < min_w || head_w > win_w)
						t_ctrl_width();
				}
				window.addEventListener('mousemove', mousemove);
				window.addEventListener('mousedown', mousedown);
				window.addEventListener('mouseup', mouseup);
				window.addEventListener('keydown', keydown);
				window.addEventListener('resize', resize);
			}
		}},
		createGroup: { set: function([data, target, Theme]) {

			let t_group = target.newChild('div');
			let t_head  = t_group.newChild('div');
			let t_coll  = t_head.newChild('div');
			let t_label = t_head.newChild('div');
			let t_items = t_group.newChild('div');
			t_coll.innerText  = data.isEnable ? '⯆' : '⯈';
			t_label.innerText = data.label;
			t_head.css = {
				backgroundColor : Theme.color[2],
				borderLeft      : '2px solid '+Theme.color[3],
				borderBottom    : '1px solid '+Theme.color[6],
			}
			t_coll.css = {
				padding         : '1px 0',
				float           : 'left',
				width           : '14px',
				fontSize        : 'xx-small',
			}
			t_label.css = {
				padding         : '2px 13px 2px 0',
				color           : Theme.color[2],
				fontSize        : 'xx-small',
				fontWeight      : 'bold',
				textShadow      : '-1px -1px '+Theme.color[7]+', 1px -1px '+Theme.color[7]+', -1px 1px '+Theme.color[7]+', 1px 1px '+Theme.color[7],
				overflow        : 'hidden',
				textOverflow    : 'ellipsis',
			}
			t_items.css = {
				marginLeft : '1px',
				padding    : '0',
				display    : data.isEnable ? 'block' : 'none',
			}
			t_head.onmousedown = e => {
				data.isEnable = data.isEnable ? false : true;
				t_coll.innerText = data.isEnable ? '⯆' : '⯈';
				t_items.css = { display: data.isEnable ? 'block' : 'none' }
			}
			data.items.forEach(data => this.switch = [data, t_items, Theme]);
		}},
		createColumn: { set: function([data, target, Theme]) {

			let t_column = target.newChild('div');
			t_column.css = {
				display  : 'flex',
				flexWrap : 'nowrap',
			}
			data.items.forEach(item => {
				let t_items = t_column.newChild('div');
				t_items.css = {
					width   : 100/data.items.length+'%',
				}
				this.switch = [item, t_items, Theme];
			});
		}},
		createSlider: { set: function([data, target, Theme]) {

			let t_slide = target.newChild('div');
			let t_wrap  = t_slide.newChild('div');
			let t_icon  = t_wrap.newChild('canvas');
			let t_label = t_wrap.newChild('div');
			let t_value = t_wrap.newChild('div');
			let t_graph = t_slide.newChild('div');
			t_label.innerText = data.label;
			t_graph.innerText = ' ';
			t_slide.css = {
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
				cursor          : 'e-resize',
			}
			t_wrap.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				height          : '0',
			}
			t_icon.css = {
				margin          : '2px 0 0 2px',
				width           : '7px',
				height          : '7px',
				color           : Theme.color[4],
				border          : '1px solid '+Theme.color[4],
				borderRadius    : '4px',
			}
			t_label.css = t_value.css = {
				padding         : '1px 2px',
				height          : t_graph.clientHeight-4+'px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
			}
			t_label.css = {
				flexGrow        : '1',
				overflow        : 'hidden',
				textOverflow    : 'ellipsis',
				textAlign       : 'left',
			}
			t_graph.css = {
				margin          : '1px 0 1px 0',
				width           : '0%',
				backgroundColor : Theme.color[6],
				fontSize        : 'xx-small',
				textAlign       : 'right',
			}
			{
				let x, old_x, d = data,
					t_slide_is_down = false,
					o_val = d.value,
					o_min = d.min,
					o_max = d.max,
					o_stp = d.step,
					step  = 10**((d.step+'').length-1),
					w_100 = 100/t_slide.clientWidth,
					x_100 = 100/(d.max-d.min),
					x_now = d.value*x_100,
					x_min = 0,
					x_max = 100,
					i_rad = t_icon.clientHeight/2,
					i_arc = x_max/(2*Math.PI),
					i_rot = x_max*0.75/i_arc;

				t_icon.width = t_icon.height = t_icon.clientWidth;
				let t_2d = t_icon.getContext('2d');
				t_2d.strokeStyle = Theme.color[4];
				t_2d.lineWidth = i_rad/2;
				let draw_2d = arc => {
					if(arc > x_max*0.999) arc = x_max*0.999;
					t_2d.beginPath();
					t_2d.arc(i_rad, i_rad, i_rad/2, i_rot, (x_max-arc)/i_arc+i_rot, true);
					t_2d.clearRect(0, 0, i_rad*2, i_rad*2);
					t_2d.stroke();
				}
				draw_2d(x_now);
				t_graph.css = { width:x_now+'%' }
				t_value.innerText = d.value+d.unit;
				t_slide.onmouseover = e => {
					t_icon.css = {
						backgroundColor : Theme.color[4],
						borderColor     : Theme.color[7],
					}
					t_2d.strokeStyle = Theme.color[6];
					draw_2d(x_now);
				}
				t_slide.onmouseout = e => {
					t_icon.css = {
						backgroundColor : 'transparent',
						borderColor     : Theme.color[4],
					}
					t_2d.strokeStyle = Theme.color[4];
					draw_2d(x_now);
				}
				t_slide.onmousedown = e => {
					if(!d.isEnable) return;
					old_x = e.pageX;
					if(w_100 != 100/t_slide.clientWidth) w_100 = 100/t_slide.clientWidth;
					if(o_min != d.min || o_max != d.max) x_100 = 100/(d.max-d.min);
					if(o_stp != d.step) step = 10**((d.step+'').length-1);
					t_slide_is_down = true;
				}
				window.addEventListener('mouseup', e => {
					if(!d.isEnable) return;
					t_slide_is_down = false;
				});
				window.addEventListener('mousemove', e => {
					if(!d.isEnable) return;
					if(t_slide_is_down) {
						x      = e.pageX;
						x_now += (x-old_x)*w_100;
						old_x  = x;
						if(x_now < x_min) x_now = x_min;
						if(x_now > x_max) x_now = x_max;
						t_graph.css = { width:x_now+'%' }
						draw_2d(x_now);
						let value  = x_now/x_100+d.min;
						value = value.toFixed(d.fixed);
						value = (value*step-((value*step-d.min*step)%(d.step*step)))/step;
						if(o_val != value) {
							o_val   = value;
							d.value = value;
							t_value.innerText = value.toFixed(d.fixed)+d.unit;
						}
					}
				});
			}
		}},
		createCheck: { set: function([data, target, Theme]) {

			let t_check  = target.newChild('div');
			let t_icon   = t_check.newChild('div');
			let t_label  = t_check.newChild('div');
			let t_toggle = t_icon.newChild('div');
			t_label.innerText = data.label;
			t_toggle.innerText = data.value ? '✔' : '';
			t_check.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
				cursor          : 'pointer',
			}
			t_icon.css = {
				margin          : '2px 0 0 2px',
				minWidth        : '7px',
				height          : '7px',
				color           : Theme.color[4],
				border          : '1px solid '+Theme.color[4],
				fontSize        : 'xx-small',
				textAlign       : 'left',
				cursor          : 'pointer',
			}
			t_toggle.css = {
				fontSize        : '7px',
				margin          : '-2px 0 0 1px',
			}
			t_label.css = {
				flexGrow        : '1',
				padding         : '1px 2px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				overflow        : 'hidden',
				textOverflow    : 'ellipsis',
				textAlign       : 'left',
			}
			t_check.onmouseover = e => {
				t_icon.css = {
					color           : Theme.color[7],
					backgroundColor : Theme.color[4],
					borderColor     : Theme.color[7],
				}
			}
			t_check.onmouseout = e => {
				t_icon.css = {
					color           : Theme.color[4],
					backgroundColor : 'transparent',
					borderColor     : Theme.color[4],
				}
			}
			t_check.addEventListener('mousedown', e => {
				if(!data.isEnable) return;
				data.value = data.value ? false : true;
				t_toggle.innerText = data.value ? '✔' : '';
			});
		}},
		createRadio: { set: function([data, target, Theme]) {

			let t_radio = target.newChild('div');
			t_radio.css = {
				display         : 'flex',
				flexFlow        : 'row wrap',
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
			}
			let items = [];
			data.items.forEach((label, i) => {
				let t_item   = t_radio.newChild('div');
				let t_icon   = t_item.newChild('div');
				let t_label  = t_item.newChild('div');
				let t_toggle = t_icon.newChild('div');
				t_label.innerText = label;
				t_toggle.innerText = data.value == i ? '☉' : '';
				items[i] = t_toggle;
				t_item.css = {
					flexBasis       : 100/data.column+'%',
					cursor          : 'pointer',
				}
				t_icon.css = {
					float           : 'left',
					margin          : '2px 0 0 2px',
					width           : '7px',
					height          : '7px',
					color           : Theme.color[4],
					fontSize        : 'xx-small',
					border          : '1px solid '+Theme.color[4],
					borderRadius    : '4px',
				}
				t_toggle.css = {
					fontSize        : '7px',
					margin          : '-2px 0 0 0',
				}
				t_label.css = {
					margin          : '1px 0',
					padding         : '0 0 0 2px',
					color           : Theme.color[4],
					fontSize        : 'xx-small',
					overflow        : 'hidden',
					textOverflow    : 'ellipsis',
					textAlign       : 'left',
				}
				t_item.onmouseover = e => {
					t_icon.css = {
						color           : Theme.color[7],
						backgroundColor : Theme.color[4],
						borderColor     : Theme.color[7],
					}
				}
				t_item.onmouseout = e => {
					t_icon.css = {
						color           : Theme.color[4],
						backgroundColor : 'transparent',
						borderColor     : Theme.color[4],
					}
				}
				t_item.addEventListener('mousedown', e => {
					if(!data.isEnable) return;
					if(data.value != i) {
						data.value = i;
						items.forEach(item => item.innerText = '');
						t_toggle.innerText = '☉';
					}
				});
			});
		}},
		createText: { set: function([data, target, Theme]) {

			let t_text   = target.newChild('div');
			let t_icon   = t_text.newChild('div');
			let t_label  = t_text.newChild('div');
			let t_holder = t_text.newChild('div');
			let t_value  = t_text.newChild('div');
			let t_coll   = t_icon.newChild('div');
			t_coll.innerText = '⚎';
			t_label.innerText = data.label+' :';
			t_value.contentEditable = 'true';
			t_value.spellcheck = false;
			t_value.innerText = data.value;
			t_holder.innerText = data.holder;
			if(data.value) t_holder.style.display = 'none';
			t_text.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
			}
			t_icon.css = {
				margin          : '2px 0 0 2px',
				minWidth        : '7px',
				height          : '7px',
				color           : Theme.color[4],
				border          : '1px solid '+Theme.color[4],
				fontSize        : 'xx-small',
				cursor          : 'pointer',
			}
			t_coll.css = {
				fontSize        : '7px',
				marginTop       : '-2px',
			}
			t_label.css = {
				margin          : '1px 2px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				textAlign       : 'left',
			}
			t_value.css = {
				flexGrow        : '1',
				margin          : '1px 2px 1px 0',
				minHeight       : t_label.clientHeight-2+'px',
				height          : t_value.style.minHeight,
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				overflow        : 'hidden',
				textOverflow    : 'ellipsis',
				textAlign       : 'justify',
				cursor          : 'text',
			}
			t_holder.css = {
				padding         : '1px 0 1px 2px',
				color           : Theme.color[4]+'9',
				fontSize        : 'xx-small',
				fontStyle       : 'oblique',
				cursor          : 'text',
			}
			{
				let old_y, drag = false, focus = false, convert = true;
				t_value.onfocus = e => {
					if(!data.isEnable) return t_value.blur();
				}
				t_value.onkeyup = e => {
					if(!data.isEnable) return;
					data.value = t_value.innerText;
					if(data.value.charCodeAt() == 10 && data.value.length == 1) {
						data.value = t_value.innerText = '';
					}
				}
				t_icon.onmouseover = t_holder.onmouseover = t_value.onmouseover = e => {
					t_icon.css = {
						color           : Theme.color[7],
						backgroundColor : Theme.color[4],
						borderColor     : Theme.color[7],
					}
				}
				t_icon.onmouseout = t_holder.onmouseout = t_value.onmouseout = t_value.onblur = e => {
					t_icon.css = {
						color           : Theme.color[4],
						backgroundColor : 'transparent',
						borderColor     : Theme.color[4],
					}
				}
				t_icon.onmousedown = e => {
					focus = true;
				}
				t_holder.onmousedown = e => {
					focus = true;
				}
				t_value.onmousedown = e => {
					old_y = e.pageY;
					drag  = true;
					focus = true;
				}
				t_value.onmousemove = e => {
					if(drag) {
						Theme.body.scrollTop += e.pageY-old_y;
						old_y = e.pageY;
					}
				}
				let mousedown = e => {
					if(focus) {
						if(convert) {
							t_value.innerText = t_value.innerText.replace(/↵/g, '\n').replace(/ /g, ' ');
							convert = false;
						}
						t_value.css = {
							width         : t_text.clientWidth-4+'px',
							height        : 'auto',
							wordBreak     : 'break-all',
						}
						t_text.style.flexWrap = 'wrap';
						t_holder.style.display = 'none';
						setTimeout(()=>t_value.focus(),0);
						focus = false;
					} else {
						t_value.innerText = t_value.innerText.replace(/\n/g, '↵').replace(/ /g, ' ');
						convert = true;
						t_value.css = {
							width         : 'auto',
							height        : t_value.style.minHeight,
							wordBreak     : 'keep-all',
						}
						t_text.style.flexWrap = 'nowrap';
						if(!data.value) t_holder.style.display = 'inherit';
					}
				}
				let mouseup = e => drag = false;
				window.addEventListener('mousedown', mousedown);
				window.addEventListener('mouseup', mouseup);
			}
		}},
		createFile: { set: function([data, target, Theme]) {

			let t_file   = target.newChild('div');
			let t_adder = t_file.newChild('div');
			let t_label  = t_file.newChild('div');
			let t_value  = t_file.newChild('div');
			t_label.innerText = data.label+' :';
			if(!data.value) data.value = [];
			t_adder.innerHTML = '<div>✛</div>';
			t_file.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
			}
			t_adder.css = {
				margin          : '2px 0 0 2px',
				minWidth        : '7px',
				height          : '7px',
				color           : Theme.color[4],
				border          : '1px solid '+Theme.color[4],
				fontSize        : '7px',
				cursor          : 'pointer',
			}
			t_adder.firstChild.style.marginTop = '-2px';
			t_label.css = {
				margin          : '1px 1px 1px 2px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				textAlign       : 'left',
				cursor          : 'crosshair',
			}
			t_value.css = {
				flexGrow        : '1',
				padding         : '0 0 1px 0',
				minHeight       : t_label.clientHeight+'px',
				height          : t_value.style.minHeight,
				color           : Theme.color[4],
				textAlign       : 'justify',
				fontSize        : 'xx-small',
				overflow        : 'hidden',
				cursor          : 'crosshair',
			}
			let open_list = false, is_open = false, icon_down = false;
			if(data.value.length) remake();
			let remake = () => {
				t_value.innerHTML = '';
				if(!data.value.length) {
					return;
				};
				data.value.forEach((file, i) => {
					let rows = t_value.newChild('div');
					let icon = rows.newChild('div');
					let name = rows.newChild('div');
					name.innerText = '‣ '+file.name.replace(/ /g, ' ');
					icon.innerHTML = '<div>✕</div>';
					rows.css = {
						overflow     : 'hidden',
					}
					name.css = {
						padding      : '1px 0 0 2px',
						wordBreak    : 'keep-all',
						overflow     : 'hidden',
						textOverflow : 'ellipsis',
					}
					icon.css = {
						float        : 'right',
						margin       : '2px 2px 0 0',
						width        : '7px',
						height       : '7px',
						color        : Theme.color[4],
						fontSize     : '7px',
						textAlign    : 'center',
						border       : '1px solid '+Theme.color[4],
						cursor       : 'pointer',
					}
					icon.firstChild.style.marginTop = '-2px';
					icon.firstChild.style.marginleft = '2px';
					name.onmousedown = e => {
						if(!data.isEnable) return;
					};
					icon.onmouseover = e => {
						icon.css = {
							color           : Theme.color[7],
							backgroundColor : Theme.color[4],
							borderColor     : Theme.color[7],
						}
					}
					icon.onmouseout = e => {
						icon.css = {
							color           : Theme.color[4],
							backgroundColor : 'transparent',
							borderColor     : Theme.color[4],
						}
					}
					icon.onmousedown = e => {
						if(!data.isEnable) return;
						data.value.splice(i, 1);
						remake();
						icon_down = true;
					}
				});
			}
			t_adder.onmouseover = e => {
				t_adder.css = {
						color           : Theme.color[7],
						backgroundColor : Theme.color[4],
						borderColor     : Theme.color[7],
				}
			}
			t_adder.onmouseout = e => {
				t_adder.css = {
						color           : Theme.color[4],
						backgroundColor : 'transparent',
						borderColor     : Theme.color[4],
				}
			}
			t_adder.onmousedown = e => {
				if(!data.isEnable) return;
				if(is_open) open_list = true;
				let fileInput = document.createElement('input');
				fileInput.type = 'file';
				fileInput.accept = data.accept;
				fileInput.multiple = data.multiple;
				fileInput.onchange = e => {
					if(!is_open) {
						t_file.css = {
							flexWrap      : 'wrap',
						}
						t_value.css = {
							width         : t_file.clientWidth-4+'px',
							height        : 'auto',
							border        : '1px dotted '+Theme.color[4],
						}
					}
					is_open = true;
					if(data.multiple) data.value.push(...e.target.files);
					else data.value = [e.target.files[0]];
					remake();
				}
				fileInput.click();
				fileInput.remove();
			};
			t_label.onmousedown = e => {
				if(!data.isEnable) return;
				open_list = true;
			};
			t_value.onmousedown = e => {
				if(!data.isEnable) return;
				if(!icon_down) open_list = true;
				if(is_open) open_list = true;
				icon_down = false;
			};
			let mousedown = e => {
				if(!data.isEnable) return;
				if(open_list && data.value.length) {
					if(!is_open) {
						t_file.css = {
							flexWrap      : 'wrap',
						}
						t_value.css = {
							width         : t_file.clientWidth-4+'px',
							height        : 'auto',
							border        : '1px dotted '+Theme.color[4],
						}
						is_open = true;
					}
				}
				if(!open_list || !data.value.length) {
					if(is_open) {
						t_file.css = {
							flexWrap      : 'nowrap',
						}
						t_value.css = {
							width         : 'auto',
							height        : t_value.style.minHeight,
							border        : '0',
						}
						is_open = false;
					}
				}
				open_list = false;
			}
			window.addEventListener('mousedown', mousedown);
		}},
		createDropdown: { set: function([data, target, Theme]) {
			
			let t_drop  = target.newChild('div');
			let t_icon  = t_drop.newChild('div');
			let t_label = t_drop.newChild('div');
			let t_value = t_drop.newChild('div');
			let t_coll  = t_icon.newChild('div');
			t_label.innerText = data.label+' :';
			t_coll.innerText = '⮟';
			t_drop.css = {
				display         : 'flex',
				flexWrap        : 'nowrap',
				backgroundColor : Theme.color[7],
				borderLeft      : '2px solid '+Theme.color[5],
				borderBottom    : '1px solid '+Theme.color[6],
			}
			t_icon.css = {
				margin          : '2px 0 0 2px',
				minWidth        : '7px',
				height          : '7px',
				color           : Theme.color[4],
				border          : '1px solid '+Theme.color[4],
				fontSize        : 'xx-small',
				cursor          : 'pointer',
			}
			t_coll.css = {
				fontSize        : '7px',
				marginTop       : '-2px',
			}
			t_label.css = {
				margin          : '1px 0 1px 2px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				textAlign       : 'left',
			}
			t_value.css = {
				flexGrow        : '1',
				padding         : '1px 1px 0 1px',
				minHeight       : t_label.clientHeight+'px',
				color           : Theme.color[4],
				fontSize        : 'xx-small',
				overflow        : 'hidden',
				cursor          : 'pointer',
			}
			let items = [], open_list = false, is_open = false;
			data.items.forEach((item, i) => {
				let t_item = t_value.newChild('div');
				t_item.innerText = item.replace(/ /g, ' ');
				items[i] = t_item;
				t_item.css = {
					display      : i == data.value ? 'block' : 'none',
					padding      : '0 2px',
					wordBreak    : 'keep-all',
					overflow     : 'hidden',
					textOverflow : 'ellipsis',
				}
			t_item.onmouseover = e => {
					t_icon.css = {
						color           : Theme.color[7],
						backgroundColor : Theme.color[4],
						borderColor     : Theme.color[7],
					}
					t_item.css = {
						backgroundColor : Theme.color[6],
					}
				}
				t_item.onmouseout = e => {
					t_icon.css = {
						color           : Theme.color[4],
						backgroundColor : 'transparent',
						borderColor     : Theme.color[4],
					}
					t_item.css = {
						backgroundColor : 'transparent',
					}
				}
				t_item.onmousedown = e => {
					data.value = i;
					if(!is_open) open_list = true;
				}
			});
			t_icon.onmouseover = e => {
				t_icon.css = {
					color           : Theme.color[7],
					backgroundColor : Theme.color[4],
					borderColor     : Theme.color[7],
				}
				items[data.value].css = {
					backgroundColor : Theme.color[6],
				}
			}
			t_icon.onmouseout = e => {
				t_icon.css = {
					color           : Theme.color[4],
					backgroundColor : 'transparent',
					borderColor     : Theme.color[4],
				}
				items[data.value].css = {
					backgroundColor : 'transparent',
				}
			}
			t_icon.onmousedown = e => {
				if(!is_open) open_list = true;
			}
			let mousedown = e => {
				if(open_list) {
					t_coll.innerText = '⮝';
					items.forEach((item, i) => {
						if(i != data.value) item.style.display = 'block';
					});
					t_drop.style.flexWrap = 'wrap';
					t_value.style.width = t_drop.clientWidth+'px';
					is_open = true;
				}
				else if(is_open) {
					t_coll.innerText = '⮟';
					items.forEach((item, i) => {
						if(i != data.value) item.style.display = 'none';
					});
					t_drop.style.flexWrap = 'nowrap';
					t_value.style.width = 'auto';
					is_open = false;
				}
				if(open_list) open_list = false;
			}
			window.addEventListener('mousedown', mousedown);
		}},
	});
})();
