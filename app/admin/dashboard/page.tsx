import { auth } from "@/auth";
import { redirect } from "next/navigation";

import { getOrders } from "@/app/api/admin/order/actions";

export default async function AdminDashboardPage() {
  // ==========================================
  // AUTHENTICATION
  // ==========================================

  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // ==========================================
  // GET ORDERS FROM BACKEND
  // ==========================================

  const result = await getOrders();

  const totalOrders = result.success && result.data ? result.data.length : 0;

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* ========================================== */}
        {/* HEADER */}
        {/* ========================================== */}

        <div className="mb-8">
          <h1 className="text-2xl font-black text-[#5b0909] sm:text-3xl">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#6b4a3c]">
            Welcome, {session.user.email}
          </p>
        </div>

        {/* ========================================== */}
        {/* STAT CARDS */}
        {/* ========================================== */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* TOTAL ORDERS */}

          <div className="rounded-2xl border border-[#ead9bd] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Orders
                </p>

                <p className="mt-2 text-3xl font-black text-[#5b0909]">
                  {totalOrders}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#ed1c24]/10 text-xl">
                🛒
              </div>
            </div>
          </div>

          {/* PENDING ORDERS */}

          <div className="rounded-2xl border border-[#ead9bd] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Pending Orders
                </p>

                <p className="mt-2 text-3xl font-black text-yellow-600">
                  {result.success
                    ? result.data.filter((order) => order.status === "pending")
                        .length
                    : 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-xl">
                ⏳
              </div>
            </div>
          </div>

          {/* APPROVED ORDERS */}

          <div className="rounded-2xl border border-[#ead9bd] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Approved Orders
                </p>

                <p className="mt-2 text-3xl font-black text-blue-600">
                  {result.success
                    ? result.data.filter((order) => order.status === "approved")
                        .length
                    : 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl">
                ✓
              </div>
            </div>
          </div>

          {/* DELIVERED ORDERS */}

          <div className="rounded-2xl border border-[#ead9bd] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Delivered Orders
                </p>

                <p className="mt-2 text-3xl font-black text-green-600">
                  {result.success
                    ? result.data.filter(
                        (order) => order.status === "delivered",
                      ).length
                    : 0}
                </p>
              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-xl">
                📦
              </div>
            </div>
          </div>
        </div>

        {/* ========================================== */}
        {/* RECENT ORDERS */}
        {/* ========================================== */}

        <div className="mt-8 rounded-2xl border border-[#ead9bd] bg-white shadow-sm">
          <div className="border-b border-[#ead9bd] p-5">
            <h2 className="text-lg font-bold text-[#5b0909]">Recent Orders</h2>

            <p className="mt-1 text-sm text-gray-500">Latest customer orders</p>
          </div>

          {result.success && result.data.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b border-[#ead9bd] bg-[#fff8eb] text-left">
                    <th className="px-5 py-4 text-xs font-bold text-gray-600">
                      Customer
                    </th>

                    <th className="px-5 py-4 text-xs font-bold text-gray-600">
                      Product
                    </th>

                    <th className="px-5 py-4 text-xs font-bold text-gray-600">
                      Quantity
                    </th>

                    <th className="px-5 py-4 text-xs font-bold text-gray-600">
                      Total
                    </th>

                    <th className="px-5 py-4 text-xs font-bold text-gray-600">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {result.data.slice(0, 10).map((order) => (
                    <tr
                      key={order._id}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#5b0909]">
                          {order.customer.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {order.customer.phone}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-medium text-gray-700">
                          {order.productName}
                        </p>

                        <p className="text-xs text-gray-500">{order.weight}</p>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-700">
                        {order.quantity}
                      </td>

                      <td className="px-5 py-4 text-sm font-bold text-[#8b0808]">
                        ৳{order.totalPrice}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : order.status === "approved"
                                ? "bg-blue-100 text-blue-700"
                                : order.status === "delivered"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-red-100 text-red-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500">No orders found.</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
