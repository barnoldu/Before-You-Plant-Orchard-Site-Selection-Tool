# Before You Plant — Kentucky Fruit Site Planner

Working prototype · version 10 · updated November 11, 2026. A guided site assessment, mapping and report tool for growers and Extension.

## GitHub upload
1. Upload the latest single-file `index.html` to the repository root, replacing the previous file.
2. Upload this `README.md` beside it, replacing the old README.
3. Commit the changes and allow the existing GitHub Pages deployment to finish, then refresh the site.

The website runs from `index.html`; the README is documentation and does not affect the app. Older application files and folders can remain. File order does not matter. No package installation, build command or API key is required to use the supplied single-file release. Use the hosted HTTPS website for phone location and sharing.

For a new repository, configure GitHub Pages to publish the branch and folder containing `index.html`. The existing site URL is https://barnoldu.github.io/Before-You-Plant-Orchard-Site-Selection-Tool/ .

## Site mapping and reports
In Maps & photos, select a drawn/imported boundary or GPS point and choose Generate site maps. The tool queries USDA Soil Data Access and USGS 3DEP directly. No API key or server is needed for mapping. Internet and service availability are required.

Outputs: soil map units and component descriptions/classification; separate surface-texture, natural-drainage and restrictive-depth figures; drainage/hydric/hydrologic group and reported restrictions; slope percent; compass aspect; height relative to block mean; height relative to the lowest valid cell in a 300 m context; possible downhill terrain paths. Nine annotated PNG maps are downloadable and included in the report and assessment backup.

A point creates a clearly labeled 100 m square context window and reports mapped soil, elevation and slope at the point. This is not a planting boundary. Maximum analysis width/height is 5 km; polygons over 500 vertices must be simplified. Four most recent analysis areas are retained. Changed boundaries are marked outdated.

Photos remain captioned evidence linked to map points. No automatic EXIF extraction or photo interpretation is performed.

## Extension handoff
Email drafts are addressed to Brent.Arnoldussen@uky.edu, verified against UK Horticulture’s directory, and copy the agent when the grower provides the county agent’s email. A named agent without an email is explicitly reported as not copied. The report includes Open email draft, download-to-attach, and native file sharing when supported. The grower must attach and send in their email app. This static version does not submit email or attachments directly or confirm delivery. True in-page submissions need a delivery service and designated recipient; the recipient is configured, but no delivery service has been connected.

## Reading the results
SSURGO map-unit component percentages do not locate each component within the field. Missing restriction records do not prove unrestricted rooting. Soil descriptions are not laboratory soil tests. DEM output pixel spacing does not imply native data resolution; the USGS composite varies by location and acquisition date. Horn 3x3 slope/aspect uses local UTM meters. Statistics use boundary cell centers. Flat aspect is <1% slope. Terrain paths use unfilled D8 descent and are hypotheses, not a cold-air, frost, wind, shade or sunlight model. They may stop in depressions. Supported structured field observations fill rating categories automatically. Mapped estimates supply reviewable proposed categories; partial evidence supplies context, relative confidence and concrete field checks. Unknowns and unresolved conflicts remain outside the completed score. No major check is automatically passed.

The selected analysis area and surrounding terrain context are sent to USDA/USGS to retrieve data. The interactive basemap also requests online OpenStreetMap tiles. Assessment names, contact details, photos and notes remain local until the grower exports or shares them. Original field data and teaching examples are distinct.

## Optional: rebuilding from source
If you downloaded the source archive, extract it, install Node.js and run `npm install`, `npm test`, then `npm run build`. Upload `public/index.html`. This source package includes the original multi-file source under dist plus the bundler and licenses. It contains no grower assessments or farm coordinates.

## Validation
Passed metric terrain tests, invalid geometry checks before retrieval, explicit service-outage handling, worksheet scoring/report regression checks, backup compatibility, live USDA/USGS requests for a synthetic test boundary and point, nine-map PNG generation, report inclusion, and final bundled JavaScript syntax checks. Map images were visually inspected. Browser preview was blocked by this session's browser access restrictions; the new UI and phone sharing have not been fully verified in a browser/device.

## Evidence and confidence
Ratings retain provenance. Tool-generated suggestions do not count until accepted. Direct structured field measurements can fill supported categories. Existing manual ratings, including deliberate Unsure, are preserved; users can explicitly replace them with current evidence. Accepted derived values lose acceptance when their evidence changes; changed/deleted map boundaries invalidate mapped suggestions. Multiple boundary analyses require choosing the one being rated; point-context maps do not stand in for block evidence.

Confidence is qualitative (not assessed, limited, moderate, higher) and describes support for a particular answer, not probability of orchard success. Terrain routes and contextual relative heights remain useful partial evidence, with specific barrier, low-reference, local-history or temperature-monitoring checks. USDA representative horizon textures, natural drainage classes and restriction depths inform estimates and probing priorities. Exact texture matches are proposed where supported; soil-family labels are not substituted for surface/root-zone texture. Mixed profiles and broad loam categories require interpretation.

No switchable analysis layers are added. Nine separate site figures are included in the report and available as image downloads.

## Saving work
Assessments save in the browser on the current device. Download a backup to keep a separate copy or move devices; open that backup on the other device. Clearing browser data can remove the local assessment. Moving between different website addresses does not transfer assessments automatically. Teaching photographs are examples and are excluded from grower site-evidence reports.

## Materials and licenses
The teaching photographs and worksheet remain their contributors’ material; this release does not assign a new reuse license to them. Third-party code licenses are retained in the source archive and single-file export.
