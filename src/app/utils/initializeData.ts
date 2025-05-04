import { useCallback, useEffect, useState } from "react";
import categories from "../mockData/categories.json";
import companies from "../mockData/companies.json";
import products from "../mockData/products.json";
import subcategories from "../mockData/subcategories.json";
import { db } from "../firebase";
import { ref, set } from "firebase/database";

const useMockData = () => {
  const statusConsts = {
    idle: "Not Started",
    pending: "In Process",
    successed: "Ready",
    error: "Error occurred",
  };
  const [error, setError] = useState<null | Error>(null);
  const [status, setStatus] = useState(statusConsts.idle);
  const [progress, setProgress] = useState(0);
  const [count, setCount] = useState(0);
  const summaryCount =
    categories.length +
    companies.length +
    products.length +
    subcategories.length;
  const incrementCount = () => {
    setCount((prevState) => prevState + 1);
  };
  const updateProgress = useCallback(() => {
    if (count !== 0 && status === statusConsts.idle) {
      setStatus(statusConsts.pending);
    }
    const newProgress = Math.floor((count / summaryCount) * 100);
    if (progress < newProgress) {
      setProgress(() => newProgress);
    }
    if (newProgress === 100) {
      setStatus(statusConsts.successed);
    }
  }, [
    count,
    progress,
    status,
    statusConsts.idle,
    statusConsts.pending,
    statusConsts.successed,
    summaryCount,
  ]);

  useEffect(() => {
    updateProgress();
  }, [count, updateProgress]);
  async function initialize() {
    try {
      for (const category of categories) {
        await set(ref(db, `categories/${category._id}`), {
          name: category.name,
        });
        incrementCount();
      }
      for (const company of companies) {
        await set(ref(db, `companies/${company._id}`), {
          name: company.name,
        });
        incrementCount();
      }
      for (const product of products) {
        await set(ref(db, `products/${product._id}`), {
          name: product.name,
          amount: product.amount,
          price: product.price,
          image: product.image,
          description: product.description,
          categoryId: product.categoryId,
          subcategoryId: product.subcategoryId,
          companyId: product.companyId,
        });
        incrementCount();
      }
      for (const subcategory of subcategories) {
        await set(ref(db, `subcategories/${subcategory._id}`), {
          name: subcategory.name,
          categoryId: subcategory.categoryId,
        });
        incrementCount();
      }
    } catch (error) {
      setError(error as Error);
      setStatus(statusConsts.error);
    }
  }

  return { error, initialize, progress, status };
};

export default useMockData;
