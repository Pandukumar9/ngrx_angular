import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ApiDataState } from './reuse-ngrx.reducer';

// Feature selector
export const selectApiState = createFeatureSelector<ApiDataState>('user');

// Selector to get the shared input
export const selectSharedInput = createSelector(
  selectApiState,
  (state) => state.sharedInput
);

export const selectApiData = createSelector(
  selectApiState,
  (state): any[] => state.apiData
);

export const selectApiLoading = createSelector(
  selectApiState,
  (state) => state.loading
);

export const selectApiError = createSelector(
  selectApiState,
  (state) => state.error
);
