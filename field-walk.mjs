import {stopTeaching} from './teaching.mjs';
import {normalizeFeatures,featureSummary} from './geo.mjs';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const fieldStops=[
 {id:'high',name:'High point',why:'Start with the whole landscape. This view helps show the proposed block, surrounding low ground, and possible access routes.',photo:'Take a wide photo looking across and down the proposed planting area.',note:'What do you see from here? Note the direction you are facing and any obvious shade, access, or slope concern.'},
 {id:'middle',name:'Middle of the block',why:'The middle may differ from the edges. Check the ground you would actually plant, including rooting conditions and equipment access.',photo:'Take a view of the planting area. If you probe the soil, add a close-up with a depth scale.',note:'Record soil observations, depth checked, restrictions, or changes across the block.'},
 {id:'low',name:'Low point',why:'Low areas deserve a closer look for wet soil and repeated frost, fog, or dew settling. One visit cannot confirm every condition.',photo:'Show the low area and the ground surface. After rain, photograph any standing water or wet soil.',note:'How long since rain? Is water standing? What do you know about frost or fog in this spot?'},
 {id:'outlet',name:'Downhill outlet',why:'Look beyond the planting boundary. A roadbank, tree line, or enclosed low area may obstruct the route cold air could take.',photo:'Face downhill and photograph the possible exit path, including barriers beyond the block.',note:'Which direction is downhill? What may block the route? Separate a possible pathway from observed cold-air behavior.'},
 {id:'concern',name:'Concern spot',why:'Use this optional stop for something that could change the planting plan: shade, a seep, shallow rock, a water source, or a difficult entrance.',photo:'Take one wide photo to show location and a close-up to show the concern.',note:'What is the concern, how much of the block is affected, and what needs to be checked?'}
];
let ctx;
const $=id=>document.getElementById(id);
export function setupWalk(context){ctx=context;}
export function stopFeature(s,id){return s.geo.find(f=>f.properties.walkStop===id&&f.geometry.type==='Point');}
export function walkWidget(s){
 const stop=fieldStops.find(p=>p.id===s.walk.activeStop)||fieldStops[0];
 const idx=fieldStops.indexOf(stop),pin=stopFeature(s,stop.id),photos=s.media.filter(m=>m.walkStop===stop.id);
 return `<section class="guided-walk"><div class="walk-topline"><p class="eyebrow">GUIDED FIELD WALK</p><span class="badge">${fieldStops.filter(p=>stopFeature(s,p.id)).length} locations · ${s.media.filter(m=>m.walkStop).length} photos</span></div><p class="walk-start">At each stop: record your location, take a photo, and add a note. Suggested stops help you cover the site; skip any that do not apply.</p><nav class="walk-stops" aria-label="Field walk stops">${fieldStops.map((p,i)=>`<button class="walk-stop ${p.id===stop.id?'active':''}" data-walk-action="select" data-stop="${p.id}" ${p.id===stop.id?'aria-current="step"':''}><span>${i+1}</span>${p.name}${stopFeature(s,p.id)&&s.media.some(m=>m.walkStop===p.id)?'<b aria-label="Location and photo recorded">✓</b>':''}</button>`).join('')}</nav><div class="walk-active"><div class="walk-teaching"><p class="eyebrow">STOP ${idx+1} / ${fieldStops.length}${stop.id==='concern'?' · OPTIONAL':''}</p><h2>${stop.name}</h2><h3>Why stop here?</h3><p>${stop.why}</p><h3>Photo to take</h3><p>${stop.photo}</p></div><div class="walk-capture"><div class="walk-capture-item"><span class="capture-step">1</span><div><button class="button dark" data-walk-action="gps">${pin?'Update GPS location':'Record GPS location'}</button><p class="capture-status">${pin?`✓ ${esc(featureSummary(pin))}<br>${Number.isFinite(pin.properties.accuracy)?`Device accuracy: about ±${Math.round(pin.properties.accuracy)} m`:'Accuracy not recorded'}`:'Stand at this stop, then tap to record your location.'}</p></div></div><div class="walk-capture-item"><span class="capture-step">2</span><div><label class="button outline capture-photo"><input type="file" id="walk-photo" accept="image/png,image/jpeg,image/webp" capture="environment">Take / add a photo</label><p class="capture-status">${photos.length?`✓ ${photos.length} photo${photos.length===1?'':'s'} added${pin?' and linked to this stop':''}`:'Your phone can open its camera. A saved photo works too.'}</p></div></div><p class="hint">GPS is recorded only when you tap. A photo can be added before the location; they will link when the location is recorded. Device locations are approximate.</p></div></div>${stopTeaching(stop.id)}<label class="form-field"><span class="field-label">3 · What did you observe?</span><textarea data-group="walk" data-key="stopNote_${stop.id}" placeholder="${esc(stop.note)}">${esc(s.walk['stopNote_'+stop.id])}</textarea></label>${photos.length?`<div class="walk-photo-strip">${photos.map(m=>`<figure><img src="${m.data}" alt="${esc(m.caption||stop.name)}"><figcaption>${esc(m.name)}</figcaption></figure>`).join('')}</div>`:''}<div class="walk-next"><p class="hint">No location signal? Keep your photos and notes. You can place the location later in Maps & photos.</p><button class="button outline small" data-walk-action="next">${idx===fieldStops.length-1?'Back to high point':'Next stop: '+fieldStops[idx+1].name.toLowerCase()} →</button></div></section>`;
}
export function recordStopLocation(s,stopId,coords){
 const stop=fieldStops.find(p=>p.id===stopId);if(!stop)throw Error('Choose a field stop first.');
 const f=normalizeFeatures({type:'Feature',geometry:{type:'Point',coordinates:[coords.longitude,coords.latitude]},properties:{name:stop.name,kind:'Field walk stop',walkStop:stop.id,note:s.walk['stopNote_'+stop.id]||'',source:`Device location · ${new Date().toISOString()}`,accuracy:coords.accuracy}})[0];
 const old=stopFeature(s,stop.id);
 if(old){f.id=old.id;s.geo[s.geo.indexOf(old)]=f;}else{if(s.geo.length>=300)throw Error('This assessment has reached its map feature limit.');s.geo.push(f);}
 s.media.filter(m=>m.walkStop===stop.id).forEach(m=>m.featureId=f.id);
 return f;
}
export function walkAction(button){
 const action=button.dataset.walkAction;if(!action)return false;
 const s=ctx.getState(),stop=fieldStops.find(p=>p.id===s.walk.activeStop)||fieldStops[0];
 if(action==='select'||action==='next'){
  s.walk.activeStop=action==='select'?button.dataset.stop:fieldStops[(fieldStops.indexOf(stop)+1)%fieldStops.length].id;ctx.changed();ctx.render();document.querySelector('.guided-walk')?.scrollIntoView({behavior:'smooth',block:'start'});
 }else if(action==='gps'){
  if(!navigator.geolocation){ctx.notify('Location is unavailable. Keep the photo and note; place the pin later on the map.');return true;}
  button.disabled=true;button.textContent='Getting your location…';
  navigator.geolocation.getCurrentPosition(p=>{if(ctx.getState()!==s)return;try{recordStopLocation(s,stop.id,p.coords);ctx.changed();ctx.render();ctx.notify(`Location recorded for ${stop.name.toLowerCase()}.`);}catch(e){ctx.notify(e.message);button.disabled=false;button.textContent='Record GPS location';}},e=>{button.disabled=false;button.textContent='Record GPS location';ctx.notify(e.code===1?'Location permission was not granted. Keep your photos and notes; add a map pin later.':'Location is unavailable right now. Try an open area or add the pin later.');},{enableHighAccuracy:true,timeout:15000,maximumAge:0});
 }
 return true;
}
export function syncStopNote(s,key,value){if(!key.startsWith('stopNote_'))return;const f=stopFeature(s,key.slice(9));if(f)f.properties.note=value;}
export function guidedWalkReport(s){
 return `<table class="report-table"><thead><tr><th>Suggested stop</th><th>Location and photos</th><th>Observation</th></tr></thead><tbody>${fieldStops.map(stop=>{const pin=stopFeature(s,stop.id),photos=s.media.map((m,i)=>m.walkStop===stop.id?i+1:null).filter(Boolean);return `<tr><td><b>${stop.name}</b>${stop.id==='concern'?'<small>Optional</small>':''}</td><td>${pin?esc(featureSummary(pin)):'No location recorded'}${pin&&Number.isFinite(pin.properties.accuracy)?`<small>About ±${Math.round(pin.properties.accuracy)} m</small>`:''}<small>${photos.length?'Photos: '+photos.join(', '):'No photos added'}</small></td><td>${esc(s.walk['stopNote_'+stop.id]||'Not recorded')}</td></tr>`;}).join('')}</tbody></table>`;
}
