# Md Fazle Rabbi — Personal Portfolio Website

A responsive two-page personal portfolio built with HTML, CSS, JavaScript, and optional Firebase Firestore.

## Pages
- `index.html` — Home, introduction, highlights, projects, contact form.
- `profile.html` — Profile summary, work experience, education, skills, projects, CV download.

## Your profile photo
Your uploaded portrait has already been added as `images/profile.png` and is used on both pages.

## Run on a phone
1. Extract this ZIP using your Android file manager.
2. Upload the extracted folder to a static hosting service such as Firebase Hosting, GitHub Pages, or another HTTPS static host.
3. Open the published `index.html` URL. ES module imports and Firebase require a web server/HTTPS; opening the HTML directly as a local `file://` page may not work.
4. To edit files on Android, use a code editor that can edit HTML/CSS/JS, or an online editor.

## Connect Firebase Firestore
1. Open https://console.firebase.google.com/ and create a new Firebase project.
2. Add a **Web App** in Project settings and copy its Firebase configuration.
3. Open `js/firebase.js` and replace each placeholder in `firebaseConfig` with the values from your own Firebase project.
4. In Firebase Console, create a **Cloud Firestore** database.
5. Open Firestore Rules, replace the rules with the contents of `firestore.rules`, and publish.
6. Test the contact form on the published HTTPS website.

The Firebase web configuration is not a privileged secret. Do not put service-account keys or Admin SDK credentials in this website. Firestore Rules protect your database. Enable Firebase App Check and configure an appropriate provider before public production use.

## Database collections
The project is prepared for these collections:
- `profile` — public profile data (read-only from website)
- `education` — education records (read-only)
- `experience` — experience records (read-only)
- `publicProjects` — public project cards (read-only; optional project cards load on Home)
- `publicDocuments` — metadata for public documents (read-only)
- `contactMessages` — contact form submissions; visitors can create messages but cannot read/update/delete them
- `visitorStats` — reserved for visitor statistics

### Important visitor statistics note
A secure, reliable visitor counter should not be incremented directly by every visitor's browser. The current client-side example is deliberately not enabled by the supplied rules. For reliable statistics, use a trusted Cloud Function (or another trusted backend), enable App Check, and define retention/privacy practices. Do not open unrestricted write access to `visitorStats`.

## CV file
Place your latest CV PDF in `documents/` and name it `cv.pdf`. The Profile page already links to `documents/cv.pdf`. If you do not add the file, the download link will return a not-found page.

## Updating your content
- Static page content can be edited directly in `index.html` and `profile.html`.
- Optional Home project cards can be managed in Firestore `publicProjects` after Firebase is configured. Add fields: `title`, `description`, `category`, `shortName`, and `order`.
- Do not add private information to public collections.

## Included design
Dark Navy + Blue editorial portfolio, responsive for mobile and desktop.
