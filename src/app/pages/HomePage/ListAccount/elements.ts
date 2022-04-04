import { styled } from 'styles/stitches.config';

export const Wrapper = styled('div', {});

export const Button = styled('button', {
  border: '1px solid #c0005c',
  height: 40,
  width: 128,
  color: '#c0005c',
  fontSize: 12,
  background: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  '&:hover': {
    background: '#cbc6c62e',
  },
});

export const Icon = styled('img', {
  width: 20,
  right: 20,
});

export const Table = styled('table', {
  width: '100%',
  margin: '10px auto',
  fontSize: 12,
  border: 'none',
  borderCollapse: 'collapse',
  color: 'white',
  background: '#e5dedf1f',
  fontWeight: 'lighter',
  tableLayout: 'fixed',
  td: {
    textAlign: 'left',
    padding: 16,
  },
});

export const TableHeader = styled('tr', {
  fontWeight: 'bold',
  backgroundColor: '#c0005c',
  borderRadius: 10,
});

export const NoData = styled('h3', {
  color: '$secondPink',
});
