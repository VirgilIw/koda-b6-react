import React from "react";
import { useNavigate, useSearchParams } from "react-router";
import useFetch from "../../hooks/useFetch";
import Pagination from "./Pagination";
import Star from "../../assets/home/Star.svg";
import Shoppingcart from "../../assets/product/ShoppingCart.svg";

export default function MenuProduct() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Ambil semua params dari URL
  const page = Number(searchParams.get("page")) || 1;
  const search = searchParams.get("search") || "";
  const categories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];
  const sort = searchParams.get("sort") || "";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 100000;

  const data = useFetch("/product.json");
  const limit = 6;

  if (!data) return <p className="p-4">Loading...</p>;

  // 1. COPY DATA
  let products = [...data.products];
  console.log(products);
  // 2. FILTER SEARCH
  if (search) {
    products = products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase()),
    );
  }

  // 3. FILTER CATEGORY
  if (categories.length > 0) {
    products = products.filter((p) => {
      return categories.some((cat) => {
        if (cat === "favorite-product") {
          return p.rating >= 4.8; // anggap favorite kalau rating >= 4
        } else if (cat === "coffe") {
          return p.categoriy === "coffe";
        } else if (cat === "non-coffe") {
          return p.category === "non-coffe";
        }
        return p.category?.toLowerCase() === cat.toLowerCase();
      });
    });
  }

  // 4. FILTER RANGE PRICE
  products = products.filter((p) => p.price >= minPrice && p.price <= maxPrice);

  // 5. SORT
  if (sort === "cheapest") {
    products = products.sort((a, b) => a.price - b.price);
  } else if (sort === "priciest") {
    products = products.sort((a, b) => b.price - a.price);
  } else if (sort === "latest") {
    products = products.sort((a, b) => b.id - a.id);
  } else if (sort === "recommended") {
    products = products.sort((a, b) => a.id - b.id); // default order
  }

  // 6. PAGINATION (SETELAH FILTER & SORT)
  const totalData = products.length;
  const totalPages = Math.ceil(totalData / limit);
  const startIndex = (page - 1) * limit;
  const currentProducts = products.slice(startIndex, startIndex + limit);

  // 7. UPDATE PAGE PARAM
  const handlePageChange = (newPage) => {
    searchParams.set("page", newPage);
    setSearchParams(searchParams);
    window.scrollTo({ top: 600, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* INFO FILTER AKTIF */}
      {(search || categories.length > 0 || sort) && (
        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
          {search && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
              Search: "{search}"
            </span>
          )}
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-orange-100 px-3 py-1 text-orange-700"
            >
              {cat}
            </span>
          ))}
          {sort && (
            <span className="rounded-full bg-orange-100 px-3 py-1 text-orange-700">
              Sort: {sort}
            </span>
          )}
          <span className="text-gray-400">({totalData} products found)</span>
        </div>
      )}

      {/* GRID PRODUCT */}
      {currentProducts.length === 0 ? (
        <div className="flex flex-col items-center py-20 text-gray-400">
          <p className="text-lg font-semibold">No products found</p>
          <p className="text-sm">Try adjusting your filter</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {currentProducts.map((item) => (
            <div key={item.id} className=" h-135">
              <div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-96 w-full rounded-lg object-cover"
                />
              </div>
              <div className="relative bottom-20 left-8 w-[26vw] rounded-md bg-white py-4 px-4">
                <p className="mt-2 text-3xl font-semibold">{item.name}</p>
                <p className="mt-2 justify-center line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((item, id) => {
                    return (
                      <div key={id}>
                        <img src={Star} alt="bintang" />
                      </div>
                    );
                  })}
                  <p>{item.rating}</p>
                </div>
                <div className="flex gap-2">
                  <p className="text-red-400 line-through">
                    {item.price >= 25000 ? "IDR 30000" : "IDR 25000"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Rp {item.price.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-[80%_20%]">
                  <button
                    className="rounded bg-orange-400 py-2 hover:bg-orange-500 hover:text-white"
                    onClick={() => {
                      navigate(`/product/${item.id}`);
                    }}
                  >
                    Buy
                  </button>
                  <button className="ml-4 flex justify-center rounded border border-orange-400">
                    <img src={Shoppingcart} alt="cart" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center pb-10">
          <Pagination
            page={page}
            setPage={handlePageChange}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
}
