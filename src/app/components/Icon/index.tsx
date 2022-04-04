import { styled } from 'styles/stitches.config';
import { IconProps } from './type';

const Icon = (props: IconProps): React.ReactElement | null => {
  const { alt, src } = props;
  return (
    <IconWrapper>
      <Image src={src} alt={alt} />
    </IconWrapper>
  );
};

export default Icon;

export const IconWrapper = styled('span', {
  display: 'inline-block',
  margin: 4,
  cursor: 'pointer',
});

export const Image = styled('img', {
  width: 20,
});
