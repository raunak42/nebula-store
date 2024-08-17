import { PrismaProductOutput } from "@/app/utils/types";
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