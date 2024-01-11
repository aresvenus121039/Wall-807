import { Box } from '@mui/system';
import Image, { ImageProps } from 'next/image';

const OptimizedImage = ({ src, alt, ...props }: ImageProps) => {
  // Modify the source to use Cloudflare's Image Resizing
  const modifiedSrc = `https://eng.wxllspace.com/cdn-cgi/image/format=webp/${src}`;

  return (
    <Box
      sx={{ ...props.style, position: 'relative' }}
      className={props.className}
    >
      <Image src={modifiedSrc} alt={alt} {...props} priority fill />
    </Box>
  );
};

export default OptimizedImage;
