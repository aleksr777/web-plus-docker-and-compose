import { useState, useEffect, useRef, useCallback } from 'react';
import styles from './picture-adaptable.module.css';
import  Loader  from './loader';

const PictureAdaptable = ({
  path,
  altText,
  isDraggable = false,
  loaderColor = '',
}) => {
  const alt =
    altText && typeof altText === 'string' ? altText : 'unknown picture';
  const src = path && typeof path === 'string' ? path : '';
  const color =
    loaderColor && typeof loaderColor === 'string' ? loaderColor : '';

  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const wrapperRef = useRef(null);

  const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  const updateSize = useCallback(
    debounce(() => {
      if (wrapperRef.current) {
        setWrapperSize({
          width: wrapperRef.current.offsetWidth,
          height: wrapperRef.current.offsetHeight,
        });
      }
    }, 200),
    [],
  );

  useEffect(() => {
    if (isLoading) {
      updateSize();
      window.addEventListener('resize', updateSize);
      return () => {
        window.removeEventListener('resize', updateSize);
      };
    }
  }, [updateSize]);

  const loaderSize = isLoading
    ? Math.round(Math.min(wrapperSize.width, wrapperSize.height) / 3)
    : 0;

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [path, altText]);

  let wrapperStyle = styles.wrapper;
  let pictureStyle = styles.picture;
  let imgStyle = styles.picture__img;

  if (isLoading) {
    wrapperStyle = `${wrapperStyle} ${styles.wrapper_loading}`;
  }

  if (hasError) {
    wrapperStyle = `${wrapperStyle} ${styles.wrapper_error}`;
    imgStyle = `${imgStyle} ${styles.picture__img_error}`;
  }

  return (
    <div className={wrapperStyle} ref={wrapperRef}>
      {isLoading && <Loader size={loaderSize} color={color} />}
      <picture className={pictureStyle}>
        <img
          className={imgStyle}
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          draggable={isDraggable}
        />
      </picture>
    </div>
  );
};

export default PictureAdaptable;
