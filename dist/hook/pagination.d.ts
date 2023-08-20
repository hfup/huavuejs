import type { Ref } from "@vue/runtime-core";
import type { PaginationOption } from "../request";
interface PaginationHook<R, Q> {
    isLoading: Ref<boolean>;
    list: Ref<R[]>;
    total: Ref<number>;
    changePage: (path: string, paginationOpt: PaginationOption<Q> | undefined) => Promise<void>;
    delItem: <K extends keyof R>(path: string, key: K, value: R[K]) => Promise<void>;
}
export type { PaginationHook };
