import type { ReactNode } from 'react';
import React from 'react';
import { useRecoilState } from 'recoil';

import { placeAtom } from '../../recoil/Atoms';

// interface PlaceStoreType {
//   placeStore: any[];
//   setPlaceStore: React.Dispatch<React.SetStateAction<any[]>>;
// }

interface PlaceStoreType {
  place_name: string[];
}

interface SetPlaceStore {
  (prevState: typeof placeAtom): void;
}

const SelectedPlace = () => {
  const [placeStore, setPlaceStore]: [typeof placeAtom, SetPlaceStore] =
    useRecoilState<PlaceStoreType>(placeAtom);
  const removePlace = (num: number) => {
    setPlaceStore(
      placeStore.filter((el: PlaceBtnType, i: number) => i !== num),
    );
    return placeStore;
  };

  interface PlaceBtnType {
    // [x: string]: ReactNode;
    [el: string]: string;
  }

  return (
    <div className="add-place">
      <div className="add-place_inner">
        {placeStore.map((el: PlaceBtnType, index: number) => (
          <p className="add-place_list" key={`addPlace${Number(index)}`}>
            <button
              className="cancel-place-btn"
              type="button"
              onClick={() => removePlace(index)}
            >
              {el.place_name}
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectedPlace;
