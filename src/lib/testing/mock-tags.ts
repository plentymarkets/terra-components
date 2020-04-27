import { TerraTagInterface } from '../components/layouts/tag/data/terra-tag.interface';

export const tagOne: TerraTagInterface = {
  name: 'Tag One',
  names: [
    {
      language: 'de',
      name: 'Tag eins'
    },
    {
      language: 'en',
      name: 'Tag One'
    }
  ],
  color: 'blue',
  id: 1,
  isClosable: true
};

export const tagTwo: TerraTagInterface = {
  name: 'Tag Two',
  color: 'red',
  names: [
    {
      language: 'de',
      name: 'Tag zwei'
    },
    {
      language: 'en',
      name: 'Tag Two'
    }
  ]
};

export const tagList: Array<TerraTagInterface> = [tagOne, tagTwo];
