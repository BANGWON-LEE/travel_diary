import type { ReactNode } from 'react';
import React from 'react';

interface PlaceStoreType {
  placeStore: any[];
  setPlaceStore: React.Dispatch<React.SetStateAction<any[]>>;
}

const SelectedPlace = (props: PlaceStoreType) => {
  const { placeStore, setPlaceStore } = props;
  const removePlace = (num: number) => {
    setPlaceStore(placeStore.filter((_, i) => i !== num));
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
          <p className="add-place_list" key={Number(index)}>
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
