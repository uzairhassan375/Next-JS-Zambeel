/**
 * Transform a partner agency document for API response.
 * Ensures plain object and string id for client; preserves all fields (descriptionEn, contact, phone, etc.).
 */
export function partnerAgencyForResponse(agency) {
  if (!agency) return agency;
  const a = { ...agency };
  if (a._id) {
    a.id = typeof a._id === 'object' && a._id?.toString ? a._id.toString() : String(a._id);
  }
  // Ensure text fields are strings so client always receives them
  if (a.descriptionEn === undefined) a.descriptionEn = '';
  if (a.descriptionAr === undefined) a.descriptionAr = '';
  if (a.contact === undefined) a.contact = '';
  if (a.phone === undefined) a.phone = '';
  return a;
}

export function partnerAgenciesForResponse(agencies) {
  return Array.isArray(agencies) ? agencies.map(partnerAgencyForResponse) : agencies;
}
