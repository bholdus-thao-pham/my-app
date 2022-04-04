import { closeIconSrc } from 'utils/constants';
import Button from '../Button';
import Icon from '../Icon';
import { PopupProps } from './type';
import { styled } from 'styles/stitches.config';

const Popup = (props: PopupProps) => {
  const { closePopup, css, title, children } = props;

  return (
    <PopupWrapper>
      <PopupContent>
        <PopupHeader>
          {title && <Title>{title}</Title>}
          <CloseButton>
            <Button onClickFunction={closePopup} className="none-border">
              <Icon src={closeIconSrc} alt={'Close icon'} />
            </Button>
          </CloseButton>
        </PopupHeader>
        <PopupBody>{children}</PopupBody>
      </PopupContent>
    </PopupWrapper>
  );
};

export default Popup;

const PopupWrapper = styled('div', {
  position: 'fixed',
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
  backgroundColor: '#adadad66',
  backdropFilter: 'blur(5px)',
  zIndex: 1,
});

const PopupContent = styled('div', {
  backgroundColor: '#2e2e2e',
  width: '60%',
  height: 'fit-content',
  bordeRadius: '10px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%,-50%)',
  justifyContent: 'space-between',
  padding: '30px',
  display: 'flex',
  flexDirection: 'column',
  color: 'white',
  fontSize: 14,
  fontWeight: 'lighter',
});

const PopupHeader = styled('div', {
  width: '100%',
  height: 40,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  marginBottom: 8,
  variants: {
    isTitle: {
      true: {
        justifyContent: 'space-between',
      },
    },
  },
});

const PopupBody = styled('div', {
  width: '100%',
  height: 'calc(100% - 56px)',
});

const CloseButton = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
  marginBottom: 10,
  width: '30%',
});

const Title = styled('div', {
  fontSize: 14,
  textTransform: 'uppercase',
  fontWeight: 500,
  width: '80%',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
});
