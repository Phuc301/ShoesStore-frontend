import Loading from '@/components/common/Loading';
import LoadingWithLogo from '@/components/common/LoadingWithLogo';
import React, { useState } from 'react';

type PreviewFile = {
  file: File;
  url: string;
};

function MultiImageUploadPreview() {
  const [previewFiles, setPreviewFiles] = useState<PreviewFile[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files).map((file) => ({
        file,
        url: URL.createObjectURL(file),
      }));
      setPreviewFiles((prev) => [...prev, ...newFiles]);
    }
  };

  // return (
  //   <div>
  //     <input
  //       type="file"
  //       accept="image/*"
  //       multiple
  //       onChange={handleFileChange}
  //     />

  //     <div
  //       style={{
  //         display: 'flex',
  //         gap: '20px',
  //         marginTop: '10px',
  //         flexWrap: 'wrap',
  //       }}
  //     >
  //       {previewFiles.map((item, index) => (
  //         <div key={index}>
  //           <img src={item.url} alt={item.file.name} width="120" />
  //           <p style={{ fontSize: '12px', marginTop: '5px' }}>{item.url}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </div>
  // );
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true); // bật loading
    setTimeout(() => {
      setLoading(false); // tắt loading sau 1s
    }, 1000); // 1000ms = 1 giây
  };

  return (
    <>
      <h1>Hello</h1>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-[var(--color-orange-500)] text-white rounded-lg"
      >
        Bắt đầu tải
      </button>

      {/* Loading với logo */}
      <LoadingWithLogo show={loading} />
      {/* <Loading show={loading} /> */}
    </>
  );
}

export default MultiImageUploadPreview;
