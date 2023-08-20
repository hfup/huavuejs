"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const runtime_core_1 = require("@vue/runtime-core");
const request_1 = require("../request");
function usePagination() {
    const isLoading = (0, runtime_core_1.ref)(false);
    const list = (0, runtime_core_1.ref)([]);
    const total = (0, runtime_core_1.ref)(0);
    const changePage = async (path, paginationOpt) => {
        let reqOpt = paginationOpt ?? { page_no: 1, page_size: 10 };
        isLoading.value = true;
        (0, request_1.post)(path, reqOpt).then(res => {
            if (res.err_code !== 0) {
                throw new Error(res.message);
            }
            isLoading.value = false;
            list.value = res.data?.list ?? [];
            total.value = res.data?.total ?? 0;
        });
    };
    const delItem = async (path, key, value) => {
        isLoading.value = true;
        (0, request_1.post)(path, { [key]: value }).then(res => {
            isLoading.value = false;
            if (res.err_code === 0) {
                let index = list.value.findIndex(item => item[key] === value);
                if (index !== -1) {
                    list.value.splice(index, 1);
                }
            }
        });
    };
    return {
        isLoading,
        list,
        total,
        changePage,
        delItem
    };
}
