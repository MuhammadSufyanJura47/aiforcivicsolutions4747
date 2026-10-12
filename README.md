# AI for Civic Solutions 2026

Production-ready hackathon website for CODELOGIX Solutions. The application
uses Next.js 16, Prisma, MySQL-compatible TiDB, Zod validation, and an
authenticated admin review area.

## Local development

1. Install dependencies:

   ```powershell
   npm install
   ```

2. Copy `.env.example` to `.env`, replace
   `REPLACE_WITH_TIDB_PASSWORD`, and provide a session secret and bcrypt admin
   password hash. The template is already configured for your TiDB Cloud
   gateway on port `4000`, the `sys` database, and TLS.

3. Initialize an empty database by running
   [`prisma/tidb-schema.sql`](./prisma/tidb-schema.sql), or use Prisma
   migrations for a development database.

4. Generate the Prisma client and start the site:

   ```powershell
   npx -p prisma@7.10.0 prisma generate
   npm run dev
   ```

The public site is available at `https://aiforcivicsolutions.tech/`.

## Functional routes

- `/apply` - registration, team members, and required payment screenshot
- `/check-status` - roll number and team-leader email status lookup
- `/sponsors` - sponsor inquiry submission
- `/speakers` - speaker application submission
- `/contact` - contact inquiry submission
- `/admin` - admin login
- `/admin/dashboard` - review metrics
- `/admin/applications` - registration and payment-proof review
- `/admin/sponsors` and `/admin/speakers` - approve and publish partner profiles

Payment screenshots are stored in the `PaymentProof.fileData` TiDB/MySQL
`MEDIUMBLOB` column. This avoids relying on a local filesystem that would be
lost by a stateless deployment.

## Image assets

Add the real assets under `public/images/` using these paths:

```text
hero/civic-innovation.jpg
hero/ideas-to-prototypes.jpg
hero/technology-with-purpose.jpg
workshops/generative-ai-civic-innovation.jpg
workshops/web-development-ai-projects.jpg
workshops/pitching-project-presentation.jpg
speakers/speaker-01.jpg
speakers/speaker-02.jpg
speakers/speaker-03.jpg
speakers/speaker-04.jpg
```

## Validation

```powershell
npx tsc --noEmit
npm run build
```
