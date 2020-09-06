import { createReducer, on } from "@ngrx/store";
import { changeTheme } from "./theme.actions";

export const initialState = 'light';

const _themeReducer = createReducer(
    initialState,
    on(changeTheme, (state) => {
        if (state === 'dark') {
            return 'light';
        } else {
            return 'dark';
        }
    })
);

export function themeReducer(state, action) {
    return _themeReducer(state, action);
}