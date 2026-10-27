---
name: Portable npm lockfiles
description: Keep dependency download URLs usable by external build environments.
---

Preserve public npm registry tarball URLs in committed lockfiles after package updates.

**Why:** The managed package installer can write Replit-internal registry URLs, while this project also has an external Vercel build configuration. Internal download hosts are not portable to that environment.

**How to apply:** After installing approved dependency updates, inspect lockfile download hosts. Normalize internal tarball URLs to their public npm equivalents without changing versions or integrity hashes, then verify a clean install separately from the running app.
