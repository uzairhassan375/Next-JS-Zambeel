# Partner Logos Guide

## Folder Structure

Place company logo images in the following folder:

```
public/
  └── assets/
      └── partners/
          ├── diamond/
          │   ├── techcorp-solutions.png
          │   ├── innovatehub.png
          │   ├── globaltrade-partners.png
          │   └── ... (other diamond tier logos)
          ├── gold/
          │   ├── techstart-ventures.png
          │   ├── business-boosters.png
          │   └── ... (other gold tier logos)
          └── bronze/
              ├── startup-hub.png
              ├── smallbiz-advisors.png
              └── ... (other bronze tier logos)
```

## Image Naming Convention

Use lowercase, hyphen-separated names based on the company name:
- Company: "TechCorp Solutions" → `techcorp-solutions.png`
- Company: "InnovateHub" → `innovatehub.png`
- Company: "GlobalTrade Partners" → `globaltrade-partners.png`

## Supported Image Formats

- PNG (recommended - supports transparency)
- JPG/JPEG
- WebP (recommended for better performance)
- SVG (scalable vector graphics)

## Image Specifications

**Recommended size:** 200x200px to 400x400px
**Aspect ratio:** 1:1 (square) works best
**Background:** Transparent PNG preferred, or white background
**File size:** Keep under 100KB for optimal performance

## How to Add Logos

### Step 1: Create the folder structure
```bash
mkdir -p public/assets/partners/diamond
mkdir -p public/assets/partners/gold
mkdir -p public/assets/partners/bronze
```

### Step 2: Add logo images
Place your logo files in the appropriate tier folder:
- Diamond tier logos → `public/assets/partners/diamond/`
- Gold tier logos → `public/assets/partners/gold/`
- Bronze tier logos → `public/assets/partners/bronze/`

### Step 3: Update the company data
In `src/pages/PartnerAgenciesPage.jsx`, add the `logo` property to each company object:

```javascript
{
  id: 1,
  name: 'TechCorp Solutions',
  description: '...',
  contact: 'contact@techcorp.com',
  website: 'www.techcorp.com',
  logo: '/assets/partners/diamond/techcorp-solutions.png' // Add this line
}
```

### Example for all tiers:

**Diamond Tier:**
```javascript
{ 
  id: 1, 
  name: 'TechCorp Solutions', 
  logo: '/assets/partners/diamond/techcorp-solutions.png',
  // ... other properties
}
```

**Gold Tier:**
```javascript
{ 
  id: 11, 
  name: 'TechStart Ventures', 
  logo: '/assets/partners/gold/techstart-ventures.png',
  // ... other properties
}
```

**Bronze Tier:**
```javascript
{ 
  id: 21, 
  name: 'StartUp Hub', 
  logo: '/assets/partners/bronze/startup-hub.png',
  // ... other properties
}
```

## Fallback Behavior

If a logo is not provided or the image file doesn't exist, the component will automatically:
- Display the company initials (first 2 letters) in a colored box
- Use the tier-specific color scheme (Diamond: Blue, Gold: Yellow, Bronze: Orange)

## Notes

- Logo images are automatically optimized by Next.js Image component
- The component handles both logo images and fallback initials seamlessly
- Logos are displayed with a white background container
- Images are responsive and scale properly on mobile and desktop
