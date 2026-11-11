# Before You Plant — Kentucky Fruit Site Planner

GitHub Pages package of the latest published version, November 11, 2026 (version 7). Includes the corrected caption identifying the pictured hole as an augered hole used to test drainage.

## Publish on GitHub Pages

1. Extract this ZIP on your computer.
2. Open your GitHub repository, or create a new public repository for the planner.
3. Choose **Add file → Upload files**. Upload the **contents** of the extracted `Kentucky_Fruit_Site_Planner` folder, preserving the `assets`, `resources`, `vendor`, and `tests` folders. `index.html` must be at the top level of the repository, not inside an extra enclosing folder. Upload the extracted files, not the ZIP itself. Commit the changes to `main`.
4. Under **Settings → Pages**, choose **Deploy from a branch**, then **main** and **/(root)**, and click **Save**.
5. Open the website link shown in Pages after deployment finishes. Refresh the page if you have an older copy open.

No build command, package installation, account system, or API key is required. Include the supplied empty `.nojekyll` file. If your file picker hides it, use GitHub's **Add file → Create new file** to create a file named `.nojekyll` at the repository root.

For an existing repository, replace matching application files and retain these folder names. This package assumes Pages serves the root of `main`; a repository already using a custom publishing workflow may need its Pages source changed accordingly.

GitHub instructions: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Included

- Six-step assessment with explanations as growers work.
- Full supplied worksheet coverage, nine initial checks, four major checks, and nine evidence-supported ratings totaling 300 points.
- UK blue-and-white styling with a text heading.
- Five suggested field-walk stops, user-initiated phone location and photo capture.
- Interactive map, pins, candidate boundaries, coordinate/Google pin entry, and GeoJSON, KML/KMZ, GPX, and shapefile ZIP imports.
- Six supplied teaching photos, an expandable 17-view photo checklist, and the original downloadable worksheet.
- Soil, wetness, cold-air, slope, relative-height, irrigation, row-orientation, and crop/weather details.
- Grower decision, priorities, and follow-up questions; report printing/PDF, self-contained HTML download, and copyable email summary.

## Saving and moving assessments

Assessments save in the visitor's browser. The application does not send grower answers or photos to a server. Use **Download backup** to preserve an assessment and **Open a backup** to restore it or move it between devices.

Moving from the existing hosted website to GitHub Pages creates a different browser-storage location. First download the backup from the old website, then open it in the new one. Data does not transfer automatically. Teaching images are learning examples and do not appear as site observations in the generated report.

## Device and mapping notes

Open the hosted HTTPS website for phone GPS, camera/file selection, browser storage, and report downloads. The app does not run reliably by double-clicking `index.html` as a local file because it uses JavaScript modules. GPS/camera availability depends on the device, browser, and permissions; real-phone field verification remains necessary.

OpenStreetMap basemap tiles need an internet connection. Map tiles are requested from OpenStreetMap. Map pins, field observations, and reports remain the grower's responsibility to verify. Automatic soil retrieval, terrain analysis, image diagnosis, shared accounts, and automatic email sending are not included.

The app preserves the worksheet scoring and flags recorded critical concerns even with a high score. It supports screening and Extension discussion, not investment approval. See `WORKSHEET_COVERAGE.md` for the source-to-form mapping and image provenance.

## Files and maintenance

`index.html` is the entry point. Application code is in the `.mjs` files; styling is in `style.css`. Keep all supplied asset folders beside these files. Third-party licenses are retained in `vendor`.

The supplied photographs and worksheet remain their contributors' material; this package does not assign a new reuse license to them.

Optional developer check, with Node.js installed: `node tests/worksheet.mjs`. These checks cover scoring, concern overrides, backups, report coverage, escaping, and separation of teaching images from site evidence.
