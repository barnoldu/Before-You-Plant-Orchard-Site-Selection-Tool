// Structured companion fields from the latest user-supplied worksheet, received 2026-11-11.
const esc = x => String(x ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const yn = ['Yes','No','Unsure'];
const orientation = ['North–south','Northeast–southwest','Northwest–southeast','East–west','Unsure'];
const f = (key,label,type='text',options=[],hint='') => ({key,label,type,options,hint});
export const quickQuestions = [
 ['sun','Full sun for most of the day?','sun'],
 ['drainage','Water leaves within 24 hours after heavy rain?','wet'],
 ['roots','Roots can likely grow at least 24 inches deep?','depth'],
 ['height','Higher than nearby low areas?',null],
 ['outlet','A clear path for cold air to leave the block?','cold'],
 ['frost','Avoids repeated frost, fog, or dew settling compared with nearby areas?','cold'],
 ['water','Irrigation water is available or realistically possible?',null],
 ['equipment','Equipment can enter and turn around safely?',null],
 ['shape','Block shape works for rows and equipment?',null]
];
export const photoItems = [
 ['high','Whole block from the highest point'],['low','Whole block from the lowest point'],
 ['morning','Morning shade'],['midday','Midday shade'],['afternoon','Afternoon shade'],
 ['source','Shade source'],['wet','Wet spot or drainage problem'],['probe','Probe / auger hole and soil layers'],
 ['mottling','Mottling or other wet-soil indicators'],['restriction','Hardpan, dense layer, or shallow rock'],
 ['outlet','Downslope cold-air outlet'],['barrier','Potential cold-air obstruction'],
 ['frost','Frost, fog, dew, or delayed green-up, if visible'],['water','Water source / irrigation access'],
 ['access','Road, gate, turnaround, or equipment limitation'],['soilmap','SoilWeb / Web Soil Survey screenshot, if available'],
 ['topomap','Google Earth / topographic screenshot, if available']
];
export const sections = {
 purpose:{group:'info',title:'Why are you assessing this site?',description:'Keep a separate assessment for each candidate block. Download a backup before starting another.',fields:[
  f('purpose','Primary reason','select',['Considering a new planting','Comparing possible sites','Preparing for Extension review','Preparing for cost-share or funding','Troubleshooting an existing site','Other']),f('purposeOther','Other reason or comparison notes')
 ]},
 quick:{group:'info',title:'Quick site check',description:'Take a first look before the field walk. This does not assign scores or replace the four major checks. Use Unsure when you need evidence.',fields:quickQuestions.map(([id,label])=>f('quick_'+id,label,'select',yn))},
 landscape:{group:'walk',title:'Block shape, land use, and access',description:'Walk the whole block, including low spots, edges, shade sources, and entrances.',fields:[
  f('blockShape','Block shape / terrain','multi',['Rectangular','Irregular','Narrow','Steep','Other','Unsure']),f('blockShapeOther','Other shape or terrain'),
  f('landUse','Current land use','multi',['Pasture','Row crop','Hay','Woodland edge','Fallow','Other','Unsure']),f('landUseOther','Other land use'),
  f('wetEvidence','Evidence of wetness','multi',['None observed','Occasional ponding','Frequent ponding','Seeps or springs','Unsure']),
  f('obstructions','Obstructions present','multi',['Woods edge','Buildings','Hedgerow','Ridge','Roadbank','None obvious','Other','Unsure']),f('obstructionsOther','Other obstruction'),
  f('waterAccess','Water access for irrigation','select',yn),f('equipmentAccess','Access for sprayer, harvest, and maintenance equipment','select',['Good','Moderate','Poor','Unsure']),
  ...[1,2,3].map(n=>f('unknown'+n,'Unknown '+n))
 ]},
 soil:{group:'walk',title:'Soil profile details',description:'Take 2–3 probe or auger observations if possible. If you can check only one area, start with the lowest or wettest-looking spot. Record actual depths and units.',fields:[
  f('topsoilDepth','Average topsoil depth (inches)','number'),f('restrictionDepth','Restrictive layer begins at (inches)','number'),f('restrictionType','Restriction type / location'),
  f('bedrockDepth','Rock or bedrock begins at (inches)','number'),f('mottling','Soil color changes or mottling observed?','select',yn),f('hardpan','Hardpan or very dense layer?','select',yn),f('waterInHole','Water enters the probe or auger hole?','select',yn),
  f('probePlan','If a probe or auger is unavailable','multi',['Borrow from Extension','Use a shovel or suitable test pit','Hire soil sampling or site evaluation','Ask county agent for assistance','Unsure']),
  f('soilTestPlan','Soil test / crop-fit follow-up','textarea',[],'Record the test date or your plan to obtain a soil test. A nutrient test alone does not establish texture, rooting depth, or drainage.')
 ]},
 sun:{group:'walk',title:'Shade observations',description:'Check morning, midday, and afternoon, and consider leaf-on conditions. Record the portion of the actual planting area affected.',fields:[
  f('shadeSource','Shade source','multi',['Woods','Buildings','Hedgerow','Hill or ridge','None observed','Other','Unsure']),f('shadeOther','Other shade source'),
  f('shadeTiming','When shade occurs','multi',['Morning','Midday','Afternoon','Most of the day','None observed','Unsure']),
  f('shadeExtent','How much of the block is affected?','select',['None observed','Edge only','Less than 25%','25–50%','More than 50%','Unsure']),
  f('sunPlan','Options to review if this check fails','multi',['Move the planting area','Remove or reduce shade source','Reorient block if only edges are affected','Choose a different site','Review with Extension'])
 ]},
 wet:{group:'walk',title:'Wet-soil warning signs',description:'Any of these signs calls for review. Revisit after heavy rain and compare field observations with mapping.',fields:[
  f('drainFlags','Conditions observed','multi',['Standing water persists beyond 24 hours','Water fills probe or auger holes','Chronic wetness or soft ground','Mapped poorly or very poorly drained soil','Gray soil, mottling, or sulfur smell','None observed','Unsure']),
  f('rainVisit','Visit date, recent rainfall, and elapsed time'),f('pondingHours','Observed ponding duration (hours)','number'),
  f('drainField','Field drainage evidence','textarea'),f('drainMap','Mapped drainage evidence / source / date','textarea'),f('drainConflict','Any map–field disagreement and what needs checking','textarea'),
  f('wetPlan','Options to review if this check fails','multi',['Relocate the block','Tile drainage','Raised beds or berms','Change crop or production system','Estimate improvement costs','Review with Extension'], 'These are options for review; selecting one does not resolve the concern.')
 ]},
 depth:{group:'walk',title:'Rooting-depth follow-up',description:'A restriction shallower than about 24 inches is a major check concern. The rating also assigns zero to bedrock shallower than 36 inches.',fields:[
  f('rootingEvidence','What did you hit, where, and at what depth?','textarea'),
  f('depthPlan','Options to review if this check fails','multi',['Raised beds or berms','Relocate the block','Different crop or system','Rootstock choice','Irrigation needs','Drainage planning','Review with Extension'])
 ]},
 cold:{group:'walk',title:'Cold-air route and local history',description:'The worksheet flags the combination of low position, a blocked or enclosed outlet, and repeated colder-site history as high concern. Terrain alone does not establish a frost pattern.',fields:[
  f('coldLow','Level with surrounding land or the lowest area?','select',yn),f('coldBlocked','Blocked cold-air route or bowl-shaped block?','select',yn),f('coldHistory','Local evidence of repeatedly colder conditions?','select',yn),
  f('coldEvidence','Evidence checked','multi',['Clear downhill exit path','Minor obstruction','Major obstruction','Bowl-shaped or enclosed area','Frost settles here before nearby areas','Fog settles here before nearby areas','Frost stays longer','Vegetation greens up later','Local grower reports this exact site as a repeated frost spot','Unsure']),
  f('coldDirection','Cold air may drain toward'),f('coldObstacles','Obstructions that may trap cold air'),f('coldPattern','Observed frost, fog, or dew pattern','textarea'),
  f('coldPlan','Options to review if this check fails','multi',['Move the block upslope','Avoid early-blooming crops or cultivars','Plan frost protection with Extension','Different crop or system','Review with Extension'])
 ]},
 terrain:{group:'walk',title:'Slope and relative height',description:'Use percent slope, and name the nearby low area used for relative height. Height above the block average is a different measurement.',fields:[
  f('slopePercent','Estimated / measured slope (%)','number'),f('slopeMethod','How slope was estimated','select',['Field observation','Google Earth or topo map','Local knowledge','Measured on site','Unsure']),
  f('relativeFeet','Height above nearby low ground (feet)','number'),f('lowReference','Nearby low area or frost-line reference'),f('terrainNotes','Measurement source, date, location, and uncertainty','textarea')
 ]},
 irrigation:{group:'walk',title:'Irrigation source and feasibility',description:'Confirm seasonal reliability, capacity, delivery, and development cost. A nearby source does not establish that irrigation is feasible.',fields:[
  f('waterSource','Potential water source','multi',['Pond','Well','Creek or stream','Municipal water','Existing irrigation line','Other','Unsure']),f('waterOther','Other source'),
  f('waterReliability','Seasonal reliability'),f('waterCapacity','Available capacity / demand / units'),f('waterDelivery','Delivery route, power, and access'),f('waterCost','Development cost or unanswered feasibility questions')
 ]},
 layout:{group:'walk',title:'Equipment, block layout, and row orientation',description:'North–south rows often help distribute sunlight, especially in narrow or planar systems. Slope, erosion, drainage, field shape, and sprayer safety may favor another direction. Check repeated access for spraying, mowing, pruning, training, harvest, irrigation and trellis repair, and scouting.',fields:[
  f('lightOrientation','Preferred row orientation for light','select',orientation),f('practicalOrientation','Most practical row orientation in this field','select',orientation),
  f('orientationReasons','Reasons for the practical orientation','multi',['Best sunlight exposure','Follows slope safely','Reduces erosion risk','Allows equipment access','Fits block shape','Avoids wet area','Avoids shade','Works with irrigation layout','Works with existing roads, gates, or lanes','Other']),
  f('orientationOther','Other reason'),f('proposedOrientation','Proposed row orientation'),f('proposedReason','Reason for the proposed direction','textarea'),f('layoutConcern','Main row-direction or layout concern','textarea'),f('layoutQuestion','Layout question for Extension','textarea')
 ]},
 weather:{group:'walk',title:'Weather and crop fit',description:'Optional context for Extension; these answers do not add or subtract site-rating points.',fields:[
  f('weatherStation','Nearest representative weather / Mesonet station'),f('springFreeze','Nearby fruit crops often damaged by spring freezes?','select',yn),f('winterInjury','Winter cold injury observed nearby?','select',yn),f('earlyBloom','Target crop early-blooming or cold-sensitive?','select',yn),f('cropFitQuestion','Main weather or crop-fit question for Extension','textarea')
 ]},
 decision:{group:'notes',title:'Your decision statement',description:'Choose your current decision and explain it in 3–5 sentences. This is your recorded judgment; a failed check still requires Pause and Review before investing.',fields:[
  f('decision','Grower decision','select',['GO','GO WITH PLANNING','PAUSE AND REVIEW','UNSURE — EXTENSION REVIEW RECOMMENDED']),f('decisionExplanation','Decision explanation','textarea'),
  ...[1,2,3].map(n=>f('concern'+n,'Top concern '+n)),...[1,2,3].map(n=>f('next'+n,'Next step '+n))
 ]}
};
export function choiceValues(value){try{const a=JSON.parse(value||'[]');return Array.isArray(a)?a.filter(x=>typeof x==='string'):[];}catch{return [];}}
function fieldHtml(field,group,s){
 const value=s[group]?.[field.key]||'',id=`ws-${group}-${field.key}`,attrs=`data-group="${group}" data-key="${field.key}"`;
 const hint=field.hint?`<span class="hint">${esc(field.hint)}</span>`:'';
 if(field.type==='multi')return `<fieldset class="worksheet-multi"><legend>${esc(field.label)}</legend><div>${field.options.map((v,i)=>`<label><input type="checkbox" data-worksheet-list="${field.key}" data-worksheet-group="${group}" value="${esc(v)}" ${choiceValues(value).includes(v)?'checked':''}>${esc(v)}</label>`).join('')}</div>${hint}</fieldset>`;
 const control=field.type==='select'?`<select id="${id}" ${attrs}><option value="">Not recorded</option>${field.options.map(v=>`<option ${value===v?'selected':''}>${esc(v)}</option>`).join('')}</select>`:field.type==='textarea'?`<textarea id="${id}" ${attrs}>${esc(value)}</textarea>`:`<input id="${id}" type="${field.type}" ${field.type==='number'?'min="0" step="any"':''} ${attrs} value="${esc(value)}">`;
 return `<label class="form-field ${field.type==='textarea'?'wide':''}" for="${id}"><span class="field-label">${esc(field.label)}</span>${control}${hint}</label>`;
}
export function worksheetSection(id,s,open=false){const section=sections[id];return `<details class="worksheet-section" ${open?'open':''}><summary>${section.title}</summary><p class="worksheet-description">${section.description}</p><div class="worksheet-fields">${section.fields.map(field=>fieldHtml(field,section.group,s)).join('')}</div>${id==='quick'?'<p class="hint">A No for sunlight, drainage, rooting depth, cold-air outlet, or recurring frost/fog calls for a pause before investment. Recheck these during the field walk.</p>':''}</details>`;}
export function worksheetListInput(t,s){
 if(!t.dataset.worksheetList)return false;
 const key=t.dataset.worksheetList,group=t.dataset.worksheetGroup;
 const section=Object.values(sections).find(sec=>sec.group===group&&sec.fields.some(f=>f.key===key));
 const field=section?.fields.find(f=>f.key===key);if(!field||!field.options.includes(t.value))return false;
 let chosen=choiceValues(s[group][key]).filter(v=>field.options.includes(v));
 const exclusive=v=>['Unsure','None observed','None obvious'].includes(v);
 if(t.checked){chosen=exclusive(t.value)?[t.value]:[...chosen.filter(v=>!exclusive(v)),t.value];}else chosen=chosen.filter(v=>v!==t.value);
 s[group][key]=JSON.stringify([...new Set(chosen)]);
 for(const input of t.closest('fieldset').querySelectorAll('input'))input.checked=chosen.includes(input.value);
 return true;
}
export function photoChecklist(s){return `<details class="worksheet-section"><summary>Photo checklist · 17 useful views</summary><p class="worksheet-description">Use wide views and close-ups, with an object for scale. Mark each view as you collect it; a checklist mark does not attach an image. Add the photo above. One photo can cover several views.</p><div class="photo-checklist">${photoItems.map(([id,label])=>fieldHtml(f('photo_'+id,label,'select',['Taken','Still needed','Not applicable / unavailable']),'walk',s)).join('')}</div><p class="hint">Caption example: “Low northeast corner, facing south. Water still standing 36 hours after rain.” Include location, direction, date, conditions, and depth units where relevant.</p></details>`;}
export function worksheetCounts(s){
 let unsure=0,unanswered=0;
 for(const section of Object.values(sections))for(const field of section.fields.filter(f=>['select','multi'].includes(f.type))){const value=s[section.group]?.[field.key];if(!value||value==='[]')unanswered++;else if(field.type==='multi'?choiceValues(value).includes('Unsure'):value.startsWith('Unsure')||value.startsWith('UNSURE'))unsure++;}
 for(const id of ['sun','wet','depth','cold']){const value=s.checks[id]?.result;if(!value)unanswered++;else if(value==='unsure')unsure++;}
 return {unsure,unanswered};
}
const numeric=v=>typeof v==='string'&&v.trim()!==''&&Number.isFinite(Number(v))?Number(v):null;
export function worksheetAlerts(s){
 const alerts=[];
 for(const [id,label,major] of quickQuestions){if(major&&s.info['quick_'+id]==='No'&&!(s.checks[major]?.result==='pass'&&s.checks[major]?.note?.trim()))alerts.push({check:major,title:'Quick check: '+label,text:'Resolve this initial concern through the field walk and document the major check before investing.'});}
 const wet=choiceValues(s.walk.drainFlags).filter(v=>!['None observed','Unsure'].includes(v));
 if(wet.length||s.walk.waterInHole==='Yes'||numeric(s.walk.pondingHours)>24)alerts.push({check:'wet',title:'Wet-soil evidence needs review',text:'Recorded wetness indicators require review before investment. Address any disagreement with a passed drainage check.'});
 if(['restrictionDepth','bedrockDepth',...['high','middle','low'].map(k=>k+'Restriction')].some(k=>numeric(s.walk[k])!==null&&numeric(s.walk[k])<24))alerts.push({check:'depth',title:'Restriction recorded above 24 inches',text:'Confirm the type, location, and measured depth of the restriction with Extension.'});
 if(['coldLow','coldBlocked','coldHistory'].every(k=>s.walk[k]==='Yes'))alerts.push({check:'cold',title:'All three frost-pocket warning signs recorded',text:'Low position, blocked cold-air drainage, and repeated colder-site history together need review before investment.'});
 return alerts;
}
function sectionReport(id,s){const sec=sections[id];const entries=sec.fields.map(field=>{let value=s[sec.group]?.[field.key]||'';if(field.type==='multi')value=choiceValues(value).join('; ');return {field,value};}).filter(x=>x.value);return `<section class="report-section"><h3>${esc(sec.title)}</h3>${entries.length?`<dl class="worksheet-report-list">${entries.map(({field,value})=>`<div><dt>${esc(field.label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><p class="hint">${sec.fields.length-entries.length} remaining detail fields not recorded.</p>`:'<p class="hint">No details recorded for this section.</p>'}</section>`;}
export function worksheetReport(s){const c=worksheetCounts(s);return `<section class="report-section"><h2>Worksheet details and decision</h2><p>${c.unsure} explicit Unsure selections; ${c.unanswered} unanswered choice prompts. These counts include optional context. Incomplete rated items are listed separately in the site rating.</p>${Object.keys(sections).map(id=>sectionReport(id,s)).join('')}<section class="report-section"><h3>Photo checklist</h3><p>Recorded by the grower; see the attached image section for actual report images.</p><table class="report-table"><thead><tr><th>View</th><th>Status</th></tr></thead><tbody>${photoItems.map(([id,label])=>`<tr><td>${label}</td><td>${esc(s.walk['photo_'+id]||'Not recorded')}</td></tr>`).join('')}</tbody></table></section></section>`;}
export function decisionFeedback(s,summary){const d=s.notes.decision;if(['GO','GO WITH PLANNING'].includes(d)&&(summary.pause||summary.unknown.length||summary.total===null))return '<p class="feedback danger"><b>Your recorded decision does not clear the outstanding checks.</b> Resolve flagged concerns and missing evidence with Extension before investing.</p>';return '<p class="hint">The tool organizes evidence and your decision for Extension review; it does not approve a planting.</p>';}
export function topThree(s,prefix,fallback){const list=[1,2,3].map(n=>s.notes[prefix+n]?.trim()).filter(Boolean);return [list.map((v,i)=>`${i+1}. ${v}`).join('\n'),s.notes[fallback]||''].filter(Boolean).join('\n\n');}
