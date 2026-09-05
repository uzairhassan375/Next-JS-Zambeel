import AdminTickers from './AdminTickers';

export default function AdminTickersPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-2xl font-bold text-gray-800">Tickers</h1>
        <p className="mb-6 text-sm text-gray-600">
          Pick a page, choose which ticker to edit (when a page has more than one), then open the
          editor sheet to update copy, bar color, scroll speed, and attention effects.
        </p>
        <AdminTickers />
      </div>
    </div>
  );
}
