import { getHero } from "@/app/api/admin/hero/actions";
import HeroForm from "@/components/admin/hero-form";


export default async function HeroAdminPage() {
  const result = await getHero();

  if (!result.success || !result.data) {
    return (
      <div className="p-6">
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-700">
          Failed to load Hero Section.
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Hero Section
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your homepage hero content,
            buttons, trust items and images.
          </p>
        </div>

        <HeroForm hero={result.data} />
      </div>
    </main>
  );
}