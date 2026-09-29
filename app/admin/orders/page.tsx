
"use client";

import { useCallback, useEffect, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  Loader2,
  PackageCheck,
  RefreshCw,
  Search,
  Trash2,
  XCircle,
  Phone,
  MapPin,
  User,
  ShoppingBag,
} from "lucide-react";

import type { OrderStatus } from "@/models/Order";

// ==========================================
// TYPES
// ==========================================

interface Order {
  _id: string;

  productId: string;
  productName: string;
  weight: string;

  quantity: number;
  price: string;
  totalPrice: number;

  customer: {
    name: string;
    phone: string;
    address: string;
    note: string;
  };

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
}

interface OrdersResponse {
  success: boolean;
  data?: Order[];
  message?: string;
}

// ==========================================
// HELPERS
// ==========================================

function formatDate(date: string) {
  try {
    return new Intl.DateTimeFormat("en-BD", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(new Date(date));
  } catch {
    return date;
  }
}

function getStatusLabel(status: OrderStatus) {
  switch (status) {
    case "pending":
      return "Pending";
    case "approved":
      return "Approved";
    case "delivered":
      return "Delivered";
    case "rejected":
      return "Rejected";
    default:
      return status;
  }
}

// ==========================================
// STATUS BADGE
// ==========================================

function StatusBadge({
  status,
}: {
  status: OrderStatus;
}) {
  if (status === "pending") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-700">
        <Clock3 className="h-3.5 w-3.5" />
        Pending
      </span>
    );
  }

  if (status === "approved") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
        <CheckCircle2 className="h-3.5 w-3.5" />
        Approved
      </span>
    );
  }

  if (status === "delivered") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
        <PackageCheck className="h-3.5 w-3.5" />
        Delivered
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700">
      <XCircle className="h-3.5 w-3.5" />
      Rejected
    </span>
  );
}

// ==========================================
// PAGE
// ==========================================

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [refreshing, setRefreshing] = useState(false);

  const [updatingId, setUpdatingId] = useState<string | null>(
    null,
  );

  const [deletingId, setDeletingId] = useState<string | null>(
    null,
  );

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] = useState<
    "all" | OrderStatus
  >("all");

  const [message, setMessage] = useState("");

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const loadOrders = useCallback(
    async (showRefreshLoader = false) => {
      try {
        if (showRefreshLoader) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setMessage("");

        const response = await fetch(
          "/api/admin/order",
          {
            method: "GET",
            cache: "no-store",
          },
        );

        const result: OrdersResponse =
          await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to load orders.",
          );
        }

        setOrders(result.data ?? []);
      } catch (error) {
        console.error(
          "Load orders error:",
          error,
        );

        setMessage(
          error instanceof Error
            ? error.message
            : "Failed to load orders.",
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    [],
  );

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // ==========================================
  // UPDATE STATUS
  // ==========================================

  const handleStatusChange = async (
    id: string,
    status: OrderStatus,
  ) => {
    try {
      setUpdatingId(id);
      setMessage("");

      const response = await fetch(
        "/api/admin/order",
        {
          method: "PATCH",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id,
            status,
          }),
        },
      );

      const result: OrdersResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to update order.",
        );
      }

      /*
       * Update the local list immediately.
       * Then request the latest data again from DB.
       */
      if (result.data?.length) {
        const updatedOrder =
          result.data[0];

        setOrders((previous) =>
          previous.map((order) =>
            order._id === id
              ? updatedOrder
              : order,
          ),
        );
      } else {
        setOrders((previous) =>
          previous.map((order) =>
            order._id === id
              ? {
                  ...order,
                  status,
                }
              : order,
          ),
        );
      }

      // Get fresh database data.
      await loadOrders(true);
    } catch (error) {
      console.error(
        "Update order status error:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to update order.",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // ==========================================
  // DELETE ORDER
  // ==========================================

  const handleDelete = async (
    id: string,
  ) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);
      setMessage("");

      const response = await fetch(
        "/api/admin/order",
        {
          method: "DELETE",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            id,
          }),
        },
      );

      const result: OrdersResponse =
        await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Failed to delete order.",
        );
      }

      // Remove immediately from UI.
      setOrders((previous) =>
        previous.filter(
          (order) => order._id !== id,
        ),
      );

      // Fetch latest data again.
      await loadOrders(true);
    } catch (error) {
      console.error(
        "Delete order error:",
        error,
      );

      setMessage(
        error instanceof Error
          ? error.message
          : "Failed to delete order.",
      );
    } finally {
      setDeletingId(null);
    }
  };

  // ==========================================
  // FILTER ORDERS
  // ==========================================

  const filteredOrders = orders.filter(
    (order) => {
      const search =
        searchTerm.trim().toLowerCase();

      const matchesSearch =
        !search ||
        order.productName
          .toLowerCase()
          .includes(search) ||
        order.customer.name
          .toLowerCase()
          .includes(search) ||
        order.customer.phone
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    },
  );

  // ==========================================
  // COUNTS
  // ==========================================

  const pendingCount = orders.filter(
    (order) =>
      order.status === "pending",
  ).length;

  const approvedCount = orders.filter(
    (order) =>
      order.status === "approved",
  ).length;

  const deliveredCount = orders.filter(
    (order) =>
      order.status === "delivered",
  ).length;

  const rejectedCount = orders.filter(
    (order) =>
      order.status === "rejected",
  ).length;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-gray-600" />

          <p className="text-sm text-gray-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // PAGE
  // ==========================================

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* ======================================
          HEADER
      ====================================== */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Orders
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer orders and
            update order status.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            loadOrders(true)
          }
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            className={`h-4 w-4 ${
              refreshing
                ? "animate-spin"
                : ""
            }`}
          />

          Refresh
        </button>
      </div>

      {/* ======================================
          ERROR / MESSAGE
      ====================================== */}

      {message && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {message}
        </div>
      )}

      {/* ======================================
          STATS
      ====================================== */}

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <button
          type="button"
          onClick={() =>
            setStatusFilter("pending")
          }
          className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:shadow ${
            statusFilter === "pending"
              ? "border-amber-400"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Pending
            </span>

            <Clock3 className="h-5 w-5 text-amber-500" />
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {pendingCount}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatusFilter("approved")
          }
          className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:shadow ${
            statusFilter === "approved"
              ? "border-blue-400"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Approved
            </span>

            <CheckCircle2 className="h-5 w-5 text-blue-500" />
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {approvedCount}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatusFilter("delivered")
          }
          className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:shadow ${
            statusFilter === "delivered"
              ? "border-green-400"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Delivered
            </span>

            <PackageCheck className="h-5 w-5 text-green-500" />
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {deliveredCount}
          </p>
        </button>

        <button
          type="button"
          onClick={() =>
            setStatusFilter("rejected")
          }
          className={`rounded-xl border bg-white p-4 text-left shadow-sm transition hover:shadow ${
            statusFilter === "rejected"
              ? "border-red-400"
              : "border-gray-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Rejected
            </span>

            <XCircle className="h-5 w-5 text-red-500" />
          </div>

          <p className="mt-2 text-2xl font-bold text-gray-900">
            {rejectedCount}
          </p>
        </button>
      </div>

      {/* ======================================
          SEARCH / FILTER
      ====================================== */}

      <div className="flex flex-col gap-3 rounded-xl border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(
                event.target.value,
              )
            }
            placeholder="Search product, customer or phone..."
            className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-gray-400"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target
                .value as
                | "all"
                | OrderStatus,
            )
          }
          className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-gray-400"
        >
          <option value="all">
            All Orders
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="delivered">
            Delivered
          </option>

          <option value="rejected">
            Rejected
          </option>
        </select>
      </div>

      {/* ======================================
          ORDER COUNT
      ====================================== */}

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing{" "}
          <span className="font-medium text-gray-900">
            {filteredOrders.length}
          </span>{" "}
          of{" "}
          <span className="font-medium text-gray-900">
            {orders.length}
          </span>{" "}
          orders
        </p>

        {statusFilter !== "all" && (
          <button
            type="button"
            onClick={() =>
              setStatusFilter("all")
            }
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Clear filter
          </button>
        )}
      </div>

      {/* ======================================
          EMPTY STATE
      ====================================== */}

      {filteredOrders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-200 bg-white py-16 text-center">
          <ShoppingBag className="mx-auto h-10 w-10 text-gray-300" />

          <h3 className="mt-4 text-base font-semibold text-gray-900">
            No orders found
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            There are no orders matching
            your current filter.
          </p>
        </div>
      ) : (
        /* ====================================
           ORDERS
        ==================================== */

        <div className="space-y-4">
          {filteredOrders.map(
            (order) => (
              <div
                key={order._id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                {/* ============================
                    ORDER HEADER
                ============================ */}

                <div className="flex flex-col gap-3 border-b border-gray-100 p-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900">
                        Order #
                        {order._id.slice(
                          -8,
                        )}
                      </span>

                      <StatusBadge
                        status={
                          order.status
                        }
                      />
                    </div>

                    <p className="mt-1 text-xs text-gray-500">
                      {formatDate(
                        order.createdAt,
                      )}
                    </p>
                  </div>

                  {/* STATUS ACTIONS */}

                  <div className="flex flex-wrap items-center gap-2">
                    {order.status !==
                      "approved" &&
                      order.status !==
                        "delivered" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              order._id,
                              "approved",
                            )
                          }
                          disabled={
                            updatingId ===
                              order._id ||
                            deletingId ===
                              order._id
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId ===
                          order._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <CheckCircle2 className="h-3.5 w-3.5" />
                          )}

                          Approve
                        </button>
                      )}

                    {order.status ===
                      "approved" && (
                      <button
                        type="button"
                        onClick={() =>
                          handleStatusChange(
                            order._id,
                            "delivered",
                          )
                        }
                        disabled={
                          updatingId ===
                            order._id ||
                          deletingId ===
                            order._id
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {updatingId ===
                        order._id ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <PackageCheck className="h-3.5 w-3.5" />
                        )}

                        Delivered
                      </button>
                    )}

                    {order.status !==
                      "rejected" &&
                      order.status !==
                        "delivered" && (
                        <button
                          type="button"
                          onClick={() =>
                            handleStatusChange(
                              order._id,
                              "rejected",
                            )
                          }
                          disabled={
                            updatingId ===
                              order._id ||
                            deletingId ===
                              order._id
                          }
                          className="inline-flex items-center gap-1.5 rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {updatingId ===
                          order._id ? (
                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5" />
                          )}

                          Reject
                        </button>
                      )}

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(
                          order._id,
                        )
                      }
                      disabled={
                        deletingId ===
                          order._id ||
                        updatingId ===
                          order._id
                      }
                      className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId ===
                      order._id ? (
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="h-3.5 w-3.5" />
                      )}

                      Delete
                    </button>
                  </div>
                </div>

                {/* ============================
                    ORDER CONTENT
                ============================ */}

                <div className="grid gap-6 p-4 lg:grid-cols-3">
                  {/* PRODUCT */}

                  <div className="lg:col-span-1">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Product
                    </p>

                    <div className="flex gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                        <ShoppingBag className="h-5 w-5 text-gray-500" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900">
                          {
                            order.productName
                          }
                        </h3>

                        <p className="mt-1 text-sm text-gray-500">
                          Weight:{" "}
                          {order.weight}
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Quantity:{" "}
                          <span className="font-medium text-gray-900">
                            {
                              order.quantity
                            }
                          </span>
                        </p>

                        <p className="mt-1 text-sm text-gray-500">
                          Unit Price:{" "}
                          <span className="font-medium text-gray-900">
                            {order.price}
                          </span>
                        </p>

                        <p className="mt-2 text-base font-bold text-gray-900">
                          Total:{" "}
                          {order.totalPrice.toLocaleString(
                            "en-BD",
                          )}{" "}
                          টাকা
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* CUSTOMER */}

                  <div className="lg:col-span-1">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Customer
                    </p>

                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-start gap-2">
                        <User className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                        <span className="text-gray-700">
                          {
                            order
                              .customer
                              .name
                          }
                        </span>
                      </div>

                      <a
                        href={`tel:${order.customer.phone}`}
                        className="flex items-center gap-2 text-gray-700 hover:text-blue-600"
                      >
                        <Phone className="h-4 w-4 shrink-0 text-gray-400" />

                        {
                          order
                            .customer
                            .phone
                        }
                      </a>

                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                        <span className="whitespace-pre-line text-gray-700">
                          {
                            order
                              .customer
                              .address
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* NOTE / SUMMARY */}

                  <div className="lg:col-span-1">
                    <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Order Details
                    </p>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Quantity
                        </span>

                        <span className="font-medium text-gray-900">
                          {
                            order.quantity
                          }
                        </span>
                      </div>

                      <div className="mt-2 flex items-center justify-between text-sm">
                        <span className="text-gray-500">
                          Price
                        </span>

                        <span className="font-medium text-gray-900">
                          {
                            order.price
                          }
                        </span>
                      </div>

                      <div className="my-3 border-t border-gray-200" />

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-gray-700">
                          Total
                        </span>

                        <span className="text-lg font-bold text-gray-900">
                          {order.totalPrice.toLocaleString(
                            "en-BD",
                          )}{" "}
                          টাকা
                        </span>
                      </div>
                    </div>

                    {order.customer
                      .note && (
                      <div className="mt-3">
                        <p className="text-xs font-medium text-gray-400">
                          Customer Note
                        </p>

                        <p className="mt-1 whitespace-pre-line text-sm text-gray-600">
                          {
                            order
                              .customer
                              .note
                          }
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ),
          )}
        </div>
      )}
    </div>
  );
}