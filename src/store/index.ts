import { PrismaProductOutput, PrismaUserOutput } from "@/app/utils/types";
import { atom } from "recoil";

export const quantumClickedState = atom<boolean>({
    key: "quantumClickedState",
    default: false
})

export const futureClickedState = atom<boolean>({
    key: "futureClickedState",
    default: false
})

export const galacticClickedState = atom<boolean>({
    key: "galacticClickedState",
    default: false
})

export const moreClickedState = atom<boolean>({
    key: "moreClickedState",
    default: false
})

export const productDetailsState = atom<PrismaProductOutput | null>({
    key: "productDetailsState",
    default: null
})

export const showNotificationState = atom<boolean>({
    key: "showNotificationState",
    default: false
})

export const productQtyState = atom({
    key: "productQtyState",
    default: 1
})

export const userDetailsState = atom<PrismaUserOutput | null>({
    key: "userDetailsState",
    default: null
})

export const showGTSpinnerState = atom<boolean>({
    key: "showGTSpinnerState",
    default: false
})

export const recalculateGTState = atom<boolean>({
    key: "recalculateGTState",
    default: false
})

export const calculateCartItemsState = atom<boolean>({
    key: "calculateCartItemsState",
    default: false
})

export const showSideBarState = atom<boolean>({
    key: "showSideBarState",
    default: false
})