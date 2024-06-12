import styles from './loader.module.css';

const Loader = ({ color, size }) => {
  if (!size) {
    return null;
  }
  const rootStyle = getComputedStyle(document.documentElement);
  const defaultBaseColor = rootStyle.getPropertyValue('--base-color').trim();
  const defaultIndicatorColor = rootStyle
    .getPropertyValue('--indicator-color')
    .trim();

  const borderSize = Math.round(size / 10);

  const stylesObj = {
    border: `${borderSize}px solid ${defaultBaseColor}`,
    borderTop: `${borderSize}px solid ${color || defaultIndicatorColor}`,
    width: `${size}px`,
    height: `${size}px`,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader} style={stylesObj}></div>
    </div>
  );
};

export default Loader;