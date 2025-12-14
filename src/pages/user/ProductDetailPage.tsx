import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/user/Breadcrumb';
import ProductGallery from '@/components/user/product/ProductGallery';
import ProductInfo from '@/components/user/product/ProductInfo';
import ProductTabs from '@/components/user/product/ProductTabs';
import ProductReviews from '@/components/user/product/ProductReviews';
// import ProductComments from '@/components/user/product/ProductComments';
// import RelatedProducts from '@/components/user/product/RelatedProducts';
import { useLocation, useParams } from 'react-router-dom';
import type {
  ProductDetail,
  ProductImage,
  ProductInforDetail,
} from '@/interfaces/admin/ProductManagement/product.interface';
import { fetchProductBySlug } from '@/api';
import type { BreadcrumbItem } from '@/interfaces/common/breadcrumb.interface';
import Loading from '@/components/common/Loading';

const ProductDetailPage = () => {
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const sku = queryParams.get('sku');

  useEffect(() => {
    if (slug) {
      getProductDetail(slug);
    }
  }, [slug]);

  useEffect(() => {
    if (product && selectedColor && selectedSize) {
      const variant = product?.variants?.find(
        (v: any) =>
          v.color === selectedColor &&
          v.sizes.some((s: any) => s.size === selectedSize)
      );
      setSelectedVariant(variant || null);
    }
  }, [product, selectedColor, selectedSize]);

  const getProductDetail = async (slug: string) => {
    try {
      setLoading(true);
      const res = await fetchProductBySlug(slug);
      const data = res.data;

      if (data) {
        setProduct(data);

        let variant = data.variants[0];
        if (sku) {
          const found = data.variants.find((v: any) => v.sku === sku);
          if (found) variant = found;
        }
        setSelectedColor(variant.color);
        if (variant.sizes && variant.sizes.length > 0) {
          setSelectedSize(variant.sizes[0].size);
        }
        setBreadcrumbs([
          { label: 'Sản phẩm', href: '/product' },
          {
            label: data.category.name,
            href: `/product?categories=${data.category.slug}`,
          },
          { label: data.name },
        ]);
      }
    } catch (err) {
      console.error('Error fetching product detail:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !product) {
    return <Loading show={true} />;
  }
  const galleryImages: ProductImage[] =
    product?.variants?.flatMap((variant: any, idx: number) =>
      variant.images.map((img: string, i: number) => ({
        id: idx * 10 + i,
        url: img,
        alt: `${variant.color}-${i}`,
        color: variant.color,
      }))
    ) ?? [];

  const productData: ProductInforDetail = {
    id: product.productId,
    name: product.title || '',
    brand: product.brand,
    price: product.basePrice,
    rating: product.reviewStats.averageRating || 0,
    reviewCount: product.reviewStats.totalReviews || 0,
    reivewByGuest: product.reviewStats.byUserType.guest || 0,
    reivewByUser: product.reviewStats.byUserType.user || 0,
    description: product.description,
    sku:
      product.variants
        ?.find((v: any) => v.color === selectedColor)
        ?.sizes.find((s: any) => s.size === selectedSize)?.sku ||
      product.variants?.find((v: any) => v.color === selectedColor)?.sku ||
      '',
    colors:
      product?.variants?.map((v: any) => ({
        name: v.color,
        value: v.color.toLowerCase(),
        available: true,
      })) || [],
    sizes: (
      product?.variants?.find((v: any) => v.color === selectedColor)?.sizes ||
      []
    ).map((s: any) => ({
      value: s.size,
      available: s.stock > 0,
    })),
    badges: ['Hot', 'Sale'],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={breadcrumbs} />
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Gallery */}
          <div>
            <ProductGallery
              images={galleryImages}
              selectedColor={selectedColor}
            />
          </div>
          {/* Product Info */}
          <div>
            <ProductInfo
              product={productData}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={(c) => {
                setSelectedColor(c);
                const variant = product?.variants?.find(
                  (v: any) => v.color === c
                );
                if (variant && variant.sizes.length > 0) {
                  setSelectedSize(variant.sizes[0].size);
                }
              }}
              onSizeChange={(s) => setSelectedSize(s)}
            />
          </div>
        </div>
        {/* Product Details Tabs */}
        <div className="mb-16">
          <ProductTabs
            product={{
              description: product.description,
              // Develop version 2
              specifications: {},
              careInstructions: [],
            }}
          />
        </div>
        {/* Reviews Section */}
        <div className="mb-16">
          <ProductReviews
            productId={product.productId}
            averageRating={product.reviewStats.averageRating}
            totalReviews={product.reviewStats.totalReviews}
            reviewByGuest={product.reviewStats.byUserType.guest}
            reviewByUser={product.reviewStats.byUserType.user}
            ratingDistribution={product.reviewStats.ratingDistribution}
          />
        </div>
        {/* Comments Section */}
        {/* <div className="mb-16">
          <ProductComments comments={mockComments} />
        </div> */}
        {/* Related Products */}
        {/* <div className="mb-16">
          <RelatedProducts products={mockRelatedProducts} />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetailPage;
