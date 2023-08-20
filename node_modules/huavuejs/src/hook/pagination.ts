import type {Ref} from "vue";
import {ref} from "vue";
import type {PaginationOption} from "../request";
import {post} from "../request";


interface PaginationHook<R,Q>{
    isLoading:Ref<boolean>,
    list:Ref<R[]>,
    total:Ref<number>,
    changePage:(path:string,paginationOpt:PaginationOption<Q> | undefined) => Promise<void> // 切换页码
    delItem:<K extends keyof R>(path:string,key:K,value:R[K]) => Promise<void> // 删除列表项
}

function usePagination<R=any,Q=any>():PaginationHook<R,Q> {
    const isLoading = ref(false)
    const list = ref<R[]>([]) as Ref<R[]>
    const total = ref(0)

    const changePage = async (path:string,paginationOpt:PaginationOption<Q> | undefined) => {
        let reqOpt = paginationOpt ?? {page_no:1,page_size:10}
        isLoading.value = true
        post<{list:R[],total:number}>(path,reqOpt).then(res => {
            if (res.err_code !== 0) {
                throw new Error(res.message)
            }
            isLoading.value = false
            list.value = res.data?.list??[]
            total.value = res.data?.total??0
        })
    }

    const delItem = async <K extends keyof R>(path:string,key:K,value:R[K]) => {
        isLoading.value = true
        post(path,{[key]:value}).then(res => {
            isLoading.value = false
            if (res.err_code === 0) {
                let index = list.value.findIndex(item => item[key] === value)
                if (index !== -1) {
                    list.value.splice(index,1)
                }
            }
        })
    }

    return {
        isLoading,
        list,
        total,
        changePage,
        delItem
    }
}

export type {PaginationHook}

