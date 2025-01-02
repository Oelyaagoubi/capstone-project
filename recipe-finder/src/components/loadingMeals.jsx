function LoadingComponent({ count = 8 }) {
  const placeholders = Array(count).fill(0);

  return (
    <div className="loading-placeholder-meals">
      <div className="avatar-placeholder"></div>
      <div className="text-placeholder-meals">
        <div className="line-placeholder-meals"></div>
        <div className="line-placeholder-meals short"></div>
        <div className="line-placeholder-meals"></div>
      </div>
    </div>
  );
}

export default LoadingComponent;
