import styles from "./RoundedImage.module.css";

const RoundedImage = ({ src, alt, width }) => {
  return (
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
  );
};

export default RoundedImage;
