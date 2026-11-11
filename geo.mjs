const escape=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const pointKinds=['Observation','Wet area','Soil probe','Shade','Cold-air outlet','Irrigation','Access','Photo location','Site reference'];
export function coordinatePair(value){
 let text=String(value).trim();
 if(/^https?:/i.test(text)){
  let u;try{u=new URL(text);}catch{throw Error('Enter a coordinate pair or a full Google Maps pin link.');}
  if(!/(^|\.)google\.[a-z.]+$|(^|\.)goo\.gl$/.test(u.hostname))throw Error('Use a Google Maps pin link or paste latitude, longitude.');
  if(/goo\.gl$/.test(u.hostname))throw Error('Open the shortened Google link, then copy the pin’s coordinates or its full Google Maps link.');
  const decoded=decodeURIComponent(u.href),pin=decoded.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if(pin)text=pin[1]+','+pin[2];
  else text=u.searchParams.get('query')||u.searchParams.get('q')||'';
  if(!text)throw Error('This link does not contain a pin coordinate. A map-centre URL is not a pin; copy latitude and longitude from the location itself.');
 }
 const match=text.match(/^\s*([+-]?\d+(?:\.\d+)?)\s*[,;\s]\s*([+-]?\d+(?:\.\d+)?)\s*$/);
 if(!match)throw Error('Enter decimal degrees in latitude, longitude order, for example 38.04, -84.50.');
 const lat=Number(match[1]),lng=Number(match[2]);
 if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>85||Math.abs(lng)>180)throw Error('Check latitude and longitude. This map supports latitudes between −85 and 85 and longitudes between −180 and 180.');
 return [lng,lat];
}
const validPoint=p=>Array.isArray(p)&&p.length>=2&&Number.isFinite(p[0])&&Number.isFinite(p[1])&&Math.abs(p[0])<=180&&Math.abs(p[1])<=85;
const equal=(a,b)=>a[0]===b[0]&&a[1]===b[1];
const orient=(a,b,c)=>(b[0]-a[0])*(c[1]-a[1])-(b[1]-a[1])*(c[0]-a[0]);
const on=(a,b,p)=>Math.abs(orient(a,b,p))<1e-14&&p[0]>=Math.min(a[0],b[0])-1e-12&&p[0]<=Math.max(a[0],b[0])+1e-12&&p[1]>=Math.min(a[1],b[1])-1e-12&&p[1]<=Math.max(a[1],b[1])+1e-12;
function intersects(a,b,c,d){const o1=orient(a,b,c),o2=orient(a,b,d),o3=orient(c,d,a),o4=orient(c,d,b);return o1*o2<0&&o3*o4<0||on(a,b,c)||on(a,b,d)||on(c,d,a)||on(c,d,b);}
function inside(p,ring){let yes=false;for(let i=0,j=ring.length-1;i<ring.length;j=i++){const a=ring[i],b=ring[j];if((a[1]>p[1])!==(b[1]>p[1])&&p[0]<(b[0]-a[0])*(p[1]-a[1])/(b[1]-a[1])+a[0])yes=!yes;}return yes;}
function ringValid(r){
 if(!Array.isArray(r)||r.length<4||r.length>2500||!r.every(validPoint)||!equal(r[0],r.at(-1)))throw Error('A boundary ring must be closed, valid, and have 4–2,500 coordinates.');
 if(r.slice(0,-1).some((p,i)=>equal(p,r[i+1])))throw Error('A boundary contains repeated adjacent vertices. Repair it before import.');
 let signedArea=0;for(let i=0;i<r.length-1;i++){signedArea+=r[i][0]*r[i+1][1]-r[i+1][0]*r[i][1];for(let j=i+1;j<r.length-1;j++){if(j===i+1||i===0&&j===r.length-2)continue;if(intersects(r[i],r[i+1],r[j],r[j+1]))throw Error('A boundary crosses or touches itself. Repair it before import.');}}
 if(Math.abs(signedArea)<1e-12)throw Error('A boundary has no usable enclosed area.');
}
function polygonValid(rings){
 if(!Array.isArray(rings)||!rings.length)throw Error('The polygon has no rings.');rings.forEach(ringValid);
 for(let h=1;h<rings.length;h++){if(!inside(rings[h][0],rings[0]))throw Error('A boundary hole falls outside its outer ring.');for(let k=0;k<h;k++){for(let i=0;i<rings[h].length-1;i++)for(let j=0;j<rings[k].length-1;j++)if(intersects(rings[h][i],rings[h][i+1],rings[k][j],rings[k][j+1]))throw Error('Boundary rings cross or touch. Repair the geometry before import.');if(k>0&&(inside(rings[h][0],rings[k])||inside(rings[k][0],rings[h])))throw Error('Nested boundary holes need repair before import.');}}
}
export function cleanGeometry(g){
 if(!g||!g.type)throw Error('A feature has no geometry.');
 const c=g.coordinates;
 if(g.type==='Point'){if(!validPoint(c))throw Error('Invalid point coordinates. Use WGS 84 longitude, latitude.');}
 else if(g.type==='MultiPoint'){if(!Array.isArray(c)||!c.length||!c.every(validPoint))throw Error('Invalid multipoint coordinates.');}
 else if(g.type==='LineString'){if(!Array.isArray(c)||c.length<2||!c.every(validPoint))throw Error('Invalid line coordinates.');}
 else if(g.type==='MultiLineString'){if(!Array.isArray(c)||!c.length)throw Error('Empty line geometry.');c.forEach(r=>cleanGeometry({type:'LineString',coordinates:r}));}
 else if(g.type==='Polygon')polygonValid(c);
 else if(g.type==='MultiPolygon'){if(!Array.isArray(c)||!c.length)throw Error('Empty polygon geometry.');c.forEach(polygonValid);}
 else throw Error(`Unsupported geometry: ${g.type}. Export points, lines, or polygons.`);
 const clean=a=>typeof a[0]==='number'?a.slice(0,2):a.map(clean);
 return {type:g.type,coordinates:clean(c)};
}
export function allCoordinates(g){const out=[];const go=a=>{if(typeof a[0]==='number')out.push(a);else a.forEach(go);};go(g.coordinates);return out;}
export function normalizeFeatures(data,source='Imported file',preserveIds=false){
 const collection=Array.isArray(data)?data.flatMap(d=>d.features||[d]):data?.type==='FeatureCollection'?data.features:data?.type==='Feature'?[data]:[{type:'Feature',geometry:data,properties:{}}];
 if(data?.crs&&!/4326|CRS84/i.test(JSON.stringify(data.crs)))throw Error('Reproject this GeoJSON to WGS 84 (EPSG:4326) before importing.');
 if(!Array.isArray(collection)||collection.length>300)throw Error('Import up to 300 features at a time.');
 let vertices=0;
 return collection.map((f,i)=>{
  if(f.crs&&!/4326|CRS84/i.test(JSON.stringify(f.crs)))throw Error('A feature declares an unsupported coordinate system. Use WGS 84.');
  const geometry=cleanGeometry(f.geometry),p=f.properties||{};vertices+=allCoordinates(geometry).length;if(vertices>20000)throw Error('Simplify the file to 20,000 coordinates or fewer.');
  const properties={};for(const [k,v] of Object.entries(p).slice(0,50))if(['string','number','boolean'].includes(typeof v))properties[k]=typeof v==='string'?v.slice(0,2000):v;
  properties.name=String(p.name||p.Name||p.NAME||`Feature ${i+1}`).slice(0,200);
  properties.kind=String(p.kind|| (geometry.type==='Point'?'Observation':geometry.type.includes('Polygon')?'Candidate boundary':'Mapped route')).slice(0,100);
  properties.note=String(p.note||p.description||'').slice(0,2000);
  properties.source=String(p.source||source).slice(0,2000);
  return {type:'Feature',id:preserveIds&&typeof f.id==='string'&&/^[a-zA-Z0-9_-]{1,100}$/.test(f.id)?f.id:crypto.randomUUID(),properties,geometry};
 });
}
function xmlDoc(text){const d=new DOMParser().parseFromString(text,'application/xml');if(d.getElementsByTagName('parsererror').length)throw Error('The XML file could not be read.');return d;}
const els=(node,name)=>Array.from(node.getElementsByTagNameNS('*',name));
const txt=(node,name)=>els(node,name)[0]?.textContent?.trim()||'';
const tuples=text=>text.trim().split(/\s+/).filter(Boolean).map(t=>t.split(',').slice(0,2).map(Number));
export function parseKml(text){
 const d=xmlDoc(text),features=[];
 for(const p of els(d,'Placemark')){
  const properties={name:txt(p,'name'),note:txt(p,'description')};
  for(const x of els(p,'Point'))features.push({type:'Feature',properties,geometry:{type:'Point',coordinates:tuples(txt(x,'coordinates'))[0]}});
  for(const x of els(p,'LineString'))features.push({type:'Feature',properties,geometry:{type:'LineString',coordinates:tuples(txt(x,'coordinates'))}});
  for(const x of els(p,'Polygon')){const outer=els(x,'outerBoundaryIs')[0],holes=els(x,'innerBoundaryIs');if(outer)features.push({type:'Feature',properties,geometry:{type:'Polygon',coordinates:[tuples(txt(outer,'coordinates')),...holes.map(h=>tuples(txt(h,'coordinates')))]}});}
 }
 if(!features.length)throw Error('No supported placemarks were found. Linked layers and ground overlays are not imported; export the actual features.');
 return {type:'FeatureCollection',features};
}
export function parseGpx(text){
 const d=xmlDoc(text),features=[],xy=x=>[x.hasAttribute('lon')?Number(x.getAttribute('lon')):NaN,x.hasAttribute('lat')?Number(x.getAttribute('lat')):NaN];
 for(const p of els(d,'wpt'))features.push({type:'Feature',properties:{name:txt(p,'name'),note:txt(p,'desc')},geometry:{type:'Point',coordinates:xy(p)}});
 for(const t of els(d,'trk'))for(const seg of els(t,'trkseg')){const coordinates=els(seg,'trkpt').map(xy);if(coordinates.length>=2)features.push({type:'Feature',properties:{name:txt(t,'name')||'GPS track'},geometry:{type:'LineString',coordinates}});}
 for(const t of els(d,'rte')){const coordinates=els(t,'rtept').map(xy);if(coordinates.length>=2)features.push({type:'Feature',properties:{name:txt(t,'name')||'GPS route'},geometry:{type:'LineString',coordinates}});}
 if(!features.length)throw Error('No waypoints or usable tracks were found in this GPX file.');return {type:'FeatureCollection',features};
}
export async function importGeoFile(file){
 if(file.size>10*1024*1024)throw Error('Use a mapping file smaller than 10 MB.');
 const ext=file.name.split('.').at(-1).toLowerCase();let parsed;
 if(['json','geojson'].includes(ext))parsed=JSON.parse(await file.text());
 else if(ext==='kml')parsed=parseKml(await file.text());
 else if(ext==='gpx')parsed=parseGpx(await file.text());
 else if(['kmz','zip'].includes(ext)){
  if(!globalThis.fflate)throw Error('ZIP support did not load. Refresh and try again.');
  const raw=new Uint8Array(await file.arrayBuffer());let bytes=0;
  const zip=globalThis.fflate.unzipSync(raw,{filter:entry=>{bytes+=entry.originalSize;if(bytes>30*1024*1024)throw Error('The expanded archive is too large. Use a smaller export.');return /\.(kml|shp|shx|dbf|prj|cpg)$/i.test(entry.name)&&!entry.name.startsWith('__MACOSX/');}});
  const names=Object.keys(zip),kml=names.filter(n=>/\.kml$/i.test(n));
  if(ext==='kmz'||kml.length&&!names.some(n=>/\.shp$/i.test(n))){if(!kml.length)throw Error('No KML file found in the archive.');parsed={type:'FeatureCollection',features:kml.flatMap(n=>parseKml(new TextDecoder().decode(zip[n])).features)};}
  else{
   if(!globalThis.shp)throw Error('Shapefile support did not load. Refresh and try again.');
   const shapes=names.filter(n=>/\.shp$/i.test(n));if(!shapes.length)throw Error('No shapefile found. Upload a ZIP containing .shp, .shx, .dbf, and .prj files.');
   for(const shpName of shapes){const stem=shpName.slice(0,-4).toLowerCase();for(const suffix of ['.shx','.dbf','.prj']){const n=names.find(n=>n.toLowerCase()===stem+suffix);if(!n||!zip[n].length)throw Error(`Missing ${suffix} for ${shpName}. A declared coordinate system is required.`);}}
   // Parse only the checked archive entries; unrelated ZIP contents never reach the parser.
   const safeZip=globalThis.fflate.zipSync(zip);parsed=await globalThis.shp(safeZip.buffer);
  }
 }else throw Error('Use GeoJSON, KML, KMZ, GPX, or a shapefile ZIP.');
 return normalizeFeatures(parsed,`${file.name} · imported ${new Date().toISOString().slice(0,10)} · WGS 84`);
}
export function featureSummary(f){const points=allCoordinates(f.geometry);if(f.geometry.type==='Point')return `${points[0][1].toFixed(6)}, ${points[0][0].toFixed(6)}`;return `${f.geometry.type} · ${points.length} coordinates`;}
export function geometrySketch(features){
 if(!features.length)return '';
 const points=features.flatMap(f=>allCoordinates(f.geometry)),allLng=points.map(p=>p[0]);
 if(Math.max(...allLng)-Math.min(...allLng)>180)return '<p>The features cross the date line. Use the exported GeoJSON for a suitable map projection.</p>';
 const project=p=>[p[0]*Math.PI/180,Math.log(Math.tan(Math.PI/4+p[1]*Math.PI/360))];
 const xy=points.map(project),xs=xy.map(p=>p[0]),ys=xy.map(p=>p[1]);
 let minX=Math.min(...xs),maxX=Math.max(...xs),minY=Math.min(...ys),maxY=Math.max(...ys);
 const width=maxX-minX,height=maxY-minY,scale=Math.min(570/(width||.0001),300/(height||.0001));
 const cx=(minX+maxX)/2,cy=(minY+maxY)/2,coord=p=>{const [x,y]=project(p);return [320+(x-cx)*scale,190-(y-cy)*scale];};
 const path=line=>line.map((p,i)=>`${i?'L':'M'}${coord(p).map(x=>x.toFixed(2)).join(',')}`).join(' ');
 const render=(g,label)=>{switch(g.type){case 'Point':{const [x,y]=coord(g.coordinates);return `<circle cx="${x}" cy="${y}" r="5" fill="#0033a0" stroke="white" stroke-width="2"/><text x="${x+8}" y="${y-8}" font-size="12" fill="#0033a0">${label}</text>`;}case 'MultiPoint':return g.coordinates.map((c,i)=>render({type:'Point',coordinates:c},label+'.'+(i+1))).join('');case 'LineString':return `<path d="${path(g.coordinates)}" fill="none" stroke="#4979c4" stroke-width="2.5"/>`;case 'MultiLineString':return g.coordinates.map(c=>render({type:'LineString',coordinates:c},label)).join('');case 'Polygon':return `<path d="${g.coordinates.map(r=>path(r)+' Z').join(' ')}" fill="#93b5f1" fill-opacity=".3" fill-rule="evenodd" stroke="#0033a0" stroke-width="2"/>`;case 'MultiPolygon':return g.coordinates.map(c=>render({type:'Polygon',coordinates:c},label)).join('');default:return '';}};
 return `<svg class="coordinate-sketch" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 380" role="img" aria-label="Coordinate sketch of the recorded site features"><rect width="640" height="380" rx="8" fill="#f3f7ff"/>${features.filter(f=>f.geometry.type!=='Point').map(f=>render(f.geometry,'')).join('')}${features.map((f,i)=>f.geometry.type==='Point'?render(f.geometry,String(i+1)):'').join('')}<path d="M606 56V25l-5 10m5-10 5 10" fill="none" stroke="#0033a0" stroke-width="2"/><text x="601" y="19" font-size="12" fill="#0033a0">N</text><text x="16" y="360" font-size="10" fill="#53627b">Coordinate sketch · Web Mercator · No basemap · Not a surveyed boundary</text></svg>`;
}
export function geoReport(features,media=[]){
 if(!features.length)return '<p>No coordinates, pins, or boundaries were recorded.</p>';
 return geometrySketch(features)+`<p class="hint">Point numbers correspond to the feature list. Features retain separate geometries; no acreage or suitability is calculated from this sketch.</p><table class="report-table"><thead><tr><th>Feature & location</th><th>Evidence & source</th></tr></thead><tbody>${features.map((f,i)=>`<tr><td><b>${i+1}. ${escape(f.properties.name)}</b><br>${escape(f.properties.kind)}<br>${escape(featureSummary(f))}</td><td>${escape(f.properties.note||'No observation note')}<br><small>${escape(f.properties.source)}</small>${Number.isFinite(f.properties.accuracy)?`<small>Device-reported accuracy: ±${Math.round(f.properties.accuracy)} m</small>`:''}${media.some(m=>m.featureId===f.id)?`<small>Linked photos: ${media.map((m,j)=>m.featureId===f.id?j+1:null).filter(Boolean).join(', ')}</small>`:''}</td></tr>`).join('')}</tbody></table>`;
}
