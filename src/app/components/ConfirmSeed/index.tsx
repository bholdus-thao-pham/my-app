import { styled } from '@stitches/react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import { ConfirmSeedProps } from './type';
const shuffle = (array: string[]): string[] => {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const ConfirmSeed = (props: ConfirmSeedProps) => {
  const { seed, onChangeSelectedSeed } = props;
  const [selectedSeed, setSelectedSeed] = useState<string[]>([]);
  const suffledList = useMemo(() => {
    return shuffle(seed.trim().split(' '));
  }, [seed]);
  const listunSelectedSeed = suffledList.filter(
    item => !selectedSeed.includes(item),
  );

  const selectSeed = item => {
    if (selectedSeed.includes(item)) {
      setSelectedSeed(pre => pre.filter(seed => seed !== item));
    } else {
      setSelectedSeed(pre => pre.concat(item));
    }
  };

  useEffect(() => {
    onChangeSelectedSeed(selectedSeed);
  }, [onChangeSelectedSeed, selectedSeed]);

  const renderSeedTag = () => {
    return listunSelectedSeed.map(item => (
      <Button key={item} onClickFunction={() => selectSeed(item)}>
        {item}
      </Button>
    ));
  };
  const renderSelectedSeed = () => {
    return selectedSeed.map(item => (
      <Button key={item} onClickFunction={() => selectSeed(item)}>
        {item}
      </Button>
    ));
  };
  return (
    <Wrapper>
      <SelectedSeed>{renderSelectedSeed()}</SelectedSeed>
      <ListSeedTag>{renderSeedTag()}</ListSeedTag>
    </Wrapper>
  );
};

export default ConfirmSeed;

const SelectedSeed = styled('div', {
  height: 100,
  background: '#cbc6c62e',
  borderRadius: 3,
  marginBottom: 10,
});

const Wrapper = styled('div', {
  width: '100%',
});

const ListSeedTag = styled('div', {});
