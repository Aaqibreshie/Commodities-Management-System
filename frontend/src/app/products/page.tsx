"use client";

import { useState } from "react";
import Link from "next/link";
import { useQuery, useMutation, gql } from "@apollo/client";
import ProtectedLayout from "@/components/ProtectedLayout";

const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      description
      price
      quantity
      category
      updatedAt
    }
  }
`;

const DELETE_PRODUCT_MUTATION = gql`
  mutation DeleteProduct($id: String!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const { data, loading, error, refetch } = useQuery(PRODUCTS_QUERY);

  const [deleteProduct] = useMutation(DELETE_PRODUCT_MUTATION, {
    onCompleted: () => refetch(),
  });

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      await deleteProduct({ variables: { id } });
    }
  };

  const filteredProducts =
    data?.products?.filter((product: any) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        !categoryFilter || product.category === categoryFilter;
      return matchesSearch && matchesCategory;
    }) || [];

  const categories = Array.from(
    new Set(data?.products?.map((p: any) => p.category) || []),
  ) as string[];

  return (
    <ProtectedLayout>
      <div className="animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Products
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Manage your commodity inventory
            </p>
          </div>
          <Link
            href="/products/new"
            className="inline-flex items-center gap-2 px-5 py-3 btn-gradient text-white font-semibold rounded-xl shadow-lg"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Product
          </Link>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white input-focus"
                />
              </div>
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-card text-gray-900 dark:text-white input-focus"
            >
              <option value="">All Categories</option>
              {categories.map((cat: string) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Products Table */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="p-6 rounded-2xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400">
            Error loading products: {error.message}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <svg
              className="w-16 h-16 mx-auto text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-400">
              No products found
            </p>
          </div>
        ) : (
          <div className="glass rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-dark-border">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
                  {filteredProducts.map((product: any, index: number) => (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 dark:hover:bg-dark-bg/50 transition-colors animate-slide-up"
                      style={{ animationDelay: `${index * 30}ms` }}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                            {product.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-dark-bg text-gray-600 dark:text-gray-300">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 dark:text-white font-medium">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-medium ${product.quantity < 50 ? "text-orange-600 dark:text-orange-400" : "text-gray-900 dark:text-white"}`}
                        >
                          {product.quantity}
                        </span>
                        {product.quantity < 50 && (
                          <span className="ml-2 text-xs text-orange-600 dark:text-orange-400">
                            (Low)
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${product.id}/edit`}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-card transition-colors text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(product.id, product.name)
                            }
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </ProtectedLayout>
  );
}
