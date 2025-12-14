import React, { useState } from "react";

interface AvatarCellProps {
  avatarUrl: string;
  defaultName: string;
}

const AvatarCell: React.FC<AvatarCellProps> = ({ avatarUrl, defaultName }) => {
  const [imgError, setImgError] = useState(false);

  const initials = (() => {
    const parts = defaultName.trim().split(/\s+/);
    const first = parts[0]?.[0] || "";
    const last = parts[parts.length - 1]?.[0] || "";
    return (first + last).toUpperCase();
  })();

  const showTextFallback = imgError || !avatarUrl;

  return (
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-orange-100 overflow-hidden">
      {showTextFallback ? (
        <span className="text-orange-600 font-semibold">{initials}</span>
      ) : (
        <img
          src={avatarUrl}
          alt={defaultName}
          className="w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
    </div>
  );
};

export default AvatarCell;
