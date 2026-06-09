import AdminTickers from './AdminTickers';

export default function AdminTickersPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Tickers</h1>
        <p className="text-gray-600 text-sm mb-6">
          Update ticker text for each page in English and Arabic. Select text to apply bold, underline, color, blink, or add a link. When adding a link, you can optionally show an underline and pick its color.
        </p>
        <AdminTickers />
      </div>
    </div>
  );
}
