"use client";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { api } from "../trpc/react";
import Loading from "./_components/loading";

interface CategoryItem {
  id: number;
  semanticId: string;
  name: string;
  isChecked?: boolean;
}

export default function Home() {
  const [pageData, setPageData] = useState<CategoryItem[]>([]);
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(6); // no need to assume, will also come from db but ok for now

  const categoryData = api.category.getAll.useMutation({
    onSuccess(data) {
      console.log(data?.categories, "data?.categories");
      setPageData(data?.categories as []);
      setPageCount(data?.pageCount!);
    },
    onError(error) {
      console.log(error, "error");
      toast.error(error.message);
    },
  });

  const updateInterest = api.category.markInterest.useMutation({
    onSuccess(data) {
      toast.success("Interest updated");
      console.log(data, "data");
    },
    onError(error) {
      console.log(error, "error");
      toast.error(error.message);
      // todo: revert back to previous state
    },
  });

  // * check handler
  const onCheckClick = (item: CategoryItem) => {
    console.log(item, item.isChecked);
    setPageData((prev) => {
      return prev.map((val) => {
        if (val.id === item.id) {
          return {
            ...val,
            isChecked: !val.isChecked,
          };
        }
        return val;
      });
    });

    // mutate interest
    updateInterest.mutate({
      categoryId: item.id,
      check: !item.isChecked,
    });
  };

  // update categories on page change
  useEffect(() => {
    categoryData.mutate({
      offset: (currentPage - 1) * pageSize, // offset id
    });
  }, [currentPage]);

  return (
    <div className="interests-page border border-borderClr w-fit mx-auto px-12 py-14 mt-10 mobile:px-5  rounded-xl overflow-hidden">
      <div className="text-center">
        <h1 className="text-[32px] sm:text-2xl font-semibold">
          Please mark your interests!
        </h1>
        <p className="mt-4">We will keep you notified.</p>
      </div>

      {pageData.length ? (
        <div className="interests mt-9 sm:text-center">
          <h2 className="text-xl">My saved interests!</h2>

          <div
            key={String(Math.random())}
            about={String(Math.random())}
            className="flex flex-col gap-3 my-4  sm:w-fit sm:mx-auto"
          >
            {pageData.map((item) => {
              // console.log(item);
              return (
                // !old
                // <div key={item.id}>
                //   <input
                //     type="checkbox"
                //     id={item.semanticId}
                //     name={item.name}
                //     checked={item.isChecked}
                //     onChange={() => {
                //       onCheckClick(item);
                //     }}
                //   />
                //   <label htmlFor={item.semanticId} className="ml-2">
                //     {item.name}
                //   </label>
                // </div>

                // !new
                <div
                  key={item.id}
                  className="inline-flex items-center"
                  onClick={() => {
                    console.log("onchage");
                    onCheckClick(item);
                  }}
                >
                  <label
                    key={item.id}
                    className="relative flex items-center px-2 py-1 rounded-full cursor-pointer"
                    htmlFor="checkbox"
                  >
                    <input
                      type="checkbox"
                      id={String(item.id)}
                      name={item.name}
                      defaultChecked={item.isChecked}
                      className="peer relative h-6 w-6 cursor-pointer appearance-none rounded-sm transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0  checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 bg-darkBg"
                    />
                    <span className="absolute text-white opacity-0 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M1 7L4.5 11L15 1"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </label>
                  <span>{item.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}

      {/* Pagination */}
      <div className="pagination text-lg text-gray-400 mt-10">
        {/* previous button */}
        <button
          disabled={currentPage === 1}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          &lt;&lt; &nbsp;
        </button>

        {/* ...n pages */}
        {Array.from({ length: pageCount }, (_, i) => {
          return (
            <button
              className={`px-[5px] ${currentPage === i + 1 ? "text-black" : ""}`}
              key={i}
              onClick={() => {
                setCurrentPage(i + 1);
              }}
            >
              {i + 1}
            </button>
          );
        })}

        <button
          disabled={currentPage === pageCount}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          &nbsp; &gt;&gt;
        </button>
      </div>
    </div>
  );
}
