// pages/categories/[slug].js
import { categories } from '@/constants';
import { useRouter } from 'next/router';

const CategoryPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const category = categories.find((cat) => cat.slug === slug);

  if (!category) {
    return <p>Категорію не знайдено</p>;
  }

  return (
    <div>
      <h1>{category.name}</h1>
      {/* Додайте тут інші деталі категорії, які вам потрібні */}
    </div>
  );
};

export default CategoryPage;
