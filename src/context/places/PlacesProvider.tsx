import { FC, useEffect, useReducer } from "react";
import { getUserLocation } from "../../helpers";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { searchApi } from "../../apis";

import { PlacesResponse, Feature } from "../../interfaces/places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: [],
};

type PlacesProviderProps = {
  children: React.ReactNode;
};

export const PlacesProvider: FC<PlacesProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lnglat) =>
      dispatch({ type: "setUserLocation", payload: lnglat })
    );
  }, []);

  const searchPlacesByTerm = async (query: string): Promise<Feature[]> => {
    if (query.length === 0) {
      dispatch({ type: "setPlaces", payload: [] });
      return [];
    }

    if (!state.userLocation) throw new Error("No hay ubicación del usuario");

    dispatch({ type: "setLoadingPlaces" });

    const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    dispatch({ type: "setPlaces", payload: resp.data.features });

    return resp.data.features;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,

        //Methods
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
