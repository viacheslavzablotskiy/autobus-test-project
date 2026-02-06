import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootStateStore } from "./store";


export const useAppSelector = useSelector.withTypes<RootStateStore>()
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()