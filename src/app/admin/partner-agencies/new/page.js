import AdminPartnerAgencyForm from '../AdminPartnerAgencyForm';

export default function NewPartnerAgencyPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Partner Agency</h1>
        <AdminPartnerAgencyForm />
      </div>
    </div>
  );
}
