# Worksheet coverage and teaching images

Source: `Site Selection two part( Worksheet 1 of 2)(1).docx`, received November 11, 2026. The supplied latest file was compared with the existing source and its text is identical. The downloadable original is `resources/Before_You_Plant_Field_Worksheet.docx`.

## Coverage audit

| Worksheet consideration | Interactive location | Report output |
| --- | --- | --- |
| Purpose, grower, agent, date, location, crops, market, year, acreage, goal | Your site; assessment purpose | Site metadata, goal, purpose |
| Nine initial Yes/No/Unsure checks | Your site → Quick site check | Recorded answers; unresolved critical No answers flagged |
| Shade, wetness, restrictions, cold-air movement, irrigation, equipment, layout, crop fit | Field walk, major checks, ratings | Observations, checks, ratings, follow-up |
| Block shape, previous land use, wetness, obstructions, water, equipment, three unknowns | Walk the field → Block shape, land use, and access | Worksheet details |
| High, middle, low, edge observations | Five guided GPS/photo stops; additional field observations | Guided stops, location accuracy, photo references, notes |
| All 17 suggested photographs; scale and captions | Maps & photos → Photo checklist | Checklist status; actual attached photos separately |
| Two–three soil probes, depth checked, exact location, topsoil, restrictions, bedrock, mottling, hardpan, water | Walk the field → Additional field observations and probe notes | Probe table and soil profile details |
| Alternatives to an auger, soil testing, field evidence versus mapping | Soil details, drainage details, source choices | Recorded plans, evidence sources and discrepancies |
| Sunlight timing, source, extent, and possible remedies | Major checks → Shade observations | Evidence, result, review options |
| Persistent water, water in holes, chronic wetness, mapped drainage, soil colors/odor; remedies | Major checks → Wet-soil warning signs | Recorded warning signs, evidence conflicts, review flag |
| Restrictions above 24 inches, type/location, possible changes | Rooting-depth check and follow-up | Restriction evidence, review flag, options |
| Low position, blocked outlet, repeated colder-site history, all cold-air evidence choices | Cold-air route and local history | Recorded evidence and all-three-signs review flag |
| Nine rated items and three 100-point sections | Site rating | Evidence-supported score and worksheet bands |
| Slope method, relative height and named low-ground reference | Walk the field → Slope and relative height | Measurements and method |
| Irrigation source, reliability, capacity, delivery, cost | Walk the field → Irrigation source and feasibility | Details and irrigation rating |
| Light-preferred versus practical row orientation, reasons, proposed direction, concern, Extension question | Walk the field → Equipment, block layout, and row orientation | All recorded layout details |
| Weather station, spring freezes, winter injury, early bloom/cold sensitivity | Walk the field → Weather and crop fit | Unscored context |
| GO / GO WITH PLANNING / PAUSE / UNSURE and 3–5 sentence explanation | Your report → Your decision statement | Grower judgment separate from tool status |
| Top three concerns and next steps; unsure count | Your report; choice fields throughout | Numbered priorities, additional notes, unsure/unanswered counts |
| Email review package | Copy email summary; download/print report | Location, crop/market/year, scores, checks, priorities, question, evidence counts |

## Interpretation and compatibility

- Worksheet scores are unchanged. Missing evidence remains pending, rather than receiving zero.
- Failed major checks, unresolved critical initial No answers, recorded wet-soil warnings, restrictions above 24 inches, all three frost-pocket warning signs, or zero-point irrigation/access feasibility trigger review regardless of the total.
- Selecting a mitigation option or a grower GO decision does not clear a concern.
- Shared slope/height endpoints and the uncovered relative-height interval retain the existing instruction to review the category with Extension.
- Version 1 backups remain compatible. New details are stored as strings under existing groups. Multi-selections use JSON arrays within those strings. Up to 32 attached photos are retained, within existing byte limits.
- Teaching examples are excluded from assessment reports and backups. Reports include only user-attached site images.

## Teaching-image provenance

All images were supplied by the user for this website. Original image bytes were copied without alteration. Display uses containment so profile scales and image edges remain visible.

| Website asset | Supplied original | Teaching purpose |
| --- | --- | --- |
| field-overview.jpg | 20240326_181202 (1).jpg | Whole-block context, trees/buildings, repeated views |
| water-in-hole.jpg | 20240326_181319 (1).jpg | Augered drainage-test hole; record depth, rainfall, water source, and timed water levels |
| redox-features.jpg | Fe & Fe-Mn oxide accumulation in soil (1).jpg | Color contrasts and verification of current wetness |
| soil-profile.jpg | Picture2 (1).jpg | Changes with depth and scale units |
| fragipan-profile.jpg | Fragipan Pit Profile Pic (1).jpg | Suspected restriction and usable rooting zone |
| fragipan-prisms.jpg | Fragipan Pics.pptx, ppt/media/image5.jpeg | Prismatic structure and root distribution |

The additional supplied `Jerry Mc Soil Horizon Pictures.pptx` was reviewed; it remains available for future teaching expansion. Captions distinguish visible observations from unconfirmed interpretations. Supporting references: UK AGR-250 (https://publications.mgcafe.uky.edu/agr-250) and NC State redoximorphic-feature guidance (https://content.ces.ncsu.edu/redoximorphic-features-for-identifying-aquic-conditions).

## Verification

`node tests/worksheet.mjs` verifies unchanged scoring, evidence overrides, legacy/new backup compatibility, 32-photo retention, complete report-section coverage, escaping, and separation of teaching images from site evidence. Browser QA confirms checklist and text persistence, new decision/priorities in the report, and the wetness review flag. Phone GPS/camera still require real-device testing.
