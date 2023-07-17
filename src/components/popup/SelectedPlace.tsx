import type { ReactNode } from 'react';
import React from 'react';

interface PlaceStoreType {
  placeStore: any[];
  setPlaceStore: React.Dispatch<React.SetStateAction<any[]>>;
}

const SelectedPlace = (props: PlaceStoreType) => {
  const { placeStore, setPlaceStore } = props;
  const removePlace = (num: number) => {
    console.log('인덱스', num);
    setPlaceStore(placeStore.filter((_, i) => i !== num));
    return placeStore;
  };

  return (
    <div className="add-place">
      <div className="add-place_inner">
        {placeStore.map((el: string, index: number) => (
          <p className="add-place_list" key={Number(index)}>
            <button
              className="cancel-place-btn"
              type="button"
              onClick={() => removePlace(index)}
            >
              {el}
            </button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default SelectedPlace;
