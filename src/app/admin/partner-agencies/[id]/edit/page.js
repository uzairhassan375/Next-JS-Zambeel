import AdminPartnerAgencyEditPage from './AdminPartnerAgencyEditPage';

export default async function EditPartnerAgencyPage({ params }) {
  const { id } = await params;
  return <AdminPartnerAgencyEditPage agencyId={id} />;
}
