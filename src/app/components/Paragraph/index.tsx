import { styled } from 'styles/stitches.config';
import { ParagraphProps } from './type';

const Paragraph = (props: ParagraphProps) => {
  const { value } = props;
  return <ParagraphContent>{value}</ParagraphContent>;
};

export default Paragraph;

const ParagraphContent = styled('p', {
  fontSize: 14,
  color: '#fcc98d',
  fontWeight: 200,
  fontStyle: 'italic',
});
