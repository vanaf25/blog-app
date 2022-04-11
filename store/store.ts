import {configureStore} from "@reduxjs/toolkit";
import dataSlice from "./dataReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import widgetSlice from "./widgetReducer";
export const store=configureStore({
    reducer:{
        widget:widgetSlice,
        data:dataSlice,
    }
})
export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<typeof store.dispatch>()
